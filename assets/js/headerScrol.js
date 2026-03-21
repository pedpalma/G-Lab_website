export function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
  
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 50);
    }
  
    /* passive:true melhora performance em dispositivos móveis */
    window.addEventListener('scroll', onScroll, { passive: true });
  }