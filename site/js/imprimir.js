/* Versão de impressão: agrupa as cartas em folhas A4 de 3 × 3. */
(function () {
  const { renderCarta, ajustarTextos } = globalThis.Cartas;
  const CARTAS = globalThis.CARTAS.map((c, i) => ({ ...c, numero: i + 1 }));
  const POR_FOLHA = 9;

  const folhas = document.getElementById("folhas");
  const info = document.getElementById("info");
  const form = document.getElementById("opcoes");
  const marcas = document.getElementById("marcas");
  const espaco = document.getElementById("espaco");

  function marcasDeCorte(gap) {
    // Linhas de corte nas bordas de cada coluna e linha, do lado de fora da grade.
    const xs = [], ys = [];
    for (let i = 0; i < 3; i++) {
      xs.push(i * (63 + gap), i * (63 + gap) + 63);
      ys.push(i * (88 + gap), i * (88 + gap) + 88);
    }
    const uniq = (a) => [...new Set(a)];
    return uniq(xs).map((x) => `<i class="marca v" style="--x:${x}mm"></i>`).join("") +
           uniq(ys).map((y) => `<i class="marca h" style="--y:${y}mm"></i>`).join("");
  }

  function montar() {
    const tipos = new Set([...form.querySelectorAll('input[name="tipo"]:checked')].map((i) => i.value));
    const lista = CARTAS.filter((c) => tipos.has(c.tipo));
    const gap = espaco.checked ? 3 : 0;

    let html = "";
    for (let i = 0; i < lista.length; i += POR_FOLHA) {
      const grupo = lista.slice(i, i + POR_FOLHA);
      html += `<section class="folha" aria-label="Folha ${i / POR_FOLHA + 1}">
        <div class="grade-folha" style="--gap:${gap}mm">
          ${grupo.map((c) => renderCarta(c, c.numero, CARTAS.length)).join("")}
          ${marcasDeCorte(gap)}
        </div>
      </section>`;
    }
    folhas.innerHTML = html;
    folhas.classList.toggle("com-marcas", marcas.checked);

    const n = Math.ceil(lista.length / POR_FOLHA);
    info.textContent = lista.length
      ? `${lista.length} cartas em ${n} ${n === 1 ? "folha" : "folhas"} A4.`
      : "Selecione ao menos um tipo de carta.";
    ajustarTextos(folhas);
  }

  form.addEventListener("change", montar);
  document.getElementById("imprimir").addEventListener("click", () => window.print());

  montar();
  document.fonts?.ready.then(() => ajustarTextos(folhas));
})();
