export function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;

  /**
   * Abre ou fecha o menu mobile.
   * @param {boolean} [forceClose=false] se true, sempre fecha independente do estado atual.
   */
  function setMenuOpen(forceClose = false) {
    const willOpen = forceClose
      ? false
      : !hamburger.classList.contains("is-open");

    /* Atualiza o botão hamburguer (CSS transforma em X) */
    hamburger.classList.toggle("is-open", willOpen);
    hamburger.setAttribute("aria-expanded", String(willOpen));

    /* Abre ou fecha o overlay do menu */
    mobileMenu.classList.toggle("is-open", willOpen);
    mobileMenu.setAttribute("aria-hidden", String(!willOpen));

    /* Bloqueia o scroll do body enquanto o menu está aberto */
    document.body.style.overflow = willOpen ? "hidden" : "";
  }

  /* Clique no hamburguer: alterna o estado */
  hamburger.addEventListener("click", () => setMenuOpen());

  /* Clique em qualquer link de navegação: fecha o menu */
  mobileMenu.querySelectorAll(".mobile-menu__link").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(true));
  });

  /* Clique nos botões de ação do menu mobile: fecha o menu */
  mobileMenu.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => setMenuOpen(true));
  });

  /* Tecla Escape: fecha o menu */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(true);
  });
}
