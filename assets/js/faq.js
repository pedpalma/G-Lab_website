export function initFaq() {
  const faqItems = document.querySelectorAll(".faq__item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    if (!question) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      /* Fecha todos os outros itens antes de abrir o clicado */
      faqItems.forEach((other) => {
        if (other === item) return;
        other.classList.remove("is-open");

        const otherQ = other.querySelector(".faq__question");
        const otherA = other.querySelector(".faq__answer");
        if (otherQ) otherQ.setAttribute("aria-expanded", "false");
        if (otherA) otherA.hidden = true;
      });

      /* Alterna o estado do item atual */
      item.classList.toggle("is-open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      if (answer) answer.hidden = isOpen;
    });
  });
}
