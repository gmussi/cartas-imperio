// Gera site/img/mapas/<id>.svg e site/img/bolas/<id>.svg para cada carta.
// Uso: npm run build
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import polygonClipping from "polygon-clipping";
import { REGIOES } from "./regioes.mjs";
import { bolaSVG } from "./bolas.mjs";

const require = createRequire(import.meta.url);
const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(raiz, "site");

// ── dados das cartas (arquivo do site, script clássico) ──
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(site, "data/cartas.js"), "utf8"), { globalThis: ctx });
const CARTAS = ctx.CARTAS;

// ── mundo ──
const topo50 = require("world-atlas/countries-50m.json");
const topo110 = require("world-atlas/countries-110m.json");
const mundo50 = topojson.feature(topo50, topo50.objects.countries).features;
const mundo110 = topojson.feature(topo110, topo110.objects.countries).features;
const porNome = new Map(mundo50.map((f) => [f.properties.name, f]));
const semAntartida = (fs_) => fs_.filter((f) => f.properties.name !== "Antarctica");

const CORES = {
  "cidade-estado": { fill: "#1E8A70", stroke: "#0B4D3D" },
  reino: { fill: "#2B59C3", stroke: "#15306F" },
  imperio: { fill: "#B3261E", stroke: "#5E120D" },
};

// Os recortes são desenhados em lon/lat "planos", mas o d3 traça arestas como arcos de
// círculo máximo; adensar os vértices (≤ 1°) evita distorções nas arestas longas.
function adensar(anel, passo = 1) {
  const out = [];
  for (let i = 0; i < anel.length - 1; i++) {
    const [x0, y0] = anel[i], [x1, y1] = anel[i + 1];
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / passo));
    for (let k = 0; k < n; k++) out.push([x0 + ((x1 - x0) * k) / n, y0 + ((y1 - y0) * k) / n]);
  }
  out.push(anel.at(-1));
  return out;
}
const fechar = (anel) => adensar(anel[0][0] !== anel.at(-1)[0] || anel[0][1] !== anel.at(-1)[1] ? [...anel, anel[0]] : anel);
const caixaParaAnel = ([a, b, c, d]) => fechar([[a, b], [c, b], [c, d], [a, d]]);
const coords = (g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates);
const deslocar = (multi, dx) => multi.map((p) => p.map((r) => r.map(([x, y]) => [x + dx, y])));
const faixa = (a, b) => [[[a, -90], [b, -90], [b, 90], [a, 90], [a, -90]]];

// Os anéis do world-atlas que cruzam o antimeridiano "saltam" de 180 para -180, o que quebra
// operações planas. Desenrola as longitudes e corta de volta no intervalo [-180, 180].
const cacheNormal = new Map();
function normalizar(nome, multi) {
  if (cacheNormal.has(nome)) return cacheNormal.get(nome);
  const cruza = multi.some((p) => p[0].some((pt, i, r) => i && Math.abs(pt[0] - r[i - 1][0]) > 180));
  let out = multi;
  if (cruza) {
    const desenrolar = (r) => {
      let off = 0, ant = null;
      return r.map(([x, y]) => {
        let xx = x + off;
        if (ant !== null && xx - ant > 180) { off -= 360; xx -= 360; }
        else if (ant !== null && xx - ant < -180) { off += 360; xx += 360; }
        ant = xx;
        return [xx, y];
      });
    };
    const desenrolado = multi.map((p) => p.map(desenrolar));
    out = polygonClipping.union(
      polygonClipping.intersection(desenrolado, faixa(-180, 180)),
      deslocar(polygonClipping.intersection(desenrolado, faixa(180, 540)), -360),
      deslocar(polygonClipping.intersection(desenrolado, faixa(-540, -180)), 360),
    );
  }
  cacheNormal.set(nome, out);
  return out;
}

function territorio(spec) {
  const recorteGlobal = spec.recorte ? fechar(spec.recorte) : spec.caixa ? caixaParaAnel(spec.caixa) : null;
  const pedacos = [];
  for (const item of spec.paises) {
    const nome = typeof item === "string" ? item : item.nome;
    const f = porNome.get(nome);
    if (!f) { console.warn(`  ! país não encontrado: ${nome}`); continue; }
    let geom = normalizar(nome, coords(f.geometry));
    const recorte = typeof item === "object" && (item.recorte || item.caixa)
      ? (item.recorte ? fechar(item.recorte) : caixaParaAnel(item.caixa))
      : recorteGlobal;
    // o recorte pode passar de 180° (ex.: Chukotka); a cópia deslocada cobre o outro lado.
    if (recorte) geom = polygonClipping.union(
      polygonClipping.intersection(geom, [[recorte]]),
      polygonClipping.intersection(geom, deslocar([[recorte]], -360)),
    );
    if (geom.length) pedacos.push(geom);
  }
  if (!pedacos.length) return null;
  const uniao = polygonClipping.union(...pedacos);
  // polygon-clipping devolve anéis anti-horários; o d3-geo espera horários.
  const multi = uniao.map((poly) => poly.map((anel) => anel.slice().reverse()));
  const feat = { type: "Feature", geometry: { type: "MultiPolygon", coordinates: multi } };
  if (d3.geoArea(feat) > 2 * Math.PI) throw new Error("orientação invertida");
  return feat;
}

const LARG = 550, ALT = 300;

function mapaSVG(carta, spec) {
  const cor = CORES[carta.tipo];
  const terr = territorio(spec);
  let projecao, mundo = mundo50;

  if (spec.vista === "mundo") {
    projecao = d3.geoNaturalEarth1().rotate([-10, 0]).fitExtent([[4, 4], [LARG - 4, ALT - 4]], { type: "Sphere" });
    mundo = mundo110;
  } else {
    const alvo = spec.ponto ? d3.geoCircle().center(spec.ponto).radius(spec.raio)() : terr;
    const [lon, lat] = d3.geoCentroid(alvo);
    projecao = d3.geoAzimuthalEqualArea().rotate([-lon, -lat]).clipAngle(100);
    const pad = spec.ponto ? 4 : 22;
    projecao.fitExtent([[pad, pad], [LARG - pad, ALT - pad]], alvo);
  }
  projecao.clipExtent([[0, 0], [LARG, ALT]]);

  const caminho = d3.geoPath(projecao).digits(1);
  const graticula = d3.geoGraticule().step([10, 10])();
  const esfera = caminho({ type: "Sphere" });

  const paises = semAntartida(mundo).map((f) => caminho(f)).filter(Boolean).join("");
  const destaque = terr ? caminho(terr) : "";

  let marcador = "";
  if (spec.ponto) {
    const [x, y] = projecao(spec.ponto).map((v) => v.toFixed(1));
    marcador = `<circle cx="${x}" cy="${y}" r="26" fill="${cor.fill}" fill-opacity="0.18" stroke="${cor.fill}" stroke-width="2.5"/>
      <circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${cor.fill}" stroke-width="2.5"/>
      <circle cx="${x}" cy="${y}" r="5.5" fill="${cor.stroke}" stroke="#fff" stroke-width="2"/>`;
  } else if (spec.capital) {
    const p = projecao(spec.capital);
    if (p) {
      const [x, y] = p;
      marcador = estrela(x, y, 9, "#FFD24A", cor.stroke);
    }
  }

  const traco = spec.vista === "mundo" ? 0.4 : 0.8;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LARG} ${ALT}" width="${LARG}" height="${ALT}">
<rect width="${LARG}" height="${ALT}" fill="#BFD8DE"/>
${esfera && spec.vista === "mundo" ? `<path d="${esfera}" fill="#C9E0E5"/>` : ""}
<path d="${caminho(graticula)}" fill="none" stroke="#9FC0C8" stroke-width="0.6"/>
<path d="${paises}" fill="#F1E8D0" stroke="#B5A684" stroke-width="${traco}" stroke-linejoin="round"/>
${destaque ? `<path d="${destaque}" fill="${cor.fill}" fill-opacity="0.85" stroke="${cor.stroke}" stroke-width="${spec.vista === "mundo" ? 0.6 : 1.4}" stroke-linejoin="round"/>` : ""}
${marcador}
</svg>`;
}

function estrela(cx, cy, r, fill, stroke) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * 0.45 : r, a = (-90 + i * 36) * Math.PI / 180;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"/>`;
}

// ── gerar ──
const dirMapas = path.join(site, "img/mapas"), dirBolas = path.join(site, "img/bolas");
fs.mkdirSync(dirMapas, { recursive: true });
fs.mkdirSync(dirBolas, { recursive: true });

let erros = 0;
for (const carta of CARTAS) {
  const spec = REGIOES[carta.id];
  if (!spec) { console.error(`✗ ${carta.id}: sem região em scripts/regioes.mjs`); erros++; continue; }
  try {
    const svgMapa = mapaSVG(carta, spec);
    fs.writeFileSync(path.join(dirMapas, `${carta.id}.svg`), svgMapa);
    fs.writeFileSync(path.join(dirBolas, `${carta.id}.svg`), bolaSVG(carta.id));
    console.log(`✓ ${carta.id.padEnd(12)} mapa ${(svgMapa.length / 1024).toFixed(0).padStart(4)} KB`);
  } catch (e) {
    console.error(`✗ ${carta.id}: ${e.message}`);
    erros++;
  }
}
if (erros) process.exit(1);
