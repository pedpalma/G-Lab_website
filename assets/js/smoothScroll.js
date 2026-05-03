/**
 * smoothScroll.js
 * assets/js/smoothScroll.js
 * * Smooth scroll com easing easeInOutCubic, mais natural e suave
 * do que o comportamento padrão do browser.
 */

export function initSmoothScroll() {
  var header = document.getElementById("header");

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      var headerHeight = header ? header.offsetHeight : 0;
      var targetTop =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      var startTop = window.scrollY;
      var distance = targetTop - startTop;
      var duration = Math.min(900, Math.max(400, Math.abs(distance) * 0.4));
      var startTime = null;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var ease = easeInOutCubic(progress);

        window.scrollTo(0, startTop + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    });
  });
}
