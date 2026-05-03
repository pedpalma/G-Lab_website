export function initFaq() {
  var faqItems = document.querySelectorAll(".faq__item");
  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq__question");
    var answer = item.querySelector(".faq__answer");

    if (!question) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      /* Fecha todos os outros antes de abrir o clicado */
      faqItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove("is-open");

        var otherQ = other.querySelector(".faq__question");
        var otherA = other.querySelector(".faq__answer");
        if (otherQ) otherQ.setAttribute("aria-expanded", "false");
        if (otherA) otherA.hidden = true;
      });

      /* Alterna o item atual */
      item.classList.toggle("is-open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      if (answer) answer.hidden = isOpen;
    });
  });
}
