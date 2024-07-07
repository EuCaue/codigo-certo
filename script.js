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
  handleCarousel();
});


function handleCarousel() {
  const nextButton = document.querySelector("#next-carousel-item");
  const prevButton = document.querySelector("#prev-carousel-item");
  const slides = document.querySelectorAll(".slides > div");
  const observerOptions = {
    root: document.querySelector(".slides"),
    threshold: 0.5,
  };

  let currentSlide = 1;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentSlide = Number(entry.target.id.split("-")[1]);
        console.log("Currently visible slide:", entry.target.id);
      }
    });
  }, observerOptions);

  slides.forEach((slide) => {
    observer.observe(slide);
  });

  prevButton.addEventListener("click", () => {
    if (currentSlide === 1) {
      prevButton.href = "#slide-5";
    } else {
      prevButton.href = "#slide-" + (currentSlide - 1);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentSlide === 5) {
      nextButton.href = "#slide-1";
    } else {
      nextButton.href = "#slide-" + (currentSlide + 1);
    }
  });
}

function hideMenu() {
  const menu = document.querySelector("#contextMenu");
  const isClickInside = menu.contains(event.target);
  menu.classList.add("hidden");
  setTimeout(() => {
    menu.style.display = "none";
    menu.classList.remove("hidden");
  }, 220);
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
