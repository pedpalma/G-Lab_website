/**
 * watchbrSelector.js
 * ─────────────────────────────────────────────────────────────────
 * Seletor de velocidade individual para cada card WatchBR.
 *
 * Cada card (.wbr-card) possui:
 *  - data-plan : identificador do plano (ex: "hub-ultra-local-pro")
 *  - data-default-speed : velocidade selecionada ao carregar
 *  - botões .wbr-speed-btn com data-speed
 *
 * Ao selecionar uma velocidade, apenas o card pai atualiza:
 *   · Velocidade de download e upload
 *   · Preço cheio
 *   · Preço com desconto (vencimento)
 *   · Mensagem do WhatsApp
 *
 * Para ajustar preços, edite os objetos dentro de WBR_PLANS abaixo.
 * ─────────────────────────────────────────────────────────────────
 */

const WA_BASE = "https://api.whatsapp.com/send?phone=5511948830455&text=";

/**
 * Dados de preço e upload por plano e velocidade. *
 */
const WBR_PLANS = {
  /* ── Plano 1: HUB ULTRA LOCAL PRO ── */
  "hub-ultra-local-pro": {
    300: {
      upload: 150,
      priceInt: "109",
      priceDec: "90",
      discInt: "109",
      discDec: "90",
    },
    550: {
      upload: 275,
      priceInt: "129",
      priceDec: "90",
      discInt: "129",
      discDec: "90",
    },
    650: {
      upload: 325,
      priceInt: "139",
      priceDec: "90",
      discInt: "139",
      discDec: "90",
    },
    800: {
      upload: 400,
      priceInt: "149",
      priceDec: "90",
      discInt: "149",
      discDec: "90",
    },
  },

  /* ── Plano 2: POWER ULTRA ── */
  "power-ultra": {
    550: {
      upload: 275,
      priceInt: "139",
      priceDec: "90",
      discInt: "139",
      discDec: "90",
    },
    650: {
      upload: 325,
      priceInt: "149",
      priceDec: "90",
      discInt: "149",
      discDec: "90",
    },
    800: {
      upload: 400,
      priceInt: "159",
      priceDec: "90",
      discInt: "159",
      discDec: "90",
    },
  },

  /* ── Plano 3: HUB MIX LOCAL PRO ── */
  "hub-mix-local-pro": {
    550: {
      upload: 275,
      priceInt: "145",
      priceDec: "90",
      discInt: "145",
      discDec: "90",
    },
    650: {
      upload: 325,
      priceInt: "155",
      priceDec: "90",
      discInt: "155",
      discDec: "90",
    },
    800: {
      upload: 400,
      priceInt: "165",
      priceDec: "90",
      discInt: "165",
      discDec: "90",
    },
  },

  /* ── Plano 4: POWER ELITE ── */
  "power-elite": {
    550: {
      upload: 275,
      priceInt: "179",
      priceDec: "90",
      discInt: "179",
      discDec: "90",
    },
    650: {
      upload: 325,
      priceInt: "189",
      priceDec: "90",
      discInt: "189",
      discDec: "90",
    },
    800: {
      upload: 400,
      priceInt: "199",
      priceDec: "90",
      discInt: "199",
      discDec: "90",
    },
  },
};

/** Nomes dos planos para a mensagem do WhatsApp */
const WBR_PLAN_NAMES = {
  "hub-ultra-local-pro": "HUB%20ULTRA%20LOCAL%20PRO",
  "power-ultra": "POWER%20ULTRA",
  "hub-mix-local-pro": "HUB%20MIX%20LOCAL%20PRO",
  "power-elite": "POWER%20ELITE",
};

/**
 * Anima brevemente um elemento quando seu valor muda.
 * @param {Element} el
 */
function flashValue(el) {
  if (!el) return;
  el.classList.remove("wbr-value-updated");
  void el.offsetWidth; // force reflow
  el.classList.add("wbr-value-updated");
  el.addEventListener(
    "animationend",
    () => el.classList.remove("wbr-value-updated"),
    { once: true },
  );
}

/**
 * Atualiza o conteúdo de um único card com os dados do plano + velocidade.
 * @param {Element} card   - elemento .wbr-card
 * @param {string}  speed  - ex: '300', '550', '650', '800'
 */
function updateCard(card, speed) {
  const planId = card.dataset.plan;
  const plan = WBR_PLANS[planId]?.[speed];
  if (!plan) return;

  /* Velocidade de download */
  const speedEl = card.querySelector(".wbr-dynamic-speed");
  if (speedEl) {
    speedEl.innerHTML = `${speed} <span>Mbps</span>`;
    flashValue(speedEl);
  }

  /* Upload */
  const uploadEl = card.querySelector(".wbr-dynamic-upload");
  if (uploadEl) uploadEl.textContent = `↑ até ${plan.upload} Mbps`;

  /* Preço cheio */
  const priceEl = card.querySelector(".wbr-dynamic-price");
  if (priceEl) {
    priceEl.innerHTML = `<small>R$</small>${plan.priceInt}<sup>,${plan.priceDec}</sup>/mês`;
    flashValue(priceEl);
  }

  /* Preço com desconto (vencimento) */
  const vencEl = card.querySelector(".wbr-dynamic-vencimento");
  if (vencEl) {
    vencEl.innerHTML = `Pagando até o vencimento <strong>R$ ${plan.discInt},${plan.discDec}</strong>`;
  }

  /* Link do WhatsApp */
  const ctaEl = card.querySelector(".wbr-dynamic-cta");
  if (ctaEl) {
    const planName = WBR_PLAN_NAMES[planId] || planId;
    ctaEl.href = `${WA_BASE}Gostaria%20de%20contratar%20o%20plano%20WatchBR%20${planName}%20de%20${speed}%20Mbps%20por%20R%24${plan.priceInt}%2C${plan.priceDec}%2Fm%C3%AAs!`;
  }
}

/**
 * Inicializa o seletor em cada card WatchBR independentemente.
 * Deve ser chamado após o DOMContentLoaded.
 */
export function initWatchbrSelector() {
  const cards = document.querySelectorAll("#grid-watchbr .wbr-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    const btns = card.querySelectorAll(".wbr-speed-btn");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const speed = btn.dataset.speed;

        /* Atualiza estado dos botões apenas deste card */
        btns.forEach((b) => {
          b.classList.remove("wbr-speed-btn--active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("wbr-speed-btn--active");
        btn.setAttribute("aria-pressed", "true");

        /* Atualiza apenas este card */
        updateCard(card, speed);
      });
    });
  });
}
