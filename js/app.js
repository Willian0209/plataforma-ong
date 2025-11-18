// app.js
(function () {
  "use strict";

  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Carrega router depois templates e depois validator
  loadScript("js/router.js", () => {
    loadScript("js/template.js", () => {
      loadScript("js/validator.js", () => {
        init();
      });
    });
  });

  function init() {
    // Iniciar roteador SPA
    if (window.Router) Router.init();

    // Renderiza cards quando houver container de projetos
    if (window.Templates && Templates.renderProjectCards) {
      Templates.renderProjectCards();
    }

    // Validação do formulário
    if (window.Validator) Validator.initForm();

    // Atualiza anos no footer
    document.querySelectorAll("#ano, #ano2, #ano3").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });

    // Captura links internos e transforma em navegação SPA
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignora links externos
      if (/^https?:\/\//.test(href)) return;

      // SPA somente para .html
      if (href.endsWith(".html")) {
        e.preventDefault();
        Router.navigate(href);
      }
    });

    // Reexecuta funções quando página interna é carregada
    window.addEventListener("spa:loaded", () => {
      if (window.Templates) Templates.renderProjectCards();
      if (window.Validator) Validator.initForm();
    });
  }
})();
