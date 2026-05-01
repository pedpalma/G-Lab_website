const WA_BASE = 'https://api.whatsapp.com/send?phone=5511948830455&text=';

/**
 * Dados de cada velocidade.
 * Edite priceInt, priceDec e upload conforme necessário.
 */
const WBR_PLANS = {
  '300': {
    down:     300,
    upload:   150,
    priceInt: '89',
    priceDec: '90',
    waMsg:    'Gostaria%20de%20contratar%20o%20plano%20WatchBR%20de%20300%20Mbps%20por%20R%2489%2C90%2Fm%C3%AAs!',
  },
  '550': {
    down:     550,
    upload:   275,
    priceInt: '99',
    priceDec: '90',
    waMsg:    'Gostaria%20de%20contratar%20o%20plano%20WatchBR%20de%20550%20Mbps%20por%20R%2499%2C90%2Fm%C3%AAs!',
  },
  '650': {
    down:     650,
    upload:   325,
    priceInt: '109',
    priceDec: '90',
    waMsg:    'Gostaria%20de%20contratar%20o%20plano%20WatchBR%20de%20650%20Mbps%20por%20R%24109%2C90%2Fm%C3%AAs!',
  },
  '800': {
    down:     800,
    upload:   400,
    priceInt: '119',
    priceDec: '90',
    waMsg:    'Gostaria%20de%20contratar%20o%20plano%20WatchBR%20de%20800%20Mbps%20por%20R%24119%2C90%2Fm%C3%AAs!',
  },
};

/**
 * Anima brevemente um elemento quando seu valor muda.
 * @param {Element} el
 */
function flashValue(el) {
  if (!el) return;
  el.classList.remove('wbr-value-updated');
  void el.offsetWidth; // force reflow
  el.classList.add('wbr-value-updated');
  el.addEventListener('animationend', () => el.classList.remove('wbr-value-updated'), { once: true });
}

/**
 * Atualiza o conteúdo de um único card com os dados do plano selecionado.
 * @param {Element} card  - elemento .wbr-card
 * @param {string}  speed - chave do plano ('300' | '550' | '650' | '800')
 */
function updateCard(card, speed) {
  const plan = WBR_PLANS[speed];
  if (!plan) return;

  /* Velocidade */
  const speedEl = card.querySelector('.wbr-dynamic-speed');
  if (speedEl) {
    speedEl.innerHTML = `${plan.down} <span>Mbps</span>`;
    flashValue(speedEl);
  }

  /* Upload */
  const uploadEl = card.querySelector('.wbr-dynamic-upload');
  if (uploadEl) uploadEl.textContent = `↑ até ${plan.upload} Mbps`;

  /* Preço */
  const priceEl = card.querySelector('.wbr-dynamic-price');
  if (priceEl) {
    priceEl.innerHTML = `<small>R$</small>${plan.priceInt}<sup>,${plan.priceDec}</sup>/mês`;
    flashValue(priceEl);
  }

  /* Link WhatsApp */
  const ctaEl = card.querySelector('.wbr-dynamic-cta');
  if (ctaEl) ctaEl.href = `${WA_BASE}${plan.waMsg}`;
}

/**
 * Inicializa o seletor em cada card WatchBR independentemente.
 * Deve ser chamado após o DOMContentLoaded.
 */
export function initWatchbrSelector() {
  const cards = document.querySelectorAll('#grid-watchbr .wbr-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const btns = card.querySelectorAll('.wbr-speed-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const speed = btn.dataset.speed;

        /* Atualiza estado dos botões apenas deste card */
        btns.forEach(b => {
          b.classList.remove('wbr-speed-btn--active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('wbr-speed-btn--active');
        btn.setAttribute('aria-pressed', 'true');

        /* Atualiza apenas este card */
        updateCard(card, speed);
      });
    });
  });
}
