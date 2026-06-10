/* =====================================================================
   DIAGNÓSTICO MÁQUINA DE LUCROS — front-end (HTML/CSS/JS puro)
   ===================================================================== */
"use strict";

/* ---------- DADOS ---------- */
const BUSINESS_TYPES = [
  { id:'select', name:'Selecione seu segmento', idealMargin:0 },
  { id:'commerce', name:'Comércio em geral', idealMargin:0.15 },
  { id:'gastronomy', name:'Gastronomia (bar, restaurante, etc)', idealMargin:0.15 },
  { id:'commission_services', name:'Serviço com comissão (clínicas, salão, etc)', idealMargin:0.15 },
  { id:'general_services', name:'Serviços em geral', idealMargin:0.25 },
  { id:'industry', name:'Indústria em geral', idealMargin:0.10 },
  { id:'marketplace', name:'Marketplace (mercado livre, shopee, etc)', idealMargin:0.08 },
];

const INITIAL_EVAL_QUESTIONS = [
  { id:'profit_crisis', text:'Quão lucrativa é sua empresa, mesmo em tempos de crise?', label0:'Muito prejuízo e dívida', label10:'Superando meta ideal de lucro' },
  { id:'freedom', text:'O quanto você consegue se ausentar (ex.: tirar férias) e as coisas continuarem funcionando bem?', label0:'Nunca tirou férias; nada funciona sem o sócio', label10:'A empresa roda 100% independente do sócio' },
  { id:'sales_growth', text:'Quanto a sua empresa tem mantido um ritmo constante de aumento nas vendas nos últimos 2 anos?', label0:'Vendas caindo fortemente', label10:'Grande crescimento das vendas nos últimos ~2 anos' },
];

const PILLARS = [
  { id:'finance', name:'Finanças', questions:[
    { id:'fin_indicators', text:'Quão claros são indicadores essenciais como margem de contribuição, lucro operacional, resultado líquido?', isBasic:true },
    { id:'fin_pricing', text:'Quão preciso é o método que você usa para precificar seus produtos ou serviços?' },
    { id:'fin_reserve', text:'Quão próximo você está de atingir a margem de lucro e a reserva financeira que considera ideal para o seu negócio?' },
  ]},
  { id:'strategy', name:'Estratégia', questions:[
    { id:'strat_goals', text:'Quão claras e visuais são as metas de vendas e de lucro do negócio?', isBasic:true },
    { id:'strat_planning', text:'Quão bem estruturado é o Planejamento Estratégico da Empresa e o seu respectivo acompanhamento?' },
    { id:'strat_growth', text:'Quão claro é o Plano de crescimento e estruturação da empresa?' },
  ]},
  { id:'marketing', name:'Marketing', questions:[
    { id:'mkt_active', text:'Quão ativa é a estratégia de marketing, com ações claras, investimentos feitos para atrair potenciais clientes?', isBasic:true },
    { id:'mkt_crm', text:'Quão organizada e consistente é a comunicação e relacionamento com leads e clientes que já passaram por aí?' },
    { id:'mkt_volume', text:'Quanto o volume de potenciais clientes que chegam ao seu negócio é suficiente para bater suas metas de vendas?' },
  ]},
  { id:'sales', name:'Vendas', questions:[
    { id:'sal_process', text:'O quanto o processo de vendas tem etapas claras, com roteiros planejados focando em aumentar a taxa de conversão da venda?', isBasic:true },
    { id:'sal_training', text:'Com que frequência você realiza e atualiza treinamentos de vendas para sua equipe?' },
    { id:'sal_goals', text:'O quanto as metas de vendas estão sendo batidas?' },
  ]},
  { id:'processes', name:'Processos', questions:[
    { id:'pro_std', text:'Quão padronizados e documentados estão os processos essenciais que envolvem os clientes?', isBasic:true },
    { id:'pro_routine', text:'O quanto você consegue ter uma rotina organizada e tempo livre para olhar e pensar a estratégia do negócio?' },
    { id:'pro_autonomy', text:'O quão bem as atividades são realizadas sem a presença ou intervenção dos sócios?' },
  ]},
  { id:'people', name:'Pessoas', questions:[
    { id:'peo_culture', text:'Quão claro, formalizado e reforçado é o Código de Cultura para os colaboradores?', isBasic:true },
    { id:'peo_recruiting', text:'Quão bem estruturado é o processo de recrutamento e seleção de novos colaboradores?' },
    { id:'peo_trust', text:'O quanto você realmente confia na qualidade, produtividade e engajamento da sua equipe?' },
  ]},
  { id:'leadership', name:'Liderança', questions:[
    { id:'led_inspiration', text:'O quanto você acredita que consegue inspirar e engajar sua equipe para alcançar resultados?', isBasic:true },
    { id:'led_dev', text:'Com que frequência você dedica tempo para desenvolver suas habilidades de liderança?' },
    { id:'led_delegation', text:'Quão bem você consegue delegar responsabilidades mantendo a qualidade da entrega?' },
  ]},
];

const JOB_TITLES = ['Dono / Sócio','Gerente / Coordenador / Supervisor','Analista / Assistente','Estagiário / Estudante','Outro'];
const REVENUE_RANGES = ['Até 30mil/mês','30 a 60mil/mês','60 a 100mil/mês','100 a 300mil/mês','300 a 500mil/mês','Acima de 500mil/mês','Nada / Não tenho empresa'];

const LEVEL_IMAGES = {
  1:'assets/fazenda-problemas.png',
  2:'assets/pagadora-boletos.png',
  3:'assets/lab-dinheiro.png',
  4:'assets/maquina-lucros.png',
};

/* ---------- ESTADO ---------- */
const S = {
  step:'setup', pillarIdx:0, submitting:false,
  businessType:'select', revenue:0, profit:0, desiredRevenue:0,
  answers:{},
  lead:{ name:'', email:'', phone:'', jobTitle:'', revenueRange:'' },
};
const STEPS_ORDER = ['setup','initial_eval','pillars','lead_capture','results'];

const app = document.getElementById('app');
const fmt = v => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0);
const numBR = v => new Intl.NumberFormat('pt-BR').format(Math.abs(v||0));

/* ---------- CÁLCULOS ---------- */
function calc(){
  const type = BUSINESS_TYPES.find(t=>t.id===S.businessType);
  const idealMargin = type ? type.idealMargin : 0.15;

  const idealProfit = S.revenue * idealMargin;
  const inefMonthly = Math.max(0, idealProfit - S.profit);
  const desiredProfit = S.desiredRevenue * idealMargin;
  const oppMonthly = Math.max(0, desiredProfit - S.profit);

  const pillarScores = PILLARS.map(p=>{
    const arr = p.questions.map(q=>S.answers[q.id]||0);
    const avg = arr.reduce((a,b)=>a+b,0)/arr.length;
    return { name:p.name, score:avg*10 };
  });
  const basicScores = PILLARS.map(p=>{
    const b = p.questions.find(q=>q.isBasic);
    return { name:p.name, score:(b?(S.answers[b.id]||0):0)*10 };
  });
  const totalPillar = pillarScores.reduce((a,c)=>a+c.score,0);
  const mgmtPct = (totalPillar/(PILLARS.length*100))*100;

  let level = { level:1, name:'Fazenda de Problemas', color:'#ef4444' };
  if(mgmtPct>=88.889) level={level:4,name:'Máquina de Lucros',color:'#0072CE'};
  else if(mgmtPct>=72.223) level={level:3,name:'Laboratório de Dinheiro',color:'#004882'};
  else if(mgmtPct>=44.445) level={level:2,name:'Pagadora de Boletos',color:'#f59e0b'};
  level.image = LEVEL_IMAGES[level.level];

  return { idealMargin:idealMargin*100, idealProfit, desiredProfit,
    inefMonthly, inefYearly:inefMonthly*12, oppMonthly, oppYearly:oppMonthly*12,
    pillarScores, basicScores, mgmtPct, level };
}

/* ---------- ROTEAMENTO DE TAG/FLUXO (espelha o backend) ----------
   Regra inicial (ajustável depois):
   - Faturamento informado abaixo de 60k  -> tag "abaixo-60k"
   - Acima de 60k + gestão fraca (<50%)   -> tag "acima-60k-qualificado"
   - Acima de 60k + gestão boa (>=50%)    -> tag "acima-60k-avancado"
   O backend é a fonte da verdade; isto é só para exibição/telemetria. */
const BELOW_60K = ['Até 30mil/mês','30 a 60mil/mês','Nada / Não tenho empresa'];
function routeTag(r){
  if(BELOW_60K.includes(S.lead.revenueRange)) return 'diagnostico-abaixo-60k';
  return r.mgmtPct < 50 ? 'diagnostico-acima-60k-qualificado' : 'diagnostico-acima-60k-avancado';
}

/* ---------- VALIDAÇÃO ---------- */
function stepComplete(){
  if(S.step==='setup') return S.businessType!=='select' && S.revenue!==0 && S.desiredRevenue>100;
  if(S.step==='initial_eval') return INITIAL_EVAL_QUESTIONS.every(q=>S.answers[q.id]!==undefined);
  if(S.step==='pillars') return PILLARS[S.pillarIdx].questions.every(q=>S.answers[q.id]!==undefined);
  if(S.step==='lead_capture'){
    const l=S.lead;
    return l.name.trim().length>2 && l.email.includes('@') && l.phone.replace(/\D/g,'').length>=8 && l.jobTitle!=='' && l.revenueRange!=='';
  }
  return true;
}

/* ---------- NAVEGAÇÃO ---------- */
function next(){
  window.scrollTo({top:0,behavior:'smooth'});
  if(S.step==='setup') S.step='initial_eval';
  else if(S.step==='initial_eval') S.step='pillars';
  else if(S.step==='pillars'){
    if(S.pillarIdx<PILLARS.length-1) S.pillarIdx++;
    else S.step='lead_capture';
  } else if(S.step==='lead_capture'){
    submit(); return;
  }
  render();
}
function back(){
  window.scrollTo({top:0,behavior:'smooth'});
  if(S.step==='initial_eval') S.step='setup';
  else if(S.step==='pillars'){ if(S.pillarIdx>0) S.pillarIdx--; else S.step='initial_eval'; }
  else if(S.step==='lead_capture'){ S.step='pillars'; S.pillarIdx=PILLARS.length-1; }
  else if(S.step==='results') S.step='lead_capture';
  render();
}
function reset(){
  window.scrollTo({top:0,behavior:'smooth'});
  S.step='setup'; S.pillarIdx=0; S.answers={};
  render();
}

/* ---------- ENVIO ---------- */
async function submit(){
  S.submitting=true; render();
  const r = calc();
  const payload = {
    'Data/Hora': new Date().toLocaleString('pt-BR'),
    'Nome': S.lead.name, 'E-mail': S.lead.email, 'WhatsApp': S.lead.phone,
    'Cargo': S.lead.jobTitle, 'Faturamento Faixa': S.lead.revenueRange,
    'Segmento': (BUSINESS_TYPES.find(t=>t.id===S.businessType)||{}).name||'',
    'Faturamento Médio Mensal': S.revenue, 'Lucro Atual': S.profit, 'Faturamento Alvo': S.desiredRevenue,
    'Nível de Gestão': r.level.name, 'Score Geral': r.mgmtPct.toFixed(2)+'%',
    'Finanças': r.pillarScores[0].score.toFixed(1), 'Estratégia': r.pillarScores[1].score.toFixed(1),
    'Marketing': r.pillarScores[2].score.toFixed(1), 'Vendas': r.pillarScores[3].score.toFixed(1),
    'Processos': r.pillarScores[4].score.toFixed(1), 'Pessoas': r.pillarScores[5].score.toFixed(1),
    'Liderança': r.pillarScores[6].score.toFixed(1),
    'Tag': routeTag(r),
  };

  // Meta Pixel: evento de Lead
  if(window.fbq){
    try{ fbq('track','Lead',{content_name:'Diagnostico Maquina de Lucros', value:S.revenue, currency:'BRL'}); }catch(e){}
  }

  const url = (window.APP_CONFIG||{}).APPS_SCRIPT_URL || '';
  if(url && !url.startsWith('COLE_AQUI')){
    try{
      const ctrl = new AbortController();
      const to = setTimeout(()=>ctrl.abort(), (window.APP_CONFIG.SUBMIT_TIMEOUT_MS)||20000);
      await fetch(url, {
        method:'POST',
        // Apps Script Web App: usar text/plain evita preflight CORS
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(to);
    }catch(e){ console.warn('Falha/timeout no envio:', e); }
  } else {
    console.warn('APPS_SCRIPT_URL não configurada — dados não enviados.', payload);
  }

  S.submitting=false; S.step='results'; render();
}

/* ---------- COMPONENTES DE INPUT ---------- */
function currencyField(label, key, allowNeg, ph){
  const val = S[key];
  const neg = val<0;
  const display = val===0 ? '' : (neg?'-':'')+numBR(val);
  return `<div class="field"><label class="lbl">${label}</label>
    <div class="cur-wrap ${neg?'neg':''}"><span class="pfx">R$</span>
      <input inputmode="numeric" class="${neg?'neg':''}" data-cur="${key}" data-neg="${allowNeg?1:0}"
        value="${display}" placeholder="${ph||'0'}" /></div></div>`;
}

/* ---------- RENDER POR ETAPA ---------- */
function setupView(){
  return `<div class="step stack">
    <div class="center" style="text-align:left">
      <h1 class="title">Vamos começar o<br>seu diagnóstico</h1>
      <p class="lead">Insira os dados base da sua empresa para iniciarmos a análise de performance.</p>
    </div>
    <div class="card grid2">
      <div class="field"><label class="lbl">Tipo de Negócio</label>
        <select data-set="businessType">
          ${BUSINESS_TYPES.map(t=>`<option value="${t.id}" ${t.id==='select'?'disabled':''} ${S.businessType===t.id?'selected':''}>${t.name}</option>`).join('')}
        </select></div>
      ${currencyField('Faturamento Médio Mensal','revenue',false,'Ex: 50.000')}
      ${currencyField('Lucro Médio Mensal Atual','profit',true,'Ex: 5.000')}
      ${currencyField('Faturamento Desejado (Alvo)','desiredRevenue',false,'Ex: 100.000')}
    </div>
    <button class="btn btn-primary" data-act="next" ${stepComplete()?'':'disabled'}>Próximo Passo →</button>
  </div>`;
}

function questionsView(){
  const isInit = S.step==='initial_eval';
  const list = isInit ? INITIAL_EVAL_QUESTIONS : PILLARS[S.pillarIdx].questions;
  const tag = isInit ? 'Empresa Máquina de Lucros' : PILLARS[S.pillarIdx].name;
  const h2 = isInit ? 'Sua Performance Atual' : 'Pilar: '+PILLARS[S.pillarIdx].name;
  const lastPillar = S.step==='pillars' && S.pillarIdx===PILLARS.length-1;
  return `<div class="step stack">
    <div class="seg-head">
      <button class="iconbtn" data-act="back">←</button>
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
    <button class="btn btn-primary" data-act="next" ${stepComplete()?'':'disabled'}>${lastPillar?'Ver Resultados':'Continuar'} →</button>
  </div>`;
}

function leadView(){
  const l=S.lead;
  return `<div class="step stack">
    <div class="seg-head">
      <button class="iconbtn" data-act="back">←</button>
      <span class="ln"></span><span class="tag">Finalizando</span><span class="ln"></span>
    </div>
    <div class="center"><h2 class="title">Quase lá!</h2>
      <p class="sub">Para podermos te entregar o resultado final, preencha abaixo:</p></div>
    <div class="card" style="max-width:460px;margin:0 auto;width:100%">
      <div class="field"><label class="lbl">Qual seu nome</label>
        <input data-lead="name" value="${l.name}" placeholder="João Silva" /></div>
      <div class="field"><label class="lbl">Qual seu melhor e-mail?</label>
        <input type="email" inputmode="email" data-lead="email" value="${l.email}" placeholder="exemplo@4blue.com.br" /></div>
      <div class="field"><label class="lbl">Qual seu Whatsapp com DDD?</label>
        <input type="tel" inputmode="tel" data-lead="phone" value="${l.phone}" placeholder="(11) 99999-9999" /></div>
      <div class="field"><label class="lbl">Qual seu cargo?</label>
        <select data-lead="jobTitle"><option value="" ${l.jobTitle===''?'selected':''} disabled>Selecione:</option>
          ${JOB_TITLES.map(t=>`<option ${l.jobTitle===t?'selected':''}>${t}</option>`).join('')}</select></div>
      <div class="field" style="margin-bottom:0"><label class="lbl">Qual o faturamento do seu negócio?</label>
        <select data-lead="revenueRange"><option value="" ${l.revenueRange===''?'selected':''} disabled>Selecione:</option>
          ${REVENUE_RANGES.map(t=>`<option ${l.revenueRange===t?'selected':''}>${t}</option>`).join('')}</select></div>
    </div>
    <button class="btn btn-primary" data-act="next" ${stepComplete()&&!S.submitting?'':'disabled'}>
      ${S.submitting?'<span class="spin"></span> Gerando Diagnóstico...':'Gerar Meu Diagnóstico →'}</button>
  </div>`;
}

function resultsView(){
  const r = calc();
  setTimeout(()=>drawCharts(r),30);
  return `<div class="step stack">
    <div class="center">
      <div class="ok-circle">✓</div>
      <h1 class="title">Seu diagnóstico está pronto</h1>
      <p class="sub" style="max-width:560px;margin:8px auto 0">Analisamos seus pilares de gestão e calculamos onde seu potencial está vazando.</p>
    </div>

    <h2 class="title center" style="font-size:clamp(20px,5.5vw,28px)">Você tem os resultados de uma empresa Máquina de Lucros?</h2>

    <div class="grid2">
      <div class="cost-card">
        <div class="k yel">⚠ Custo da Ineficiência</div>
        <div class="big">${fmt(r.inefYearly)}</div>
        <div class="cap">Vazamento anual de lucro</div>
        <div class="sep"><div class="mo">${fmt(r.inefMonthly)}</div><div class="cap">Por mês em potencial perdido</div></div>
      </div>
      <div class="cost-card">
        <div class="k grn">▰ Custo de Oportunidade</div>
        <div class="big">${fmt(r.oppYearly)}</div>
        <div class="cap">Oportunidade anual de ganho</div>
        <div class="sep"><div class="mo">${fmt(r.oppMonthly)}</div><div class="cap">Por mês a mais na sua conta</div></div>
      </div>
    </div>

    <div class="center" style="padding:18px 0">
      <h2 class="title yel" style="color:var(--yellow)">${fmt(r.inefYearly)}</h2>
      <p class="sub" style="font-weight:700;color:#555;text-transform:uppercase;max-width:440px;margin:8px auto 0">
        Este é o valor que você perdeu nos últimos 12 meses por falhas na sua gestão 👆</p>
    </div>

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
      <div class="gauges">
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

    <div class="row-btns mt24" style="padding-bottom:40px">
      <button class="btn btn-primary" onclick="window.print()">⤓ Salvar Relatório PDF</button>
      <button class="btn btn-ghost" data-act="reset">↻ Novo Diagnóstico</button>
    </div>
  </div>`;
}

function gaugeHTML(id,val,label){
  return `<div class="gauge"><div class="cv"><canvas id="${id}"></canvas><div class="val">${val}</div></div>
    <div class="gl">${label}</div></div>`;
}

/* ---------- GRÁFICOS (Chart.js) ---------- */
let charts=[];
function destroyCharts(){ charts.forEach(c=>{try{c.destroy()}catch(e){}}); charts=[]; }
function gaugeColor(v){ const p=v*10; return p>=80?'#16a34a':(p>=50?'#0072CE':'#F6BF00'); }
function drawCharts(r){
  destroyCharts();
  if(typeof Chart==='undefined') return;
  // gauges
  [['g1','profit_crisis'],['g2','freedom'],['g3','sales_growth']].forEach(([id,key])=>{
    const el=document.getElementById(id); if(!el) return;
    const v=S.answers[key]||0;
    charts.push(new Chart(el,{type:'doughnut',data:{datasets:[{data:[v,10-v],
      backgroundColor:[gaugeColor(v),'#eef1f5'],borderWidth:0}]},
      options:{rotation:-90,circumference:180,cutout:'68%',plugins:{legend:{display:false},tooltip:{enabled:false}},
        responsive:true,maintainAspectRatio:false}}));
  });
  // radar
  const rd=document.getElementById('radar');
  if(rd) charts.push(new Chart(rd,{type:'radar',data:{labels:r.pillarScores.map(p=>p.name),
    datasets:[
      {label:'Diagnóstico Atual',data:r.pillarScores.map(p=>p.score),borderColor:'#F6BF00',backgroundColor:'rgba(246,191,0,.35)',borderWidth:3,pointBackgroundColor:'#F6BF00'},
      {label:'Resultado Desejado',data:r.pillarScores.map(()=>100),borderColor:'#0072CE',backgroundColor:'rgba(0,114,206,.08)',borderWidth:2,borderDash:[4,4],pointRadius:0},
    ]},options:{responsive:true,maintainAspectRatio:false,
      scales:{r:{min:0,max:100,ticks:{display:false,stepSize:25},pointLabels:{font:{size:11,weight:'700'},color:'#555'},grid:{color:'#e9edf2'},angleLines:{color:'#e9edf2'}}},
      plugins:{legend:{position:'bottom',labels:{font:{size:11,weight:'700'},boxWidth:12}}}}}));
  // bars
  const bs=document.getElementById('bars');
  if(bs) charts.push(new Chart(bs,{type:'bar',data:{labels:r.basicScores.map(p=>p.name),
    datasets:[{data:r.basicScores.map(p=>p.score),borderRadius:8,
      backgroundColor:r.basicScores.map(p=>p.score>=80?'#0072CE':'#F6BF00')}]},
    options:{responsive:true,maintainAspectRatio:false,
      scales:{y:{display:false,min:0,max:100},x:{grid:{display:false},ticks:{font:{size:10,weight:'700'},color:'#555'}}},
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.parsed.y.toFixed(0)+'%'}}}}}));
}

/* ---------- HEADER / BOTTOM BAR ---------- */
function renderChrome(){
  const dots=document.getElementById('dots');
  const show = S.step!=='setup' && S.step!=='results';
  if(!show){ dots.innerHTML=''; }
  else {
    const total=PILLARS.length+3;
    const cur = S.step==='initial_eval'?1:(S.step==='pillars'?S.pillarIdx+2:(S.step==='lead_capture'?PILLARS.length+2:0));
    dots.innerHTML=[...Array(total)].map((_,i)=>`<span class="d ${i<cur?'done':(i===cur?'cur':'')}"></span>`).join('');
  }
  const bb=document.getElementById('botbar'), bv=document.getElementById('bot-vl'), bp=document.getElementById('bot-pct');
  if(S.step==='setup'||S.step==='results'){ bb.classList.add('hidden'); }
  else {
    bb.classList.remove('hidden');
    bv.textContent = S.step==='lead_capture'?'Finalizando':`${S.pillarIdx+1} de ${PILLARS.length}`;
    bp.classList.remove('hidden');
    bp.textContent = Math.round(((S.pillarIdx+1)/(PILLARS.length+1))*100)+'%';
  }
}

/* ---------- RENDER ---------- */
function render(){
  if(S.step!=='results') destroyCharts();
  if(S.step==='setup') app.innerHTML=setupView();
  else if(S.step==='initial_eval'||S.step==='pillars') app.innerHTML=questionsView();
  else if(S.step==='lead_capture') app.innerHTML=leadView();
  else app.innerHTML=resultsView();
  renderChrome();
  bind();
}

/* ---------- EVENTOS ---------- */
function bind(){
  app.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>{
    const a=b.getAttribute('data-act');
    if(a==='next') next(); else if(a==='back') back(); else if(a==='reset') reset();
  }));
  app.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{
    S.answers[b.getAttribute('data-q')]=parseInt(b.getAttribute('data-v'),10); render();
  }));
  app.querySelectorAll('[data-set]').forEach(el=>el.addEventListener('change',()=>{ S[el.getAttribute('data-set')]=el.value; render(); }));
  app.querySelectorAll('[data-lead]').forEach(el=>el.addEventListener('input',()=>{
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

/* ---------- META PIXEL ---------- */
(function initPixel(){
  const id=(window.APP_CONFIG||{}).META_PIXEL_ID||'';
  if(!id || id.startsWith('COLE_AQUI')) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init',id); fbq('track','PageView');
})();

render();
