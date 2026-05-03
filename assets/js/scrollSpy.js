export function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    /* Offset: altura do header fixo + margem de conforto */
    const offset = 90;
    let current = "";

    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top <= offset) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
}
