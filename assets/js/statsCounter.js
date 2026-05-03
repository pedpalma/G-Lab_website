export function initStatsCounter() {
  const heroStats = document.getElementById("heroStats");
  if (!heroStats) return;

  let statsPlayed = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !statsPlayed) {
        statsPlayed = true;
        animateCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.5 },
  );

  observer.observe(heroStats);

  /**
   * Percorre todos os <strong data-target> dentro de #heroStats
   * e anima cada um independentemente.
   */
  function animateCounters() {
    const els = heroStats.querySelectorAll("strong[data-target]");

    els.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const decimals = parseInt(el.dataset.decimals || "0", 10);

      const duration = 1400; /* ms total da animação */
      const steps = 60;
      const stepVal = target / steps;

      let current = 0;
      let count = 0;

      const interval = setInterval(() => {
        count++;
        current = Math.min(current + stepVal, target);

        /* Formata o número com casas decimais e localização PT-BR */
        const display =
          decimals > 0
            ? current.toFixed(decimals).replace(".", ",")
            : Math.round(current).toLocaleString("pt-BR");

        el.textContent = display + suffix;

        if (count >= steps) {
          /* Garante que o valor exibido seja exatamente o alvo */
          const final =
            decimals > 0
              ? target.toFixed(decimals).replace(".", ",")
              : target.toLocaleString("pt-BR");
          el.textContent = final + suffix;
          clearInterval(interval);
        }
      }, duration / steps);
    });
  }
}
