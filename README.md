# ✦ Sterrenhemel

Persoonlijk astronomie-dashboard voor sterrenkijken vanuit Marum, Groningen.

## Features

- **📰 Nieuws** — Actueel astronomie-nieuws met filterbare categorieën
- **🔭 Vanavond** — Live stargazing score op basis van weer (Open-Meteo API)
- **📅 Kalender** — Meteorenregens 2026 met kijkratings + planeetevents
- **🌌 Dark Sky** — Beste donkere locaties bij Marum (Lauwersmeer, Terschelling, etc.)

## Live weer

De app haalt automatisch live weerdata op voor Marum via de [Open-Meteo API](https://open-meteo.com/) en berekent een stargazing score op basis van bewolking, luchtvochtigheid, wind en temperatuur.

## Installatie als PWA

1. Open de site in Safari op je iPhone
2. Tik op **Delen** → **Zet op beginscherm**
3. Je hebt nu een app-icoon op je homescreen

## Hosting

Dit is een enkel HTML-bestand zonder dependencies. Host het waar je wilt:

- **GitHub Pages** — push naar een repo en enable Pages
- **Netlify** — sleep `index.html` naar [app.netlify.com/drop](https://app.netlify.com/drop)
- **Lokaal** — open `index.html` in je browser

## iOS Shortcut

Zie `docs/ios-shortcut.md` voor instructies om een dagelijkse stargazing-melding om 16:00 in te stellen.

## Tech

- Vanilla HTML/CSS/JS (geen frameworks, geen build step)
- Open-Meteo API (gratis, geen API key nodig)
- PWA-ready met apple-mobile-web-app meta tags
- Geanimeerd sterrenvelsd canvas

---

Gebouwd met ✦ en Claude
