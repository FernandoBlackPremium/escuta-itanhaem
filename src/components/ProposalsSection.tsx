import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROPOSALS_DATA } from '../data/mockData';
import type { Proposal, AdministrativeStatus } from '../types';
import { ProposalDetailModal } from './ProposalDetailModal';

export const ProposalsSection: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [activeModalProposal, setActiveModalProposal] = useState<Proposal | null>(null);

  const statuses: ('Todos' | AdministrativeStatus)[] = [
    'Todos',
    'Ideia inicial',
    'Em levantamento de dados',
    'Em análise jurídica',
    'Em avaliação orçamentária',
    'Pronta para discussão pública'
  ];

  const filteredProposals = selectedStatus === 'Todos'
    ? PROPOSALS_DATA
    : PROPOSALS_DATA.filter((p) => p.status === selectedStatus);

  const getStatusBadge = (status: AdministrativeStatus) => {
    switch (status) {
      case 'Pronta para discussão pública':
        return { bg: 'oklch(0.62 0.17 145 / 0.12)', text: 'oklch(0.55 0.17 145)', border: 'oklch(0.62 0.17 145 / 0.3)' };
      case 'Em avaliação orçamentária':
        return { bg: 'oklch(0.72 0.16 75 / 0.12)', text: 'oklch(0.65 0.16 75)', border: 'oklch(0.72 0.16 75 / 0.3)' };
      case 'Em análise jurídica':
        return { bg: 'oklch(0.55 0.2 290 / 0.12)', text: 'oklch(0.52 0.2 290)', border: 'oklch(0.55 0.2 290 / 0.3)' };
      case 'Em levantamento de dados':
        return { bg: 'oklch(0.58 0.16 235 / 0.12)', text: 'oklch(0.52 0.16 235)', border: 'oklch(0.58 0.16 235 / 0.3)' };
      default:
        return { bg: 'oklch(0.5 0.01 60 / 0.12)', text: 'oklch(0.4 0.01 60)', border: 'oklch(0.5 0.01 60 / 0.25)' };
    }
  };

  return (
    <section id="propostas" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '48rem', marginInline: 'auto', marginBottom: '3rem' }}>
        <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
          <span className="dot-yellow"></span>
          Propostas em Desenvolvimento
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
          Do problema real à <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>solução viável</em>.
        </h2>

        <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Acompanhe como as contribuições dos moradores são organizadas em iniciativas técnicas fundamentadas, com
          análise de competência, orçamento e fontes oficiais.
        </p>
      </div>

      {/* SwiftUI Segmented Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.45rem',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}
      >
        <div className="swiftui-segmented-control" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {statuses.map((status) => {
            const isSelected = selectedStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`swiftui-segmented-btn ${isSelected ? 'active' : ''}`}
                style={{ fontSize: '0.825rem' }}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Proposals Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {filteredProposals.map((prop) => {
          const badgeStyle = getStatusBadge(prop.status);
          return (
            <div
              key={prop.id}
              className="swiftui-card"
              style={{
                padding: '1.85rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                {/* Header: Area & Status Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {prop.areaTitle}
                  </span>
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: badgeStyle.bg,
                      color: badgeStyle.text,
                      border: `1px solid ${badgeStyle.border}`
                    }}
                  >
                    ● {prop.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '1rem', color: 'var(--color-black)' }}>
                  {prop.title}
                </h3>

                {/* Problem Highlight */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                    Problema Mapeado:
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-black)', opacity: 0.9, lineHeight: 1.55 }}>
                    {prop.problemIdentified}
                  </p>
                </div>

                {/* Solution Summary with Yellow Accent Glass Box */}
                <div
                  style={{
                    backgroundColor: 'var(--color-primary-surface)',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255, 198, 41, 0.4)',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                    Solução em Estudo:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-black)', lineHeight: 1.5 }}>
                    {prop.proposedSolution}
                  </p>
                </div>
              </div>

              {/* Card Footer: Metadata & Details Button */}
              <div>
                <div
                  style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1rem'
                  }}
                >
                  <span>Competência: <strong>{prop.administrativeCompetence}</strong></span>
                  <span>{prop.consultedSources.length} fontes consultadas</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProposal(prop)}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.7rem 1rem' }}
                >
                  <span>Ver Análise Detalhada & Fontes</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty Filter State */}
      {filteredProposals.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '3.5rem',
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border)'
          }}
        >
          <p style={{ color: 'var(--muted-foreground)', fontSize: '1rem' }}>
            Nenhuma proposta neste estágio no momento. Todas as ideias passam por análise técnica gradual.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <ProposalDetailModal
        proposal={activeModalProposal}
        onClose={() => setActiveModalProposal(null)}
      />
    </section>
  );
};
