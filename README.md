# Cartas do Império

A card game about city-states, kingdoms and empires from history, loosely inspired by SolarCards. This repo is a static site that lists every card and has a print version for A4 paper. All card text is in Brazilian Portuguese.

- **`index.html`**: browse the cards. Filter by type, search, sort by area, and switch the zoom level.
- **`imprimir.html`**: print view. Each A4 sheet holds 9 cards (3 × 3) at real size with crop marks.

Every card is **63 × 88 mm**, the same size as a Magic: The Gathering card.

## Card types

| Type | Colour | Count |
|---|---|---|
| Cidade-Estado | green | 5 |
| Reino | blue | 12 |
| Império | red | 13 |

Each card has a name, its official name, its type, its time period, its capital, its approximate area at its peak (km²), a short flavour text, a map, and a countryball in the top corner.

## Project structure

```
site/                  ← what gets published (GitHub Pages)
  index.html           browsing page
  imprimir.html        A4 print page
  data/cartas.js       ← CARD DATA (names, area, text…)
  css/carta.css        card layout (all sizes in mm)
  img/mapas/*.svg      maps (generated)
  img/bolas/*.svg      countryballs (generated)
scripts/
  build.mjs            generates the maps and the balls
  regioes.mjs          approximate territory of each card
  bolas.mjs            simplified flags and hats for the balls
```

## Running locally

```bash
npm install
npm run build   # regenerates site/img/mapas and site/img/bolas
npm start       # serves site/ at http://localhost:3000
```

## Adding a card

1. Add an entry to `site/data/cartas.js`, using a new `id`.
2. Add its territory to `scripts/regioes.mjs`. List the modern countries it covered, plus an optional clipping polygon in `[lon, lat]`.
3. Add its flag to `BANDEIRAS` in `scripts/bolas.mjs`. If you want a hat, add one to `CHAPEU_POR_CARTA`.
4. Run `npm run build`.

You can also use a real historical map image instead of a generated one. Just replace `site/img/mapas/<id>.svg`, or point the `<img>` in `site/js/cartas.js` at a different file.

## Printing

Open `imprimir.html` and click **Imprimir**. In the print dialog, pick **A4**, **scale 100%**, **margins: none** and turn on **background graphics**.

## Deploying to GitHub Pages

The workflow in `.github/workflows/pages.yml` builds the site and publishes the `site/` folder on every push to `main`. In the repository settings, go to **Settings → Pages → Source** and choose **GitHub Actions**.

## Data notes

- The maps are **approximate**. Each territory is built from today's borders (Natural Earth 1:50m, via `world-atlas`) and then cut with rough polygons for the historical borders.
- Areas are approximate, taken at the peak shown on each card. They're commonly cited figures, so it's worth checking them before you print the final version.
- The flags on the balls are simplified, and for ancient states without a known flag they are artistic choices.
