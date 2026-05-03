import { observeReveal } from "./scrollReveal.js";

export function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".planos__content");

  if (!tabBtns.length || !tabPanels.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      /* Desativa todos os botões e painéis */
      tabBtns.forEach((b) => {
        b.classList.remove("tab-btn--active");
        b.setAttribute("aria-selected", "false");
      });
      tabPanels.forEach((p) => p.classList.add("is-hidden"));

      /* Ativa o botão clicado */
      btn.classList.add("tab-btn--active");
      btn.setAttribute("aria-selected", "true");

      /* Exibe o painel correspondente ao data-tab do botão */
      const panel = document.getElementById(`tab-${btn.dataset.tab}`);
      if (panel) {
        panel.classList.remove("is-hidden");
        /* Re-observa .reveal nos novos cards visíveis */
        observeReveal();
      }
    });
  });
}
