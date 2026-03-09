# 🔭 Sterrenhemel — iOS Shortcut Installatiehandleiding

## Dagelijkse stargazing-melding om 16:00

Deze shortcut checkt elke dag om 16:00 het weer in Marum en stuurt je een melding of het goed sterrenkijkweer is.

---

## Stap 1: Open de Shortcuts-app

Open de **Opdrachten** (Shortcuts) app op je iPhone. Deze staat standaard op je telefoon.

---

## Stap 2: Maak een nieuwe Shortcut

1. Tik op het **+** icoon rechtsboven
2. Geef de shortcut de naam **"Sterrenhemel Check"**

---

## Stap 3: Voeg de acties toe

Voeg de volgende acties toe in deze volgorde:

### Actie 1: Haal webinhoud op
- Zoek de actie: **"Haal inhoud op van URL"** (Get Contents of URL)
- Vul deze URL in:
  ```
  https://api.open-meteo.com/v1/forecast?latitude=53.1439&longitude=6.2642&hourly=cloud_cover,temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Europe/Amsterdam&forecast_days=1
  ```

### Actie 2: Haal woordenboekwaarde op
- Zoek: **"Haal woordenboekwaarde op"** (Get Dictionary Value)
- Sleutel: `hourly`
- Uit: de output van de vorige actie

### Actie 3: Haal woordenboekwaarde op (bewolking)
- Zoek: **"Haal woordenboekwaarde op"**
- Sleutel: `cloud_cover`

### Actie 4: Haal item uit lijst
- Zoek: **"Haal item uit lijst"** (Get Item from List)
- Haal item op: **item op index**
- Index: **22** (= 21:00 uur, want de lijst begint bij 0)

### Actie 5: Als-actie (If)
- Zoek: **"Als"** (If)
- Voorwaarde: **is kleiner dan 40**

### Actie 6a: Toon melding (in het "Als"-blok)
- Zoek: **"Toon melding"** (Show Notification)
- Titel: `🌟 Sterrenhemel`
- Body: `Vanavond helder! Bewolking onder 40% — perfecte avond voor sterrenkijken! 🔭`

### Actie 6b: Anders-blok
- In het **Anders**-gedeelte:
- **"Toon melding"**
- Titel: `☁️ Sterrenhemel`
- Body: `Vanavond te bewolkt voor sterrenkijken. Bewolking boven 40%. Probeer morgen!`

### Actie 7: Einde Als

---

## Stap 4: Automatisering instellen

Dit is de belangrijkste stap — hierdoor krijg je elke dag om 16:00 automatisch een melding:

1. Ga naar het **Automatisering**-tabblad (onderin de Shortcuts-app)
2. Tik op **+** → **Persoonlijke automatisering**
3. Kies **Tijd van de dag**
4. Stel in: **16:00** — **Dagelijks**
5. Kies **Voer direct uit** (niet "Bevestig eerst")
6. Voeg de actie toe: **"Voer opdracht uit"** → selecteer **"Sterrenhemel Check"**
7. Tik op **Gereed**

---

## Stap 5: Test!

Ga terug naar je shortcut en tik op het ▶️ afspeelknopje om te testen. Je zou direct een melding moeten krijgen met de stargazing-condities voor vanavond.

---

## Optioneel: Geavanceerde versie

Wil je een uitgebreidere melding met ook temperatuur en wind? Voeg dan extra "Haal woordenboekwaarde op"-acties toe voor `temperature_2m` en `wind_speed_10m`, en bouw een tekstvariabele op met alle info.

Voorbeeld meldingstekst:
```
🔭 Bewolking: 25% | Temp: 8°C | Wind: 12 km/u
→ Goede avond voor sterrenkijken!
```

---

## Hosting van de webapp

Om de **Sterrenhemel webapp** als app op je homescreen te zetten:

### Optie A: Gratis hosting via Netlify
1. Ga naar [app.netlify.com/drop](https://app.netlify.com/drop)
2. Sleep het bestand `sterrenhemel.html` naar de pagina
   - Hernoem het eerst naar `index.html`
3. Je krijgt een gratis URL (bijv. `random-name.netlify.app`)
4. Open deze URL in Safari op je iPhone
5. Tik op het **Delen-icoon** (vierkantje met pijl)
6. Kies **"Zet op beginscherm"**
7. Geef het de naam **Sterrenhemel** en tik op **Voeg toe**

### Optie B: GitHub Pages (gratis)
1. Maak een repository op [github.com](https://github.com)
2. Upload `sterrenhemel.html` als `index.html`
3. Ga naar Settings → Pages → Source: main branch
4. Je site staat live op `jouw-naam.github.io/repo-naam`
5. Volg stappen 4–7 van Optie A

---

Veel plezier met sterrenkijken! ✦🔭
