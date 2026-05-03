/**
 * Cursor personalizado: ponto ciano + anel externo com delay.
 */

export function initCursor() {
  /* Só ativa em dispositivos com mouse */
  if (!window.matchMedia("(pointer: fine)").matches) return;

  /* Cria os elementos */
  var dot = document.createElement("div");
  var ring = document.createElement("div");
  dot.className = "cursor__dot";
  ring.className = "cursor__ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mouseX = -100,
    mouseY = -100;
  var ringX = -100,
    ringY = -100;
  var rafId = null;

  /* Posiciona o ponto instantaneamente */
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
    document.documentElement.classList.remove("cursor--hidden");
  });

  /* Anel segue com lerp (interpolação suave) */
  function lerpRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    rafId = requestAnimationFrame(lerpRing);
  }
  lerpRing();

  /* Hover em elementos interativos */
  var interactives =
    'a, button, [role="button"], .plano-card, .dif-card, .contato-card, .faq__question, .tab-btn, .stream-tab, .wbr-speed-btn';

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(interactives)) {
      document.documentElement.classList.add("cursor--hovering");
    }
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(interactives)) {
      document.documentElement.classList.remove("cursor--hovering");
    }
  });

  /* Some ao sair da janela */
  document.addEventListener("mouseleave", function () {
    document.documentElement.classList.add("cursor--hidden");
  });
  document.addEventListener("mouseenter", function () {
    document.documentElement.classList.remove("cursor--hidden");
  });
}
