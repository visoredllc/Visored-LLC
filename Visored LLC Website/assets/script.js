const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const packageSelect = document.querySelector("#package");
const messageField = document.querySelector("#message");
const designForm = document.querySelector("#designForm");
const designNote = document.querySelector("#designNote");
const photosInput = document.querySelector("#photos");
const photoNote = document.querySelector("#photoNote");
const colorInputs = document.querySelectorAll('input[type="color"].color-unselected');
const clearColorButtons = document.querySelectorAll(".clear-color");
const params = new URLSearchParams(window.location.search);
const modal = document.querySelector("#contact-modal");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modalPackage = document.querySelector("#modalPackage");
const modalMessage = document.querySelector("#modalMessage");
const modalForm = document.querySelector("#servicesModalForm");
const modalFormNote = document.querySelector("#modalFormNote");
const faqQuestions = document.querySelectorAll(".faq-question");

if (packageSelect) {
  const selectedPackage = params.get("package");
  const allowedPackages = ["one-page", "starter", "growth", "event-promo", "ecommerce", "multiple", "na"];

  if (allowedPackages.includes(selectedPackage)) {
    packageSelect.value = selectedPackage;
  }
}

if (messageField && params.get("demo") === "free") {
  messageField.value = "I am interested in a free demo";
}

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Thanks. This placeholder form is ready to connect to your real email or form service.";
  });
}

if (photosInput && photoNote) {
  photosInput.addEventListener("change", () => {
    if (photosInput.files.length > 4) {
      photosInput.value = "";
      photoNote.textContent = "Please select no more than 4 pictures.";
      photoNote.classList.add("error");
    } else {
      photoNote.textContent = `${photosInput.files.length} picture(s) selected.`;
      photoNote.classList.remove("error");
    }
  });
}

colorInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("color-unselected");
  });
});

clearColorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.colorTarget);
    if (input) {
      input.value = "#ffffff";
      input.classList.add("color-unselected");
    }
  });
});

const openModal = (packageName = "") => {
  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  if (modalPackage && packageName) {
    modalPackage.value = packageName;
  }

  if (modalMessage && packageName) {
    modalMessage.value = `I am interested in the ${packageName}.`;
  }

  const firstInput = modal.querySelector("input, textarea, select, button");
  if (firstInput) firstInput.focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(trigger.dataset.package || "");
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

if (modalForm && modalFormNote) {
  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    modalFormNote.textContent = "Thanks. This placeholder form is ready to connect to your real email or form service.";
  });
}

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const isOpen = question.getAttribute("aria-expanded") === "true";

    question.setAttribute("aria-expanded", String(!isOpen));

    if (!answer) return;
    answer.style.maxHeight = isOpen ? "0" : `${answer.scrollHeight}px`;
  });
});

if (designForm && designNote) {
  designForm.addEventListener("submit", (event) => {
    event.preventDefault();
    designNote.textContent = "Thanks. This placeholder design form is ready to connect to your real submission workflow.";
  });
}
