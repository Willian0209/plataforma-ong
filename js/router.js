// router.js
(function () {
  "use strict";

  const Router = {
    init,
    navigate,
    loadPage,
  };

  window.Router = Router;

  function init() {
    const current = getCurrentPage();
    loadPage(current, false);

    window.onpopstate = () => {
      loadPage(getCurrentPage(), false);
    };
  }

  function getCurrentPage() {
    const path = location.pathname.split("/").pop();
    return path || "index.html";
  }

  function navigate(page) {
    history.pushState({}, "", page);
    loadPage(page, true);
  }

  async function loadPage(page) {
    try {
      const res = await fetch(page);
      const text = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const newMain = doc.querySelector("main");
      const currentMain = document.querySelector("main");

      if (newMain && currentMain) {
        currentMain.replaceWith(newMain);
      }

      window.dispatchEvent(new Event("spa:loaded"));
    } catch (err) {
      console.error("Erro ao carregar conteúdo:", err);
    }
  }
})();
