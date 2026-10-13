// Countryballs: bandeira (simplificada), expressão dos olhos e acessórios típicos.
// A bola ocupa o círculo centro (100,110) raio 85; o viewBox (-15 -45 230 255)
// deixa espaço para chapéus em cima e objetos nas laterais.

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
};

// ───────────── Olhos e expressões ─────────────
// Countryballs não têm boca: a expressão vem toda do formato dos olhos.
const OLHO_E = [78, 104], OLHO_D = [128, 104];
const traco = `stroke="#111" stroke-width="4"`;
let seqClip = 0;

const olhoNormal = ([cx, cy], rx = 14, ry = 19) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" ${traco}/>`;

// Olho "cortado" por uma pálpebra reta. lado = -1 (olho esquerdo) ou 1 (direito).
// yFora / yDentro: altura da pálpebra (relativa ao centro) no canto externo / interno.
function olhoCortado([cx, cy], lado, yFora, yDentro) {
  const id = `p${seqClip++}`;
  const xFora = cx + lado * 24, xDentro = cx - lado * 24;
  const a = [xFora, cy + yFora], b = [xDentro, cy + yDentro];
  return `<defs>
      <clipPath id="${id}"><polygon points="${a} ${b} ${xDentro},${cy + 40} ${xFora},${cy + 40}"/></clipPath>
      <clipPath id="${id}e"><ellipse cx="${cx}" cy="${cy}" rx="16" ry="21"/></clipPath>
    </defs>
    <g clip-path="url(#${id})">${olhoNormal([cx, cy])}</g>
    <line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" ${traco} stroke-linecap="round" clip-path="url(#${id}e)"/>`;
}

const arcoFeliz = ([cx, cy]) =>
  `<path d="M${cx - 13},${cy + 6} Q${cx},${cy - 22} ${cx + 13},${cy + 6}" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>`;
const arcoSereno = ([cx, cy]) =>
  `<path d="M${cx - 13},${cy - 4} Q${cx},${cy + 16} ${cx + 13},${cy - 4}" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>`;

const par = (yFora, yDentro) => olhoCortado(OLHO_E, -1, yFora, yDentro) + olhoCortado(OLHO_D, 1, yFora, yDentro);

const EXPRESSOES = {
  normal: () => olhoNormal(OLHO_E) + olhoNormal(OLHO_D),
  bravo: () => par(-22, -2),
  determinado: () => par(-18, -9),
  triste: () => par(-2, -20),
  convencido: () => par(-4, 0),          // pálpebras quase retas: ar superior
  desconfiado: () => par(5, 5),           // olhos bem fechados, de canto
  feliz: () => arcoFeliz(OLHO_E) + arcoFeliz(OLHO_D),
  sereno: () => arcoSereno(OLHO_E) + arcoSereno(OLHO_D),
  piscando: () => olhoNormal(OLHO_E) + arcoFeliz(OLHO_D),
  surpreso: () => olhoNormal([75, 100], 16, 23) + olhoNormal([131, 100], 16, 23),
  oculos: () => `<g ${traco} stroke-linejoin="round">
      <rect x="56" y="92" width="42" height="26" rx="10" fill="#111"/>
      <rect x="108" y="92" width="42" height="26" rx="10" fill="#111"/>
      <path d="M98,100 Q103,95 108,100" fill="none"/></g>
    <path d="M64,98 L74,98 M116,98 L126,98" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`,
};

// ───────────── Acessórios ─────────────
// Chapéus ficam no topo (y ≈ 25); objetos ficam nos cantos de baixo, "segurados" pela bola.
const T = `stroke="#111" stroke-width="3" stroke-linejoin="round"`;

const louros = (cor) => {
  let s = "";
  for (let i = 0; i < 7; i++) {
    for (const ang of [200 + i * 11, 340 - i * 11]) {
      const r = (ang * Math.PI) / 180;
      const x = (100 + 84 * Math.cos(r)).toFixed(1), y = (110 + 84 * Math.sin(r)).toFixed(1);
      s += `<ellipse cx="${x}" cy="${y}" rx="11" ry="5" fill="${cor}" stroke="#111" stroke-width="2" transform="rotate(${ang + (ang < 270 ? 50 : -50)} ${x} ${y})"/>`;
    }
  }
  return s + `<circle cx="100" cy="26" r="5" fill="${cor}" stroke="#111" stroke-width="2"/>`;
};

const xicara = (liquido, x = 170, y = 172) => `<g transform="translate(${x} ${y})">
    <path d="M-6,-24 q-6,-8 0,-16 M8,-24 q-6,-8 0,-16" fill="none" stroke="#8a8a8a" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="0" cy="24" rx="30" ry="6" fill="#fff" ${T}/>
    <path d="M21,-6 C34,-6 34,12 18,12" fill="none" stroke="#111" stroke-width="4"/>
    <path d="M-22,-12 H22 Q20,20 0,22 Q-20,20 -22,-12 Z" fill="#fff" ${T}/>
    <ellipse cx="0" cy="-12" rx="22" ry="4" fill="${liquido}" ${T}/>
    <path d="M-20,0 H20" stroke="#2B59C3" stroke-width="3"/></g>`;

const ACESSORIOS = {
  vaticano: { frente: [`<g transform="translate(100 28) rotate(-8)">
      <path d="M-28,6 L-28,-26 L0,-58 L28,-26 L28,6 Z" fill="#FFFFFF" stroke="#111" stroke-width="4"/>
      <rect x="-4" y="-44" width="8" height="40" fill="#D4AF37"/><rect x="-14" y="-32" width="28" height="8" fill="#D4AF37"/></g>`] },

  monaco: {
    atras: [`<line x1="14" y1="205" x2="14" y2="52" stroke="#555" stroke-width="5" stroke-linecap="round"/>`],
    frente: [(() => {
      let s = `<g transform="translate(-12 54)">`;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++)
        s += `<rect x="${c * 6.5}" y="${r * 9}" width="6.5" height="9" fill="${(r + c) % 2 ? "#fff" : "#111"}"/>`;
      return s + `<rect width="26" height="27" fill="none" ${T}/></g>`;
    })()],
  },

  sanmarino: { frente: [`<g transform="translate(30 166)">
      <path d="M-8,-58 V-40" stroke="#555" stroke-width="2"/><path d="M-8,-58 L6,-54 L-8,-50 Z" fill="#5EB6E4" stroke="#111" stroke-width="1.5"/>
      <path d="M-16,-40 h6 v6 h4 v-6 h6 v6 h4 v-6 h6 v6 h4 v-6 h6 V36 H-16 Z" fill="#D8CFC0" ${T}/>
      <path d="M-4,36 V22 a6,6 0 0 1 12,0 V36" fill="#5a4636" ${T}/>
      <rect x="-3" y="-20" width="6" height="10" fill="#5a4636"/></g>`] },

  atenas: { frente: [louros("#8A9A3B"), `<g transform="translate(172 168)">
      <path d="M-7,-30 C-18,-30 -18,-14 -10,-10 M7,-30 C18,-30 18,-14 10,-10" fill="none" stroke="#111" stroke-width="3"/>
      <path d="M-7,-34 h14 v8 C18,-18 20,0 12,16 L5,30 h-10 L-12,16 C-20,0 -18,-18 -7,-26 Z" fill="#C8642B" ${T}/>
      <path d="M-15,-2 H15 M-14,8 H14" stroke="#1a1a1a" stroke-width="4"/></g>`] },

  inglaterra: { frente: [`<g transform="translate(98 30) rotate(-8)">
      <ellipse cx="0" cy="4" rx="48" ry="8" fill="#222" ${T}/>
      <path d="M-30,4 C-30,-42 30,-42 30,4 Z" fill="#222" ${T}/>
      <rect x="-30" y="-6" width="60" height="7" fill="#7A1F1F"/></g>`, xicara("#A0522D")] },

  escocia: { frente: [`<g transform="translate(100 32) rotate(-10)">
      <ellipse cx="0" cy="-4" rx="54" ry="15" fill="#1F5E3A" ${T}/>
      <path d="M-44,-4 H44 M-30,-14 V6 M-10,-18 V9 M10,-18 V9 M30,-14 V6" stroke="#0B2E1C" stroke-width="3"/>
      <path d="M-46,0 H46" stroke="#C8102E" stroke-width="2"/>
      <rect x="-42" y="4" width="84" height="9" rx="3" fill="#1a1a1a" ${T}/>
      <circle cx="0" cy="-20" r="10" fill="#C8102E" ${T}/></g>`] },

  franca: { frente: [`<g transform="translate(110 30) rotate(14)">
      <path d="M-2,-14 l2,-10" stroke="#111" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="0" cy="0" rx="52" ry="16" fill="#1a1a1a" ${T}/></g>`,
    `<g transform="translate(40 168) rotate(-38)">
      <rect x="-52" y="-10" width="104" height="20" rx="10" fill="#D9A35B" ${T}/>
      <path d="M-34,-6 l8,12 M-12,-6 l8,12 M10,-6 l8,12 M32,-6 l8,12" stroke="#A86B2A" stroke-width="3" stroke-linecap="round"/></g>`] },

  portugal: { frente: [`<g transform="translate(166 176) rotate(-20)">
      <path d="M26,0 L44,-14 L42,14 Z" fill="#E8DCC0" ${T}/>
      <path d="M-34,0 C-18,-18 14,-18 28,0 C14,18 -18,18 -34,0 Z" fill="#E8DCC0" ${T}/>
      <path d="M-8,-10 C-4,-2 -4,4 -8,10 M4,-10 C8,-2 8,4 4,10" fill="none" stroke="#B7A57E" stroke-width="2.5"/>
      <circle cx="-22" cy="-3" r="3" fill="#111"/></g>`] },

  prussia: { frente: [`<g transform="translate(104 44) rotate(-8)">
      <path d="M-52,6 C-52,-46 52,-46 52,6 Z" fill="#1a1a1a" stroke="#111" stroke-width="4"/>
      <path d="M-58,6 L58,6" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
      <circle cx="0" cy="-14" r="10" fill="#C9A227" stroke="#111" stroke-width="2"/>
      <path d="M-6,-34 L0,-72 L6,-34 Z" fill="#C9A227" stroke="#111" stroke-width="2"/>
      <rect x="-11" y="-40" width="22" height="8" rx="2" fill="#C9A227" stroke="#111" stroke-width="2"/></g>`,
    `<g transform="translate(34 174)">
      <path d="M0,16 C-34,-4 -26,-30 -6,-22 C8,-16 8,6 0,16 C-8,6 -8,-16 6,-22 C26,-30 34,-4 0,16 Z" fill="none" stroke="#111" stroke-width="13" stroke-linejoin="round"/>
      <path d="M0,16 C-34,-4 -26,-30 -6,-22 C8,-16 8,6 0,16 C-8,6 -8,-16 6,-22 C26,-30 34,-4 0,16 Z" fill="none" stroke="#9C5A23" stroke-width="8" stroke-linejoin="round"/>
      <g fill="#fff"><circle cx="-18" cy="-14" r="1.6"/><circle cx="16" cy="-18" r="1.6"/><circle cx="-6" cy="4" r="1.6"/><circle cx="20" cy="-4" r="1.6"/></g></g>`,
    `<g transform="translate(170 168)">
      <path d="M18,-12 C36,-12 36,16 18,16" fill="none" stroke="#111" stroke-width="9"/>
      <path d="M18,-12 C36,-12 36,16 18,16" fill="none" stroke="#C9A227" stroke-width="4"/>
      <rect x="-19" y="-20" width="38" height="46" rx="5" fill="#F2B632" ${T}/>
      <path d="M-8,-10 V18 M0,-10 V18 M8,-10 V18" stroke="#D99A1E" stroke-width="2.5"/>
      <path d="M-22,-18 q4,-14 12,-8 q6,-12 14,-3 q9,-9 18,2 v7 h-44 Z" fill="#fff" ${T}/></g>`] },

  hungria: { frente: [`<g transform="translate(100 32) rotate(-8)">
      <path d="M22,-22 C42,-58 32,-72 20,-64 C26,-52 22,-40 16,-26 Z" fill="#fff" ${T}/>
      <rect x="-36" y="-30" width="72" height="36" rx="10" fill="#3B2A1E" ${T}/>
      <path d="M-28,-26 V2 M-14,-28 V4 M0,-28 V4 M14,-28 V4 M28,-26 V2" stroke="#5a4232" stroke-width="3"/>
      <path d="M-22,-30 Q0,-46 22,-30 Z" fill="#C8102E" ${T}/></g>`,
    `<g transform="translate(170 172) rotate(22)">
      <path d="M-2,-20 c0,-8 6,-12 12,-12" fill="none" stroke="#2E7D32" stroke-width="5" stroke-linecap="round"/>
      <path d="M-10,-18 C10,-24 20,-6 14,10 C8,26 -4,32 -7,24 C-12,8 -22,-10 -10,-18 Z" fill="#D7261E" ${T}/>
      <path d="M-4,-12 C2,-12 4,-6 2,0" fill="none" stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"/></g>`] },

  polonia: { atras: [(() => {
    // asas dos hussardos alados
    let s = "";
    for (const lado of [-1, 1]) {
      const p0 = [100 + lado * 50, 160], p1 = [100 + lado * 100, 70], p2 = [100 + lado * 62, -30];
      const pt = (t) => [0, 1].map((k) => (1 - t) ** 2 * p0[k] + 2 * (1 - t) * t * p1[k] + t * t * p2[k]);
      s += `<path d="M${p0} Q${p1} ${p2}" fill="none" stroke="#7A4A1F" stroke-width="7" stroke-linecap="round"/>`;
      for (let i = 0; i <= 9; i++) {
        const [x, y] = pt(0.12 + i * 0.095);
        s += `<ellipse cx="${(x + lado * 9).toFixed(1)}" cy="${y.toFixed(1)}" rx="13" ry="5" fill="#fff" stroke="#111" stroke-width="2" transform="rotate(${lado * (-20 - i * 6)} ${(x + lado * 9).toFixed(1)} ${y.toFixed(1)})"/>`;
      }
    }
    return s;
  })()] },

  russia: { frente: [`<g transform="translate(100 28) rotate(-6)">
      <path d="M-34,6 V-46 Q0,-60 34,-46 V6 Z" fill="#5B3A1E" ${T}/>
      <path d="M-24,-48 V2 M-12,-52 V4 M0,-53 V4 M12,-52 V4 M24,-48 V2" stroke="#7a5230" stroke-width="3"/>
      <ellipse cx="0" cy="-48" rx="30" ry="7" fill="#C8102E" ${T}/></g>`,
    `<g transform="translate(170 170)">
      <ellipse cx="0" cy="12" rx="19" ry="22" fill="#D7261E" ${T}/>
      <ellipse cx="0" cy="16" rx="11" ry="14" fill="#F2C230" ${T}/>
      <circle cx="0" cy="16" r="5" fill="#D7261E"/>
      <circle cx="0" cy="-16" r="14" fill="#D7261E" ${T}/>
      <circle cx="0" cy="-15" r="9" fill="#FCE3C8" ${T}/>
      <circle cx="-3.5" cy="-16" r="1.4" fill="#111"/><circle cx="3.5" cy="-16" r="1.4" fill="#111"/>
      <circle cx="-5" cy="-12" r="2" fill="#F48FB1"/><circle cx="5" cy="-12" r="2" fill="#F48FB1"/></g>`] },

  persia: { frente: [`<g transform="translate(100 30) rotate(-6)">
      <rect x="-7" y="-58" width="14" height="50" rx="4" fill="#C8102E" ${T}/>
      <ellipse cx="0" cy="-2" rx="46" ry="16" fill="#F5F0E6" ${T}/>
      <path d="M-40,-8 Q0,6 40,-10 M-42,2 Q0,14 42,0" fill="none" stroke="#c9bfa8" stroke-width="3"/></g>`,
    `<g transform="translate(170 176)">
      <path d="M-7,-14 l2,-10 l5,7 l5,-7 l2,10 Z" fill="#9E1B2E" ${T}/>
      <circle cx="0" cy="2" r="18" fill="#B5172B" ${T}/>
      <path d="M-9,-6 Q-4,-11 2,-10" fill="none" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/></g>`] },

  romano: { frente: [louros("#4E8B3A"), `<g transform="translate(174 166) rotate(28)">
      <path d="M-5,-40 L5,-40 L6,8 L0,16 L-6,8 Z" fill="#D8DEE4" ${T}/>
      <path d="M0,-36 V8" stroke="#9aa4ae" stroke-width="2"/>
      <rect x="-14" y="8" width="28" height="6" rx="2" fill="#C9A227" ${T}/>
      <rect x="-4" y="14" width="8" height="16" fill="#7A4A1F" ${T}/>
      <circle cx="0" cy="33" r="5" fill="#C9A227" ${T}/></g>`] },

  bizantino: {
    atras: [`<circle cx="100" cy="104" r="100" fill="#F2C230" stroke="#B8860B" stroke-width="4"/>
      <circle cx="100" cy="104" r="92" fill="none" stroke="#B8860B" stroke-width="2" stroke-dasharray="4 6"/>`],
    frente: [`<g transform="translate(172 176)">
      <rect x="-3" y="-34" width="6" height="18" fill="#F2C230" ${T}/><rect x="-9" y="-29" width="18" height="6" fill="#F2C230" ${T}/>
      <circle cx="0" cy="0" r="17" fill="#F2C230" ${T}/>
      <path d="M-17,0 H17 M0,-17 V17" stroke="#B8860B" stroke-width="3"/>
      <circle cx="-6" cy="-6" r="3" fill="#C8102E"/></g>`] },

  otomano: { frente: [`<g transform="translate(110 30) rotate(10)">
      <path d="M-26,4 L-20,-38 L20,-38 L26,4 Z" fill="#B0101A" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
      <path d="M0,-38 C14,-40 26,-28 22,-6" fill="none" stroke="#111" stroke-width="4"/>
      <circle cx="22" cy="-4" r="4" fill="#111"/></g>`,
    `<g transform="translate(172 168)">
      <path d="M0,36 C-2,20 0,6 0,-6" fill="none" stroke="#2E7D32" stroke-width="5"/>
      <path d="M0,30 C-16,24 -20,10 -18,2 C-10,8 -4,18 0,30 Z" fill="#3E8E41" ${T}/>
      <path d="M-14,-6 C-16,-24 -10,-32 -6,-34 L0,-24 L6,-34 C10,-32 16,-24 14,-6 Q0,6 -14,-6 Z" fill="#F7B500" ${T}/>
      <path d="M0,-24 V-2" stroke="#D98E00" stroke-width="2.5"/></g>`] },

  mongol: { frente: [`<g transform="translate(100 30) rotate(-8)">
      <path d="M-36,4 C-30,-28 -10,-50 0,-56 C10,-50 30,-28 36,4 Z" fill="#C8102E" ${T}/>
      <circle cx="0" cy="-58" r="5" fill="#F2C230" ${T}/>
      <rect x="-44" y="-6" width="88" height="15" rx="7" fill="#8B5A2B" ${T}/>
      <path d="M-36,-2 V6 M-24,-3 V7 M-12,-3 V7 M0,-3 V7 M12,-3 V7 M24,-3 V7 M36,-2 V6" stroke="#6b4320" stroke-width="2.5"/></g>`,
    `<g transform="translate(36 160) rotate(-25)">
      <path d="M0,-52 L0,52" stroke="#ddd" stroke-width="2"/>
      <path d="M2,-52 C-8,-50 -26,-24 -22,0 C-26,24 -8,50 2,52" fill="none" stroke="#111" stroke-width="9" stroke-linecap="round"/>
      <path d="M2,-52 C-8,-50 -26,-24 -22,0 C-26,24 -8,50 2,52" fill="none" stroke="#8B5A2B" stroke-width="5" stroke-linecap="round"/>
      <path d="M-10,0 H58" stroke="#5a3a1a" stroke-width="3.5"/>
      <path d="M58,-6 L70,0 L58,6 Z" fill="#9aa4ae" ${T}/>
      <path d="M-10,0 l-8,-7 M-4,0 l-8,-7 M-10,0 l-8,7 M-4,0 l-8,7" stroke="#C8102E" stroke-width="3"/></g>`] },

  aquemenida: { atras: [`<line x1="190" y1="200" x2="190" y2="-24" stroke="#111" stroke-width="9" stroke-linecap="round"/>
      <line x1="190" y1="200" x2="190" y2="-24" stroke="#8B5A2B" stroke-width="5" stroke-linecap="round"/>
      <path d="M190,-42 L198,-22 L190,-14 L182,-22 Z" fill="#D8DEE4" ${T}/>
      <circle cx="190" cy="204" r="8" fill="#E2B13C" ${T}/>`],
    frente: [`<g transform="translate(100 28) rotate(-6)">
      <path d="M-30,6 L-26,-40 H26 L30,6 Z" fill="#E2B13C" ${T}/>
      <path d="M-20,-38 V4 M-8,-40 V5 M4,-40 V5 M16,-38 V4" stroke="#B8860B" stroke-width="3"/></g>`] },

  macedonico: { frente: [`<g transform="translate(100 34) rotate(-8)">
      <path d="M-36,-20 C-26,-70 26,-70 36,-20 C22,-40 -22,-40 -36,-20 Z" fill="#C8102E" ${T}/>
      <path d="M-46,8 C-46,-38 46,-38 46,8 Z" fill="#C9A227" ${T}/>
      <rect x="-6" y="-34" width="12" height="10" fill="#C9A227" ${T}/>
      <path d="M-40,0 H40" stroke="#8a6d16" stroke-width="3"/></g>`] },

  britanico: { frente: [`<g transform="translate(96 26) rotate(-10)">
      <rect x="-48" y="-2" width="96" height="10" rx="4" fill="#111"/>
      <rect x="-30" y="-56" width="60" height="58" fill="#111"/>
      <rect x="-30" y="-14" width="60" height="9" fill="#7A1F1F"/></g>`,
    `<circle cx="128" cy="104" r="21" fill="none" stroke="#C9A227" stroke-width="4"/>
     <path d="M146,114 C152,140 140,160 150,190" fill="none" stroke="#C9A227" stroke-width="2"/>`] },

  russo: { frente: [`<g transform="translate(100 32) rotate(-6)">
      <path d="M-44,2 q-12,32 4,42 q10,-20 8,-42 Z" fill="#A07850" ${T}/>
      <path d="M44,2 q12,32 -4,42 q-10,-20 -8,-42 Z" fill="#A07850" ${T}/>
      <path d="M-42,8 C-42,-38 42,-38 42,8 Z" fill="#5B3A1E" ${T}/>
      <rect x="-42" y="-8" width="84" height="18" rx="9" fill="#A07850" ${T}/>
      <circle cx="0" cy="1" r="6" fill="#FFD200" ${T}/></g>`,
    `<g transform="translate(168 168)">
      <rect x="-3" y="-40" width="6" height="10" fill="#B8860B" ${T}/>
      <rect x="-9" y="-31" width="18" height="10" rx="2" fill="#D4AF37" ${T}/>
      <circle cx="-22" cy="-4" r="5" fill="none" stroke="#111" stroke-width="3"/><circle cx="22" cy="-4" r="5" fill="none" stroke="#111" stroke-width="3"/>
      <path d="M-15,-22 C-23,0 -23,16 -14,22 H14 C23,16 23,0 15,-22 Z" fill="#D4AF37" ${T}/>
      <path d="M-12,22 L-16,32 H16 L12,22" fill="#B8860B" ${T}/>
      <path d="M18,6 H28 V12" fill="none" stroke="#111" stroke-width="3"/>
      <path d="M-10,-10 Q-12,4 -8,14" fill="none" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/></g>`] },

  espanhol: { frente: [`<g transform="translate(100 30) rotate(-8)">
      <path d="M-4,-44 C-2,-58 12,-62 18,-56 C8,-54 4,-50 4,-42 Z" fill="#C8102E" ${T}/>
      <path d="M-22,-10 C-12,-48 12,-48 22,-10 Z" fill="#C0C7CF" ${T}/>
      <path d="M-56,6 C-44,-4 -32,-4 -26,2 C-26,-28 26,-28 26,2 C32,-4 44,-4 56,6 C40,16 -40,16 -56,6 Z" fill="#C0C7CF" ${T}/>
      <path d="M-26,2 C-10,8 10,8 26,2" fill="none" stroke="#8a939c" stroke-width="2.5"/></g>`,
    `<g transform="translate(172 178)">${[[0, 14], [-6, 6], [6, -2], [-2, -10]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="6" fill="#F2C230" ${T}/>`).join("")}<path d="M-6,-12 h8" stroke="#B8860B" stroke-width="2"/></g>`] },

  portugues: { frente: [`<g transform="translate(166 170)">
      <path d="M0,10 V-40" stroke="#5a3a1a" stroke-width="3.5"/>
      <path d="M0,-40 L14,-36 L0,-32 Z" fill="#C8102E"/>
      <path d="M-18,-34 Q0,-28 18,-34 V0 Q0,6 -18,0 Z" fill="#fff" ${T}/>
      <path d="M-3,-28 h6 v6 h6 v6 h-6 v8 h-6 v-8 h-6 v-6 h6 Z" fill="#C8102E"/>
      <path d="M-34,8 H34 L24,26 H-24 Z" fill="#8B5A2B" ${T}/>
      <path d="M-28,16 H28" stroke="#5a3a1a" stroke-width="2"/></g>`] },

};

// Expressão de cada bola.
export const EXPRESSAO_POR_CARTA = {
  vaticano: "sereno", monaco: "oculos", sanmarino: "feliz", atenas: "normal",
  inglaterra: "convencido", escocia: "bravo", franca: "convencido", portugal: "feliz", prussia: "bravo",
  hungria: "determinado", polonia: "determinado", russia: "desconfiado", persia: "sereno",
  romano: "convencido", bizantino: "triste", otomano: "bravo",
  mongol: "bravo", aquemenida: "sereno", macedonico: "determinado", britanico: "convencido", russo: "desconfiado",
  espanhol: "surpreso", portugues: "piscando",
};

export function bolaSVG(id) {
  const bandeira = BANDEIRAS[id];
  if (!bandeira) throw new Error(`Sem bandeira para "${id}"`);
  const expr = EXPRESSOES[EXPRESSAO_POR_CARTA[id] ?? "normal"];
  const { atras = [], frente = [] } = ACESSORIOS[id] ?? {};
  seqClip = 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -45 230 255" width="230" height="255">
  <defs>
    <clipPath id="c"><circle cx="100" cy="110" r="85"/></clipPath>
    <radialGradient id="brilho" cx="35%" cy="30%" r="75%">
      <stop offset="0" stop-color="#fff" stop-opacity="0.35"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.28"/>
    </radialGradient>
  </defs>
  ${atras.join("\n  ")}
  <ellipse cx="100" cy="197" rx="62" ry="6" fill="#000" opacity="0.18"/>
  <g clip-path="url(#c)">${bandeira}<circle cx="100" cy="110" r="85" fill="url(#brilho)"/></g>
  <circle cx="100" cy="110" r="85" fill="none" stroke="#111" stroke-width="5"/>
  ${expr()}
  ${frente.join("\n  ")}
</svg>`;
}
