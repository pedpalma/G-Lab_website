# 📡 G-Lab Telecom - Documentação Técnica

**Landing Page Institucional** · Versão 2.0 · Maio de 2026

![Stack](https://img.shields.io/badge/Stack-HTML5%20%2B%20CSS3%20%2B%20JS%20ES%20Modules-04122b?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)
![Status](https://img.shields.io/badge/Status-Produção-10d97e?style=flat-square)

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Objetivos](#2-objetivos)
3. [Escopo](#3-escopo)
4. [Tecnologias Utilizadas](#4-tecnologias-utilizadas)
5. [Arquitetura do Projeto](#5-arquitetura-do-projeto)
6. [Estrutura de Pastas](#6-estrutura-de-pastas)
7. [Sistema de Design (Design Tokens)](#7-sistema-de-design-design-tokens)
8. [Seções da Página](#8-seções-da-página)
9. [Arquitetura CSS](#9-arquitetura-css)
10. [Arquitetura JavaScript](#10-arquitetura-javascript)
11. [Classes de Estado e Atributos `data-*`](#11-classes-de-estado-e-atributos-data-)
12. [Fluxos de Comportamento](#12-fluxos-de-comportamento)
13. [Responsividade](#13-responsividade)
14. [Acessibilidade](#14-acessibilidade)
15. [Performance](#15-performance)
16. [Versionamento e Deploy](#16-versionamento-e-deploy)
17. [Fluxo de Navegação](#17-fluxo-de-navegação)
18. [SEO](#18-seo)
19. [Guia de Manutenção](#19-guia-de-manutenção)
20. [Segurança](#20-segurança)
21. [Solução de Problemas](#21-solução-de-problemas)
22. [Roadmap](#22-roadmap)
23. [Conclusão](#23-conclusão)
24. [Referências](#24-referências)
25. [Glossário](#25-glossário)

---

## 1. Visão Geral

A **G-Lab Telecom** é uma provedora de internet via fibra óptica com atuação regional.

### Características gerais

| Atributo    | Valor                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------- |
| Tipo        | Single Page Application (SPA sem framework)                                                  |
| Linguagens  | HTML5, CSS3, JavaScript (ES Modules)                                                         |
| Bundler     | Nenhum - módulos resolvidos pelo navegador nativamente                                       |
| Hospedagem  | Vercel - deploy automático a cada push                                                       |
| Requisitos  | Navegador moderno com suporte a ES Modules, CSS Custom Properties e IntersectionObserver API |
| Repositório | [github.com/pedpalma/G-Lab_website](https://github.com/pedpalma/G-Lab_website)               |

### Objetivo central

Apresentar os planos de internet fibra óptica, converter visitantes em leads via WhatsApp e oferecer canais de atendimento acessíveis. A navegação é de página única com rolagem suave entre seções.

---

## 2. Objetivos

### Principal

Desenvolver uma landing page comercial de alta performance e acessibilidade, sem dependência de frameworks ou etapas de build.

### Específicos

- Apresentar planos de internet (Só Internet e bundles com Streaming) de forma clara e comparativa
- Facilitar a conversão via WhatsApp com um único clique a partir de qualquer seção
- Garantir experiência responsiva em mobile, tablet e desktop
- Atingir conformidade com critérios de acessibilidade WCAG 2.1 nível AA
- Alcançar carregamento inicial inferior a 3 segundos em conexões 4G
- Oferecer estrutura modular que facilite manutenção sem refatoração completa

---

## 3. Escopo

### Dentro do escopo

- Desenvolvimento completo do front-end (HTML, CSS, JS)
- Sistema de abas para exibição dinâmica de planos
- Integração com API do WhatsApp para geração de leads
- Responsividade de 320px a 2560px
- Animações: scroll reveal, hero slider, typewriter, canvas de fibra óptica
- Deploy e hospedagem contínua na Vercel
- Documentação técnica completa

---

## 4. Tecnologias Utilizadas

### Stack principal

| Tecnologia                   | Descrição                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| **HTML5**                    | Marcação semântica com `<section>`, `<nav>`, `<header>`, `<footer>` e atributos ARIA |
| **CSS3 Modular**             | 19 arquivos CSS independentes por componente, Custom Properties, Flexbox e Grid      |
| **JavaScript ES Modules**    | 16 módulos JS nativos sem bundler, padrão `export`/`import` nativo                   |
| **IntersectionObserver API** | Scroll reveal e pausa do canvas ao sair do viewport                                  |
| **Canvas API (2D)**          | Animação de fibra óptica no hero (`enhancements.js`)                                 |

### Dependências externas (CDN)

| Recurso        | Versão / URL                                   | Finalidade                                                        |
| -------------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| Google Fonts   | `fonts.googleapis.com`                         | Space Grotesk (500/600/700), Sora (300–700), Barlow (300/400/600) |
| Phosphor Icons | v2.1.1 - `unpkg.com/@phosphor-icons/web@2.1.1` | Ícones via classes CSS (`ph-phone`, `ph-envelope`, etc.)          |
| Logo Max       | `assets/icons/logo-max.png` (local)            | Logo do serviço de streaming Max                                  |
| Logo WatchBR   | `assets/icons/logo-watch-full.png` (local)     | Logo do serviço WatchBR                                           |

### Infraestrutura

| Componente         | Detalhes                                                              |
| ------------------ | --------------------------------------------------------------------- |
| Controle de versão | Git - repositório no GitHub                                           |
| Hospedagem         | Vercel - deploy automático a cada push na branch `main`               |
| Pipeline CI/CD     | Vercel detecta push e executa deploy (sem build, pois não há bundler) |

---

## 5. Arquitetura do Projeto

### Modelo arquitetural

O projeto segue o modelo de **SPA sem framework**, com navegação por rolagem suave entre âncoras HTML. Não existe roteamento de URL, servidor de aplicação ou etapa de build.

A separação de responsabilidades é implementada em três camadas:

```
Marcação (HTML)       →  index.html - estrutura semântica única
Apresentação (CSS)    →  19 módulos independentes por componente
Comportamento (JS)    →  16 módulos ES com contrato padronizado (init*())
```

### Fluxo de carregamento

```
1. Preconnect para Google Fonts  →  reduz TTFB de fontes
2. Carregamento sequencial dos 19 arquivos CSS no <head>
3. Import de main.js como módulo ES  →  defer implícito
4. main.js dispara no DOMContentLoaded  →  inicializa os 15 módulos JS
5. Phosphor Icons carrega com defer  →  não bloqueia o parsing
```

### Padrão de estado

O projeto **não utiliza store centralizado**. O estado da interface é representado exclusivamente por classes CSS no DOM (`.is-open`, `.is-active`, `.is-hidden`, `.is-visible`). As únicas variáveis em memória são:

| Módulo          | Variável                                                 |
| --------------- | -------------------------------------------------------- |
| `heroSlider.js` | `let current = 0` - índice do slide ativo                |
| `cursor.js`     | `ringX`, `ringY` - posição interpolada do anel do cursor |

---

## 6. Estrutura de Pastas

> Não existe pasta de build. O que está no repositório é exatamente o que é servido ao navegador.

```
/  (raiz)
├── index.html                     Ponto de entrada único da aplicação
│
└── assets/
    ├── css/                       19 módulos de estilo
    │   ├── defaultStyles.css      Reset, variáveis CSS, tipografia, .container
    │   ├── defaultButtons.css     Sistema de botões (variantes e tamanhos)
    │   ├── topBar.css             Faixa de contato superior
    │   ├── header.css             Barra de navegação sticky
    │   ├── mobileMenu.css         Overlay de navegação mobile
    │   ├── hero.css               Seção hero (fundo, card, slider, typewriter)
    │   ├── benefits.css           Cards de diferenciais
    │   ├── bannerCta.css          Faixa intermediária com CTA
    │   ├── plans.css              Abas e cards de planos
    │   ├── useCases.css           Cards de casos de uso
    │   ├── aboutUs.css            Seção institucional
    │   ├── contact.css            Cards de canais de atendimento
    │   ├── faq.css                Accordion de FAQ
    │   ├── footer.css             Rodapé
    │   ├── buttonWhatsApp.css     Botão flutuante WhatsApp
    │   ├── reveal.css             Animação de scroll reveal
    │   ├── cursor.css             Cursor personalizado (desktop)
    │   ├── scrollInProgress.css   Barra de progresso de leitura
    │   └── responsive.css         Todos os media queries - carregado por último
    │
    ├── js/                        16 módulos JavaScript
    │   ├── main.js                Entry point - inicializa todos os módulos
    │   ├── headerScroll.js        Sombra no header ao rolar
    │   ├── mobileMenu.js          Toggle do menu mobile
    │   ├── scrollSpy.js           Link ativo na nav ao rolar
    │   ├── smoothScroll.js        Rolagem suave para âncoras
    │   ├── scrollReveal.js        Fade-in via IntersectionObserver
    │   ├── tabs.js                Abas de planos (Internet / Streaming)
    │   ├── streamTabs.js          Sub-abas de streaming (Max / WatchBR)
    │   ├── faq.js                 Accordion de FAQ
    │   ├── watchbrSelector.js     Seletor de velocidade nos cards WatchBR
    │   ├── enhancements.js        Canvas de fibra óptica + botões magnéticos
    │   ├── heroSlider.js          Slider de imagens do hero
    │   ├── cursor.js              Cursor personalizado com interpolação lerp
    │   ├── typewriter.js          Efeito de digitação no título do hero
    │   ├── tilt.js                Inclinação 3D nos cards de plano
    │   └── scrollProgress.js      Barra de progresso de leitura
    │
    ├── images/                    Fotos e imagens de fundo (JPG/PNG/WEBP)
    └── icons/                     Logos e ícones (SVG/PNG)
```

### Convenções de nomenclatura

| Tipo               | Convenção                                                                   |
| ------------------ | --------------------------------------------------------------------------- |
| Arquivos CSS       | `camelCase` - nomeados pelo componente que estilizam                        |
| Arquivos JS        | `camelCase` - nomeados pela funcionalidade que implementam                  |
| Classes CSS        | BEM simplificado: `.bloco`, `.bloco__elemento`, `.bloco--modificador`       |
| Classes de estado  | Prefixo `.is-` (ex.: `.is-open`, `.is-active`, `.is-visible`, `.is-hidden`) |
| IDs HTML           | `camelCase` - âncoras de navegação e dependências JS                        |
| Atributos `data-*` | `kebab-case` - `data-tab`, `data-stream`, `data-plan`, `data-speed`         |

---

## 7. Sistema de Design (Design Tokens)

Todas as variáveis estão no bloco `:root` de `defaultStyles.css`. Alterar qualquer uma propaga a mudança automaticamente para todo o projeto.

### Paleta de cores

| Variável CSS   | Valor     | Uso Principal                                    |
| -------------- | --------- | ------------------------------------------------ |
| `--navy`       | `#04122B` | Topbar, footer, header                           |
| `--navy-mid`   | `#0A1F4A` | Hero, seção de planos                            |
| `--navy-light` | `#0D2760` | Cards internos, seção Sobre                      |
| `--blue`       | `#1045A8` | Hover de botões primários                        |
| `--blue-mid`   | `#1558D6` | Cor de ação principal (botões, links ativos)     |
| `--cyan`       | `#00C6FF` | Accent do site (destaques, ícones, bordas hover) |
| `--white`      | `#FFFFFF` | Superfícies claras e texto sobre fundo escuro    |
| `--off-white`  | `#F4F7FE` | Fundo de seções claras                           |
| `--mid-gray`   | `#8A97B8` | Texto secundário, labels, rodapé                 |
| `--success`    | `#10D97E` | Ícones de check nos cards de plano               |

### Tipografia

| Família           | Pesos           | Uso                                                  |
| ----------------- | --------------- | ---------------------------------------------------- |
| **Space Grotesk** | 500 / 600 / 700 | Títulos, botões, nav, labels - fonte principal da UI |
| **Sora**          | 300 a 700       | Fallback para títulos h1–h4                          |
| **Barlow**        | 300 / 400 / 600 | Respostas do FAQ e parágrafos específicos            |

> **Nota:** `<em>` dentro de `h1`/`h2` herda automaticamente a cor `--cyan` via regra global em `defaultStyles.css`.

### Sombras e animações

| Variável        | Valor                                                         |
| --------------- | ------------------------------------------------------------- |
| `--shadow-sm`   | `0 2px 8px rgba(4,18,43,.15)`                                 |
| `--shadow-md`   | `0 8px 32px rgba(4,18,43,.22)`                                |
| `--shadow-lg`   | `0 20px 60px rgba(4,18,43,.30)`                               |
| `--shadow-glow` | `0 0 40px rgba(0,198,255,.18)` - brilho em cards premium      |
| `--ease`        | `cubic-bezier(0.22, 1, 0.36, 1)` - curva padrão de transições |
| `--dur`         | `0.25s` - duração padrão de transições CSS                    |
| `--topbar-h`    | `38px` - altura da topbar                                     |
| `--header-h`    | `68px` - altura do header                                     |

---

## 8. Seções da Página

### Ordem de exibição

| #   | Seção          | Elemento / ID                     |
| --- | -------------- | --------------------------------- |
| 1   | Topbar         | `div.topbar`                      |
| 2   | Header         | `header.header#header`            |
| 3   | Hero           | `section.hero#home`               |
| 4   | Benefícios     | `section.diferenciais#beneficios` |
| 5   | Banner CTA     | `section.banner-cta`              |
| 6   | Planos         | `section.planos#planos`           |
| 7   | Use Cases      | `section.use-cases-new`           |
| 8   | Sobre          | `section.sobre#sobre`             |
| 9   | Contato        | `section.contato#contato`         |
| 10  | FAQ            | `section.faq#faq`                 |
| 11  | Footer         | `footer.footer`                   |
| 12  | WhatsApp Float | `a.whatsapp-float` (fixo)         |

### Topbar

```
div.topbar
  └── .container.topbar__inner
        └── .topbar__item (telefone)
        └── .topbar__item.topbar__item--hide-sm (e-mail - oculto em ≤ 480px)
```

### Header

```
header.header#header
  └── .container.header__inner
        ├── .header__logo
        ├── nav.nav > ul.nav__list > li > a.nav__link
        ├── .header__actions
        └── button.hamburger
```

A classe `.is-scrolled` é adicionada por `headerScroll.js` após 50px de scroll. Em viewports ≤ 900px, `.nav` e `.header__actions` são ocultados e `.hamburger` aparece.

### Hero

Camadas de profundidade (de baixo para cima):

```
section.hero#home
  ├── .hero__bg          → slider de imagens (heroSlider.js)
  ├── .hero__overlay     → gradiente para legibilidade (aria-hidden)
  ├── .hero__grid        → grade decorativa (aria-hidden)
  └── .hero__content     → grid 2 colunas
        ├── .hero__text  → título + typewriter + subtítulo + CTAs + stats
        └── .hero__card-wrap → .speed-card (glassmorphism)
```

### Seção de Planos

Sistema de abas em dois níveis:

```
section.planos#planos
  ├── .planos__tabs
  │     ├── .tab-btn[data-tab="internet"]   → painel #tab-internet
  │     └── .tab-btn[data-tab="streaming"]  → painel #tab-streaming
  │
  └── .planos__content (dois painéis)
        └── #tab-streaming
              └── .streaming__tabs
                    ├── .stream-tab[data-stream="max"]     → #grid-max
                    └── .stream-tab[data-stream="watchbr"] → #grid-watchbr
```

**Variantes de card:** `.plano-card` (base) · `.plano-card--featured` (destaque azul + borda ciano) · `.plano-card--featured-complete` (escuro) · `.wbr-card` (seletor dinâmico de velocidade)

### FAQ

```
section.faq#faq
  └── .faq__layout (grid 2 colunas)
        ├── .faq__aside  → lateral sticky (título + botão de suporte)
        └── .faq__list
              └── .faq__item
                    ├── button.faq__question
                    └── div.faq__answer[hidden]
```

---

## 9. Arquitetura CSS

> A ordem de carregamento no `<head>` é intencional e deve ser mantida. `responsive.css` **deve sempre ser o último** arquivo carregado.

| Arquivo              | Classes Principais                                                                                 | Observação                                     |
| -------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `defaultStyles.css`  | `:root`, `html`, `body`, `.container`, `.section-header`, `.section-title`, `em`                   | Base de todo o projeto                         |
| `defaultButtons.css` | `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--outline-nav`, `.btn--white`, `.btn--sm`, `.btn--lg` | -                                              |
| `topBar.css`         | `.topbar`, `.topbar__inner`, `.topbar__item--hide-sm`                                              | -                                              |
| `header.css`         | `.header`, `.header.is-scrolled`, `.nav`, `.nav__link.is-active`, `.hamburger`                     | `.is-scrolled` gerenciado por JS               |
| `mobileMenu.css`     | `.mobile-menu`, `.mobile-menu.is-open`, `.mobile-menu__list`                                       | `.is-open` gerenciado por JS                   |
| `hero.css`           | `.hero`, `.hero__bg`, `.speed-card`, `.typewriter`, `.hero__slider-dot`                            | Canvas injetado por JS                         |
| `plans.css`          | `.planos`, `.tab-btn`, `.plano-card`, `.wbr-speed-btn`, **`.is-hidden`**                           | `.is-hidden` é utilitária global - não remover |
| `reveal.css`         | `.reveal`, `.reveal.is-visible`                                                                    | `.is-visible` gerenciado por JS                |
| `cursor.css`         | `.cursor__dot`, `.cursor__ring`, `.cursor--hovering`                                               | Ativo apenas em `(pointer: fine)`              |
| `responsive.css`     | Sobrescreve todos os módulos acima                                                                 | **Deve ser carregado por último**              |

> **Nota crítica:** `.is-hidden` é definida em `plans.css`, mas usada por `tabs.js` e `streamTabs.js`. Não remover mesmo que o restante do arquivo seja alterado.

---

## 10. Arquitetura JavaScript

### Contrato dos módulos

Todos os módulos seguem o mesmo contrato:

- Exportam uma única função `init*()` como exportação nomeada
- São chamados exclusivamente por `main.js` dentro do `DOMContentLoaded`
- Nenhum módulo executa código no nível raiz do arquivo (sem side effects no import)
- Comunicação entre módulos é feita via DOM (classes CSS) ou importação direta

### Tabela de módulos

| Arquivo              | Exporta                                 | Dependências DOM               |
| -------------------- | --------------------------------------- | ------------------------------ |
| `main.js`            | - (entry point)                         | Todos os módulos               |
| `headerScroll.js`    | `initHeaderScroll()`                    | `#header`                      |
| `mobileMenu.js`      | `initMobileMenu()`                      | `#hamburger`, `#mobileMenu`    |
| `scrollSpy.js`       | `initScrollSpy()`                       | `section[id]`, `.nav__link`    |
| `smoothScroll.js`    | `initSmoothScroll()`                    | `a[href^="#"]`, `#header`      |
| `scrollReveal.js`    | `initScrollReveal()`, `observeReveal()` | `.reveal`                      |
| `tabs.js`            | `initTabs()`                            | `.tab-btn`, `.planos__content` |
| `streamTabs.js`      | `initStreamTabs()`                      | `.stream-tab`, `[id^="grid-"]` |
| `faq.js`             | `initFaq()`                             | `.faq__item`                   |
| `watchbrSelector.js` | `initWatchbrSelector()`                 | `.wbr-card`, `.wbr-speed-btn`  |
| `enhancements.js`    | `initEnhancements()`                    | `.hero`, `.hero__overlay`      |
| `heroSlider.js`      | `initHeroSlider()`                      | `.hero__bg`, `.hero`           |
| `cursor.js`          | `initCursor()`                          | `document.body`                |
| `typewriter.js`      | `initTypewriter()`                      | `.hero__title--accent`         |
| `tilt.js`            | `initTilt()`                            | `.plano-card`                  |
| `scrollProgress.js`  | `initScrollProgress()`                  | `document.body`                |

### Dependências entre módulos

```
tabs.js       →  importa { observeReveal } de scrollReveal.js
streamTabs.js →  importa { observeReveal } de scrollReveal.js
```

Todos os outros módulos são independentes entre si.

---

## 11. Classes de Estado e Atributos `data-*`

### Classes de estado (gerenciadas via JS)

| Classe                   | Arquivo CSS                                  | Comportamento                                            |
| ------------------------ | -------------------------------------------- | -------------------------------------------------------- |
| `.is-scrolled`           | `header.css`                                 | Header com box-shadow após 50px de scroll                |
| `.is-open`               | `header.css` / `mobile-menu.css` / `faq.css` | Hamburguer em X · menu mobile visível · accordion aberto |
| `.is-active`             | `header.css`                                 | Link da nav desktop destacado                            |
| `.is-visible`            | `reveal.css`                                 | Elemento com fade-in + slide-up                          |
| `.is-hidden`             | `plans.css`                                  | `display: none` - painéis e grids inativos               |
| `.tab-btn--active`       | `plans.css`                                  | Aba de plano ativa                                       |
| `.stream-tab--active`    | `plans.css`                                  | Sub-aba de streaming ativa                               |
| `.wbr-speed-btn--active` | `plans.css`                                  | Botão de velocidade selecionado                          |
| `.wbr-value-updated`     | `plans.css`                                  | Animação de pop ao trocar valor                          |

### Atributos `data-*`

| Atributo             | Valores                       | Lido por                      |
| -------------------- | ----------------------------- | ----------------------------- |
| `data-tab`           | `"internet"` \| `"streaming"` | `tabs.js`                     |
| `data-stream`        | `"max"` \| `"watchbr"`        | `streamTabs.js`               |
| `data-plan`          | identificador do plano        | `watchbrSelector.js`          |
| `data-speed`         | valor numérico (Mbps)         | `watchbrSelector.js`          |
| `data-default-speed` | valor numérico (Mbps)         | `watchbrSelector.js`          |
| `data-target`        | número inteiro                | Hero stats (contagem animada) |
| `data-suffix`        | string (ex: `"+"`, `"%"`)     | Hero stats                    |
| `data-decimals`      | número inteiro                | Hero stats                    |

### Atributos ARIA gerenciados via JS

| Atributo            | Valores               | Elemento Alvo                |
| ------------------- | --------------------- | ---------------------------- |
| `aria-expanded`     | `"true"` \| `"false"` | Hamburguer e botões do FAQ   |
| `aria-hidden`       | `"true"` \| `"false"` | Menu mobile                  |
| `aria-selected`     | `"true"` \| `"false"` | Abas de planos e sub-abas    |
| `aria-pressed`      | `"true"` \| `"false"` | Botões de velocidade WatchBR |
| `aria-controls`     | `"mobileMenu"`        | Hamburguer                   |
| `hidden` (booleano) | presente / ausente    | Respostas do FAQ             |

---

## 12. Fluxos de Comportamento

### Menu mobile

```
Clique em #hamburger
  → mobileMenu.js: alterna .is-open em #hamburger e #mobileMenu
  → CSS: hamburguer vira X · menu desliza de translateY(-110%) → translateY(0)
  → document.body.style.overflow = 'hidden'  (bloqueia scroll)
  → Clicar em link/botão ou pressionar Escape → fecha e reverte tudo
```

### Abas de planos

```
Clique em .tab-btn
  → tabs.js: remove .tab-btn--active de todos os botões
  → Adiciona .is-hidden em todos os .planos__content
  → Aplica .tab-btn--active no botão clicado
  → Remove .is-hidden do painel #tab-{data-tab}
  → Chama observeReveal() → anima os novos cards
```

### Accordion FAQ

```
Clique em .faq__question
  → faq.js: fecha todos os outros itens
      (remove .is-open · aria-expanded="false" · restaura hidden)
  → Alterna .is-open no item clicado
  → Atualiza aria-expanded · remove/restaura hidden da resposta
  → CSS: max-height 0 → 400px · .faq__icon-wrap rotaciona 45°
```

### Scroll Reveal

```
IntersectionObserver observa .reveal
  → Elemento entra 10% no viewport
  → Adiciona .is-visible com delay progressivo: (i % 6) * 75ms
  → CSS: opacity 0→1 · translateY(28px)→0 · blur(2px)→0 em 0.7s
  → unobserve() chamado após animar (executa uma única vez por elemento)
```

### WatchBR Selector

```
Clique em .wbr-speed-btn dentro de .wbr-card
  → Atualiza estado dos botões apenas naquele card
  → Busca dados em WBR_PLANS[planId][speed]
  → Atualiza .wbr-dynamic-speed, .wbr-dynamic-upload, .wbr-dynamic-price, .wbr-dynamic-cta
  → flashValue() dispara @keyframes wbr-value-pop (0.25s)
```

### Cursor personalizado

```
Ativo apenas em (pointer: fine) - não interfere em touch
  → cursor.js injeta .cursor__dot e .cursor__ring no body
  → .cursor__dot segue o mouse instantaneamente
  → .cursor__ring segue com lerp (coeficiente 0.12) via requestAnimationFrame
  → Elementos interativos adicionam .cursor--hovering ao <html>
```

### Hero Slider

```
heroSlider.js injeta .hero__slide para cada imagem em SLIDES[]
  → Troca .is-active a cada 5000ms
  → CSS: opacity transiciona entre slides em 1.2s
  → Pausa via visibilitychange quando a aba perde foco
```

---

## 13. Responsividade

Abordagem **desktop-first**. Todos os media queries centralizados em `responsive.css`.

| Breakpoint                | Principais Adaptações                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **≤ 1024px** (tablet)     | `.header__actions`: oculta segundo botão · `.diferenciais__layout`: 1 coluna · `.footer__grid`: 2 colunas                    |
| **≤ 900px** (tablet-md)   | `.nav` e `.header__actions`: `display:none` · `.hamburger`: visível · `.planos__grid`: 1 coluna · `.contato__grid`: 1 coluna |
| **≤ 768px** (mobile)      | `.hero__content`: 1 coluna · speed-card centralizado · `.hero__stats-grid`: 2 colunas · `.diferenciais__grid`: 1 coluna      |
| **≤ 480px** (extra small) | Topbar: fonte menor · `.hero__title`: tamanho reduzido · `.faq__layout`: 1 coluna (aside oculto)                             |

---

## 14. Acessibilidade

Conformidade com **WCAG 2.1 nível AA**.

| Técnica                       | Aplicação                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `aria-label`                  | Botões sem texto visível: hamburguer, WhatsApp float, ícones de redes sociais     |
| `aria-expanded`               | Hamburguer e botões do FAQ - estado aberto/fechado para leitores de tela          |
| `aria-hidden`                 | Menu mobile fechado · elementos decorativos do hero                               |
| `aria-selected`               | Abas de planos e sub-abas de streaming                                            |
| `aria-controls`               | Hamburguer aponta para `#mobileMenu`                                              |
| `role="tablist/tab/tabpanel"` | Semântica correta de interface com abas nos planos                                |
| `hidden` (booleano)           | Respostas do FAQ - semântico para leitores de tela                                |
| Contraste                     | Texto branco sobre `#04122B` → relação **≥ 7:1** (mínimo WCAG AA: 4.5:1)          |
| Cursor                        | Cursor personalizado ativo apenas em `(pointer: fine)` - nunca interfere em touch |

---

## 15. Performance

### Estratégias de carregamento

| Técnica                     | Implementação                                                          |
| --------------------------- | ---------------------------------------------------------------------- |
| `rel="preconnect"`          | Para `fonts.googleapis.com` e `fonts.gstatic.com` - reduz TTFB         |
| `defer` em scripts externos | Phosphor Icons - não bloqueia o parsing do HTML                        |
| ES Modules nativos          | `type="module"` - defer implícito e tree-shaking nativo pelo navegador |
| Sem bundler                 | Elimina etapa de build - reduz complexidade operacional                |

### Otimizações em tempo de execução

- **`IntersectionObserver`** - scroll reveal e pausa do canvas fora do viewport
- **`unobserve()`** - desregistra o observer após cada elemento revelar, liberando memória
- **`requestAnimationFrame` + `visibilitychange`** - canvas pausa quando a aba perde foco, economizando CPU/GPU
- **Escopo de eventos WatchBR** - atualiza apenas elementos do card pai, sem varrer o DOM completo

---

## 16. Versionamento e Deploy

| Aspecto          | Detalhes                                     |
| ---------------- | -------------------------------------------- |
| Ferramenta       | Git                                          |
| Repositório      | GitHub - `github.com/pedpalma/G-Lab_website` |
| Branch principal | `main` (deploy automático em cada push)      |

### Pipeline de deploy

```
Push para main
  → Vercel detecta via webhook
  → Sem etapa de build (não há bundler)
  → Vercel serve os arquivos estáticos diretamente
  → Deploy em produção concluído em segundos
  → Preview deployments gerados automaticamente para cada Pull Request
```

### Histórico de versões

| Versão | Data          | Principais Mudanças                                                                                  |
| ------ | ------------- | ---------------------------------------------------------------------------------------------------- |
| 1.0    | Março de 2026 | Versão inicial - estrutura base, seções principais, sistema de planos, integrações WhatsApp          |
| 2.0    | Maio de 2026  | Refatoração para ES Modules, cursor personalizado, barra de progresso, documentação técnica completa |

---

## 17. Fluxo de Navegação

### Jornada do usuário

```
Chegada (busca orgânica / redes sociais / indicação)
  ↓
Hero  →  Benefícios  →  Banner CTA (1º ponto de conversão)
  ↓
Planos (comparação e seleção)
  ↓
Use Cases  →  Sobre (credibilidade institucional)
  ↓
Contato  →  FAQ  →  Footer
```

### Pontos de conversão (WhatsApp)

| Localização       | Tipo                                                   |
| ----------------- | ------------------------------------------------------ |
| Hero (speed card) | Botão "Assinar Agora" - link com mensagem pré-definida |
| Banner CTA        | Botão "Fale Conosco"                                   |
| Cards de Planos   | Botão individual por plano - mensagem customizada      |
| Seção Contato     | Cards clicáveis para WhatsApp, telefone e e-mail       |
| FAQ Aside         | Botão de suporte                                       |
| Botão Flutuante   | `a.whatsapp-float` - fixo em toda a página             |

---

## 18. SEO

Práticas de SEO on-page implementadas:

- Hierarquia semântica de headings (`h1 → h2 → h3`) respeitada em todas as seções
- `meta title` e `meta description` definidos no `<head>`
- Meta tags Open Graph para compartilhamento em redes sociais
- Atributo `alt` em todas as imagens funcionais
- Âncoras descritivas (`#planos`, `#beneficios`, `#contato`, etc.)
- Marcação semântica HTML5 (`<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`)
- `rel="preconnect"` para fontes (melhora Core Web Vitals)

---

## 19. Guia de Manutenção

### Referência rápida de conteúdo

| O que alterar               | Onde procurar                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Logo do site                | `index.html` linhas ~91 (header) e ~734 (footer) - substituir `logo-white-big.png`     |
| Telefone de contato         | `Ctrl+H`: buscar `"2500-3241"`                                                         |
| E-mail de contato           | `Ctrl+H`: buscar o endereço atual                                                      |
| Número do WhatsApp          | `Ctrl+H`: buscar `"5511948830455"` → substituir por `55+DDD+número`                    |
| Título principal do hero    | Linhas ~190–194                                                                        |
| Palavras do typewriter      | `assets/js/typewriter.js` → array `WORDS[]`                                            |
| Imagem de fundo do hero     | Substituir `background-portrait.jpg` em `assets/images/`                               |
| Imagens do slider           | `assets/js/heroSlider.js` → array `SLIDES[]`                                           |
| Preço / velocidade de plano | `index.html` a partir da linha ~396 - campos `plano-card__speed` e `plano-card__price` |
| Preços WatchBR              | `assets/js/watchbrSelector.js` → objeto `WBR_PLANS`                                    |
| Cards de diferencial        | `index.html` linhas ~276–323 - editar `h3` e `p` de cada `.dif-card`                   |
| Texto do banner CTA         | `index.html` linhas ~350–358                                                           |
| Textos da seção Sobre       | `index.html` linhas ~585–615                                                           |
| Perguntas do FAQ            | `index.html` linhas ~681–719 - duplicar `.faq__item` para nova pergunta                |
| Links das redes sociais     | `index.html` linhas ~762–764 - atributos `href`                                        |
| Texto de copyright          | `index.html` linha ~773                                                                |
| Cores globais               | `assets/css/defaultStyles.css` → bloco `:root`                                         |

### Arquivos JS que NÃO devem ser editados sem necessidade

Uma alteração incorreta pode quebrar funcionalidades **sem exibir erro visível**:

```
main.js · headerScroll.js · mobileMenu.js · scrollSpy.js · smoothScroll.js
scrollReveal.js · tabs.js · streamTabs.js · faq.js · enhancements.js
cursor.js · tilt.js · scrollProgress.js
```

Os únicos JS seguros para edição de conteúdo:

| Arquivo              | Para quê                                |
| -------------------- | --------------------------------------- |
| `watchbrSelector.js` | Atualizar preços e velocidades WatchBR  |
| `typewriter.js`      | Alterar palavras do efeito de digitação |
| `heroSlider.js`      | Adicionar ou remover imagens do slider  |

### Adicionando um novo plano de internet

1. Em `index.html`, dentro de `#tab-internet > .planos__grid`, duplicar qualquer `<div class="plano-card reveal">`
2. Atualizar velocidade, upload, preço, features e link do WhatsApp
3. O grid se ajusta automaticamente via CSS `auto-fit`

Para marcar como destaque:

- Adicionar classe `.plano-card--featured`
- Incluir `<div class="plano-card__badge">Mais Popular</div>` como primeiro filho
- Trocar o botão para `.btn--white`

### Adicionando um novo módulo CSS

```
1. Criar assets/css/nome-da-secao.css
2. Adicionar <link> no index.html ANTES de responsive.css
3. Adicionar os media queries em responsive.css
```

### Adicionando um novo módulo JS

```
1. Criar assets/js/nome-do-modulo.js exportando initNome()
2. Em main.js, importar o módulo
3. Chamar initNome() dentro do DOMContentLoaded
```

---

## 20. Segurança

Por se tratar de um site estático sem back-end, a superfície de ataque é inerentemente reduzida.

| Prática                              | Detalhes                                                             |
| ------------------------------------ | -------------------------------------------------------------------- |
| Sem dependências npm em produção     | Elimina riscos de supply chain attack                                |
| CDN com versão fixada                | Phosphor Icons v2.1.1 explícito - evita atualizações não controladas |
| Assets de streaming locais           | Logos hospedados localmente - sem dependência de servidores externos |
| Links WhatsApp via API oficial       | `api.whatsapp.com/send` - sem coleta de dados intermediária          |
| Sem `eval()` ou `innerHTML` dinâmico | Mitigação contra XSS                                                 |
| HTTPS via Vercel                     | Certificado SSL/TLS gerenciado automaticamente                       |

---

## 21. Solução de Problemas

| Problema                           | Solução                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| Site desconfigurado após edição    | Use `Ctrl+Z` para desfazer. Ou restaurar via `git checkout`                               |
| Alteração não aparece no navegador | `Ctrl+Shift+R` (`Cmd+Shift+R` no Mac) - limpa o cache                                     |
| Menu mobile não abre               | Verificar se algum arquivo em `assets/js/` foi renomeado ou movido                        |
| Imagens não aparecem               | Confirmar que o arquivo está em `assets/images/` com o nome exato (case-sensitive)        |
| Links WhatsApp não funcionam       | Formato correto: `https://api.whatsapp.com/send?phone=5511948830455`                      |
| Ícones Phosphor não renderizam     | Verificar conexão com internet (CDN). Testar via servidor HTTP, não via `file://`         |
| Animações de reveal não acionam    | Verificar classe `.reveal` no elemento. `IntersectionObserver` não funciona via `file://` |
| Cards sem inclinação 3D            | `tilt.js` requer mouse sobre o card. Em touch, o efeito é desabilitado por design         |

---

## 22. Conclusão

A landing page da G-Lab Telecom foi desenvolvida com foco em performance, manutenibilidade e acessibilidade, adotando uma arquitetura frameworkless que elimina complexidade operacional sem comprometer a qualidade técnica.

A estrutura modular - 19 arquivos CSS e 16 módulos ES JavaScript - permite evoluções isoladas sem risco de regressão em outros componentes. O contrato padronizado `init*() + DOMContentLoaded` garante previsibilidade na inicialização e facilita onboarding de novos desenvolvedores.

O deploy contínuo via Vercel reduz o ciclo de entrega para segundos, e a ausência de bundler simplifica o ambiente de desenvolvimento - qualquer editor de texto e um servidor HTTP básico são suficientes.

---

## 23. Referências

- [MDN Web Docs](https://developer.mozilla.org) - HTML5, CSS3, ES Modules, IntersectionObserver, Canvas API
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Web Content Accessibility Guidelines
- [Core Web Vitals](https://web.dev/vitals) - Google
- [Vercel Docs](https://vercel.com/docs) - Deploy e hospedagem
- [Phosphor Icons](https://phosphoricons.com) - Biblioteca de ícones v2.1.1
- [Google Fonts](https://fonts.google.com) - Space Grotesk, Sora, Barlow

---

## 24. Glossário

| Termo                    | Definição                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| **ES Modules**           | Sistema de módulos nativo do JavaScript (ES6+), usando `import`/`export` sem bundler                     |
| **Bundler**              | Ferramenta que empacota múltiplos arquivos em um único (ex.: Webpack, Vite). Não utilizado neste projeto |
| **Design Tokens**        | Variáveis centralizadas de design (cores, espaçamentos, tipografia) que garantem consistência visual     |
| **IntersectionObserver** | API nativa do navegador que detecta quando elementos entram ou saem do viewport                          |
| **WCAG 2.1**             | Web Content Accessibility Guidelines - padrão internacional de acessibilidade digital                    |
| **Core Web Vitals**      | Métricas de performance do Google: LCP, INP e CLS                                                        |
| **SPA**                  | Single Page Application - navegação sem recarregamento de página                                         |
| **lerp**                 | Linear Interpolation - técnica de suavização de movimento usada no cursor personalizado                  |
| **BEM**                  | Block Element Modifier - convenção de nomenclatura de classes CSS                                        |
| **CDN**                  | Content Delivery Network - rede de entrega de conteúdo para carregamento rápido de assets                |
| **CI/CD**                | Continuous Integration / Continuous Delivery - pipeline automatizado de deploy                           |
| **DOMContentLoaded**     | Evento que dispara quando o HTML foi completamente carregado e parseado                                  |

---

<div align="center">

**G-Lab Telecom** · Documentação Técnica v2.0 · Maio de 2026

</div>
