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

  // 1. Try Supabase if configured
  if (supabase) {
    try {
      const { error } = await supabase.from('consultation_responses').insert([
        {
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
        }
      ]);

      if (error) {
        console.warn('Erro ao gravar no Supabase, salvando localmente como fallback:', error);
      } else {
        // Also cache locally for immediate offline dashboard update
        saveLocally(submission);
        return { success: true, protocol };
      }
    } catch (err: unknown) {
      console.warn('Exceção na chamada Supabase:', err);
    }
  }

  // 2. LocalStorage Fallback (Resilient offline-first persistence)
  try {
    saveLocally(submission);
    return { success: true, protocol };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Falha ao salvar resposta.';
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
