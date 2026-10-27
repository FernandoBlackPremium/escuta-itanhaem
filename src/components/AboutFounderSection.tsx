import React from 'react';
import { Shield, CheckCircle2, Phone, Mail, Globe } from 'lucide-react';
import { BrandMark } from './BrandMark';

export const AboutFounderSection: React.FC = () => {
  return (
    <section id="responsavel" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      <div
        className="swiftui-card"
        style={{
          padding: 'clamp(2rem, 5vw, 4rem)',
          backgroundColor: 'var(--card)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="about-grid"
        >
          {/* Left Column: Context & Bio */}
          <div>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <span className="dot-yellow"></span>
              Apresentação do Idealizador
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: 'var(--color-black)'
              }}
            >
              Por que decidi <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>ouvir Itanhaém</em>.
            </h2>

            <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              Sou <strong>Henrique Costa</strong>, desenvolvedor de software, especialista em produtos digitais e morador
              apaixonado por Itanhaém. Ao longo dos últimos anos acompanhando o dia a dia da cidade, percebi um padrão que
              se repete: muitas decisões sobre o município são pensadas distantes da realidade concreta das ruas e das
              famílias nos bairros.
            </p>

            <p style={{ marginTop: '1rem', fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              Decidi criar o <strong>Escuta Itanhaém</strong> como uma iniciativa cívica independente, colocando
              ferramentas contemporâneas de tecnologia e design para estruturar um diagnóstico comunitário sério,
              transparente e sem intermediários.
            </p>

            {/* Core Values checklist */}
            <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--emerald)" />
                <span style={{ fontSize: '0.95rem', color: 'var(--color-black)', fontWeight: 500 }}>
                  Compromisso com soluções reais, sustentáveis e juridicamente possíveis.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--emerald)" />
                <span style={{ fontSize: '0.95rem', color: 'var(--color-black)', fontWeight: 500 }}>
                  Respeito à privacidade do morador e à pluralidade de opiniões.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--emerald)" />
                <span style={{ fontSize: '0.95rem', color: 'var(--color-black)', fontWeight: 500 }}>
                  Independência na análise e compromisso com o interesse público.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Statement Card & Transparency Box */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '2.25rem',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <BrandMark size={52} />
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-black)' }}>
                    Henrique Costa<span style={{ color: 'var(--color-primary)' }}>.</span>
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    Idealizador do Escuta Itanhaém · Tecnologia & Inovação Cívica
                  </p>
                </div>
              </div>

              <blockquote
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-black)',
                  fontSize: '0.975rem',
                  lineHeight: 1.6,
                  borderLeft: '4px solid var(--color-primary)',
                  paddingLeft: '1.15rem',
                  marginBottom: '1.75rem'
                }}
              >
                “Uma cidade inteligente não é aquela repleta de telões caros, mas aquela que tem a humildade de ouvir quem
                está na ponta: a mãe esperando a vaga na creche, o jovem procurando o primeiro estágio e o comerciante
                precisando de segurança para abrir sua porta.”
              </blockquote>

              {/* Direct Channels */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={14} color="var(--color-primary)" />
                  <span style={{ color: 'var(--color-black)', fontWeight: 500 }}>(13) 93618-2327</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} color="var(--color-primary)" />
                  <span style={{ color: 'var(--color-black)', fontWeight: 500 }}>contato@henriquecosta.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Globe size={14} color="var(--color-primary)" />
                  <a
                    href="https://henriquecosta-pages.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-black)', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    henriquecosta-pages.vercel.app
                  </a>
                </div>
              </div>

              {/* Legal Transparency Alert */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.815rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-black)', fontWeight: 700, marginBottom: '0.65rem', fontSize: '0.875rem' }}>
                  <Shield size={16} color="var(--color-primary)" />
                  <span>Transparência e responsabilidade</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <p>
                    O Escuta Itanhaém é uma iniciativa de participação cidadã criada para ouvir os moradores, identificar prioridades e desenvolver propostas para a cidade.
                  </p>
                  <p>
                    A plataforma não promete executar obras ou serviços com recursos próprios. Seu objetivo é contribuir com diagnósticos, informações e propostas que possam ser encaminhadas aos órgãos e responsáveis competentes.
                  </p>
                  <p>
                    Neste momento, o foco é ouvir a população e compreender os desafios do município. O idealizador poderá vir a participar da vida política no futuro, inclusive por meio de uma candidatura, caso decida seguir esse caminho.
                  </p>
                  <p>
                    Independentemente dos próximos passos, o compromisso é tratar as contribuições dos moradores com responsabilidade, transparência e respeito à pluralidade de opiniões.
                  </p>
                  <p>
                    A iniciativa deve observar a legislação aplicável, inclusive as normas eleitorais e de proteção de dados, conforme sua atuação e eventual evolução.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
            gap: 4.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
