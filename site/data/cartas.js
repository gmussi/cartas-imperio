/*
 * Cartas do Império — dados das cartas.
 *
 * Cada carta tem:
 *   id           identificador (usado para os arquivos img/mapas/<id>.svg e img/bolas/<id>.svg)
 *   tipo         "cidade-estado" | "reino" | "imperio"
 *   nome         nome curto exibido no topo da carta
 *   nomeCompleto nome oficial / histórico
 *   periodo      período de existência
 *   auge         ano de referência para a área
 *   capital      capital (no auge)
 *   area         área aproximada no auge, em km²
 *   texto        texto de ambientação
 *
 * Os mapas e as bolas são gerados por `npm run build` (veja scripts/).
 */
globalThis.CARTAS = [
  // ───────────── CIDADES-ESTADO ─────────────
  {
    id: "vaticano", tipo: "cidade-estado",
    nome: "Vaticano", nomeCompleto: "Estado da Cidade do Vaticano",
    periodo: "1929 – hoje", auge: "atual", capital: "Cidade do Vaticano",
    area: 0.49,
    texto: "O menor país do mundo fica dentro de Roma e é governado pelo Papa."
  },
  {
    id: "monaco", tipo: "cidade-estado",
    nome: "Mônaco", nomeCompleto: "Principado de Mônaco",
    periodo: "1297 – hoje", auge: "atual", capital: "Mônaco",
    area: 2.08,
    texto: "Governado pela família Grimaldi há mais de 700 anos, à beira do Mediterrâneo."
  },
  {
    id: "sanmarino", tipo: "cidade-estado",
    nome: "San Marino", nomeCompleto: "Sereníssima República de San Marino",
    periodo: "301 – hoje", auge: "atual", capital: "Cidade de San Marino",
    area: 61,
    texto: "Considerada a república mais antiga do mundo, no alto do Monte Titano."
  },
  {
    id: "atenas", tipo: "cidade-estado",
    nome: "Atenas", nomeCompleto: "Pólis de Atenas",
    periodo: "c. 508 – 322 a.C.", auge: "séc. V a.C.", capital: "Atenas",
    area: 2500,
    texto: "Berço da democracia, a pólis dominava toda a península da Ática."
  },

  // ───────────── REINOS ─────────────
  {
    id: "inglaterra", tipo: "reino",
    nome: "Inglaterra", nomeCompleto: "Reino da Inglaterra",
    periodo: "927 – 1707", auge: "1542", capital: "Londres",
    area: 151000,
    texto: "Unificado por Etelstano, uniu-se à Escócia em 1707 para formar a Grã-Bretanha."
  },
  {
    id: "escocia", tipo: "reino",
    nome: "Escócia", nomeCompleto: "Reino da Escócia",
    periodo: "843 – 1707", auge: "1472", capital: "Edimburgo",
    area: 78800,
    texto: "Resistiu por séculos às invasões inglesas até a União de 1707."
  },
  {
    id: "franca", tipo: "reino",
    nome: "França", nomeCompleto: "Reino da França",
    periodo: "987 – 1792", auge: "1789", capital: "Paris",
    area: 530000,
    texto: "Dos Capetos a Luís XIV, o Rei Sol, até cair na Revolução Francesa."
  },
  {
    id: "portugal", tipo: "reino",
    nome: "Portugal", nomeCompleto: "Reino de Portugal",
    periodo: "1139 – 1910", auge: "1500", capital: "Lisboa",
    area: 92000,
    texto: "Pioneiro das Grandes Navegações, abriu o caminho marítimo para as Índias."
  },
  {
    id: "prussia", tipo: "reino",
    nome: "Prússia", nomeCompleto: "Reino da Prússia",
    periodo: "1701 – 1918", auge: "1910", capital: "Berlim",
    area: 348780,
    texto: "Estado militarista que liderou a unificação da Alemanha em 1871."
  },
  {
    id: "hungria", tipo: "reino",
    nome: "Hungria", nomeCompleto: "Reino da Hungria",
    periodo: "1000 – 1918", auge: "1910", capital: "Budapeste",
    area: 325400,
    texto: "Fundado por Santo Estêvão, foi um bastião da Europa contra os otomanos."
  },
  {
    id: "polonia", tipo: "reino",
    nome: "Polônia-Lituânia", nomeCompleto: "República das Duas Nações",
    periodo: "1569 – 1795", auge: "1619", capital: "Varsóvia",
    area: 990000,
    texto: "Uma das maiores nações da Europa, com reis eleitos pela nobreza."
  },
  {
    id: "russia", tipo: "reino",
    nome: "Rússia", nomeCompleto: "Czarado da Rússia",
    periodo: "1547 – 1721", auge: "1700", capital: "Moscou",
    area: 15280000,
    texto: "Ivã, o Terrível, foi coroado o primeiro czar; o reino chegou ao Pacífico."
  },
  {
    id: "persia", tipo: "reino",
    nome: "Pérsia", nomeCompleto: "Pérsia Safávida",
    periodo: "1501 – 1736", auge: "1600", capital: "Isfahan",
    area: 2850000,
    texto: "Os xás safávidas fizeram de Isfahan uma das cidades mais belas do mundo."
  },

  // ───────────── IMPÉRIOS ─────────────
  {
    id: "romano", tipo: "imperio",
    nome: "Roma", nomeCompleto: "Império Romano",
    periodo: "27 a.C. – 476 d.C.", auge: "117 d.C.", capital: "Roma",
    area: 5000000,
    texto: "Sob Trajano, dominava todo o Mediterrâneo, o seu “Mare Nostrum”."
  },
  {
    id: "bizantino", tipo: "imperio",
    nome: "Bizâncio", nomeCompleto: "Império Bizantino",
    periodo: "330 – 1453", auge: "555", capital: "Constantinopla",
    area: 2700000,
    texto: "Herdeiro de Roma no Oriente, resistiu por mais de mil anos."
  },
  {
    id: "otomano", tipo: "imperio",
    nome: "Otomano", nomeCompleto: "Império Otomano",
    periodo: "1299 – 1922", auge: "1683", capital: "Constantinopla",
    area: 5200000,
    texto: "Conquistou Constantinopla em 1453 e chegou às portas de Viena."
  },
  {
    id: "mongol", tipo: "imperio",
    nome: "Mongol", nomeCompleto: "Império Mongol",
    periodo: "1206 – 1368", auge: "1279", capital: "Caracórum",
    area: 24000000,
    texto: "O maior império contíguo da história, fundado por Gengis Khan."
  },
  {
    id: "aquemenida", tipo: "imperio",
    nome: "Aquemênida", nomeCompleto: "Império Aquemênida",
    periodo: "550 – 330 a.C.", auge: "500 a.C.", capital: "Persépolis",
    area: 5500000,
    texto: "Fundado por Ciro, o Grande, ligava o Egito à Índia pela Estrada Real."
  },
  {
    id: "macedonico", tipo: "imperio",
    nome: "Macedônia", nomeCompleto: "Império Macedônico",
    periodo: "336 – 323 a.C.", auge: "323 a.C.", capital: "Babilônia",
    area: 5200000,
    texto: "Alexandre, o Grande, conquistou o mundo conhecido em apenas 13 anos."
  },
  {
    id: "britanico", tipo: "imperio",
    nome: "Britânico", nomeCompleto: "Império Britânico",
    periodo: "1583 – 1997", auge: "1920", capital: "Londres",
    area: 35500000,
    texto: "O império onde o sol nunca se punha: um quarto das terras do planeta."
  },
  {
    id: "russo", tipo: "imperio",
    nome: "Rússia Imperial", nomeCompleto: "Império Russo",
    periodo: "1721 – 1917", auge: "1895", capital: "São Petersburgo",
    area: 22800000,
    texto: "Governado pelos Romanov, estendia-se do Mar Báltico ao Oceano Pacífico."
  },
  {
    id: "espanhol", tipo: "imperio",
    nome: "Espanhol", nomeCompleto: "Império Espanhol",
    periodo: "1492 – 1976", auge: "1790", capital: "Madri",
    area: 13700000,
    texto: "O primeiro império global, da América às Filipinas, movido a prata."
  },
  {
    id: "portugues", tipo: "imperio",
    nome: "Português", nomeCompleto: "Império Português",
    periodo: "1415 – 1999", auge: "1815", capital: "Lisboa",
    area: 10400000,
    texto: "O primeiro império marítimo global, com terras em quatro continentes."
  }
];

globalThis.TIPOS = {
  "cidade-estado": { rotulo: "Cidade-Estado", plural: "Cidades-Estado" },
  "reino":         { rotulo: "Reino",         plural: "Reinos" },
  "imperio":       { rotulo: "Império",       plural: "Impérios" }
};
