// =========================
// Contadores animados
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const options = {
    root: null,
    threshold: 0.3,
  };

  const animateCounter = (entry) => {
    const counter = entry.target;
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry);
        obs.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
});

// =========================
// Navbar oculta al hacer scroll hacia abajo
// =========================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scroll hacia abajo -> ocultar navbar
    navbar.classList.add('navbar-hidden');
  } else {
    // Scroll hacia arriba -> mostrar navbar
    navbar.classList.remove('navbar-hidden');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // evitar negativos
});

// =========================
// Modal abrir/cerrar
// =========================
function abrirModal() {
  document.getElementById('modal-rin').classList.add('open');
}

function cerrarModal() {
  document.getElementById('modal-rin').classList.remove('open');
}

// =========================
// Cambiar imagen principal desde miniaturas
// =========================
function changeMainImage(thumbnail) {
  const mainImage = document.getElementById('mainImage');
  mainImage.src = thumbnail.src;
}

// =========================
// ScrollReveal animaciones
// =========================
ScrollReveal().reveal('.contenedor-rines', {
  distance: '20px',
  duration: 1000,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  origin: 'bottom',
  opacity: 0,
  interval: 100,
  reset: false
});

ScrollReveal().reveal('.seccion-rines-premium h2', {
  distance: '40px',
  duration: 1000,
  origin: 'top',
  delay: 200,
  reset: false
});

ScrollReveal().reveal('.descripcion-rines', {
  distance: '40px',
  duration: 1000,
  origin: 'bottom',
  delay: 400,
  reset: false
});

ScrollReveal().reveal('.boton-cta', {
  distance: '30px',
  duration: 1000,
  origin: 'bottom',
  delay: 600,
  reset: false
});
