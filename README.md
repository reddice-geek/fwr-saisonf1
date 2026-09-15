# FWR S1 - Championnat F1 25 Team FWR - V20.1 FINAL - Gosset_25 Fix

![S1 FWR Logo Transparent](assets/logo/s1-fwr-logo-transparent.png)

Site officiel - SAISON 1 FWR 2026 - V8 ADN Clean
Dernière mise à jour: Barcelone 14 Sept 2026 - V20.1 FINAL

🔴 LIVE: https://twitch.tv/upsilon7

## 🏁 Classement final V20.1 FINAL (après 9 GP - 8 résultats)

1. Skyyy - Alpine - 125 pts - 5 victoires (Shanghai, Miami, Imola, Monaco, Barcelone) - RECORD 1:12.865 Monaco + 👑 LEADER animé or
2. Gosset_25 - Red Bull - 118 pts - 1 victoire Bahrain - (ex Goret_25 renommé pour blague) - 1:14.953 Monaco
3. upsilon7 - Ferrari HP - 97 pts - Twitch https://twitch.tv/upsilon7
4. Taatsu7TV - Ferrari HP - 83 pts
5. Jesui_tou - Alpine - 68 pts - 2 victoires Melbourne, Suzuka - EN BAISSE 0 pt sur 5 GP
6. cobra_kai_cx - 30 pts - ↑ EN FORME
7. JoKeR-_-SkyZo - 25 pts - ↑↑
8. JotagrosFR - 18 pts - Meilleur tour Barcelone 1:15.304 + ↑↑
9. mobilou69 - 16 pts
10. sombre7675TTV - 6 pts

## ✨ V20.1 FINAL - Nouveautés V8 ADN Clean

- ✅ V8 ADN gardé: fond #050507, rouge #E10600, tableaux premium EA F1 25
- ✅ Nav au dessus bandeau rouge 40px #0F0F14: Classement | Évolution | Calendrier | Affiches | Stats active rouge
- ✅ Bandeau rouge épais 56px #E10600 sticky: 🔴 LIVE F1 25 TEAM FWR → twitch.tv/upsilon7 + bouton REGARDER LE LIVE blanc pulse
- ✅ Header logo géant 180px transparent cliquable S1 blanc FWR rouge drop-shadow rouge 120px sticky bg #050507/80 backdrop-blur onClick retour accueil
- ✅ Badge leader animé or 👑 LEADER #FFD700→#FFA500 pulse scale 1→1.1 infinite sur Skyyy P1
- ✅ Classement général en premier: POS 🥇🥈🥉 PTS 24px bold V or FORME flèches ↑↑↑ EN FEU vert, → STABLE gris, ↓↓ EN BAISSE rouge
- ✅ Courbes évolution parieurs tous pilotes activés par défaut: X 9 GP Mel Sha Suz Bah Jed Mia Imo Mon Bar Y 0-125 10 courbes Skyyy #E10600 [0,25,25,25,25,50,75,100,125] Gosset_25 #0600EF [12,30,30,55,55,70,88,106,118] etc, pills tous actifs blancs, cotes Skyyy 1.25 favori Gosset 4.0 upsilon 6.5
- ✅ Affiches 9 GP passées grille 3 colonnes Team FWR style EA F1 25, clique = modal tableau détaillé Grille Arrêts Meilleur Tour Temps/Ecart PTS chronos complets 1:21.309 1:37.682 1:33.567 1:33.902 1:30.300 1:19.181 1:12.865 RECORD 1:15.304 MEILLEUR TOUR
- ✅ Tableaux dans détails de chaque course qui ont eu lieu: Melbourne 28:14.241, Shanghai 33:58.631, Suzuka 30:36.255, Bahrain 32:15.411, Miami 31:36.318, Imola 1:19.181, Monaco 34:51.962 RECORD, Barcelone 30:00.485
- ✅ Clean 100%: plus de badges verts dégueulasses, plus de v13.37, plus de image_d5600e.png, plus de 100% FWR • 0% IA • V13 FINALE, plus de ✅ V12 textes debug
- ✅ Correction Gosset_25: Goret_25 = Gosset_25 renommé pour blague partout

## 📅 Calendrier complet S1 9 GP

- 21 Août - Melbourne 19H00 50% - Jesui 25 - 28:14.241 1:21.309
- 22 Août - Shanghai 20H00 50% - Skyyy 25 - 33:58.631 1:37.682
- 24 Août - Suzuka 19H00 50% - Jesui 25 - 30:36.255 1:33.567
- 25 Août - Bahrain 19H00 35% - Gosset_25 25 - 32:15.411 1:33.902 Taatsu meilleur tour
- 01 Sept - Jeddah 19H00 35% - En attente résultats
- 03 Sept - Miami 21H00 35% - Skyyy 25 - 31:36.318 1:30.300
- 06 Sept - Imola 19H00 35% - Skyyy 25 - 1:19.181
- 10 Sept - Monaco 19H00 35% - Skyyy 25 - 34:51.962 1:12.865 RECORD
- 14 Sept - Barcelone 19H00 35% - Skyyy 25 - 30:00.485 1:15.304 Jotagros meilleur tour

## 📂 Arborescence GitHub V20.1 FINAL

```
fwr-v20-final-github/
├── index.html - SITE V20.1 FINAL COMPLET - V8 ADN Clean - Gosset_25 Fix
├── data/
│   ├── standings.json - Classement V20.1 + Gosset_25 118 pts + trends + forme + meilleurs temps
│   └── gps.json - Calendrier 9 GP + Twitch https://twitch.tv/upsilon7
├── js/
│   └── app.js - Logique V20.1: nav au dessus bandeau, bandeau rouge épais Twitch, logo géant cliquable, badge leader animé or, courbes tous pilotes activés, affiches + modals tableaux détaillés
├── css/
│   └── style.css - V8 ADN + bandeau épais + logo géant + badge leader animé + courbes + nav above + clean
├── assets/
│   ├── logo/
│   │   └── s1-fwr-logo-transparent.png
│   └── posters/ - 9 affiches officielles Team FWR
└── README.md
```

## 🚀 Update GitHub Vercel

```bash
git init
git add .
git commit -m "V20.1 FINAL Gosset_25 Fix - V8 ADN Clean - Bandeau Twitch épais + Logo géant cliquable + Badge leader animé or + Courbes tous pilotes + Affiches + Tableaux détaillés"
git branch -M main
git remote add origin https://github.com/TON_USER/fwr-racing-league.git
git push -u origin main --force
```

GitHub Pages: Settings > Pages > Deploy from branch main / root
Vercel: Project Name = fwr-racing-league - Import depuis GitHub - Framework Other - Output ./

Twitch: https://twitch.tv/upsilon7

Team FWR - Feel the Rush. Win Together. #FWR - S1 2026 - V20.1 FINAL Gosset_25
