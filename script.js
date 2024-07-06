document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("blur", () => {
    window.document.title = "Volta aqui poxa :/";
  });
  document.addEventListener("focus", () => {
    window.document.title = "Código Certo Trilha";
  });
});
