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
  typeWriter();
  handleFooter();
});

function handleFooter() {
  const openFooterButton = document.querySelector(".open-footer-btn");
  const openFooterButtonMenu = document.querySelector(".open-footer-btn-menu");
  const dialog = document.querySelector("dialog");
  const closeFooterButton = dialog.querySelector("footer button");
  openFooterButton.addEventListener("click", () => dialog.showModal());
  openFooterButtonMenu.addEventListener("click", () => dialog.showModal());
  closeFooterButton.addEventListener("click", () => dialog.close());
}

function typeWriter() {
  const words = [
    "Quero participar da comunidade\n Codigo Certo Coders porque sou\n apaixonado por tecnologia e\n adoro colaborar com outros desenvolvedores. Quero \n aprender mais sobre frontend,\n compartilhar o que sei e fazer\n parte de projetos que\n realmente impactam. Estou \n animado para fazer parte de um\n grupo que valoriza o\n crescimento conjunto e a\n inovação ",
  ];
  const motivacaoSection = document.querySelector("#motivacao");
  const text = motivacaoSection.querySelector("p");

  const typewriter = async () => {
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const currentWord = words[wordIndex];
      for (
        let letterIndex = 0;
        letterIndex <= currentWord.length;
        letterIndex++
      ) {
        text.innerHTML =
          currentWord.substring(0, letterIndex) + '<span class="caret"></span>';
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typewriter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.9 },
  );

  observer.observe(motivacaoSection);
}

function handleCarousel() {
  const nextButton = document.querySelector("#next-carousel-item");
  const prevButton = document.querySelector("#prev-carousel-item");
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slides > div");
  const observerOptions = {
    root: slidesContainer,
    threshold: 0.5,
  };

  let currentSlide = 1;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentSlide = Number(entry.target.id.split("-")[1]);
      }
    });
  }, observerOptions);

  slides.forEach((slide) => {
    observer.observe(slide);
  });

  prevButton.addEventListener("click", () => {
    if (currentSlide === 1) {
      slidesContainer.scrollTo({
        left: slidesContainer.scrollWidth,
      });
    } else {
      slidesContainer.scrollTo({
        left: slidesContainer.scrollLeft - slidesContainer.clientWidth,
      });
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentSlide === 5) {
      slidesContainer.scrollTo({
        left: 0,
      });
    } else {
      slidesContainer.scrollTo({
        left: slidesContainer.scrollLeft + slidesContainer.clientWidth,
      });
    }
  });
}

function hideMenu() {
  const menu = document.querySelector("#contextMenu");
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
  element.addEventListener("mouseleave", () => {
    // element.innerHTML = originalText; 
    // createSpans();
  });
}
