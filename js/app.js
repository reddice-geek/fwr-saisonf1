/* 
 * FWR Racing League - app.js V38 Corrigé 20 GP
 * Fix complet : hub + posters saison 1 + 20 labels + safeExec
 * Auteur: Correction auto
 */

const EMBEDDED_GPS = {
  calendrier: [
    { id: 1, nom: "Grand Prix d'Australie", ville: "Melbourne", circuit: "Albert Park Circuit", pays: "Australie", drapeau: "🇦🇺", date: "21 Août", heure: "19H00", distance: "50%", tour: 58, longueur: "5.278 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "1:32:45.123", meilleur_tour: "1:20.128 - Skyyy", poster: "assets/posters saison 1/melbourne.png", statut: "termine" },
    { id: 2, nom: "Grand Prix de Chine", ville: "Shanghai", circuit: "Shanghai International Circuit", pays: "Chine", drapeau: "🇨🇳", date: "22 Août", heure: "19H00", distance: "50%", tour: 56, longueur: "5.451 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "1:35:12.456", meilleur_tour: "1:33.421 - Skyyy", poster: "assets/posters saison 1/shanghai.png", statut: "termine" },
    { id: 3, nom: "Grand Prix du Japon", ville: "Suzuka", circuit: "Suzuka International Racing Course", pays: "Japon", drapeau: "🇯🇵", date: "24 Août", heure: "19H00", distance: "50%", tour: 53, longueur: "5.807 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "1:28:33.890", meilleur_tour: "1:29.055 - Skyyy", poster: "assets/posters saison 1/suzuka.png", statut: "termine" },
    { id: 4, nom: "Grand Prix de Bahreïn", ville: "Bahrain", circuit: "Bahrain International Circuit", pays: "Bahreïn", drapeau: "🇧🇭", date: "25 Août", heure: "19H00", distance: "35%", tour: 20, longueur: "5.412 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "38:22.114", meilleur_tour: "1:31.447 - Skyyy", poster: "assets/posters saison 1/bahrain.png", statut: "termine" },
    { id: 5, nom: "Grand Prix d'Arabie Saoudite", ville: "Jeddah", circuit: "Jeddah Corniche Circuit", pays: "Arabie Saoudite", drapeau: "🇸🇦", date: "01 Sept", heure: "19H00", distance: "35%", tour: 17, longueur: "6.174 km", vainqueur: "Leo", ecurie: "Ferrari", temps: "42:10.901", meilleur_tour: "1:30.734 - Leo", poster: "assets/posters saison 1/jeddah.png", statut: "termine" },
    { id: 6, nom: "Grand Prix de Miami", ville: "Miami", circuit: "Miami International Autodrome", pays: "USA", drapeau: "🇺🇸", date: "03 Sept", heure: "19H00", distance: "35%", tour: 20, longueur: "5.410 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "41:05.332", meilleur_tour: "1:29.982 - Skyyy", poster: "assets/posters saison 1/miami.png", statut: "termine" },
    { id: 7, nom: "Grand Prix d'Émilie-Romagne", ville: "Imola", circuit: "Autodromo Enzo e Dino Ferrari", pays: "Italie", drapeau: "🇮🇹", date: "06 Sept", heure: "19H00", distance: "35%", tour: 22, longueur: "4.909 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "44:18.210", meilleur_tour: "1:15.650 - Skyyy", poster: "assets/posters saison 1/imola.png", statut: "termine" },
    { id: 8, nom: "Grand Prix de Monaco", ville: "Monaco", circuit: "Circuit de Monaco", pays: "Monaco", drapeau: "🇲🇨", date: "10 Sept", heure: "19H00", distance: "35%", tour: 27, longueur: "3.337 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "48:33.777", meilleur_tour: "1:12.909 - Skyyy", poster: "assets/posters saison 1/monaco.png", statut: "termine" },
    { id: 9, nom: "Grand Prix d'Espagne", ville: "Barcelone", circuit: "Circuit de Barcelona-Catalunya", pays: "Espagne", drapeau: "🇪🇸", date: "14 Sept", heure: "19H00", distance: "35%", tour: 23, longueur: "4.657 km", vainqueur: "Noah", ecurie: "Mercedes", temps: "39:42.123", meilleur_tour: "1:16.330 - Noah", poster: "assets/posters saison 1/barcelone.png", statut: "termine" },
    { id: 10, nom: "Grand Prix du Canada", ville: "Canada", circuit: "Circuit Gilles-Villeneuve", pays: "Canada", drapeau: "🇨🇦", date: "17 Sept", heure: "19H00", distance: "35%", tour: 24, longueur: "4.361 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "37:11.009", meilleur_tour: "1:13.078 - Skyyy", poster: "assets/posters saison 1/canada.png", statut: "termine" },
    { id: 11, nom: "Grand Prix d'Autriche", ville: "Autriche", circuit: "Red Bull Ring", pays: "Autriche", drapeau: "🇦🇹", date: "22 Septembre", heure: "19H00", distance: "35%", tour: 25, longueur: "4.318 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "36:45.600", meilleur_tour: "1:05.155 - Skyyy", poster: "assets/posters saison 1/autriche.png", statut: "termine" },
    { id: 12, nom: "Grand Prix de Grande-Bretagne", ville: "Grande Bretagne", circuit: "Silverstone Circuit", pays: "Royaume-Uni", drapeau: "🇬🇧", date: "22 Septembre", heure: "19H00", distance: "35%", tour: 18, longueur: "5.891 km", vainqueur: "Milo", ecurie: "McLaren", temps: "40:22.418", meilleur_tour: "1:27.097 - Milo", poster: "assets/posters saison 1/silverstone.png", statut: "termine" },
    { id: 13, nom: "Grand Prix de Belgique", ville: "Belgique", circuit: "Circuit de Spa-Francorchamps", pays: "Belgique", drapeau: "🇧🇪", date: "29 Septembre", heure: "19H00", distance: "35%", tour: 15, longueur: "7.004 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "43:51.234", meilleur_tour: "1:44.701 - Skyyy", poster: "assets/posters saison 1/spa.png", statut: "termine" },
    { id: 14, nom: "Grand Prix de Hongrie", ville: "Hongrie", circuit: "Hungaroring", pays: "Hongrie", drapeau: "🇭🇺", date: "01 Oct", heure: "19H00", distance: "35%", tour: 24, longueur: "4.381 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "38:05.112", meilleur_tour: "1:16.627 - Skyyy", poster: "assets/posters saison 1/hongrie.png", statut: "termine" },
    { id: 15, nom: "Grand Prix des Pays-Bas", ville: "Pays-Bas", circuit: "Circuit Zandvoort", pays: "Pays-Bas", drapeau: "🇳🇱", date: "06 Oct", heure: "19H00", distance: "35%", tour: 25, longueur: "4.259 km", vainqueur: "Enzo", ecurie: "Ferrari", temps: "37:59.871", meilleur_tour: "1:11.097 - Enzo", poster: "assets/posters saison 1/zandvoort.png", statut: "termine" },
    { id: 16, nom: "Grand Prix d'Italie", ville: "Monza", circuit: "Autodromo Nazionale Monza", pays: "Italie", drapeau: "🇮🇹", date: "08 Oct", heure: "19H00", distance: "35%", tour: 18, longueur: "5.793 km", vainqueur: "Skyyy", ecurie: "Red Bull", temps: "35:18.450", meilleur_tour: "1:21.046 - Skyyy", poster: "assets/posters saison 1/monza.png", statut: "termine" },
    { id: 17, nom: "Grand Prix d'Azerbaïdjan", ville: "Azerbaïdjan", circuit: "Baku City Circuit", pays: "Azerbaïdjan", drapeau: "🇦🇿", date: "13 Oct", heure: "19H00", distance: "35%", tour: 17, longueur: "6.003 km", vainqueur: "Leo", ecurie: "Ferrari", temps: "41:33.901", meilleur_tour: "1:43.009 - Leo", poster: "assets/posters saison 1/baku.png", statut: "termine" },
    { id: 18, nom: "Grand Prix des États-Unis", ville: "Texas", circuit: "Circuit of the Americas", pays: "USA", drapeau: "🇺🇸", date: "20 Oct", heure: "19H00", distance: "35%", tour: 19, longueur: "5.513 km", vainqueur: "Noah", ecurie: "Mercedes", temps: "42:11.222", meilleur_tour: "1:36.169 - Noah", poster: "assets/posters saison 1/cota.png", statut: "termine" },
    { id: 19, nom: "Grand Prix du Mexique", ville: "Mexique", circuit: "Autódromo Hermanos Rodríguez", pays: "Mexique", drapeau: "🇲🇽", date: "22 Oct", heure: "19H00", distance: "35%", tour: 25, longueur: "4.304 km", vainqueur: "Milo", ecurie: "McLaren", temps: "39:02.445", meilleur_tour: "1:17.774 - Milo", poster: "assets/posters saison 1/mexique.png", statut: "termine" },
    { id: 20, nom: "Grand Prix du Brésil", ville: "Brésil", circuit: "Autódromo José Carlos Pace", pays: "Brésil", drapeau: "🇧🇷", date: "27 Oct", heure: "19H00", distance: "35%", tour: 25, longueur: "4.309 km", vainqueur: "Enzo", ecurie: "Ferrari", temps: "40:55.678", meilleur_tour: "1:10.540 - Enzo", poster: "assets/posters saison 1/bresil.png", statut: "termine" }
  ],
  pilotes: [
    { id: "skyyy", nom: "Skyyy", ecurie: "Red Bull", points: 372, victoires: 12, podiums: 16, couleur: "#0600EF" }
  ]
};

let gpsData = [];
let standingsData = null;
let currentSeason = 's1';
let activeDrivers = new Set();
let gpDisputes = [];

// ---------- ULTRA SAFE WRAPPER ----------
function safeExec(fn, name = 'anonymous') {
  try {
    return fn();
  } catch (e) {
    console.warn(`[FWR V38][${name}] Erreur capturée:`, e);
    return null;
  }
}

// ---------- FIX POSTER PATH (CORRECTION MAJEURE) ----------
function fixPosterPath(path, season = 's1') {
  if (!path) return '';
  // Si déjà correct, on garde
  if (path.includes('posters saison 1')) return path;
  
  // Extraction du nom de fichier
  const fileName = path.split('/').pop() || 'default.png';
  
  // Mapping saison -> dossier (gère l'espace)
  const seasonFolders = {
    's1': 'assets/posters saison 1/',
    's2': 'assets/posters saison 2/',
    'default': 'assets/posters saison 1/'
  };
  
  const folder = seasonFolders[season] || seasonFolders['default'];
  
  // Correction ancienne structure assets/posters/ -> assets/posters saison 1/
  if (path.includes('assets/posters/')) {
    return folder + fileName;
  }
  
  // Si juste un nom de fichier
  if (!path.includes('/')) {
    return folder + path;
  }
  
  return folder + fileName;
}

// ---------- LOAD SEASON DATA ----------
async function loadSeasonData(season = 's1') {
  return safeExec(async () => {
    currentSeason = season;
    const basePath = `data/Saison ${season === 's1' ? '1' : season === 's2' ? '2' : '1'}`;
    
    try {
      const [gpsRes, standingsRes] = await Promise.all([
        fetch(`${basePath}/gps.json`).then(r => r.ok ? r.json() : null).catch(() => null),
        fetch(`${basePath}/standings.json`).then(r => r.ok ? r.json() : null).catch(() => null)
      ]);

      if (gpsRes && Array.isArray(gpsRes.calendrier || gpsRes)) {
        gpsData = gpsRes.calendrier || gpsRes;
      } else if (gpsRes && gpsRes.gps) {
        gpsData = gpsRes.gps;
      } else {
        console.info('[FWR V38] Fallback EMBEDDED_GPS');
        gpsData = EMBEDDED_GPS.calendrier;
      }

      if (standingsRes) {
        standingsData = standingsRes;
      } else {
        standingsData = { pilotes: EMBEDDED_GPS.pilotes, ecuries: [], meta: { totalGP: 20 } };
      }

      // Fix tous les posters au chargement
      gpsData = gpsData.map(gp => ({
        ...gp,
        poster: fixPosterPath(gp.poster || gp.affiche || gp.image, season)
      }));

      gpDisputes = gpsData.filter(g => g.statut === 'termine' || g.vainqueur);
      
    } catch (err) {
      console.warn('[FWR V38] Erreur fetch, fallback embedded', err);
      gpsData = EMBEDDED_GPS.calendrier;
      standingsData = { pilotes: EMBEDDED_GPS.pilotes };
      gpDisputes = gpsData;
    }

    updateUI();
  }, 'loadSeasonData');
}

// ---------- UI ----------
function updateUI() {
  safeExec(() => {
    const badge = document.getElementById('season-badge') || document.querySelector('.season-badge');
    if (badge) badge.textContent = currentSeason === 's1' ? 'Saison 1 - 20 GP' : 'Saison ' + currentSeason;

    const logo = document.getElementById('logo-saison');
    if (logo) logo.textContent = currentSeason.toUpperCase();

    renderClassement();
    renderChronos();
    renderGPs();
    renderPills();
    updateCharts();
  }, 'updateUI');
}

function renderClassement() {
  safeExec(() => {
    const tbody = document.getElementById('tbody-classement');
    if (!tbody || !standingsData || !standingsData.pilotes) return;

    const pilotes = [...standingsData.pilotes].sort((a,b) => (b.points||0)-(a.points||0));
    tbody.innerHTML = pilotes.map((p, i) => `
      <tr class="${activeDrivers.has(p.id) ? 'active-row' : ''}" onclick="toggleDriver('${p.id}')">
        <td>${i+1}</td>
        <td><span class="dot" style="background:${p.couleur||'#fff'}"></span> ${p.nom}</td>
        <td>${p.ecurie||''}</td>
        <td><strong>${p.points||0}</strong></td>
        <td>${p.victoires||0}</td>
        <td>${p.podiums||0}</td>
      </tr>
    `).join('');
  }, 'renderClassement');
}

function renderChronos() {
  safeExec(() => {
    const list = document.getElementById('chronos-list');
    if (!list) return;
    if (!gpDisputes || gpDisputes.length === 0) {
      list.innerHTML = '<p class="empty">Aucun GP disputé</p>';
      return;
    }
    list.innerHTML = gpDisputes.map(gp => `
      <div class="chrono-item">
        <img src="${fixPosterPath(gp.poster, currentSeason)}" alt="${gp.nom}" onerror="this.src='assets/posters saison 1/default.png'">
        <div class="chrono-info">
          <strong>${gp.drapeau||''} ${gp.ville||gp.nom}</strong>
          <span>${gp.date||''} - ${gp.heure||'19H00'} - ${gp.distance||'35%'}</span>
          <span class="winner">🏆 ${gp.vainqueur||'-'} - ${gp.temps||''}</span>
          <span class="best">⏱ ${gp.meilleur_tour||''}</span>
        </div>
      </div>
    `).join('');
  }, 'renderChronos');
}

function renderGPs() {
  safeExec(() => {
    const grid = document.getElementById('grid-gp');
    if (!grid) return;
    grid.innerHTML = gpsData.map(gp => `
      <div class="gp-card" onclick="openModal(${gp.id})">
        <div class="gp-poster-wrap">
          <img src="${fixPosterPath(gp.poster, currentSeason)}" alt="${gp.nom}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400?text='+encodeURIComponent(gp.ville)">
        </div>
        <div class="gp-body">
          <div class="gp-head"><span class="flag">${gp.drapeau||'🏁'}</span><span class="date">${gp.date||''}</span></div>
          <h3>${gp.nom}</h3>
          <p class="circuit">${gp.circuit||''}</p>
          <div class="gp-meta"><span>🕖 ${gp.heure||'19H00'}</span><span>${gp.distance||'35%'}</span></div>
          ${gp.vainqueur ? `<div class="gp-winner">Vainqueur: <b>${gp.vainqueur}</b></div>` : ''}
        </div>
      </div>
    `).join('');
  }, 'renderGPs');
}

// ---------- PILLS + CHARTS ----------
const CHART_LABELS_20 = ['Mel','Sha','Suz','Bah','Jed','Mia','Imo','Mon','Bar','Can','Aut','GBR','Bel','Hon','PB','Monza','Aze','Tex','Mex','Bré'];

function renderPills() {
  safeExec(() => {
    const container = document.getElementById('pills-drivers');
    if (!container || !standingsData || !standingsData.pilotes) return;
    container.innerHTML = standingsData.pilotes.map(p => `
      <button class="pill ${activeDrivers.has(p.id) ? 'active' : ''}" style="--c:${p.couleur||'#fff'}" onclick="toggleDriver('${p.id}')">${p.nom}</button>
    `).join('');
  }, 'renderPills');
}

function toggleDriver(id) {
  safeExec(() => {
    if (activeDrivers.has(id)) activeDrivers.delete(id);
    else activeDrivers.add(id);
    renderClassement();
    renderPills();
    updateCharts();
  }, 'toggleDriver');
}

function updateCharts() {
  safeExec(() => {
    const canvasPoints = document.getElementById('chart-points');
    const canvasPos = document.getElementById('chart-positions');
    if (!canvasPoints && !canvasPos) return;

    // Labels toujours 20 GP
    const labels = CHART_LABELS_20;

    // Exemple de logique chart.js si présent
    if (typeof Chart !== 'undefined') {
      // Détruire anciens charts si existants
      if (window.pointsChart) { try{ window.pointsChart.destroy(); }catch(e){} }
      if (window.posChart) { try{ window.posChart.destroy(); }catch(e){} }

      const datasets = [];
      const pilotes = standingsData?.pilotes || [];
      const filtered = activeDrivers.size > 0 ? pilotes.filter(p => activeDrivers.has(p.id)) : pilotes.slice(0,6);

      filtered.forEach(p => {
        // Simulation progression points (à remplacer par vrais datas si dispo)
        const prog = labels.map((_, idx) => Math.round((p.points / 20) * (idx+1) * (0.8 + Math.random()*0.4)));
        datasets.push({
          label: p.nom,
          data: prog,
          borderColor: p.couleur || '#fff',
          backgroundColor: p.couleur || '#fff',
          tension: 0.3
        });
      });

      if (canvasPoints) {
        window.pointsChart = new Chart(canvasPoints, {
          type: 'line',
          data: { labels, datasets },
          options: { responsive: true, maintainAspectRatio: false, plugins:{ legend:{ labels:{ color:'#fff' } } }, scales:{ x:{ ticks:{ color:'#aaa' } }, y:{ ticks:{ color:'#aaa' } } } }
        });
      }
    } else {
      // Fallback sans chart.js : texte
      if (canvasPoints) {
        const parent = canvasPoints.parentElement;
        if (parent) parent.innerHTML = '<div class="chart-fallback"><strong>20 GP Labels:</strong> ' + labels.join(' | ') + '<br/>Points cumulés Skyyy: 372 pts (12V)</div>';
      }
    }
  }, 'updateCharts');
}

// ---------- NAVIGATION HUB COMPAT ----------
function showView(view) {
  safeExec(() => {
    // Nouveau système hub
    const hubViews = ['hub','classement','gps','stats','calendrier'];
    const allViews = document.querySelectorAll('[id^="view-"], [id^="tab-"]');
    allViews.forEach(el => {
      el.classList.add('hidden');
      el.style.display = 'none';
    });

    const candidates = [
      document.getElementById('view-' + view),
      document.getElementById('tab-' + view),
      document.getElementById(view)
    ].filter(Boolean);

    if (candidates.length > 0) {
      candidates[0].style.display = 'block';
      candidates[0].classList.remove('hidden');
    } else {
      // fallback hub
      const hub = document.getElementById('view-hub') || document.getElementById('tab-hub');
      if (hub) { hub.style.display = 'block'; hub.classList.remove('hidden'); }
    }

    // active nav
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
  }, 'showView');
}

function showTab(name) {
  // Alias pour compat ancienne structure
  showView(name);
}

function switchSeason(season) {
  safeExec(() => {
    loadSeasonData(season);
    showView('hub');
  }, 'switchSeason');
}

function openModal(gpId) {
  safeExec(() => {
    const gp = gpsData.find(g => g.id == gpId);
    if (!gp) return;
    const modal = document.getElementById('modal-gp');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;
    content.innerHTML = `
      <div class="modal-header">
        <img src="${fixPosterPath(gp.poster, currentSeason)}" alt="${gp.nom}">
        <div>
          <h2>${gp.drapeau||''} ${gp.nom}</h2>
          <p>${gp.circuit||''} - ${gp.date||''} à ${gp.heure||'19H00'}</p>
          <p><strong>Distance:</strong> ${gp.distance||'35%'} | <strong>${gp.tour||''} tours</strong> | ${gp.longueur||''}</p>
        </div>
      </div>
      <div class="modal-body">
        ${gp.vainqueur ? `<p>🏆 Vainqueur: <b>${gp.vainqueur}</b> (${gp.ecurie||''})</p><p>⏱ Temps: ${gp.temps||''}</p><p>⚡ Meilleur tour: ${gp.meilleur_tour||''}</p>` : '<p>À venir - 19H00</p>'}
      </div>
      <button class="btn-close" onclick="closeModal()">Fermer</button>
    `;
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
  }, 'openModal');
}

function closeModal() {
  safeExec(() => {
    const modal = document.getElementById('modal-gp');
    if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
  }, 'closeModal');
}

// ---------- INIT ----------
async function init() {
  await safeExec(async () => {
    await loadSeasonData('s1');
    showView('hub');
    // Listener fermer modal en cliquant dehors
    const modal = document.getElementById('modal-gp');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    console.log('[FWR V38] Init OK - 20 GP, posters saison 1, hub ready');
  }, 'init');
}

// Auto init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose global pour index.html inline onclick
window.showView = showView;
window.showTab = showTab;
window.switchSeason = switchSeason;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleDriver = toggleDriver;
window.loadSeasonData = loadSeasonData;
window.fixPosterPath = fixPosterPath;
