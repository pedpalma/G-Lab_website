
// Lista de imagens do slider.

const SLIDES = [
    './assets/images/background-portrait.jpg',
];

/** Intervalo entre as trocas em milissegundos */
const INTERVAL = 5000;

export function initHeroSlider() {
  /* Precisa de ao menos 2 imagens para o slider fazer sentido */
  if (SLIDES.length < 2) return;

  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  /* Remove o background-image inline que estava no CSS */
  heroBg.style.backgroundImage = 'none';

  /* Cria uma div de slide para cada imagem e injeta no hero__bg */
  var slideEls = SLIDES.map(function(src, i) {
    var div = document.createElement('div');
    div.className    = 'hero__slide' + (i === 0 ? ' is-active' : '');
    div.style.backgroundImage = 'url("' + src + '")';
    heroBg.appendChild(div);
    return div;
  });

  /* Cria os dots de navegação e injeta no .hero (acima do conteúdo) */
  var hero = document.querySelector('.hero');
  var nav  = document.createElement('div');
  nav.className = 'hero__slider-nav';
  nav.setAttribute('aria-label', 'Navegação do slider');

  var dots = SLIDES.map(function(_, i) {
    var btn = document.createElement('button');
    btn.className = 'hero__slider-dot' + (i === 0 ? ' is-active' : '');
    btn.setAttribute('aria-label', 'Slide ' + (i + 1));
    btn.addEventListener('click', function() {
      goTo(i);
      resetTimer();
    });
    nav.appendChild(btn);
    return btn;
  });

  hero.appendChild(nav);

  var current = 0;
  var timer   = null;

  function goTo(index) {
    /* Desativa slide e dot atual */
    slideEls[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');

    current = index % SLIDES.length;

    /* Ativa o próximo */
    slideEls[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function next() {
    goTo((current + 1) % SLIDES.length);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  /* Inicia o timer automático */
  resetTimer();

  /* Pausa quando a aba/janela perde foco (economiza recursos) */
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      resetTimer();
    }
  });
}