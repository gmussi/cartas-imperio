// Extensão territorial aproximada de cada carta.
//
// O território é montado a partir das fronteiras ATUAIS (Natural Earth 1:50m):
//   paises   lista de países modernos (nomes como em world-atlas/countries-50m.json).
//            Cada item pode ser uma string ou { nome, recorte } / { nome, caixa }.
//   recorte  polígono [lon, lat] que corta todos os países (fronteiras históricas grosseiras).
//   caixa    atalho para um recorte retangular [lonMin, latMin, lonMax, latMax].
//   ponto    marcador [lon, lat] (usado nas cidades-estado, que são pequenas demais).
//   raio     meia-largura da vista, em graus, ao redor do ponto.
//   capital  [lon, lat] da capital, marcada com uma estrela.
//            Longitudes acima de 180 são permitidas (para cruzar o antimeridiano).
//   vista    "mundo" para impérios espalhados pelo globo.
//
// São aproximações didáticas, não mapas históricos rigorosos.

export const REGIOES = {
  // ───────────── REINOS ─────────────
  inglaterra: {
    paises: ["United Kingdom"],
    recorte: [[-3.05, 54.98], [-3.6, 54.7], [-5.0, 54.0], [-5.6, 51.6], [-6.5, 49.8], [2.0, 50.8], [2.0, 55.0], [-2.0, 55.8], [-2.6, 55.3]],
    capital: [-0.1276, 51.5072]
  },
  escocia: {
    paises: ["United Kingdom"],
    recorte: [[-2.0, 55.8], [-2.6, 55.3], [-3.05, 54.98], [-3.6, 54.7], [-5.2, 54.5], [-5.95, 55.3], [-6.6, 55.45], [-8.5, 56], [-8, 59], [0, 61.5], [0, 56]],
    capital: [-3.1883, 55.9533]
  },
  franca: {
    paises: ["France"],
    recorte: [[-6, 42], [-6, 51.5], [3, 51.6], [8.5, 49.4], [7.8, 47.6], [6.1, 46.4], [5.75, 45.6], [6.1, 45.0], [6.9, 44.4], [7.2, 43.6], [7.2, 43.0], [10, 43.2], [10, 41.2], [8, 41.2], [3.5, 42.2], [-1.5, 43.0]],
    capital: [2.3522, 48.8566]
  },
  portugal: { paises: ["Portugal"], caixa: [-10, 36.8, -6, 42.2], capital: [-9.1393, 38.7223] },
  prussia: {
    paises: ["Germany", "Poland", "Russia", "Lithuania"],
    recorte: [[5.9, 51.8], [5.9, 50.8], [6.3, 49.2], [7.4, 49.1], [8.2, 49.9], [9.6, 50.3], [10.3, 50.7], [11.6, 51.3], [12.3, 51.6], [13.2, 51.5], [14.7, 51.0], [15.5, 50.5], [16.5, 50.1], [17.6, 49.9], [18.6, 49.9], [19.1, 50.3], [18.4, 51.3], [17.6, 52.0], [18.5, 52.6], [19.6, 53.0], [21.5, 53.3], [22.9, 53.9], [22.9, 54.4], [22.6, 55.1], [21.3, 56.0], [19, 55.6], [14, 54.8], [11, 54.9], [9.5, 55.2], [8.2, 55.2], [7.5, 54.2], [7.0, 53.6], [7.1, 52.3]],
    capital: [13.405, 52.52]
  },
  hungria: {
    paises: ["Hungary", "Slovakia", "Romania", "Croatia", "Serbia", "Ukraine", "Austria", "Slovenia", "Poland"],
    recorte: [[16.4, 47.8], [17.0, 48.0], [16.9, 48.6], [17.3, 48.8], [18.0, 49.3], [18.8, 49.5], [19.5, 49.6], [20.3, 49.4], [21.5, 49.4], [22.6, 49.1], [23.5, 48.4], [24.6, 47.9], [25.3, 47.6], [26.0, 46.9], [26.4, 46.0], [26.0, 45.5], [25.5, 45.4], [24.5, 45.35], [23.0, 45.3], [22.4, 44.6], [21.4, 44.8], [20.3, 44.8], [19.4, 44.9], [18.0, 45.1], [16.9, 45.2], [15.8, 44.7], [15.4, 44.3], [15.1, 44.6], [14.5, 45.2], [15.2, 45.5], [15.7, 45.9], [16.1, 46.4], [16.3, 46.9]],
    capital: [19.0402, 47.4979]
  },
  polonia: {
    paises: ["Poland", "Lithuania", "Latvia", "Estonia", "Belarus", "Ukraine", "Russia"],
    recorte: [[17.0, 54.6], [16.3, 53.4], [15.9, 52.3], [17.0, 51.4], [17.6, 51.3], [18.9, 50.0], [19.5, 49.4], [22.5, 49.0], [24.5, 48.0], [27, 48.3], [28.5, 48.1], [30.5, 47.8], [34.0, 48.5], [35.0, 50.0], [34.5, 51.5], [35.0, 52.5], [34.0, 54.5], [32, 55.8], [30.0, 56.5], [28, 57.5], [27.5, 58.0], [23, 57.8], [21, 57.6], [21, 56], [21.2, 55.3], [19.5, 54.9], [18, 55.0]],
    capital: [21.0122, 52.2297]
  },
  russia: {
    paises: ["Russia", "Ukraine"],
    recorte: [[28, 60], [30.5, 55.5], [31, 53], [30.5, 51.5], [30.4, 50.4], [31, 49.5], [33.5, 49.0], [36, 49.0], [40, 48.5], [44, 48], [47, 46], [48.5, 45], [50, 46.5], [55, 51], [60, 52], [70, 54], [80, 52], [88, 50], [100, 51], [110, 50.5], [120, 53], [125, 55], [135, 56], [140, 57], [191, 57], [191, 82], [28, 82]],
    capital: [37.6173, 55.7558]
  },
  persia: {
    paises: ["Iran", "Azerbaijan", "Armenia", "Georgia", "Iraq", "Afghanistan", "Turkmenistan", "Bahrain", "Pakistan"],
    recorte: [[43, 42], [46.5, 42.5], [48.5, 42], [50, 40.5], [53, 40], [54, 38.5], [56, 39], [60, 38], [62.5, 37.5], [65, 37], [66.5, 35], [67, 33], [68, 30], [66.5, 28], [62, 25], [56, 24], [50, 25.5], [48, 29.5], [46, 29], [43, 32.5], [41, 34], [42, 36], [43.5, 37.2], [43, 39], [42.5, 41]],
    capital: [51.668, 32.6546]
  },
  // ───── Reinos necessários para conquistar o Império Britânico ─────
  india:    { paises: ["India"],    capital: [77.209, 28.6139] },
  paquistao: { paises: ["Pakistan"], capital: [73.0479, 33.6844] },
  canada:   { paises: ["Canada"],   capital: [-75.6972, 45.4215] },
  eua: {
    paises: ["United States of America"],
    caixa: [-170, 24, -66, 72],
    capital: [-77.0369, 38.9072]
  },
  novazelandia: { paises: ["New Zealand"], caixa: [165, -48, 179, -34], capital: [174.7762, -41.2865] },
  australia:    { paises: ["Australia"],   caixa: [112, -44, 154, -9],   capital: [149.13, -35.2809] },
  africadosul:  { paises: ["South Africa"], caixa: [16, -35.5, 33.5, -22], capital: [28.1881, -25.7461] },

  // ───────────── IMPÉRIOS ─────────────
  romano: {
    paises: ["Italy", "San Marino", "Vatican", "Monaco", "Malta", "France", "Spain", "Portugal", "Andorra", "United Kingdom",
      "Belgium", "Netherlands", "Luxembourg", "Germany", "Switzerland", "Liechtenstein", "Austria", "Slovenia", "Croatia",
      "Bosnia and Herz.", "Serbia", "Montenegro", "Kosovo", "Albania", "Macedonia", "Greece", "Bulgaria", "Romania", "Hungary",
      "Slovakia", "Turkey", "Cyprus", "N. Cyprus", "Syria", "Lebanon", "Israel", "Palestine", "Jordan", "Iraq", "Kuwait",
      "Armenia", "Georgia", "Egypt", "Libya", "Tunisia", "Algeria", "Morocco", "Saudi Arabia"],
    recorte: [[-10, 36], [-10, 44], [-6.2, 50], [-5.5, 52.0], [-4.6, 53.5], [-3.5, 54.95], [-1.5, 55.1], [0, 55.5], [4.4, 52.2],
      [5.9, 51.85], [6.45, 51.66], [6.95, 50.94], [7.4, 50.5], [8.7, 50.4], [9.0, 50.1], [9.2, 49.5], [9.6, 48.9], [10.6, 49.0],
      [11.6, 48.9], [13.4, 48.6], [14.3, 48.3], [16.4, 48.2], [17.1, 48.1], [18.8, 47.8], [19.0, 47.5], [18.9, 46.0],
      [19.3, 45.2], [20.4, 44.8], [21.3, 45.2], [21.6, 46.3], [22.7, 47.1], [23.6, 47.3], [24.8, 47.0], [25.7, 46.2],
      [25.9, 45.5], [25.3, 44.9], [24.9, 43.7], [26.5, 44.0], [27.9, 44.1], [28.3, 44.8], [29.7, 45.2], [41.5, 42.0],
      [43.5, 41.2], [45.5, 41.3], [46.6, 39.5], [45, 38.5], [44.5, 37.2], [45.5, 35], [46.5, 33], [48.0, 31.0], [48.5, 29.8],
      [46, 29.2], [39, 30], [38.5, 26.5], [36.0, 26.0], [34.5, 24], [32.9, 24.0], [30, 24], [28.5, 25.5], [25.5, 29.5],
      [20, 30.5], [15.5, 31.0], [13, 31.5], [10.5, 31.0], [8.0, 33.0], [5.0, 34.3], [1.0, 35.0], [-1.5, 34.8], [-4.0, 34.2],
      [-6.5, 33.8], [-9.5, 34.5]],
    capital: [12.4964, 41.9028]
  },
  bizantino: {
    paises: ["Turkey", "Greece", "Bulgaria", "Macedonia", "Albania", "Serbia", "Montenegro", "Kosovo", "Bosnia and Herz.",
      "Croatia", "Slovenia", "Italy", "Malta", "San Marino", "Vatican", "Syria", "Lebanon", "Israel", "Palestine", "Jordan",
      "Egypt", "Libya", "Tunisia", "Algeria", "Spain", "Morocco", "Cyprus", "N. Cyprus", "Armenia", "Georgia", "Romania"],
    recorte: [[-6.2, 36.0], [-6, 37.2], [-3, 37.9], [-0.3, 38.6], [1, 39.2], [4.5, 40.3], [7.5, 43.8], [7.0, 45.0], [7.2, 46.0],
      [10, 46.8], [13.5, 46.6], [14.6, 45.8], [16.5, 45.2], [19.3, 44.9], [22.5, 44.5], [28.0, 44.2], [29.7, 45.0],
      [41.8, 42.6], [43.3, 42.0], [43.6, 40.3], [42.0, 38.5], [40.9, 37.2], [39.0, 36.3], [40.4, 35.1], [38.0, 32.5],
      [37.0, 30.5], [35.0, 29.4], [34, 27.5], [33, 24.0], [30, 24], [28.5, 26], [25, 30], [20, 30.6], [15, 31.3], [11, 32.6],
      [8.5, 33.5], [7.5, 35.2], [4.5, 36.3], [1, 36.3], [-2, 35.2], [-5.4, 35.6]],
    capital: [28.9784, 41.0082]
  },
  otomano: {
    paises: ["Turkey", "Greece", "Bulgaria", "Macedonia", "Albania", "Kosovo", "Serbia", "Montenegro", "Bosnia and Herz.",
      "Croatia", "Hungary", "Slovakia", "Romania", "Moldova", "Ukraine", "Russia", "Georgia", "Armenia", "Cyprus", "N. Cyprus",
      "Syria", "Lebanon", "Israel", "Palestine", "Jordan", "Iraq", "Kuwait", "Saudi Arabia", "Egypt", "Libya", "Tunisia", "Algeria"],
    recorte: [[-2, 35.2], [-2, 32.5], [3, 31], [10, 28], [14, 24], [20, 23], [25, 22], [31.5, 22], [36.8, 22.0], [38.5, 21],
      [40.8, 19.8], [41.8, 22.5], [41.5, 26.5], [40, 29.5], [44, 30.5], [47.5, 29.3], [48.6, 29.9], [48, 31], [46, 33],
      [45.6, 35.6], [44.5, 37.4], [44.2, 39.5], [43.6, 41.2], [41.6, 42.5], [37, 45], [38.5, 46.5], [39.4, 47.3], [37, 47.5],
      [35, 47.2], [33, 47.8], [31.5, 48.0], [29, 49.2], [27.3, 49.6], [26.3, 48.6], [25.0, 48.0], [23.5, 48.2], [22.5, 48.4],
      [20.5, 48.5], [18.8, 48.4], [18.0, 48.2], [17.5, 47.4], [17.0, 46.6], [16.2, 46.0], [15.6, 45.3], [15.6, 44.3],
      [16.4, 43.5], [17.6, 42.9], [18.6, 42.4], [19.2, 41.4], [19.6, 39.0], [21, 36], [15, 35], [11.5, 37.5], [9, 37.6],
      [3, 37], [-2, 35.8]],
    capital: [28.9784, 41.0082]
  },
  mongol: {
    paises: ["Mongolia", "China", "North Korea", "South Korea", "Russia", "Kazakhstan", "Kyrgyzstan", "Tajikistan",
      "Uzbekistan", "Turkmenistan", "Afghanistan", "Pakistan", "Iran", "Iraq", "Azerbaijan", "Armenia", "Georgia", "Turkey",
      "Ukraine", "Belarus", "Moldova", "Romania"],
    recorte: [[28.5, 45.3], [26.5, 48.3], [24, 50.5], [24, 52], [28, 54], [30.5, 56], [29, 59], [33, 61], [38, 64], [45, 64],
      [55, 62], [60, 58], [70, 57], [80, 56], [90, 55], [100, 55], [110, 55], [120, 53], [130, 52], [135, 48], [140, 48],
      [134, 43], [131, 42.5], [130, 42], [130.5, 38], [129.5, 34.5], [126, 33], [123, 31], [122, 30], [120, 26], [117, 23],
      [113, 21.5], [111.5, 19.5], [109.5, 17.8], [108, 18.5], [108, 21.5], [106, 22], [103, 22.5], [100, 21.5], [98, 24],
      [97.5, 28], [92, 27], [88, 27.5], [85, 28.5], [81, 30], [78, 32], [74, 34], [71, 33.5], [70, 30], [67, 27],
      [66.5, 25.5], [57, 25.5], [51, 27.5], [48.5, 30], [47, 31], [44.5, 33], [41.5, 34.5], [40, 36], [38, 37.5], [36, 36.5],
      [33, 36.0], [31, 36.7], [29.5, 37.8], [30, 40.5], [31, 41.2]],
    capital: [102.8, 47.2]
  },
  aquemenida: {
    paises: ["Iran", "Iraq", "Turkey", "Syria", "Lebanon", "Israel", "Palestine", "Jordan", "Egypt", "Libya", "Cyprus",
      "N. Cyprus", "Armenia", "Azerbaijan", "Georgia", "Turkmenistan", "Uzbekistan", "Tajikistan", "Afghanistan", "Pakistan",
      "India", "Kyrgyzstan", "Kazakhstan", "Bulgaria", "Greece", "Macedonia", "Saudi Arabia", "Kuwait", "Sudan",
      "United Arab Emirates", "Oman"],
    recorte: [[20, 30.5], [20, 33], [22, 37], [22, 40.5], [21, 40.5], [21, 42], [23, 42.5], [26, 43.5], [28.5, 44.0],
      [29.0, 42.0], [41, 41.5], [44.5, 43], [48, 41.5], [49.5, 40], [53.5, 40.5], [58, 43], [61, 44], [66, 42], [69, 42.5],
      [71, 41], [73, 40], [73.5, 38.5], [71.5, 37], [74, 36], [75, 34], [73, 33.5], [74.5, 32], [72.5, 28], [71, 25],
      [68, 23.5], [62, 25], [57, 25.5], [56.5, 24.5], [55.5, 25.5], [54, 24], [50, 27], [48, 29], [46, 29], [43, 31], [40, 30],
      [38, 29], [36, 28], [35, 28], [33.5, 22], [31, 22], [29, 25], [25, 29.5]],
    capital: [52.89, 29.935]
  },
  macedonico: {
    paises: ["Greece", "Macedonia", "Albania", "Bulgaria", "Turkey", "Cyprus", "N. Cyprus", "Syria", "Lebanon", "Israel",
      "Palestine", "Jordan", "Egypt", "Libya", "Iraq", "Kuwait", "Iran", "Armenia", "Azerbaijan", "Georgia", "Turkmenistan",
      "Uzbekistan", "Tajikistan", "Afghanistan", "Pakistan", "India", "Saudi Arabia"],
    recorte: [[20, 30.5], [19.3, 40.5], [19.5, 41.5], [20.5, 42.2], [23, 42.5], [27, 44], [28.7, 44.0], [29.0, 42.0],
      [41, 41.5], [44.5, 43], [48, 41.5], [49.5, 40], [54, 38.5], [58, 38.5], [62, 38.5], [66, 40.5], [67, 40], [69.5, 40.5],
      [71, 39.5], [72, 37], [74, 35], [75, 32.5], [75.5, 31.5], [74, 29], [71, 25], [68, 23.5], [62, 25], [57, 26], [54, 27],
      [50, 28.5], [48.5, 30], [46, 29], [43, 31], [40, 30], [38, 29], [35, 28], [34.5, 24], [33, 22.5], [31, 22], [29, 25],
      [25.5, 29.2]],
    capital: [44.42, 32.54]
  },
  britanico: {
    vista: "mundo",
    paises: ["United Kingdom", "Ireland", "Canada", "Australia", "New Zealand", "India", "Pakistan", "Bangladesh", "Myanmar",
      "Sri Lanka", "Malaysia", "Singapore", "Brunei", "Papua New Guinea", "South Africa", "Namibia", "Botswana", "Lesotho",
      "eSwatini", "Zimbabwe", "Zambia", "Malawi", "Tanzania", "Kenya", "Uganda", "Sudan", "S. Sudan", "Egypt", "Somaliland",
      "Nigeria", "Ghana", "Sierra Leone", "Gambia", "Iraq", "Jordan", "Israel", "Palestine", "Cyprus", "N. Cyprus", "Kuwait",
      "Bahrain", "Qatar", "United Arab Emirates", "Guyana", "Belize", "Jamaica", "Bahamas", "Trinidad and Tobago", "Barbados",
      "Falkland Is.", "Fiji", "Solomon Is.", "Malta", "Mauritius", "Seychelles", "Bermuda", "Hong Kong", "Maldives",
      "Saint Helena", "Cayman Is.", "British Virgin Is.", "Anguilla", "Montserrat", "Antigua and Barb.", "Saint Lucia",
      "St. Vin. and Gren.", "Grenada", "Dominica", "St. Kitts and Nevis",
      { nome: "Yemen", caixa: [43, 12.4, 54, 15.5] },
      { nome: "Cameroon", caixa: [8.5, 4, 14.5, 10.5] }],
    capital: [-0.1276, 51.5072]
  },
  russo: {
    paises: ["Russia", "Finland", "Åland", "Estonia", "Latvia", "Lithuania", "Belarus", "Ukraine", "Moldova", "Poland",
      "Georgia", "Armenia", "Azerbaijan", "Turkey", "Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan"],
    recorte: [[21, 56], [21.3, 55.3], [22.8, 54.4], [22, 53.4], [20, 53.2], [18.7, 52.6], [18, 52.2], [18.4, 51.3],
      [19.3, 50.4], [21.5, 50.3], [22.8, 50.6], [24.1, 50.8], [25.5, 50.2], [26.2, 49.6], [26.4, 48.5], [26.6, 48.3],
      [27.5, 47.8], [28.1, 46.9], [28.2, 45.5], [29.7, 45.2], [41.5, 41.5], [42.6, 40.9], [42.6, 40.2], [43.6, 39.8],
      [44.8, 39.7], [46.5, 38.9], [48.0, 38.4], [48.9, 38.4], [50, 38.5], [53.9, 37.3], [57.3, 38.0], [60.5, 36.6],
      [62.3, 35.3], [65, 37.3], [68, 37.0], [71.5, 37.0], [74.9, 37.3], [74, 39.5], [76, 40.4], [80.2, 42.2], [80.3, 45.0],
      [82.5, 47.1], [85.5, 47], [87.3, 49.1], [90, 51.5], [94, 52.8], [98, 52.3], [99, 51.6], [102, 51.3], [106.5, 50.3],
      [116, 49.8], [119.7, 50.1], [121.5, 53.3], [127.5, 53.0], [131, 47.7], [135, 48.4], [134, 47.4], [133, 45.5],
      [131, 44.9], [131.2, 43], [130.6, 42.4], [133, 40], [150, 40], [191, 40], [191, 85], [18, 85], [18, 57]],
    capital: [30.3351, 59.9343]
  },
  espanhol: {
    vista: "mundo",
    paises: ["Spain", "Mexico", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica", "Panama", "Cuba",
      "Dominican Rep.", "Puerto Rico", "Colombia", "Venezuela", "Ecuador", "Peru", "Bolivia", "Chile", "Argentina", "Paraguay",
      "Uruguay", "Philippines", "Guam", "N. Mariana Is.", "Eq. Guinea", "Trinidad and Tobago",
      { nome: "United States of America", recorte: [[-125, 49], [-95, 49], [-91, 47], [-90, 43], [-91, 40], [-89, 37], [-90, 35], [-91, 31], [-88, 31], [-82, 31], [-79, 31], [-79, 24], [-125, 24]] }],
    capital: [-3.7038, 40.4168]
  },
  portugues: {
    vista: "mundo",
    paises: ["Portugal", "Brazil", "Angola", "Mozambique", "Guinea-Bissau", "Cabo Verde", "São Tomé and Principe",
      "Timor-Leste", "Macao", { nome: "India", caixa: [73.6, 14.8, 74.4, 15.9] }],
    capital: [-9.1393, 38.7223]
  },
};
