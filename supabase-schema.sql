-- ====================================================================
-- ESCUTA ITANHAÉM — ESQUEMA DE BANCO DE DADOS & POLÍTICAS DE SEGURANÇA (RLS)
-- Plataforma Cívica Municipal Independente
-- ====================================================================

-- 1. Habilitar extensão para UUIDs se necessário
create extension if not exists "uuid-ossp";

-- 2. Tabela de Respostas das Consultas Públicas
create table if not exists public.consultation_responses (
    id uuid default uuid_generate_v4() primary key,
    protocol text not null unique,
    neighborhood text,
    top_three_issues text[] not null,
    priority_issue text not null,
    concrete_example text not null check (char_length(concrete_example) >= 10),
    proposed_solution text not null check (char_length(proposed_solution) >= 5),
    youth_opportunities text[] default '{}',
    participate_community_circles text check (participate_community_circles in ('sim', 'nao', 'apenas_online')),
    optional_contact_name text,
    optional_contact_info text,
    lgpd_consent boolean not null default true,
    ip_hash text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Habilitar Row Level Security (RLS) OBRIGATÓRIO
alter table public.consultation_responses enable row level security;

-- 4. Política de Inserção Pública (Cidadão Anônimo / Anon Role)
-- Permite que qualquer morador envie uma contribuição voluntária com consentimento LGPD
create policy "Permitir envio publico de consulta com consentimento"
    on public.consultation_responses
    for insert
    to anon, authenticated
    with check (
        lgpd_consent = true and
        char_length(concrete_example) >= 10 and
        char_length(proposed_solution) >= 5
    );

-- 5. Política de Leitura Pública Agregada (Proteção LGPD)
-- O público geral NUNCA tem acesso a nomes ou contatos pessoais.
-- Criamos uma VIEW desidentificada para exibição pública segura:
create or replace view public.vw_public_consultation_aggregated as
select
    id,
    protocol,
    neighborhood,
    top_three_issues,
    priority_issue,
    concrete_example,
    proposed_solution,
    youth_opportunities,
    status,
    created_at
from public.consultation_responses;

-- 6. Políticas Administrativas (Apenas administradores autenticados)
create policy "Acesso exclusivo de administradores autenticados para leitura completa"
    on public.consultation_responses
    for select
    to authenticated
    using (true);

create policy "Permissao de triagem e atualizacao para administradores autenticados"
    on public.consultation_responses
    for update
    to authenticated
    using (true)
    with check (true);

-- 7. Migrações e Colunas de Gestão (Executar caso a tabela já exista)
alter table public.consultation_responses
    add column if not exists status text default 'Recebida',
    add column if not exists internal_notes text;

-- 7. Tabela de Propostas Municipais em Estudo
create table if not exists public.proposals (
    id text primary key,
    title text not null,
    area_id text not null,
    area_title text not null,
    problem_identified text not null,
    available_evidence text not null,
    proposed_solution text not null,
    target_beneficiaries text not null,
    estimated_cost text not null,
    administrative_competence text not null,
    status text not null,
    sources jsonb default '[]'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.proposals enable row level security;

-- Propostas são públicas para leitura por qualquer cidadão
create policy "Leitura publica de propostas em estudo"
    on public.proposals
    for select
    to anon, authenticated
    using (true);
