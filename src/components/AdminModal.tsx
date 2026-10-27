import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Search,
  Download,
  LogOut,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { getSupabaseClient, fetchAdminSubmissions, updateSubmissionTriage } from '../services/storage';
import type { ConsultationResponse, TriageStatus } from '../types';
import { ITANHAEM_NEIGHBORHOODS } from '../data/mockData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRIAGE_STATUSES: TriageStatus[] = [
  'Recebida',
  'Em triagem',
  'Em análise',
  'Necessita de informações adicionais',
  'Convertida em proposta',
  'Encaminhada ao órgão competente',
  'Concluída ou arquivada'
];

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Submissions state
  const [submissions, setSubmissions] = useState<ConsultationResponse[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<ConsultationResponse | null>(null);

  // Internal notes and status editing
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeNotes, setActiveNotes] = useState('');
  const [activeStatus, setActiveStatus] = useState<TriageStatus>('Recebida');

  const supabase = getSupabaseClient();

  const loadData = async () => {
    setDataLoading(true);
    const res = await fetchAdminSubmissions();
    if (res.data) {
      setSubmissions(res.data);
    }
    setDataLoading(false);
  };

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadData();
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        loadData();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setAuthError('Supabase não está configurado neste ambiente.');
      return;
    }
    setAuthLoading(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      setAuthError(
        error.message === 'Invalid login credentials'
          ? 'Credenciais inválidas. Verifique o e-mail e senha cadastrados no Supabase.'
          : error.message
      );
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setSession(null);
      setSubmissions([]);
      setSelectedSubmission(null);
    }
  };

  const handleSelectSubmission = (sub: ConsultationResponse) => {
    setSelectedSubmission(sub);
    setActiveStatus(sub.status || 'Recebida');
    setActiveNotes(sub.internalNotes || '');
  };

  const handleSaveTriage = async () => {
    if (!selectedSubmission) return;
    setIsUpdating(true);

    const res = await updateSubmissionTriage(selectedSubmission.id, {
      status: activeStatus,
      internalNotes: activeNotes
    });

    if (res.success) {
      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === selectedSubmission.id
            ? { ...item, status: activeStatus, internalNotes: activeNotes }
            : item
        )
      );
      setSelectedSubmission((prev) =>
        prev ? { ...prev, status: activeStatus, internalNotes: activeNotes } : null
      );
    } else {
      alert(`Erro ao salvar atualização: ${res.error}`);
    }
    setIsUpdating(false);
  };

  const exportCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      'Protocolo',
      'Data',
      'Bairro',
      'Tema Prioritário',
      'Problema Relatado',
      'Solução Sugerida',
      'Oportunidades Juventude',
      'Rodas Comunitárias',
      'Nome Contato',
      'Contato',
      'Status Triagem',
      'Observações Internas'
    ];

    const rows = submissions.map((s) => [
      `"${s.protocol}"`,
      `"${new Date(s.createdAt).toLocaleString('pt-BR')}"`,
      `"${(s.neighborhood || '').replace(/"/g, '""')}"`,
      `"${(s.priorityIssue || '').replace(/"/g, '""')}"`,
      `"${(s.concreteExample || '').replace(/"/g, '""')}"`,
      `"${(s.proposedSolution || '').replace(/"/g, '""')}"`,
      `"${(s.youthOpportunities || []).join('; ').replace(/"/g, '""')}"`,
      `"${s.participateCommunityCircles}"`,
      `"${(s.optionalContactName || '').replace(/"/g, '""')}"`,
      `"${(s.optionalContactInfo || '').replace(/"/g, '""')}"`,
      `"${s.status || 'Recebida'}"`,
      `"${(s.internalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `escuta-itanhaem-contribuicoes-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      searchTerm === '' ||
      s.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.neighborhood || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.priorityIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.concreteExample.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.proposedSolution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.optionalContactName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNeighborhood = neighborhoodFilter === '' || s.neighborhood === neighborhoodFilter;
    const matchesStatus = statusFilter === '' || (s.status || 'Recebida') === statusFilter;

    return matchesSearch && matchesNeighborhood && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: session ? '72rem' : '32rem',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                height: '2.5rem',
                width: '2.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-primary)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <Lock size={18} />
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-black)' }}>
                Gestão Cívica & Triagem
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                {session ? `Conectado como: ${session.user?.email}` : 'Acesso Restrito da Coordenação'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {session && (
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.825rem',
                  color: '#DC2626',
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.45rem 0.85rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <LogOut size={14} />
                <span>Encerrar Sessão</span>
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                padding: '0.4rem',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center'
              }}
              aria-label="Fechar painel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Not Authenticated: Login View */}
        {!session ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5
              }}
            >
              Este painel permite a Fernando Costa e à coordenação técnica visualizar, triar e exportar com segurança
              todas as contribuições dos moradores de Itanhaém recebidas na base de dados.
            </div>

            {authError && (
              <div
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  color: '#DC2626',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                E-mail do Administrador:
              </label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="exemplo@escutaitanhaem.org.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Senha de Acesso:
              </label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              <span>{authLoading ? 'Verificando credenciais...' : 'Acessar Painel de Gestão'}</span>
            </button>
          </form>
        ) : (
          /* Authenticated: Management Dashboard */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Toolbar: Search, Filters & Export */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search
                    size={16}
                    style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }}
                  />
                  <input
                    type="text"
                    placeholder="Buscar por protocolo, bairro, tema ou texto..."
                    className="form-input"
                    style={{ paddingLeft: '2.4rem', fontSize: '0.85rem', height: '2.5rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  value={neighborhoodFilter}
                  onChange={(e) => setNeighborhoodFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', fontSize: '0.825rem', height: '2.5rem', paddingBlock: '0.2rem' }}
                >
                  <option value="">Todos os Bairros</option>
                  {ITANHAEM_NEIGHBORHOODS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', fontSize: '0.825rem', height: '2.5rem', paddingBlock: '0.2rem' }}
                >
                  <option value="">Todos os Status</option>
                  {TRIAGE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={loadData}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  title="Recarregar dados"
                >
                  <RefreshCw size={13} className={dataLoading ? 'animate-spin' : ''} />
                  <span>Atualizar</span>
                </button>

                <button
                  type="button"
                  onClick={exportCSV}
                  disabled={submissions.length === 0}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.5rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-black)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Download size={14} color="var(--color-primary)" />
                  <span>Exportar CSV ({filteredSubmissions.length})</span>
                </button>
              </div>
            </div>

            {/* Main Area: Split List & Detail */}
            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: selectedSubmission ? '1.1fr 1fr' : '1fr',
                gap: '1.25rem',
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              {/* Left Column: Submissions Table/List */}
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflowY: 'auto',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {dataLoading ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    Carregando contribuições...
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    Nenhuma contribuição encontrada para os filtros selecionados.
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Protocolo / Data</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Bairro & Tema</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Status</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Contato?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((s) => {
                        const isSelected = selectedSubmission?.id === s.id;
                        return (
                          <tr
                            key={s.id}
                            onClick={() => handleSelectSubmission(s)}
                            style={{
                              borderBottom: '1px solid var(--color-border)',
                              cursor: 'pointer',
                              backgroundColor: isSelected ? 'rgba(255, 198, 41, 0.12)' : 'transparent',
                              transition: 'background-color 0.15s ease'
                            }}
                          >
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-black)' }}>
                                {s.protocol}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                {new Date(s.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <div style={{ fontWeight: 600, color: 'var(--color-black)' }}>
                                {s.neighborhood || 'Não informado'}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                {s.priorityIssue}
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '0.2rem 0.55rem',
                                  borderRadius: 'var(--radius-full)',
                                  backgroundColor: s.status === 'Convertida em proposta' ? 'var(--emerald-bg)' : 'var(--color-surface)',
                                  color: s.status === 'Convertida em proposta' ? 'var(--emerald)' : 'var(--color-black)',
                                  border: '1px solid var(--color-border)',
                                  fontWeight: 600
                                }}
                              >
                                {s.status || 'Recebida'}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                              {s.optionalContactInfo ? (
                                <span style={{ color: 'var(--emerald)', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <CheckCircle2 size={13} />
                                  Sim
                                </span>
                              ) : (
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>Anônimo</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Right Column: Selected Submission Detail & Triage */}
              {selectedSubmission && (
                <div
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    overflowY: 'auto',
                    backgroundColor: 'var(--color-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Detalhes da Contribuição
                      </div>
                      <h4 style={{ fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-black)' }}>
                        {selectedSubmission.protocol}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSubmission(null)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Neighborhood & Issues */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Bairro / Localidade:</div>
                    <div style={{ fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.5rem' }}>
                      {selectedSubmission.neighborhood || 'Não informado'}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Prioridade Máxima (#1):</div>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary-text, #000)' }}>
                      {selectedSubmission.priorityIssue}
                    </div>
                  </div>

                  {/* Concrete Example */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Problema Real Relatado pelo Morador:
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-black)', lineHeight: 1.55 }}>
                      {selectedSubmission.concreteExample}
                    </p>
                  </div>

                  {/* Proposed Solution */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Solução Sugerida:
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-black)', lineHeight: 1.55 }}>
                      {selectedSubmission.proposedSolution}
                    </p>
                  </div>

                  {/* Contact Info (LGPD Protected Area) */}
                  <div
                    style={{
                      backgroundColor: selectedSubmission.optionalContactInfo ? 'rgba(5, 150, 105, 0.06)' : '#FFFFFF',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: selectedSubmission.optionalContactInfo ? '1px solid rgba(5, 150, 105, 0.25)' : '1px solid var(--color-border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-black)', fontWeight: 700, marginBottom: '0.45rem' }}>
                      <Lock size={14} color="var(--emerald)" />
                      <span>Contato para Convite / Devolutiva (LGPD):</span>
                    </div>
                    {selectedSubmission.optionalContactInfo ? (
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-black)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div><strong>Nome:</strong> {selectedSubmission.optionalContactName || 'Não informado'}</div>
                        <div><strong>Canal:</strong> {selectedSubmission.optionalContactInfo}</div>
                        <div><strong>Rodas de conversa:</strong> {selectedSubmission.participateCommunityCircles}</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        O morador optou por não fornecer dados de contato pessoais (participação anônima).
                      </div>
                    )}
                  </div>

                  {/* Triage & Internal Notes */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.35rem' }}>
                      Status de Triagem da Demanda:
                    </label>
                    <select
                      className="form-select"
                      style={{ marginBottom: '1rem', fontSize: '0.85rem' }}
                      value={activeStatus}
                      onChange={(e) => setActiveStatus(e.target.value as TriageStatus)}
                    >
                      {TRIAGE_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.35rem' }}>
                      Observações Internas da Coordenação:
                    </label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      placeholder="Ex: Verificar se já existe dotação orçamentária ou se a via é municipal / estadual..."
                      value={activeNotes}
                      onChange={(e) => setActiveNotes(e.target.value)}
                      style={{ fontSize: '0.85rem', marginBottom: '1rem' }}
                    />

                    <button
                      type="button"
                      onClick={handleSaveTriage}
                      disabled={isUpdating}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '0.65rem' }}
                    >
                      <span>{isUpdating ? 'Salvando...' : 'Salvar Triagem e Observações'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
