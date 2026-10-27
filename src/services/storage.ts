import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { ConsultationResponse } from '../types';
import { INITIAL_DEMO_STATS } from '../data/mockData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch (err) {
    console.warn('Falha ao inicializar cliente Supabase, operando em modo local offline-first:', err);
  }
}

const LOCAL_STORAGE_KEY = 'escuta_itanhaem_submissions_v1';

export function isSupabaseConnected(): boolean {
  return !!supabase;
}

export function getSupabaseClient(): SupabaseClient | null {
  return supabase;
}

export function generateProtocolNumber(): string {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `EIT-2026-${timestamp}-${random}`;
}

export async function submitConsultation(
  data: Omit<ConsultationResponse, 'id' | 'protocol' | 'createdAt'>
): Promise<{ success: boolean; protocol: string; error?: string }> {
  const protocol = generateProtocolNumber();
  const submission: ConsultationResponse = {
    ...data,
    id: crypto.randomUUID ? crypto.randomUUID() : `sub-${Date.now()}`,
    protocol,
    createdAt: new Date().toISOString()
  };

  // 1. If Supabase is configured, enforce central remote persistence
  if (supabase) {
    try {
      const basePayload: Record<string, any> = {
        protocol: submission.protocol,
        neighborhood: submission.neighborhood || null,
        top_three_issues: submission.topThreeIssues,
        priority_issue: submission.priorityIssue,
        concrete_example: submission.concreteExample,
        proposed_solution: submission.proposedSolution,
        youth_opportunities: submission.youthOpportunities,
        participate_community_circles: submission.participateCommunityCircles,
        optional_contact_name: submission.optionalContactName || null,
        optional_contact_info: submission.optionalContactInfo || null,
        lgpd_consent: submission.lgpdConsent,
        created_at: submission.createdAt
      };

      const extendedPayload: Record<string, any> = {
        ...basePayload,
        ...(submission.frequency ? { frequency: submission.frequency } : {}),
        ...(submission.impactLevel ? { impact_level: submission.impactLevel } : {}),
        ...(submission.evidenceInfo ? { evidence_info: submission.evidenceInfo } : {}),
        ...(submission.isAnonymous !== undefined ? { is_anonymous: submission.isAnonymous } : {})
      };

      // Try inserting with extended columns first
      let { error } = await supabase.from('consultation_responses').insert([extendedPayload]);

      // If remote table hasn't added extended columns yet, fallback to base columns
      if (error && (error.message?.includes('column') || error.code === 'PGRST204')) {
        const retry = await supabase.from('consultation_responses').insert([basePayload]);
        error = retry.error;
      }

      if (error) {
        console.error('Falha de persistência no banco Supabase:', error);
        // CRITICAL P0 AUDIT FIX: Do NOT give a false confirmation to the resident!
        return {
          success: false,
          protocol: '',
          error: `Não foi possível registrar sua contribuição no servidor de dados (${error.message || 'Erro de autorização ou integridade'}). Por favor, tente novamente.`
        };
      }

      // Record successfully persisted in Supabase
      saveLocally(submission);
      return { success: true, protocol };
    } catch (err: unknown) {
      console.error('Exceção de rede na persistência Supabase:', err);
      const msg = err instanceof Error ? err.message : 'Falha de comunicação com o servidor';
      return {
        success: false,
        protocol: '',
        error: `Erro de conexão ao enviar contribuição: ${msg}. Verifique sua internet e tente novamente.`
      };
    }
  }

  // 2. Only in pure offline/local development without Supabase keys
  try {
    saveLocally(submission);
    return { success: true, protocol };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Falha ao salvar resposta localmente.';
    return { success: false, protocol: '', error: message };
  }
}

function saveLocally(submission: ConsultationResponse) {
  const stored = getLocalSubmissions();
  stored.unshift(submission);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stored));
}

export function getLocalSubmissions(): ConsultationResponse[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function fetchLivePublicStats(): Promise<{
  isLive: boolean;
  totalResponses: number;
  recentVoices: Array<{ neighborhood: string; issue: string; quote: string; date: string }>;
}> {
  if (supabase) {
    try {
      const { data, count, error } = await supabase
        .from('vw_public_consultation_aggregated')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && typeof count === 'number') {
        const voices = (data || []).map((row: any) => ({
          neighborhood: row.neighborhood || 'Itanhaém (Geral)',
          issue: row.priority_issue || 'Demanda Cívica',
          quote: row.concrete_example,
          date: new Date(row.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
        }));

        return {
          isLive: true,
          totalResponses: count,
          recentVoices: voices.length > 0 ? voices : INITIAL_DEMO_STATS.sampleCitizenVoices
        };
      }
    } catch (err) {
      console.warn('Erro ao consultar visão pública agregada:', err);
    }
  }

  const local = getLocalSubmissions();
  return {
    isLive: false,
    totalResponses: INITIAL_DEMO_STATS.totalResponses + local.length,
    recentVoices: INITIAL_DEMO_STATS.sampleCitizenVoices
  };
}

export function getAggregatedStats() {
  const localItems = getLocalSubmissions();
  const totalResponses = INITIAL_DEMO_STATS.totalResponses + localItems.length;

  return {
    isLive: localItems.length > 0 || isSupabaseConnected(),
    totalResponses,
    localCount: localItems.length,
    baseCount: INITIAL_DEMO_STATS.totalResponses,
    topThemes: INITIAL_DEMO_STATS.topThemes,
    regionalDistribution: INITIAL_DEMO_STATS.regionalDistribution,
    sampleCitizenVoices: INITIAL_DEMO_STATS.sampleCitizenVoices,
    recentLocalSubmissions: localItems.slice(0, 5)
  };
}

export async function fetchAdminSubmissions(): Promise<{
  data: ConsultationResponse[];
  error?: string;
}> {
  if (!supabase) {
    return { data: getLocalSubmissions() };
  }

  try {
    const { data, error } = await supabase
      .from('consultation_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }

    const mapped: ConsultationResponse[] = (data || []).map((r: any) => ({
      id: r.id,
      protocol: r.protocol,
      neighborhood: r.neighborhood || undefined,
      topThreeIssues: r.top_three_issues || [],
      priorityIssue: r.priority_issue,
      concreteExample: r.concrete_example,
      proposedSolution: r.proposed_solution,
      youthOpportunities: r.youth_opportunities || [],
      participateCommunityCircles: r.participate_community_circles || 'apenas_online',
      optionalContactName: r.optional_contact_name || undefined,
      optionalContactInfo: r.optional_contact_info || undefined,
      lgpdConsent: r.lgpd_consent,
      status: r.status || 'Recebida',
      internalNotes: r.internal_notes || undefined,
      createdAt: r.created_at
    }));

    return { data: mapped };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Falha ao buscar dados';
    return { data: [], error: msg };
  }
}

export async function updateSubmissionTriage(
  id: string,
  updates: { status?: string; internalNotes?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: true };

  try {
    const payload: Record<string, any> = {};
    if (updates.status) payload.status = updates.status;
    if (updates.internalNotes !== undefined) payload.internal_notes = updates.internalNotes;

    const { error } = await supabase
      .from('consultation_responses')
      .update(payload)
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Falha na atualização';
    return { success: false, error: msg };
  }
}
