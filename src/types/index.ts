export type AdministrativeStatus = 
  | 'Ideia inicial' 
  | 'Em levantamento de dados' 
  | 'Em análise jurídica' 
  | 'Em avaliação orçamentária' 
  | 'Pronta para discussão pública';

export interface CivicArea {
  id: string;
  title: string;
  icon: string;
  description: string;
  popularMentionsCount?: number;
  highlightIssues: string[];
}

export interface Proposal {
  id: string;
  title: string;
  areaId: string;
  areaTitle: string;
  problemIdentified: string;
  availableEvidence: string;
  proposedSolution: string;
  targetBeneficiaries: string;
  estimatedCost: string;
  administrativeCompetence: 'Municipal' | 'Parceria Estadual' | 'Consórcio Regional' | 'Federal/Estadual';
  consultedSources: {
    title: string;
    url?: string;
    description?: string;
  }[];
  status: AdministrativeStatus;
  dateUpdated: string;
}

export interface YouthOpportunityItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  targetAudience: string;
  civicRelevance: string;
  statusNotice: string;
}

export type TriageStatus =
  | 'Recebida'
  | 'Em triagem'
  | 'Em análise'
  | 'Necessita de informações adicionais'
  | 'Convertida em proposta'
  | 'Encaminhada ao órgão competente'
  | 'Concluída ou arquivada';

export interface ConsultationResponse {
  id: string;
  protocol: string;
  neighborhood?: string;
  topThreeIssues: string[];
  priorityIssue: string;
  concreteExample: string;
  proposedSolution: string;
  youthOpportunities: string[];
  participateCommunityCircles: 'sim' | 'nao' | 'apenas_online';
  optionalContactName?: string;
  optionalContactInfo?: string;
  lgpdConsent: boolean;
  status?: TriageStatus;
  internalNotes?: string;
  createdAt: string;
}

export interface PublicSource {
  name: string;
  organ: string;
  description: string;
  url: string;
  theme: string;
}
