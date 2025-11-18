// template.js
(function () {
  "use strict";

  window.Templates = {
    renderProjectCards,
  };

  const projects = [
    {
      id: "proj1",
      title: "Projeto Educação",
      image: "assets/images/projeto1.webp",
      desc: "Aulas e oficinas educativas.",
      category: "Educação",
    },
    {
      id: "proj2",
      title: "Projeto Saúde",
      image: "assets/images/projeto2.webp",
      desc: "Campanhas de prevenção e atendimento básico.",
      category: "Saúde",
    },
    {
      id: "proj3",
      title: "Projeto Meio Ambiente",
      image: "assets/images/projeto3.webp",
      desc: "Atividades de conscientização e mutirões.",
      category: "Meio Ambiente",
    },
  ];

  function renderProjectCards() {
    const container = document.querySelector(".lista-projetos");
    if (!container) return;

    container.innerHTML = projects
      .map(
        (p) => `
      <article class="projeto card">
        <figure>
          <img src="${p.image}" alt="${p.title}">
        </figure>

        <div class="card-content">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <span class="badge">${p.category}</span>
        </div>
      </article>
    `
      )
      .join("");
  }
})();
