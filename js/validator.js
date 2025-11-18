// validator.js
(function () {
  "use strict";

  window.Validator = {
    initForm,
  };

  function initForm() {
    const form = document.getElementById("formCadastro");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const errors = [];

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const cpf = form.cpf.value.trim();
      const telefone = form.telefone.value.trim();
      const nasc = form.nascimento.value;

      if (!nome) errors.push("Nome é obrigatório.");
      if (!validateEmail(email)) errors.push("E-mail inválido.");
      if (!validateCPF(cpf)) errors.push("CPF inválido.");
      if (!validateTelefone(telefone)) errors.push("Telefone inválido.");
      if (!nasc) errors.push("Data de nascimento inválida.");

      if (errors.length > 0) {
        alert(errors[0]);
        return;
      }

      alert("Cadastro enviado com sucesso!");
      form.reset();
    });
  }

  function validateEmail(e) {
    return /\S+@\S+\.\S+/.test(e);
  }

  function validateTelefone(t) {
    const d = t.replace(/\D/g, "");
    return d.length >= 10;
  }

  function validateCPF(cpf) {
    const n = cpf.replace(/\D/g, "");
    if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
    return true;
  }
})();
