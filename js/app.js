
// FWR V21 ULTIMATE - FR EN BE + Gosset_25 + Dynamisme + Nav unique
const standingsUrl = 'data/standings.json';
const gpsUrl = 'data/gps.json';
let standings = [];
let gps = [];
let selectedDrivers = [];
let activeTab = 'classement';
let currentLang = 'fr';
let chartMain = null;
let chartMini = null;
let i18n = {};

async function loadData(){
  const [sRes,gRes] = await Promise.all([fetch(standingsUrl),fetch(gpsUrl)]);
  const sJson = await sRes.json();
  const gJson = await gRes.json();
  standings = sJson.classement_general || [];
  standings = standings.map(d=>{ if(d.pilote==='Goret_25') d.pilote='Gosset_25'; return d; });
  gps = gJson.calendrier || [];
  i18n = sJson.i18n || {};
  selectedDrivers = standings.map(s=>s.pilote);
  renderAll();
  initDynamism();
}
function t(key){
  const langData = i18n[currentLang] || i18n['fr'] || {};
  return langData[key] || key;
}
function renderAll(){ renderClassement(); renderChronos(); renderGPs(); renderPills(); updateCharts(); showTab(activeTab); updateLangButtons(); }
function updateLangButtons(){
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang===currentLang);
  });
  // Update texts with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
}
function switchLang(lang){
  currentLang = lang;
  renderAll();
}
function renderClassement(){
  const tbody = document.getElementById('tbody-classement');
  if(!tbody) return;
  tbody.innerHTML = standings.map((s,i)=>{
    const medal = s.pos===1?'🥇':s.pos===2?'🥈':s.pos===3?'🥉':s.pos;
    const bg = i%2===0?'background:#0A0A0F':'background:#111117';
    const leader = s.pos===1?`<span class="badge-leader">👑 LEADER</span>`:'';
    const color = s.color||'#E10600';
    const label = typeof s.label==='object'? (s.label[currentLang]||s.label['fr']) : s.label;
    return `<tr style="${bg};border-left:4px solid ${color}"><td><b>${medal} ${s.pos}</b></td><td><b>${s.pilote}</b> ${leader}</td><td><span style="padding:2px 8px;border-radius:999px;font-size:10px;background:${color}20;color:${color};border:1px solid ${color}40">${s.ecurie}</span></td><td style="text-align:center;font-weight:700;font-size:18px">${s.pts}</td><td style="text-align:center;color:#FFD700">${s.victoires||''}</td><td style="color:${s.formeColor||'#8B8B8B'}"><b>${s.forme||''}</b> <span style="font-size:10px;margin-left:4px">${label||''}</span></td></tr>`;
  }).join('');
}
function renderChronos(){
  const list = document.getElementById('chronos-list');
  if(!list) return;
  fetch(standingsUrl).then(r=>r.json()).then(j=>{
    const races = j.gp_disputes||[];
    list.innerHTML = races.map(r=>{
      if(!r.resultats_fwr||r.resultats_fwr.length===0){
        return `<div class="poster-card"><div style="display:flex;justify-content:space-between"><div><div style="font-size:11px;color:#8B8B8B">${r.date} • ${r.heure} • ${r.distance}</div><div class="titillium" style="font-weight:700;font-size:18px">${r.gp} - ${r.circuit}</div></div><span style="font-size:11px;background:#1F1F2A;padding:4px 8px;border-radius:6px">${currentLang==='be'?'En attente une fois':(currentLang==='en'?'Pending':'En attente résultats')}</span></div></div>`;
      }
      const rows = r.resultats_fwr.map(res=>{
        let pilote = res.pilote==='Goret_25'?'Gosset_25':res.pilote;
        return `<tr><td>${pilote}</td><td style="color:#8B8B8B">${res.ecurie||''}</td><td>${res.grille||''}</td><td>${res.arrets||''}</td><td style="${(res.mt||'').includes('RECORD')||(res.mt||'').includes('MEILLEUR')?'color:#8B5CF6;font-weight:700':''}">${res.mt||''}</td><td>${res.temps||''}</td><td style="font-weight:700">${res.pts||''}</td></tr>`;
      }).join('');
      return `<div class="poster-card"><div style="display:flex;justify-content:space-between;margin-bottom:12px"><div><div style="font-size:11px;color:#8B8B8B">${r.date} • ${r.heure} • ${r.distance}</div><div class="titillium" style="font-weight:700;font-size:18px">${r.gp} - ${r.circuit}</div></div><div style="font-size:11px;color:#8B8B8B">Affiche officielle Team FWR</div></div><div style="overflow:auto"><table><thead><tr><th>${t('pilote')}</th><th>${t('ecurie')}</th><th>${t('grille')}</th><th>${t('arrets')}</th><th>${t('meilleur_tour')}</th><th>${t('temps_ecart')}</th><th>${t('pts')}</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
    }).join('');
  });
}
function renderGPs(){
  const grid = document.getElementById('grid-gp');
  if(!grid) return;
  grid.innerHTML = gps.map(r=>`<div class="poster-card" onclick="openModal('${r.gp}')"><div style="font-size:11px;color:#8B8B8B">${r.date} • ${r.heure}</div><div class="titillium" style="font-weight:700;font-size:18px;margin-top:4px">${r.flag||''} ${r.gp}</div><div style="font-size:11px;color:#8B8B8B;margin-top:4px">${r.circuit||''}</div><div style="font-size:12px;color:#CCCCCC;margin-top:12px">${r.vainqueur||'En attente'}</div><div style="margin-top:8px;font-size:10px;color:#8B8B8B">${r.affiche||''}</div></div>`).join('');
}
function renderPills(){
  const pills = document.getElementById('pills');
  if(!pills) return;
  pills.innerHTML = standings.map(s=>{
    const active = selectedDrivers.includes(s.pilote);
    return `<button class="pill ${active?'active':''}" onclick="toggleDriver('${s.pilote}')">${s.pilote}</button>`;
  }).join('');
}
function toggleDriver(name){
  if(selectedDrivers.includes(name)){
    if(selectedDrivers.length>1) selectedDrivers = selectedDrivers.filter(n=>n!==name);
  }else{
    if(selectedDrivers.length<10) selectedDrivers.push(name);
  }
  renderPills(); updateCharts();
}
function updateCharts(){
  const labels = ['Mel','Sha','Suz','Bah','Jed','Mia','Imo','Mon','Bar'];
  const datasets = standings.filter(s=>selectedDrivers.includes(s.pilote)).map(s=>({label:s.pilote,data:s.trend||[0,[STRIPPED]
  const datasetsMini = standings.slice(0,5).map(s=>({label:s.pilote,data:s.trend||[0,[STRIPPED]
  const ctxMain = document.getElementById('chart-main');
  const ctxMini = document.getElementById('chart-mini');
  if(chartMain) chartMain.destroy();
  if(chartMini) chartMini.destroy();
  if(ctxMain){
    chartMain = new Chart(ctxMain,{type:'line',data:{labels,[STRIPPED]
  }
  if(ctxMini){
    chartMini = new Chart(ctxMini,{type:'line',data:{labels,[STRIPPED]
  }
}
function showTab(name){
  activeTab=name;
  document.getElementById('view-classement')?.classList.toggle('hidden',name!=='classement');
  document.getElementById('view-tableaux')?.classList.toggle('hidden',name!=='tableaux');
  document.getElementById('view-evolution')?.classList.toggle('hidden',name!=='evolution');
  document.getElementById('view-affiches')?.classList.toggle('hidden',name!=='affiches');
  document.querySelectorAll('.nav-unique button').forEach(b=>b.classList.remove('active'));
  const btn = document.getElementById('nav-'+name);
  if(btn) btn.classList.add('active');
  if(name==='evolution' && chartMain){setTimeout(()=>chartMain.resize(),100);}
}
function openModal(gpName){
  fetch(standingsUrl).then(r=>r.json()).then(j=>{
    const race = (j.gp_disputes||[]).find(r=>r.gp===gpName);
    if(!race) return;
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    if(!race.resultats_fwr || race.resultats_fwr.length===0){
      content.innerHTML = `<h2 class="titillium" style="font-size:24px;font-weight:700">${race.gp} - ${race.circuit}</h2><p style="color:#8B8B8B;margin-top:8px">${race.date} • ${race.heure} • ${race.distance}</p><p style="margin-top:24px">${currentLang==='be'?'En attente résultats une fois - Ça va ou quoi?':(currentLang==='en'?'Pending results':'En attente résultats')}</p>`;
    }else{
      const rows = race.resultats_fwr.map(res=>{
        let pilote = res.pilote==='Goret_25'?'Gosset_25':res.pilote;
        return `<tr><td>${pilote}</td><td>${res.ecurie||''}</td><td>${res.grille||''}</td><td>${res.arrets||''}</td><td style="${(res.mt||'').includes('RECORD')||(res.mt||'').includes('MEILLEUR')?'color:#8B5CF6;font-weight:700':''}">${res.mt||''}</td><td>${res.temps||''}</td><td style="font-weight:700">${res.pts||''}</td></tr>`;
      }).join('');
      content.innerHTML = `<h2 class="titillium" style="font-size:24px;font-weight:700">${race.gp} - ${race.circuit}</h2><p style="color:#8B8B8B;margin-top:8px">${race.date} • ${race.heure} • ${race.distance} • Vainqueur: ${race.vainqueur} ${race.temps}</p><div style="margin-top:16px;overflow:auto"><table><thead><tr><th>${t('pilote')}</th><th>${t('ecurie')}</th><th>${t('grille')}</th><th>${t('arrets')}</th><th>${t('meilleur_tour')}</th><th>${t('temps_ecart')}</th><th>${t('pts')}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    modal.style.display='flex';
  });
}
function closeModal(){document.getElementById('modal').style.display='none';}
function initDynamism(){
  // Speed lines
  const container = document.querySelector('.speed-lines');
  if(!container) return;
  for(let i=0;i<6;i++){
    const line = document.createElement('div');
    line.className='speed-line';
    line.style.top = (10 + i*15) + '%';
    line.style.width = (100 + Math.random()*200) + 'px';
    line.style.animationDelay = (i*0.5) + 's';
    line.style.animationDuration = (2 + Math.random()*2) + 's';
    container.appendChild(line);
  }
  // Particles
  const particles = document.querySelector('.particles');
  if(!particles) return;
  for(let i=0;i<12;i++){
    const p = document.createElement('div');
    p.className='particle';
    p.style.left = Math.random()*100 + '%';
    p.style.top = Math.random()*100 + '%';
    p.style.animationDelay = Math.random()*5 + 's';
    p.style.animationDuration = (4 + Math.random()*4) + 's';
    particles.appendChild(p);
  }
}
document.addEventListener('DOMContentLoaded', loadData);
