// Bandeiras (simplificadas) e chapéus das "countryballs".
// A bola ocupa o círculo centro (100,110) raio 85; o viewBox é 0 -30 200 230
// para dar espaço aos chapéus.

const W = 200, TOP = 20, H = 180; // área da bandeira: x 0..200, y 20..200

const rect = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const fundo = (c) => rect(0, TOP, W, H, c);
const faixasH = (cores) => cores.map((c, i) => rect(0, TOP + (H / cores.length) * i, W, H / cores.length + 0.5, c)).join("");
const faixasV = (cores) => cores.map((c, i) => rect((W / cores.length) * i, TOP, W / cores.length + 0.5, H, c)).join("");

function estrela(cx, cy, r, c, pontas = 5, interno = 0.42, rot = -90) {
  const pts = [];
  for (let i = 0; i < pontas * 2; i++) {
    const rr = i % 2 === 0 ? r : r * interno;
    const a = ((rot + (180 / pontas) * i) * Math.PI) / 180;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${c}"/>`;
}

// Crescente: círculo da cor `c` "mordido" por um círculo da cor do fundo.
const crescente = (cx, cy, r, c, bg, dx = r * 0.3, dy = 0, k = 0.82) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/><circle cx="${cx + dx}" cy="${cy + dy}" r="${r * k}" fill="${bg}"/>`;

const sol = (cx, cy, r, c, raios = 12) => {
  let s = "";
  for (let i = 0; i < raios; i++) {
    const a = (i * 360) / raios;
    s += `<rect x="${cx - 1.6}" y="${cy - r * 1.8}" width="3.2" height="${r * 0.7}" fill="${c}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return s + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/>`;
};

const texto = (x, y, t, c, size = 30, extra = "") =>
  `<text x="${x}" y="${y}" fill="${c}" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="${size}" text-anchor="middle" ${extra}>${t}</text>`;

function flor(cx, cy, s, c) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="${c}">
    <path d="M0,-30 C9,-18 9,-7 0,2 C-9,-7 -9,-18 0,-30 Z"/>
    <path d="M-3,-3 C-14,-3 -24,-12 -18,-24 C-16,-14 -9,-11 -2,-9 Z"/>
    <path d="M3,-3 C14,-3 24,-12 18,-24 C16,-14 9,-11 2,-9 Z"/>
    <rect x="-13" y="-3" width="26" height="6" rx="2"/>
    <path d="M-5,3 L5,3 L0,15 Z"/></g>`;
}

function unionJack(x, y, w, h) {
  const cx = x + w / 2, cy = y + h / 2, t = Math.min(w, h);
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#012169"/>
    <path d="M${x},${y} L${x + w},${y + h} M${x + w},${y} L${x},${y + h}" stroke="#fff" stroke-width="${t * 0.2}"/>
    <path d="M${x},${y} L${x + w},${y + h} M${x + w},${y} L${x},${y + h}" stroke="#C8102E" stroke-width="${t * 0.07}"/>
    <rect x="${cx - t * 0.17}" y="${y}" width="${t * 0.34}" height="${h}" fill="#fff"/>
    <rect x="${x}" y="${cy - t * 0.17}" width="${w}" height="${t * 0.34}" fill="#fff"/>
    <rect x="${cx - t * 0.1}" y="${y}" width="${t * 0.2}" height="${h}" fill="#C8102E"/>
    <rect x="${x}" y="${cy - t * 0.1}" width="${w}" height="${t * 0.2}" fill="#C8102E"/></g>`;
}

function esferaArmilar(cx, cy, r, c) {
  return `<g fill="none" stroke="${c}" stroke-width="3">
    <circle cx="${cx}" cy="${cy}" r="${r}"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.35}" transform="rotate(-25 ${cx} ${cy})"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.35}" ry="${r}"/>
    <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"/></g>`;
}

const escudo = (cx, cy, w, fill, stroke) =>
  `<path d="M${cx - w / 2},${cy - w * 0.55} H${cx + w / 2} V${cy} Q${cx + w / 2},${cy + w * 0.6} ${cx},${cy + w * 0.75} Q${cx - w / 2},${cy + w * 0.6} ${cx - w / 2},${cy} Z" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;

// ───────────── Bandeiras ─────────────
export const BANDEIRAS = {
  vaticano: faixasV(["#FFE000", "#FFFFFF"]) +
    `<g transform="translate(150 155) rotate(40)"><rect x="-3" y="-24" width="6" height="40" fill="#D4AF37"/><circle cx="0" cy="-26" r="7" fill="none" stroke="#D4AF37" stroke-width="4"/><rect x="0" y="8" width="10" height="5" fill="#D4AF37"/></g>
     <g transform="translate(150 155) rotate(-40)"><rect x="-3" y="-24" width="6" height="40" fill="#A9A9A9"/><circle cx="0" cy="-26" r="7" fill="none" stroke="#A9A9A9" stroke-width="4"/><rect x="-10" y="8" width="10" height="5" fill="#A9A9A9"/></g>`,
  monaco: faixasH(["#CE1126", "#FFFFFF"]),
  sanmarino: faixasH(["#FFFFFF", "#5EB6E4"]),
  singapura: faixasH(["#EF3340", "#FFFFFF"]) +
    crescente(48, 66, 17, "#fff", "#EF3340", 6, -1, 0.85) +
    [0, 1, 2, 3, 4].map((i) => {
      const a = (-90 + i * 72) * Math.PI / 180;
      return estrela(66 + 9 * Math.cos(a), 66 + 9 * Math.sin(a), 4.2, "#fff");
    }).join(""),
  atenas: fundo("#C8642B") +
    `<g stroke="#1a1a1a" stroke-width="5" fill="none"><path d="M0,132 h20 v-12 h-10 v6 M30,132 h20 v-12 h-10 v6 M60,132 h20 v-12 h-10 v6 M90,132 h20 v-12 h-10 v6 M120,132 h20 v-12 h-10 v6 M150,132 h20 v-12 h-10 v6 M180,132 h20 v-12 h-10 v6"/></g>` +
    texto(100, 174, "ΑΘΕ", "#1a1a1a", 30),
  inglaterra: fundo("#FFFFFF") + rect(84, TOP, 32, H, "#CE1124") + rect(0, 94, W, 32, "#CE1124"),
  escocia: fundo("#005EB8") + `<path d="M0,20 L200,200 M200,20 L0,200" stroke="#fff" stroke-width="32"/>`,
  franca: fundo("#1F3F94") + flor(62, 72, 0.9, "#F2C230") + flor(138, 72, 0.9, "#F2C230") + flor(100, 168, 0.9, "#F2C230"),
  portugal: rect(0, TOP, 90, H, "#0038A8") + rect(90, TOP, 110, H, "#FFFFFF") +
    escudo(90, 160, 34, "#fff", "#C8102E") +
    [[0, -8], [-8, 0], [0, 0], [8, 0], [0, 8]].map(([dx, dy]) => rect(87 + dx, 155 + dy, 6, 6, "#0038A8")).join(""),
  prussia: faixasH(["#FFFFFF", "#000000"]),
  hungria: faixasH(["#CD2A3E", "#FFFFFF", "#436F4D"]),
  polonia: faixasH(["#FFFFFF", "#DC143C"]),
  russia: faixasH(["#FFFFFF", "#0039A6", "#D52B1E"]),
  persia: fundo("#2E7D32") + sol(100, 160, 13, "#F4C430", 14),
  aksum: fundo("#6B1E3A") + `<circle cx="100" cy="146" r="8" fill="#E8B923"/>` + crescente(100, 168, 18, "#E8B923", "#6B1E3A", 0, -8, 0.85),
  congo: fundo("#C8102E") +
    `<g fill="#fff" transform="translate(100 150)"><path d="M-6,-30 L6,-30 L4,-6 L30,-6 L30,6 L4,6 L6,30 L-6,30 L-4,6 L-30,6 L-30,-6 L-4,-6 Z"/></g>`,
  havai: faixasH(["#FFFFFF", "#C8102E", "#012169", "#FFFFFF", "#C8102E", "#012169", "#FFFFFF", "#C8102E"]) + unionJack(0, TOP, 105, 90),
  romano: fundo("#9E1B1B") + `<rect x="10" y="${TOP + 6}" width="180" height="${H - 12}" fill="none" stroke="#E2B13C" stroke-width="5"/>` +
    texto(100, 180, "SPQR", "#E2B13C", 36),
  bizantino: fundo("#B22222") + rect(92, TOP, 16, H, "#F2C230") + rect(0, 112, W, 16, "#F2C230") +
    texto(58, 98, "Β", "#F2C230", 34) + texto(142, 98, "Β", "#F2C230", 34, `transform="scale(-1 1) translate(-284 0)"`) +
    texto(58, 172, "Β", "#F2C230", 34) + texto(142, 172, "Β", "#F2C230", 34, `transform="scale(-1 1) translate(-284 0)"`),
  otomano: fundo("#E30A17") + crescente(82, 158, 24, "#fff", "#E30A17", 7, 0, 0.8) + estrela(116, 158, 11, "#fff", 5, 0.42, 180),
  mongol: fundo("#1F5FA8") +
    `<path d="M100,128 C108,138 104,144 100,146 C96,144 92,138 100,128 Z" fill="#F2C230"/>` +
    `<circle cx="100" cy="158" r="9" fill="#F2C230"/>` + crescente(100, 178, 12, "#F2C230", "#1F5FA8", 0, -6, 0.85),
  aquemenida: fundo("#7A1F1F") +
    `<g fill="#E2B13C"><circle cx="100" cy="158" r="11"/>
      <path d="M88,154 L30,140 L36,150 L28,156 L38,162 L32,170 L88,164 Z"/>
      <path d="M112,154 L170,140 L164,150 L172,156 L162,162 L168,170 L112,164 Z"/>
      <path d="M94,170 L106,170 L112,188 L88,188 Z"/></g>`,
  macedonico: fundo("#B31B1B") + estrela(100, 160, 26, "#F2C230", 16, 0.4) + `<circle cx="100" cy="160" r="7" fill="#F2C230"/>`,
  britanico: unionJack(0, TOP, W, H),
  russo: faixasH(["#000000", "#FFD200", "#FFFFFF"]),
  espanhol: fundo("#FFFFFF") +
    `<g stroke="#C8102E" stroke-width="18" stroke-linecap="round"><line x1="30" y1="40" x2="170" y2="190"/><line x1="170" y1="40" x2="30" y2="190"/></g>` +
    `<g fill="#C8102E">${[[55, 67], [80, 94], [120, 136], [145, 163]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13"/><circle cx="${200 - x}" cy="${y}" r="13"/>`).join("")}</g>`,
  portugues: fundo("#FFFFFF") + `<circle cx="100" cy="158" r="30" fill="#0038A8"/>` + esferaArmilar(100, 158, 24, "#F2C230") +
    escudo(100, 154, 18, "#fff", "#C8102E"),
  inca: faixasH(["#E31B23", "#F7931E", "#FFE600", "#2BA84A", "#2E9BD6", "#1C4FA1", "#6A2C91"]),
  qing: fundo("#F6D23C") + `<circle cx="52" cy="62" r="11" fill="#D7261E"/>` +
    `<path d="M30,175 C60,130 85,190 110,150 S150,120 170,150 S175,185 150,180" fill="none" stroke="#1F4E9C" stroke-width="10" stroke-linecap="round"/>` +
    `<circle cx="168" cy="146" r="7" fill="#1F4E9C"/>`,
  brasil: fundo("#009B3A") + `<polygon points="100,30 192,110 100,190 8,110" fill="#FEDF00"/>` +
    escudo(100, 150, 34, "#009B3A", "#1F3F94") + esferaArmilar(100, 150, 11, "#FEDF00"),
};

// ───────────── Chapéus ─────────────
const CHAPEUS = {
  coroa: `<g transform="translate(100 30) rotate(-12)">
      <path d="M-34,0 L-38,-34 L-20,-14 L0,-40 L20,-14 L38,-34 L34,0 Z" fill="#F2C230" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="0" cy="-10" r="5" fill="#C8102E" stroke="#111" stroke-width="2"/>
      <circle cx="-38" cy="-36" r="4" fill="#F2C230" stroke="#111" stroke-width="2"/>
      <circle cx="0" cy="-42" r="4" fill="#F2C230" stroke="#111" stroke-width="2"/>
      <circle cx="38" cy="-36" r="4" fill="#F2C230" stroke="#111" stroke-width="2"/></g>`,
  louros: (cor = "#3E8E41") => {
    let s = "";
    for (let i = 0; i < 7; i++) {
      const a = 200 + i * 11, b = 340 - i * 11;
      for (const ang of [a, b]) {
        const r = (ang * Math.PI) / 180;
        const x = 100 + 84 * Math.cos(r), y = 110 + 84 * Math.sin(r);
        s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="11" ry="5" fill="${cor}" stroke="#111" stroke-width="2" transform="rotate(${ang + (ang < 270 ? 50 : -50)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }
    }
    return s;
  },
  pickelhaube: `<g transform="translate(104 44) rotate(-8)">
      <path d="M-52,6 C-52,-46 52,-46 52,6 Z" fill="#1a1a1a" stroke="#111" stroke-width="4"/>
      <path d="M-58,6 L58,6" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
      <circle cx="0" cy="-14" r="10" fill="#C9A227" stroke="#111" stroke-width="2"/>
      <path d="M-6,-34 L0,-72 L6,-34 Z" fill="#C9A227" stroke="#111" stroke-width="2"/>
      <rect x="-11" y="-40" width="22" height="8" rx="2" fill="#C9A227" stroke="#111" stroke-width="2"/></g>`,
  cartola: `<g transform="translate(96 26) rotate(-10)">
      <rect x="-48" y="-2" width="96" height="10" rx="4" fill="#111"/>
      <rect x="-30" y="-56" width="60" height="58" fill="#111"/>
      <rect x="-30" y="-14" width="60" height="9" fill="#7A1F1F"/></g>`,
  fez: `<g transform="translate(110 30) rotate(10)">
      <path d="M-26,4 L-20,-38 L20,-38 L26,4 Z" fill="#C8102E" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
      <path d="M0,-38 C14,-40 26,-28 22,-6" fill="none" stroke="#111" stroke-width="4"/>
      <circle cx="22" cy="-4" r="4" fill="#111"/></g>`,
  mitra: `<g transform="translate(100 28) rotate(-8)">
      <path d="M-28,6 L-28,-26 L0,-58 L28,-26 L28,6 Z" fill="#FFFFFF" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
      <rect x="-4" y="-44" width="8" height="40" fill="#D4AF37"/><rect x="-14" y="-32" width="28" height="8" fill="#D4AF37"/></g>`,
};

export const CHAPEU_POR_CARTA = {
  vaticano: "mitra", atenas: "louros-oliva",
  inglaterra: "coroa", escocia: "coroa", franca: "coroa", portugal: "coroa", prussia: "pickelhaube", hungria: "coroa",
  polonia: "coroa", russia: "coroa", persia: "coroa", aksum: "coroa", congo: "coroa", havai: "coroa",
  romano: "louros", bizantino: "coroa", otomano: "fez", aquemenida: "coroa", macedonico: "louros-ouro",
  britanico: "cartola", russo: "coroa", espanhol: "coroa", portugues: "coroa", brasil: "coroa",
};

function chapeu(nome) {
  if (!nome) return "";
  if (nome === "louros") return CHAPEUS.louros();
  if (nome === "louros-oliva") return CHAPEUS.louros("#8A9A3B");
  if (nome === "louros-ouro") return CHAPEUS.louros("#E2B13C");
  return CHAPEUS[nome];
}

export function bolaSVG(id) {
  const bandeira = BANDEIRAS[id];
  if (!bandeira) throw new Error(`Sem bandeira para "${id}"`);
  const monoculo = id === "britanico"
    ? `<circle cx="128" cy="104" r="21" fill="none" stroke="#C9A227" stroke-width="4"/><path d="M146,114 C152,140 140,160 150,190" fill="none" stroke="#C9A227" stroke-width="2"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -30 200 230" width="200" height="230">
  <defs>
    <clipPath id="c"><circle cx="100" cy="110" r="85"/></clipPath>
    <radialGradient id="brilho" cx="35%" cy="30%" r="75%">
      <stop offset="0" stop-color="#fff" stop-opacity="0.35"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.28"/>
    </radialGradient>
  </defs>
  <ellipse cx="100" cy="196" rx="62" ry="6" fill="#000" opacity="0.18"/>
  <g clip-path="url(#c)">${bandeira}<circle cx="100" cy="110" r="85" fill="url(#brilho)"/></g>
  <circle cx="100" cy="110" r="85" fill="none" stroke="#111" stroke-width="5"/>
  <ellipse cx="78" cy="104" rx="14" ry="19" fill="#fff" stroke="#111" stroke-width="4"/>
  <ellipse cx="128" cy="104" rx="14" ry="19" fill="#fff" stroke="#111" stroke-width="4"/>
  ${monoculo}
  ${chapeu(CHAPEU_POR_CARTA[id])}
</svg>`;
}
