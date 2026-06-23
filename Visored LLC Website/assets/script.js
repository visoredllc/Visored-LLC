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
const languageCurrent = document.querySelector(".language-current");
const languageOptions = document.querySelectorAll("[data-language]");
const params = new URLSearchParams(window.location.search);
const modal = document.querySelector("#contact-modal");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modalPackage = document.querySelector("#modalPackage");
const modalAddons = document.querySelector("#modalAddons");
const modalMessage = document.querySelector("#modalMessage");
const modalForm = document.querySelector("#servicesModalForm");
const modalFormNote = document.querySelector("#modalFormNote");
const faqItems = document.querySelectorAll(".faq-item");
const detailsModal = document.querySelector("#package-details-modal");
const detailsTriggers = document.querySelectorAll(".details-trigger");
const detailsCloseButtons = document.querySelectorAll("[data-details-close]");
const estimateModal = document.querySelector("#estimate-modal");
const estimateTriggers = document.querySelectorAll(".estimate-trigger");
const estimateCloseButtons = document.querySelectorAll("[data-estimate-close]");
const addonPreviewModal = document.querySelector("#addon-preview-modal");
const addonPreviewTriggers = document.querySelectorAll("[data-addon-preview]");
const addonPreviewCloseButtons = document.querySelectorAll("[data-addon-preview-close]");
const addonPreviewVisual = document.querySelector("#addonPreviewVisual");
const addonPreviewTitle = document.querySelector("#addonPreviewTitle");
const addonPreviewPrice = document.querySelector("#addonPreviewPrice");
const addonPreviewDescription = document.querySelector("#addonPreviewDescription");
const addonPreviewList = document.querySelector("#addonPreviewList");
const askAboutAddonButton = document.querySelector("#askAboutAddon");
const packageDetailsTitle = document.querySelector("#packageDetailsTitle");
const packageDetailsPrice = document.querySelector("#packageDetailsPrice");
const packageDetailsSummary = document.querySelector("#packageDetailsSummary");
const packageDetailsList = document.querySelector("#packageDetailsList");
const askAboutPackageButton = document.querySelector("#askAboutPackage");
const summaryModal = document.querySelector("#design-summary-modal");
const summaryContent = document.querySelector("#designSummaryContent");
const summaryCloseButtons = document.querySelectorAll("[data-summary-close]");
const confirmDesignSubmit = document.querySelector("#confirmDesignSubmit");
const summaryNote = document.querySelector("#summaryNote");
const fitButtons = document.querySelectorAll("[data-fit], [data-content], [data-updates], [data-priority]");
const fitPackage = document.querySelector("#fitPackage");
const fitReason = document.querySelector("#fitReason");
const fitDetails = document.querySelector("#fitDetails");
const estimatePackages = document.querySelectorAll('input[name="estimatePackage"]');
const estimateAddons = document.querySelectorAll("[data-estimate-addon]");
const estimateTotal = document.querySelector("#estimateTotal");
const estimateMonthly = document.querySelector("#estimateMonthly");
const estimateSummary = document.querySelector("#estimateSummary");
const estimateAskButton = document.querySelector(".estimate-output .modal-trigger");
const timelineStages = document.querySelectorAll("[data-timeline-stage]");
const timelineNote = document.querySelector("#timelineNote");

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

const packageDetails = {
  "Starter / Basic Package": {
    price: "$349",
    summary: "A polished multi-page website for small businesses that need a professional online presence without overcomplicating the launch.",
    bullets: [
      "Multi-page structure for your core business information.",
      "Clean, mobile-friendly layout built around trust and clarity.",
      "Ideal for service businesses, shops, contractors, and new brands.",
      "Paid updates are available after launch when you need changes.",
      "Requires the monthly site operations plan after launch."
    ]
  },
  "Advanced Growth Package": {
    price: "$499",
    summary: "A stronger launch package for businesses that want more room to explain services, show credibility, and keep early updates flexible.",
    bullets: [
      "Expanded multi-page structure with more room for content.",
      "Includes 7 free alterations after launch.",
      "Good fit for businesses with multiple services, offers, or customer paths.",
      "Built to support a more complete brand presentation.",
      "Requires the monthly site operations plan after launch."
    ]
  },
  "One-Page Launch": {
    price: "$269",
    summary: "A focused one-page website that gives customers the essentials quickly and clearly.",
    bullets: [
      "Single-page layout with the most important business details.",
      "Great for simple services, early-stage businesses, and quick launches.",
      "Mobile-friendly and easy to browse.",
      "Can be upgraded into a larger website later.",
      "Requires the monthly site operations plan after launch."
    ]
  },
  "Event / Promo Package": {
    price: "$149",
    summary: "A short-term promotional page for events, seasonal offers, launches, and limited-time campaigns.",
    bullets: [
      "One-time promotional page.",
      "Active for 60 days.",
      "Fast turnaround: 2-5 business days.",
      "Best for events, flyers, announcements, and limited offers.",
      "No monthly site operations plan required."
    ]
  }
};

let selectedDetailsPackage = "";
const fitState = {
  fit: "simple",
  content: "medium",
  updates: "medium",
  priority: "budget"
};

const fitDetailMap = {
  "Starter / Basic Package": [
    "Multi-page structure for core business info",
    "Good balance of price, polish, and launch speed",
    "Paid updates available after launch"
  ],
  "Advanced Growth Package": [
    "Expanded multi-page structure for more services or details",
    "7 free alterations included after launch",
    "Strong fit for businesses planning to grow online"
  ],
  "One-Page Launch": [
    "Focused single-page layout",
    "Great for business essentials and clear contact paths",
    "Can be upgraded into a larger site later"
  ],
  "Event / Promo Package": [
    "Built for a temporary campaign, event, or announcement",
    "Fast 2-5 business day turnaround",
    "No monthly site operations plan required"
  ]
};

const packageMap = {
  starter: { label: "Starter / Basic Package", price: 349, monthly: true },
  growth: { label: "Advanced Growth Package", price: 499, monthly: true },
  onepage: { label: "One-Page Launch", price: 269, monthly: true },
  promo: { label: "Event / Promo Package", price: 149, monthly: false }
};

const addonMap = {
  contact: { label: "Contact form", price: 9.99 },
  booking: { label: "Appointment scheduling", price: 14.99 },
  signup: { label: "Sign-up page", price: 8.99 },
  newsletter: { label: "Newsletter form", price: 8.99 },
  custom: { label: "Custom feature", price: 14.99 },
  language: { label: "Multi-language site", price: 14.99 },
  gallery: { label: "Photo gallery / portfolio", price: 10.99 },
  catalog: { label: "Catalog or before/after gallery", price: 12.99 },
  lead: { label: "Lead capture form upgrade", price: 11.99 },
  intake: { label: "Customer intake questionnaire", price: 11.99 },
  linkhub: { label: "Social media link hub", price: 6.99 },
  reviews: { label: "Review showcase section", price: 9.99 },
  faq: { label: "Custom FAQ section", price: 8.99 },
  downloads: { label: "Downloadable file section", price: 7.99 },
  banner: { label: "Pop-up announcement banner", price: 6.99 },
  accessibility: { label: "Accessibility polish", price: 12.99 }
};

const addonPreviews = {
  linkhub: {
    title: "Social Media Link Hub",
    price: "$6.99",
    visual: "Link hub",
    description: "A clean link page gives visitors one simple place to find social profiles, booking links, contact info, promos, and important calls to action.",
    bullets: ["Great for Instagram, TikTok, and QR codes.", "Keeps important links organized.", "Works well for mobile-first visitors."]
  },
  banner: {
    title: "Pop-Up Announcement Banner",
    price: "$6.99",
    visual: "Sale banner",
    description: "A site banner can highlight urgent updates, sales, events, holiday hours, limited-time offers, or important business announcements.",
    bullets: ["Useful for seasonal promos.", "Can point visitors to a contact form or offer.", "Easy to update when campaigns change."]
  },
  downloads: {
    title: "Downloadable File Section",
    price: "$7.99",
    visual: "PDF downloads",
    description: "This section gives customers a simple way to download menus, flyers, waivers, price sheets, forms, brochures, or other important documents.",
    bullets: ["Good for restaurants, events, forms, and policies.", "Keeps files easy to find.", "Can support multiple downloadable resources."]
  },
  signup: {
    title: "Sign-Up Page",
    price: "$8.99",
    visual: "Sign-up form",
    description: "A focused sign-up page helps collect interest for programs, events, waitlists, classes, announcements, or new offers.",
    bullets: ["Keeps one offer front and center.", "Can collect basic visitor details.", "Useful for launches and waitlists."]
  },
  newsletter: {
    title: "Newsletter Form",
    price: "$8.99",
    visual: "Newsletter block",
    description: "A newsletter form gives visitors a way to stay connected with updates, announcements, promotions, and business news.",
    bullets: ["Supports ongoing customer communication.", "Works well near the footer or homepage.", "Can help build a repeat audience."]
  },
  faq: {
    title: "Custom FAQ Section",
    price: "$8.99",
    visual: "FAQ accordion",
    description: "A custom FAQ section answers common questions before customers contact you, which can reduce confusion and make your business feel more prepared.",
    bullets: ["Great for policies, pricing, services, and timelines.", "Can use smooth open-close questions.", "Builds trust with clear answers."]
  },
  contact: {
    title: "Contact Form",
    price: "$9.99",
    visual: "Contact form",
    description: "A contact form lets visitors send questions, quote requests, project details, or general messages directly from the website.",
    bullets: ["Can include name, email, phone, and project details.", "Helps organize incoming leads.", "A strong fit for service businesses."]
  },
  reviews: {
    title: "Review Showcase Section",
    price: "$9.99",
    visual: "Review cards",
    description: "A review section highlights testimonials, ratings, screenshots, or client quotes so visitors can quickly see proof of trust.",
    bullets: ["Builds credibility fast.", "Can show multiple reviews in cards.", "Useful on home, service, or landing pages."]
  },
  gallery: {
    title: "Photo Gallery / Portfolio",
    price: "$10.99",
    visual: "Image gallery",
    description: "A gallery helps show products, spaces, completed jobs, team photos, menus, designs, or visual proof of your work.",
    bullets: ["Great for contractors, beauty, food, retail, and events.", "Makes the site feel more real and personal.", "Can be organized into simple sections."]
  },
  lead: {
    title: "Lead Capture Form Upgrade",
    price: "$11.99",
    visual: "Lead form",
    description: "A lead form upgrade asks better questions up front so you can understand budgets, timelines, service needs, and project details earlier.",
    bullets: ["Useful for quotes and consultations.", "Can reduce back-and-forth messages.", "Helps qualify serious inquiries."]
  },
  intake: {
    title: "Customer Intake Questionnaire",
    price: "$11.99",
    visual: "Intake questionnaire",
    description: "A customer intake questionnaire collects the important details you need before a call, quote, appointment, or service request.",
    bullets: ["Great for service businesses and consultations.", "Can ask about goals, needs, deadlines, and preferences.", "Helps make every inquiry feel more organized."]
  },
  catalog: {
    title: "Catalog or Before/After Gallery",
    price: "$12.99",
    visual: "Catalog cards",
    description: "A catalog or before-and-after layout lets you present menus, service categories, product groups, transformations, or project results clearly.",
    bullets: ["Great for visual comparisons.", "Helps customers browse offerings.", "Works well for services and products."]
  },
  accessibility: {
    title: "Accessibility Polish",
    price: "$12.99",
    visual: "Accessibility checks",
    description: "Accessibility polish improves readability, labels, contrast, alt text, keyboard flow, and general usability so more visitors can use the site comfortably.",
    bullets: ["Improves clarity and usability.", "Supports better labels and contrast.", "Makes the site easier for more people to navigate."]
  },
  booking: {
    title: "Appointment Scheduling",
    price: "$14.99",
    visual: "Booking widget",
    description: "A scheduling add-on helps visitors book appointments, consultations, calls, or services through a clear booking path.",
    bullets: ["Good for salons, consultants, service providers, and classes.", "Can point to an external booking tool.", "Makes next steps easier for customers."]
  },
  custom: {
    title: "Custom Features",
    price: "$14.99",
    visual: "Custom feature",
    description: "Custom features cover special ideas that do not fit the standard list, such as unique sections, interactive blocks, special forms, or custom layouts.",
    bullets: ["Built around the specific business need.", "Good for unusual workflows or content.", "Scoped after discussing the feature."]
  },
  language: {
    title: "Multi-Language Site",
    price: "$14.99",
    visual: "Language switch",
    description: "A multi-language add-on adds a language switch so visitors can view site content in another language.",
    bullets: ["Useful for bilingual audiences.", "Can make the site more welcoming.", "Works well for service-area and community-focused businesses."]
  }
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (languageSwitch && siteNav) {
  languageSwitch.insertAdjacentElement("beforebegin", document.createElement("span"));
  const languagePlaceholder = languageSwitch.previousElementSibling;
  languagePlaceholder.hidden = true;

  const placeLanguageSwitch = () => {
    if (window.matchMedia("(max-width: 880px)").matches) {
      if (!siteNav.contains(languageSwitch)) {
        siteNav.appendChild(languageSwitch);
      }
      return;
    }

    if (languagePlaceholder.parentNode && languageSwitch.previousElementSibling !== languagePlaceholder) {
      languagePlaceholder.insertAdjacentElement("afterend", languageSwitch);
    }
  };

  placeLanguageSwitch();
  window.addEventListener("resize", placeLanguageSwitch);
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
  form.querySelectorAll("select").forEach((select) => {
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });

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

const validateOwnerContact = (form, ownerSelector, emailSelector, phoneSelector, note) => {
  if (!form) return true;

  const owner = form.querySelector(ownerSelector);
  const email = form.querySelector(emailSelector);
  const phone = form.querySelector(phoneSelector);

  [owner, email].forEach((field) => {
    if (field) field.setCustomValidity("");
  });

  if (owner && !owner.value.trim()) {
    owner.setCustomValidity("Please enter the owner name.");
  }

  if (email && phone && !email.value.trim() && !phone.value.trim()) {
    email.setCustomValidity("Please enter either an email address or a phone number.");
  }

  const isValid = form.checkValidity();
  if (!isValid) {
    if (note) {
      note.textContent = "Please enter the owner name and either an email address or a phone number.";
      note.classList.add("error");
    }
    form.reportValidity();
    return false;
  }

  if (note) {
    note.classList.remove("error");
  }
  return true;
};

const clearModalForBlankOpen = () => {
  if (!modalForm) return;

  modalForm.reset();
  modalForm.querySelectorAll("select").forEach((select) => {
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  modalForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.setCustomValidity("");
  });

  if (storageAvailable) {
    localStorage.removeItem("visored-modal-form");
  }

  if (modalFormNote) {
    modalFormNote.textContent = "After you submit, Visored reviews your details and typically responds within 1 business day. Placeholder form only until connected to email or a form service.";
    modalFormNote.classList.remove("error");
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

if (languageSwitch && languageCurrent) {
  const savedLanguage = storageAvailable ? localStorage.getItem("visored-language") : "";
  if (savedLanguage) {
    languageCurrent.textContent = savedLanguage;
  }

  languageCurrent.addEventListener("click", () => {
    const isOpen = languageSwitch.classList.toggle("open");
    languageCurrent.setAttribute("aria-expanded", String(isOpen));
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const language = option.dataset.language || option.textContent.trim();
      languageCurrent.textContent = language;
      if (storageAvailable) {
        localStorage.setItem("visored-language", language);
      }
      languageSwitch.classList.remove("open");
      languageCurrent.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!languageSwitch.contains(event.target)) {
      languageSwitch.classList.remove("open");
      languageCurrent.setAttribute("aria-expanded", "false");
    }
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

const closeCustomSelects = (currentSelect = null) => {
  document.querySelectorAll(".custom-select.open").forEach((select) => {
    if (select === currentSelect) return;
    select.classList.remove("open");
    select.querySelector(".custom-select-button")?.setAttribute("aria-expanded", "false");
  });
};

const enhanceSelects = () => {
  document.querySelectorAll("select").forEach((select) => {
    if (select.dataset.enhancedSelect === "true") return;

    select.dataset.enhancedSelect = "true";
    select.classList.add("native-select-hidden");

    const customSelect = document.createElement("div");
    const button = document.createElement("button");
    const buttonText = document.createElement("span");
    const menu = document.createElement("div");
    const menuId = `${select.id || select.name || "select"}-custom-options`;

    customSelect.className = "custom-select";
    button.className = "custom-select-button";
    button.type = "button";
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", menuId);
    menu.className = "custom-select-options";
    menu.id = menuId;
    menu.setAttribute("role", "listbox");

    button.appendChild(buttonText);
    customSelect.append(button, menu);

    const syncSelect = () => {
      const selectedOption = select.options[select.selectedIndex] || select.options[0];
      buttonText.textContent = selectedOption ? selectedOption.textContent : "----";

      menu.querySelectorAll("[data-select-value]").forEach((optionButton) => {
        const isSelected = optionButton.dataset.selectValue === select.value;
        optionButton.classList.toggle("selected", isSelected);
        optionButton.setAttribute("aria-selected", String(isSelected));
      });
    };

    Array.from(select.options).forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.role = "option";
      optionButton.dataset.selectValue = option.value;
      optionButton.textContent = option.textContent;
      optionButton.disabled = option.disabled;

      optionButton.addEventListener("click", () => {
        select.value = option.value;
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
        customSelect.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      });

      menu.appendChild(optionButton);
    });

    button.addEventListener("click", () => {
      const isOpen = customSelect.classList.toggle("open");
      closeCustomSelects(customSelect);
      button.setAttribute("aria-expanded", String(isOpen));
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        customSelect.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        customSelect.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        menu.querySelector("button:not(:disabled)")?.focus();
      }
    });

    menu.addEventListener("keydown", (event) => {
      const options = Array.from(menu.querySelectorAll("button:not(:disabled)"));
      const currentIndex = options.indexOf(document.activeElement);

      if (event.key === "Escape") {
        customSelect.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        options[Math.min(currentIndex + 1, options.length - 1)]?.focus();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        options[Math.max(currentIndex - 1, 0)]?.focus();
      }
    });

    select.addEventListener("change", syncSelect);
    select.insertAdjacentElement("afterend", customSelect);
    syncSelect();
  });
};

enhanceSelects();

document.addEventListener("click", (event) => {
  if (!event.target.closest(".custom-select")) {
    closeCustomSelects();
  }
});

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateOwnerContact(contactForm, "#name", "#email", "#phone", formNote)) return;
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

const openModal = (packageName = "", demoType = "", addOns = "") => {
  if (!modal) return;

  if (demoType === "blank-package") {
    clearModalForBlankOpen();
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  if (modalPackage && demoType === "addon-only") {
    modalPackage.value = "";
    modalPackage.dispatchEvent(new Event("change", { bubbles: true }));
  } else if (modalPackage && packageName) {
    modalPackage.value = getOptionValue(modalPackage, packageName) || packageName;
    modalPackage.dispatchEvent(new Event("change", { bubbles: true }));
  } else if (modalPackage && demoType === "blank-package") {
    modalPackage.value = "";
    modalPackage.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (modalAddons && demoType === "package-only") {
    modalAddons.value = "";
    modalAddons.dispatchEvent(new Event("change", { bubbles: true }));
  } else if (modalAddons && addOns) {
    const addOnList = addOns.split(",").map((item) => item.trim()).filter(Boolean);
    if (addOnList.length === 1) {
      modalAddons.value = getOptionValue(modalAddons, addOnList[0]) || "";
    } else if (addOnList.length > 1) {
      modalAddons.value = "Multiple add-ons / not sure yet";
    }
    modalAddons.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (modalMessage && demoType === "free") {
    modalMessage.value = "I am interested in a free demo";
    modalMessage.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (modalMessage && demoType === "addon-only" && addOns) {
    modalMessage.value = `I am interested in the ${addOns} add-on.`;
    modalMessage.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (modalMessage && packageName) {
    modalMessage.value = `I am interested in the ${packageName}.`;
    if (addOns) {
      modalMessage.value += `\nAdd-ons selected: ${addOns}.`;
    }
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

const openEstimateModal = () => {
  if (!estimateModal) return;
  estimateModal.classList.add("open");
  estimateModal.setAttribute("aria-hidden", "false");

  const firstInput = estimateModal.querySelector("input, button");
  if (firstInput) firstInput.focus();
};

const closeEstimateModal = () => {
  if (!estimateModal) return;
  estimateModal.classList.remove("open");
  estimateModal.setAttribute("aria-hidden", "true");
};

const renderAddonPreviewMockup = (addonKey, preview) => {
  const layouts = {
    contact: `
      <div class="mock-form-card">
        <b>Send a Message</b>
        <span>Name</span><span>Email</span><span>Phone</span>
        <span class="large">How can we help?</span>
        <button>Submit</button>
      </div>
      <div class="mock-side-note"><b>@</b><span>New customer inquiry</span></div>
    `,
    lead: `
      <div class="mock-form-card">
        <b>Request a Quote</b>
        <span>Budget range</span><span>Project timeline</span><span>Service needed</span>
        <span class="large">Tell us about the job</span>
        <button>Get Quote</button>
      </div>
      <div class="mock-progress"><i></i><i></i><i></i></div>
    `,
    intake: `
      <div class="mock-form-card">
        <b>Customer Intake</b>
        <span>What service do you need?</span><span>Preferred date</span><span>Project address</span>
        <span class="large">Anything we should know first?</span>
        <button>Send Intake</button>
      </div>
      <div class="mock-progress"><i></i><i></i><i></i><i></i></div>
    `,
    gallery: `
      <div class="mock-gallery-grid">
        <i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
      <div class="mock-caption">Portfolio / product photos</div>
    `,
    catalog: `
      <div class="mock-catalog-grid">
        <i><b>Before</b></i><i><b>After</b></i><i><b>Service</b></i><i><b>Result</b></i>
      </div>
    `,
    booking: `
      <div class="mock-calendar">
        <b>Book an Appointment</b>
        <div><span>Mon</span><span>Tue</span><span>Wed</span></div>
        <div><button>10:00</button><button>1:30</button><button>4:00</button></div>
      </div>
      <div class="mock-confirm">Appointment selected</div>
    `,
    reviews: `
      <div class="mock-review-card"><b>5/5</b><p>"Great service and clean results."</p><span>Customer Review</span></div>
      <div class="mock-review-row"><i></i><i></i><i></i></div>
    `,
    faq: `
      <div class="mock-faq">
        <button>How does this work? <b>+</b></button>
        <button>What is included? <b>+</b></button>
        <button>Can I update later? <b>+</b></button>
      </div>
    `,
    downloads: `
      <div class="mock-files">
        <i><b>PDF</b><span>Menu</span></i>
        <i><b>PDF</b><span>Flyer</span></i>
        <i><b>DOC</b><span>Form</span></i>
      </div>
    `,
    newsletter: `
      <div class="mock-newsletter">
        <b>Join Our Updates</b>
        <p>Promos, news, and announcements.</p>
        <span>Email address</span>
        <button>Subscribe</button>
      </div>
    `,
    signup: `
      <div class="mock-signup">
        <b>Reserve Your Spot</b>
        <span>Full name</span><span>Email</span><span>Program interest</span>
        <button>Sign Up</button>
      </div>
    `,
    banner: `
      <div class="mock-announcement">Limited-Time Offer</div>
      <div class="mock-page-lines"><i></i><i></i><i></i></div>
    `,
    language: `
      <div class="mock-language">
        <button>English</button><button>Spanish</button>
        <div><b>Hello</b><span>Hola</span></div>
      </div>
    `,
    linkhub: `
      <div class="mock-linkhub">
        <b>Visored Links</b>
        <button>Book Now</button><button>Instagram</button><button>Contact Us</button><button>Current Offer</button>
      </div>
    `,
    accessibility: `
      <div class="mock-accessibility">
        <b>Accessibility Check</b>
        <span>Contrast: Pass</span><span>Alt text: Added</span><span>Keyboard flow: Clear</span>
      </div>
    `,
    custom: `
      <div class="mock-custom">
        <b>Custom Feature</b>
        <div><i></i><i></i><i></i><i></i></div>
        <span>Built around your workflow</span>
      </div>
    `
  };

  return `
    <div class="preview-browser">
      <div class="preview-browser-bar"><span></span><span></span><span></span></div>
      <div class="preview-mock ${addonKey}">
        <strong>${preview.visual}</strong>
        ${layouts[addonKey] || layouts.custom}
      </div>
    </div>
  `;
};

const openAddonPreview = (addonKey) => {
  if (!addonPreviewModal) return;
  const preview = addonPreviews[addonKey];
  if (!preview) return;

  addonPreviewTitle.textContent = preview.title;
  addonPreviewPrice.textContent = preview.price;
  addonPreviewDescription.textContent = preview.description;
  addonPreviewList.innerHTML = "";

  preview.bullets.forEach((detail) => {
    const item = document.createElement("li");
    item.textContent = detail;
    addonPreviewList.appendChild(item);
  });

  addonPreviewVisual.innerHTML = renderAddonPreviewMockup(addonKey, preview);

  if (askAboutAddonButton) {
    askAboutAddonButton.dataset.addons = preview.title;
    askAboutAddonButton.dataset.package = "";
    askAboutAddonButton.dataset.demo = "addon-only";
  }

  addonPreviewModal.classList.add("open");
  addonPreviewModal.setAttribute("aria-hidden", "false");
  addonPreviewModal.querySelector("button")?.focus();
};

const closeAddonPreview = () => {
  if (!addonPreviewModal) return;
  addonPreviewModal.classList.remove("open");
  addonPreviewModal.setAttribute("aria-hidden", "true");
};

const openDetailsModal = (packageName) => {
  if (!detailsModal) return;
  const details = packageDetails[packageName];
  if (!details) return;

  selectedDetailsPackage = packageName;
  packageDetailsTitle.textContent = packageName;
  packageDetailsPrice.textContent = details.price;
  packageDetailsSummary.textContent = details.summary;
  packageDetailsList.innerHTML = "";

  details.bullets.forEach((detail) => {
    const item = document.createElement("li");
    item.textContent = detail;
    packageDetailsList.appendChild(item);
  });

  detailsModal.classList.add("open");
  detailsModal.setAttribute("aria-hidden", "false");
};

const closeDetailsModal = () => {
  if (!detailsModal) return;
  detailsModal.classList.remove("open");
  detailsModal.setAttribute("aria-hidden", "true");
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    closeEstimateModal();
    closeAddonPreview();
    const demoType = trigger.dataset.packageDefault === "blank" ? "blank-package" : trigger.dataset.demo || "";
    openModal(trigger.dataset.package || "", demoType, trigger.dataset.addons || "");
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

detailsTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openDetailsModal(trigger.dataset.package || "");
  });
});

detailsCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDetailsModal);
});

estimateTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openEstimateModal);
});

estimateCloseButtons.forEach((button) => {
  button.addEventListener("click", closeEstimateModal);
});

addonPreviewTriggers.forEach((trigger) => {
  const open = () => openAddonPreview(trigger.dataset.addonPreview || "");
  trigger.addEventListener("click", open);
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
});

addonPreviewCloseButtons.forEach((button) => {
  button.addEventListener("click", closeAddonPreview);
});

if (askAboutPackageButton) {
  askAboutPackageButton.addEventListener("click", () => {
    const packageName = selectedDetailsPackage;
    closeDetailsModal();
    openModal(packageName, "package-only");
  });
}

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
    closeDetailsModal();
    closeEstimateModal();
    closeAddonPreview();
    closeSummaryModal();
    if (languageSwitch && languageCurrent) {
      languageSwitch.classList.remove("open");
      languageCurrent.setAttribute("aria-expanded", "false");
    }
  }
});

if (modalForm && modalFormNote) {
  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateOwnerContact(modalForm, "#modalName", "#modalEmail", "#modalPhone", modalFormNote)) return;
    modalFormNote.textContent = "Thanks. This placeholder form is ready to connect to your real email or form service.";
  });
}

const toggleFaq = (question) => {
  if (!question) return;

  const answer = question.nextElementSibling;
  const isOpen = question.getAttribute("aria-expanded") === "true";
  question.setAttribute("aria-expanded", String(!isOpen));

  if (!answer) return;
  answer.classList.toggle("open", !isOpen);
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
    if (!validateOwnerContact(designForm, "#ownerName", "#designEmail", "#phone", designNote)) return;
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

const updateFitFinder = () => {
  if (!fitPackage || !fitReason) return;

  let packageName = "Starter / Basic Package";
  let reason = "A practical starting point for a professional small-business website.";

  if (fitState.fit === "promo") {
    packageName = "Event / Promo Package";
    reason = "Best when you need a focused page for a limited-time event, launch, sale, or announcement.";
  } else if (fitState.priority === "fast" && fitState.content === "low") {
    packageName = "One-Page Launch";
    reason = "A focused one-page site is the fastest way to cover the essentials and get customers moving.";
  } else if (fitState.fit === "simple" && fitState.content === "low" && fitState.updates !== "high") {
    packageName = "One-Page Launch";
    reason = "A clean one-page site can cover the essentials without making the project bigger than it needs to be.";
  } else if (fitState.fit === "growth" || fitState.content === "high" || fitState.updates === "high" || fitState.priority === "flexible") {
    packageName = "Advanced Growth Package";
    reason = "A stronger multi-page setup gives your business more room to explain services, build trust, and handle updates.";
  }

  fitPackage.textContent = packageName;
  fitReason.textContent = reason;

  if (fitDetails) {
    fitDetails.innerHTML = "";
    (fitDetailMap[packageName] || []).forEach((detail) => {
      const item = document.createElement("li");
      item.textContent = detail;
      fitDetails.appendChild(item);
    });
  }

  const fitAskButton = document.querySelector(".fit-result .details-trigger");
  if (fitAskButton) {
    fitAskButton.dataset.package = packageName;
  }
};

fitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.fit ? "fit" : button.dataset.content ? "content" : button.dataset.updates ? "updates" : "priority";
    fitState[group] = button.dataset[group];

    document.querySelectorAll(`[data-${group}]`).forEach((item) => {
      item.classList.toggle("selected", item === button);
    });

    updateFitFinder();
  });
});

Object.entries(fitState).forEach(([group, value]) => {
  document.querySelectorAll(`[data-${group}]`).forEach((item) => {
    item.classList.toggle("selected", item.dataset[group] === value);
  });
});

updateFitFinder();

const saveEstimateState = () => {
  if (!storageAvailable || !estimatePackages.length) return;
  const selectedPackageKey = Array.from(estimatePackages).find((item) => item.checked)?.value || "starter";
  const selectedAddons = Array.from(estimateAddons).filter((item) => item.checked).map((item) => item.value);
  localStorage.setItem("visored-estimate-state", JSON.stringify({ package: selectedPackageKey, addons: selectedAddons }));
};

const restoreEstimateState = () => {
  if (!storageAvailable || !estimatePackages.length) return;
  const saved = localStorage.getItem("visored-estimate-state");
  if (!saved) return;

  try {
    const state = JSON.parse(saved);
    estimatePackages.forEach((item) => {
      item.checked = item.value === state.package;
    });
    estimateAddons.forEach((item) => {
      item.checked = Array.isArray(state.addons) && state.addons.includes(item.value);
    });
  } catch {
    localStorage.removeItem("visored-estimate-state");
  }
};

let estimateTotalTimer;

const setEstimateTotal = (value, animate = true) => {
  if (!estimateTotal) return;

  if (!animate || estimateTotal.textContent === value) {
    estimateTotal.textContent = value;
    return;
  }

  window.clearTimeout(estimateTotalTimer);
  estimateTotal.classList.remove("total-morph-in");
  estimateTotal.classList.add("total-morph-out");

  estimateTotalTimer = window.setTimeout(() => {
    estimateTotal.textContent = value;
    estimateTotal.classList.remove("total-morph-out");
    estimateTotal.classList.add("total-morph-in");

    estimateTotalTimer = window.setTimeout(() => {
      estimateTotal.classList.remove("total-morph-in");
    }, 340);
  }, 150);
};

const updateEstimate = (animate = true) => {
  if (!estimateTotal || !estimateMonthly || !estimateSummary) return;

  const selectedPackageKey = Array.from(estimatePackages).find((item) => item.checked)?.value || "starter";
  const selectedPackage = packageMap[selectedPackageKey];
  const selectedAddons = Array.from(estimateAddons).filter((item) => item.checked);
  const addonTotal = selectedAddons.reduce((sum, item) => sum + (addonMap[item.value]?.price || 0), 0);
  const total = selectedPackage.price + addonTotal;

  setEstimateTotal(`$${total.toFixed(2).replace(".00", "")}`, animate);
  estimateMonthly.innerHTML = selectedPackage.monthly
    ? '<span class="estimate-financing">Financing Available!</span><span>$49.99 monthly site operations plan applies after launch.</span>'
    : "<span>No monthly site operations plan required for the Event / Promo Package.</span>";

  estimateSummary.innerHTML = "";
  const summaryLines = [selectedPackage.label];

  if (selectedAddons.length) {
    selectedAddons.forEach((addon) => {
      const details = addonMap[addon.value];
      summaryLines.push(`- ${details?.label || addon.value} ($${(details?.price || 0).toFixed(2)})`);
    });
  } else {
    summaryLines.push("No add-ons selected");
  }

  summaryLines.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    estimateSummary.appendChild(item);
  });

  if (estimateAskButton) {
    estimateAskButton.dataset.package = selectedPackage.label;
    estimateAskButton.dataset.addons = selectedAddons.map((item) => addonMap[item.value]?.label || item.value).join(", ");
  }

  saveEstimateState();
};

restoreEstimateState();
estimatePackages.forEach((item) => item.addEventListener("change", updateEstimate));
estimateAddons.forEach((item) => item.addEventListener("change", updateEstimate));
updateEstimate(false);

const timelineMessages = {
  "01": "Demo stage: Visored builds a visual direction so you can see possibilities before committing.",
  "02": "Feedback stage: You share what feels right, what needs changing, and what should be added.",
  "03": "Development stage: The full site is personalized, made functional, and prepared for launch.",
  "04": "Review stage: You get a final window to request adjustments before future changes become add-ons."
};

timelineStages.forEach((stage) => {
  stage.addEventListener("click", () => {
    const wasActive = stage.classList.contains("active-stage");
    timelineStages.forEach((item) => item.classList.remove("active-stage"));

    if (timelineNote) {
      if (wasActive) {
        timelineNote.textContent = "Select a timeline step to spotlight that part of the process.";
        return;
      }

      stage.classList.add("active-stage");
      timelineNote.textContent = timelineMessages[stage.dataset.timelineStage] || "Select a timeline step to spotlight that part of the process.";
    }
  });
});

document.querySelectorAll(".feature-card, .price-card, .review-card, .next-step-grid article, .add-on-grid article, .idea-strip article, .process-detail-grid article, .faq-item, .estimate-output, .estimate-controls fieldset").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

const revealTargets = document.querySelectorAll(
  "main > section, .feature-card, .price-card, .review-card, .next-step-grid article, .timeline-diagram article, .add-on-grid article, .process-detail-grid article, .faq-item, .contact-card, fieldset, .idea-strip article"
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach((target) => target.classList.add("reveal-on-scroll"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
