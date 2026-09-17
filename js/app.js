
 // FWR Saison F1 — app.js
 // Classements, résultats, affiches et graphiques.
 // Données officielles : data/standings.json et data/gps.json

 const EMBEDDED_STANDINGS = {
   classement_general: [],
   gp_disputes: [],
   i18n: {}
 };

 const EMBEDDED_GPS = {
   calendrier: []
 };

 let standings = [];
 let gps = [];
 let selectedDrivers = [];
 let activeTab = "classement";
 let currentLang = (() => {
   try {
     const saved = localStorage.getItem("fwr_language");
     return ["fr", "en", "be"].includes(saved) ? saved : "fr";
   } catch {
     return "fr";
   }
 })();
 let chartMain = null;
 let chartMini = null;
 let i18n = {};

 const STORAGE_STANDINGS = "fwr_admin_standings";
 const STORAGE_GPS = "fwr_admin_gps";

 // -----------------------------------------
 // OUTILS
 // -----------------------------------------

 function getLocal(key) {
   try {
     const value = localStorage.getItem(key);
     return value ? JSON.parse(value) : null;
   } catch (error) {
     console.warn("Stockage indisponible :", error);
     return null;
   }
 }

 function saveLocal(key, value) {
   try {
     localStorage.setItem(key, JSON.stringify(value));
     return true;
   } catch (error) {
     console.error("Erreur d'enregistrement :", error);
     return false;
   }
 }

 function escapeHTML(value) {
   return String(value ?? "")
     .replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#39;");
 }

 function normalizeDriver(driver) {
   const result = { ...driver };

   if (result.pilote === "Goret_25") {
     result.pilote = "Gosset_25";
   }

   return result;
 }

 function t(key) {
   const translations =
     i18n[currentLang] ||
     i18n.fr ||
     {};

   return translations[key] || i18n.fr?.[key] || key;
 }

 // -----------------------------------------
 // CHARGEMENT DES DONNÉES
 // -----------------------------------------

 async function loadJSON(path) {
   try {
     const response = await fetch(path, {
       cache: "no-store"
     });

     if (!response.ok) {
       throw new Error(
         "HTTP " + response.status + " : " + path
       );
     }

     return await response.json();

   } catch (error) {
     console.error(
       "Impossible de charger " + path,
       error
     );

     return null;
   }
 }

 function applyStandings(data) {
   if (!data || !Array.isArray(data.classement_general)) {
     return;
   }

   Object.assign(EMBEDDED_STANDINGS, data);

   standings = data.classement_general.map(normalizeDriver);

   i18n = data.i18n || {};

   if (window.FWR_LANG_EXTRA) {
     for (const lang of ["fr", "en", "be"]) {
       i18n[lang] = {
         ...(i18n[lang] || {}),
         ...window.FWR_LANG_EXTRA[lang]
       };
     }
   }

   const available = standings.map(d => d.pilote);

   selectedDrivers = selectedDrivers.length
     ? selectedDrivers.filter(name => available.includes(name))
     : available;

   if (!selectedDrivers.length) {
     selectedDrivers = available;
   }
 }

 function applyGPs(data) {
   if (!data || !Array.isArray(data.calendrier)) {
     return;
   }

   Object.assign(EMBEDDED_GPS, data);

   gps = data.calendrier;
 }

 async function init() {
   initDynamism();

   const [officialStandings, officialGPs] =
     await Promise.all([
       loadJSON("data/standings.json"),
       loadJSON("data/gps.json")
     ]);

   if (officialStandings) {
     applyStandings(officialStandings);
   }

   if (officialGPs) {
     applyGPs(officialGPs);
   }

   // Les modifications locales de l'admin
   // ont priorité sur les données officielles.

   const savedStandings = getLocal(STORAGE_STANDINGS);

   if (savedStandings) {
     applyStandings(savedStandings);
   }

   const savedGPs = getLocal(STORAGE_GPS);

   if (savedGPs) {
     applyGPs(savedGPs);
   }

   renderAll();
 }

 // -----------------------------------------
 // ACTUALISATION
 // -----------------------------------------

 function refreshAdminData() {
   const savedStandings = getLocal(STORAGE_STANDINGS);
   const savedGPs = getLocal(STORAGE_GPS);

   if (savedStandings) {
     applyStandings(savedStandings);
   }

   if (savedGPs) {
     applyGPs(savedGPs);
   }

   renderAll();
 }

 function renderAll() {
   renderClassement();
   renderChronos();
   renderGPs();
   renderPills();
   updateCharts();
   showTab(activeTab);
   updateLang();

   if (window.FWR_translateInterface) {
     window.FWR_translateInterface();
   }
 }

 // -----------------------------------------
 // LANGUES
 // -----------------------------------------

 function updateLang() {
   document.documentElement.lang =
     currentLang === "be" ? "fr-BE" : currentLang;

   document
     .querySelectorAll(".lang-switch button")
     .forEach(button => {
       button.classList.toggle(
         "active",
         button.dataset.lang === currentLang
       );
     });

   document
     .querySelectorAll("[data-i18n]")
     .forEach(element => {
       const key = element.dataset.i18n;
       const translated = t(key);

       if (translated !== key) {
         element.textContent = translated;
       }
     });
 }

 function switchLang(lang) {
   if (!["fr", "en", "be"].includes(lang)) {
     return;
   }

   currentLang = lang;

   try {
     localStorage.setItem("fwr_language", lang);
   } catch {}

   document.documentElement.lang =
     lang === "be" ? "fr-BE" : lang;

   renderAll();
 }

 // -----------------------------------------
 // CLASSEMENT GÉNÉRAL
 // -----------------------------------------

 function renderClassement() {
   const tbody =
     document.getElementById("tbody-classement");

   if (!tbody) return;

   tbody.innerHTML = standings.map((driver, index) => {

     const position = Number(driver.pos);

     // CORRECTION :
     // Une seule médaille pour les trois premiers.
     // Un seul numéro à partir de la quatrième place.
     const positionDisplay =
       position === 1 ? "🥇 1" :
       position === 2 ? "🥈 2" :
       position === 3 ? "🥉 3" :
       escapeHTML(driver.pos);

     const color =
       /^#[0-9a-fA-F]{3,8}$/.test(driver.color || "")
         ? driver.color
         : "#E10600";

     const background =
       index % 2 === 0
         ? "#0A0A0F"
         : "#111117";

     const label =
       typeof driver.label === "object"
         ? driver.label?.[currentLang] ||
           driver.label?.fr ||
           ""
         : driver.label || "";

     const leader =
       position === 1
         ? '<span class="badge-leader">👑 LEADER</span>'
         : "";

     return `
       <tr style="
         background:${background};
         border-left:4px solid ${color}
       ">

         <td>
           <b>${positionDisplay}</b>
         </td>

         <td>
           <b>${escapeHTML(driver.pilote)}</b>
           ${leader}
         </td>

         <td>
           <span style="
             padding:2px 8px;
             border-radius:999px;
             font-size:10px;
             color:${color};
             border:1px solid ${color};
           ">
             ${escapeHTML(driver.ecurie)}
           </span>
         </td>

         <td style="
           text-align:center;
           font-weight:700;
           font-size:18px
         ">
           ${escapeHTML(driver.pts)}
         </td>

         <td style="
           text-align:center;
           color:#FFD700
         ">
           ${escapeHTML(driver.victoires ?? "")}
         </td>

         <td>
           <b>${escapeHTML(driver.forme)}</b>

           <span style="
             font-size:10px;
             margin-left:4px
           ">
             ${escapeHTML(label)}
           </span>
         </td>

       </tr>
     `;

   }).join("");
 }

 // -----------------------------------------
 // RÉSULTATS GP
 // -----------------------------------------

 function renderChronos() {
   const container =
     document.getElementById("chronos-list");

   if (!container) return;

   const races =
     EMBEDDED_STANDINGS.gp_disputes || [];

   container.innerHTML = races.map(race => {

     const results = race.resultats_fwr || [];

     const title = `
       <div style="
         display:flex;
         justify-content:space-between;
         margin-bottom:12px
       ">

         <div>

           <div style="
             font-size:11px;
             color:#8B8B8B
           ">
             ${escapeHTML(race.date)}
             • ${escapeHTML(race.heure)}
             • ${escapeHTML(race.distance)}
           </div>

           <div class="titillium" style="
             font-weight:700;
             font-size:18px
           ">
             ${escapeHTML(race.gp)}
             -
             ${escapeHTML(race.circuit)}
           </div>

         </div>

       </div>
     `;

     if (!results.length) {
       return `
         <div class="poster-card">
           ${title}
           <p>En attente des résultats</p>
         </div>
       `;
     }

     const rows = results.map(result => {

       const driver = normalizeDriver(result);

       return `
         <tr>
           <td>${escapeHTML(driver.pilote)}</td>
           <td>${escapeHTML(driver.ecurie)}</td>
           <td>${escapeHTML(driver.grille)}</td>
           <td>${escapeHTML(driver.arrets)}</td>
           <td>${escapeHTML(driver.mt)}</td>
           <td>${escapeHTML(driver.temps)}</td>
           <td>
             <b>${escapeHTML(driver.pts)}</b>
           </td>
         </tr>
       `;

     }).join("");

     return `
       <div class="poster-card">

         ${title}

         <div style="overflow:auto">

           <table>

             <thead>
               <tr>
                 <th>${t("pilote")}</th>
                 <th>${t("ecurie")}</th>
                 <th>${t("grille")}</th>
                 <th>${t("arrets")}</th>
                 <th>${t("meilleur_tour")}</th>
                 <th>${t("temps_ecart")}</th>
                 <th>${t("pts")}</th>
               </tr>
             </thead>

             <tbody>
               ${rows}
             </tbody>

           </table>

         </div>

       </div>
     `;

   }).join("");
 }

 // -----------------------------------------
 // AFFICHES GP
 // -----------------------------------------

 function getPoster(gp) {
   try {
     const custom =
       localStorage.getItem("fwr_poster_" + gp.gp);

     if (custom) {
       return custom;
     }
   } catch (error) {
     console.warn(error);
   }

   return gp.affiche || "";
 }

 function renderGPs() {
   const grid =
     document.getElementById("grid-gp");

   if (!grid) return;

   grid.innerHTML = "";

   gps.forEach(race => {

     const card = document.createElement("div");

     card.className = "poster-card";

     card.style.cursor = "pointer";

     card.addEventListener("click", () => {
       openModal(race.gp);
     });

     const poster = getPoster(race);

     if (poster) {

       const image = document.createElement("img");

       image.src = poster;

       image.alt = "Affiche GP " + race.gp;

       image.loading = "lazy";

       image.style.cssText = `
         width:100%;
         aspect-ratio:4/5;
         object-fit:cover;
         border-radius:12px;
         display:block;
         margin-bottom:14px;
       `;

       image.onerror = () => {
         image.style.display = "none";
       };

       card.appendChild(image);
     }

     const info = document.createElement("div");

     info.innerHTML = `
       <div style="
         font-size:11px;
         color:#8B8B8B
       ">
         ${escapeHTML(race.date)}
         •
         ${escapeHTML(race.heure)}
       </div>

       <div class="titillium" style="
         font-weight:700;
         font-size:18px;
         margin-top:4px
       ">
         ${escapeHTML(race.flag)}
         ${escapeHTML(race.gp)}
       </div>

       <div style="
         font-size:11px;
         color:#8B8B8B;
         margin-top:4px
       ">
         ${escapeHTML(race.circuit)}
       </div>

       <div style="
         font-size:12px;
         color:#CCCCCC;
         margin-top:12px
       ">
         ${escapeHTML(race.vainqueur || "En attente")}
       </div>
     `;

     card.appendChild(info);

     grid.appendChild(card);

   });

   // Affiches indépendantes ajoutées depuis le panneau
   // administrateur (stockage local).
   let independent = [];

   try {
     independent = JSON.parse(
       localStorage.getItem("fwr_independent_posters") || "[]"
     );
   } catch (error) {
     console.warn(error);
   }

   if (Array.isArray(independent)) {
     independent.forEach(poster => {
       if (
         !poster ||
         typeof poster.name !== "string" ||
         typeof poster.image !== "string"
       ) {
         return;
       }

       const card = document.createElement("div");
       card.className = "poster-card";

       const image = document.createElement("img");
       image.src = poster.image;
       image.alt = "Affiche " + poster.name;
       image.loading = "lazy";
       image.style.cssText = `
         width:100%;
         aspect-ratio:4/5;
         object-fit:cover;
         border-radius:12px;
         display:block;
         margin-bottom:14px;
       `;

       card.appendChild(image);

       const title = document.createElement("div");
       title.textContent = poster.name;
       title.style.cssText = "font-weight:700;color:white";

       card.appendChild(title);
       grid.appendChild(card);
     });
   }
 }

 // -----------------------------------------
 // SÉLECTION DES PILOTES
 // -----------------------------------------

 function renderPills() {
   const container =
     document.getElementById("pills");

   if (!container) return;

   container.innerHTML = "";

   standings.forEach(driver => {

     const button = document.createElement("button");

     button.className =
       "pill" +
       (selectedDrivers.includes(driver.pilote)
         ? " active"
         : "");

     button.textContent = driver.pilote;

     button.addEventListener("click", () => {
       toggleDriver(driver.pilote);
     });

     container.appendChild(button);

   });
 }

 function toggleDriver(name) {

   if (selectedDrivers.includes(name)) {

     if (selectedDrivers.length > 1) {
       selectedDrivers =
         selectedDrivers.filter(driver => driver !== name);
     }

   } else {

     if (selectedDrivers.length < 10) {
       selectedDrivers.push(name);
     }

   }

   renderPills();
   updateCharts();
 }

 // -----------------------------------------
 // GRAPHIQUES
 // -----------------------------------------

 function updateCharts() {

   if (chartMain) {
     chartMain.destroy();
     chartMain = null;
   }

   if (chartMini) {
     chartMini.destroy();
     chartMini = null;
   }

   if (typeof Chart === "undefined") {
     return;
   }

   const labels = [
     "Mel",
     "Sha",
     "Suz",
     "Bah",
     "Jed",
     "Mia",
     "Imo",
     "Mon",
     "Bar"
   ];

   const makeDataset = driver => ({
     label: driver.pilote,

     data: Array.isArray(driver.trend)
       ? driver.trend
       : [],

     borderColor: driver.color || "#E10600",

     backgroundColor: driver.color || "#E10600",

     tension: 0.28,

     borderWidth: 2,

     pointRadius: 3,

     pointHoverRadius: 5,

     fill: false
   });

   const datasets = standings
     .filter(driver =>
       selectedDrivers.includes(driver.pilote)
     )
     .map(makeDataset);

   const miniDatasets = standings
     .slice(0, 5)
     .map(makeDataset);

   const options = {
     responsive: true,

     maintainAspectRatio: false,

     interaction: {
       mode: "index",
       intersect: false
     },

     plugins: {
       legend: {
         labels: {
           color: "#CCCCCC",
           boxWidth: 12
         }
       }
     },

     scales: {

       x: {
         ticks: {
           color: "#8B8B8B"
         },

         grid: {
           color: "rgba(255,255,255,.05)"
         }
       },

       y: {
         beginAtZero: true,

         ticks: {
           color: "#8B8B8B"
         },

         grid: {
           color: "rgba(255,255,255,.06)"
         }
       }

     }
   };

   const main =
     document.getElementById("chart-main");

   const mini =
     document.getElementById("chart-mini");

   try {

     if (main) {

       chartMain = new Chart(main, {
         type: "line",

         data: {
           labels,
           datasets
         },

         options
       });

     }

     if (mini) {

       chartMini = new Chart(mini, {
         type: "line",

         data: {
           labels,
           datasets: miniDatasets
         },

         options: {
           ...options,

           plugins: {
             legend: {
               display: false
             }
           }
         }
       });

     }

   } catch (error) {
     console.error("Erreur graphique :", error);
   }
 }

 // -----------------------------------------
 // NAVIGATION
 // -----------------------------------------

 function showTab(name) {

   activeTab = name;

   const tabs = [
     "classement",
     "tableaux",
     "evolution",
     "affiches"
   ];

   tabs.forEach(tab => {

     const view =
       document.getElementById("view-" + tab);

     if (view) {
       view.classList.toggle(
         "hidden",
         tab !== name
       );
     }

   });

   document
     .querySelectorAll(".nav-unique button")
     .forEach(button => {
       button.classList.remove("active");
     });

   const button =
     document.getElementById("nav-" + name);

   if (button) {
     button.classList.add("active");
   }
 }

 // -----------------------------------------
 // FENÊTRE DES RÉSULTATS
 // -----------------------------------------

 function openModal(gpName) {

   const race =
     (EMBEDDED_STANDINGS.gp_disputes || [])
       .find(item => item.gp === gpName);

   if (!race) return;

   const modal =
     document.getElementById("modal");

   const content =
     document.getElementById("modal-content");

   if (!modal || !content) return;

   const results = race.resultats_fwr || [];

   let html = `
     <h2 class="titillium" style="
       font-size:24px;
       font-weight:700
     ">
       ${escapeHTML(race.gp)}
       -
       ${escapeHTML(race.circuit)}
     </h2>

     <p style="
       color:#8B8B8B;
       margin-top:8px
     ">
       ${escapeHTML(race.date)}
       •
       ${escapeHTML(race.heure)}
       •
       ${escapeHTML(race.distance)}
     </p>
   `;

   if (!results.length) {

     html += `
       <p style="margin-top:24px">
         En attente des résultats
       </p>
     `;

   } else {

     const rows = results.map(result => {

       const driver = normalizeDriver(result);

       return `
         <tr>
           <td>${escapeHTML(driver.pilote)}</td>
           <td>${escapeHTML(driver.ecurie)}</td>
           <td>${escapeHTML(driver.grille)}</td>
           <td>${escapeHTML(driver.arrets)}</td>
           <td>${escapeHTML(driver.mt)}</td>
           <td>${escapeHTML(driver.temps)}</td>
           <td>${escapeHTML(driver.pts)}</td>
         </tr>
       `;

     }).join("");

     html += `
       <p style="margin-top:12px">
         Vainqueur :
         ${escapeHTML(race.vainqueur)}
         ${escapeHTML(race.temps)}
       </p>

       <div style="
         margin-top:16px;
         overflow:auto
       ">

         <table>

           <thead>
             <tr>
               <th>${t("pilote")}</th>
               <th>${t("ecurie")}</th>
               <th>${t("grille")}</th>
               <th>${t("arrets")}</th>
               <th>${t("meilleur_tour")}</th>
               <th>${t("temps_ecart")}</th>
               <th>${t("pts")}</th>
             </tr>
           </thead>

           <tbody>
             ${rows}
           </tbody>

         </table>

       </div>
     `;
   }

   content.innerHTML = html;

   modal.style.display = "flex";
 }

 function closeModal() {

   const modal =
     document.getElementById("modal");

   if (modal) {
     modal.style.display = "none";
   }
 }

 // -----------------------------------------
 // ANIMATIONS
 // -----------------------------------------

 function initDynamism() {

   const container =
     document.querySelector(".speed-lines");

   if (container && !container.dataset.initialized) {

     container.dataset.initialized = "1";

     for (let i = 0; i < 6; i++) {

       const line =
         document.createElement("div");

       line.className = "speed-line";

       line.style.top =
         (10 + i * 15) + "%";

       line.style.width =
         (100 + Math.random() * 200) + "px";

       line.style.animationDelay =
         (i * 0.5) + "s";

       container.appendChild(line);
     }
   }

   const particles =
     document.querySelector(".particles");

   if (particles && !particles.dataset.initialized) {

     particles.dataset.initialized = "1";

     for (let i = 0; i < 12; i++) {

       const particle =
         document.createElement("div");

       particle.className = "particle";

       particle.style.left =
         Math.random() * 100 + "%";

       particle.style.top =
         Math.random() * 100 + "%";

       particle.style.animationDelay =
         Math.random() * 5 + "s";

       particles.appendChild(particle);
     }
   }
 }

 // -----------------------------------------
 // DÉMARRAGE
 // -----------------------------------------

 if (document.readyState === "loading") {

   document.addEventListener(
     "DOMContentLoaded",
     init,
     { once: true }
   );

 } else {

   init();

 }
