import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Lock
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
  const [proposedSolution, setProposedSolution] = useState<string>('');
  const [youthOpportunities, setYouthOpportunities] = useState<string[]>([]);
  const [participateCircles, setParticipateCircles] = useState<'sim' | 'nao' | 'apenas_online'>('apenas_online');
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

  const youthOptions = [
    'Cursos de Inteligência Artificial e Ferramentas Digitais',
    'Programação de Sistemas e Desenvolvimento Web',
    'Educação Financeira e Gestão de Pequenos Negócios',
    'Vendas pela Internet e E-commerce Local',
    'Preparação Prática para o Primeiro Emprego',
    'Projetos Estudantis e Hackathons para Desafios da Cidade',
    'Atividades Preventivas com Bombeiros, Saúde e Segurança',
    'Esporte, Lazer Comunitário e Cultura Jovem'
  ];

  const toggleYouthOption = (option: string) => {
    if (youthOpportunities.includes(option)) {
      setYouthOpportunities(youthOpportunities.filter((item) => item !== option));
    } else {
      setYouthOpportunities([...youthOpportunities, option]);
    }
  };

  const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
    const errs: Record<string, string> = {};

    if (topThreeIssues.length === 0) {
      errs.topThreeIssues = 'Selecione pelo menos um tema prioritário (até 3).';
    }
    if (!priorityIssue) {
      errs.priorityIssue = 'Indique qual é o problema prioritário número 1.';
    }
    if (!concreteExample || concreteExample.trim().length < 10) {
      errs.concreteExample = 'Por favor, descreva um exemplo concreto com pelo menos 10 caracteres.';
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
        lgpdConsent
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
    setYouthOpportunities([]);
    setOptionalName('');
    setOptionalContact('');
    setProtocolResult(null);
    setErrors({});
  };

  return (
    <section id="consulta" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      <div style={{ maxWidth: '52rem', marginInline: 'auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <span className="dot-yellow"></span>
            Participação Cidadã Anônima & Voluntária
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
            Consulta pública aos <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>moradores</em>.
          </h2>

          <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Compartilhe as reais necessidades do seu bairro. Não é exigido CPF, endereço exato ou filiação partidária.
            Suas respostas alimentam diretamente o painel de propostas municipais em estudo.
          </p>
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
              Contribuição registrada com sucesso!
            </h3>

            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '34rem', marginInline: 'auto', fontSize: '0.975rem', lineHeight: 1.6 }}>
              Sua resposta foi arquivada de forma segura e já está contabilizada no painel de participação pública de
              Itanhaém. Guarde o número de protocolo para acompanhar o desdobramento das propostas:
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
              <a href="#dashboard" className="btn-primary">
                <span>Ver Painel de Resultados</span>
              </a>
              <button type="button" onClick={handleReset} className="btn-secondary">
                <span>Enviar outra contribuição</span>
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Form (SwiftUI Inset Grouped) */
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
                1. Em qual bairro ou região de Itanhaém você mora?{' '}
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
                <option value="">Selecione seu bairro ou região...</option>
                {ITANHAEM_NEIGHBORHOODS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <p className="form-hint">
                A identificação do bairro ajuda a mapear demandas geográficas específicas, sem violar sua privacidade.
              </p>
            </div>

            {/* Question 2: Top 3 Issues */}
            <div id="form-topThreeIssues" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.65rem' }}>
                <label className="form-label" style={{ fontSize: '1.05rem' }}>
                  2. Quais são os três problemas que mais precisam de atenção na sua região? *
                </label>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: topThreeIssues.length === 3 ? 'var(--emerald)' : 'var(--muted-foreground)'
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
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
                  3. Qual desses problemas deveria ser a prioridade número um? *
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
                  <option value="">Selecione a prioridade máxima...</option>
                  {topThreeIssues.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Question 4: Concrete Example */}
            <div id="form-concreteExample" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                <label htmlFor="form-example-input" className="form-label" style={{ fontSize: '1.05rem' }}>
                  4. Você pode descrever um exemplo concreto do problema no seu bairro? *
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
                rows={3}
                placeholder="Exemplo: Na Avenida principal do bairro, os buracos acumulam água há mais de 3 meses e a iluminação apaga frequentemente à noite..."
                value={concreteExample}
                onChange={(e) => setConcreteExample(e.target.value)}
              />
              <p className="form-hint">
                Evite citar nomes de vizinhos ou ofensas pessoais. Foco no fato urbano e na melhoria necessária.
              </p>
            </div>

            {/* Question 5: Proposed Solution */}
            <div id="form-proposedSolution" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                <label htmlFor="form-solution-input" className="form-label" style={{ fontSize: '1.05rem' }}>
                  5. Qual solução viável você sugere? *
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
                placeholder="Exemplo: Instalação de lâmpadas LED duráveis, cronograma público de patrolamento das vias e fiscalização comunitária..."
                value={proposedSolution}
                onChange={(e) => setProposedSolution(e.target.value)}
              />
            </div>

            {/* Question 6: Youth & Opportunities */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label className="form-label" style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                6. Quais oportunidades deveriam ser ampliadas para os jovens de Itanhaém?{' '}
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                  (Opcional — selecione as que considerar relevantes)
                </span>
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {youthOptions.map((opt) => {
                  const checked = youthOpportunities.includes(opt);
                  return (
                    <label
                      key={opt}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: checked ? 'var(--color-primary-surface)' : '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        color: 'var(--color-black)',
                        border: checked ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                        transition: 'var(--transition)'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleYouthOption(opt)}
                        style={{ accentColor: 'var(--color-black)', width: '1.15rem', height: '1.15rem' }}
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Question 7: Community Circles (SwiftUI Segmented Toggle) */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label className="form-label" style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                7. Você gostaria de participar de futuras conversas comunitárias sobre sua região?
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.65rem'
                }}
              >
                {[
                  { value: 'sim', label: 'Sim, presencialmente' },
                  { value: 'apenas_online', label: 'Apenas em formato online' },
                  { value: 'nao', label: 'Não no momento' }
                ].map((item) => {
                  const isSelected = participateCircles === item.value;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => setParticipateCircles(item.value as any)}
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: isSelected ? '1.5px solid var(--color-black)' : '1px solid var(--color-border)',
                        backgroundColor: isSelected ? 'var(--color-black)' : 'var(--color-surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--color-black)',
                        fontSize: '0.875rem',
                        fontWeight: isSelected ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        textAlign: 'center'
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
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
                Se desejar ser informado quando as propostas do seu bairro avançarem ou for convidado para rodas de
                conversa, informe seu contato. Os dados de contato <strong>nunca serão divulgados publicamente</strong> nem
                utilizados para fins comerciais ou eleitorais partidários.
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
                  Concordo com os princípios de participação voluntária e autorizo a agregação estatística anônima das
                  minhas respostas para a formulação de propostas de interesse público de Itanhaém, em conformidade com a{' '}
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
                <span>{isSubmitting ? 'Registrando contribuição...' : 'Enviar Minha Contribuição'}</span>
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
