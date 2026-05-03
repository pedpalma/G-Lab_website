export function observeReveal() {
  const els = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* Atraso progressivo por índice (stagger) */
          setTimeout(
            () => {
              entry.target.classList.add("is-visible");
            },
            (i % 6) * 75,
          );

          /* Para de observar após animar */
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  els.forEach((el) => observer.observe(el));
}

/**
 * Ponto de entrada: chama observeReveal() na inicialização.
 */
export function initScrollReveal() {
  observeReveal();
}
