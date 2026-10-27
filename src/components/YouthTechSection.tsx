import React from 'react';
import {
  Cpu,
  ShieldAlert,
  Code2,
  TrendingUp,
  Calculator,
  ShoppingBag,
  Award,
  Compass,
  Lightbulb,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { YOUTH_OPPORTUNITY_MODULES } from '../data/mockData';

const youthIconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={24} />,
  ShieldAlert: <ShieldAlert size={24} />,
  Code2: <Code2 size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Calculator: <Calculator size={24} />,
  ShoppingBag: <ShoppingBag size={24} />,
  Award: <Award size={24} />,
  Compass: <Compass size={24} />,
  Lightbulb: <Lightbulb size={24} />,
  HeartHandshake: <HeartHandshake size={24} />
};

export const YouthTechSection: React.FC = () => {
  return (
    <section
      id="juventude"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #111111 100%)',
        color: '#FFFFFF',
        paddingBlock: '6rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Yellow Ambient Aura */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '32rem',
          height: '32rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 198, 41, 0.14) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '5%',
          width: '28rem',
          height: '28rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 198, 41, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-px max-w-7xl" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '48rem', marginBottom: '3.5rem' }}>
          <div className="pill-badge dark" style={{ marginBottom: '1.25rem' }}>
            <span className="dot-yellow"></span>
            Primeiro Eixo Temático Aprofundado
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#FFFFFF'
            }}
          >
            Juventude, tecnologia & <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>empreendedorismo</em>.
          </h2>

          <p style={{ marginTop: '1.25rem', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.6 }}>
            Itanhaém tem um potencial jovem imenso que necessita de conexões reais com a nova economia. Apresentamos 10
            iniciativas em estudo para qualificação digital, cidadania e abertura de caminhos profissionais.
          </p>

          {/* Clarity Disclaimer */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '0.6rem 1rem',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            <Info size={16} color="var(--color-primary)" />
            <span>
              <strong>Atenção:</strong> Iniciativas apresentadas como propostas em estudo e debate público, e não como
              serviços governamentais já disponíveis.
            </span>
          </div>
        </div>

        {/* 10 Youth Modules Cards Grid with Liquid Glass Dark */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {YOUTH_OPPORTUNITY_MODULES.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.borderColor = 'rgba(255, 198, 41, 0.45)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Top: Icon & Category */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      height: '3rem',
                      width: '3rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-primary)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--color-black)',
                      boxShadow: '0 4px 14px rgba(255, 198, 41, 0.35)'
                    }}
                  >
                    {youthIconMap[item.icon] || <Sparkles size={24} />}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255, 255, 255, 0.55)',
                      fontWeight: 600
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: '#FFFFFF' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {item.description}
                </p>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.035)',
                    borderLeft: '3px solid var(--color-primary)',
                    padding: '0.65rem 0.85rem',
                    marginBottom: '1rem',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Impacto Cívico:
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                    {item.civicRelevance}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-primary-soft)'
                }}
              >
                <span className="dot-yellow"></span>
                <span>{item.statusNotice}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Special Call to Action Card: "Que oportunidade você gostaria de ver em Itanhaém?" */}
        <div
          style={{
            marginTop: '4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px dashed rgba(255, 198, 41, 0.45)',
            borderRadius: 'var(--radius-2xl)',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.25rem',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div
            style={{
              height: '3.5rem',
              width: '3.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 198, 41, 0.14)',
              border: '1px solid rgba(255, 198, 41, 0.35)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--color-primary)'
            }}
          >
            <Lightbulb size={28} />
          </div>

          <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 700 }}>
            Que oportunidade você gostaria de ver em Itanhaém?
          </h3>

          <p style={{ maxWidth: '36rem', color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.975rem' }}>
            Tem uma ideia de curso, projeto esportivo, oficina de artesanato ou tecnologia para os jovens do seu bairro?
            Registre sua sugestão na consulta e ajude a desenhar a viabilidade técnica.
          </p>

          <a href="#consulta" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            <span>Sugerir Oportunidade para a Juventude</span>
            <span className="btn-icon-wrapper">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
