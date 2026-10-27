import type { CivicArea, Proposal, YouthOpportunityItem, PublicSource, CivicIssueItem } from '../types';

export const ITANHAEM_NEIGHBORHOODS = [
  'Belas Artes',
  'Centro Histórico',
  'Gaivota',
  'Cibratel I',
  'Cibratel II',
  'Suarão',
  'Bopiranga',
  'Savoy',
  'Guapurá',
  'Oásis',
  'Balneário Coronel',
  'Jardim Coronel',
  'Balneário Satélite',
  'América',
  'Grandesp',
  'Ivoty',
  'Praiamar',
  'Campos Elíseos',
  'Balneário Jamaica',
  'Balneário Tupy',
  'Fazendinha',
  'Verde Mar',
  'Umuarama',
  'Chácaras Cibratel',
  'Mosteiro',
  'Zona Rural / Outra Região'
];

export const CIVIC_AREAS: CivicArea[] = [
  {
    id: 'saude',
    title: 'Saúde & Atenção Básica',
    icon: 'Stethoscope',
    description: 'Acesso a consultas especializadas, tempo de espera em exames, medicamentos nas UBSs, saúde mental e fortalecimento da UPA.',
    highlightIssues: ['Fila para exames especializados', 'Falta de médicos nas UBS', 'Atendimento de urgência e emergência', 'Distribuição de remédios essenciais'],
    catalogedIssuesCount: 4,
    municipalCompetenceScope: 'Competência Municipal direta (SUS / Atenção Primária e UPA). Média e alta complexidade hospitalar dependem de regulação estadual (CROSS/SIRESP).'
  },
  {
    id: 'educacao',
    title: 'Educação & Primeira Infância',
    icon: 'GraduationCap',
    description: 'Vagas em creches, contraturno escolar, infraestrutura e climatização das escolas municipais, merenda e apoio pedagógico.',
    highlightIssues: ['Fila de espera para creches', 'Estrutura física e climatização das salas', 'Atividades extracurriculares e esportivas', 'Capacitação contínua de educadores'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Competência Municipal prioritária na Educação Infantil (creches e pré-escola) e Ensino Fundamental I.'
  },
  {
    id: 'seguranca',
    title: 'Segurança Urbana & Prevenção',
    icon: 'Shield',
    description: 'Atuação comunitária da Guarda Civil Municipal (GCM), câmeras de monitoramento inteligentes, iluminação preventiva e zeladoria.',
    highlightIssues: ['Sensação de insegurança noturna', 'Furtos a residências e comércios', 'Pouco policiamento preventivo nos bairros', 'Terrenos baldios abandonados sem cerca'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'GCM e videomonitoramento municipal são de competência local. Policiamento ostensivo e investigação de crimes cabem à Polícia Militar e Civil (Estado).'
  },
  {
    id: 'esporte_lazer',
    title: 'Esporte, Lazer & Cultura Comunitária',
    icon: 'Trophy',
    description: 'Manutenção de quadras de bairro, praças esportivas, escolinhas comunitárias para crianças e valorização de artistas locais.',
    highlightIssues: ['Quadras poliesportivas depredadas', 'Falta de escolinhas de contraturno nos bairros', 'Poucas praças públicas com equipamentos de ginástica', 'Espaços culturais concentrados no Centro'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Competência plena do Município (Secretarias de Esportes e Cultura).'
  },
  {
    id: 'mobilidade',
    title: 'Mobilidade Urbana & Acessibilidade',
    icon: 'Car',
    description: 'Qualidade do pavimento, nivelamento de ruas de terra, linhas e intervalos do transporte coletivo, calçadas acessíveis e ciclovias seguras.',
    highlightIssues: ['Ruas esburacadas ou sem pavimentação', 'Intervalos longos do transporte coletivo', 'Falta de calçadas acessíveis', 'Ausência de ciclovias integradas'],
    catalogedIssuesCount: 4,
    municipalCompetenceScope: 'Vias urbanas municipais e concessão do transporte coletivo local. Rodovia Padre Manoel da Nóbrega é sob concessão estadual/ARTESP.'
  },
  {
    id: 'drenagem',
    title: 'Drenagem, Saneamento & Meio Ambiente',
    icon: 'Droplets',
    description: 'Prevenção de alagamentos, desassoreamento de valas e canais, coleta regular de resíduos, reciclagem e proteção do Rio Itanhaém.',
    highlightIssues: ['Alagamentos frequentes em dias de chuva forte', 'Canais de drenagem assoreados e com mato', 'Baixo percentual de reciclagem', 'Descarte irregular de entulho'],
    catalogedIssuesCount: 4,
    municipalCompetenceScope: 'Drenagem pluvial e limpeza urbana são municipais. Abastecimento de água e esgoto operam via concessão Sabesp sob fiscalização da ARSESP.'
  },
  {
    id: 'iluminacao',
    title: 'Iluminação Pública & Conectividade',
    icon: 'Lightbulb',
    description: 'Substituição por luminárias LED, eliminação de pontos escuros em bairros periféricos, manutenção ágil e pontos de Wi-Fi público.',
    highlightIssues: ['Lâmpadas queimadas sem troca rápida', 'Ruas inteiras na escuridão', 'Pontos de ônibus mal iluminados', 'Falta de iluminação na orla e praças'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Competência Municipal custeada pela CIP (Contribuição de Iluminação Pública).'
  },
  {
    id: 'turismo',
    title: 'Turismo Sustentável & Centro Histórico',
    icon: 'Compass',
    description: 'Valorização do patrimônio histórico, ecoturismo no Rio Itanhaém, eventos culturais distribuídos e geração de renda o ano inteiro.',
    highlightIssues: ['Sazonalidade extrema (movimento só no verão)', 'Pouca sinalização turística histórica', 'Eventos concentrados em poucas datas', 'Falta de estrutura de receptivo e passeios guiados'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Competência Municipal (Secretaria de Turismo e Conselho Municipal de Turismo - COMTUR).'
  },
  {
    id: 'desenvolvimento',
    title: 'Desenvolvimento Econômico & Emprego',
    icon: 'Briefcase',
    description: 'Apoio aos microempreendedores locais, desburocratização de alvarás, atração de investimentos limpos e cursos de gestão e vendas digitais.',
    highlightIssues: ['Dependência de empregos sazonais', 'Dificuldade de crédito e burocracia para MEIs', 'Falta de incentivo ao comércio de bairro', 'Pouca qualificação voltada à economia local'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Competência Municipal de fomento, simplificação tributária (ISS/Taxas) e parcerias com Sebrae/Senai.'
  },
  {
    id: 'transparencia',
    title: 'Transparência, Fiscalização & Serviços',
    icon: 'FileText',
    description: 'Portal da transparência claro e aberto, fiscalização cidadã de contratos públicos, digitalização de serviços e ouvidoria eficiente.',
    highlightIssues: ['Dificuldade de localizar contratos e medições de obras', 'Demora nas respostas da Ouvidoria Municipal', 'Filas presenciais para serviços que poderiam ser online', 'Falta de relatórios abertos sobre metas municipais'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Obrigatoriedade legal pelo Marco de Governo Digital (Lei 14.129/21), Lei de Acesso à Informação (LAI) e Lei de Responsabilidade Fiscal.'
  },
  {
    id: 'protecao_animal',
    title: 'Proteção & Bem-Estar Animal',
    icon: 'Heart',
    description: 'Mutirões contínuos de castração gratuita nos bairros, atendimento veterinário público para famílias de baixa renda e combate ao abandono.',
    highlightIssues: ['Superpopulação de cães e gatos em áreas periféricas', 'Vagas insuficientes em castramóveis e campanhas', 'Falta de pronto-atendimento veterinário popular', 'Animais de grande porte soltos em vias públicas'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Competência Municipal de Saúde Pública e Zoonoses.'
  },
  {
    id: 'habitacao',
    title: 'Habitação, Regularização Fundiária & Defesa Civil',
    icon: 'Home',
    description: 'Regularização fundiária (Reurb) em loteamentos consolidados, contenção de ocupações em áreas de risco e prevenção de desastres.',
    highlightIssues: ['Insegurança jurídica em loteamentos antigos sem escritura', 'Famílias em áreas suscetíveis a marés altas e ressacas', 'Dificuldade de acesso a saneamento em áreas não regularizadas', 'Atraso na entrega de títulos de propriedade'],
    catalogedIssuesCount: 3,
    municipalCompetenceScope: 'Competência Municipal em parceria com Programa Cidade Legal (Governo do Estado de SP) e Defesa Civil.'
  }
];

export const CIVIC_ISSUES_CATALOG: CivicIssueItem[] = [
  // Saúde
  {
    id: 'issue-sau-01',
    areaId: 'saude',
    title: 'Fila prolongada para consultas com especialistas e exames laboratoriais',
    description: 'Relatos de moradores de Belas Artes, Savoy e Gaivota apontando espera superior a 90 dias para consultas com cardiologista, oftalmologista e exames de ultrassom.',
    neighborhoods: ['Belas Artes', 'Savoy', 'Gaivota', 'Guapurá'],
    frequency: 'Contínuo',
    impactLevel: 'Risco à saúde de pacientes crônicos',
    evidenceFound: 'Dados do Sisreg/CROSS apontando demanda reprimida em especialidades no litoral sul paulista.',
    status: 'proposta em estudo',
    statusExplanation: 'Mapeada para proposta de mutirões credenciados e transparência da lista de espera.',
    dateRecorded: '15/10/2026'
  },
  {
    id: 'issue-sau-02',
    areaId: 'saude',
    title: 'Falta pontual de medicamentos de uso contínuo nas farmácias das UBSs',
    description: 'Usuários das UBSs relatam viagens perdidas para retirada de anti-hipertensivos e remédios de controle glicêmico.',
    neighborhoods: ['Suarão', 'Oásis', 'Jardim Coronel'],
    frequency: 'Semanal',
    impactLevel: 'Interrupção de tratamentos essenciais',
    evidenceFound: 'Ouvidorias e notas fiscais de compras públicas que mostram intervalos na entrega de lotes.',
    status: 'evidência encontrada',
    statusExplanation: 'Evidência confirmada em atas de registro de preços. Em estudo sistema de consulta pública de estoque em tempo real.',
    dateRecorded: '18/10/2026'
  },
  {
    id: 'issue-sau-03',
    areaId: 'saude',
    title: 'Tempo de triagem na Unidade de Pronto Atendimento (UPA)',
    description: 'Picos de espera na UPA do Savoy durante feriados e finais de semana.',
    neighborhoods: ['Savoy', 'Geral'],
    frequency: 'Fins de semana e feriados',
    impactLevel: 'Sobrecarga de médicos e desconforto de pacientes',
    evidenceFound: 'Registros de atendimento e relatórios de fluxo hospitalar municipal.',
    status: 'em verificação',
    statusExplanation: 'Levantamento em curso comparando fluxo de alta temporada com capacidade instalada.',
    dateRecorded: '20/10/2026'
  },

  // Mobilidade
  {
    id: 'issue-mob-01',
    areaId: 'mobilidade',
    title: 'Ruas secundárias de terra com buracos e falta de nivelamento periódico',
    description: 'Vias de terra no Bopiranga, Balneário Tupy e Gaivota sofrem com buracos após chuvas, dificultando entrada de ambulâncias e vans escolares.',
    neighborhoods: ['Bopiranga', 'Gaivota', 'Balneário Tupy', 'Cibratel II'],
    frequency: 'Períodos de chuva',
    impactLevel: 'Dano veicular e barreira para serviços essenciais',
    evidenceFound: 'Fotos georreferenciadas enviadas por moradores e ausência de cronograma público de patrolamento.',
    status: 'encaminhado para análise',
    statusExplanation: 'Demandas agrupadas para formulação de indicação legislativa para cronograma público semanal.',
    dateRecorded: '12/10/2026'
  },
  {
    id: 'issue-mob-02',
    areaId: 'mobilidade',
    title: 'Intervalos longos e falta de abrigo em pontos de ônibus interbairros',
    description: 'Linhas que atendem Guapurá e Savoy com intervalos superiores a 60 minutos em horários de pico.',
    neighborhoods: ['Guapurá', 'Savoy', 'América'],
    frequency: 'Diário',
    impactLevel: 'Atrasos no trabalho e estudos',
    evidenceFound: 'Planilha de horários da concessionária em confronto com queixas de passageiros.',
    status: 'relato recebido',
    statusExplanation: 'Em processo de catalogação de horários e apuração de cumprimento de viagens.',
    dateRecorded: '22/10/2026'
  },

  // Iluminação
  {
    id: 'issue-ilu-01',
    areaId: 'iluminacao',
    title: 'Pontos escuros e lâmpadas queimadas em vias de acesso a pontos de ônibus',
    description: 'Ruas residenciais nos bairros Savoy, Oásis e Cibratel com lâmpadas apagadas por mais de 20 dias.',
    neighborhoods: ['Savoy', 'Oásis', 'Cibratel I', 'Cibratel II'],
    frequency: 'Contínuo',
    impactLevel: 'Risco à segurança pessoal no retorno do trabalho',
    evidenceFound: 'Protocolos de munícipes informados ao serviço de manutenção de iluminação.',
    status: 'proposta em estudo',
    statusExplanation: 'Convertida na proposta "Programa Ilumina Bairro: Expansão LED e Eliminação de Pontos Escuros".',
    dateRecorded: '08/10/2026'
  },

  // Drenagem & Meio Ambiente
  {
    id: 'issue-dre-01',
    areaId: 'drenagem',
    title: 'Valas e canais assoreados com vegetação alta provocando retenção de água',
    description: 'Canais que cortam o Suarão e Bopiranga cheios de areia e vegetação impedem o escoamento rápido na maré alta.',
    neighborhoods: ['Suarão', 'Bopiranga', 'Gaivota'],
    frequency: 'Episódios de maré alta e chuva',
    impactLevel: 'Alagamento de vias e retorno de águas pluviais',
    evidenceFound: 'Vistorias fotográficas comunitárias e histórico de chamados da Defesa Civil.',
    status: 'proposta em estudo',
    statusExplanation: 'Convertida na proposta "Canal Aberto Bairros: Cronograma Transparente de Limpeza e Desassoreamento".',
    dateRecorded: '10/10/2026'
  },

  // Proteção Animal
  {
    id: 'issue-ani-01',
    areaId: 'protecao_animal',
    title: 'Demanda reprimida por castração gratuita e atendimento veterinário básico',
    description: 'Protetores independentes e moradores de bairros periféricos relatam dificuldade para agendar castrações em número suficiente.',
    neighborhoods: ['Guapurá', 'Savoy', 'Belas Artes', 'Jardim Coronel'],
    frequency: 'Contínuo',
    impactLevel: 'Abandono involuntário e saúde pública',
    evidenceFound: 'Relatórios do setor de Zoonoses municipal com vagas preenchidas em poucos minutos.',
    status: 'encaminhado para análise',
    statusExplanation: 'Estruturação de estudo comparado com o programa de castramóvel de cidades vizinhas.',
    dateRecorded: '24/10/2026'
  },

  // Transparência
  {
    id: 'issue-tra-01',
    areaId: 'transparencia',
    title: 'Falta de facilidade na consulta de medições de obras e prazos de conclusão',
    description: 'Cidadãos relatam dificuldade para saber a data oficial de entrega e a empresa responsável por reformas e pavimentações nos bairros.',
    neighborhoods: ['Geral', 'Centro', 'Mosteiro'],
    frequency: 'Contínuo',
    impactLevel: 'Falta de controle social do gasto público',
    evidenceFound: 'Portal da Transparência municipal apresenta contratos em PDFs digitalizados sem busca aberta por bairro.',
    status: 'proposta em estudo',
    statusExplanation: 'Formulação de proposta de painel georreferenciado de obras municipais abertas.',
    dateRecorded: '21/10/2026'
  }
];

export const PROPOSALS_DATA: Proposal[] = [
  {
    id: 'prop-01',
    title: 'Programa Ilumina Bairro: Expansão LED e Eliminação de Pontos Escuros',
    areaId: 'iluminacao',
    areaTitle: 'Iluminação Pública & Conectividade',
    problemIdentified: 'Moradores de bairros periféricos relatam extensas vias sem luminosidade adequada, aumentando o medo noturno e o risco de acidentes.',
    availableEvidence: 'Reclamações registradas em ouvidorias e mapas de chamados de troca de lâmpadas com prazos médios de atendimento superiores a 20 dias.',
    proposedSolution: 'Mapeamento georreferenciado colaborativo de pontos apagados e priorização orçamentária de substituição por luminárias LED de alta eficiência via CIP.',
    targetBeneficiaries: 'Aproximadamente 45.000 moradores de vias secundárias e periféricas de Itanhaém.',
    estimatedCost: 'Em levantamento de dados orçamentários com base no saldo anual da CIP municipal (sem criação de novos tributos).',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'Portal da Transparência de Itanhaém - Arrecadação e Aplicação da CIP', url: 'https://transparencia.itanhaem.sp.gov.br/' },
      { title: 'Norma Técnica ABNT NBR 5101 (Iluminação Pública Eficiente)' }
    ],
    status: 'Em levantamento de dados',
    dateUpdated: 'Outubro de 2026',
    existingLawOrProgram: 'Lei Municipal que institui a Contribuição de Iluminação Pública (CIP). Lacuna: ausência de metas georreferenciadas por bairro.',
    referenceCity: 'Praia Grande / Santos (SP)',
    referenceStage: 'Implementada',
    municipalInstrument: 'Projeto de Lei Ordinária',
    risksAndCosts: 'Risco de gargalo logístico das equipes de manutenção; custo coberto pela arrecadação já existente da CIP.',
    trackingIndicator: 'Prazo médio de substituição de luminárias (meta: < 48 horas) e % de vias periféricas em LED.'
  },
  {
    id: 'prop-02',
    title: 'Canal Aberto Bairros: Cronograma Transparente de Limpeza e Desassoreamento',
    areaId: 'drenagem',
    areaTitle: 'Drenagem, Saneamento & Meio Ambiente',
    problemIdentified: 'Alagamentos recorrentes em períodos de chuva combinados com maré alta, agravados pelo assoreamento de valas de drenagem nos bairros.',
    availableEvidence: 'Histórico de eventos pluviométricos severos registrados pela Defesa Civil SP e relatos constantes de água invadindo garagens e vias de trânsito.',
    proposedSolution: 'Publicação de calendário público trimestral com datas exatas de desassoreamento e limpeza preventiva de cada canal e vala, com fiscalização comunitária e fotos de antes/depois.',
    targetBeneficiaries: 'População de bairros ribeirinhos e regiões com drenagem por valas abertas.',
    estimatedCost: 'Custos operacionais incluídos nos contratos vigentes de conservação municipal, exigindo apenas reorganização de cronogramas e transparência de dados.',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'Defesa Civil do Estado de SP - Plano Preventivo de Defesa Civil (PPDC) Baixada Santista', url: 'https://www.defesacivil.sp.gov.br/' },
      { title: 'Comitê da Bacia Hidrográfica da Baixada Santista (CBH-BS)' }
    ],
    status: 'Em análise jurídica',
    dateUpdated: 'Outubro de 2026',
    existingLawOrProgram: 'Contratos vigentes de limpeza pública e zeladoria municipal.',
    referenceCity: 'Bertioga / São Sebastião (SP)',
    referenceStage: 'Implementada',
    municipalInstrument: 'Indicação ao Executivo',
    risksAndCosts: 'Dependência de condições climáticas; custo adicional zero (otimização de contratos vigentes).',
    trackingIndicator: 'Metros lineares de canais desassoreados e tempo de escoamento após chuvas torrenciais.'
  },
  {
    id: 'prop-03',
    title: 'Polo Municipal de Capacitação Digital & Inteligência Artificial para Jovens',
    areaId: 'desenvolvimento',
    areaTitle: 'Desenvolvimento Econômico & Emprego',
    problemIdentified: 'Juventude de Itanhaém com escassez de opções de qualificação moderna focada na economia digital, levando muitos a migrarem para outros municípios ou ficarem em subempregos.',
    availableEvidence: 'Dados do Caged e Rais indicando grande concentração do emprego formal no comércio varejista sazonal e serviços de baixa remuneração na Baixada Santista.',
    proposedSolution: 'Criação de oficinas práticas gratuitas em espaços públicos já existentes (como centros comunitários e bibliotecas) com mentores voluntários e materiais em software livre.',
    targetBeneficiaries: 'Jovens de 15 a 29 anos de famílias de baixa renda.',
    estimatedCost: 'Baixo custo de investimento inicial utilizando computadores recondicionados e parcerias com o setor voluntário de TI.',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'Caged / Ministério do Trabalho e Emprego - Panorama de Emprego Formal em Itanhaém' },
      { title: 'Iniciativas Cívicas de Inclusão Digital no Brasil (UNESCO / NIC.br)' }
    ],
    status: 'Ideia inicial',
    dateUpdated: 'Outubro de 2026',
    existingLawOrProgram: 'Fundo Municipal dos Direitos da Criança e do Adolescente (FMDCA).',
    referenceCity: 'Recife (Porto Digital) / Maringá (PR)',
    referenceStage: 'Resultado medido',
    municipalInstrument: 'Projeto de Lei Ordinária',
    risksAndCosts: 'Risco de descontinuidade pedagógica; custo inicial de infraestrutura estimado em emendas parlamentares impositivas.',
    trackingIndicator: 'Número de jovens certificados e % de inserção em estágios ou vagas de tecnologia.'
  },
  {
    id: 'prop-04',
    title: 'Acompanhamento Digital de Medicamentos e Consultas nas UBSs',
    areaId: 'saude',
    areaTitle: 'Saúde & Atenção Básica',
    problemIdentified: 'Moradores se deslocam desnecessariamente até a UBS de referência apenas para descobrir que o medicamento prescrito está em falta no estoque físico da unidade.',
    availableEvidence: 'Reclamações frequentes da população que perde dias de trabalho ou compromissos por falta de informação sobre disponibilidade de fármacos.',
    proposedSolution: 'Disponibilização de painel online e aberto onde qualquer cidadão possa consultar em tempo real a lista de remédios disponíveis em cada UBS, integrada ao sistema de estoque.',
    targetBeneficiaries: 'Todos os usuários do Sistema Único de Saúde (SUS) no município de Itanhaém.',
    estimatedCost: 'Adaptação de API no prontuário eletrônico municipal (e-SUS APS / Sisreg).',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'Datasus / Ministério da Saúde - Estratégia e-SUS APS', url: 'https://datasus.saude.gov.br/' },
      { title: 'Lei Federal 14.129/2021 (Governo Digital e Transparência em Serviços Públicos)' }
    ],
    status: 'Em levantamento de dados',
    dateUpdated: 'Outubro de 2026',
    existingLawOrProgram: 'Lei Federal nº 14.129/2021 (Governo Digital) e Política Nacional de Medicamentos.',
    referenceCity: 'Curitiba (Saúde Já) / Santos (SP)',
    referenceStage: 'Implementada',
    municipalInstrument: 'Requerimento de Informação',
    risksAndCosts: 'Integração de software legado de almoxarifado; custo estimado baixo por utilizar recursos do e-SUS.',
    trackingIndicator: 'Índice de desabastecimento de farmácia básica e redução do deslocamento inútil de munícipes.'
  },
  {
    id: 'prop-05',
    title: 'Ciclovia Segura Interbairros: Integração Centro - Bairros Litorâneos',
    areaId: 'mobilidade',
    areaTitle: 'Mobilidade Urbana & Acessibilidade',
    problemIdentified: 'A bicicleta é o principal meio de transporte diário para milhares de trabalhadores em Itanhaém, mas as conexões entre a marginal da rodovia e as vias centrais são perigosas.',
    availableEvidence: 'Pesquisas de origem e destino na Baixada Santista e registros de ocorrências com ciclistas em trechos sem sinalização cicloviária.',
    proposedSolution: 'Adequação de faixas cicloviárias contínuas com pintura refletiva, tachões e sinalização vertical ligando grandes bairros residenciais (Belas Artes, Gaivota e Suarão) aos polos comerciais.',
    targetBeneficiaries: 'Trabalhadores ciclistas, estudantes e praticantes de mobilidade ativa.',
    estimatedCost: 'Em avaliação orçamentária considerando repasses estaduais de trânsito e verbas de mobilidade urbana.',
    administrativeCompetence: 'Parceria Estadual',
    consultedSources: [
      { title: 'Plano Diretor de Desenvolvimento Integrado da Região Metropolitana da Baixada Santista (AGEM)' },
      { title: 'Código de Trânsito Brasileiro (CTB) - Diretrizes para Mobilidade Ativa' }
    ],
    status: 'Em avaliação orçamentária',
    dateUpdated: 'Outubro de 2026',
    existingLawOrProgram: 'Plano de Mobilidade Urbana Municipal e Política Nacional de Mobilidade Urbana (Lei 12.587/12).',
    referenceCity: 'Praia Grande (SP)',
    referenceStage: 'Implementada',
    municipalInstrument: 'Indicação ao Executivo',
    risksAndCosts: 'Conflito de faixas com estacionamento; custo estimado em levantamento com o Detran/Secretaria de Trânsito.',
    trackingIndicator: 'Quilômetros de malha cicloviária protegida e taxa de acidentes com ciclistas.'
  },
  {
    id: 'prop-06',
    title: 'Fortalecimento da Coleta Seletiva e Inclusão Produtiva de Catadores Locais',
    areaId: 'drenagem',
    areaTitle: 'Drenagem, Saneamento & Meio Ambiente',
    problemIdentified: 'Baixíssimo percentual de resíduos sólidos reciclados na cidade, com sobrecarga do aterro sanitário e queima/descarte prejudicial de materiais em terrenos baldios.',
    availableEvidence: 'Dados do Sistema Nacional de Informações sobre Saneamento (SNIS) apontando menos de 3% de reciclagem efetiva na maioria dos municípios costeiros.',
    proposedSolution: 'Estruturação de galpão de triagem comunitário, apoio logístico com caminhão dedicado em dias alternados nos bairros e formalização de associação de catadores.',
    targetBeneficiaries: 'Famílias de catadores de materiais recicláveis e toda a comunidade pela redução do passivo ambiental.',
    estimatedCost: 'Em levantamento de dados com base em editais do Fundo Estadual de Recursos Hídricos (Fehidro) e Fundo de Interesses Difusos (FID).',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'SNIS - Sistema Nacional de Informações sobre Saneamento', url: 'https://www.gov.br/cidades/pt-br/assuntos/saneamento/snis' },
      { title: 'Lei Federal 12.305/2010 (Política Nacional de Resíduos Sólidos)' }
    ],
    status: 'Pronta para discussão pública',
    dateUpdated: 'Outubro de 2026',
    existingLawOrProgram: 'Plano Municipal de Gestão Integrada de Resíduos Sólidos (PMGIRS).',
    referenceCity: 'Extrema (MG) / Santos (SP)',
    referenceStage: 'Resultado medido',
    municipalInstrument: 'Projeto de Lei Ordinária',
    risksAndCosts: 'Necessidade de engajamento comunitário na separação; viabilidade econômica alavancada pela venda dos recicláveis.',
    trackingIndicator: 'Toneladas de resíduos desviados do aterro por mês e renda média dos catadores cooperados.'
  }
];

export const PUBLIC_SOURCES: PublicSource[] = [
  {
    name: 'Câmara Municipal de Itanhaém',
    organ: 'Poder Legislativo Municipal',
    description: 'Acompanhamento de sessões ordinárias, tramitação de Projetos de Lei, Requerimentos, Indicações de vereadores e atas legislativas.',
    url: 'https://www.itanhaem.sp.leg.br/',
    theme: 'Legislação e Fiscalização Parlamentar',
    type: 'Legislação'
  },
  {
    name: 'Legislação Municipal & Lei Orgânica',
    organ: 'Sistema LeisMunicipais / Prefeitura de Itanhaém',
    description: 'Texto integral da Lei Orgânica do Município de Itanhaém, Plano Diretor (LC 186/2016), Código de Posturas e Leis Orçamentárias (PPA, LDO e LOA).',
    url: 'https://leismunicipais.com.br/legislacao-itanhaem-sp',
    theme: 'Marcos Legais Municipais',
    type: 'Legislação'
  },
  {
    name: 'Portal da Transparência de Itanhaém',
    organ: 'Prefeitura Municipal de Itanhaém',
    description: 'Acompanhamento de receitas arrecadadas, despesas liquidadas, contratos com prestadores de serviço, folha de pagamento e licitações.',
    url: 'https://transparencia.itanhaem.sp.gov.br/',
    theme: 'Orçamento e Finanças Públicas',
    type: 'Fiscalização'
  },
  {
    name: 'TCE-SP — Índice de Efetividade da Gestão (IEG-M)',
    organ: 'Tribunal de Contas do Estado de São Paulo',
    description: 'Avaliação técnica independente sobre a eficácia da gestão em saúde, educação, planejamento orçamentário, meio ambiente e tecnologia.',
    url: 'https://www.tce.sp.gov.br/ieg-m',
    theme: 'Avaliação de Políticas Públicas',
    type: 'Fiscalização'
  },
  {
    name: 'Plano Municipal de Saúde de Itanhaém',
    organ: 'Conselho Municipal de Saúde / Secretaria de Saúde',
    description: 'Diretrizes oficiais, metas quadrienais, mapa da rede de UBSs e indicadores epidemiológicos do município.',
    url: 'https://www.itanhaem.sp.gov.br/saude/',
    theme: 'Planejamento em Saúde',
    type: 'Plano Municipal'
  },
  {
    name: 'Plano Municipal de Educação (PME)',
    organ: 'Secretaria de Educação, Cultura e Esportes',
    description: 'Metas do Plano Decenal de Educação para a rede municipal de Itanhaém, taxas de atendimento em creches e alfabetização.',
    url: 'https://www.itanhaem.sp.gov.br/educacao/',
    theme: 'Planejamento Educacional',
    type: 'Plano Municipal'
  },
  {
    name: 'IBGE Cidades — Panorama Itanhaém',
    organ: 'Instituto Brasileiro de Geografia e Estatística (IBGE)',
    description: 'Dados demográficos do Censo 2022, PIB per capita, taxa de escolarização, receitas orçamentárias realizadas e IDH-M.',
    url: 'https://cidades.ibge.gov.br/brasil/sp/itanhaem/panorama',
    theme: 'Demografia e Indicadores Socioeconômicos',
    type: 'Dados Oficiais'
  },
  {
    name: 'SIOPE / FNDE — Gastos em Educação',
    organ: 'Fundo Nacional de Desenvolvimento da Educação (FNDE)',
    description: 'Demonstrativos contábeis da aplicação constitucional mínima de 25% na educação básica e Fundeb no município.',
    url: 'https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/financiamento/siope',
    theme: 'Financiamento da Educação',
    type: 'Dados Oficiais'
  },
  {
    name: 'DATASUS / Tabnet — Indicadores de Saúde',
    organ: 'Ministério da Saúde',
    description: 'Série histórica de internações hospitalares, mortalidade materno-infantil, imunização e cobertura da Estratégia de Saúde da Família.',
    url: 'https://datasus.saude.gov.br/',
    theme: 'Estatísticas de Saúde Pública',
    type: 'Dados Oficiais'
  },
  {
    name: 'Plano Preventivo de Defesa Civil (PPDC)',
    organ: 'Defesa Civil do Estado de São Paulo / Agem',
    description: 'Mapeamento de setores de risco a escorregamentos, inundações bruscas e ressacas no litoral paulista.',
    url: 'https://www.defesacivil.sp.gov.br/',
    theme: 'Riscos Climáticos e Geológicos',
    type: 'Dados Oficiais'
  }
];

export const PRIORITIZATION_CRITERIA = [
  {
    id: 'frequencia',
    name: 'Frequência dos Relatos',
    weight: '20%',
    description: 'Volume de cidadãos voluntários que apontam a mesma demanda espontaneamente nos canais de escuta.',
    caveat: 'Não é interpretado isoladamente para não favorecer bairros mais conectados digitalmente.'
  },
  {
    id: 'gravidade',
    name: 'Gravidade & Urgência',
    weight: '25%',
    description: 'Risco direto à saúde, integridade física, segurança pública ou interrupção de serviços essenciais aos munícipes.',
    caveat: 'Prioriza demandas que não podem aguardar sem danos irreversíveis à população.'
  },
  {
    id: 'dispersao',
    name: 'Dispersão Territorial',
    weight: '20%',
    description: 'Número de bairros e regiões distintas onde o mesmo problema ou padrão de falha se repete.',
    caveat: 'Diferencia um problema isolado de uma deficiência sistêmica do serviço público municipal.'
  },
  {
    id: 'evidencia',
    name: 'Qualidade da Evidência',
    weight: '15%',
    description: 'Grau de comprovação por fotos, protocolos de ouvidoria preexistentes, matérias ou cruzamento com dados do TCE/DataSUS.',
    caveat: 'Separa impressões e boatos de fatos urbanos objetivamente constatados.'
  },
  {
    id: 'viabilidade',
    name: 'Viabilidade Jurídica & Orçamentária',
    weight: '20%',
    description: 'Possibilidade real de implementação dentro das competências municipais e compatibilidade com LDO/LOA.',
    caveat: 'Evita propostas ilusórias que dependem de competências exclusivas de outros entes federativos.'
  }
];

export const INITIAL_DEMO_STATS = {
  totalResponses: 142,
  topThemes: [
    { name: 'Saúde & Atenção Básica', count: 98, percentage: 69 },
    { name: 'Ruas, Pavimentação & Mobilidade', count: 86, percentage: 60 },
    { name: 'Iluminação Pública & Conectividade', count: 74, percentage: 52 },
    { name: 'Desenvolvimento Econômico & Juventude', count: 58, percentage: 41 },
    { name: 'Drenagem, Saneamento & Ambiente', count: 49, percentage: 35 }
  ],
  regionalDistribution: [
    { region: 'Bairros Leste (Gaivota, Bopiranga, Balneários)', percentage: 38 },
    { region: 'Região Central (Centro, Mosteiro, Ivoty)', percentage: 24 },
    { region: 'Região Oeste (Belas Artes, Savoy, Cibratel)', percentage: 28 },
    { region: 'Bairros Norte / Marginais (Guapurá, Oásis, Coronel)', percentage: 10 }
  ],
  sampleCitizenVoices: [
    {
      neighborhood: 'Belas Artes',
      issue: 'Saúde & Atenção Básica',
      quote: 'Precisamos de mais agilidade na regulação de exames laboratoriais na rede municipal e médicos especialistas presentes.',
      date: 'Ontem'
    },
    {
      neighborhood: 'Gaivota',
      issue: 'Iluminação Pública & Segurança',
      quote: 'Lâmpadas queimadas nas travessas de acesso ao ponto de ônibus da marginal deixam moradores inseguros à noite.',
      date: 'Há 2 dias'
    },
    {
      neighborhood: 'Suarão',
      issue: 'Drenagem, Saneamento & Ambiente',
      quote: 'A limpeza preventiva de valas de escoamento antes das chuvas de verão precisa de cronograma transparente para acompanhamento.',
      date: 'Há 3 dias'
    },
    {
      neighborhood: 'Guapurá',
      issue: 'Desenvolvimento Econômico & Juventude',
      quote: 'Faltam cursos rápidos e práticos de tecnologia e apoio para quem quer abrir MEI ou prestar serviços digitais.',
      date: 'Há 4 dias'
    }
  ]
};

export const YOUTH_OPPORTUNITY_MODULES: YouthOpportunityItem[] = [
  {
    id: 'ia_letramento',
    title: 'Letramento Digital & IA Aplicada',
    category: 'Tecnologia & Inovação',
    icon: 'Cpu',
    description: 'Capacitação prática em ferramentas de inteligência artificial, automação e análise de dados voltada a jovens de Itanhaém para prestação de serviços remotos.',
    targetAudience: 'Jovens de 16 a 29 anos e estudantes da rede pública',
    civicRelevance: 'Gera renda qualificada sem exigir deslocamento diário para a capital ou Santos.',
    statusNotice: 'Proposta em estudo para parceria com polos universitários e Fatec/Etec.'
  },
  {
    id: 'cyber_cidadania',
    title: 'Segurança Cibernética & Proteção',
    category: 'Cidadania Digital',
    icon: 'ShieldAlert',
    description: 'Oficinas sobre proteção de dados, prevenção a golpes virtuais e conscientização sobre privacidade online para jovens e pequenos negócios.',
    targetAudience: 'Estudantes e microempreendedores locais',
    civicRelevance: 'Fortalece a segurança digital comunitária e forma profissionais em área de alta demanda.',
    statusNotice: 'Modelo em estruturação pedagógica preliminar.'
  },
  {
    id: 'dev_web',
    title: 'Desenvolvimento Web & Economia Digital',
    category: 'Programação',
    icon: 'Code2',
    description: 'Bootcamps rápidos para formação de desenvolvedores iniciantes, criação de sites para empresas locais e comércio de Itanhaém.',
    targetAudience: 'Jovens em busca do primeiro emprego ou transição de carreira',
    civicRelevance: 'Conecta jovens talentos à demanda por digitalização do comércio caiçara.',
    statusNotice: 'Pesquisa de referências com projetos sociais de Santos e São Paulo.'
  },
  {
    id: 'financas_mei',
    title: 'Gestão Financeira & Microempreendedorismo',
    category: 'Empreendedorismo',
    icon: 'Calculator',
    description: 'Orientação descomplicada sobre precificação, formalização de MEI, emissão de notas e gestão do dinheiro.',
    targetAudience: 'Jovens autônomos, prestadores de serviço e comerciantes informais',
    civicRelevance: 'Reduz a mortalidade de pequenos empreendimentos e estimula a independência financeira.',
    statusNotice: 'Mapeamento de viabilidade via Banco do Povo e Sebrae Aqui.'
  },
  {
    id: 'ecommerce_local',
    title: 'E-commerce & Digitalização do Comércio',
    category: 'Vendas & Marketing',
    icon: 'ShoppingBag',
    description: 'Treinamento para inclusão de lojas de bairro em marketplaces, entrega expressa e canais digitais de venda.',
    targetAudience: 'Comerciantes dos balneários e jovens atendentes',
    civicRelevance: 'Aumenta as vendas fora da temporada de verão e fortalece a economia dos bairros.',
    statusNotice: 'Em estudo de impacto econômico com entidades comerciais.'
  },
  {
    id: 'lideranca_civica',
    title: 'Liderança Comunitária & Inovação Pública',
    category: 'Participação Social',
    icon: 'Compass',
    description: 'Formação em formulação de políticas públicas, fiscalização de contratos da prefeitura e atuação em conselhos municipais.',
    targetAudience: 'Jovens líderes de grêmios, coletivos culturais e lideranças de bairro',
    civicRelevance: 'Prepara a próxima geração de agentes públicos e lideranças cívicas conscientes.',
    statusNotice: 'Conteúdo em elaboração aberta com a comunidade.'
  }
];
