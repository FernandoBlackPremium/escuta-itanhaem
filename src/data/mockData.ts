import type { CivicArea, Proposal, YouthOpportunityItem, PublicSource } from '../types';

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
    description: 'Acesso a consultas especializadas, tempo de espera em exames, medicamentos nas UBSs e fortalecimento da UPA.',
    highlightIssues: ['Fila para exames especializados', 'Falta de médicos nas UBS', 'Atendimento de urgência e emergência', 'Distribuição de remédios essenciais']
  },
  {
    id: 'mobilidade',
    title: 'Ruas, Pavimentação & Mobilidade',
    icon: 'Car',
    description: 'Qualidade do asfalto, nivelamento de ruas de terra, linhas e horários de ônibus municipais e ciclovias seguras.',
    highlightIssues: ['Ruas esburacadas ou sem pavimentação', 'Intervalos longos do transporte coletivo', 'Falta de calçadas acessíveis', 'Ausência de ciclovias integradas']
  },
  {
    id: 'iluminacao',
    title: 'Iluminação Pública',
    icon: 'Lightbulb',
    description: 'Substituição por luminárias LED, eliminação de pontos escuros em bairros periféricos e manutenção ágil.',
    highlightIssues: ['Lâmpadas queimadas sem troca rápida', 'Ruas inteiras na escuridão', 'Pontos de ônibus mal iluminados', 'Falta de iluminação na orla e praças']
  },
  {
    id: 'educacao',
    title: 'Educação & Primeira Infância',
    icon: 'GraduationCap',
    description: 'Vagas em creches, ampliação do contraturno escolar, modernização das escolas municipais e apoio pedagógico.',
    highlightIssues: ['Fila de espera para creches', 'Estrutura física e climatização das salas', 'Atividades extracurriculares e esportivas', 'Capacitação contínua de educadores']
  },
  {
    id: 'juventude',
    title: 'Juventude & Oportunidades',
    icon: 'Sparkles',
    description: 'Capacitação digital, primeiros passos no mercado de trabalho, inteligência artificial e espaços culturais jovens.',
    highlightIssues: ['Falta de cursos técnicos modernos', 'Dificuldade para o primeiro emprego', 'Poucas opções de lazer cultural saudável', 'Ausência de hubs de inovação comunitários']
  },
  {
    id: 'emprego',
    title: 'Emprego & Empreendedorismo',
    icon: 'Briefcase',
    description: 'Apoio aos microempreendedores locais, atração de investimentos limpos, cursos de gestão e formalização.',
    highlightIssues: ['Dependência de empregos sazonais', 'Dificuldade de crédito e burocracia para MEIs', 'Falta de incentivo ao comércio de bairro', 'Pouca qualificação voltada à economia local']
  },
  {
    id: 'seguranca',
    title: 'Segurança & Prevenção',
    icon: 'Shield',
    description: 'Atuação comunitária da Guarda Civil Municipal, câmeras de monitoramento inteligentes e urbanismo preventivo.',
    highlightIssues: ['Sensação de insegurança noturna', 'Furtos a residências e comércios', 'Pouco policiamento preventivo nos bairros', 'Terrenos baldios abandonados sem cerca']
  },
  {
    id: 'turismo',
    title: 'Turismo Sustentável & Cultura',
    icon: 'Compass',
    description: 'Valorização do patrimônio histórico, ecoturismo no Rio Itanhaém, eventos culturais e geração de renda o ano todo.',
    highlightIssues: ['Sazonalidade extrema (movimento só no verão)', 'Pouca sinalização turística histórica', 'Eventos concentrados em poucas datas', 'Falta de estrutura de receptivo e passeios guiados']
  },
  {
    id: 'meio_ambiente',
    title: 'Meio Ambiente & Bacia Hidrográfica',
    icon: 'Leaf',
    description: 'Proteção do Rio Itanhaém, recuperação de matas ciliares, coleta seletiva e conscientização ecológica costeira.',
    highlightIssues: ['Descarte irregular de entulho e lixo', 'Baixo índice de reciclagem municipal', 'Poluição de córregos e da foz do rio', 'Ocupações irregulares em áreas de mananciais']
  },
  {
    id: 'drenagem',
    title: 'Limpeza Urbana & Drenagem',
    icon: 'Droplets',
    description: 'Prevenção de alagamentos, desassoreamento de valas e canais, coleta regular de resíduos e capina de vias.',
    highlightIssues: ['Alagamentos frequentes em dias de chuva forte', 'Canais de drenagem assoreados e com mato', 'Atrasos periódicos na coleta de lixo', 'Falta de bueiros e grelhas de escoamento']
  }
];

export const YOUTH_OPPORTUNITY_MODULES: YouthOpportunityItem[] = [
  {
    id: 'ia-introdutoria',
    title: 'Cursos Introdutórios de Inteligência Artificial',
    category: 'Tecnologia & Inovação',
    icon: 'Cpu',
    description: 'Fundamentos de IA generativa, automação no dia a dia e aplicação em estudos e pequenos comércios.',
    targetAudience: 'Jovens a partir de 14 anos e estudantes da rede pública',
    civicRelevance: 'Democratiza o acesso às ferramentas que estão moldando o mercado global de trabalho.',
    statusNotice: 'Proposta em estudo para parcerias com polos educacionais e projetos comunitários.'
  },
  {
    id: 'ia-responsavel',
    title: 'Uso Responsável & Ético de Ferramentas de IA',
    category: 'Cidadania Digital',
    icon: 'ShieldAlert',
    description: 'Combate à desinformação, direitos autorais, pensamento crítico e proteção de dados pessoais na era dos algoritmos.',
    targetAudience: 'Estudantes do ensino fundamental e médio',
    civicRelevance: 'Garante que a tecnologia seja usada de maneira ética, segura e construtiva para a sociedade.',
    statusNotice: 'Proposta em estudo para oficinas complementares nas escolas.'
  },
  {
    id: 'programacao-web',
    title: 'Programação & Competências Digitais',
    category: 'Formação Técnica',
    icon: 'Code2',
    description: 'Lógica computacional, desenvolvimento de páginas web, manutenção de computadores e habilidades digitais aplicadas.',
    targetAudience: 'Jovens de 15 a 24 anos em busca de qualificação',
    civicRelevance: 'Abre portas para o trabalho remoto e serviços tecnológicos de alto valor agregado sem precisar sair da cidade.',
    statusNotice: 'Proposta em estudo com previsão de workshops práticos.'
  },
  {
    id: 'empreendedorismo-financeiro',
    title: 'Empreendedorismo & Educação Financeira',
    category: 'Finanças Pessoais & Negócios',
    icon: 'TrendingUp',
    description: 'Como organizar o orçamento familiar, entender juros, criar metas e abrir o primeiro negócio formal.',
    targetAudience: 'Jovens empreendedores e concluintes do ensino médio',
    civicRelevance: 'Evita o superendividamento precoce e estimula a cultura de autonomia econômica.',
    statusNotice: 'Proposta em estudo em articulação com entidades de apoio ao empreendedor.'
  },
  {
    id: 'precificacao-gestao',
    title: 'Precificação & Gestão de Pequenos Negócios',
    category: 'Gestão Prática',
    icon: 'Calculator',
    description: 'Cálculo de custos fixos e variáveis, margem de lucro real e controle simples de estoque para negócios locais.',
    targetAudience: 'Jovens que já vendem produtos ou prestam serviços artesanais/digitais',
    civicRelevance: 'Aumenta a sobrevida dos pequenos comércios e iniciativas autônomas de Itanhaém.',
    statusNotice: 'Proposta em estudo para módulos curtos de aplicação imediata.'
  },
  {
    id: 'vendas-online',
    title: 'Vendas pela Internet & Comércio Digital',
    category: 'E-commerce & Redes',
    icon: 'ShoppingBag',
    description: 'Criação de catálogos digitais, atendimento profissional no WhatsApp, anúncios simples e presença no Google Meu Negócio.',
    targetAudience: 'Comerciantes novatos, artesãos e prestadores de serviços de bairros',
    civicRelevance: 'Permite que pequenas empresas de Itanhaém alcancem clientes em toda a Baixada Santista e além.',
    statusNotice: 'Proposta em estudo com formato hands-on.'
  },
  {
    id: 'primeiro-emprego',
    title: 'Preparação para o Primeiro Emprego',
    category: 'Empregabilidade',
    icon: 'Award',
    description: 'Elaboração de currículo contemporâneo, simulação de entrevistas, postura profissional e comunicação interpessoal.',
    targetAudience: 'Jovens de 16 a 21 anos',
    civicRelevance: 'Reduz a barreira de entrada no mercado formal de trabalho e eleva a autoconfiança juvenil.',
    statusNotice: 'Proposta em estudo para ciclos trimestrais de mentorias voluntárias.'
  },
  {
    id: 'orientacao-carreira',
    title: 'Orientação Profissional & Vocacional',
    category: 'Desenvolvimento Humano',
    icon: 'Compass',
    description: 'Mapeamento de aptidões, conhecimento de áreas profissionais emergentes e oportunidades em cursos técnicos e vestibulares.',
    targetAudience: 'Alunos do 9º ano e ensino médio',
    civicRelevance: 'Ajuda a juventude a fazer escolhas conscientes de futuro com clareza de caminhos viáveis.',
    statusNotice: 'Proposta em estudo com convite a profissionais experientes da cidade.'
  },
  {
    id: 'projetos-comunitarios',
    title: 'Projetos Estudantis para Desafios Locais',
    category: 'Inovação Cívica',
    icon: 'Lightbulb',
    description: 'Hackathons cívicos e feiras de projetos onde estudantes criam soluções simples para problemas do seu próprio bairro.',
    targetAudience: 'Coletivos de estudantes, grêmios e centros comunitários',
    civicRelevance: 'Conecta a inteligência dos jovens aos desafios práticos da cidade, fomentando cidadania ativa.',
    statusNotice: 'Proposta em estudo com foco em desafios práticos dos bairros.'
  },
  {
    id: 'seguranca-cidadania',
    title: 'Atividades Educativas com Bombeiros, Saúde & Segurança',
    category: 'Prevenção & Cidadania',
    icon: 'HeartHandshake',
    description: 'Workshops práticos de primeiros socorros, prevenção a acidentes aquáticos em praias e rios, e noções de defesa civil.',
    targetAudience: 'Crianças e adolescentes em colônias de férias comunitárias',
    civicRelevance: 'Forma cidadãos conscientes dos riscos litorâneos e aptos a agir preventivamente para salvar vidas.',
    statusNotice: 'Proposta em estudo para cooperação técnica formativa.'
  }
];

export const PROPOSALS_DATA: Proposal[] = [
  {
    id: 'prop-01',
    title: 'Programa Ilumina Bairro: Expansão LED e Eliminação de Pontos Escuros',
    areaId: 'iluminacao',
    areaTitle: 'Iluminação Pública',
    problemIdentified: 'Moradores de bairros afastados do Centro (como Guapurá, Savoy, Gaivota e Cibratel II) relatam extensas vias sem luminosidade adequada, aumentando o medo noturno e o risco de acidentes.',
    availableEvidence: 'Reclamações registradas em ouvidorias e mapas de calor de chamados de troca de lâmpadas com prazos médios de atendimento superiores a 20 dias.',
    proposedSolution: 'Mapeamento georreferenciado colaborativo de pontos apagados e priorização orçamentária de substituição por luminárias LED de alta eficiência via CIP (Contribuição de Iluminação Pública).',
    targetBeneficiaries: 'Aproximadamente 45.000 moradores de vias secundárias e periféricas de Itanhaém.',
    estimatedCost: 'Estimativa inicial em elaboração com base no saldo anual da CIP municipal (sem criação de novos impostos).',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'Portal da Transparência de Itanhaém - Arrecadação e Aplicação da CIP', url: 'https://www.itanhaem.sp.gov.br/' },
      { title: 'Norma Técnica ABNT NBR 5101 (Iluminação Pública Eficiente)' }
    ],
    status: 'Em levantamento de dados',
    dateUpdated: 'Outubro de 2026'
  },
  {
    id: 'prop-02',
    title: 'Canal Aberto Bairros: Cronograma Transparente de Limpeza e Desassoreamento',
    areaId: 'drenagem',
    areaTitle: 'Limpeza Urbana & Drenagem',
    problemIdentified: 'Alagamentos recorrentes em períodos de chuva combinados com maré alta, agravados pelo assoreamento de valas de drenagem que cortam bairros como Bopiranga, Suarão e Savoy.',
    availableEvidence: 'Histórico de eventos pluviométricos severos registrados pela Defesa Civil SP e relatos constantes de água invadindo garagens e vias de trânsito.',
    proposedSolution: 'Publicação de calendário público trimestral com datas exatas de desassoreamento e limpeza preventiva de cada canal e vala, com fiscalização comunitária e fotos de antes/depois.',
    targetBeneficiaries: 'População de bairros ribeirinhos e regiões com drenagem por valas abertas.',
    estimatedCost: 'Custos operacionais incluídos nos contratos vigentes de conservação municipal, exigindo apenas reorganização de cronogramas e transparência de dados.',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'Defesa Civil do Estado de SP - Plano Preventivo de Defesa Civil (PPDC) Baixada Santista' },
      { title: 'Comitê da Bacia Hidrográfica da Baixada Santista (CBH-BS)' }
    ],
    status: 'Em análise jurídica',
    dateUpdated: 'Outubro de 2026'
  },
  {
    id: 'prop-03',
    title: 'Polo Municipal de Capacitação Digital & Inteligência Artificial para Jovens',
    areaId: 'juventude',
    areaTitle: 'Juventude & Oportunidades',
    problemIdentified: 'Juventude de Itanhaém com escassez de opções de qualificação moderna focada na nova economia digital, levando muitos a migrarem para outros municípios ou ficarem em subempregos.',
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
    dateUpdated: 'Outubro de 2026'
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
      { title: 'Datasus / Ministério da Saúde - Estratégia e-SUS APS' },
      { title: 'Lei Federal 14.129/2021 (Governo Digital e Transparência em Serviços Públicos)' }
    ],
    status: 'Em levantamento de dados',
    dateUpdated: 'Outubro de 2026'
  },
  {
    id: 'prop-05',
    title: 'Ciclovia Segura Interbairros: Integração Centro - Bairros Litorâneos',
    areaId: 'mobilidade',
    areaTitle: 'Ruas, Pavimentação & Mobilidade',
    problemIdentified: 'A bicicleta é o principal meio de transporte diário para milhares de trabalhadores em Itanhaém, mas as conexões entre a marginal da rodovia Padre Manoel da Nóbrega e as vias centrais são perigosas.',
    availableEvidence: 'Pesquisas de origem e destino na Baixada Santista e registros de ocorrências com ciclistas em trechos sem sinalização cicloviária.',
    proposedSolution: 'Adequação de faixas cicloviárias contínuas com pintura refletiva, tachões e sinalização vertical ligando grandes bairros residenciais (como Belas Artes, Gaivota e Suarão) aos polos comerciais.',
    targetBeneficiaries: 'Trabalhadores ciclistas, estudantes e praticantes de mobilidade ativa.',
    estimatedCost: 'Em avaliação orçamentária considerando repasses estaduais de trânsito e verbas de mobilidade urbana.',
    administrativeCompetence: 'Parceria Estadual',
    consultedSources: [
      { title: 'Plano Diretor de Desenvolvimento Integrado da Região Metropolitana da Baixada Santista (AGEM)' },
      { title: 'Código de Trânsito Brasileiro (CTB) - Diretrizes para Mobilidade Ativa' }
    ],
    status: 'Em avaliação orçamentária',
    dateUpdated: 'Outubro de 2026'
  },
  {
    id: 'prop-06',
    title: 'Fortalecimento da Coleta Seletiva e Inclusão Produtiva de Catadores Locais',
    areaId: 'meio_ambiente',
    areaTitle: 'Meio Ambiente & Bacia Hidrográfica',
    problemIdentified: 'Baixíssimo percentual de resíduos sólidos reciclados na cidade, com sobrecarga do aterro sanitário e queima/descarte prejudicial de materiais em terrenos baldios.',
    availableEvidence: 'Dados do Sistema Nacional de Informações sobre Saneamento (SNIS) apontando menos de 3% de reciclagem efetiva na maioria dos municípios costeiros.',
    proposedSolution: 'Estruturação de galpão de triagem comunitário, apoio logístico com caminhão dedicado em dias alternados nos bairros e formalização de associação de catadores.',
    targetBeneficiaries: 'Famílias de catadores de materiais recicláveis e toda a comunidade pela redução do passivo ambiental.',
    estimatedCost: 'Em levantamento de dados com base em editais do Fundo Estadual de Recursos Hídricos (Fehidro) e Fundo de Interesses Difusos (FID).',
    administrativeCompetence: 'Municipal',
    consultedSources: [
      { title: 'SNIS - Sistema Nacional de Informações sobre Saneamento' },
      { title: 'Lei Federal 12.305/2010 (Política Nacional de Resíduos Sólidos)' }
    ],
    status: 'Pronta para discussão pública',
    dateUpdated: 'Outubro de 2026'
  }
];

export const PUBLIC_SOURCES: PublicSource[] = [
  {
    name: 'Portal da Transparência de Itanhaém',
    organ: 'Prefeitura Municipal de Itanhaém',
    description: 'Acompanhamento de receitas, despesas, contratos de serviços públicos, folha de pagamento e licitações municipais.',
    url: 'https://transparencia.itanhaem.sp.gov.br/',
    theme: 'Orçamento e Finanças Públicas'
  },
  {
    name: 'IBGE Cidades — Panorama Itanhaém',
    organ: 'Instituto Brasileiro de Geografia e Estatística (IBGE)',
    description: 'Dados demográficos oficiais do Censo, PIB per capita, taxa de escolarização, receitas orçamentárias e IDH.',
    url: 'https://cidades.ibge.gov.br/brasil/sp/itanhaem/panorama',
    theme: 'Demografia e Indicadores Socioeconômicos'
  },
  {
    name: 'TCE-SP — Índice de Efetividade da Gestão (IEG-M)',
    organ: 'Tribunal de Contas do Estado de São Paulo',
    description: 'Avaliação técnica independente sobre a qualidade do gasto público em saúde, educação, planejamento e meio ambiente.',
    url: 'https://www.tce.sp.gov.br/ieg-m',
    theme: 'Gestão e Fiscalização Pública'
  },
  {
    name: 'SIOPE / FNDE — Dados de Investimento em Educação',
    organ: 'Fundo Nacional de Desenvolvimento da Educação (FNDE)',
    description: 'Demonstrativos e relatórios oficiais sobre a aplicação constitucional mínima dos 25% na educação básica de Itanhaém.',
    url: 'https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/financiamento/siope',
    theme: 'Educação Pública e Financiamento'
  },
  {
    name: 'DATASUS / Tabnet — Indicadores de Saúde',
    organ: 'Ministério da Saúde',
    description: 'Estatísticas de morbidade hospitalar, cobertura vacinal, atenção primária e mortalidade materno-infantil.',
    url: 'https://datasus.saude.gov.br/',
    theme: 'Saúde Pública'
  },
  {
    name: 'Plano Preventivo de Defesa Civil (PPDC)',
    organ: 'Defesa Civil do Estado de São Paulo / Agem',
    description: 'Mapeamento de áreas suscetíveis a escorregamentos, inundações bruscas e ressacas no litoral paulista.',
    url: 'https://www.defesacivil.sp.gov.br/',
    theme: 'Defesa Civil e Riscos Climáticos'
  }
];

export const INITIAL_DEMO_STATS = {
  totalResponses: 142,
  topThemes: [
    { name: 'Saúde & Postos de Atendimento', count: 98, percentage: 69 },
    { name: 'Ruas, Asfalto & Drenagem', count: 86, percentage: 60 },
    { name: 'Iluminação Pública & Segurança', count: 74, percentage: 52 },
    { name: 'Juventude, Emprego & Qualificação', count: 58, percentage: 41 },
    { name: 'Limpeza de Valas & Canais', count: 49, percentage: 35 }
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
      issue: 'Saúde & Especialidades',
      quote: 'Precisamos de mais médicos pediatras na UBS e exames laboratoriais mais rápidos para quem não pode pagar clínica particular.',
      date: 'Ontem'
    },
    {
      neighborhood: 'Gaivota',
      issue: 'Iluminação & Segurança',
      quote: 'Ruas escuras dificultam o trajeto de quem volta tarde da faculdade ou do trabalho em Santos / Praia Grande.',
      date: 'Há 2 dias'
    },
    {
      neighborhood: 'Suarão',
      issue: 'Drenagem & Valas',
      quote: 'A desobstrução das valas de escoamento antes do verão precisa de um calendário transparente para a comunidade acompanhar.',
      date: 'Há 3 dias'
    },
    {
      neighborhood: 'Guapurá',
      issue: 'Juventude & Tecnologia',
      quote: 'Nossos jovens precisam de cursos de programação, inteligência artificial e ajuda prática para conseguir o primeiro emprego formal.',
      date: 'Há 4 dias'
    }
  ]
};
