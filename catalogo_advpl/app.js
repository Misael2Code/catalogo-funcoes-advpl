/**
 * Catalogo de Funcoes ADVPL - Logica da Aplicacao (100% Offline)
 */

document.addEventListener("DOMContentLoaded", function () {
  // Estado da aplicacao
  let allFunctions = window.FUNCOES_ADVPL || [];
  let currentCategory = "todas";
  let searchTerm = "";

  // Elementos do DOM
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoryFiltersContainer = document.getElementById("categoryFilters");
  const tableBody = document.getElementById("tableBody");
  const totalCountEl = document.getElementById("totalCount");
  const filteredCountEl = document.getElementById("filteredCount");
  const noResultsEl = document.getElementById("noResults");
  const tableContainer = document.getElementById("tableContainer");

  // Telas
  const viewList = document.getElementById("viewList");
  const viewDetails = document.getElementById("viewDetails");
  const backToListBtn = document.getElementById("backToListBtn");

  // Elementos da Tela de Detalhes
  const detailTitle = document.getElementById("detailTitle");
  const detailCategory = document.getElementById("detailCategory");
  const detailQuickDesc = document.getElementById("detailQuickDesc");
  const detailSyntax = document.getElementById("detailSyntax");
  const detailReturn = document.getElementById("detailReturn");
  const detailFullDesc = document.getElementById("detailFullDesc");
  const detailParamsContainer = document.getElementById("detailParamsContainer");
  const detailCodeExample = document.getElementById("detailCodeExample");
  const copyCodeBtn = document.getElementById("copyCodeBtn");

  // Normaliza string para comparacoes sem acentos
  function normalizeStr(str) {
    if (!str) return "";
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  // Inicializacao das Categorias
  function initCategories() {
    // Extrai categorias unicas
    const categories = ["todas"];
    allFunctions.forEach((f) => {
      if (f.categoria && !categories.includes(f.categoria)) {
        categories.push(f.categoria);
      }
    });

    categoryFiltersContainer.innerHTML = "";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-btn" + (cat === currentCategory ? " active" : "");
      btn.textContent = cat === "todas" ? "Todas as Categorias" : cat;
      btn.setAttribute("data-category", cat);
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".cat-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = cat;
        renderTable();
      });
      categoryFiltersContainer.appendChild(btn);
    });
  }

  // Renderizacao da Tabela Principal
  function renderTable() {
    const normSearch = normalizeStr(searchTerm.trim());

    const filtered = allFunctions.filter((fn) => {
      // Filtro de categoria
      const matchCat =
        currentCategory === "todas" ||
        fn.categoria.toLowerCase() === currentCategory.toLowerCase();

      if (!matchCat) return false;

      // Filtro de busca
      if (!normSearch) return true;

      const matchName = normalizeStr(fn.nome).includes(normSearch);
      const matchDesc = normalizeStr(fn.descricaoCurta).includes(normSearch);
      const matchFull = normalizeStr(fn.descricaoDetalhada).includes(normSearch);
      const matchSyntax = normalizeStr(fn.sintaxe).includes(normSearch);

      return matchName || matchDesc || matchFull || matchSyntax;
    });

    // Atualiza contadores
    totalCountEl.textContent = allFunctions.length;
    filteredCountEl.textContent = filtered.length;

    // Renderiza linhas
    tableBody.innerHTML = "";

    if (filtered.length === 0) {
      tableContainer.style.display = "none";
      noResultsEl.style.display = "block";
    } else {
      tableContainer.style.display = "block";
      noResultsEl.style.display = "none";

      filtered.forEach((fn) => {
        const tr = document.createElement("tr");
        tr.setAttribute("title", "Clique para ver detalhes de " + fn.nome);

        tr.innerHTML = `
          <td class="col-func">
            <div class="func-name-cell">
              <span class="func-name-tag">${escapeHtml(fn.nome)}</span>
              <span class="func-cat-badge">${escapeHtml(fn.categoria)}</span>
            </div>
          </td>
          <td class="col-syntax">
            <code class="syntax-code">${escapeHtml(fn.sintaxe)}</code>
          </td>
          <td class="col-desc">
            <div class="desc-text">${escapeHtml(fn.descricaoCurta)}</div>
          </td>
        `;

        tr.addEventListener("click", () => {
          navigateToDetail(fn.nome);
        });

        tableBody.appendChild(tr);
      });
    }
  }

  // Navegacao para a Tela de Detalhes
  function navigateToDetail(funcName) {
    window.location.hash = "#" + encodeURIComponent(funcName);
  }

  // Exibicao dos Detalhes da Funcao
  function showDetails(funcName) {
    const fn = allFunctions.find(
      (f) => f.nome.toLowerCase() === funcName.toLowerCase()
    );

    if (!fn) {
      showList();
      return;
    }

    // Preenche dados
    detailTitle.textContent = fn.nome;
    detailCategory.textContent = fn.categoria;
    detailQuickDesc.textContent = fn.descricaoCurta;
    detailSyntax.textContent = fn.sintaxe;
    detailReturn.textContent = fn.retorno || "NIL";
    detailFullDesc.textContent = fn.descricaoDetalhada || fn.descricaoCurta;
    detailCodeExample.textContent = fn.exemplo || "// Sem exemplo disponivel";

    // Parametros
    detailParamsContainer.innerHTML = "";
    if (fn.parametros && fn.parametros.length > 0) {
      let tableHtml = `
        <table class="params-table">
          <thead>
            <tr>
              <th style="width: 25%">Parâmetro</th>
              <th style="width: 20%">Tipo</th>
              <th style="width: 15%">Status</th>
              <th style="width: 40%">Descrição</th>
            </tr>
          </thead>
          <tbody>
      `;

      fn.parametros.forEach((p) => {
        const isOpt = p.opcional === true;
        tableHtml += `
          <tr>
            <td><span class="param-name">&lt;${escapeHtml(p.nome)}&gt;</span></td>
            <td><span class="param-type">${escapeHtml(p.tipo)}</span></td>
            <td>
              <span class="param-req ${isOpt ? "optional" : "mandatory"}">
                ${isOpt ? "Opcional" : "Obrigatório"}
              </span>
            </td>
            <td>${escapeHtml(p.descricao)}</td>
          </tr>
        `;
      });

      tableHtml += `</tbody></table>`;
      detailParamsContainer.innerHTML = tableHtml;
    } else {
      detailParamsContainer.innerHTML = `
        <div style="color: var(--text-muted); font-style: italic; padding: 0.5rem 0;">
          Esta função não recebe parâmetros.
        </div>
      `;
    }

    // Alterna visualizacao
    viewList.style.display = "none";
    viewDetails.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Retorna para a lista principal
  function showList() {
    viewDetails.style.display = "none";
    viewList.style.display = "block";
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }

  // Roteamento baseado no Hash da URL
  function handleHashChange() {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const decodedName = decodeURIComponent(hash);
      showDetails(decodedName);
    } else {
      showList();
    }
  }

  // Escape basico de HTML
  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Copiar Codigo para o Clipboard
  copyCodeBtn.addEventListener("click", function () {
    const code = detailCodeExample.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(code)
        .then(feedbackCopy)
        .catch(() => fallbackCopy(code));
    } else {
      fallbackCopy(code);
    }
  });

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      feedbackCopy();
    } catch (err) {
      alert("Não foi possível copiar o código automaticamente.");
    }
    document.body.removeChild(textArea);
  }

  function feedbackCopy() {
    const originalText = copyCodeBtn.innerHTML;
    copyCodeBtn.classList.add("copied");
    copyCodeBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copiado!
    `;
    setTimeout(() => {
      copyCodeBtn.classList.remove("copied");
      copyCodeBtn.innerHTML = originalText;
    }, 2000);
  }

  // Eventos de Busca
  searchInput.addEventListener("input", function (e) {
    searchTerm = e.target.value;
    clearSearchBtn.style.display = searchTerm ? "block" : "none";
    renderTable();
  });

  clearSearchBtn.addEventListener("click", function () {
    searchInput.value = "";
    searchTerm = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    renderTable();
  });

  // Evento de Voltar
  backToListBtn.addEventListener("click", function () {
    showList();
  });

  // Atalho do Teclado: ESC volta para a lista
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && viewDetails.style.display === "block") {
      showList();
    }
  });

  // Ouvinte de mudanca de Hash (Historico do navegador)
  window.addEventListener("hashchange", handleHashChange);

  // Inicializacao
  initCategories();
  renderTable();
  handleHashChange();
});
