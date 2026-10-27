import React from 'react';
import { ArrowRight, MessageSquare, ExternalLink } from 'lucide-react';
import { BrandMark } from './BrandMark';

interface FooterProps {
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  return (
    <>
      {/* High-Impact Pre-Footer Civic CTA Banner (Black Deep container with Liquid Yellow Halos) */}
      <section className="container-px max-w-7xl" style={{ paddingBlock: '4.5rem' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-3xl)',
            backgroundColor: 'var(--color-black-deep)',
            color: '#FFFFFF',
            padding: 'clamp(2.5rem, 6vw, 5rem)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          {/* Subtle Ambient Yellow Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '32rem',
              height: '32rem',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 198, 41, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '44rem' }}>
            <div
              style={{
                height: '3.5rem',
                width: '3.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(255, 198, 41, 0.14)',
                border: '1px solid rgba(255, 198, 41, 0.35)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--color-primary)',
                marginBottom: '1.75rem',
                boxShadow: '0 4px 14px rgba(255, 198, 41, 0.25)'
              }}
            >
              <MessageSquare size={24} />
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
              Uma Itanhaém melhor começa com a{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>sua participação</em>.
            </h2>

            <p style={{ marginTop: '1.25rem', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.6 }}>
              Dedique menos de 3 minutos para registrar os desafios do seu bairro. Cada sugestão ajuda a construir
              diagnósticos técnicos viáveis e transparentes para a nossa cidade.
            </p>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#consulta" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.65rem 0.75rem 0.65rem 2.2rem' }}>
                <span>Participar da Consulta Pública</span>
                <span className="btn-icon-wrapper">
                  <ArrowRight size={18} />
                </span>
              </a>
            </div>
          </div>

          {/* Large Monogram Watermark */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '-3rem',
              bottom: '-3rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(14rem, 24vw, 22rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'rgba(255, 255, 255, 0.035)',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            I.
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: '#FFFFFF',
          paddingTop: '4.5rem',
          paddingBottom: '3rem'
        }}
      >
        <div className="container-px max-w-7xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3.5rem'
            }}
          >
            {/* Column 1: Brand & Disclaimer */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <BrandMark size={34} />
                <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-black)' }}>
                  Escuta Itanhaém<span style={{ color: 'var(--color-primary)' }}>.</span>
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Plataforma cívica municipal independente para escuta social ativa e estruturação de propostas viáveis para
                Itanhaém, SP.
              </p>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  lineHeight: 1.45
                }}
              >
                <strong>Iniciativa Independente:</strong> Não possui vínculo com a Prefeitura de Itanhaém, Câmara Municipal
                ou partidos políticos.
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-black)', marginBottom: '1.15rem' }}>
                Navegação Cívica
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.875rem' }}>
                <li>
                  <a href="#top" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    Início
                  </a>
                </li>
                <li>
                  <a href="#temas" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    Temas em Avaliação
                  </a>
                </li>
                <li>
                  <a href="#consulta" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    Consulta Pública
                  </a>
                </li>
                <li>
                  <a href="#juventude" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    Juventude & IA
                  </a>
                </li>
                <li>
                  <a href="#propostas" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    Propostas em Estudo
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Transparência & Rigor */}
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-black)', marginBottom: '1.15rem' }}>
                Transparência & Dados
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.875rem' }}>
                <li>
                  <a href="#dashboard" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    Painel de Resultados
                  </a>
                </li>
                <li>
                  <a href="#metodologia" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    Metodologia Técnica
                  </a>
                </li>
                <li>
                  <a
                    href="https://transparencia.itanhaem.sp.gov.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>Portal Transparência Itanhaém</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://cidades.ibge.gov.br/brasil/sp/itanhaem/panorama"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>Panorama IBGE</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenPrivacyModal}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-black)',
                      fontWeight: 700,
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: 'inherit',
                      textAlign: 'left'
                    }}
                  >
                    Política de Privacidade & LGPD
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contato & Atualização */}
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-black)', marginBottom: '1.15rem' }}>
                Contato Cívico
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Dúvidas, sugestões metodológicas ou interesse em colaborar com a análise técnica:
              </p>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-black)', marginBottom: '1rem' }}>
                contato@escutaitanhaem.org.br
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--color-text-secondary)' }}>
                <strong>Última atualização:</strong> Outubro de 2026
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.85rem',
              color: 'var(--muted-foreground)'
            }}
          >
            <div>
              © 2026 Escuta Itanhaém. Plataforma Cívica Independente. Todos os direitos reservados.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <button
                type="button"
                onClick={onOpenPrivacyModal}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}
              >
                Privacidade
              </button>
              <a href="#top" style={{ color: 'var(--foreground)', fontWeight: 600, textDecoration: 'none' }}>
                Voltar ao topo ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
