const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const packageSelect = document.querySelector("#package");
const messageField = document.querySelector("#message");
const designForm = document.querySelector("#designForm");
const designNote = document.querySelector("#designNote");
const photosInput = document.querySelector("#photos");
const photoNote = document.querySelector("#photoNote");
const colorInputs = document.querySelectorAll('input[type="color"]');
const clearColorButtons = document.querySelectorAll(".clear-color");
const clearFormButtons = document.querySelectorAll("[data-clear-form]");
const languageSwitch = document.querySelector(".language-switch");
const params = new URLSearchParams(window.location.search);
const modal = document.querySelector("#contact-modal");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modalPackage = document.querySelector("#modalPackage");
const modalMessage = document.querySelector("#modalMessage");
const modalForm = document.querySelector("#servicesModalForm");
const modalFormNote = document.querySelector("#modalFormNote");
const faqItems = document.querySelectorAll(".faq-item");
const summaryModal = document.querySelector("#design-summary-modal");
const summaryContent = document.querySelector("#designSummaryContent");
const summaryCloseButtons = document.querySelectorAll("[data-summary-close]");
const confirmDesignSubmit = document.querySelector("#confirmDesignSubmit");
const summaryNote = document.querySelector("#summaryNote");

const storageAvailable = (() => {
  try {
    const testKey = "__visored_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
})();

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const getOptionValue = (select, label) => {
  if (!select || !label) return "";
  const normalizedLabel = label.trim().toLowerCase();
  const option = Array.from(select.options).find((item) => {
    return item.value.toLowerCase() === normalizedLabel || item.textContent.trim().toLowerCase() === normalizedLabel;
  });
  return option ? option.value : "";
};

const persistForm = (form, key) => {
  if (!form || !storageAvailable) return;

  const fields = Array.from(form.elements).filter((field) => field.name && field.type !== "file" && field.type !== "submit" && field.type !== "button");

  const save = () => {
    const values = {};
    fields.forEach((field) => {
      if (field.type === "checkbox") {
        if (!values[field.name]) values[field.name] = [];
        if (field.checked) values[field.name].push(field.value);
        return;
      }

      if (field.type === "radio") {
        if (field.checked) values[field.name] = field.value;
        return;
      }

      values[field.name] = field.value;
    });
    localStorage.setItem(key, JSON.stringify(values));
  };

  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const values = JSON.parse(saved);
      fields.forEach((field) => {
        if (!(field.name in values)) return;

        if (field.type === "checkbox") {
          field.checked = Array.isArray(values[field.name]) && values[field.name].includes(field.value);
          return;
        }

        if (field.type === "radio") {
          field.checked = values[field.name] === field.value;
          return;
        }

        field.value = values[field.name];
      });
    } catch {
      localStorage.removeItem(key);
    }
  }

  fields.forEach((field) => {
    field.addEventListener("input", save);
    field.addEventListener("change", save);
  });
};

persistForm(contactForm, "visored-contact-form");
persistForm(designForm, "visored-design-form");
persistForm(modalForm, "visored-modal-form");

const resetForm = (form, storageKey, note) => {
  if (!form) return;

  form.reset();

  form.querySelectorAll('input[type="color"]').forEach((input) => {
    input.value = "#ffffff";
    input.classList.add("color-unselected");
  });

  if (storageAvailable && storageKey) {
    localStorage.removeItem(storageKey);
  }

  if (note) {
    note.textContent = "Form cleared.";
    note.classList.remove("error");
  }
};

clearFormButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const confirmed = window.confirm("Are you sure you want to clear this form?");
    if (!confirmed) return;

    if (button.dataset.clearForm === "design") {
      resetForm(designForm, "visored-design-form", designNote);
      closeSummaryModal();
      if (photoNote) {
        photoNote.textContent = "You can select up to 4 pictures for the site direction.";
        photoNote.classList.remove("error");
      }
      return;
    }

    resetForm(modalForm, "visored-modal-form", modalFormNote);
  });
});

if (languageSwitch && storageAvailable) {
  const savedLanguage = localStorage.getItem("visored-language");
  if (savedLanguage) {
    languageSwitch.value = savedLanguage;
  }

  languageSwitch.addEventListener("change", () => {
    localStorage.setItem("visored-language", languageSwitch.value);
  });
}

if (packageSelect) {
  const selectedPackage = params.get("package");
  const allowedPackages = ["one-page", "starter", "growth", "event-promo", "ecommerce", "multiple", "na"];

  if (allowedPackages.includes(selectedPackage)) {
    packageSelect.value = selectedPackage;
  }
}

if (messageField && params.get("demo") === "free") {
  messageField.value = "I am interested in a free demo";
  messageField.dispatchEvent(new Event("input", { bubbles: true }));
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
  if (input.value && input.value.toLowerCase() !== "#ffffff") {
    input.classList.remove("color-unselected");
  }

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
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
});

const openModal = (packageName = "", demoType = "") => {
  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  if (modalPackage && packageName) {
    modalPackage.value = getOptionValue(modalPackage, packageName) || packageName;
    modalPackage.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (modalMessage && demoType === "free") {
    modalMessage.value = "I am interested in a free demo";
    modalMessage.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (modalMessage && packageName) {
    modalMessage.value = `I am interested in the ${packageName}.`;
    modalMessage.dispatchEvent(new Event("input", { bubbles: true }));
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
    openModal(trigger.dataset.package || "", trigger.dataset.demo || "");
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

const openSummaryModal = () => {
  if (!summaryModal) return;
  summaryModal.classList.add("open");
  summaryModal.setAttribute("aria-hidden", "false");
};

const closeSummaryModal = () => {
  if (!summaryModal) return;
  summaryModal.classList.remove("open");
  summaryModal.setAttribute("aria-hidden", "true");
};

summaryCloseButtons.forEach((button) => {
  button.addEventListener("click", closeSummaryModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeSummaryModal();
  }
});

if (modalForm && modalFormNote) {
  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    modalFormNote.textContent = "Thanks. This placeholder form is ready to connect to your real email or form service.";
  });
}

const toggleFaq = (question) => {
  if (!question) return;

  const answer = question.nextElementSibling;
  const isOpen = question.getAttribute("aria-expanded") === "true";
  question.setAttribute("aria-expanded", String(!isOpen));

  if (!answer) return;
  answer.style.maxHeight = isOpen ? "0" : `${answer.scrollHeight}px`;
};

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    toggleFaq(item.querySelector(".faq-question"));
  });
});

const addSummaryItem = (label, value) => {
  if (!summaryContent) return;
  const item = document.createElement("div");
  const strong = document.createElement("strong");
  const span = document.createElement("span");

  item.className = "summary-item";
  strong.textContent = label;
  span.textContent = value || "Not provided";
  item.append(strong, span);
  summaryContent.appendChild(item);
};

const selectedValues = (form, name) => {
  return Array.from(form.querySelectorAll(`[name="${name}"]:checked`)).map((field) => field.value).join(", ");
};

const colorValues = () => {
  return Array.from(colorInputs)
    .filter((input) => input.closest("#designForm") && !input.classList.contains("color-unselected"))
    .map((input) => input.value)
    .join(", ");
};

if (designForm && summaryContent) {
  designForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(designForm);
    summaryContent.innerHTML = "";

    addSummaryItem("Business Type", data.get("businessType"));
    addSummaryItem("Business Name", data.get("businessName"));
    addSummaryItem("Owner Name", data.get("ownerName"));
    addSummaryItem("Email", data.get("designEmail"));
    addSummaryItem("Phone", data.get("phone"));
    addSummaryItem("Current Website", data.get("currentWebsite"));
    addSummaryItem("Preferred Style", data.get("siteStyle"));
    addSummaryItem("Inspiration", data.get("inspiration"));
    addSummaryItem("Color Choices", colorValues());
    addSummaryItem("Pages Requested", selectedValues(designForm, "pages"));
    addSummaryItem("Add-Ons Requested", selectedValues(designForm, "features"));
    addSummaryItem("Reference Photos", photosInput && photosInput.files.length ? `${photosInput.files.length} selected` : "");
    addSummaryItem("Site Goal", data.get("mainGoal"));
    addSummaryItem("Must Include", data.get("mustInclude"));
    addSummaryItem("Other Request", data.get("otherRequest"));

    openSummaryModal();
  });
}

if (confirmDesignSubmit && designNote) {
  confirmDesignSubmit.addEventListener("click", () => {
    closeSummaryModal();
    designNote.textContent = "Thanks. This placeholder design form is ready to connect to your real submission workflow.";
    if (summaryNote) {
      summaryNote.textContent = "Design details reviewed.";
    }
  });
}
