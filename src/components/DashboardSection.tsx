import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MapPin, AlertCircle, RefreshCw, MessageSquareQuote, ShieldCheck, Scale, ExternalLink, BookOpen } from 'lucide-react';
import { getAggregatedStats, fetchLivePublicStats } from '../services/storage';
import { PRIORITIZATION_CRITERIA, PUBLIC_SOURCES } from '../data/mockData';

export const DashboardSection: React.FC = () => {
  const [stats, setStats] = useState(() => getAggregatedStats());
  const [selectedSourceType, setSelectedSourceType] = useState<string>('Todos');
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

  const sourceTypes = ['Todos', 'Legislação', 'Fiscalização', 'Plano Municipal', 'Dados Oficiais'];
  const filteredSources = selectedSourceType === 'Todos'
    ? PUBLIC_SOURCES
    : PUBLIC_SOURCES.filter((s) => s.type === selectedSourceType);

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

      {/* Painel de Priorização Cívica com Critérios Públicos */}
      <div className="swiftui-card" style={{ marginBottom: '3rem', padding: '2.25rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 198, 41, 0.15)',
              color: 'var(--color-primary-dark)',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <Scale size={20} />
          </div>
          <div>
            <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--foreground)' }}>
              Critérios Públicos de Priorização
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
              Como os relatos dos cidadãos são avaliados para formulação técnica de propostas
            </p>
          </div>
        </div>

        {/* Anti-distortion warning banner */}
        <div
          style={{
            backgroundColor: 'rgba(255, 198, 41, 0.08)',
            border: '1px solid rgba(255, 198, 41, 0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}
        >
          <ShieldCheck size={20} style={{ color: 'var(--color-primary-dark)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.55 }}>
            <strong style={{ color: 'var(--foreground)' }}>Princípio contra distorção de volume bruto:</strong> O número
            bruto de relatos <em>não é transformado automaticamente em prova de prevalência</em>. Comunidades com maior acesso digital
            ou grupos organizados poderiam inflar demandas específicas. Para garantir justiça distributiva entre os 26 bairros,
            o Escuta Itanhaém pondera volume com gravidade, dispersão geográfica, evidências objetivas e viabilidade orçamentária.
          </div>
        </div>

        {/* 5 Public Criteria Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}
        >
          {PRIORITIZATION_CRITERIA.map((crit) => (
            <div
              key={crit.id}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Peso: {crit.weight}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Critério</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.4rem' }}>
                  {crit.name}
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {crit.description}
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.6rem', fontSize: '0.75rem', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                💡 {crit.caveat}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repositório de Fontes & Documentos Oficiais */}
      <div id="fontes" className="swiftui-card" style={{ marginBottom: '3rem', padding: '2.25rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                color: 'var(--foreground)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--foreground)' }}>
                Repositório de Fontes & Documentos Oficiais
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                Bases de dados, planos municipais e sistemas de controle externo utilizados na apuração
              </p>
            </div>
          </div>

          {/* Filter Pills for Source Types */}
          <div className="swiftui-segmented-control" style={{ flexWrap: 'wrap' }}>
            {sourceTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedSourceType(type)}
                className={`swiftui-segmented-btn ${selectedSourceType === type ? 'active' : ''}`}
                style={{ fontSize: '0.75rem' }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Sources Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}
        >
          {filteredSources.map((source, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 198, 41, 0.15)',
                      color: 'var(--color-primary-dark)'
                    }}
                  >
                    {source.type}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                    {source.organ}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.4rem' }}>
                  {source.name}
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {source.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  {source.theme}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', gap: '0.35rem', textDecoration: 'none' }}
                >
                  <span>Acessar</span>
                  <ExternalLink size={12} />
                </a>
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
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <AlertCircle size={22} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
        <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.55 }}>
          <strong style={{ color: 'var(--foreground)' }}>Nota Metodológica e Limitações da Pesquisa:</strong> Os indicadores
          apresentados neste painel decorrem de respostas voluntárias de moradores de Itanhaém. Trata-se de
          um instrumento cívico independente de escuta social ativa e diagnóstico participativo, não configurando amostragem probabilística censitária.
          As prioridades aqui indicadas servem de subsídio para cruzamento com bases públicas oficiais (DataSUS,
          SIOPE, IBGE, TCE-SP e Transparência Municipal). Esta iniciativa não é canal oficial da Prefeitura de Itanhaém,
          não substitui a Ouvidoria Municipal e não garante atendimento automático por órgãos públicos.
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
