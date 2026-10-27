import React, { useState } from 'react';
import {
  X,
  MapPin,
  Info,
  Send
} from 'lucide-react';
import type { CivicArea, IssueStatus } from '../types';
import { CIVIC_ISSUES_CATALOG } from '../data/mockData';

interface ThemeDetailModalProps {
  area: CivicArea | null;
  isOpen: boolean;
  onClose: () => void;
  onReportIssue: (themeId: string) => void;
}

const STATUS_CONFIG: Record<
  IssueStatus,
  { label: string; bg: string; text: string; border: string; desc: string }
> = {
  'relato recebido': {
    label: 'Relato Recebido',
    bg: 'rgba(255, 198, 41, 0.12)',
    text: '#926100',
    border: 'rgba(255, 198, 41, 0.4)',
    desc: 'Registrado pelos moradores; aguardando checagem de fatos e cruzamento documental.'
  },
  'em verificação': {
    label: 'Em Verificação',
    bg: 'rgba(14, 165, 233, 0.1)',
    text: '#0284C7',
    border: 'rgba(14, 165, 233, 0.3)',
    desc: 'Equipe cívica apurando ocorrências, locais e consultas a diários oficiais e ouvidorias.'
  },
  'evidência encontrada': {
    label: 'Evidência Encontrada',
    bg: 'rgba(99, 102, 241, 0.1)',
    text: '#4F46E5',
    border: 'rgba(99, 102, 241, 0.3)',
    desc: 'Constatada comprovação por foto, protocolo oficial preexistente ou dados do TCE/DataSUS.'
  },
  'encaminhado para análise': {
    label: 'Encaminhado para Análise',
    bg: 'rgba(168, 85, 247, 0.1)',
    text: '#9333EA',
    border: 'rgba(168, 85, 247, 0.3)',
    desc: 'Em estudo técnico para formulação de instrumento cabível (Indicação ou Requerimento).'
  },
  'proposta em estudo': {
    label: 'Proposta em Estudo',
    bg: 'rgba(234, 88, 12, 0.1)',
    text: '#C2410C',
    border: 'rgba(234, 88, 12, 0.3)',
    desc: 'Transformado em proposta técnica com referências de outras cidades e avaliação de viabilidade.'
  },
  'resolvido/verificado': {
    label: 'Resolvido / Verificado',
    bg: 'rgba(16, 185, 129, 0.1)',
    text: '#059669',
    border: 'rgba(16, 185, 129, 0.3)',
    desc: 'Executado pelo Poder Público com evidência comprovada em campo ou publicação oficial.'
  }
};

export const ThemeDetailModal: React.FC<ThemeDetailModalProps> = ({
  area,
  isOpen,
  onClose,
  onReportIssue
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');

  if (!isOpen || !area) return null;

  const areaIssues = CIVIC_ISSUES_CATALOG.filter((issue) => issue.areaId === area.id);

  const filteredIssues =
    selectedStatus === 'Todos'
      ? areaIssues
      : areaIssues.filter((i) => i.status === selectedStatus);

  const handleStartReport = () => {
    onClose();
    onReportIssue(area.id);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '56rem',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '2.5rem',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <div className="pill-badge" style={{ marginBottom: '0.65rem' }}>
              <span className="dot-yellow"></span>
              Diagnóstico do Tema Cívico
            </div>
            <h3 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-black)' }}>
              {area.title}
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem', lineHeight: 1.55 }}>
              {area.description}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-secondary)',
              padding: '0.45rem',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center'
            }}
            aria-label="Fechar painel do tema"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content body scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '0.25rem' }}>
          {/* Municipal Competence Box */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.15rem 1.35rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}
          >
            <Info size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-black)', letterSpacing: '0.05em' }}>
                Alcance & Limites de Competência Municipal
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', lineHeight: 1.55 }}>
                {area.municipalCompetenceScope ||
                  'Questões de interesse predominantemente local cabem ao Executivo e Legislativo municipais. Matérias de concessões intermunicipais ou rodovias dependem de articulação com o Estado.'}
              </p>
            </div>
          </div>

          {/* Subheading & Status Filter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-black)' }}>
                  Questões & Relatos Catalogados ({areaIssues.length})
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  Status atualizado com base nas contribuições dos moradores e fiscalização cívica
                </p>
              </div>

              {/* Status pills selector */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {['Todos', 'relato recebido', 'em verificação', 'evidência encontrada', 'proposta em estudo'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatus(st)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: selectedStatus === st ? '1.5px solid var(--color-black)' : '1px solid var(--color-border)',
                      backgroundColor: selectedStatus === st ? 'var(--color-black)' : '#FFFFFF',
                      color: selectedStatus === st ? '#FFFFFF' : 'var(--color-black)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {st === 'Todos' ? 'Todos' : STATUS_CONFIG[st as IssueStatus]?.label || st}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Cataloged Issues */}
            {filteredIssues.length === 0 ? (
              <div
                style={{
                  padding: '2.5rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px dashed var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.9rem'
                }}
              >
                Nenhum relato específico cadastrado com este filtro de status ainda.
                <br />
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                  Seja o primeiro a relatar desafios desta área na sua rua ou bairro!
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredIssues.map((issue) => {
                  const statusInfo = STATUS_CONFIG[issue.status];
                  return (
                    <div
                      key={issue.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-xl)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}
                    >
                      {/* Top row: title & status badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              display: 'inline-block',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '0.25rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: statusInfo.bg,
                              color: statusInfo.text,
                              border: `1px solid ${statusInfo.border}`,
                              marginBottom: '0.5rem'
                            }}
                          >
                            ● {statusInfo.label}
                          </span>
                          <h5 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-black)', lineHeight: 1.4 }}>
                            {issue.title}
                          </h5>
                        </div>

                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                          Registrado em: {issue.dateRecorded}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                        {issue.description}
                      </p>

                      {/* Metadata badges: Neighborhoods, frequency, impact */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', fontSize: '0.785rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-black)', fontWeight: 600 }}>
                          <MapPin size={13} color="var(--color-primary)" />
                          {issue.neighborhoods.join(', ')}
                        </span>
                        {issue.frequency && (
                          <span style={{ color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                            Frequência: {issue.frequency}
                          </span>
                        )}
                        {issue.impactLevel && (
                          <span style={{ color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                            Impacto: {issue.impactLevel}
                          </span>
                        )}
                      </div>

                      {/* Status explanation & evidence */}
                      <div
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.75rem 1rem',
                          fontSize: '0.8rem',
                          lineHeight: 1.5,
                          borderLeft: `3px solid ${statusInfo.text}`
                        }}
                      >
                        <strong style={{ color: 'var(--color-black)' }}>Status da Investigação: </strong>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{issue.statusExplanation}</span>
                        {issue.evidenceFound && (
                          <div style={{ marginTop: '0.35rem', color: 'var(--color-black)' }}>
                            <strong>Evidência mapeada: </strong> {issue.evidenceFound}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div
          style={{
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border)',
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            Conhece outro problema relacionado a <strong>{area.title}</strong>?
          </span>

          <button
            type="button"
            onClick={handleStartReport}
            className="btn-primary"
            style={{ fontSize: '0.9rem', padding: '0.65rem 1.25rem' }}
          >
            <span>Relatar Problema neste Tema</span>
            <span className="btn-icon-wrapper">
              <Send size={14} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
