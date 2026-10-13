/* Página de listagem: filtros, busca, ordenação e tamanho. */
(function () {
  const { renderCarta, ajustarTextos } = globalThis.Cartas;
  const CARTAS = globalThis.CARTAS.map((c, i) => ({ ...c, numero: i + 1 }));
  const total = CARTAS.length;

  const grade = document.getElementById("grade");
  const busca = document.getElementById("busca");
  const ordem = document.getElementById("ordem");
  const zoom = document.getElementById("zoom");
  const resumo = document.getElementById("resumo");
  const vazio = document.getElementById("vazio");
  const chips = [...document.querySelectorAll(".chip")];

  const estado = { filtro: "todos", busca: "", ordem: "numero" };
  const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  // Monta todas as cartas uma vez; filtros só mostram/ocultam e reordenam.
  grade.innerHTML = CARTAS.map((c) => renderCarta(c, c.numero, total)).join("");
  const elementos = new Map([...grade.children].map((el) => [el.dataset.id, el]));

  chips.forEach((chip) => {
    const f = chip.dataset.filtro;
    chip.querySelector(".contagem").textContent = f === "todos" ? total : CARTAS.filter((c) => c.tipo === f).length;
  });

  const ordenadores = {
    numero: (a, b) => a.numero - b.numero,
    nome: (a, b) => a.nome.localeCompare(b.nome, "pt-BR"),
    "area-desc": (a, b) => b.area - a.area,
    "area-asc": (a, b) => a.area - b.area,
  };

  function atualizar() {
    const termo = semAcento(estado.busca.trim());
    const visiveis = CARTAS
      .filter((c) => estado.filtro === "todos" || c.tipo === estado.filtro)
      .filter((c) => !termo || semAcento(`${c.nome} ${c.nomeCompleto} ${c.capital}`).includes(termo))
      .sort(ordenadores[estado.ordem]);

    const ids = new Set(visiveis.map((c) => c.id));
    elementos.forEach((el, id) => { el.hidden = !ids.has(id); });
    visiveis.forEach((c) => grade.appendChild(elementos.get(c.id)));

    vazio.hidden = visiveis.length > 0;
    resumo.textContent = `${visiveis.length} de ${total} cartas`;
    chips.forEach((ch) => {
      const ativo = ch.dataset.filtro === estado.filtro;
      ch.classList.toggle("ativo", ativo);
      ch.setAttribute("aria-pressed", ativo);
    });
  }

  function aplicarZoom() {
    grade.style.setProperty("--escala", `${zoom.value}mm`);
    ajustarTextos(grade);
  }

  chips.forEach((ch) => ch.addEventListener("click", () => { estado.filtro = ch.dataset.filtro; atualizar(); }));
  busca.addEventListener("input", () => { estado.busca = busca.value; atualizar(); });
  ordem.addEventListener("change", () => { estado.ordem = ordem.value; atualizar(); });
  zoom.addEventListener("change", () => {
    try { localStorage.setItem("cartas-zoom", zoom.value); } catch (e) { /* sem armazenamento */ }
    aplicarZoom();
  });

  try {
    const salvo = localStorage.getItem("cartas-zoom");
    if (salvo && [...zoom.options].some((o) => o.value === salvo)) zoom.value = salvo;
  } catch (e) { /* sem armazenamento */ }

  atualizar();
  aplicarZoom();
  document.fonts?.ready.then(() => ajustarTextos(grade));
})();
