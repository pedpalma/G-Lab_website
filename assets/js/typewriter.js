/**
 * typewriter.js
 * assets/js/typewriter.js
 *
 * Efeito de digitação no span .hero__title--accent do Hero.
 * Digita, apaga e passa para a próxima palavra em loop.

/** Palavras que serão alternadas no destaque do título */
var WORDS = ["limites", "interrupções", "travamentos", "instabilidade"];

/** Velocidades em ms */
var TYPE_SPEED = 80;
var DELETE_SPEED = 45;
var PAUSE_AFTER = 2200;
var PAUSE_BEFORE = 400;

export function initTypewriter() {
  var el = document.querySelector(".hero__title--accent");
  if (!el) return;

  /* Cursor piscante */
  el.classList.add("typewriter");

  var wordIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function tick() {
    var word = WORDS[wordIndex % WORDS.length];
    var current = word.substring(0, charIndex);
    el.textContent = current;

    var delay = deleting ? DELETE_SPEED : TYPE_SPEED;

    if (!deleting && charIndex === word.length) {
      /* Pausa no fim da palavra antes de apagar */
      deleting = true;
      delay = PAUSE_AFTER;
    } else if (deleting && charIndex === 0) {
      /* Passa para a próxima palavra */
      deleting = false;
      wordIndex++;
      delay = PAUSE_BEFORE;
    }

    charIndex += deleting ? -1 : 1;
    setTimeout(tick, delay);
  }

  /* Começa após um pequeno delay para não competir com o page load */
  setTimeout(tick, 900);
}
