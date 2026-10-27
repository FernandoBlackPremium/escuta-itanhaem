import React from 'react';
import { ArrowRight, MessageSquare, Compass, Shield, Users, Sparkles, MapPin, Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface)',
        paddingTop: 'clamp(6rem, 9vw, 7.5rem)',
        paddingBottom: '4.5rem'
      }}
    >
      {/* Subtle Ambient Light Halos */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '20%',
          width: '35rem',
          height: '35rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 198, 41, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-px max-w-7xl" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Headline and Call-to-actions */}
          <div className="animate-fade-up">
            {/* Pill Tag */}
            <div className="pill-badge" style={{ marginBottom: '1.5rem' }}>
              <span className="dot-yellow"></span>
              Plataforma Cívica Municipal Independente
            </div>

            {/* Main Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                color: 'var(--color-black)',
                letterSpacing: '-0.03em'
              }}
            >
              Vamos construir uma Itanhaém{' '}
              <span
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  color: 'var(--color-black)',
                  fontWeight: 800
                }}
              >
                <em
                  style={{
                    fontStyle: 'normal',
                    backgroundImage: 'linear-gradient(120deg, var(--color-primary) 0%, #FFE082 100%)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 35%',
                    backgroundPosition: '0 88%',
                    paddingInline: '0.15em'
                  }}
                >
                  melhor
                </em>
              </span>
              , juntos.
            </h1>

            {/* Subtitle - Exact current phase copy */}
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '38rem'
              }}
            >
              Fase atual: diagnóstico cívico nos bairros, escuta ativa dos moradores e pesquisa de propostas realistas
              para Itanhaém, com foco em transparência, fiscalização e competência municipal.
            </p>

            {/* Social Trust / Civic Badges */}
            <div
              style={{
                marginTop: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <MapPin size={15} color="var(--color-primary)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-black)' }}>
                  Todos os bairros de Itanhaém
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Shield size={15} color="var(--emerald)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-black)' }}>
                  Iniciativa Cívica Independente
                </span>
              </div>
            </div>

            {/* CTA Buttons - Exact requested text */}
            <div
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <a href="#consulta" className="btn-primary" id="hero-btn-opinion">
                <span>Quero participar</span>
                <span className="btn-icon-wrapper">
                  <ArrowRight size={16} />
                </span>
              </a>

              <a href="#propostas" className="btn-secondary" id="hero-btn-themes">
                <Compass size={17} color="var(--color-black)" />
                <span>Conhecer as propostas</span>
              </a>
            </div>

            {/* Motto */}
            <div
              style={{
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <span
                style={{
                  height: '2rem',
                  width: '4px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '4px'
                }}
              ></span>
              <p
                style={{
                  fontSize: '0.925rem',
                  color: 'var(--color-black)',
                  fontStyle: 'italic',
                  fontWeight: 500
                }}
              >
                “Uma cidade melhor começa ouvindo quem vive nela.”
              </p>
            </div>
          </div>

          {/* Right Column: Apple-inspired Liquid Glass Inset Card */}
          <div style={{ position: 'relative' }} className="hero-visual-col">
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                background: 'linear-gradient(160deg, #171717 0%, #050505 100%)',
                padding: '2.5rem 2rem',
                color: '#FFFFFF',
                minHeight: '460px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Decorative Apple Liquid Halo (Institutional Yellow & Subtle Blue) */}
              <div
                style={{
                  position: 'absolute',
                  top: '-4rem',
                  right: '-4rem',
                  width: '16rem',
                  height: '16rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 198, 41, 0.22) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-3rem',
                  left: '-3rem',
                  width: '14rem',
                  height: '14rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(2, 132, 199, 0.16) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Card Header inside visual */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div className="pill-badge dark">
                    <span className="dot-yellow"></span>
                    Diagnóstico Comunitário
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.1em' }}>
                    <Activity size={14} color="var(--color-primary)" />
                    <span>AO VIVO · 2026</span>
                  </div>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.18 }}>
                  Da orla aos bairros do interior: todas as vozes contam.
                </h3>
                <p style={{ marginTop: '0.85rem', fontSize: '0.925rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.55 }}>
                  Mapeando gargalos em saúde, mobilidade, iluminação e novas oportunidades de tecnologia e trabalho para Itanhaém.
                </p>
              </div>

              {/* Liquid Glass Apple Widgets */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  marginTop: '2rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem'
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.15rem',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <MessageSquare size={16} color="var(--color-primary)" />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
                      Consulta Cívica
                    </span>
                  </div>
                  <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
                    12 Temas
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '0.2rem' }}>
                    Catálogo municipal
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.15rem',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Users size={16} color="var(--emerald)" />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
                      Participação
                    </span>
                  </div>
                  <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
                    100% Aberta
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '0.2rem' }}>
                    Sem burocracia ou filiação
                  </div>
                </div>
              </div>

              {/* Coastal footer info */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  marginTop: '1.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.65)'
                }}
              >
                <span>Itanhaém · Litoral Sul Paulista</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Inovação Cívica</span>
              </div>
            </div>

            {/* Floating Apple-like Badge with Liquid Glass Sheen */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                top: '-1.25rem',
                right: '-0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                zIndex: 20
              }}
            >
              <div
                style={{
                  height: '2.5rem',
                  width: '2.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-black)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--color-primary)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <Sparkles size={17} />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Escuta Ativa
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-black)' }}>
                  Voz aos bairros
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--color-text-secondary)'
          }}
        >
          <span>● Itanhaém · Diagnóstico 2026</span>
          <span className="hidden-mobile">● Participação Cidadã · Transparência · Propostas Viáveis</span>
          <span>● Role para conhecer ↓</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
            gap: 4.5rem !important;
          }
        }
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
