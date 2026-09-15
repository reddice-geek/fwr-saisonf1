# FWR S1 - Championnat F1 25 Team FWR

![S1 FWR Logo Transparent](assets/logo/s1-fwr-logo-transparent.png)

Site officiel de classement du tournoi F1 25 Team FWR - Saison 1 2026 - EN COURS

## 🏁 Classement actuel (après Espagne 14 Sept)
- **1. Skyyy - Alpine - 143 pts - 6 victoires - RECORD 1:12.865 Monaco**
- **2. Goret_25 - Red Bull - 130 pts**
- **3. upsilon7 - Ferrari - 122 pts**

Saison toujours en cours - 5 GP réels disputés.

## 📂 Contenu du ZIP

```
fwr-s1-github-final/
├── index.html                 # SITE COMPLET - Mets à la racine pour GitHub Pages (React + Tailwind inline)
├── assets/
│   ├── logo/
│   │   ├── s1-fwr-logo-transparent.png  # LOGO PNG TRANSPARENT - S1 FWR + 5 drapeaux (Australie, Japon, USA, Monaco, Espagne)
│   │   ├── s1-fwr-logo.webp             # Version webp fond noir
│   │   └── s1-fwr-logo.png              # Version png fond noir
│   ├── posters/               # Toutes les affiches GP Team FWR + captures résultats réels (Australie, Japon, Miami, Monaco, Espagne)
│   └── flags/                 # (optionnel)
├── data/
│   ├── standings.json         # Classement général + médailles + meilleurs temps réels
│   └── gps.json               # GP réalisés + à venir avec drapeaux
├── css/style.css              # Styles additionnels
├── js/app.js                  # Chargement JSON
├── README.md
└── .gitignore
```

## 🚀 Déployer sur GitHub en 2 min

1. Crée un repo vide: `fwr-s1-championnat` sur github.com (ne coche pas README)
2. Décompresse ce ZIP, ouvre un terminal dans le dossier:
```bash
git init
git add .
git commit -m "S1 FWR - Saison en cours 5 GP + logo transparent"
git branch -M main
git remote add origin https://github.com/TON_PSEUDO/fwr-s1-championnat.git
git push -u origin main
```
3. Sur GitHub: Settings > Pages > Source: Deploy from branch > main / root > Save
4. Site live: https://TON_PSEUDO.github.io/fwr-s1-championnat/

Le fichier `index.html` est déjà tout-en-un, pas besoin de build.

## 🎨 Logo

`assets/logo/s1-fwr-logo-transparent.png` est en PNG transparent 1024x1024:
- S1 blanc bold + FWR rouge #E10600
- 5 drapeaux ronds en bas: Australie 🇦🇺, Japon 🇯🇵, USA 🇺🇸, Monaco 🇲🇨, Espagne 🇪🇸
- Utilise-le en header, favicon, bannière Discord, overlay vidéo

## ✏️ Modifier les prochains GP

Ouvre `index.html` sur ton site live, active "Mode Édition ON" (en haut à droite):
- + Nouveau GP pour ajouter Canada, Imola, Bahreïn...
- Modifier pour changer points, temps (ex: 1:21.309 Australie)
- Tout est sauvé en localStorage + bouton Exporter JSON

Les temps réels intégrés:
- Australie: 28:14.241 / 1:21.309 Jesui_tou
- Japon: 30:36.255 / 1:33.067 Jesui_tou
- Miami: 31:36.318 / 1:30.300 Skyyy
- Monaco: 34:51.962 / 1:12.865 Skyyy RECORD
- Espagne: 30:00.485 / 1:15.304 JotagrosFR (meilleur tour) - Vainqueur Skyyy

Team FWR - Feel the Rush. Win Together. #FWR #S1
