// FWR V20.1 FINAL - V8 ADN + Gosset_25 fix + bandeau Twitch + logo géant + badge leader + courbes tous pilotes + affiches + tableaux
const standingsDataUrl = 'data/standings.json';
const gpsDataUrl = 'data/gps.json';
let standings = [];
let gps = [];
let selectedDrivers = [];
let activeTab = 'classement';
let chartMain = null;
let chartMini = null;

async function loadData(){
  const [sRes, gRes] = await Promise.all([fetch(standingsDataUrl), fetch(gpsDataUrl)]);
  const sJson = await sRes.json();
  const gJson = await gRes.json();
  standings = sJson.classement_general || [];
  standings = standings.map(d => { if(d.pilote==='Goret_25') d.pilote='Gosset_25'; return d; });
  gps = gJson.calendrier || [];
  selectedDrivers = standings.map(s=>s.pilote);
  renderAll();
}
function renderAll(){ renderClassement(); renderChronosList(); renderGPs(); renderPills(); updateCharts(); showTab(activeTab); }
function renderClassement(){
  const tbody = document.getElementById('tbody-classement');
  if(!tbody) return;
  tbody.innerHTML = standings.map((s,i)=>{
    const medal = s.pos===1?'🥇':s.pos===2?'🥈':s.pos===3?'🥉':s.pos;
    const bg = i%2===0?'background:#0A0A0F':'background:#111117';
    const leaderBadge = s.pos===1?`<span class="badge-leader" style="margin-left:8px">👑 LEADER</span>`:'';
    const color = s.color || '#E10600';
    return `<tr style="${bg};border-left:4px solid ${color}"><td style="font-weight:700">${medal} ${s.pos}</td><td style="font-weight:600">${s.pilote} ${leaderBadge}</td><td><span style="padding:2px 8px;border-radius:999px;font-size:10px;background:${color}20;color:${color};border:1px solid ${color}40">${s.ecurie}</span></td><td style="text-align:center;font-weight:700;font-size:18px">${s.pts}</td><td style="text-align:center;color:#FFD700">${s.victoires||''}</td><td style="color:${s.formeColor||'#8B8B8B'}"><span style="font-weight:700">${s.forme||''}</span> <span style="font-size:10px;margin-left:4px">${s.label||''}</span></td></tr>`;
  }).join('');
}
function renderChronosList(){
  const list = document.getElementById('chronos-list');
  if(!list) return;
  fetch(standingsDataUrl).then(r=>r.json()).then(j=>{
    const gpsDetailed = j.gp_disputes || [];
    if(!gpsDetailed.length){ list.innerHTML = gps.map(r=>`<div class="poster-card"><div style="font-size:11px;color:#8B8B8B">${r.date} • ${r.heure}</div><div class="titillium" style="font-weight:700;font-size:18px;margin-top:4px">${r.gp}</div></div>`).join(''); return; }
    list.innerHTML = gpsDetailed.map(r=>{
      if(!r.resultats_fwr || r.resultats_fwr.length===0){
        return `<div class="poster-card"><div style="display:flex;justify-content:space-between"><div><div style="font-size:11px;color:#8B8B8B">${r.date} • ${r.heure} • ${r.distance}</div><div class="titillium" style="font-weight:700;font-size:18px">${r.gp} - ${r.circuit}</div></div><span style="font-size:11px;background:#1F1F2A;padding:4px 8px;border-radius:4px">En attente</span></div></div>`;
      }
      const rows = r.resultats_fwr.map(res=>{
        let pilote = res.pilote==='Goret_25'?'Gosset_25':res.pilote;
        return `<tr><td>${pilote}</td><td style="color:#8B8B8B">${res.ecurie||''}</td><td>${res.grille||''}</td><td>${res.arrets||''}</td><td style="${(res.mt||'').includes('RECORD')||(res.mt||'').includes('MEILLEUR')?'color:#8B5CF6;font-weight:700':''}">${res.mt||''}</td><td>${res.temps||''}</td><td style="font-weight:700">${res.pts||''}</td></tr>`;
      }).join('');
      return `<div class="poster-card"><div style="display:flex;justify-content:space-between;margin-bottom:12px"><div><div style="font-size:11px;color:#8B8B8B">${r.date} • ${r.heure} • ${r.distance}</div><div class="titillium" style="font-weight:700;font-size:18px">${r.gp} - ${r.circuit}</div></div><div style="font-size:11px;color:#8B8B8B">Affiche officielle Team FWR</div></div><div style="overflow:auto"><table><thead><tr><th>PILOTE</th><th>ÉCURIE</th><th>GRILLE</th><th>ARRÊTS</th><th>MEILLEUR TOUR</th><th>TEMPS / ÉCART</th><th>PTS</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
    }).join('');
  });
}
function renderGPs(){
  const grid = document.getElementById('grid-gp');
  if(!grid) return;
  grid.innerHTML = gps.map(r=>`<div class="poster-card" onclick="openModal('${r.gp}')"><div style="font-size:11px;color:#8B8B8B">${r.date} • ${r.heure}</div><div class="titillium" style="font-weight:700;font-size:18px;margin-top:4px">${r.flag||''} ${r.gp}</div><div style="font-size:11px;color:#8B8B8B;margin-top:4px">${r.circuit||''}</div><div style="font-size:12px;color:#CCCCCC;margin-top:12px">${r.vainqueur||'En attente'}</div><div style="margin-top:8px;font-size:10px;color:#8B8B8B">Affiche: ${r.affiche||''}</div></div>`).join('');
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
  const datasets = standings.filter(s=>selectedDrivers.includes(s.pilote)).map(s=>({label:s.pilote,data:s.trend||[0,0,0,0,0,0,0,0,0],borderColor:s.color||'#E10600',backgroundColor:(s.color||'#E10600')+'20',borderWidth:3,tension:0.35,pointRadius:0,pointHoverRadius:6}));
  const datasetsMini = standings.slice(0,5).map(s=>({label:s.pilote,data:s.trend||[0,0,0,0,0,0,0,0,0],borderColor:s.color||'#E10600',borderWidth:2,tension:0.35,pointRadius:0}));
  const ctxMain = document.getElementById('chart-main');
  const ctxMini = document.getElementById('chart-mini');
  if(chartMain) chartMain.destroy();
  if(chartMini) chartMini.destroy();
  if(ctxMain){
    chartMain = new Chart(ctxMain,{type:'line',data:{labels,datasets},options:{responsive:true,plugins:{legend:{labels:{color:'#8B8B8B',boxWidth:12}},tooltip:{backgroundColor:'#111117',titleColor:'#FFF',bodyColor:'#CCCCCC',borderColor:'#2A2A35',borderWidth:1}},scales:{x:{grid:{color:'#1F1F2A'},ticks:{color:'#8B8B8B'}},y:{grid:{color:'#1F1F2A'},ticks:{color:'#8B8B8B'},min:0,max:130}}}});
  }
  if(ctxMini){
    chartMini = new Chart(ctxMini,{type:'line',data:{labels,datasets:datasetsMini},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:'#555',font:{size:10}}},y:{grid:{color:'#1F1F2A'},ticks:{color:'#555',font:{size:10}},min:0,max:130}}}});
  }
}
function showTab(name){
  activeTab=name;
  document.getElementById('view-classement')?.classList.toggle('hidden',name!=='classement');
  document.getElementById('view-evolution')?.classList.toggle('hidden',name!=='evolution');
  document.getElementById('view-calendrier')?.classList.toggle('hidden',name!=='calendrier');
  document.querySelectorAll('.nav-top button').forEach(el=>{el.classList.remove('active');});
  const btn = document.getElementById('tab-'+name);
  if(btn) btn.classList.add('active');
  const btn2 = document.getElementById('tab2-'+name);
  if(btn2) btn2.classList.add('active');
  if(name==='evolution' && chartMain){setTimeout(()=>chartMain.resize(),100);}
}
function openModal(gpName){
  fetch(standingsDataUrl).then(r=>r.json()).then(j=>{
    const race = (j.gp_disputes||[]).find(r=>r.gp===gpName);
    if(!race) return;
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    if(!race.resultats_fwr || race.resultats_fwr.length===0){
      content.innerHTML = `<h2 class="titillium" style="font-size:24px;font-weight:700">${race.gp} - ${race.circuit}</h2><p style="color:#8B8B8B;margin-top:8px">${race.date} • ${race.heure} • ${race.distance}</p><p style="margin-top:24px">En attente résultats</p>`;
    }else{
      const rows = race.resultats_fwr.map(res=>{
        let pilote = res.pilote==='Goret_25'?'Gosset_25':res.pilote;
        return `<tr><td>${pilote}</td><td>${res.ecurie||''}</td><td>${res.grille||''}</td><td>${res.arrets||''}</td><td style="${(res.mt||'').includes('RECORD')||(res.mt||'').includes('MEILLEUR')?'color:#8B5CF6;font-weight:700':''}">${res.mt||''}</td><td>${res.temps||''}</td><td style="font-weight:700">${res.pts||''}</td></tr>`;
      }).join('');
      content.innerHTML = `<h2 class="titillium" style="font-size:24px;font-weight:700">${race.gp} - ${race.circuit}</h2><p style="color:#8B8B8B;margin-top:8px">${race.date} • ${race.heure} • ${race.distance} • Vainqueur: ${race.vainqueur} ${race.temps}</p><div style="margin-top:16px;overflow:auto"><table><thead><tr><th>PILOTE</th><th>ÉCURIE</th><th>GRILLE</th><th>ARRÊTS</th><th>MEILLEUR TOUR</th><th>TEMPS / ÉCART</th><th>PTS</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    modal.style.display='flex';
  });
}
function closeModal(){document.getElementById('modal').style.display='none';}
document.addEventListener('DOMContentLoaded', loadData);
