# FWR S1 - V21.1 FIXED - FR EN BE - Gosset_25 Fix - FIXED

Site ULTIME FIXED - Données embeddées - Logos visibles - Tout marche

## Fix V21.1

- Données embeddées dans app.js + index.html - plus de fetch qui casse - tableaux par GP marchent même sans data/
- Logos: S1 FWR logo transparent 90px + fallback texte S1 FWR si image manque - logo ligue + saison apparents header
- Nav unique: un seul endroit navigation (dans header sous logos) - pas double
- Bandeau rouge cliquable Twitch https://twitch.tv/upsilon7 + bouton REGARDER LE LIVE
- Classement général + Tableaux GP + Stats courbes + Affiches GP + Dynamisme + FR EN BE + Moderne F1
- Gosset_25 fix partout (ex Goret_25 blague)

## Structure

```
fwr-v21-fixed/
├── index.html - SITE FIXED avec données embeddées + logos + nav unique
├── data/standings.json + gps.json - JSON avec Gosset_25 + i18n FR EN BE
├── js/app.js - Logique FIXED avec EMBEDDED_STANDINGS fallback
├── css/style.css - V21 + dynamisme + grille carbone + speed-lines + particles
├── assets/logo/s1-fwr-logo-transparent.png
└── vercel.json
```

Push sur fwr-racing-league
