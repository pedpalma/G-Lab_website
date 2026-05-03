/* ── 1. Fibra óptica no Hero ── */
function initFiberCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'fiber-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const overlay = hero.querySelector('.hero__overlay');
  if (overlay) {
    overlay.insertAdjacentElement('afterend', canvas);
  } else {
    hero.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function makeLine(initial) {
    return {
      y:      Math.random() * canvas.height,
      x:      initial ? Math.random() * canvas.width : -50,
      speed:  4 + Math.random() * 8,
      length: 80 + Math.random() * 160,
      alpha:  0.2 + Math.random() * 0.45,
      width:  0.5 + Math.random() * 1.2,
      isCyan: Math.random() > 0.4,
    };
  }

  function resetLine(line) {
    line.y      = Math.random() * canvas.height;
    line.x      = -50;
    line.speed  = 4 + Math.random() * 8;
    line.length = 80 + Math.random() * 160;
    line.alpha  = 0.2 + Math.random() * 0.45;
    line.width  = 0.5 + Math.random() * 1.2;
    line.isCyan = Math.random() > 0.4;
  }

  function drawLine(line) {
    var color = line.isCyan
      ? 'rgba(0,198,255,' + line.alpha + ')'
      : 'rgba(180,220,255,' + (line.alpha * 0.6) + ')';

    var grad = ctx.createLinearGradient(
      line.x - line.length, line.y,
      line.x,               line.y
    );
    grad.addColorStop(0,   'rgba(0,0,0,0)');
    grad.addColorStop(0.6, color);
    grad.addColorStop(1,   'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.moveTo(line.x - line.length, line.y);
    ctx.lineTo(line.x, line.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth   = line.width;
    ctx.stroke();
  }

  var lines = [];
  for (var i = 0; i < 55; i++) {
    lines.push(makeLine(true));
  }

  var rafId = null;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < lines.length; i++) {
      lines[i].x += lines[i].speed;
      if (lines[i].x - lines[i].length > canvas.width) {
        resetLine(lines[i]);
      }
      drawLine(lines[i]);
    }
    rafId = requestAnimationFrame(animate);
  }

  animate();

  new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      if (!rafId) animate();
    } else {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }, { threshold: 0 }).observe(hero);
}

/* ── 2. Botões magnéticos ── */
function initMagneticBtns() {
  var targets = document.querySelectorAll(
    '.hero__actions .btn, .banner-cta .btn, .speed-card .btn--primary'
  );

  targets.forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect   = btn.getBoundingClientRect();
      var deltaX = (e.clientX - (rect.left + rect.width  / 2)) * 0.28;
      var deltaY = (e.clientY - (rect.top  + rect.height / 2)) * 0.28;
      btn.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
      btn.style.transform = '';
    });
  });
}

export function initEnhancements() {
  initFiberCanvas();
  initMagneticBtns();
}