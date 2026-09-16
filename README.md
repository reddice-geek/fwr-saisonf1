FWR Racing League - S1 2026
Site officiel - De la V1 à la V24 - Scores corrigés + Panel Admin fonctionnel
Version actuelle : V24 - SCORES CORRIGÉS GP1-GP9 + ADMIN FONCTIONNEL + ÉCURIES OFFICIELLES
Champion : Skyyy - 143 pts - 5 victoires | 9 GP disputés | MAJ : 14 Sept 2026

Live : https://twitch.tv/upsilon7 | Repo : fwr-racing-league Vercel

🔄 Évolution V1 → V24
V1-V8 : Base ADN Clean
Structure initiale, classement général basique, tableaux GP
Logo S1 FWR transparent 90px, bandeau rouge #E10600 tout cliquable Twitch
Nav multi-onglets, lang switch FR/EN/BE (septante, une fois, Wanze)
V9-V15 : Courbes & Visuel
Courbes d'évolution ajoutées : Chart.js avec trend cumulatif
Mini-chart Top 5 sur page classement
Main-chart tous pilotes filtrables avec pills
Labels Mel/Sha/Suz/Bah/Jed/Mia/Imo/Mon/Bar, tension 0.28, couleurs écuries
Tableaux GP HTML directs visibles (temps, écarts, arrêts, MT)
Affiches GP grille 3 colonnes
Dynamisme : grid-carbone, speed-lines (6 lignes), particles (12), glow rouge, dot pulse LIVE
V16-V20 : Données pilotes
Fix Goret_25 → Gosset_25
Crimson_Death ajouté à Suzuka : Grille 19, 1 arrêt, MT 1:38:090, +1 tour, 0 pts
Jeddah R5 01 Sept : seulement points, pas de chrono → Taatsu 25, Skyyy 18, upsilon7 15, Gosset 12
Couleurs écuries unifiées
V21.1 FIXED : Gosset Fix
Correction globale Goret → Gosset partout
standings.json + gps.json + app.js avec EMBEDDED_STANDINGS
Nav unique (un seul endroit : Classement | Tableaux | Stats | Affiches)
V21.4 WEBMASTER : Footer sans pseudo
Suppression pseudo reddice_geek
Footer webmaster générique traduit :
FR : Site web réalisé par le webmaster en 2026 sous autorisation FWR • Utilisation libre de droits • Données officielles Team FWR • S1 2026 • twitch.tv/upsilon7
EN : Website developed by the webmaster in 2026 under FWR authorization • Free use...
BE :... une fois - C'est du lourd! - Ça va ou quoi?
V22 ADMIN PANEL : Panel discret en bas
Bouton fixe ⚙️ Admin bottom-16 left-16 opacity 0.3 → 1 hover
Modal admin avec onglets Courses / Pilotes / Affiches / Export
Stockage localStorage.fwr_admin_standings pour modifier sans toucher JSON
V23 FINAL FIXED : Bug positions
Bug : positions 4 4 5 5... 11 11 doublons
Fix : positions 1-11 uniques
Panel admin réellement intégré dans index.html + js/app.js
Ouverture : 5 clics logo FWR ou ?admin=1 dans URL
V24 ACTUELLE : Scores corrigés + Admin fonctionnel
Scores corrigés d'après ton image GP1 Melbourne → GP9 Barcelone
Totaux recalculés : Skyyy 143 (avant 125), Gosset 130 (118), upsilon 122 (97), Taatsu 108 (83)
Trends cumulatifs recalculés : Skyyy etc.[0][25][43][68][93][118][143]
Imola GP7 corrigé : manquait upsilon7 10 pts → ajouté
Écuries officielles renommées avec couleurs officielles
Panel admin 100% fonctionnel : Edit/Delete/Add marchent vraiment (plus de placeholder)
🚀 Fonctionnalités majeures
1. Courbes
2 graphiques Chart.js, données trend cumul après chaque GP
Filtrage par pilote (pills), couleurs par écurie
2. Tableaux GP
9 GP HTML direct, colonnes PILOTE/ECURIE/GRILLE/ARRETS/MT/TEMPS/PTS
Gestion R5 points seulement : affiche "-" pour grille/mt/temps
3. Affiches GP
Cards assets/posters/{gp}-{date}.png + support custom upload base64 via admin (localStorage prioritaire fwr_poster_{gp})
4. Panel Admin Discret
Activation :

Bouton ⚙️ Admin bas gauche discret
5 clics logo ou ?admin=1
Stockage :

fwr_admin_standings + fwr_poster_{gp}
Onglets :

Courses : Liste GP + Edit (vainqueur/temps/MT) / Suppr + Edit/Suppr résultat + Form + Nouvelle Course + Form Ajouter résultat (GP select, pilote, ecurie select officiel, grille, arrets, mt, temps, pts) + Bouton Editer Jeddah R5
Pilotes : Liste 1-11 + Edit/Suppr + Reassign pos 1-11 + Ajouter nouveau pilote (nom + ecurie couleur auto)
Affiches : Select GP + file input image/* + preview + Sauvegarder → localStorage base64
Export : Télécharger standings.json / gps.json, Sauvegarder/Charger localStorage, Réinitialiser, textarea JSON brut copier-coller
Fonctions toutes fonctionnelles : editGP(), deleteGP(), editPilote(), deletePilote(), addNewGP(), editJeddahR5(), addResultToGP(), previewAffiche(), saveAffiche(), downloadStandings()...

📊 Points corrigés d'après ton image
POS

PILOTE

GP1 Mel

GP2 Sha

GP3 Suz

GP4 Bah

GP5 Jed

GP6 Mia

GP7 Imo

GP8 Mon

GP9 Bar

TOTAL

1

Skyyy

0

25

0

0

18

25

25

25

25

143

2

Gosset_25

12

18

0

25

12

15

18

18

12

130

3

upsilon7

15

15

18

10

15

12

10

12

15

122

4

Taatsu7TV

0

12

15

15

25

18

15

0

8

108

5

Jesui_tou

25

0

25

18

0

0

0

0

0

68

6

cobra_kai_cx

18

0

0

0

0

0

12

0

0

30

7

JoKeR

0

0

0

0

0

0

0

15

10

25

8

JotagrosFR

0

0

0

0

0

0

0

0

18

18

9

mobilou69

0

0

4

12

0

0

0

0

0

16

10

sombre7675TTV

6

0

0

0

0

0

0

0

0

6

11

Crimson_Death

0

0

0

0

0

0

0

0

0

0

🎨 Écuries officielles
Scuderia Ferrari HP (rouge) #DC0000 → upsilon7, Taatsu7TV
Aston Martin (vert foncé) #006F62 → cobra_kai_cx
Alpine (bleu claire) #0090FF → Skyyy, Jesui_tou
Red Bull (bleu foncé) #0600EF → Gosset_25, JotagrosFR, mobilou69
Williams (vert délavé) #A8D5BA → futur
McLaren (orange) #FF8700 → futur
KICK Sauber (vert neon) #00E676 → futur
Mercedes-AMG Petronas (bleu délavé) #00D2BE → JoKeR, Crimson_Death
Haas (gris) #9E9E9E → sombre7675TTV
Visa Cash App Racing Bulls (bleu délavé) #6692FF → futur
📁 Structure
Code
fwr-v21-fixed/
├── index.html (V24 avec panel admin discret + bandeau + header + nav unique)
├── data/standings.json (11 pilotes, 9 GP, ecuries officielles, i18n footer webmaster, scores corrigés)
├── data/gps.json (calendrier 9 GP)
├── js/app.js (EMBEDDED_STANDINGS + check localStorage + renderAll)
├── css/style.css (dynamisme)
├── assets/logo/s1-fwr-logo-transparent.png
└── README.md (ce fichier)

3 lignes masquées
💻 Utilisation
Local : npx serve. → http://localhost:3000
Deploy : push main fwr-racing-league → Vercel auto

Admin :

Ouvrir + ?admin=1 ou 5 clics logo
Courses → Editer Jeddah R5 si besoin
Nouvelle Course → nom, circuit, date
Ajouter résultat → choisir GP, pilote, ecurie, grille, arrets, mt, temps, pts (mettre "-" si points seulement)
Affiches → choisir GP, upload PNG/JPG, preview, Sauvegarder
Export → Télécharger standings.json → remplacer data/standings.json → commit push
Webmaster : Site web réalisé par le webmaster en 2026 sous autorisation FWR • Utilisation libre de droits • Données officielles Team FWR

© 2026 FWR Racing League
