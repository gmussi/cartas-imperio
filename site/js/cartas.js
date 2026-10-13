/* Renderização das cartas — compartilhado entre index.html e imprimir.html. */
(function () {
  const fmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

  const ICONES = {
    // torre
    "cidade-estado": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h3v3h2V3h4v3h2V3h3v6l-2 2v10H7V11L5 9z M11 21v-4a1 1 0 0 1 2 0v4z" fill="currentColor"/></svg>',
    // coroa
    "reino": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 11H5z M5 20h14v2H5z" fill="currentColor"/></svg>',
    // águia/coroa imperial com louros
    "imperio": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2 3h-4zM6 7l3 2 3-3 3 3 3-2-1 7H7z M7 15h10v2H7z" fill="currentColor"/><path d="M3 9c0 6 3 10 8 12M21 9c0 6-3 10-8 12" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>'
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function renderCarta(c, numero, total) {
    const tipo = globalThis.TIPOS[c.tipo];
    return `
<article class="carta tipo-${c.tipo}" data-id="${c.id}" data-tipo="${c.tipo}">
  <div class="moldura">
    <header class="titulo">
      <h2 class="nome">${esc(c.nome)}</h2>
      <p class="oficial">${esc(c.nomeCompleto)}</p>
    </header>
    <img class="bola" src="img/bolas/${c.id}.svg" alt="Countryball: ${esc(c.nome)}">
    <figure class="mapa"><img src="img/mapas/${c.id}.svg" alt="Mapa aproximado: ${esc(c.nomeCompleto)}"></figure>
    <div class="linha-tipo">
      <span class="icone">${ICONES[c.tipo]}</span>
      <span class="tipo">${tipo.rotulo}</span>
      <span class="periodo">${esc(c.periodo)}</span>
    </div>
    <div class="caixa-texto">
      <div class="area">
        <span class="rotulo">Área no auge</span>
        <span class="valor">≈ ${fmt.format(c.area)} <small>km²</small></span>
      </div>
      <dl class="dados">
        <div><dt>Capital</dt><dd>${esc(c.capital)}</dd></div>
        <div><dt>Auge</dt><dd>${esc(c.auge)}</dd></div>
      </dl>
      <p class="texto">${esc(c.texto)}</p>
    </div>
    <footer class="rodape"><span>Cartas do Império</span><span>${String(numero).padStart(2, "0")}/${total}</span></footer>
  </div>
</article>`;
  }

  // Reduz a fonte dos nomes/textos longos até caberem.
  function ajustarTextos(raiz) {
    raiz.querySelectorAll(".carta").forEach((carta) => {
      for (const sel of [".nome", ".oficial", ".dados dd"]) {
        carta.querySelectorAll(sel).forEach((el) => {
          // --ajuste é um fator relativo, então vale para qualquer escala (tela ou impressão).
          let k = 1;
          el.style.setProperty("--ajuste", k);
          while (el.scrollWidth > el.clientWidth + 0.5 && k > 0.5) {
            k *= 0.95;
            el.style.setProperty("--ajuste", k.toFixed(3));
          }
        });
      }
    });
  }

  globalThis.Cartas = { renderCarta, ajustarTextos, fmt };
})();
