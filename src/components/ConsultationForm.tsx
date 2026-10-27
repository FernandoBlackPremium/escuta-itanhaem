import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { ITANHAEM_NEIGHBORHOODS, CIVIC_AREAS } from '../data/mockData';
import { submitConsultation } from '../services/storage';

interface ConsultationFormProps {
  preselectedTheme?: string | null;
  onSubmissionSuccess?: () => void;
  onOpenPrivacyModal?: () => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  preselectedTheme,
  onSubmissionSuccess,
  onOpenPrivacyModal
}) => {
  // Form fields state
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [topThreeIssues, setTopThreeIssues] = useState<string[]>([]);
  const [priorityIssue, setPriorityIssue] = useState<string>('');
  const [concreteExample, setConcreteExample] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('Diário / Contínuo');
  const [impactLevel, setImpactLevel] = useState<string>('Risco à segurança ou saúde');
  const [evidenceInfo, setEvidenceInfo] = useState<string>('');
  const [proposedSolution, setProposedSolution] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [youthOpportunities] = useState<string[]>([]);
  const [participateCircles] = useState<'sim' | 'nao' | 'apenas_online'>('apenas_online');
  const [optionalName, setOptionalName] = useState<string>('');
  const [optionalContact, setOptionalContact] = useState<string>('');
  const [lgpdConsent, setLgpdConsent] = useState<boolean>(true);

  // Honeypot field for anti-spam bots
  const [honeypot, setHoneypot] = useState<string>('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [protocolResult, setProtocolResult] = useState<string | null>(null);
  const [copiedProtocol, setCopiedProtocol] = useState<boolean>(false);

  // When a theme is selected from another section, auto-add to issues
  useEffect(() => {
    if (preselectedTheme) {
      const match = CIVIC_AREAS.find((a) => a.id === preselectedTheme);
      if (match) {
        setTopThreeIssues((prev) => {
          if (!prev.includes(match.title) && prev.length < 3) {
            return [...prev, match.title];
          }
          return prev;
        });
        setPriorityIssue((prev) => prev || match.title);
      }
    }
  }, [preselectedTheme]);

  const toggleIssue = (issueTitle: string) => {
    if (topThreeIssues.includes(issueTitle)) {
      const filtered = topThreeIssues.filter((t) => t !== issueTitle);
      setTopThreeIssues(filtered);
      if (priorityIssue === issueTitle) {
        setPriorityIssue(filtered[0] || '');
      }
    } else {
      if (topThreeIssues.length < 3) {
        const next = [...topThreeIssues, issueTitle];
        setTopThreeIssues(next);
        if (!priorityIssue) {
          setPriorityIssue(issueTitle);
        }
      }
    }
  };

  const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
    const errs: Record<string, string> = {};

    if (topThreeIssues.length === 0) {
      errs.topThreeIssues = 'Selecione pelo menos uma área prioritária (até 3).';
    }
    if (!priorityIssue) {
      errs.priorityIssue = 'Indique qual é o problema prioritário número 1.';
    }
    if (!concreteExample || concreteExample.trim().length < 10) {
      errs.concreteExample = 'Por favor, descreva o problema com pelo menos 10 caracteres.';
    }
    if (!proposedSolution || proposedSolution.trim().length < 5) {
      errs.proposedSolution = 'Por favor, registre sua sugestão de solução com pelo menos 5 caracteres.';
    }
    if (!lgpdConsent) {
      errs.lgpdConsent = 'É necessário concordar com os termos de participação pública.';
    }

    setErrors(errs);
    return { isValid: Object.keys(errs).length === 0, errors: errs };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot check
    if (honeypot) {
      console.warn('Bot detectado via honeypot.');
      return;
    }

    const validation = validateForm();
    if (!validation.isValid) {
      const firstErrorKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`form-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitConsultation({
        neighborhood: neighborhood || 'Não informado / Geral',
        topThreeIssues,
        priorityIssue,
        concreteExample,
        proposedSolution,
        youthOpportunities,
        participateCommunityCircles: participateCircles,
        optionalContactName: optionalName.trim() || undefined,
        optionalContactInfo: optionalContact.trim() || undefined,
        lgpdConsent,
        frequency: frequency as any,
        impactLevel: impactLevel as any,
        evidenceInfo: evidenceInfo.trim() || undefined,
        isAnonymous
      });

      if (res.success) {
        setProtocolResult(res.protocol);
        if (onSubmissionSuccess) onSubmissionSuccess();
      } else {
        setErrors({ submit: res.error || 'Erro ao processar sua resposta. Tente novamente.' });
      }
    } catch {
      setErrors({ submit: 'Ocorreu um erro de conexão. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyProtocol = () => {
    if (protocolResult) {
      navigator.clipboard.writeText(protocolResult);
      setCopiedProtocol(true);
      setTimeout(() => setCopiedProtocol(false), 2500);
    }
  };

  const handleReset = () => {
    setNeighborhood('');
    setTopThreeIssues([]);
    setPriorityIssue('');
    setConcreteExample('');
    setProposedSolution('');
    setEvidenceInfo('');
    setFrequency('Diário / Contínuo');
    setImpactLevel('Risco à segurança ou saúde');
    setIsAnonymous(true);
    setOptionalName('');
    setOptionalContact('');
    setProtocolResult(null);
    setErrors({});
  };

  return (
    <section id="consulta" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      <div style={{ maxWidth: '54rem', marginInline: 'auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <span className="dot-yellow"></span>
            Diagnóstico Cívico Municipal · Escuta Ativa
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--color-black)'
            }}
          >
            Relate um problema nos <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>bairros de Itanhaém</em>.
          </h2>

          <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Compartilhe a realidade concreta das ruas da nossa cidade. Seus relatos alimentam diretamente o banco público
            de questões para formulação de propostas técnicas, sustentáveis e com base na competência municipal.
          </p>

          {/* Aviso de limites e emergências */}
          <div
            style={{
              marginTop: '1.5rem',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '0.85rem 1.25rem',
              fontSize: '0.825rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textAlign: 'left'
            }}
          >
            <ShieldCheck size={18} color="var(--emerald)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Iniciativa Cívica Independente:</strong> Não é canal oficial da Prefeitura nem presta atendimento de emergência (SAMU 192, Bombeiros 193). Não coletamos CPF ou dados sigilosos.
            </span>
          </div>
        </div>

        {/* Confirmation Screen */}
        {protocolResult ? (
          <div
            className="animate-fade-up swiftui-card"
            style={{
              border: '1.5px solid var(--emerald)',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-glass)'
            }}
          >
            <div
              style={{
                height: '4.75rem',
                width: '4.75rem',
                borderRadius: '50%',
                backgroundColor: 'var(--emerald-bg)',
                display: 'grid',
                placeItems: 'center',
                marginInline: 'auto',
                marginBottom: '1.5rem',
                color: 'var(--emerald)'
              }}
            >
              <CheckCircle2 size={44} />
            </div>

            <h3 className="font-display" style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-black)' }}>
              Relato registrado com sucesso!
            </h3>

            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '34rem', marginInline: 'auto', fontSize: '0.975rem', lineHeight: 1.6 }}>
              Sua contribuição foi salva com segurança no banco cívico de dados e já entrou na triagem de prioridades do
              Escuta Itanhaém. Guarde o número de protocolo para acompanhar o desdobramento das propostas:
            </p>

            {/* Protocol Box */}
            <div
              style={{
                marginTop: '1.75rem',
                marginBottom: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'var(--color-surface)',
                padding: '0.9rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                fontFamily: 'monospace',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-black)'
              }}
            >
              <span>{protocolResult}</span>
              <button
                type="button"
                onClick={handleCopyProtocol}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: copiedProtocol ? 'var(--emerald)' : 'var(--color-black)',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
                title="Copiar número do protocolo"
              >
                {copiedProtocol ? <Check size={18} /> : <Copy size={18} />}
                <span>{copiedProtocol ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#propostas" className="btn-primary">
                <span>Ver Banco de Propostas</span>
              </a>
              <button type="button" onClick={handleReset} className="btn-secondary">
                <span>Registrar outro relato</span>
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Form */
          <form
            onSubmit={handleSubmit}
            className="swiftui-card"
            style={{
              padding: 'clamp(1.75rem, 4.5vw, 3.25rem)'
            }}
            noValidate
          >
            {/* Honeypot hidden input for bots */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website_url_field"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Question 1: Neighborhood */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label htmlFor="form-neighborhood" className="form-label" style={{ fontSize: '1.05rem' }}>
                1. Em qual bairro ou região de Itanhaém fica o problema?{' '}
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', fontWeight: 400 }}>
                  (Opcional — não solicitamos endereço exato)
                </span>
              </label>
              <select
                id="form-neighborhood"
                className="form-select"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              >
                <option value="">Selecione o bairro ou região...</option>
                {ITANHAEM_NEIGHBORHOODS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <p className="form-hint">
                A identificação do bairro permite analisar a dispersão geográfica das demandas sem violar a privacidade domiciliar.
              </p>
            </div>

            {/* Question 2: Areas / Issues */}
            <div id="form-topThreeIssues" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.65rem' }}>
                <label className="form-label" style={{ fontSize: '1.05rem' }}>
                  2. A quais temas municipais esse problema se relaciona? *
                </label>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: topThreeIssues.length > 0 ? 'var(--emerald)' : 'var(--muted-foreground)'
                  }}
                >
                  {topThreeIssues.length}/3 selecionados
                </span>
              </div>

              {errors.topThreeIssues && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DC2626', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <AlertCircle size={15} />
                  <span>{errors.topThreeIssues}</span>
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '0.65rem'
                }}
              >
                {CIVIC_AREAS.map((area) => {
                  const isSelected = topThreeIssues.includes(area.title);
                  return (
                    <button
                      type="button"
                      key={area.id}
                      onClick={() => toggleIssue(area.title)}
                      style={{
                        padding: '0.85rem 1.1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: isSelected ? '1.5px solid var(--color-black)' : '1px solid var(--color-border)',
                        backgroundColor: isSelected ? 'var(--color-black)' : 'var(--color-surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--color-black)',
                        fontSize: '0.875rem',
                        fontWeight: isSelected ? 600 : 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{area.title}</span>
                      {isSelected && <Check size={16} color="var(--color-primary)" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 3: Priority #1 */}
            {topThreeIssues.length > 0 && (
              <div id="form-priorityIssue" style={{ marginBottom: '2.5rem' }} className="animate-fade-up">
                <label htmlFor="form-priority-select" className="form-label" style={{ fontSize: '1.05rem' }}>
                  3. Qual dessas áreas é o foco principal deste relato? *
                </label>
                {errors.priorityIssue && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DC2626', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <AlertCircle size={15} />
                    <span>{errors.priorityIssue}</span>
                  </div>
                )}
                <select
                  id="form-priority-select"
                  className="form-select"
                  value={priorityIssue}
                  onChange={(e) => setPriorityIssue(e.target.value)}
                >
                  <option value="">Selecione o tema principal...</option>
                  {topThreeIssues.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Question 4: Problem description */}
            <div id="form-concreteExample" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                <label htmlFor="form-example-input" className="form-label" style={{ fontSize: '1.05rem' }}>
                  4. Descreva a situação com clareza e detalhes objetivos: *
                </label>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  {concreteExample.length} caracteres (mín. 10)
                </span>
              </div>
              {errors.concreteExample && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DC2626', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <AlertCircle size={15} />
                  <span>{errors.concreteExample}</span>
                </div>
              )}
              <textarea
                id="form-example-input"
                className="form-textarea"
                rows={4}
                placeholder="Exemplo: Na principal rua de ligação do bairro, a vala de drenagem está com mato alto e areia acumulada, causando alagamento constante na calçada e nas entradas das casas quando chove forte..."
                value={concreteExample}
                onChange={(e) => setConcreteExample(e.target.value)}
              />
              <p className="form-hint">
                <strong>Orientações de integridade:</strong> Foco no fato público e no serviço municipal. Não cite nomes de vizinhos, ofensas pessoais ou acusações não comprovadas.
              </p>
            </div>

            {/* NEW Question 5: Frequência & Impacto */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}
            >
              <div>
                <label htmlFor="form-frequency" className="form-label" style={{ fontSize: '0.95rem' }}>
                  5. Com que frequência o problema ocorre?
                </label>
                <select
                  id="form-frequency"
                  className="form-select"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="Diário / Contínuo">Diário / Contínuo (ocorre todos os dias)</option>
                  <option value="Semanal">Semanal (várias vezes por semana)</option>
                  <option value="Períodos de chuva">Períodos de chuva / maré alta</option>
                  <option value="Temporada de verão">Temporada de verão / picos sazonais</option>
                  <option value="Esporádico">Esporádico (ocasionalmente)</option>
                </select>
              </div>

              <div>
                <label htmlFor="form-impact" className="form-label" style={{ fontSize: '0.95rem' }}>
                  6. Qual é o maior impacto na vida das pessoas?
                </label>
                <select
                  id="form-impact"
                  className="form-select"
                  value={impactLevel}
                  onChange={(e) => setImpactLevel(e.target.value)}
                >
                  <option value="Risco à segurança ou saúde">Risco à segurança ou saúde pública</option>
                  <option value="Prejuízo à mobilidade / transporte">Prejuízo à mobilidade, calçadas ou transporte</option>
                  <option value="Impacto financeiro / comércio">Prejuízo ao comércio local e emprego</option>
                  <option value="Dificuldade de acesso a serviços públicos">Dificuldade de acesso a postos/escolas</option>
                </select>
              </div>
            </div>

            {/* NEW Question 7: Evidências preexistentes */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label htmlFor="form-evidence" className="form-label" style={{ fontSize: '1.05rem' }}>
                7. Existe alguma evidência, link ou protocolo anterior já aberto?{' '}
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                  (Opcional)
                </span>
              </label>
              <input
                id="form-evidence"
                type="text"
                className="form-input"
                placeholder="Ex: Protocolo Ouvidoria Municipal nº 12345/2026, matéria de jornal, link de foto ou relato de reunião de moradores..."
                value={evidenceInfo}
                onChange={(e) => setEvidenceInfo(e.target.value)}
              />
              <p className="form-hint">
                Evidências documentais ajudam a elevar o status da questão de "relato recebido" para "evidência encontrada".
              </p>
            </div>

            {/* Question 8: Proposed Solution */}
            <div id="form-proposedSolution" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                <label htmlFor="form-solution-input" className="form-label" style={{ fontSize: '1.05rem' }}>
                  8. Qual solução realista você sugere para resolver essa situação? *
                </label>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  {proposedSolution.length} caracteres (mín. 5)
                </span>
              </div>
              {errors.proposedSolution && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DC2626', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <AlertCircle size={15} />
                  <span>{errors.proposedSolution}</span>
                </div>
              )}
              <textarea
                id="form-solution-input"
                className="form-textarea"
                rows={3}
                placeholder="Exemplo: Estabelecer um cronograma bimestral de desassoreamento preventivo e instalar tampas de concreto nas saídas da tubulação..."
                value={proposedSolution}
                onChange={(e) => setProposedSolution(e.target.value)}
              />
            </div>

            {/* NEW: Opção de Anonimato Explícito */}
            <div style={{ marginBottom: '2.5rem', backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-black)', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  style={{ accentColor: 'var(--color-black)', width: '1.2rem', height: '1.2rem' }}
                />
                <span>Desejo que meu relato seja publicado estritamente de forma anônima no banco de dados.</span>
              </label>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.4rem', marginLeft: '1.95rem' }}>
                Mesmo que você preencha dados de contato opcionais abaixo, eles permanecerão em sigilo e nunca serão exibidos publicamente.
              </p>
            </div>

            {/* Optional Contact (Explicit Consent & Purpose) */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem',
                border: '1px solid var(--color-border)',
                marginBottom: '2.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Lock size={17} color="var(--color-primary)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-black)' }}>
                  Contato Opcional para Devolutivas (Não Obrigatório)
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.55 }}>
                Se desejar ser informado quando os estudos técnicos avançarem ou for convidado para rodas de conversa
                comunitárias sobre o seu bairro, informe seu contato. Os dados de contato <strong>nunca serão divulgados publicamente</strong> nem
                utilizados para propaganda eleitoral ou fins comerciais.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="contact-grid">
                <div>
                  <label htmlFor="form-opt-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Primeiro Nome ou Apelido (Opcional):
                  </label>
                  <input
                    id="form-opt-name"
                    type="text"
                    className="form-input"
                    placeholder="Ex: Carlos ou Maria"
                    value={optionalName}
                    onChange={(e) => setOptionalName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="form-opt-contact" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    WhatsApp ou E-mail (Opcional):
                  </label>
                  <input
                    id="form-opt-contact"
                    type="text"
                    className="form-input"
                    placeholder="Ex: (13) 99999-9999 ou seu@email.com"
                    value={optionalContact}
                    onChange={(e) => setOptionalContact(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* LGPD Consent Checkbox */}
            <div id="form-lgpdConsent" style={{ marginBottom: '2.5rem' }}>
              {errors.lgpdConsent && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DC2626', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <AlertCircle size={15} />
                  <span>{errors.lgpdConsent}</span>
                </div>
              )}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: 'var(--color-black)'
                }}
              >
                <input
                  type="checkbox"
                  checked={lgpdConsent}
                  onChange={(e) => setLgpdConsent(e.target.checked)}
                  style={{ accentColor: 'var(--color-black)', marginTop: '0.2rem', width: '1.15rem', height: '1.15rem' }}
                />
                <span>
                  Concordo com os princípios de participação voluntária e autorizo o tratamento cívico e anônimo do meu
                  relato para o banco de dados do Escuta Itanhaém, em conformidade com a{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onOpenPrivacyModal) onOpenPrivacyModal();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-black)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit'
                    }}
                  >
                    Política de Privacidade e LGPD
                  </button>
                  .
                </span>
              </label>
            </div>

            {/* Global Error Banner */}
            {errors.submit && (
              <div
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  color: '#DC2626',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <AlertCircle size={18} />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  fontSize: '1rem',
                  padding: '0.75rem 0.75rem 0.75rem 2rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                id="submit-consultation-btn"
              >
                <span>{isSubmitting ? 'Registrando relato...' : 'Enviar Relato Cívico'}</span>
                <span className="btn-icon-wrapper">
                  <Send size={16} />
                </span>
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
