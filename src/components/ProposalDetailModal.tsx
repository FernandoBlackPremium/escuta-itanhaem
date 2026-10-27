import React from 'react';
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import type { Proposal } from '../types';

interface ProposalDetailModalProps {
  proposal: Proposal | null;
  onClose: () => void;
}

export const ProposalDetailModal: React.FC<ProposalDetailModalProps> = ({ proposal, onClose }) => {
  if (!proposal) return null;

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Pronta para discussão pública':
        return { bg: 'rgba(5, 150, 105, 0.1)', text: '#059669', border: 'rgba(5, 150, 105, 0.3)' };
      case 'Em avaliação orçamentária':
        return { bg: 'rgba(217, 119, 6, 0.1)', text: '#D97706', border: 'rgba(217, 119, 6, 0.3)' };
      case 'Em análise jurídica':
        return { bg: 'rgba(124, 58, 237, 0.1)', text: '#7C3AED', border: 'rgba(124, 58, 237, 0.3)' };
      case 'Em levantamento de dados':
        return { bg: 'rgba(2, 132, 199, 0.1)', text: '#0284C7', border: 'rgba(2, 132, 199, 0.3)' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', text: '#64748B', border: 'rgba(100, 116, 139, 0.3)' };
    }
  };

  const statusStyle = getStatusBadgeColor(proposal.status);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2.5rem' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.text,
                  border: `1px solid ${statusStyle.border}`
                }}
              >
                ● {proposal.status}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                Área: <strong>{proposal.areaTitle}</strong>
              </span>
            </div>
            <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.2 }}>
              {proposal.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted-foreground)',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center'
            }}
            aria-label="Fechar detalhes"
          >
            <X size={24} />
          </button>
        </div>

        {/* Detailed Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Problema Identificado */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-foreground)', marginBottom: '0.4rem', fontWeight: 700 }}>
              1. Problema Identificado
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.6 }}>
              {proposal.problemIdentified}
            </p>
          </div>

          {/* Evidências Disponíveis */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-foreground)', marginBottom: '0.4rem', fontWeight: 700 }}>
              2. Evidências Disponíveis
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.6 }}>
              {proposal.availableEvidence}
            </p>
          </div>

          {/* Solução em Estudo */}
          <div style={{ backgroundColor: 'var(--color-primary-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(255, 198, 41, 0.4)' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-black)', marginBottom: '0.4rem', fontWeight: 800 }}>
              3. Solução em Estudo
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-black)', lineHeight: 1.6 }}>
              {proposal.proposedSolution}
            </p>
          </div>

          {/* Grid de Metadados: Público, Competência, Custo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                Público Beneficiado
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)', marginTop: '0.3rem' }}>
                {proposal.targetBeneficiaries}
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                Competência Administrativa
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)', marginTop: '0.3rem' }}>
                {proposal.administrativeCompetence}
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                Estimativa de Custo
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-black)', marginTop: '0.3rem' }}>
                {proposal.estimatedCost}
              </div>
            </div>
          </div>

          {/* Fontes Consultadas */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-black)' }}>
              Fontes & Referências Oficiais Consultadas
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {proposal.consultedSources.map((source, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.875rem'
                  }}
                >
                  <span style={{ color: 'var(--color-black)' }}>{source.title}</span>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-black)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'underline' }}
                    >
                      <span>Acessar</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legal Notice */}
          <div
            style={{
              padding: '0.9rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
              border: '1px solid var(--color-border)',
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <AlertCircle size={16} />
            <span>
              Proposta em estágio de estudo técnico independente. Não representa compromisso orçamentário oficial da
              Prefeitura nem anúncio eleitoral partidário.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="button" onClick={onClose} className="btn-secondary">
            Fechar
          </button>
          <a href="#consulta" onClick={onClose} className="btn-primary">
            <span>Opinar sobre esta proposta</span>
          </a>
        </div>
      </div>
    </div >
  );
};
