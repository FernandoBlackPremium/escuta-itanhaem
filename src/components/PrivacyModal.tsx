import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                height: '2.8rem',
                width: '2.8rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--emerald)'
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)' }}>
                Aviso de Privacidade & LGPD
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                Plataforma Escuta Itanhaém · Lei Federal 13.709/2018
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted-foreground)',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center'
            }}
            aria-label="Fechar modal de privacidade"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: 1.6 }}>
          {/* 1. Controlador dos Dados */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.25rem' }}>
              1. Controlador e Encarregado dos Dados
            </h4>
            <p style={{ color: 'var(--muted-foreground)' }}>
              O projeto <strong>Escuta Itanhaém</strong> atua como controlador dos dados coletados na consulta pública,
              sob a coordenação técnica e cívica de Henrique Costa. Canal de contato do encarregado:{' '}
              <a href="mailto:privacidade@escutaitanhaem.org.br" style={{ color: 'var(--color-black)', fontWeight: 700, textDecoration: 'underline' }}>
                privacidade@escutaitanhaem.org.br
              </a>.
            </p>
          </div>

          {/* 2. Finalidade Específica */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
              2. Finalidade Específica do Tratamento
            </h4>
            <p style={{ color: 'var(--muted-foreground)' }}>
              A coleta de informações tem por objetivo exclusivo identificar demandas de infraestrutura, saúde, educação
              e juventude nos bairros de Itanhaém para estruturar diagnósticos cívicos e estudos de propostas públicas
              viáveis.
            </p>
          </div>

          {/* 3. Minimização de Dados */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
              3. Princípio da Minimização & Não Coleta de Dados Sensíveis
            </h4>
            <p style={{ color: 'var(--muted-foreground)' }}>
              A consulta foi estruturada sob o princípio da <strong>minimização estrita</strong>: não são exigidos CPF,
              título de eleitor, endereço domiciliar exato ou comprovante de residência. Não coletamos dados sensíveis
              relativos a convicções religiosas, filiação partidária, dados de saúde individualizados ou biometria.
            </p>
          </div>

          {/* 4. Proibição de Perfilamento Político */}
          <div style={{ backgroundColor: 'var(--color-primary-surface)', borderLeft: '3px solid var(--color-primary)', padding: '0.85rem 1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
            <h4 style={{ fontWeight: 700, color: 'var(--color-black-deep)', marginBottom: '0.25rem' }}>
              4. Proibição Expressa de Perfilamento Político
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--foreground)' }}>
              As respostas jamais serão utilizadas para inferir inclinações partidárias, criar perfis de eleitores ou
              alimentar ferramentas de propaganda dirigida. As respostas aos questionários são tratadas de forma agregada
              e anônima.
            </p>
          </div>

          {/* 5. Contato Opcional & Prazo de Retenção */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
              5. Contatos Opcionais e Prazo de Retenção
            </h4>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Campos de nome e contato (WhatsApp ou e-mail) são de preenchimento estritamente voluntário e visam apenas o
              envio de convites para rodas de conversa sobre o bairro ou devolutivas dos estudos técnicos. Tais dados ficam
              armazenados em ambiente seguro com restrição de acesso e serão descartados ao término do ciclo da consulta
              municipal (2026-2028), ou imediatamente após solicitação do titular.
            </p>
          </div>

          {/* 6. Direitos do Titular (Art. 18 LGPD) */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
              6. Direitos do Titular de Dados
            </h4>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
              Conforme o artigo 18 da LGPD, você pode exercer a qualquer momento:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>Confirmação da existência de tratamento de dados;</li>
              <li>Acesso, correção ou eliminação dos seus dados de contato opcionais;</li>
              <li>Revogação do consentimento fornecido.</li>
            </ul>
          </div>

          {/* 7. Participação de Adolescentes */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
              7. Participação de Jovens e Adolescentes
            </h4>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Jovens e estudantes a partir de 14 anos podem manifestar suas opiniões sobre propostas de capacitação,
              tecnologia e cultura no município. Em observância ao melhor interesse da criança e do adolescente (ECA e
              Art. 14 da LGPD), não é permitida qualquer exploração comercial desses dados.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn-primary">
            <span>Compreendido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
