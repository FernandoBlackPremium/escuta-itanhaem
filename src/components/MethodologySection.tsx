import React from 'react';
import { ExternalLink, Database, Scale } from 'lucide-react';
import { PUBLIC_SOURCES } from '../data/mockData';

export const MethodologySection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Participação 100% Voluntária & Cívica',
      description: 'Nenhum morador é obrigado a responder. Não há coleta de dados invasivos nem exigência de título eleitoral, CPF ou endereço residencial.'
    },
    {
      num: '02',
      title: 'Agregação Estatística & Proteção Individual',
      description: 'As respostas individuais são transformadas em conjuntos agregados de dados. Nomes ou eventuais contatos nunca são associados às respostas públicas.'
    },
    {
      num: '03',
      title: 'Cruzamento com Bases de Dados Oficiais',
      description: 'As demandas apontadas pelos munícipes são confrontadas com os números de execução orçamentária, saúde, educação e saneamento dos órgãos de controle.'
    },
    {
      num: '04',
      title: 'Análise de Viabilidade Jurídica & Orçamentária',
      description: 'Antes de qualquer conclusão ou proposta final, estuda-se a competência constitucional do município, o custo estimado e as fontes legítimas de custeio.'
    },
    {
      num: '05',
      title: 'Transparência Ativa & Independência',
      description: 'A iniciativa não representa oficialmente órgãos governamentais e divulga abertamente as fontes públicas que fundamentam cada estudo.'
    }
  ];

  return (
    <section id="metodologia" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      {/* 5 Pillars (Styled with high-conversion-nexus typography & list styling) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3.5rem',
          marginBottom: '5.5rem'
        }}
        className="methodology-grid"
      >
        {/* Left column */}
        <div>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <span className="dot-yellow"></span>
            Transparência & Rigor Técnico
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--color-black)'
            }}
          >
            Como os dados são <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>tratados e validados</em>.
          </h2>

          <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Não produzimos promessas vazias. Toda contribuição da população de Itanhaém passa por um método claro e
            transparente que transforma relatos em diagnóstico fundamentado.
          </p>

          <div
            style={{
              marginTop: '2rem',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <Scale size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--color-black)', fontWeight: 500 }}>
              Compromisso estrito com a Lei Geral de Proteção de Dados (LGPD) e com as regras cívicas democráticas.
            </span>
          </div>
        </div>

        {/* Right column: Distinctive numbered list matching reference */}
        <div>
          <ul style={{ listStyle: 'none', borderBlock: '1px solid var(--color-border)' }}>
            {pillars.map((item) => (
              <li
                key={item.num}
                style={{
                  paddingBlock: '1.5rem',
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingInline = '1rem';
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingInline = '0';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      color: 'var(--color-primary)',
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-black)' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Official Public Sources Directory (SwiftUI Inset Grouped) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-2xl)',
          padding: 'clamp(1.75rem, 4.5vw, 3.25rem)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Database size={24} color="var(--color-primary)" />
          <h3 className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-black)' }}>
            Fontes Públicas Oficiais Consultadas
          </h3>
        </div>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '44rem' }}>
          Qualquer cidadão pode auditar as bases de dados públicas utilizadas na formulação e checagem de viabilidade das
          propostas para Itanhaém:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {PUBLIC_SOURCES.map((src, idx) => (
            <div
              key={idx}
              className="swiftui-card"
              style={{
                padding: '1.65rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    color: 'var(--color-black)',
                    backgroundColor: 'var(--color-primary-surface)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-block',
                    marginBottom: '0.65rem'
                  }}
                >
                  {src.theme}
                </span>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-black)' }}>
                  {src.name}
                </h4>

                <div style={{ fontSize: '0.775rem', color: 'var(--color-text-secondary)', marginBottom: '0.85rem', fontWeight: 500 }}>
                  Órgão responsável: {src.organ}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {src.description}
                </p>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-black)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '0.2rem',
                  width: 'fit-content',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-black)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                <span>Acessar portal oficial</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .methodology-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
            gap: 4.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
