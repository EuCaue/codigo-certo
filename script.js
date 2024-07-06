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

  document.addEventListener("click", hideMenu);
  document.addEventListener("contextmenu", rightClick);
});
//  TODO: animate closing the current menu
function hideMenu() {
  const menu = document.querySelector("#contextMenu");
  menu.classList.add("animate-context-menu");
  const id = setTimeout(() => {
    menu.style.display = "none";
    menu.classList.remove("animate-context-menu");
  }, 500);
  clearTimeout(id);
}

function rightClick(e) {
  e.preventDefault();
  const menu = document.querySelector("#contextMenu");
  if (menu.style.display == "block") return hideMenu();
  menu.style.display = "block";
  menu.style.left = e.pageX + "px";
  menu.style.top = e.pageY + "px";
}

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
