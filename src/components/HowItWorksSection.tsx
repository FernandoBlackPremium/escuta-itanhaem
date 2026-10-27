import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="container-px max-w-7xl" style={{ paddingBlock: '5.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '52rem', marginInline: 'auto', marginBottom: '3.5rem' }}>
        <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
          <span className="dot-yellow"></span>
          Transparência Cívica & Didática Constitucional
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
          Como funciona o projeto & <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>o papel do vereador</em>.
        </h2>

        <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Acreditamos que a boa política começa com honestidade sobre o que a lei permite fazer. O Escuta Itanhaém
          organiza a escuta da população com rigor técnico para que as propostas nasçam juridicamente viáveis, sem
          promessas vazias.
        </p>
      </div>

      {/* Grid: O que pode vs O que não pode */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}
      >
        {/* Card 1: O que o Vereador PODE fazer */}
        <div
          className="swiftui-card"
          style={{
            padding: '2.5rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                height: '3rem',
                width: '3rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--emerald)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-black)' }}>
                O que o Vereador PODE fazer
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
                Competências Constitucionais Legítimas
              </span>
            </div>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.15rem', fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Legislar sobre o interesse local:</strong> Elaborar Projetos de Lei Municipal, modernizar o Plano Diretor e adequar regras urbanas, tributárias e de proteção ambiental.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Fiscalizar os atos do Executivo:</strong> Acompanhar contratos, medições de obras públicas, licitações, gastos com saúde e aplicação dos recursos da educação.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Requerer informações oficiais (com força legal):</strong> Solicitar prestação de contas e documentos formais da Prefeitura com prazo legal obrigatório de resposta.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Apresentar Indicações de melhorias:</strong> Apontar à Prefeitura e secretarias demandas urgentes dos bairros (iluminação, asfalto, patrolamento e limpeza).
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Emendas ao Orçamento Municipal:</strong> Destinar fatias das emendas impositivas a projetos prioritários para postos de saúde, escolas e entidades locais.
              </div>
            </li>
          </ul>
        </div>

        {/* Card 2: O que o Vereador NÃO PODE fazer */}
        <div
          className="swiftui-card"
          style={{
            padding: '2.5rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                height: '3rem',
                width: '3rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#DC2626',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <XCircle size={24} />
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-black)' }}>
                O que o Vereador NÃO PODE fazer
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: 700, textTransform: 'uppercase' }}>
                Limites Legais que Devem Ser Respeitados
              </span>
            </div>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.15rem', fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Não executa obras ou serviços diretamente:</strong> O vereador não opera máquinas de asfalto, não compra medicamentos nem comanda equipes de patrolamento. Quem executa é a Prefeitura.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Não cria despesas administrativas privativas:</strong> Não pode aprovar leis que contratem servidores ou criem atribuições para secretarias sem iniciativa privativa do Prefeito.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Não comanda órgãos estaduais ou federais:</strong> A Polícia Militar, Polícia Civil, Sabesp e rodovias sob concessão estadual respondem ao Governo do Estado de SP, não à Câmara de Itanhaém.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Não substitui a Justiça nem a Polícia:</strong> O mandato atua no plano político-institucional e legislativo, devendo encaminhar denúncias ao Ministério Público e TCE-SP.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <XCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--color-black)' }}>Não promete resolver na hora:</strong> Quem promete asfaltar rua por conta própria está descumprindo a lei. A cobrança séria exige estudo de viabilidade e processo licitatório.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Como o Escuta Itanhaém transforma relatos em soluções */}
      <div
        className="swiftui-card"
        style={{
          padding: 'clamp(2rem, 4vw, 3.25rem)',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          marginBottom: '3.5rem'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '42rem', marginInline: 'auto', marginBottom: '2.5rem' }}>
          <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-black)' }}>
            O Método Escuta Itanhaém: Da Rua ao Projeto Viável
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
            Nossa metodologia cívica independente conecta a dor concreta do morador aos instrumentos oficiais do município
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem'
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <div style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', backgroundColor: 'var(--color-black)', color: 'var(--color-primary)', display: 'grid', placeItems: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              1
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.4rem' }}>
              Escuta Anônima & Livre
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
              O morador registra o problema do seu bairro com foco no fato, frequência e impacto, sem exigir CPF ou constrangimento político.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <div style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', backgroundColor: 'var(--color-black)', color: 'var(--color-primary)', display: 'grid', placeItems: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              2
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.4rem' }}>
              Checagem & Evidências
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
              Cruzamos os relatos com dados do Portal da Transparência, TCE-SP, DataSUS e normas técnicas para verificar a procedência dos dados.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <div style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', backgroundColor: 'var(--color-black)', color: 'var(--color-primary)', display: 'grid', placeItems: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              3
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.4rem' }}>
              Benchmarking & Soluções
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
              Pesquisamos como cidades litorâneas vizinhas ou referências nacionais resolveram o mesmo desafio com menor custo e maior eficiência.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <div style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', backgroundColor: 'var(--color-black)', color: 'var(--color-primary)', display: 'grid', placeItems: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              4
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-black)', marginBottom: '0.4rem' }}>
              Instrumento Jurídico Certo
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
              Formatamos a proposta no instrumento cabível: Projeto de Lei, Indicação ao Executivo, Requerimento ou Emenda ao Orçamento Municipal.
            </p>
          </div>
        </div>
      </div>

      {/* Banner de Emergências Públicas */}
      <div
        style={{
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'rgba(255, 198, 41, 0.12)',
          border: '1.5px solid rgba(255, 198, 41, 0.5)',
          padding: '1.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '42rem' }}>
          <AlertTriangle size={24} color="#926100" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-black)', marginBottom: '0.25rem' }}>
              Aviso Importante: Este site não é canal oficial nem atende emergências
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              O <strong>Escuta Itanhaém</strong> é uma iniciativa cívica independente voltada ao planejamento e formulação de propostas públicas. Não temos poder de polícia, ambulância ou fiscalização coercitiva imediata. Em casos de risco iminente à vida ou patrimônio, acione imediatamente os órgãos de prontidão:
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-black)' }}>
            🚑 SAMU: <strong>192</strong>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-black)' }}>
            🚒 Bombeiros: <strong>193</strong>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-black)' }}>
            🚓 PM: <strong>190</strong>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-black)' }}>
            🛡️ Defesa Civil: <strong>199</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
