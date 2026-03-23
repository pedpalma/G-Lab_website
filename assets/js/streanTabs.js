import { observeReveal } from './scrollReveal.js';

export function initStreamTabs() {
  const streamTabs  = document.querySelectorAll('.stream-tab');
  const streamGrids = document.querySelectorAll('[id^="grid-"]');

  if (!streamTabs.length || !streamGrids.length) return;

  streamTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      /* Desativa todas as sub-abas e esconde todos os grids */
      streamTabs.forEach(t => {
        t.classList.remove('stream-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      streamGrids.forEach(g => g.classList.add('is-hidden'));

      /* Ativa a sub-aba clicada */
      tab.classList.add('stream-tab--active');
      tab.setAttribute('aria-selected', 'true');

      /* Exibe o grid correspondente ao data-stream */
      const grid = document.getElementById(`grid-${tab.dataset.stream}`);
      if (grid) {
        grid.classList.remove('is-hidden');
        observeReveal();
      }
    });
  });
}
