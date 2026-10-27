export type AdministrativeStatus = 
  | 'Ideia inicial' 
  | 'Em levantamento de dados' 
  | 'Em análise jurídica' 
  | 'Em avaliação orçamentária' 
  | 'Pronta para discussão pública';

export type IssueStatus =
  | 'relato recebido'
  | 'em verificação'
  | 'evidência encontrada'
  | 'encaminhado para análise'
  | 'proposta em estudo'
  | 'resolvido/verificado';

export interface CivicIssueItem {
  id: string;
  areaId: string;
  title: string;
  description: string;
  neighborhoods: string[];
  frequency?: string;
  impactLevel?: string;
  evidenceFound?: string;
  status: IssueStatus;
  statusExplanation: string;
  dateRecorded: string;
}

export interface CivicArea {
  id: string;
  title: string;
  icon: string;
  description: string;
  popularMentionsCount?: number;
  highlightIssues: string[];
  catalogedIssuesCount?: number;
  municipalCompetenceScope?: string;
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
  // Campos detalhados da metodologia
  existingLawOrProgram?: string;
  referenceCity?: string;
  referenceStage?: 'Ideia' | 'Projeto piloto' | 'Lei aprovada' | 'Implementada' | 'Resultado medido';
  municipalInstrument?: 'Projeto de Lei Ordinária' | 'Emenda à Lei Orgânica' | 'Indicação ao Executivo' | 'Requerimento de Informação' | 'Emenda Impositiva';
  risksAndCosts?: string;
  trackingIndicator?: string;
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
  // Novos campos estruturados para qualificação da escuta
  frequency?: 'Diário / Contínuo' | 'Semanal' | 'Períodos de chuva' | 'Temporada de verão' | 'Esporádico';
  impactLevel?: 'Risco à segurança ou saúde' | 'Prejuízo à mobilidade / transporte' | 'Impacto financeiro / comércio' | 'Dificuldade de acesso a serviços públicos';
  evidenceInfo?: string;
  isAnonymous?: boolean;
}

export interface PublicSource {
  name: string;
  organ: string;
  description: string;
  url: string;
  theme: string;
  type?: 'Legislação' | 'Fiscalização' | 'Dados Oficiais' | 'Plano Municipal';
}

