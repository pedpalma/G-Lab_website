/*
 * Efeito de inclinação 3D nos cards de plano ao passar o mouse.
 */

/** Intensidade máxima da inclinação em graus */
var MAX_TILT = 8;
/** Brilho interno que acompanha o mouse */
var SHINE    = true;

export function initTilt() {
  /* Só ativa em dispositivos com mouse */
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var cards = document.querySelectorAll('.plano-card');
  if (!cards.length) return;

  cards.forEach(function(card) {
    /* Cria o elemento de brilho interno */
    if (SHINE) {
      var shine = document.createElement('div');
      shine.className = 'tilt__shine';
      card.appendChild(shine);
    }

    card.addEventListener('mousemove', function(e) {
      var rect   = card.getBoundingClientRect();
      var x      = e.clientX - rect.left;
      var y      = e.clientY - rect.top;
      var cx     = rect.width  / 2;
      var cy     = rect.height / 2;
      var tiltX  = ((y - cy) / cy) * MAX_TILT * -1;
      var tiltY  = ((x - cx) / cx) * MAX_TILT;

      card.style.transform    = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-6px)';
      card.style.transition   = 'transform 0.1s ease';

      if (SHINE) {
        var shineEl = card.querySelector('.tilt__shine');
        if (shineEl) {
          var pctX = (x / rect.width)  * 100;
          var pctY = (y / rect.height) * 100;
          shineEl.style.background =
            'radial-gradient(circle at ' + pctX + '% ' + pctY + '%, ' +
            'rgba(0,198,255,0.12) 0%, transparent 65%)';
        }
      }
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s ease, box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease)';
      if (SHINE) {
        var shineEl = card.querySelector('.tilt__shine');
        if (shineEl) shineEl.style.background = 'none';
      }
    });
  });
}