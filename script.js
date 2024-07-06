document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("blur", () => {
    window.document.title = "Volta aqui poxa :/";
  });
  document.addEventListener("focus", () => {
    window.document.title = "Código Certo Trilha";
  });
  const textsToHighlight = document.querySelectorAll(".text");
  textsToHighlight.forEach((element) => {
    highlightText(element);
  });
});


function highlightText(element) {
  const originalText = element.textContent;
  const createSpans = () => {
    element.innerHTML = "";
    for (const char of originalText) {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("char");
      element.appendChild(span);
    }
  };
  createSpans();
  element.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    const chars = element.querySelectorAll(".char");
    let withinBounds = true;
    chars.forEach((char) => {
      const { left, right, top, bottom } = char.getBoundingClientRect();
      if (
        clientX >= left &&
        clientX <= right &&
        clientY >= top &&
        clientY <= bottom
      ) {
        withinBounds = false;
      }
      char.classList.toggle("highlighted", withinBounds);
    });
  });
  //  NOTE: without removing give a efffect more read
  element.addEventListener("mouseleave", () => {
    // element.innerHTML = originalText; // Remove os spans quando o mouse sai do elemento
    // createSpans();
  });
}
