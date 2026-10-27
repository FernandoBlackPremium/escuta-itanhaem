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
  ArrowUpRight
} from 'lucide-react';
import { CIVIC_AREAS } from '../data/mockData';

interface ThemesSectionProps {
  onSelectTheme: (themeId: string, themeTitle: string) => void;
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
  Droplets: <Droplets size={26} />
};

type ThemeCategoryFilter = 'all' | 'essenciais' | 'infra' | 'economia';

export const ThemesSection: React.FC<ThemesSectionProps> = ({ onSelectTheme }) => {
  const [filter, setFilter] = useState<ThemeCategoryFilter>('all');

  const filteredAreas = useMemo(() => {
    switch (filter) {
      case 'essenciais':
        return CIVIC_AREAS.filter((a) => ['saude', 'educacao', 'seguranca'].includes(a.id));
      case 'infra':
        return CIVIC_AREAS.filter((a) => ['mobilidade', 'iluminacao', 'drenagem', 'meio_ambiente'].includes(a.id));
      case 'economia':
        return CIVIC_AREAS.filter((a) => ['juventude', 'emprego', 'turismo'].includes(a.id));
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
          A Cidade pela Perspectiva dos Moradores
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
          Selecione uma área para analisar os desafios identificados e opinar sobre as prioridades que mais afetam a
          qualidade de vida no seu bairro.
        </p>

        {/* SwiftUI Segmented Picker (iOS Control Style) */}
        <div style={{ marginTop: '2.25rem', display: 'flex', justifyContent: 'center' }}>
          <div className="swiftui-segmented-control" role="tablist" aria-label="Filtrar áreas temáticas">
            <button
              className={`swiftui-segmented-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              role="tab"
              aria-selected={filter === 'all'}
            >
              Todos (10)
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
              className={`swiftui-segmented-btn ${filter === 'economia' ? 'active' : ''}`}
              onClick={() => setFilter('economia')}
              role="tab"
              aria-selected={filter === 'economia'}
            >
              Juventude & Emprego
            </button>
          </div>
        </div>
      </div>

      {/* 10 Thematic Cards Grid */}
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
            style={{ cursor: 'pointer', minHeight: '240px' }}
            onClick={() => onSelectTheme(area.id, area.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectTheme(area.id, area.title);
              }
            }}
          >
            {/* Top Row: Icon & Dynamic Arrow */}
            <div>
              <div className="card-icon" style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                {iconMap[area.icon] || <Sparkles size={26} />}
              </div>
              <span className="arrow-icon">
                <ArrowUpRight size={18} />
              </span>

              {/* Title & Description */}
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                {area.title}
              </h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.85, lineHeight: 1.55 }}>
                {area.description}
              </p>
            </div>

            {/* Bottom tags */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {area.highlightIssues.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid currentColor',
                    opacity: 0.75,
                    fontWeight: 500
                  }}
                >
                  {tag}
                </span>
              ))}
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
            Diagnóstico participativo: clique em qualquer área para registrá-la prioritariamente no formulário.
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
          Ir para a Consulta Pública →
        </a>
      </div>
    </section>
  );
};
