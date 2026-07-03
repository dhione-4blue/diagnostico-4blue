/* =====================================================================
   DIAGNÓSTICO MÁQUINA DE LUCROS — front-end (HTML/CSS/JS puro)
   Fluxo: intro -> setup -> avaliação -> 7 pilares -> dados (lead) ->
          [MQL] levantada de mão -> landing ILU/MDL -> resultado
          [não-MQL] resultado (com botão combo)
   Motor de personalização adaptativo ("IA própria" por regras).
   ===================================================================== */
"use strict";

const CFG = window.APP_CONFIG || {};

/* =================== ÍCONES SVG (sem emojis) =================== */
const PATHS = {
  check:'<polyline points="20 6 9 17 4 12"/>',
  alert:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  trending:'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  left:'<polyline points="15 18 9 12 15 6"/>',
  right:'<polyline points="9 18 15 12 9 6"/>',
  whats:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  bulb:'<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
  rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  coins:'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  sparkles:'<path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  gift:'<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  award:'<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  network:'<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M12 12H5v4M12 12h7v4"/>',
  presentation:'<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  thumb:'<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
  arrowUp:'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
};
function icon(name,cls){ return '<svg class="ic '+(cls||'')+'" viewBox="0 0 24 24" aria-hidden="true">'+(PATHS[name]||'')+'</svg>'; }
function infoIcon(text){ return `<span class="info" data-info tabindex="0">${icon('info')}<span class="info-pop">${text}</span></span>`; }

/* =================== DADOS =================== */
const BUSINESS_TYPES = [
  { id:'select', name:'Selecione seu segmento', idealMargin:0 },
  { id:'commerce', name:'Comércio em geral', idealMargin:0.15 },
  { id:'gastronomy', name:'Gastronomia (bar, restaurante, etc)', idealMargin:0.15 },
  { id:'commission_services', name:'Serviço com comissão (clínicas, salão, etc)', idealMargin:0.15 },
  { id:'general_services', name:'Serviços em geral', idealMargin:0.25 },
  { id:'industry', name:'Indústria em geral', idealMargin:0.10 },
  { id:'marketplace', name:'Marketplace (mercado livre, shopee, etc)', idealMargin:0.08 },
  { id:'other', name:'Outro (especificar)', idealMargin:0.15 },
];

const INITIAL_EVAL_QUESTIONS = [
  { id:'profit_crisis', text:'Quão lucrativa é sua empresa, mesmo em tempos de crise?', label0:'Muito prejuízo e dívida', label10:'Superando meta ideal de lucro' },
  { id:'freedom', text:'O quanto você consegue se ausentar (ex.: tirar férias) e as coisas continuarem funcionando bem?', label0:'Nunca tirou férias; nada funciona sem o sócio', label10:'A empresa roda 100% independente do sócio' },
  { id:'sales_growth', text:'Quanto a sua empresa tem mantido um ritmo constante de aumento nas vendas nos últimos 2 anos?', label0:'Vendas caindo fortemente', label10:'Grande crescimento das vendas nos últimos ~2 anos' },
];

const PILLARS = [
  { id:'finance', name:'Finanças', icon:'coins', improve:'organizar o fluxo de caixa, ganhar clareza nos números e acertar a precificação', questions:[
    { id:'fin_indicators', text:'Quão claros são indicadores essenciais como margem de contribuição, lucro operacional, resultado líquido?', isBasic:true },
    { id:'fin_pricing', text:'Quão preciso é o método que você usa para precificar seus produtos ou serviços?' },
    { id:'fin_reserve', text:'Quão próximo você está de atingir a margem de lucro e a reserva financeira que considera ideal para o seu negócio?' },
  ]},
  { id:'strategy', name:'Estratégia', icon:'target', improve:'definir metas claras e um plano de crescimento estruturado', questions:[
    { id:'strat_goals', text:'Quão claras e visuais são as metas de vendas e de lucro do negócio?', isBasic:true },
    { id:'strat_planning', text:'Quão bem estruturado é o Planejamento Estratégico da Empresa e o seu respectivo acompanhamento?' },
    { id:'strat_growth', text:'Quão claro é o Plano de crescimento e estruturação da empresa?' },
  ]},
  { id:'marketing', name:'Marketing', icon:'trending', improve:'atrair um volume constante e previsível de potenciais clientes', questions:[
    { id:'mkt_active', text:'Quão ativa é a estratégia de marketing, com ações claras, investimentos feitos para atrair potenciais clientes?', isBasic:true },
    { id:'mkt_crm', text:'Quão organizada e consistente é a comunicação e relacionamento com leads e clientes que já passaram por aí?' },
    { id:'mkt_volume', text:'Quanto o volume de potenciais clientes que chegam ao seu negócio é suficiente para bater suas metas de vendas?' },
  ]},
  { id:'sales', name:'Vendas', icon:'chart', improve:'estruturar um processo de vendas com etapas, roteiros e metas batidas', questions:[
    { id:'sal_process', text:'O quanto o processo de vendas tem etapas claras, com roteiros planejados focando em aumentar a taxa de conversão da venda?', isBasic:true },
    { id:'sal_training', text:'Com que frequência você realiza e atualiza treinamentos de vendas para sua equipe?' },
    { id:'sal_goals', text:'O quanto as metas de vendas estão sendo batidas?' },
  ]},
  { id:'processes', name:'Processos', icon:'gear', improve:'padronizar e documentar processos para reduzir a dependência dos sócios', questions:[
    { id:'pro_std', text:'Quão padronizados e documentados estão os processos essenciais que envolvem os clientes?', isBasic:true },
    { id:'pro_routine', text:'O quanto você consegue ter uma rotina organizada e tempo livre para olhar e pensar a estratégia do negócio?' },
    { id:'pro_autonomy', text:'O quão bem as atividades são realizadas sem a presença ou intervenção dos sócios?' },
  ]},
  { id:'people', name:'Pessoas', icon:'users', improve:'fortalecer cultura, recrutamento e a confiança na equipe', questions:[
    { id:'peo_culture', text:'Quão claro, formalizado e reforçado é o Código de Cultura para os colaboradores?', isBasic:true },
    { id:'peo_recruiting', text:'Quão bem estruturado é o processo de recrutamento e seleção de novos colaboradores?' },
    { id:'peo_trust', text:'O quanto você realmente confia na qualidade, produtividade e engajamento da sua equipe?' },
  ]},
  { id:'leadership', name:'Liderança', icon:'award', improve:'desenvolver liderança e delegar mantendo a qualidade da entrega', questions:[
    { id:'led_inspiration', text:'O quanto você acredita que consegue inspirar e engajar sua equipe para alcançar resultados?', isBasic:true },
    { id:'led_dev', text:'Com que frequência você dedica tempo para desenvolver suas habilidades de liderança?' },
    { id:'led_delegation', text:'Quão bem você consegue delegar responsabilidades mantendo a qualidade da entrega?' },
  ]},
];

const JOB_TITLES = ['Dono / Sócio','Gerente / Coordenador / Supervisor','Analista / Assistente','Estagiário / Estudante','Outro'];
const REVENUE_RANGES = ['Até 30mil/mês','30 a 60mil/mês','60 a 100mil/mês','100 a 300mil/mês','300 a 500mil/mês','Acima de 500mil/mês','Não sei informar o faturamento'];

const LEVELS = {
  1:{ name:'Fazenda de Problemas', color:'#ef4444', image:'assets/fazenda-problemas.png' },
  2:{ name:'Pagadora de Boletos', color:'#f59e0b', image:'assets/pagadora-boletos.png' },
  3:{ name:'Laboratório de Dinheiro', color:'#004882', image:'assets/lab-dinheiro.png' },
  4:{ name:'Máquina de Lucros', color:'#0072CE', image:'assets/maquina-lucros.png' },
};

/* =================== ESTADO =================== */
const S = {
  step:'intro', pillarIdx:0, submitting:false, submitted:false,
  noFinancials:false,
  businessType:'select', businessOther:'', revenue:0, profit:0, desiredRevenue:0,
  answers:{},
  lead:{ name:'', email:'', phone:'', jobTitle:'', revenueRange:'' },
  solution:null,        // 'ILU' | 'MDL'
  resultMode:'combo',   // 'handraise' | 'declined' | 'combo'
  handraiseTag:'',
};

const app = document.getElementById('app');
const fmt = v => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0);
const numBR = v => new Intl.NumberFormat('pt-BR').format(Math.abs(v||0));
const firstName = () => (S.lead.name||'').trim().split(/\s+/)[0] || '';
const segmentName = () => S.businessType==='other'
  ? (S.businessOther.trim() || 'Outro')
  : ((BUSINESS_TYPES.find(t=>t.id===S.businessType)||{}).name||'');

// faturamento numérico do setup -> faixa do formulário
function revenueToRange(v){
  if(v<=30000) return 'Até 30mil/mês';
  if(v<=60000) return '30 a 60mil/mês';
  if(v<=100000) return '60 a 100mil/mês';
  if(v<=300000) return '100 a 300mil/mês';
  if(v<=500000) return '300 a 500mil/mês';
  return 'Acima de 500mil/mês';
}
// faixa do formulário -> faturamento mínimo (limite inferior da faixa)
function rangeMinRevenue(faixa){
  switch(faixa){
    case '30 a 60mil/mês': return 30000;
    case '60 a 100mil/mês': return 60000;
    case '100 a 300mil/mês': return 100000;
    case '300 a 500mil/mês': return 300000;
    case 'Acima de 500mil/mês': return 500000;
    default: return 0; // 'Até 30mil/mês' e 'Nada / Não tenho empresa'
  }
}
// faturamento efetivo para roteamento (usa o número do setup; se pulou, usa a faixa)
function effRevenue(){
  if(!S.noFinancials && S.revenue>0) return S.revenue;
  return rangeMinRevenue(S.lead.revenueRange);
}

/* =================== CÁLCULOS =================== */
function calc(){
  const type = BUSINESS_TYPES.find(t=>t.id===S.businessType);
  const idealMargin = (type && type.idealMargin > 0) ? type.idealMargin : 0.15;

  // Score de gestão (antes dos custos)
  const pillarScores = PILLARS.map(p=>{
    const arr = p.questions.map(q=>S.answers[q.id]||0);
    const avg = arr.reduce((a,b)=>a+b,0)/arr.length;
    return { id:p.id, name:p.name, icon:p.icon, improve:p.improve, score:avg*10 };
  });
  const basicScores = PILLARS.map(p=>{
    const b = p.questions.find(q=>q.isBasic);
    return { name:p.name, score:(b?(S.answers[b.id]||0):0)*10 };
  });
  const totalPillar = pillarScores.reduce((a,c)=>a+c.score,0);
  const mgmtPct = (totalPillar/(PILLARS.length*100))*100;

  // CUSTO DA INEFICIÊNCIA (lógica ORIGINAL): lucro ideal (margem do segmento) - lucro atual
  const idealProfit = S.revenue * idealMargin;
  const inefMonthly = Math.max(0, idealProfit - S.profit);

  // CUSTO DE OPORTUNIDADE (lógica ORIGINAL): lucro no faturamento desejado (margem ideal) - lucro atual
  const desiredProfit = S.desiredRevenue * idealMargin;
  const oppMonthly = Math.max(0, desiredProfit - S.profit);

  let lvl = 1;
  if(mgmtPct>=88.889) lvl=4; else if(mgmtPct>=72.223) lvl=3; else if(mgmtPct>=44.445) lvl=2;
  const level = Object.assign({ level:lvl }, LEVELS[lvl]);

  return { idealMargin:idealMargin*100, idealProfit, desiredProfit,
    inefMonthly, inefYearly:inefMonthly*12, oppMonthly, oppYearly:oppMonthly*12,
    pillarScores, basicScores, mgmtPct, level };
}

/* =================== MOTOR DE PERSONALIZAÇÃO =================== */
function insights(r){
  const sorted = r.pillarScores.slice().sort((a,b)=>a.score-b.score);
  const weak = sorted.slice(0,2);
  const strong = sorted[sorted.length-1];
  const nome = firstName();

  const lvlMsg = {
    1:`${nome?nome+', ':''}hoje sua empresa funciona mais como uma <b>Fazenda de Problemas</b>: o dia a dia consome quase toda a sua energia e sobra pouco resultado.`,
    2:`${nome?nome+', ':''}sua empresa está no estágio <b>Pagadora de Boletos</b>: ela gira, mas o dinheiro entra e sai sem virar lucro consistente.`,
    3:`${nome?nome+', ':''}sua empresa já é um <b>Laboratório de Dinheiro</b>: existe estrutura, mas ainda há pontos travando o salto para o próximo nível.`,
    4:`${nome?nome+', ':''}parabéns — sua empresa já opera como uma <b>Máquina de Lucros</b>. Agora o jogo é proteger e escalar o que já funciona.`,
  }[r.level.level];

  const focusList = weak.map(w=>w.improve);
  const focusMsg = `Olhando para suas respostas, o ponto que mais pesa agora é <b>${weak[0].name}</b>`+
    (weak[1] ? `, seguido de <b>${weak[1].name}</b>.` : '.')+
    ` Na prática, isso significa ${focusList.join(' e ')}.`;

  const strongMsg = strong.score>=60
    ? `Do lado positivo, <b>${strong.name}</b> é hoje sua área mais forte — um bom apoio para destravar o resto.`
    : `Ainda não há um pilar realmente consolidado, o que mostra que pequenas melhorias terão um efeito grande no resultado.`;

  const improveList = weak.concat(sorted[2] ? [sorted[2]] : []).map(p=>({
    name:p.name, icon:p.icon, text:p.improve, score:p.score
  }));

  return { weak, strong, lvlMsg, focusMsg, strongMsg, improveList };
}

/* =================== QUALIFICAÇÃO E ROTEAMENTO =================== */
const LEADERSHIP = CFG.LEADERSHIP_ROLES || ['Dono / Sócio','Gerente / Coordenador / Supervisor'];
const ILU_MIN = (CFG.ILU_MIN_REVENUE!=null?CFG.ILU_MIN_REVENUE:30000);
const MDL_MIN = (CFG.MDL_MIN_REVENUE!=null?CFG.MDL_MIN_REVENUE:50000);
function isLeadership(){ return LEADERSHIP.includes(S.lead.jobTitle); }

// ILU x MDL (apenas relevante para 50k+): Financeiro fraco isolado -> ILU, senão MDL
function decideSolution(r){
  const finance = r.pillarScores[0].score;
  const others = r.pillarScores.slice(1).map(p=>p.score);
  const otherAvg = others.reduce((a,b)=>a+b,0)/others.length;
  const otherMin = (CFG.ILU_OTHER_MIN!=null?CFG.ILU_OTHER_MIN:55);
  const gap = (CFG.ILU_FINANCE_GAP!=null?CFG.ILU_FINANCE_GAP:20);
  const iluCase = otherAvg >= otherMin && finance <= (otherAvg - gap);
  return iluCase ? 'ILU' : 'MDL';
}

// Oferta final: 'combo' | 'ILU' | 'MDL'
function decideOffer(r){
  const ev = effRevenue();
  if(!isLeadership() || ev < ILU_MIN) return 'combo';   // <30k ou não-liderança
  if(ev >= MDL_MIN) return decideSolution(r);            // 50k+ -> ILU ou MDL
  return 'ILU';                                          // 30k a 50k -> ILU
}

// Tag de controle (a tag principal de levantada de mão é aplicada depois)
function baseTag(r){
  const offer = decideOffer(r);
  if(offer==='combo') return 'diagnostico-combo';
  return offer==='ILU' ? 'diagnostico-ilu-mql' : 'diagnostico-mdl-mql';
}
const HANDRAISE_TAGS = {
  ILU:'inscrito ILU lp B [PER] diagnostico de gestao',
  MDL:'inscrito MDL lp B [PER] diagnostico de gestao',
};

/* =================== VALIDAÇÃO =================== */
function stepComplete(){
  if(S.step==='setup'){
    const okType = S.businessType!=='select' && (S.businessType!=='other' || S.businessOther.trim().length>1);
    return okType && S.revenue!==0 && S.desiredRevenue>100;
  }
  if(S.step==='initial_eval') return INITIAL_EVAL_QUESTIONS.every(q=>S.answers[q.id]!==undefined);
  if(S.step==='pillars') return PILLARS[S.pillarIdx].questions.every(q=>S.answers[q.id]!==undefined);
  if(S.step==='lead_capture'){
    const l=S.lead;
    return l.name.trim().length>2 && l.email.includes('@') && l.phone.replace(/\D/g,'').length>=8 && l.jobTitle!=='' && l.revenueRange!=='';
  }
  return true;
}

/* =================== NAVEGAÇÃO =================== */
const toTop = () => window.scrollTo({top:0,behavior:'smooth'});
function next(){
  toTop();
  if(S.step==='setup') S.step='initial_eval';
  else if(S.step==='initial_eval') S.step='pillars';
  else if(S.step==='pillars'){
    if(S.pillarIdx<PILLARS.length-1) S.pillarIdx++;
    else { if(!S.lead.revenueRange && !S.noFinancials) S.lead.revenueRange = revenueToRange(S.revenue); S.step='lead_capture'; }
  } else if(S.step==='lead_capture'){ finishCapture(); return; }
  render();
}
function back(){
  toTop();
  if(S.step==='setup') S.step='intro';
  else if(S.step==='initial_eval') S.step='setup';
  else if(S.step==='pillars'){ if(S.pillarIdx>0) S.pillarIdx--; else S.step='initial_eval'; }
  else if(S.step==='lead_capture'){ S.step='pillars'; S.pillarIdx=PILLARS.length-1; }
  render();
}
function reset(){
  toTop();
  S.step='setup'; S.pillarIdx=0; S.answers={}; S.submitted=false; S.noFinancials=false;
  S.solution=null; S.resultMode='combo'; S.handraiseTag='';
  render();
}

/* =================== ENVIO / FLUXO PÓS-DADOS =================== */
function buildPayload(r, extra){
  const p = {
    'Data/Hora': new Date().toLocaleString('pt-BR'),
    'Nome': S.lead.name, 'E-mail': S.lead.email, 'WhatsApp': S.lead.phone,
    'Cargo': S.lead.jobTitle, 'Faturamento Faixa': S.lead.revenueRange,
    'Segmento': segmentName(),
    'Faturamento Médio Mensal': S.noFinancials?'':S.revenue,
    'Lucro Atual': S.noFinancials?'':S.profit,
    'Faturamento Alvo': S.noFinancials?'':S.desiredRevenue,
    'Sem Dados Financeiros': S.noFinancials?'Sim':'Não',
    'Gera Lucro': String(S.answers['profit_crisis']!=null?S.answers['profit_crisis']:''),
    'Gera Liberdade': String(S.answers['freedom']!=null?S.answers['freedom']:''),
    'Cresce Vendas': String(S.answers['sales_growth']!=null?S.answers['sales_growth']:''),
    'Nível de Gestão': r.level.name, 'Score Geral': r.mgmtPct.toFixed(2)+'%',
    'Finanças': r.pillarScores[0].score.toFixed(1), 'Estratégia': r.pillarScores[1].score.toFixed(1),
    'Marketing': r.pillarScores[2].score.toFixed(1), 'Vendas': r.pillarScores[3].score.toFixed(1),
    'Processos': r.pillarScores[4].score.toFixed(1), 'Pessoas': r.pillarScores[5].score.toFixed(1),
    'Liderança': r.pillarScores[6].score.toFixed(1),
    'Tag': baseTag(r), 'Solucao Sugerida': decideOffer(r),
  };
  return Object.assign(p, extra||{});
}

function sendToBackend(payload){
  const url = CFG.APPS_SCRIPT_URL || '';
  if(!url || url.startsWith('COLE_AQUI')){ console.warn('APPS_SCRIPT_URL não configurada:', payload); return Promise.resolve(); }
  const ctrl = new AbortController();
  const to = setTimeout(()=>ctrl.abort(), CFG.SUBMIT_TIMEOUT_MS||20000);
  return fetch(url,{ method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify(payload), signal:ctrl.signal })
    .catch(e=>console.warn('Falha/timeout no envio:', e))
    .finally(()=>clearTimeout(to));
}

function dl(event, data){ try{ (window.dataLayer=window.dataLayer||[]).push(Object.assign({event:event}, data||{})); }catch(e){} }

/* =================== POPUP DE CARREGAMENTO =================== */
function delay(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }
function showLoader(title, msg){
  hideLoader();
  var d=document.createElement('div');
  d.className='overlay'; d.id='loader-overlay';
  d.innerHTML='<div class="ov-box"><div class="ov-brand">4blue</div><div class="ov-ring"></div>'+
    '<h3>'+title+'</h3><p>'+msg+'</p><div class="ov-bar"><span></span></div></div>';
  document.body.appendChild(d);
}
function hideLoader(){ var d=document.getElementById('loader-overlay'); if(d) d.remove(); }

async function finishCapture(){
  S.submitting=true; render();
  const r = calc();
  const offer = decideOffer(r);
  const payload = buildPayload(r);

  dl('diagnostico_concluido', { faixa:S.lead.revenueRange, segmento:segmentName(),
    nivel:r.level.name, score:r.mgmtPct.toFixed(0), solucao:offer, qualificado:(offer!=='combo') });
  if(window.fbq){ try{ fbq('track','Lead',{content_name:'Diagnostico Maquina de Lucros', value:S.revenue, currency:'BRL'}); }catch(e){} }

  showLoader('Gerando seu diagnóstico', 'Estamos preparando algo especial para você. Só um instante...');
  await Promise.all([ sendToBackend(payload), delay(1700) ]);
  S.submitted=true; S.submitting=false;

  if(offer==='combo'){ S.resultMode='combo'; S.step='results'; }
  else { S.solution=offer; S.step='handraise'; }
  hideLoader();
  render();
}

async function raiseHand(){
  const tag = HANDRAISE_TAGS[S.solution];
  S.handraiseTag = tag;
  dl('levantada_de_mao', { solucao:S.solution, tag:tag });
  if(window.fbq){ try{ fbq('trackCustom','LevantadaDeMao',{solucao:S.solution}); }catch(e){} }
  showLoader('Perfeito, recebemos seu interesse!', 'Estamos preparando o seu diagnóstico completo...');
  await Promise.all([ sendToBackend({ action:'handraise', 'E-mail':S.lead.email, 'Nome':S.lead.name,
    'WhatsApp':S.lead.phone, 'Tag':tag, 'Solucao':S.solution }), delay(1700) ]);
  S.resultMode='handraise'; S.step='results'; toTop(); hideLoader(); render();
}
async function declineSolution(){
  dl('recusou_solucao', { solucao:S.solution });
  showLoader('Preparando seu diagnóstico', 'Montando a análise completa da sua empresa...');
  await delay(1200);
  S.resultMode='declined'; S.step='results'; toTop(); hideLoader(); render();
}

/* =================== INPUTS =================== */
function currencyField(label, key, allowNeg, ph, info){
  const val = S[key]; const neg = val<0;
  const display = val===0 ? '' : (neg?'-':'')+numBR(val);
  return `<div class="field"><label class="lbl">${label} ${info?infoIcon(info):''}</label>
    <div class="cur-wrap ${neg?'neg':''}"><span class="pfx">R$</span>
      <input inputmode="numeric" class="${neg?'neg':''}" data-cur="${key}" data-neg="${allowNeg?1:0}"
        value="${display}" placeholder="${ph||'0'}" /></div></div>`;
}

/* =================== VIEWS =================== */
function introView(){
  return `<div class="step">
    <div class="intro-hero">
      <h1 class="intro-h1">Você tem anos de empresa e já fatura bem.<br>E o que falta para finalmente crescer e ganhar mais dinheiro?</h1>
      <img class="intro-img" src="assets/intro-founders.png" alt="4blue" onerror="this.style.display='none'" />
      <p class="intro-p">Faça nosso diagnóstico e descubra, em apenas <b>5 minutos</b>, o que está impedindo sua empresa de crescer e o que você precisa fazer para sair dessa situação de forma rápida.</p>
      <button class="btn btn-primary btn-lg" data-act="start">Começar Diagnóstico ${icon('right')}</button>
    </div>
  </div>`;
}

function setupView(){
  return `<div class="step stack">
    <div style="text-align:left">
      <h1 class="title">Vamos começar o<br>seu diagnóstico</h1>
      <p class="lead">Insira os dados base da sua empresa para iniciarmos a análise de performance.</p>
    </div>
    <div class="card grid2">
      <div class="field" ${S.businessType==='other'?'style="grid-column:1/-1"':''}>
        <label class="lbl">Tipo de Negócio ${infoIcon('Seu segmento. Usamos para comparar seu lucro com a margem ideal do setor.')}</label>
        <select data-set="businessType">
          ${BUSINESS_TYPES.map(t=>`<option value="${t.id}" ${t.id==='select'?'disabled':''} ${S.businessType===t.id?'selected':''}>${t.name}</option>`).join('')}
        </select>
        ${S.businessType==='other'
          ? `<input data-set="businessOther" value="${S.businessOther.replace(/"/g,'&quot;')}" placeholder="Descreva seu segmento" style="margin-top:10px" />`
          : ''}
      </div>
      ${currencyField('Faturamento Médio Mensal','revenue',false,'Ex: 50.000','Quanto entra por mês com vendas, em média, antes de descontar custos.')}
      ${currencyField('Lucro Médio Mensal Atual','profit',true,'Ex: 5.000','O que sobra por mês depois de pagar TODOS os custos e despesas (impostos, pró-labore, etc.). Pode ser negativo.')}
      ${currencyField('Faturamento Desejado (Alvo)','desiredRevenue',false,'Ex: 100.000','A meta de faturamento mensal que você quer alcançar.')}
    </div>
    <button class="btn btn-primary" data-act="next" ${stepComplete()?'':'disabled'}>Próximo Passo ${icon('right')}</button>
    <button class="link-skip" data-act="skip-setup">Não tenho essas informações agora — pular esta etapa</button>
  </div>`;
}

function questionsView(){
  const isInit = S.step==='initial_eval';
  const list = isInit ? INITIAL_EVAL_QUESTIONS : PILLARS[S.pillarIdx].questions;
  const tag = isInit ? 'Empresa Máquina de Lucros' : PILLARS[S.pillarIdx].name;
  const h2 = isInit ? 'Sua Performance Atual' : 'Pilar: '+PILLARS[S.pillarIdx].name;
  const last = S.step==='pillars' && S.pillarIdx===PILLARS.length-1;
  return `<div class="step stack">
    <div class="seg-head">
      <button class="iconbtn" data-act="back">${icon('left')}</button>
      <span class="ln"></span><span class="tag">${tag}</span><span class="ln"></span>
    </div>
    <div class="center"><h2 class="title">${h2}</h2>
      <p class="sub">Dê uma nota de 0 a 10 de acordo com o nível da sua empresa.</p></div>
    <div>${list.map(q=>`
      <div class="q">
        <p class="q-text">${q.text}</p>
        <div class="scale">${[...Array(11)].map((_,i)=>`
          <button data-q="${q.id}" data-v="${i}" class="${S.answers[q.id]===i?'sel':''}">${i}</button>`).join('')}</div>
        <div class="scale-lbls">
          <div><span class="n0">Nota 0</span>${q.label0||'Péssimo / Não existe'}</div>
          <div class="r"><span class="n10">Nota 10</span>${q.label10||'Excelente / Perfeito'}</div>
        </div>
      </div>`).join('')}</div>
    <button class="btn btn-primary" data-act="next" ${stepComplete()?'':'disabled'}>${last?'Ver Resultados':'Continuar'} ${icon('right')}</button>
  </div>`;
}

function leadView(){
  const l=S.lead;
  return `<div class="step stack">
    <div class="seg-head">
      <button class="iconbtn" data-act="back">${icon('left')}</button>
      <span class="ln"></span><span class="tag">Finalizando</span><span class="ln"></span>
    </div>
    <div class="center"><h2 class="title">Quase lá!</h2>
      <p class="sub">Para podermos te entregar o resultado final, preencha abaixo:</p></div>
    <div class="card" style="max-width:460px;margin:0 auto;width:100%">
      <div class="field"><label class="lbl">Qual seu nome</label>
        <input data-lead="name" value="${l.name.replace(/"/g,'&quot;')}" placeholder="João Silva" /></div>
      <div class="field"><label class="lbl">Qual seu melhor e-mail?</label>
        <input type="email" inputmode="email" data-lead="email" value="${l.email.replace(/"/g,'&quot;')}" placeholder="exemplo@4blue.com.br" /></div>
      <div class="field"><label class="lbl">Qual seu Whatsapp com DDD?</label>
        <input type="tel" inputmode="tel" data-lead="phone" value="${l.phone.replace(/"/g,'&quot;')}" placeholder="(11) 99999-9999" /></div>
      <div class="field"><label class="lbl">Qual seu cargo?</label>
        <select data-lead="jobTitle"><option value="" ${l.jobTitle===''?'selected':''} disabled>Selecione:</option>
          ${JOB_TITLES.map(t=>`<option ${l.jobTitle===t?'selected':''}>${t}</option>`).join('')}</select></div>
      <div class="field" style="margin-bottom:0"><label class="lbl">Qual o faturamento do seu negócio?</label>
        <select data-lead="revenueRange"><option value="" ${l.revenueRange===''?'selected':''} disabled>Selecione:</option>
          ${REVENUE_RANGES.map(t=>`<option ${l.revenueRange===t?'selected':''}>${t}</option>`).join('')}</select></div>
    </div>
    <button class="btn btn-primary" data-act="next" ${stepComplete()&&!S.submitting?'':'disabled'}>
      ${S.submitting?'<span class="spin"></span> Gerando Diagnóstico...':'Gerar Meu Diagnóstico '+icon('right')}</button>
  </div>`;
}

function declineBtn(){
  return `<div class="cta-wrap"><button class="btn btn-red" data-act="decline">Não quero a solução agora — ver só meu diagnóstico</button></div>`;
}

/* ---- Levantada de mão (reveal do nível) ---- */
function handraiseView(){
  const r = calc();
  return `<div class="step stack">
    <div class="center">
      <h1 class="title">${firstName()?firstName()+', seu':'Seu'} resultado está pronto</h1>
    </div>
    <div class="card level-card">
      <div class="lp-present" style="color:var(--primary);margin:0">Com base nas suas respostas, sua empresa é</div>
      <div class="level-img"><img src="${r.level.image}" alt="${r.level.name}" /></div>
      <h3 class="italic-h" style="font-size:26px;color:${r.level.color};margin:0">${r.level.name}</h3>
      <div class="lvl-bars">${[1,2,3,4].map(l=>`<div class="${l<=r.level.level?'on':''}"></div>`).join('')}</div>
      <p class="lbl" style="margin:0">Nível ${r.level.level} de 4 • Nota geral ${r.mgmtPct.toFixed(0)}%</p>
    </div>
    <div class="ai-box">
      <p>${insights(r).lvlMsg}</p>
      <p>Mas antes de te mostrar todos os detalhes do diagnóstico, quero te apresentar a <b>solução que vai te ajudar a sair desse resultado e ir para o próximo nível</b>.</p>
    </div>
    <button class="btn btn-primary btn-lg" data-act="see-solution">Ver minha solução ${icon('right')}</button>
    ${declineBtn()}
  </div>`;
}

/* ---- Landing ILU ---- */
function iluView(){
  const cta = (label)=>`<a class="btn btn-primary btn-lg" data-act="raise" role="button">${icon('bulb')} ${label}</a>`;
  return `<div class="step lp">
    <div class="lp-hero">
      <h1>O diagnóstico é claro</h1>
      <p>Seus resultados mostram que o foco da sua empresa agora deve ser um só: <b style="color:#fff">Lucratividade Imediata e Segurança Financeira</b>.</p>
      <p>A boa notícia? A solução para virar esse jogo é muito mais simples do que você imagina.</p>
      <div class="lp-present">Apresentamos<b>O Iluminismo Financeiro</b></div>
      <div class="cta-wrap">${cta('Quero uma reunião com um especialista')}</div>
    </div>

    <div class="lp-section">
      <h2>O que você ganha com o Iluminismo ao seu lado?</h2>
      ${benefit('shield','Ordem na Casa','Chega de misturar dinheiro pessoal e da empresa. Tenha um fluxo de caixa impecável e controle total das suas finanças.')}
      ${benefit('chart','Lucro Estratégico','Pare de adivinhar. Mapeie seus números e descubra exatamente onde cortar custos e como multiplicar seus resultados.')}
      ${benefit('target','Precificação Perfeita','Descubra a margem real de cada produto. Cobre o preço justo para bater metas e garantir a sustentabilidade do negócio.')}
      ${benefit('shield','Blindagem Anti-Crise','Crie uma reserva de emergência sólida e tome decisões baseadas em dados, não em intuição.')}
      <div class="cta-wrap">${cta('Quero conhecer o Iluminismo e parar de perder dinheiro')}</div>
    </div>

    <div class="mission">
      <h3>Nossa missão é ousada</h3>
      <p>Vamos ajudar a tornar a <span class="hl">SUA empresa de 2 a 10 vezes mais lucrativa</span> em até 6 meses.</p>
      <p>E o melhor: esqueça aquelas consultorias tradicionais e inacessíveis. O Iluminismo Financeiro foi desenhado para caber no seu bolso, colocando um especialista lado a lado com você.</p>
      <p>Seu tempo é precioso e sua empresa não pode mais sangrar dinheiro por falta de clareza. Conheça nossa <span class="hl">garantia de 30 dias</span> e dê o primeiro passo para ter lucro de verdade na sua conta.</p>
      <div class="cta-wrap"><a class="btn btn-wa btn-lg" data-act="raise" role="button">${icon('whats')} Quero falar com a equipe pelo WhatsApp</a></div>
    </div>
    ${declineBtn()}
  </div>`;
}

/* ---- Landing MDL ---- */
function mdlView(){
  return `<div class="step lp">
    <div class="lp-hero">
      <h1>Seu diagnóstico revelou um potencial explosivo!</h1>
      <p>Os números mostram que sua empresa tem grandes chances de <b style="color:#fff">crescer 75% no próximo ano</b> e dobrar o seu lucro atual nos próximos 12 meses.</p>
      <p>Como fazer isso acontecer? Com o método validado que já multiplicou os lucros de mais de <b style="color:#fff">15 mil empresários</b>.</p>
      <div class="lp-present">Apresentamos<b>Mentoria Máquina de Lucros (MDL)</b></div>
      <div class="cta-wrap"><a class="btn btn-primary btn-lg" data-act="raise" role="button">${icon('rocket')} Quero uma reunião para conhecer o Máquina de Lucros</a></div>
    </div>

    <div class="lp-section">
      <h2>O que faz o Máquina de Lucros ser tão poderoso?</h2>
      <p class="intro">Um ecossistema completo para você parar de "apagar incêndios" e focar no que realmente importa: o crescimento do seu negócio.</p>

      <div class="lp-group-title">${icon('target')} Estratégia e acompanhamento de elite</div>
      ${benefit('users','Mentoria com Sócios','Mais de 50 encontros semanais no ano para resolver desafios, tirar dúvidas e desenhar rotas de expansão.')}
      ${benefit('calendar','Reunião Mensal e Plano de Voo','Reuniões individuais para definir o foco exato do mês e construir um plano de ação claro e direto.')}
      ${benefit('chart','Análises Trimestrais','Mergulho profundo nos seus números com a ajuda de um consultor financeiro especialista.')}

      <div class="lp-group-title">${icon('rocket')} Aceleração e equipe autogerenciável</div>
      ${benefit('sparkles','Programa PRIME','Acelere uma área estratégica (finanças, marketing, pessoas ou processos) e evolua em 1 mês o equivalente a 12 meses.')}
      ${benefit('award','Formação em Liderança','Ciclos de 4 meses para formar líderes de verdade, capazes de blindar o seu tempo e resolver problemas sozinhos.')}
      ${benefit('presentation','Treinamentos para a Equipe','12 treinamentos anuais ao vivo e online (mentalidade, vendas, liderança) para criar um time engajado, sem consumir sua agenda.')}

      <div class="lp-group-title">${icon('network')} Conexão e networking</div>
      ${benefit('users','2 Encontros Presenciais','Eventos imersivos com convidados especiais, conteúdo de altíssimo nível e troca de experiências.')}
      ${benefit('network','Networking de Empresários','Acesso exclusivo a um grupo forte de donos de negócios focados em crescimento mútuo.')}

      <div class="lp-group-title">${icon('gift')} Bônus inclusos</div>
      ${benefit('gift','12 meses de Yampa +Lucro','Acesso 100% gratuito por um ano à nossa poderosa ferramenta de Clareza e Inteligência Financeira.',true)}
      ${benefit('gift','6 Acessos ao 4talents Anual','Treine sua equipe em uma biblioteca com mais de 500 conteúdos de Marketing, Vendas, Gestão e muito mais.',true)}

      <div class="cta-wrap"><a class="btn btn-primary btn-lg" data-act="raise" role="button">${icon('rocket')} Quero acelerar meus resultados agora</a></div>
    </div>

    <div class="mission">
      <h3>A nossa missão é com o seu bolso</h3>
      <p>Queremos fazer a <span class="hl">SUA empresa de 2 a 10 vezes mais lucrativa</span> do que é hoje, em até 6 meses.</p>
      <p>Seu tempo é precioso e sua empresa não pode mais sangrar dinheiro por falta de direção. Dê o passo definitivo para parar de perder dinheiro e construir riqueza real.</p>
      <div class="cta-wrap"><a class="btn btn-wa btn-lg" data-act="raise" role="button">${icon('whats')} Quero falar com a equipe pelo WhatsApp</a></div>
    </div>
    ${declineBtn()}
  </div>`;
}
function benefit(ic,title,desc,bonus){
  return `<div class="benefit ${bonus?'bonus':''}"><div class="bi">${icon(ic)}</div>
    <div class="bt"><b>${title}</b><span>${desc}</span></div></div>`;
}

/* ---- Resultado / diagnóstico completo ---- */
function resultsView(){
  const r = calc(); const ins = insights(r);
  setTimeout(()=>drawCharts(r),30);
  const wa = CFG.WHATSAPP_URL || '#';
  const combo = CFG.COMBO_URL || '#';

  let header = '';
  if(S.resultMode==='handraise'){
    header = `<div class="thanks">${icon('check','')}
      <h3>Obrigado pelo seu interesse!</h3>
      <p>Recebemos sua solicitação e <b>nossa equipe vai entrar em contato em breve</b> para te ajudar a chegar no próximo nível. Enquanto isso, veja abaixo o seu diagnóstico completo.</p></div>`;
  } else if(S.resultMode==='declined'){
    header = `<div class="ai-box">
      <p>Sem problemas! Preparamos seu <b>diagnóstico completo</b> abaixo, com os pontos exatos onde sua empresa pode evoluir. Se mudar de ideia, é só falar com a gente.</p></div>`;
  }

  // Bloco de custos (ou aviso, caso o lead tenha pulado os números)
  let costBlock;
  if(S.noFinancials){
    costBlock = `<div class="ai-box center">
      <p>Você optou por <b>não informar seus números financeiros</b>, então não calculamos o valor em R$ do vazamento. Tudo bem! O diagnóstico de gestão abaixo continua 100% válido e mostra exatamente onde focar.</p></div>`;
  } else {
    costBlock = `
    <div class="grid2">
      <div class="cost-card">
        <div class="wm">${icon('trending')}</div>
        <div class="k yel">${icon('alert')} Custo da Ineficiência</div>
        <div class="big">${fmt(r.inefYearly)}</div>
        <div class="cap">Vazamento anual de lucro</div>
        <div class="sep"><div class="mo">${fmt(r.inefMonthly)}</div><div class="cap">Por mês em potencial perdido</div></div>
      </div>
      <div class="cost-card">
        <div class="wm">${icon('target')}</div>
        <div class="k grn">${icon('chart')} Custo de Oportunidade</div>
        <div class="big">${fmt(r.oppYearly)}</div>
        <div class="cap">Oportunidade anual de ganho</div>
        <div class="sep"><div class="mo">${fmt(r.oppMonthly)}</div><div class="cap">Por mês a mais na sua conta</div></div>
      </div>
    </div>
    <div class="center" style="padding:18px 0">
      <h2 class="title yel" style="color:var(--yellow)">${fmt(r.inefYearly)}</h2>
      <p class="sub" style="font-weight:700;color:#555;text-transform:uppercase;max-width:440px;margin:8px auto 0">
        Este é o valor que você perdeu nos últimos 12 meses por falhas na sua gestão ${icon('arrowUp')}</p>
    </div>`;
  }

  let footer = '';
  if(S.resultMode==='handraise' || S.resultMode==='declined'){
    footer = `<a class="btn btn-wa btn-lg" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp">${icon('whats')} Falar com a equipe pelo WhatsApp</a>`;
  } else {
    footer = `<div class="ai-box center" style="background:linear-gradient(135deg,#fff7e0,#ffffff);border-color:#f0c95a">
        <h3 class="italic-h" style="font-size:22px;color:var(--dark);margin:0 0 8px">Quer resolver os problemas da sua empresa?</h3>
        <p style="color:#5a4a10;font-weight:600">Temos algo perfeito para você: um combo de cursos com tudo que você precisa para sair da situação atual.</p>
        <a class="btn btn-yellow btn-lg" href="${combo}" target="_blank" rel="noopener" data-track="combo" style="max-width:340px;margin:6px auto 0">${icon('rocket')} Quero a solução</a>
      </div>`;
  }

  return `<div class="step stack">
    ${header}
    <div class="center">
      <div class="ok-circle">${icon('check')}</div>
      <h1 class="title">Seu diagnóstico está pronto</h1>
      <p class="sub" style="max-width:560px;margin:8px auto 0">Analisamos seus pilares de gestão e calculamos onde seu potencial está vazando.</p>
    </div>

    <div class="ai-box">
      <p>${ins.focusMsg}</p>
      <p>${ins.strongMsg}</p>
      <ul class="ai-list">
        ${ins.improveList.map(p=>`<li>${icon(p.icon)} <span><b>${p.name}:</b> ${p.text}.</span></li>`).join('')}
      </ul>
    </div>

    <h2 class="title center" style="font-size:clamp(20px,5.5vw,28px)">Você tem os resultados de uma empresa Máquina de Lucros?</h2>

    ${costBlock}

    <div class="card level-card">
      <div><span class="tag">Resultado da Avaliação</span>
        <h2 class="title" style="font-size:clamp(20px,5.5vw,28px);margin-top:6px">Qual o nível da gestão da sua empresa?</h2></div>
      <div class="level-img"><img src="${r.level.image}" alt="${r.level.name}" /></div>
      <div class="pill"><span class="lbl" style="margin:0">Nível</span>
        <span style="font-size:24px;font-weight:900;font-style:italic;color:var(--primary)">${r.level.level}</span>
        <span class="lbl" style="margin:0">de 4</span></div>
      <div><h3 class="italic-h" style="font-size:22px;color:${r.level.color};margin:0">${r.level.name}</h3>
        <p class="lbl" style="margin-top:4px">Sua nota geral: ${r.mgmtPct.toFixed(1)}%</p></div>
      <div class="lvl-bars">${[1,2,3,4].map(l=>`<div class="${l<=r.level.level?'on':''}"></div>`).join('')}</div>
    </div>

    <div class="card">
      <div class="center"><h2 class="title" style="font-size:clamp(18px,5vw,26px)">Os 3 resultados de uma Máquina de Lucros</h2>
        <p class="sub">Toda empresa de sucesso entrega três coisas. Veja, pela sua avaliação inicial, o quanto a sua entrega hoje em cada uma (nota de 0 a 10).</p></div>
      <div class="gauges" style="margin-top:18px">
        ${gaugeHTML('g1',S.answers['profit_crisis']||0,'Gera Lucro')}
        ${gaugeHTML('g2',S.answers['freedom']||0,'Gera Liberdade')}
        ${gaugeHTML('g3',S.answers['sales_growth']||0,'Cresce as Vendas')}
      </div>
    </div>

    <div class="card">
      <div class="center"><h2 class="title" style="font-size:clamp(18px,5vw,26px)">Está estruturada para ser uma Máquina de Lucros?</h2>
        <p class="sub">Sua maturidade atual em cada um dos 7 pilares fundamentais.</p></div>
      <div class="chart-box" style="height:340px;margin-top:16px"><canvas id="radar"></canvas></div>
    </div>

    <div class="card">
      <div class="center"><h2 class="title" style="font-size:clamp(18px,5vw,26px)">O básico do básico está sendo feito?</h2>
        <p class="sub">Análise do "cimento" do negócio (a 1ª pergunta de cada pilar).</p></div>
      <div class="chart-box" style="height:300px;margin-top:16px"><canvas id="bars"></canvas></div>
    </div>

    <div class="cta-wrap">${footer}</div>

    <div class="row-btns" style="padding-bottom:40px">
      <button class="btn btn-ghost" onclick="window.print()">${icon('download')} Salvar Relatório PDF</button>
      <button class="btn btn-ghost" data-act="reset">${icon('refresh')} Novo Diagnóstico</button>
    </div>
  </div>`;
}
function gaugeHTML(id,val,label){
  return `<div class="gauge"><div class="cv"><canvas id="${id}"></canvas><div class="val">${val}</div></div>
    <div class="gl">${label}</div></div>`;
}

/* =================== GRÁFICOS =================== */
let charts=[];
function destroyCharts(){ charts.forEach(c=>{try{c.destroy()}catch(e){}}); charts=[]; }
function gaugeColor(v){ const p=v*10; return p>=80?'#16a34a':(p>=50?'#0072CE':'#F6BF00'); }
function drawCharts(r){
  destroyCharts();
  if(typeof Chart==='undefined') return;
  [['g1','profit_crisis'],['g2','freedom'],['g3','sales_growth']].forEach(([id,key])=>{
    const el=document.getElementById(id); if(!el) return;
    const v=S.answers[key]||0;
    charts.push(new Chart(el,{type:'doughnut',data:{datasets:[{data:[v,10-v],
      backgroundColor:[gaugeColor(v),'#eef1f5'],borderWidth:0}]},
      options:{rotation:-90,circumference:180,cutout:'68%',plugins:{legend:{display:false},tooltip:{enabled:false}},
        responsive:true,maintainAspectRatio:false}}));
  });
  const rd=document.getElementById('radar');
  if(rd) charts.push(new Chart(rd,{type:'radar',data:{labels:r.pillarScores.map(p=>p.name),
    datasets:[
      {label:'Diagnóstico Atual',data:r.pillarScores.map(p=>p.score),borderColor:'#F6BF00',backgroundColor:'rgba(246,191,0,.35)',borderWidth:3,pointBackgroundColor:'#F6BF00'},
      {label:'Resultado Desejado',data:r.pillarScores.map(()=>100),borderColor:'#0072CE',backgroundColor:'rgba(0,114,206,.08)',borderWidth:2,borderDash:[4,4],pointRadius:0},
    ]},options:{responsive:true,maintainAspectRatio:false,
      scales:{r:{min:0,max:100,ticks:{display:false,stepSize:25},pointLabels:{font:{size:11,weight:'700'},color:'#555'},grid:{color:'#e9edf2'},angleLines:{color:'#e9edf2'}}},
      plugins:{legend:{position:'bottom',labels:{font:{size:11,weight:'700'},boxWidth:12}}}}}));
  const bs=document.getElementById('bars');
  if(bs) charts.push(new Chart(bs,{type:'bar',data:{labels:r.basicScores.map(p=>p.name),
    datasets:[{data:r.basicScores.map(p=>p.score),borderRadius:8,
      backgroundColor:r.basicScores.map(p=>p.score>=80?'#0072CE':'#F6BF00')}]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{y:{display:false,min:0,max:100},x:{grid:{display:false},ticks:{font:{size:10,weight:'700'},color:'#555'}}},
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.parsed.y.toFixed(0)+'%'}}}}}));
}

/* =================== CHROME (header/bottombar) =================== */
function renderChrome(){
  const dots=document.getElementById('dots');
  const show = S.step==='initial_eval'||S.step==='pillars'||S.step==='lead_capture';
  if(!show){ dots.innerHTML=''; }
  else {
    const total=PILLARS.length+3;
    const cur = S.step==='initial_eval'?1:(S.step==='pillars'?S.pillarIdx+2:(S.step==='lead_capture'?PILLARS.length+2:0));
    dots.innerHTML=[...Array(total)].map((_,i)=>`<span class="d ${i<cur?'done':(i===cur?'cur':'')}"></span>`).join('');
  }
  const bb=document.getElementById('botbar'), bv=document.getElementById('bot-vl'), bp=document.getElementById('bot-pct');
  if(!show){ bb.classList.add('hidden'); }
  else {
    bb.classList.remove('hidden');
    bv.textContent = S.step==='lead_capture'?'Finalizando':(S.step==='initial_eval'?'Avaliação':`${S.pillarIdx+1} de ${PILLARS.length}`);
    bp.classList.remove('hidden');
    const p = S.step==='pillars'?Math.round(((S.pillarIdx+1)/(PILLARS.length+1))*100):(S.step==='lead_capture'?95:10);
    bp.textContent = p+'%';
  }
}

/* =================== RENDER =================== */
function render(){
  if(S.step!=='results') destroyCharts();
  if(S.step==='intro') app.innerHTML=introView();
  else if(S.step==='setup') app.innerHTML=setupView();
  else if(S.step==='initial_eval'||S.step==='pillars') app.innerHTML=questionsView();
  else if(S.step==='lead_capture') app.innerHTML=leadView();
  else if(S.step==='handraise') app.innerHTML=handraiseView();
  else if(S.step==='solution') app.innerHTML=(S.solution==='ILU'?iluView():mdlView());
  else app.innerHTML=resultsView();
  renderChrome();
  bind();
}

/* =================== EVENTOS =================== */
function bind(){
  app.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>{
    const a=b.getAttribute('data-act');
    if(a==='next') next();
    else if(a==='back') back();
    else if(a==='reset') reset();
    else if(a==='start'){ toTop(); S.step='setup'; render(); }
    else if(a==='skip-setup'){ toTop(); S.noFinancials=true; S.revenue=0; S.profit=0; S.desiredRevenue=0; S.step='initial_eval'; render(); }
    else if(a==='see-solution'){ toTop(); S.step='solution'; render(); }
    else if(a==='raise') raiseHand();
    else if(a==='decline') declineSolution();
  }));
  app.querySelectorAll('[data-track]').forEach(b=>b.addEventListener('click',()=>{
    const t=b.getAttribute('data-track');
    if(t==='whatsapp') dl('clique_whatsapp',{modo:S.resultMode});
    if(t==='combo') dl('clique_combo',{});
  }));
  app.querySelectorAll('[data-info]').forEach(el=>el.addEventListener('click',(e)=>{ e.stopPropagation(); el.classList.toggle('open'); }));
  app.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{
    S.answers[b.getAttribute('data-q')]=parseInt(b.getAttribute('data-v'),10); render();
  }));
  app.querySelectorAll('[data-set]').forEach(el=>el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{
    const k=el.getAttribute('data-set'); S[k]=el.value;
    if(k==='businessType') render(); else { const btn=app.querySelector('[data-act="next"]'); if(btn) btn.disabled=!stepComplete(); }
  }));
  app.querySelectorAll('[data-lead]').forEach(el=>el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{
    S.lead[el.getAttribute('data-lead')]=el.value;
    const btn=app.querySelector('[data-act="next"]'); if(btn) btn.disabled=!stepComplete();
  }));
  app.querySelectorAll('[data-cur]').forEach(el=>el.addEventListener('input',()=>{
    const key=el.getAttribute('data-cur'); const allowNeg=el.getAttribute('data-neg')==='1';
    let v=el.value; const hasMinus=allowNeg&&v.trim().startsWith('-');
    const digits=v.replace(/\D/g,'');
    const num=(hasMinus?-1:1)*(digits===''?0:parseInt(digits,10));
    S[key]=num;
    el.value = digits===''?(hasMinus?'-':''):(hasMinus?'-':'')+numBR(num);
    el.classList.toggle('neg',num<0); el.parentElement.classList.toggle('neg',num<0);
    const btn=app.querySelector('[data-act="next"]'); if(btn) btn.disabled=!stepComplete();
  }));
}
// fecha tooltips ao tocar fora
document.addEventListener('click',function(e){
  if(e.target.closest && e.target.closest('[data-info]')) return;
  document.querySelectorAll('.info.open').forEach(function(el){ el.classList.remove('open'); });
});

/* =================== META PIXEL (opcional, além do GTM) =================== */
(function initPixel(){
  const id=(CFG.META_PIXEL_ID||'');
  if(!id || id.startsWith('COLE_AQUI')) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init',id); fbq('track','PageView');
})();

render();
