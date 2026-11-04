let currentSeason = 's1';
let gpsData = [];
let standingsData = [];
let gpDisputes = [];
let selectedDrivers = [];
let chartMain = null, chartMini = null;
// Normalisation des chemins vers les dossiers de saison
function fixPosterPath(path, season) {
  if (!path) return '';
  const folder = season === 's1' ? 'assets/posters saison 1/' : 'assets/posters saison 2/';
  const fileName = path.split('/').pop();
  return folder + fileName;
}
// Chargement à partir des fichiers JSON de la saison sélectionnée
async function loadSeasonData(season) {
  currentSeason = season;
  const folder = season === 's1' ? 'Saison 1' : 'Saison 2';
  try {
    const [resGps, resStandings] = await Promise.all([
      fetch(`data/${folder}/gps.json`),
      fetch(`data/${folder}/standings.json`)
    ]);
    if (!resGps.ok || !resStandings.ok) {
      throw new Error("Erreur de chargement des fichiers JSON");
    }
    const gJson = await resGps.json();
    const sJson = await resStandings.json();
    gpsData = (gJson.calendrier || []).map(item => ({
      ...item,
      affiche: fixPosterPath(item.affiche, season)
    }));
    standingsData = sJson.classement_general || [];
    gpDisputes = (sJson.gp_disputes || []).map(item => ({
      ...item,
      affiche: fixPosterPath(item.affiche, season)
    }));
    document.getElementById('header-subtitle').textContent = sJson.derniere_maj || `${gpsData.length} GP au programme`;
    document.getElementById('sub-classement').textContent = sJson.derniere_maj || '';
    document.getElementById('title-classement').textContent = `Classement Général - ${sJson.saison || season.toUpperCase()}`;
  } catch (err) {
    console.error("Impossible de charger les fichiers JSON:", err);
  }
  selectedDrivers = standingsData.slice(0, 8).map(s => s.pilote);
  updateUI();
}
function updateUI() {
  const isS1 = currentSeason === 's1';
  document.getElementById('season-badge').textContent = isS1 ? 'SAISON 1 🟢' : 'SAISON 2 ⏳';
  document.getElementById('header-logo').src = `assets/logo/FWR Racing Saison ${isS1 ? '1' : '2'}.png`;
  renderClassement();
  renderChronos();
  renderGPs();
  renderPills();
  updateCharts();
}
function renderClassement() {
  const tbody = document.getElementById('tbody-classement');
  if (!tbody) return;
  if (standingsData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">Aucune donnée trouvée.</td></tr>';
    return;
  }
  tbody.innerHTML = standingsData.map((s, i) => {
    const medal = s.pos === 1 ? '🥇' : s.pos === 2 ? '🥈' : s.pos === 3 ? '🥉' : s.pos;
    const bg = i % 2 === 0 ? 'background: #0A0A14' : 'background: #0F0F1A';
    const color = s.color || '#8B5CF6';
    return `
      <tr style="${bg}; border-left: 4px solid ${color}">
        <td class="font-bold">${medal}</td>
        <td><b class="text-white">${s.pilote}</b></td>
        <td><span class="px-2.5 py-1 rounded-full text-xs font-semibold" style="background:${color}20; color:${color}; border:1px solid ${color}40">${s.ecurie}</span></td>
        <td style="text-align:center" class="font-black text-lg text-white">${s.pts}</td>
        <td style="text-align:center" class="text-yellow-400 font-bold">${s.victoires || 0}</td>
        <td class="text-xs text-violet-300 font-mono">${s.meilleur_tour || '-'}</td>
        <td style="text-align:center; color:${s.formeColor || '#8B8B8B'}"><b>${s.forme || '→'}</b></td>
      </tr>
    `;
  }).join('');
}
// AFFICHAGE DE TOUS LES GP DANS L'ONGLET TABLEAUX GP
function renderChronos() {
  const container = document.getElementById('chronos-list');
  if (!container) return;
  container.innerHTML = gpsData.map(gp => {
    // Vérification des détails de course dans gpDisputes
    const dispute = gpDisputes.find(r => r.gp === gp.gp);
    
    const rows = (dispute && dispute.resultats_fwr && dispute.resultats_fwr.length > 0) 
      ? dispute.resultats_fwr.map(res => `
          <tr>
            <td><b>${res.pilote}</b></td>
            <td>${res.ecurie}</td>
            <td>${res.grille}</td>
            <td>${res.arrets}</td>
            <td style="color:#8B5CF6;font-weight:700">${res.mt}</td>
            <td>${res.temps}</td>
            <td style="font-weight:700;color:#10B981">${res.pts}</td>
          </tr>
        `).join('')
      : `<tr><td colspan="7" class="text-center text-gray-500 py-4">Résultats détaillés non saisis pour ce GP</td></tr>`;
    return `
      <div class="card-box">
        <div class="flex flex-col md:flex-row gap-6 items-center mb-4">
          <img src="${gp.affiche}" alt="${gp.gp}" class="w-28 h-36 object-cover rounded-xl bg-black/50 border border-white/10 shrink-0" onerror="this.style.display='none';">
          <div class="flex-1 w-full">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-800">
              <div>
                <span class="text-xs text-violet-400 font-bold">${gp.date} • ${gp.heure || '19H00'} • ${gp.distance || '35%'}${gp.tours ? ` • ${gp.tours} tours` : ''}${gp.longueur ? ` • ${gp.longueur}` : ''}</span>
                <h3 class="titillium text-xl font-bold text-white">${gp.flag || ''} ${gp.gp} - <span class="text-gray-400 text-sm">${gp.circuit}</span></h3>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Vainqueur: <b class="text-green-400">${gp.vainqueur || 'À venir'}</b></div>
                <div class="text-xs text-gray-500 font-mono">${gp.temps || ''}</div>
              </div>
            </div>
            <div class="text-xs text-gray-400">Meilleur Tour: <span class="text-violet-300 font-bold">${gp.meilleur_tour || '-'}</span></div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#141424] text-gray-400 text-xs uppercase">
                <th class="p-2">PILOTE</th>
                <th class="p-2">ÉCURIE</th>
                <th class="p-2">GRILLE</th>
                <th class="p-2">ARRÊTS</th>
                <th class="p-2">MT</th>
                <th class="p-2">TEMPS</th>
                <th class="p-2">PTS</th>
              </tr>
            </thead>
            <tbody class="text-xs divide-y divide-gray-800">${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }).join('');
}
function renderGPs() {
  const grid = document.getElementById('grid-gp');
  if (!grid) return;
  grid.innerHTML = gpsData.map(r => `
    <div class="poster-card" onclick="openModal('${r.gp}')">
      <img src="${r.affiche}" alt="${r.gp}" class="w-full aspect-[4/5] object-cover rounded-xl mb-3 bg-black/50 border border-white/5" onerror="this.onerror=null; this.style.display='none';">
      <div class="text-xs text-violet-400 font-semibold">${r.date}</div>
      <div class="titillium text-lg font-bold text-white mb-1">${r.flag || ''} ${r.gp}</div>
      <div class="text-xs text-gray-400 truncate mb-2">${r.circuit}</div>
      <div class="text-xs text-green-400 font-bold">Vainqueur: ${r.vainqueur || 'À venir'}</div>
    </div>
  `).join('');
}
function renderPills() {
  const container = document.getElementById('pills');
  if (!container) return;
  container.innerHTML = standingsData.map(s => `
    <button class="pill ${selectedDrivers.includes(s.pilote) ? 'active' : ''}" onclick="toggleDriver('${s.pilote}')">
      ${s.pilote} (${s.pts} pts)
    </button>
  `).join('');
}
function toggleDriver(name) {
  if (selectedDrivers.includes(name)) {
    if (selectedDrivers.length > 1) selectedDrivers = selectedDrivers.filter(x => x !== name);
  } else {
    selectedDrivers.push(name);
  }
  renderPills();
  updateCharts();
}
function updateCharts() {
  if (typeof Chart === 'undefined') return;
  const labels = gpsData.map(g => g.gp.substring(0, 4));
  const datasets = standingsData.filter(s => selectedDrivers.includes(s.pilote)).map(s => ({
    label: s.pilote,
    data: ((s.trend || []).length === labels.length + 1 ? s.trend.slice(1) : (s.trend || [])), 
    borderColor: s.color || '#8B5CF6',
    backgroundColor: s.color || '#8B5CF6',
    tension: 0.3,
    borderWidth: 2,
    pointRadius: 3
  }));
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#9CA3AF', font: { family: 'Inter' } } } },
    scales: {
      x: { ticks: { color: '#6B7280' }, grid: { color: '#1F2937' } },
      y: { ticks: { color: '#6B7280' }, grid: { color: '#1F2937' }, beginAtZero: true }
    }
  };
  const cM = document.getElementById('chart-main');
  const cMi = document.getElementById('chart-mini');
  if (chartMain) chartMain.destroy();
  if (chartMini) chartMini.destroy();
  if (cM) chartMain = new Chart(cM, { type: 'line', data: { labels, datasets }, options: chartOptions });
  if (cMi) chartMini = new Chart(cMi, { 
    type: 'line', 
    data: { labels, datasets: datasets.slice(0, 5) }, 
    options: { ...chartOptions, plugins: { legend: { display: false } } } 
  });
}
function showView(view) {
  if (view === 'hub') {
    document.getElementById('view-hub').classList.remove('hidden');
    document.getElementById('view-season-detail').classList.add('hidden');
    
    // Masquer les onglets de navigation interne sur le hub
    ['classement', 'tableaux', 'evolution', 'affiches'].forEach(id => {
      document.getElementById('nav-' + id).classList.add('hidden');
    });
    document.querySelector('button[onclick="showView(\'hub\')"]').classList.add('active');
  } else {
    document.getElementById('view-hub').classList.add('hidden');
    document.getElementById('view-season-detail').classList.remove('hidden');
    
    // Afficher les onglets de navigation interne
    ['classement', 'tableaux', 'evolution', 'affiches'].forEach(id => {
      document.getElementById('nav-' + id).classList.remove('hidden');
    });
    document.querySelector('button[onclick="showView(\'hub\')"]').classList.remove('active');
  }
}
function showTab(tabName) {
  showView('detail');
  ['classement', 'tableaux', 'evolution', 'affiches'].forEach(id => {
    const el = document.getElementById('tab-' + id);
    if (el) el.classList.toggle('hidden', id !== tabName);
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('nav-' + tabName)?.classList.add('active');
}
function switchSeason(season) {
  loadSeasonData(season);
  showTab('classement');
}
function openModal(gpName) {
  const gp = gpsData.find(x => x.gp === gpName);
  if (!gp) return;
  const detail = gpDisputes.find(x => x.gp === gpName);
  const results = detail?.resultats_fwr || [];
  const resultRows = results.map(res => `
    <tr class="border-t border-gray-800">
      <td class="p-2">${res.pos}</td>
      <td class="p-2"><b>${res.pilote}</b></td>
      <td class="p-2">${res.ecurie || '-'}</td>
      <td class="p-2">${res.grille || '-'}</td>
      <td class="p-2">${res.arrets ?? '-'}</td>
      <td class="p-2 text-violet-300 font-mono">${res.mt || '-'}</td>
      <td class="p-2">${res.temps || '-'}</td>
      <td class="p-2 text-green-400 font-bold">${res.pts ?? 0}</td>
    </tr>
  `).join('');
  document.getElementById('modal-title').textContent = `${gp.flag || ''} ${gp.gp} - ${gp.circuit}`;
  document.getElementById('modal-content').innerHTML = `
    <div class="flex flex-col md:flex-row gap-6 mb-6">
      <img src="${gp.affiche}" alt="${gp.gp}" class="w-full md:w-1/3 max-h-64 rounded-xl object-cover border border-white/10" onerror="this.style.display='none'">
      <div class="space-y-3 text-sm text-gray-300">
        <p><b>Date:</b> ${gp.date || '-'}</p>
        <p><b>Heure:</b> ${gp.heure || 'Non renseignée'}</p>
        <p><b>Distance:</b> ${gp.distance || 'Non renseignée'}</p>
        ${gp.longueur || gp.tours ? `<p><b>Longueur:</b> ${gp.longueur || '-'} • <b>Tours:</b> ${gp.tours || '-'}</p>` : ''}
        <p><b>Vainqueur:</b> <span class="text-green-400 font-bold">${gp.vainqueur || '-'}</span></p>
        <p><b>Meilleur Tour:</b> ${gp.meilleur_tour || '-'}</p>
        <p><b>Temps Total:</b> ${gp.temps || 'Non communiqué'}</p>
      </div>
    </div>
    ${results.length ? `
      <h4 class="titillium text-lg font-bold mb-2">CLASSEMENT DE LA COURSE</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse min-w-[760px]">
          <thead class="bg-[#141424] text-gray-400 uppercase"><tr>
            <th class="p-2">Pos.</th><th class="p-2">Pilote</th><th class="p-2">Écurie</th><th class="p-2">Grille</th><th class="p-2">Arrêts</th><th class="p-2">Meilleur tour</th><th class="p-2">Temps</th><th class="p-2">Pts</th>
          </tr></thead>
          <tbody>${resultRows}</tbody>
        </table>
      </div>
    ` : '<p class="text-sm text-gray-500">Résultats détaillés non renseignés.</p>'}
  `;
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}
document.addEventListener('DOMContentLoaded', () => {
  // Afficher le Hub des Saisons au lancement
  showView('hub');
});
