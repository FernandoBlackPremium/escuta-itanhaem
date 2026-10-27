import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  onOpenPrivacyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPrivacyModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  // Handle scroll state for navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['top', 'consulta', 'temas', 'propostas', 'como-funciona', 'dashboard', 'metodologia', 'responsavel'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Manage body scroll lock and ESC key for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  // Clean, focused navigation items matching real existing sections
  const NAV_ITEMS = [
    { label: 'Início', href: '#top', id: 'top' },
    { label: 'Relatar Problema', href: '#consulta', id: 'consulta' },
    { label: 'Catálogo de Temas', href: '#temas', id: 'temas' },
    { label: 'Propostas', href: '#propostas', id: 'propostas' },
    { label: 'Como Funciona', href: '#como-funciona', id: 'como-funciona' },
    { label: 'Transparência & Fontes', href: '#dashboard', id: 'dashboard' },
    { label: 'Sobre o Idealizador', href: '#responsavel', id: 'responsavel' },
  ];

  const handleNavClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Floating Island Dock Navigation Header (CoLabs & Apple Liquid Glass inspired) */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          pointerEvents: 'none',
          padding: isScrolled ? '0.75rem 1rem' : '1.15rem 1.25rem',
          transition: 'padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="header-wrapper"
      >
        <div
          className="navbar-dock max-w-7xl mx-auto"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4.15rem',
            padding: '0 0.85rem 0 1.25rem',
            borderRadius: '9999px',
            background: isScrolled
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.55) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.38) 100%)',
            backdropFilter: 'blur(24px) saturate(190%) contrast(104%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%) contrast(104%)',
            border: isScrolled ? '1.5px solid rgba(255, 198, 41, 0.75)' : '1.5px solid rgba(255, 198, 41, 0.55)',
            boxShadow: isScrolled
              ? '0 16px 40px -10px rgba(0, 0, 0, 0.12), 0 0 18px -2px rgba(255, 198, 41, 0.22), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04)'
              : '0 10px 32px -8px rgba(0, 0, 0, 0.08), 0 0 14px -2px rgba(255, 198, 41, 0.16), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Brand Logo & Lockup (Left) */}
          <a
            href="#top"
            onClick={handleNavClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: 'var(--color-black)'
            }}
            aria-label="Escuta Itanhaém - Ir para o início"
          >
            <BrandMark size={36} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                className="font-display"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: 'var(--color-black)'
                }}
              >
                Escuta Itanhaém<span style={{ color: 'var(--color-primary)' }}>.</span>
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              >
                Diagnóstico Cívico
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Center - Light subtle glass pill) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              padding: '0.2rem 0.35rem',
              borderRadius: '9999px'
            }}
            className="desktop-nav"
            aria-label="Navegação principal"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link-item ${isActive ? 'is-active' : ''}`}
                  style={{
                    position: 'relative',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-black)' : 'var(--color-text-secondary)',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Primary CTA & Mobile Menu Button (Right - Light Glassmorphism) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a
              href="#consulta"
              className="desktop-cta-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.55rem',
                background: 'linear-gradient(135deg, rgba(255, 198, 41, 0.94) 0%, rgba(255, 215, 64, 0.86) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: 'var(--color-black-deep)',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(255, 198, 41, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid rgba(255, 255, 255, 0.55)'
              }}
            >
              <span>Quero participar</span>
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  height: '1.35rem',
                  width: '1.35rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-black-deep)',
                  color: '#FFFFFF'
                }}
                className="cta-arrow-circle"
              >
                <ArrowRight size={11} strokeWidth={2.6} />
              </span>
            </a>

            {/* Mobile Menu Toggle Button (Light Glassmorphism pill button) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle-btn"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: mobileOpen ? 'var(--color-black-deep)' : 'rgba(255, 255, 255, 0.35)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: mobileOpen ? '#FFFFFF' : 'var(--color-black)',
                border: mobileOpen ? '1px solid var(--color-black-deep)' : '1px solid rgba(255, 198, 41, 0.45)',
                boxShadow: mobileOpen ? 'none' : '0 2px 6px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                fontSize: '0.825rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: 'pointer',
              }}
            >
              <span>{mobileOpen ? 'Fechar' : 'Menu'}</span>
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (CoLabs Full-Screen High-Impact Liquid Glass) */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5, 5, 5, 0.96)',
            backdropFilter: 'blur(32px) saturate(190%)',
            WebkitBackdropFilter: 'blur(32px) saturate(190%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem',
            animation: 'fadeIn 0.22s ease-out'
          }}
        >
          {/* Drawer Top Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BrandMark size={38} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Escuta Itanhaém<span style={{ color: 'var(--color-primary)' }}>.</span>
                </span>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Diagnóstico Cívico
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
              aria-label="Fechar menu"
            >
              <span>Fechar</span>
              <X size={16} />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBlock: 'auto', paddingBlock: '1.5rem' }}>
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 0.5rem',
                    textDecoration: 'none',
                    color: isActive ? 'var(--color-primary)' : '#FFFFFF',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s ease'
                  }}
                  className="mobile-drawer-link"
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
                      {formattedIndex}
                    </span>
                    <span style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight size={18} style={{ opacity: 0.6 }} />
                </a>
              );
            })}
          </div>

          {/* Drawer Bottom Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
            <a
              href="#consulta"
              onClick={handleNavClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-black-deep)',
                padding: '0.95rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(255, 198, 41, 0.35)'
              }}
            >
              <span>Quero participar</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', paddingInline: '0.5rem' }}>
              <span>Itanhaém/SP · Participação Cidadã</span>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenPrivacyModal();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary-soft)',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  textDecoration: 'underline'
                }}
              >
                Privacidade & LGPD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS for Hover Transitions, Breakpoints & Fallbacks */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .nav-link-item:hover {
          color: var(--color-black) !important;
          background-color: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .desktop-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 198, 41, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.8) !important;
          background: linear-gradient(135deg, rgba(255, 208, 64, 0.98) 0%, rgba(255, 198, 41, 0.92) 100%) !important;
        }

        .desktop-cta-btn:hover .cta-arrow-circle {
          transform: translateX(2px);
        }

        .desktop-cta-btn:active {
          transform: translateY(0);
        }

        .mobile-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.5) !important;
          border-color: rgba(255, 198, 41, 0.65) !important;
        }

        .mobile-drawer-link:hover {
          color: var(--color-primary) !important;
          padding-left: 0.75rem !important;
        }

        /* Solid fallback for browsers without backdrop-filter */
        @supports not (backdrop-filter: blur(1px)) {
          .navbar-dock {
            background-color: #FFFFFF !important;
            border-color: #FFC629 !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
          }
        }

        /* Responsive Breakpoints */
        @media (min-width: 1040px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta-btn {
            display: inline-flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
