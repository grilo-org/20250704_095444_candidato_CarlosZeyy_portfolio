// Cria estrelas/meteoros
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelector(".stars");
  const starCount = 50;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.opacity = Math.random();
    star.style.animationDuration = `${5 + Math.random() * 10}s`;
    stars.appendChild(star);
  }
});

// Efeito de texto dinamico
const words = ["Desenvolvedor", "Designer", "Criativo", "Freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const textElement = document.querySelector(".changing-text");
const cursorElement = document.querySelector(".cursor");

function typeWriter() {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);

  textElement.textContent = currentChar;

  cursorElement.style.opacity = isDeleting ? 0 : 1;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeWriter, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, 50);
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeWriter, 1000);
  }
}

typeWriter();

// Menu hamburguer - Menu mobile
function hamburg() {
  const dropdown = document.querySelector(".dropdown");
  dropdown.style.transform = "translateY(0)";
  dropdown.style.display = "flex";
}

function cancel() {
  const dropdown = document.querySelector(".dropdown");
  dropdown.style.transform = "translateY(-500px)";
  setTimeout(() => {
    dropdown.style.display = "none";
  }, 300);
}

// Modo claro/escuro
function lightDarkMode() {
  const body = document.body;
  const darkModeIcon = document.querySelector(".dark-mode i");

  darkModeIcon.classList.toggle("fa-moon");
  darkModeIcon.classList.toggle("fa-sun");

  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    darkModeIcon.style.color = "#333";
  } else {
    darkModeIcon.style.color = "white";
  }
}

// Galeria de projetos
let currentGallery = 1;
let currentSlide = 0;
const projectsGalleries = {
  1: [
    "./src/PrintEcommerce1.png",
    "./src/PrintEcommerce2.png",
    "./src/PrintEcommerce3.png",
    "./src/PrintEcommerce4.png",
    "./src/PrintEcommerce5.png",
    "./src/PrintEcommerce6.png",
    "./src/PrintEcommerce7.png",
    "./src/PrintEcommerce8.png",
    "./src/PrintEcommerce9.png",
    "./src/PrintEcommerce10.png",
    "./src/PrintEcommerce11.png",
    "./src/PrintEcommerce12.png",
  ],
  2: [
    "./src/PrintSpotity1.png",
    "./src/PrintSpotity2.png",
    "./src/PrintSpotity3.png",
    "./src/PrintSpotity4.png",
  ],
  3: [
    "./src/PrintTicTacToe1.png",
    "./src/PrintTicTacToe2.png",
    "./src/PrintTicTacToe3.png",
    "./src/PrintTicTacToe4.png",
  ],
};

function openGallery(projectId) {
  currentGallery = projectId;
  currentSlide = 0;
  document.getElementById("galleryImage").src = projectsGalleries[projectId][0];
  document.getElementById("galleryModal").style.display = "block";
}

function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
}

function plusSlides(n) {
  document.getElementById("galleryImage").style.opacity = 0;

  setTimeout(() => {
    currentSlide += n;
    const gallery = projectsGalleries[currentGallery];

    if (currentSlide >= gallery.length) {
      currentSlide = 0;
    } else if (currentSlide < 0) {
      currentSlide = gallery.length - 1;
    }

    document.getElementById("galleryImage").src = gallery[currentSlide];

    // Fade in
    document.getElementById("galleryImage").style.opacity = 1;
  }, 300); // Tempo deve corresponder à transição CSS
}

// Fechar modal ao clicar fora da imagem
window.onclick = function (event) {
  const modal = document.getElementById("galleryModal");
  if (event.target == modal) {
    closeGallery();
  }
};

// Navegação por teclado
document.addEventListener("keydown", function (event) {
  const modal = document.getElementById("galleryModal");
  if (modal.style.display === "block") {
    if (event.key === "Escape") {
      closeGallery();
    } else if (event.key === "ArrowLeft") {
      plusSlides(-1);
    } else if (event.key === "ArrowRight") {
      plusSlides(1);
    }
  }
});

// * Formulario de contato

class FormSubmit {
  constructor(configs) {
    this.configs = configs;
    this.form = document.querySelector(configs.form);
    this.formButton = document.querySelector(configs.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySucess() {
    this.form.innerHTML = this.configs.success;
  }

  displayError() {
    this.form.innerHTML = this.configs.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySucess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h2 class='success'>Mensagem Enviada!</h2>",
  error: "<h2 class='error'>Não foi possivel enviar sua mensagem.</h2>",
});

formSubmit.init();
