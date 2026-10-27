import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MapPin, AlertCircle, RefreshCw, MessageSquareQuote } from 'lucide-react';
import { getAggregatedStats, fetchLivePublicStats } from '../services/storage';

export const DashboardSection: React.FC = () => {
  const [stats, setStats] = useState(() => getAggregatedStats());
  const [liveData, setLiveData] = useState<{ isLive: boolean; totalResponses: number; recentVoices: any[] }>({
    isLive: false,
    totalResponses: stats.totalResponses,
    recentVoices: stats.sampleCitizenVoices
  });
  const [lastRefresh, setLastRefresh] = useState<string>(() =>
    new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  );

  const loadData = async () => {
    setStats(getAggregatedStats());
    const live = await fetchLivePublicStats();
    if (live.isLive) {
      setLiveData(live);
    }
    setLastRefresh(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = () => {
    loadData();
  };

  return (
    <section id="dashboard" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '48rem', marginInline: 'auto', marginBottom: '3.5rem' }}>
        <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
          <span className="dot-yellow"></span>
          Painel Público de Transparência
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
          Resultados agregados da <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>escuta pública</em>.
        </h2>

        <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Indicadores calculados a partir das participações registradas. Os dados são anonimizados e organizados para
          subsidiar o debate público e a elaboração de soluções municipais.
        </p>

        {/* Live sync badge */}
        <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.825rem',
              backgroundColor: 'var(--emerald-bg)',
              color: 'var(--emerald)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--emerald-border)',
              fontWeight: 600
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--emerald)' }}></span>
            Atualização em tempo real (Última: {lastRefresh})
          </span>

          <button
            type="button"
            onClick={refreshData}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.825rem',
              fontWeight: 600
            }}
            title="Atualizar dados"
          >
            <RefreshCw size={13} />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* Top 3 Metric Cards (SwiftUI iOS Widgets) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}
      >
        <div className="swiftui-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.75rem', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}>
          <div
            style={{
              height: '3.6rem',
              width: '3.6rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-primary)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Total de Contribuições Registradas
            </div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-black)', lineHeight: 1.1, marginTop: '0.15rem' }}>
              {liveData.isLive ? liveData.totalResponses : stats.totalResponses}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 600, marginTop: '0.2rem' }}>
              {liveData.isLive ? '✓ Conexão direta ao banco Supabase' : stats.localCount > 0 ? `+${stats.localCount} nesta sessão local` : 'Dados em tempo real'}
            </div>
          </div>
        </div>

        <div className="swiftui-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.75rem', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}>
          <div
            style={{
              height: '3.6rem',
              width: '3.6rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-primary)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
          >
            <MapPin size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Regiões e Bairros Cobertos
            </div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-black)', lineHeight: 1.1, marginTop: '0.15rem' }}>
              26 Bairros
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
              Da orla às zonas rurais
            </div>
          </div>
        </div>

        <div className="swiftui-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.75rem', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}>
          <div
            style={{
              height: '3.6rem',
              width: '3.6rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-primary)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
          >
            <BarChart3 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Propostas Técnicas em Estudo
            </div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-black)', lineHeight: 1.1, marginTop: '0.15rem' }}>
              6 Propostas
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-black)', fontWeight: 700, marginTop: '0.2rem' }}>
              Com estudo de fontes e custos
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid: Most Cited Themes & Regional Distribution */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '3rem'
        }}
        className="dashboard-two-cols"
      >
        {/* Most Cited Themes */}
        <div className="swiftui-card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-black)' }}>
                Temas Mais Mencionados como Prioridade
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Percentual de participantes que indicaram o tema entre as 3 maiores urgências
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            {stats.topThemes.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.45rem' }}>
                  <span style={{ color: 'var(--color-black)' }}>{item.name}</span>
                  <span style={{ color: 'var(--color-black)', fontWeight: 700 }}>{item.percentage}% ({item.count})</span>
                </div>
                <div
                  style={{
                    height: '0.7rem',
                    width: '100%',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${item.percentage}%`,
                      backgroundColor: idx === 0 ? 'var(--color-primary)' : 'var(--color-black)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="swiftui-card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-black)' }}>
                Distribuição das Contribuições por Região
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Equilíbrio territorial da escuta cívica municipal
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {stats.regionalDistribution.map((reg, idx) => (
              <div key={idx} style={{ padding: '0.85rem 1.1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-black)' }}>
                    {reg.region}
                  </span>
                  <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-black)' }}>
                    {reg.percentage}%
                  </span>
                </div>
                <div
                  style={{
                    height: '0.45rem',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${reg.percentage}%`,
                      backgroundColor: 'var(--ocean)',
                      borderRadius: 'var(--radius-full)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={15} />
            <span>
              Evita-se criar rankings de "piores bairros" para não estigmatizar comunidades.
            </span>
          </div>
        </div>
      </div>

      {/* Anonymized Citizen Voices Feed */}
      <div className="swiftui-card" style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem' }}>
          <MessageSquareQuote size={22} color="var(--color-primary)" />
          <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-black)' }}>
            Exemplos Reais Relatados pelos Moradores (Anonimizados)
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}
        >
          {stats.sampleCitizenVoices.map((voice, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition)'
              }}
            >
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-black)', lineHeight: 1.55, marginBottom: '1rem' }}>
                “{voice.quote}”
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-black)' }}>📍 {voice.neighborhood}</span>
                <span>{voice.issue}</span>
              </div>
            </div>
          ))}

          {/* Show locally added responses if any */}
          {stats.recentLocalSubmissions.map((local, idx) => (
            <div
              key={`local-${idx}`}
              style={{
                backgroundColor: 'var(--color-primary-surface)',
                border: '1.5px solid rgba(255, 198, 41, 0.45)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-black)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  ★ Contribuição Recente ({local.protocol})
                </span>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-black)', lineHeight: 1.55, marginBottom: '1rem' }}>
                  “{local.concreteExample}”
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--color-text-secondary)', borderTop: '1px solid rgba(255, 198, 41, 0.3)', paddingTop: '0.75rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-black)' }}>📍 {local.neighborhood || 'Itanhaém'}</span>
                <span>{local.priorityIssue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology Disclaimer */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <AlertCircle size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
          <strong style={{ color: 'var(--color-black)' }}>Nota Metodológica sobre os Dados:</strong> Os indicadores
          apresentados neste painel decorrem de respostas voluntárias de moradores de Itanhaém. Trata-se de
          um instrumento de diagnóstico cívico e escuta social ativa, não configurando amostragem censitária.
          As prioridades aqui indicadas servem de subsídio para cruzamento com bases públicas oficiais (DataSUS,
          SIOPE, IBGE e Transparência Municipal).
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .dashboard-two-cols {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
};
