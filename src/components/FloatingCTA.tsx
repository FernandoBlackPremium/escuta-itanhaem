import React from 'react';
import { MessageSquareText } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  return (
    <a
      href="#consulta"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 40,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.85rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'rgba(17, 17, 17, 0.88)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        color: '#FFFFFF',
        padding: '0.45rem 0.5rem 0.45rem 1.25rem',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.14)',
        textDecoration: 'none',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1px solid rgba(255, 255, 255, 0.16)'
      }}
      className="floating-cta-button"
      aria-label="Participar da Consulta Pública Escuta Itanhaém"
    >
      <span style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '-0.01em' }} className="floating-cta-text">
        Quero Participar
      </span>
      <span
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '2.5rem',
          width: '2.5rem',
          borderRadius: '50%',
          background: 'var(--color-primary)',
          color: 'var(--color-black-deep)',
          boxShadow: '0 4px 14px rgba(255, 198, 41, 0.35)',
          transition: 'transform 0.2s ease'
        }}
        className="floating-cta-icon"
      >
        <MessageSquareText size={17} strokeWidth={2.2} />
      </span>

      <style>{`
        .floating-cta-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(255, 198, 41, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 198, 41, 0.4);
        }
        .floating-cta-button:hover .floating-cta-icon {
          transform: scale(1.06);
        }
        @media (max-width: 640px) {
          .floating-cta-text {
            display: none;
          }
          .floating-cta-button {
            padding: 0.4rem;
          }
        }
      `}</style>
    </a>
  );
};

