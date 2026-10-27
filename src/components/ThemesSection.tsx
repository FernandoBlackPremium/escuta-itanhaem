import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  Car,
  Lightbulb,
  GraduationCap,
  Sparkles,
  Briefcase,
  Shield,
  Compass,
  Leaf,
  Droplets,
  Trophy,
  Heart,
  Home,
  FileText,
  Eye,
  Send
} from 'lucide-react';
import { CIVIC_AREAS } from '../data/mockData';
import type { CivicArea } from '../types';

interface ThemesSectionProps {
  onSelectTheme: (themeId: string, themeTitle?: string) => void;
  onOpenThemeDetails?: (area: CivicArea) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={26} />,
  Car: <Car size={26} />,
  Lightbulb: <Lightbulb size={26} />,
  GraduationCap: <GraduationCap size={26} />,
  Sparkles: <Sparkles size={26} />,
  Briefcase: <Briefcase size={26} />,
  Shield: <Shield size={26} />,
  Compass: <Compass size={26} />,
  Leaf: <Leaf size={26} />,
  Droplets: <Droplets size={26} />,
  Trophy: <Trophy size={26} />,
  Heart: <Heart size={26} />,
  Home: <Home size={26} />,
  FileText: <FileText size={26} />
};

type ThemeCategoryFilter = 'all' | 'essenciais' | 'infra' | 'desenvolvimento';

export const ThemesSection: React.FC<ThemesSectionProps> = ({
  onSelectTheme,
  onOpenThemeDetails
}) => {
  const [filter, setFilter] = useState<ThemeCategoryFilter>('all');

  const filteredAreas = useMemo(() => {
    switch (filter) {
      case 'essenciais':
        return CIVIC_AREAS.filter((a) =>
          ['saude', 'educacao', 'seguranca', 'protecao_animal'].includes(a.id)
        );
      case 'infra':
        return CIVIC_AREAS.filter((a) =>
          ['mobilidade', 'iluminacao', 'drenagem', 'habitacao'].includes(a.id)
        );
      case 'desenvolvimento':
        return CIVIC_AREAS.filter((a) =>
          ['desenvolvimento', 'turismo', 'esporte_lazer', 'transparencia'].includes(a.id)
        );
      default:
        return CIVIC_AREAS;
    }
  }, [filter]);

  return (
    <section id="temas" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '48rem', marginInline: 'auto', marginBottom: '3rem' }}>
        <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
          <span className="dot-yellow"></span>
          Catálogo Municipal de Desafios
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
          Áreas temáticas em <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>avaliação pública</em>.
        </h2>

        <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Explore o diagnóstico de cada tema, consulte os relatos com status de verificação e aponte os problemas que
          mais afetam o seu bairro.
        </p>

        {/* Segmented Filter */}
        <div style={{ marginTop: '2.25rem', display: 'flex', justifyContent: 'center' }}>
          <div className="swiftui-segmented-control" role="tablist" aria-label="Filtrar áreas temáticas">
            <button
              className={`swiftui-segmented-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              role="tab"
              aria-selected={filter === 'all'}
            >
              Todos os Temas ({CIVIC_AREAS.length})
            </button>
            <button
              className={`swiftui-segmented-btn ${filter === 'essenciais' ? 'active' : ''}`}
              onClick={() => setFilter('essenciais')}
              role="tab"
              aria-selected={filter === 'essenciais'}
            >
              Serviços Essenciais
            </button>
            <button
              className={`swiftui-segmented-btn ${filter === 'infra' ? 'active' : ''}`}
              onClick={() => setFilter('infra')}
              role="tab"
              aria-selected={filter === 'infra'}
            >
              Infraestrutura & Ambiente
            </button>
            <button
              className={`swiftui-segmented-btn ${filter === 'desenvolvimento' ? 'active' : ''}`}
              onClick={() => setFilter('desenvolvimento')}
              role="tab"
              aria-selected={filter === 'desenvolvimento'}
            >
              Economia, Cultura & Gestão
            </button>
          </div>
        </div>
      </div>

      {/* 12 Thematic Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {filteredAreas.map((area) => (
          <div
            key={area.id}
            className="category-card"
            style={{
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {/* Top Row: Icon & Status Counter */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="card-icon" style={{ color: 'var(--color-primary)' }}>
                  {iconMap[area.icon] || <Sparkles size={26} />}
                </div>

                <span
                  style={{
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF'
                  }}
                >
                  {area.catalogedIssuesCount || 3} relatos apurados
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                {area.title}
              </h3>
              <p style={{ fontSize: '0.86rem', opacity: 0.85, lineHeight: 1.55 }}>
                {area.description}
              </p>
            </div>

            {/* Bottom Actions Row */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
              {onOpenThemeDetails && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenThemeDetails(area);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    color: '#FFFFFF',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s ease'
                  }}
                  title="Ver diagnóstico e relatos com status de verificação"
                >
                  <Eye size={13} color="var(--color-primary)" />
                  <span>Ver Relatos</span>
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTheme(area.id, area.title);
                }}
                style={{
                  background: 'var(--color-primary)',
                  border: 'none',
                  color: 'var(--color-black)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease'
                }}
                title="Relatar um problema sobre este tema"
              >
                <span>Relatar</span>
                <Send size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SwiftUI Bottom Inset Banner */}
      <div
        style={{
          marginTop: '2.75rem',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.35rem 2rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="dot-yellow"></span>
          <span style={{ fontWeight: 500, color: 'var(--color-black)' }}>
            Não encontrou seu tema específico? Escolha <strong>"Outros Desafios"</strong> ou registre no formulário geral.
          </span>
        </div>
        <a
          href="#consulta"
          style={{
            color: 'var(--color-black)',
            fontWeight: 700,
            textDecoration: 'underline',
            textUnderlineOffset: '4px'
          }}
        >
          Relatar um Problema no Bairro →
        </a>
      </div>
    </section>
  );
};
