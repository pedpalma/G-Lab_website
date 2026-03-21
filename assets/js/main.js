/* Este arquivo importa e inicializa todos os módulos JS após o DOM estar completamente carregado. */

import { initHeaderScroll  } from './headerScroll.js';
import { initMobileMenu    } from './mobileMenu.js';
import { initScrollSpy     } from './scrollSpy.js';
import { initSmoothScroll  } from './smoothScroll.js';
import { initScrollReveal  } from './scrollReveal.js';
import { initTabs          } from './tabs.js';
import { initStreamTabs    } from './streamTabs.js';
import { initFaq           } from './faq.js';
import { initStatsCounter  } from './statsCounter.js';

/* ── Aguarda o DOM estar pronto ── */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Header — sombra ao rolar */
  initHeaderScroll();

  /* 2. Menu mobile — hamburguer + overlay */
  initMobileMenu();

  /* 3. Scroll Spy — destaca o link ativo na nav desktop */
  initScrollSpy();

  /* 4. Smooth Scroll — rolagem suave para âncoras */
  initSmoothScroll();

  /* 5. Scroll Reveal — fade-in dos elementos .reveal */
  initScrollReveal();

  /* 6. Tabs de planos — Internet / Streaming */
  initTabs();

  /* 7. Sub-tabs de streaming — Max / WatchBR */
  initStreamTabs();

  /* 8. FAQ Accordion — abre/fecha perguntas */
  initFaq();

  /* 9. Stats Counter — anima os números do hero */
  initStatsCounter();

});
