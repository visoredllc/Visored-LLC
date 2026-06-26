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
let languageGate;
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
const estimatePackages = document.querySelectorAll('input[name="estimatePackage"]');
const estimateAddons = document.querySelectorAll("[data-estimate-addon]");
const estimateTotal = document.querySelector("#estimateTotal");
const estimateMonthly = document.querySelector("#estimateMonthly");
const estimateSummary = document.querySelector("#estimateSummary");
const estimateAskButton = document.querySelector(".estimate-output .modal-trigger");
const timelineStages = document.querySelectorAll("[data-timeline-stage]");
const timelineNote = document.querySelector("#timelineNote");

const WEB3FORMS_ACCESS_KEY = "ce67c509-c660-40e6-8bc2-305f0e3b5906";
const CONTACT_FORM_ENDPOINT = "https://api.web3forms.com/submit";
const CONTACT_FORM_DEFAULT_NOTE = "After you submit, Visored reviews your details and typically responds within 1 business day.";
const CONTACT_FORM_SUCCESS_NOTE = "Thanks. Your message has been sent to Visored.";
const CONTACT_FORM_ERROR_NOTE = "Something went wrong while sending your message. Please try again in a moment.";

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
  }
};

let selectedDetailsPackage = "";
let activeLanguage = "English";

const translations = {
  Spanish: {
    "Home": "Inicio",
    "Services": "Servicios",
    "How It Works": "Como Funciona",
    "Design My Site": "Disenar Mi Sitio",
    "Contact": "Contacto",
    "FAQ": "Preguntas",
    "English": "Ingles",
    "Spanish": "Espanol",
    "Get your": "Obtenga su",
    "FREE DEMO": "DEMO GRATIS",
    "in as little as": "en tan solo",
    "48 hours!": "48 horas!",
    "Friendly websites for real business goals": "Sitios web amigables para metas reales de negocio",
    "Clean websites. Easy process. Real results.": "Sitios limpios. Proceso facil. Resultados reales.",
    "Financing Options Available!": "Opciones de financiamiento disponibles!",
    "Visored LLC builds and maintains clean, practical websites for companies nationwide that need a strong online presence without an overcomplicated process.": "Visored LLC crea y mantiene sitios web limpios y practicos para empresas en todo el pais que necesitan una presencia en linea solida sin un proceso complicado.",
    "Free demo first": "Demo gratis primero",
    "Simple feedback process": "Proceso de comentarios simple",
    "Built around your brand": "Creado alrededor de su marca",
    "Request FREE Demo": "Solicitar DEMO GRATIS",
    "After You Request a Demo": "Despues de Solicitar una Demo",
    "Simple next steps, no complicated setup.": "Pasos simples, sin configuracion complicada.",
    "Once you request a free demo, Visored reviews your business details, builds a preview direction, and follows up so you can decide what changes you want before moving forward.": "Despues de solicitar una demo gratis, Visored revisa los detalles de su negocio, crea una vista previa y hace seguimiento para que pueda decidir que cambios desea antes de continuar.",
    "Submit Your Details": "Envie sus Detalles",
    "Receive a Demo": "Reciba una Demo",
    "Review Together": "Revisamos Juntos",
    "What we do": "Lo que hacemos",
    "We make small-business websites feel clear, current, and credible.": "Hacemos que los sitios web de pequenos negocios se sientan claros, actuales y confiables.",
    "How It Works": "Como Funciona",
    "Free demo, clear feedback, then a full build when you are ready.": "Demo gratis, comentarios claros y luego el desarrollo completo cuando este listo.",
    "View the Full Process": "Ver el Proceso Completo",
    "Reviews": "Resenas",
    "Website Builds": "Creacion de Sitios Web",
    "Ongoing Maintenance": "Mantenimiento Continuo",
    "Useful Add-Ons": "Add-ons Utiles",
    "Why Visored?": "Por que Visored?",
    "A friendly process with professional results.": "Un proceso amigable con resultados profesionales.",
    "Built for Small Businesses": "Creado para Pequenos Negocios",
    "Fast Turnaround": "Entrega Rapida",
    "High-Quality Websites": "Sitios Web de Alta Calidad",
    "Easy Updates": "Actualizaciones Faciles",
    "Flexible Pricing": "Precios Flexibles",
    "Simple Process": "Proceso Simple",
    "Personal Support": "Soporte Personal",
    "Made to Help Businesses Grow": "Creado para Ayudar a Crecer",
    "Ready to Begin?": "Listo para Empezar?",
    "Start with a free demo or plan your site details.": "Comience con una demo gratis o planifique los detalles de su sitio.",
    "You can request a demo quickly, or use the planning form if you already know what you want included.": "Puede solicitar una demo rapidamente o usar el formulario de planificacion si ya sabe que desea incluir.",
    "More Details": "Mas Detalles",
    "Design My Site": "Disenar Mi Sitio",
    "Share the basics. We will help shape the rest.": "Comparta lo basico. Nosotros ayudaremos a dar forma al resto.",
    "A simpler planning form for your business, style, pages, and must-have details.": "Un formulario mas simple para su negocio, estilo, paginas y detalles importantes.",
    "Start with what you know.": "Empiece con lo que sabe.",
    "Only owner name and one contact method are required. Everything else is optional and can be refined together.": "Solo se requiere el nombre del dueno y un metodo de contacto. Todo lo demas es opcional y se puede refinar juntos.",
    "Start Here": "Empiece Aqui",
    "Tell us who to contact and what kind of business the site is for.": "Diganos a quien contactar y para que tipo de negocio sera el sitio.",
    "Look & Feel": "Estilo y Sensacion",
    "Pick a style, add inspiration, or leave it blank if you want us to suggest a direction.": "Elija un estilo, agregue inspiracion, o dejelo en blanco si quiere que sugiramos una direccion.",
    "Choose the pages and optional features you are interested in.": "Elija las paginas y funciones opcionales que le interesan.",
    "Add-ons are optional. You can leave this blank and ask for a recommendation.": "Los add-ons son opcionales. Puede dejar esto en blanco y pedir una recomendacion.",
    "Goals & Notes": "Metas y Notas",
    "Add photos, goals, and anything important that should guide the site.": "Agregue fotos, metas y cualquier detalle importante que debe guiar el sitio.",
    "Our Timeline": "Nuestro Cronograma",
    "From First Demo to Final Handoff": "Desde la Primera Demo hasta la Entrega Final",
    "Before We Start": "Antes de Empezar",
    "Payment": "Pago",
    "Monthly Care": "Cuidado Mensual",
    "Updates": "Actualizaciones",
    "Website packages and support built for small businesses.": "Paquetes web y soporte creados para pequenos negocios.",
    "Our Packages": "Nuestros Paquetes",
    "Add-ons": "Add-ons",
    "Interactive Estimate": "Estimado Interactivo",
    "Common questions before starting your website.": "Preguntas comunes antes de comenzar su sitio web."
  }
};

let reverseTranslations = Object.fromEntries(
  Object.entries(translations.Spanish).map(([english, spanish]) => [spanish, english])
);

const languageLabels = {
  English: "English",
  Spanish: "Espanol"
};

const languageGateMarkup = `
  <div class="language-gate" id="language-gate" aria-hidden="true">
    <section class="language-gate-panel" role="dialog" aria-modal="true" aria-labelledby="languageGateTitle">
      <p class="section-label">Language / Idioma</p>
      <h2 id="languageGateTitle">Choose your language</h2>
      <p>Select how you want to view the Visored website. / Seleccione como quiere ver el sitio de Visored.</p>
      <div class="language-gate-actions">
        <button class="button primary" type="button" data-gate-language="English">English</button>
        <button class="button secondary" type="button" data-gate-language="Spanish">Espanol</button>
      </div>
    </section>
  </div>
`;

Object.assign(translations.Spanish, {
  "A clear website process from first demo to launch.": "Un proceso claro desde la primera demo hasta el lanzamiento.",
  "Choose a simple starting point, then add the features and update support your business needs.": "Elija un punto de inicio simple y agregue las funciones y soporte que su negocio necesita.",
  "Choose the package that fits your current business needs, then add features as your website grows.": "Elija el paquete que se ajuste a sus necesidades actuales y agregue funciones conforme crezca su sitio.",
  "Not sure what you need yet? You can still request a free demo and we will help point you toward the right starting place.": "Aun no sabe que necesita? Puede solicitar una demo gratis y le ayudaremos a elegir el mejor punto de inicio.",
  "Flexible financing options available!": "Opciones de financiamiento disponibles!",
  "Advanced Growth Package": "Paquete Avanzado de Crecimiento",
  "Advanced Growth": "Crecimiento Avanzado",
  "Best Seller!": "Mas Vendido!",
  "Best for businesses with multiple services, updates, or growth plans.": "Ideal para negocios con varios servicios, actualizaciones o planes de crecimiento.",
  "A more complete package for businesses that want a stronger launch and more update flexibility.": "Un paquete mas completo para negocios que quieren un lanzamiento mas fuerte y mas flexibilidad para cambios.",
  "Multi-page site": "Sitio de varias paginas",
  "7 updates included": "7 actualizaciones incluidas",
  "Growth-focused": "Enfocado en crecimiento",
  "Our Package": "Nuestro Paquete",
  "Start with the Advanced Growth Package, then add features as your website grows.": "Comience con el Paquete Avanzado de Crecimiento y agregue funciones conforme crezca su sitio.",
  "Not sure what you need yet? You can still request a free demo and we will help shape the right direction.": "Aun no sabe que necesita? Puede solicitar una demo gratis y le ayudaremos a definir la direccion correcta.",
  "More Packages Coming Soon": "Mas Paquetes Proximamente",
  "Visored will continue expanding package options as we grow.": "Visored seguira ampliando las opciones de paquetes conforme crezcamos.",
  "Coming Soon": "Proximamente",
  "Future packages will give businesses more ways to choose the website path that fits them best.": "Los paquetes futuros daran a los negocios mas formas de elegir la ruta web que mejor les funcione.",
  "More launch options planned": "Mas opciones de lanzamiento planeadas",
  "Built around small business needs": "Creado para las necesidades de pequenos negocios",
  "New packages will be added as Visored grows": "Se agregaran nuevos paquetes conforme Visored crezca",
  "The Advanced Growth Package requires a $49.99 monthly site operations plan after launch.": "El Paquete Avanzado de Crecimiento requiere un plan mensual de operaciones de $49.99 despues del lanzamiento.",
  "Questions about timelines, payment, review windows, or monthly support?": "Preguntas sobre tiempos, pagos, revision o soporte mensual?",
  "See how it works": "Vea como funciona",
  "Extra features range from $6.99 to $14.99 and can be added at any time.": "Las funciones extra van de $6.99 a $14.99 y se pueden agregar en cualquier momento.",
  "Social Media Link Hub": "Centro de Enlaces Sociales",
  "Downloadable File Section": "Seccion de Archivos Descargables",
  "Pop-Up Announcement Banner": "Banner Emergente de Anuncios",
  "Review Showcase Section": "Seccion de Resenas",
  "Lead Capture Form Upgrade": "Mejora de Formulario para Clientes Potenciales",
  "Catalog or Before/After Gallery": "Catalogo o Galeria Antes/Despues",
  "Customer Intake Questionnaire": "Cuestionario Inicial de Cliente",
  "Multi-Language Site": "Sitio Multilingue",
  "Contact Form": "Formulario de Contacto",
  "Appointment Scheduling": "Programacion de Citas",
  "Newsletter Form": "Formulario de Boletin",
  "Sign-Up Page": "Pagina de Registro",
  "Custom FAQ Section": "Seccion de Preguntas Personalizadas",
  "Custom Features": "Funciones Personalizadas",
  "Custom feature": "Funcion personalizada",
  "Contact form": "Formulario de contacto",
  "Appointment scheduling": "Programacion de citas",
  "Newsletter form": "Formulario de boletin",
  "Sign-up page": "Pagina de registro",
  "Custom features": "Funciones personalizadas",
  "Multi-language site": "Sitio multilingue",
  "Photo gallery / portfolio": "Galeria de fotos / portafolio",
  "Social media link hub": "Centro de enlaces sociales",
  "Review showcase section": "Seccion de resenas",
  "Downloadable file section": "Seccion de archivos descargables",
  "Pop-up announcement banner": "Banner emergente de anuncios",
  "Accessibility polish": "Mejora de accesibilidad",
  "Lead capture form upgrade": "Mejora de formulario para clientes potenciales",
  "Catalog or before/after gallery": "Catalogo o galeria antes/despues",
  "Customer intake questionnaire": "Cuestionario inicial de cliente",
  "- Add a simple link page for social profiles, offers, booking, and contact links.": "- Agregue una pagina simple de enlaces para redes sociales, ofertas, reservas y contacto.",
  "- Promote sales, events, holiday hours, urgent updates, or limited-time offers.": "- Promocione ventas, eventos, horarios especiales, avisos urgentes u ofertas limitadas.",
  "- Share menus, flyers, price sheets, PDFs, intake forms, or waivers.": "- Comparta menus, volantes, listas de precios, PDFs, formularios o documentos.",
  "- Create a focused page for programs, waitlists, events, or offers.": "- Cree una pagina enfocada para programas, listas de espera, eventos u ofertas.",
  "- Give visitors a way to join updates, announcements, or promotions.": "- Permita que visitantes reciban novedades, anuncios o promociones.",
  "- Answer common customer questions specific to the business or service.": "- Responda preguntas comunes especificas del negocio o servicio.",
  "- Collect messages, quote requests, or client details.": "- Reciba mensajes, solicitudes de cotizacion o detalles de clientes.",
  "- Highlight testimonials, client quotes, screenshots, or trust-building feedback.": "- Destaque testimonios, comentarios, capturas o pruebas de confianza.",
  "- Showcase work, products, spaces, team photos, or project examples.": "- Muestre trabajos, productos, espacios, fotos del equipo o ejemplos.",
  "- Ask better questions for quotes, budgets, timelines, and project details.": "- Haga mejores preguntas sobre cotizaciones, presupuestos, tiempos y detalles.",
  "- Collect helpful customer details before calls, quotes, or appointments.": "- Recopile detalles utiles antes de llamadas, cotizaciones o citas.",
  "- Display menus, service lists, product categories, or before-and-after results.": "- Muestre menus, listas de servicios, categorias o resultados antes/despues.",
  "- Improve labels, contrast, alt text, keyboard flow, and general readability.": "- Mejore etiquetas, contraste, texto alternativo, teclado y legibilidad.",
  "- Add a booking flow or scheduling link for service-based businesses.": "- Agregue una ruta de reserva o enlace de citas para negocios de servicios.",
  "- Discuss a specific feature that does not fit the standard list.": "- Converse sobre una funcion especifica fuera de la lista estandar.",
  "- Add a language switch button so visitors can view content in another language.": "- Agregue un selector de idioma para ver el contenido en otro idioma.",
  "Build a quick project snapshot.": "Cree un resumen rapido del proyecto.",
  "Select a package and add-ons to see a live starting estimate and what the monthly plan may look like.": "Seleccione un paquete y add-ons para ver un estimado inicial y el posible plan mensual.",
  "Choose a package": "Elija un paquete",
  "Add optional features": "Agregue funciones opcionales",
  "Estimated Starting Total": "Total Inicial Estimado",
  "No add-ons selected": "No hay add-ons seleccionados",
  "Ask About This Estimate": "Preguntar Sobre Este Estimado",
  "Package Details": "Detalles del Paquete",
  "Ask About This Package": "Preguntar Sobre Este Paquete",
  "Ask About This Add-on": "Preguntar Sobre Este Add-on",
  "Ask Visored about your website": "Pregunte a Visored sobre su sitio web",
  "Owner name": "Nombre del dueno",
  "Business name": "Nombre del negocio",
  "Phone number": "Numero de telefono",
  "Preferred contact method": "Metodo de contacto preferido",
  "Email": "Correo electronico",
  "Phone call": "Llamada telefonica",
  "Text message": "Mensaje de texto",
  "Are you interested in any packages?": "Le interesa algun paquete?",
  "Are you interested in any add-ons?": "Le interesa algun add-on?",
  "Multiple packages": "Varios paquetes",
  "Multiple add-ons / not sure yet": "Varios add-ons / aun no estoy seguro",
  "N/A - not sure yet": "N/A - aun no estoy seguro",
  "Project details": "Detalles del proyecto",
  "Send Message": "Enviar Mensaje",
  "Clear": "Limpiar",
  "After you submit, Visored reviews your details and typically responds within 1 business day.": "Despues de enviar, Visored revisa sus detalles y normalmente responde dentro de 1 dia habil.",
  "Website building and maintenance for small businesses.": "Creacion y mantenimiento de sitios web para pequenos negocios.",
  "Service Area": "Area de Servicio",
  "Small businesses nationwide": "Pequenos negocios en todo el pais",
  "Visored LLC builds and maintains websites for small businesses.": "Visored LLC crea y mantiene sitios web para pequenos negocios.",
  "Demos & Getting Started": "Demos y Primeros Pasos",
  "Before the full build begins": "Antes del desarrollo completo",
  "Pricing & Monthly Support": "Precios y Soporte Mensual",
  "Payments, financing, and ongoing care": "Pagos, financiamiento y cuidado continuo",
  "Website Features & Ownership": "Funciones y Propiedad del Sitio",
  "What your site can include": "Lo que puede incluir su sitio",
  "Changes & Upgrades": "Cambios y Mejoras",
  "After launch and future updates": "Despues del lanzamiento y futuras actualizaciones",
  "Quick answers about demos, monthly operations, add-ons, updates, and what happens after you reach out.": "Respuestas rapidas sobre demos, operaciones mensuales, add-ons, cambios y que pasa despues de contactarnos.",
  "How does the free demo work?": "Como funciona la demo gratis?",
  "How fast can I get a demo?": "Que tan rapido puedo recibir una demo?",
  "What happens after I request a demo?": "Que pasa despues de solicitar una demo?",
  "How quickly will Visored respond?": "Que tan rapido responde Visored?",
  "Are demo features fully functional?": "Las funciones de la demo funcionan completamente?",
  "Do I need to provide my own photos and logo?": "Necesito proporcionar mis propias fotos y logo?",
  "How do I send content, photos, or update requests?": "Como envio contenido, fotos o solicitudes de cambios?",
  "What does the monthly site operations plan include?": "Que incluye el plan mensual de operaciones?",
  "How does payment work?": "Como funciona el pago?",
  "Are financing options available?": "Hay opciones de financiamiento?",
  "Can I cancel the monthly site operations plan?": "Puedo cancelar el plan mensual de operaciones?",
  "Why not just use Wix or Squarespace?": "Por que no usar solo Wix o Squarespace?",
  "Can add-ons be added later?": "Se pueden agregar add-ons despues?",
  "Do I own my website after it is completed?": "Soy dueno de mi sitio despues de completarlo?",
  "Can Visored redesign an existing website?": "Puede Visored redisenar un sitio existente?",
  "Can my website include online payments?": "Puede mi sitio incluir pagos en linea?",
  "Will my website work on phones and tablets?": "Funcionara mi sitio en telefonos y tabletas?",
  "What counts as an alteration?": "Que cuenta como una alteracion?",
  "What happens if I need changes after my review window ends?": "Que pasa si necesito cambios despues del periodo de revision?",
  "The free demo gives you a preview of how your site could look. It is usually about 60%-70% personalized, so it shows the direction without being the final finished site.": "La demo gratis le da una vista previa de como podria verse su sitio. Usualmente esta personalizada un 60%-70%, mostrando la direccion sin ser el sitio final.",
  "Demos can be delivered in as little as 48 hours depending on the information provided, project type, and current workload.": "Las demos pueden entregarse en tan solo 48 horas dependiendo de la informacion, el tipo de proyecto y la carga actual.",
  "Visored reviews your details, builds a preview direction, and follows up with you to discuss feedback, next steps, and whether you want to move into full development.": "Visored revisa sus detalles, crea una vista previa y hace seguimiento para hablar sobre comentarios, proximos pasos y si desea continuar al desarrollo completo.",
  "Visored typically responds within 1 business day after a contact form, demo request, or project inquiry is submitted.": "Visored normalmente responde dentro de 1 dia habil despues de recibir un formulario, solicitud de demo o consulta.",
  "Some add-ons may appear visible or clickable in a demo, but features such as contact forms or payment processors may not be fully functional until full development begins.": "Algunos add-ons pueden verse o ser clicables en la demo, pero funciones como formularios o pagos pueden no funcionar por completo hasta iniciar el desarrollo.",
  "The $49.99 monthly plan helps cover ongoing essentials such as hosting support, form checks, basic upkeep, and general site availability.": "El plan mensual de $49.99 ayuda a cubrir esenciales continuos como soporte de hosting, revision de formularios, mantenimiento basico y disponibilidad general.",
  "Payment is discussed before full website development begins. Flexible financing options may be available depending on the project needs and agreed timeline.": "El pago se conversa antes de iniciar el desarrollo completo. Puede haber opciones de financiamiento segun las necesidades del proyecto y el tiempo acordado.",
  "Yes. Flexible financing options are available and can be discussed based on the project needs.": "Si. Hay opciones de financiamiento flexibles que se pueden conversar segun las necesidades del proyecto.",
  "Website builders can work for some businesses, but Visored is built for clients who want someone to create, organize, personalize, and help maintain the site without handling every setup detail alone.": "Los constructores de sitios pueden funcionar para algunos negocios, pero Visored es para clientes que quieren ayuda creando, organizando, personalizando y manteniendo el sitio.",
  "Yes. Add-ons such as account signups, subscriptions, calendars, Google Ads support, social media portals, and popup announcements can be added at any time.": "Si. Add-ons como registros de cuenta, suscripciones, calendarios, soporte de Google Ads, portales de redes sociales y anuncios emergentes se pueden agregar en cualquier momento.",
  "Alterations can include flyers, sales promotions, photo swaps, content changes, business updates, hours, service changes, and similar updates after launch.": "Las alteraciones pueden incluir volantes, promociones, cambios de fotos, contenido, horarios, servicios y actualizaciones similares despues del lanzamiento.",
  "Tell Visored about the website your business needs.": "Cuentele a Visored sobre el sitio que su negocio necesita.",
  "Share a few details and Visored will follow up about your website project.": "Comparta algunos detalles y Visored le dara seguimiento sobre su proyecto web.",
  "What do you need?": "Que necesita?",
  "New website": "Sitio nuevo",
  "Website redesign": "Rediseno de sitio",
  "Website maintenance": "Mantenimiento de sitio",
  "Add-on feature": "Funcion adicional",
  "Business type": "Tipo de negocio",
  "Current website, if any": "Sitio actual, si tiene",
  "Reference/Inspiration Photos (Logo, Products, Flyers, etc...)": "Fotos de Referencia/Inspiracion (Logo, Productos, Volantes, etc...)",
  "You can select up to 4 pictures for the site direction.": "Puede seleccionar hasta 4 imagenes para la direccion del sitio.",
  "Preferred style": "Estilo preferido",
  "Professional / Corporate": "Profesional / Corporativo",
  "Friendly / Local Business": "Amigable / Negocio Local",
  "Bold / Modern": "Llamativo / Moderno",
  "Clean / Minimal": "Limpio / Minimalista",
  "Luxury / Premium": "Lujo / Premium",
  "Colorful / Creative": "Colorido / Creativo",
  "Color choice 1": "Color 1",
  "Color choice 2": "Color 2",
  "Color choice 3": "Color 3",
  "Color choice 4": "Color 4",
  "Pages & Add-Ons": "Paginas y Add-ons",
  "Contact Us": "Contactenos",
  "About": "Acerca de",
  "Gallery": "Galeria",
  "Reviews": "Resenas",
  "Booking": "Reservas",
  "Payment processor": "Procesador de pagos",
  "Other": "Otro",
  "Your Ideas": "Sus Ideas",
  "What is the goal for your site?": "Cual es el objetivo de su sitio?",
  "Must-have information": "Informacion imprescindible",
  "Other request": "Otra solicitud",
  "Review Design Details": "Revisar Detalles del Diseno",
  "Review your details before submitting.": "Revise sus detalles antes de enviar.",
  "Edit Details": "Editar Detalles",
  "Submit Design Details": "Enviar Detalles del Diseno"
  ,"Thanks. Your message has been sent to Visored.": "Gracias. Su mensaje ha sido enviado a Visored."
  ,"Thank you": "Gracias"
  ,"Your request was sent to Visored.": "Su solicitud fue enviada a Visored."
  ,"We will follow up soon.": "Le daremos seguimiento pronto."
  ,"Something went wrong while sending your message. Please try again in a moment.": "Algo salio mal al enviar su mensaje. Intente de nuevo en un momento."
  ,"Thanks. Your design details have been sent to Visored.": "Gracias. Sus detalles de diseno han sido enviados a Visored."
  ,"Please select no more than 4 pictures.": "Seleccione no mas de 4 imagenes."
  ,"Design details reviewed.": "Detalles del diseno revisados."
  ,"Financing Available!": "Financiamiento Disponible!"
  ,"A polished multi-page website for small businesses that need a professional online presence without overcomplicating the launch.": "Un sitio de varias paginas para pequenos negocios que necesitan presencia profesional sin complicar el lanzamiento."
  ,"Multi-page structure for your core business information.": "Estructura de varias paginas para la informacion principal de su negocio."
  ,"Clean, mobile-friendly layout built around trust and clarity.": "Diseno limpio y compatible con moviles, enfocado en confianza y claridad."
  ,"Ideal for service businesses, shops, contractors, and new brands.": "Ideal para negocios de servicios, tiendas, contratistas y marcas nuevas."
  ,"Paid updates are available after launch when you need changes.": "Hay actualizaciones pagadas disponibles despues del lanzamiento."
  ,"Requires the monthly site operations plan after launch.": "Requiere el plan mensual de operaciones despues del lanzamiento."
  ,"A stronger launch package for businesses that want more room to explain services, show credibility, and keep early updates flexible.": "Un paquete de lanzamiento mas fuerte para negocios que quieren mas espacio para explicar servicios, mostrar confianza y mantener cambios flexibles."
  ,"Expanded multi-page structure with more room for content.": "Estructura ampliada de varias paginas con mas espacio para contenido."
  ,"Includes 7 free alterations after launch.": "Incluye 7 alteraciones gratis despues del lanzamiento."
  ,"Good fit for businesses with multiple services, offers, or customer paths.": "Buena opcion para negocios con varios servicios, ofertas o rutas de clientes."
  ,"Built to support a more complete brand presentation.": "Creado para apoyar una presentacion de marca mas completa."
  ,"Popup Announcement": "Anuncio Emergente"
  ,"Popup announcement": "Anuncio emergente"
  ,"Social Media Portals": "Portales de Redes Sociales"
  ,"Social media portals": "Portales de redes sociales"
  ,"Sign Up / Accounts": "Registro / Cuentas"
  ,"Sign up / accounts": "Registro / cuentas"
  ,"Subscriptions": "Suscripciones"
  ,"Calendar": "Calendario"
  ,"Google Ads": "Google Ads"
  ,"- Highlight sales, events, alerts, hours, or important updates with an on-site popup.": "- Destaque ventas, eventos, alertas, horarios o actualizaciones importantes con un popup en el sitio."
  ,"- Connect visitors to your social channels, promos, videos, and community pages.": "- Conecte visitantes con sus redes sociales, promociones, videos y paginas de comunidad."
  ,"- Let customers create accounts, join a list, or register interest through your site.": "- Permita que clientes creen cuentas, se unan a una lista o registren interes desde su sitio."
  ,"- Show events, deadlines, available dates, classes, or upcoming business activity.": "- Muestre eventos, fechas limite, disponibilidad, clases o actividad proxima del negocio."
  ,"- Offer recurring memberships, paid access, service plans, or subscription interest.": "- Ofrezca membresias recurrentes, acceso pagado, planes de servicio o interes en suscripciones."
  ,"- Add ad-focused landing sections, tracking-ready buttons, and campaign callouts.": "- Agregue secciones para anuncios, botones listos para rastreo y mensajes de campana."
  ,"Account signups, subscriptions, calendars, Google Ads support, social media portals, and popup announcements as your business grows.": "Registros de cuenta, suscripciones, calendarios, soporte para Google Ads, portales sociales y anuncios emergentes conforme crece su negocio."
  ,"Yes. Add-ons such as account signups, subscriptions, calendars, Google Ads support, social media portals, and popup announcements can be added at any time.": "Si. Add-ons como registros de cuenta, suscripciones, calendarios, soporte para Google Ads, portales sociales y anuncios emergentes se pueden agregar en cualquier momento."
  ,"Preferably, yes. Real photos and your actual logo help the website feel more professional, trustworthy, and specific to your business. Stock images can be used when needed, but original business visuals usually create a stronger result.": "Preferiblemente, si. Fotos reales y su logo ayudan a que el sitio se vea mas profesional, confiable y especifico para su negocio. Se pueden usar imagenes de stock cuando sea necesario, pero las imagenes reales del negocio suelen dar un mejor resultado."
  ,"You can send content, photos, and update requests by email.": "Puede enviar contenido, fotos y solicitudes de actualizacion por email."
  ,"Yes. The monthly site operations plan covers hosting support, maintenance, and the ongoing care needed to keep the website running properly. If the plan is cancelled, Visored would no longer be able to make updates or maintain the site, and the website may go offline.": "Si. El plan mensual de operaciones cubre soporte de hosting, mantenimiento y el cuidado necesario para que el sitio funcione correctamente. Si se cancela el plan, Visored ya no podria hacer actualizaciones ni mantener el sitio, y el sitio podria quedar fuera de linea."
  ,"Yes. It is your website. Visored manages the hosting, setup, and technical access while the monthly site operations plan is active. If you ever need the website files, they can be provided, but independent hosting and setup would be your responsibility.": "Si. Es su sitio web. Visored administra el hosting, la configuracion y el acceso tecnico mientras el plan mensual este activo. Si algun dia necesita los archivos del sitio, se pueden proporcionar, pero el hosting y configuracion independiente serian su responsabilidad."
  ,"Absolutely. Visored can help redesign an existing website to make it cleaner, more modern, easier to use, and better aligned with your current business goals.": "Absolutamente. Visored puede ayudar a redisenar un sitio existente para hacerlo mas limpio, moderno, facil de usar y mejor alineado con sus metas actuales."
  ,"Absolutely. Online payment options can be discussed and added depending on what your business needs to sell, collect, or process through the website.": "Absolutamente. Las opciones de pago en linea se pueden conversar y agregar segun lo que su negocio necesite vender, cobrar o procesar en el sitio."
  ,"Yes. Visored websites are built to work across desktop, tablet, and mobile screen sizes.": "Si. Los sitios de Visored se crean para funcionar en computadoras, tabletas y telefonos."
  ,"Visored can still help with changes after the review window. Minor updates after payment can be handled at no extra cost, while larger additions or new features can be discussed separately if needed.": "Visored todavia puede ayudar con cambios despues del periodo de revision. Las actualizaciones menores despues del pago pueden manejarse sin costo adicional, mientras que agregados grandes o funciones nuevas se pueden conversar por separado si es necesario."
  ,"Yes. If your business needs more pages, features, or support later, Visored can help upgrade your website direction over time.": "Si. Si su negocio necesita mas paginas, funciones o soporte despues, Visored puede ayudar a mejorar la direccion del sitio con el tiempo."
  ,"Popup alert": "Alerta emergente"
  ,"Social hub": "Centro social"
  ,"Account signup": "Registro de cuenta"
  ,"Event calendar": "Calendario de eventos"
  ,"Subscription plan": "Plan de suscripcion"
  ,"Ad landing path": "Ruta de anuncio"
});

Object.assign(translations.Spanish, {
  "Visored LLC | Websites for Small Businesses": "Visored LLC | Sitios Web para Pequenos Negocios",
  "Visored LLC": "Visored LLC",
  "VisoredLLC@gmail.com": "VisoredLLC@gmail.com",
  "Services | Visored LLC": "Servicios | Visored LLC",
  "How It Works | Visored LLC": "Como Funciona | Visored LLC",
  "Design My Site | Visored LLC": "Disenar Mi Sitio | Visored LLC",
  "FAQ | Visored LLC": "Preguntas | Visored LLC",
  "Contact | Visored LLC": "Contacto | Visored LLC",
  "Visored LLC home": "Inicio de Visored LLC",
  "Visored LLC logo": "Logo de Visored LLC",
  "Open navigation": "Abrir navegacion",
  "Primary navigation": "Navegacion principal",
  "Language options": "Opciones de idioma",
  "Visored website build preview": "Vista previa de desarrollo web de Visored",
  "Example website sections": "Ejemplo de secciones del sitio web",
  "Mobile website preview": "Vista previa movil del sitio web",
  "Home page sections": "Secciones de la pagina principal",
  "Service highlights": "Puntos clave del servicio",
  "Close contact form": "Cerrar formulario de contacto",
  "Close add-on preview": "Cerrar vista previa del add-on",
  "Close estimate tool": "Cerrar herramienta de estimado",
  "Close package details": "Cerrar detalles del paquete",
  "Close design summary": "Cerrar resumen del diseno",
  "Website discovery, design, and care": "Descubrimiento, diseno y cuidado web",
  "We do the work, so you don't have to.": "Nosotros hacemos el trabajo por usted.",
  "Visored LLC helps companies nationwide turn scattered ideas, services, photos, and goals into a clean website that customers can understand fast.": "Visored LLC ayuda a empresas en todo el pais a convertir ideas, servicios, fotos y metas dispersas en un sitio claro que los clientes entienden rapido.",
  "Business Website": "Sitio Web de Negocio",
  "Clear offer. Easy contact. Fast trust.": "Oferta clara. Contacto facil. Confianza rapida.",
  "Services, photos, updates, and next steps organized into one polished site.": "Servicios, fotos, actualizaciones y proximos pasos organizados en un sitio pulido.",
  "Approach": "Enfoque",
  "Offer": "Oferta",
  "Process": "Proceso",
  "Demo": "Demo",
  "Discover": "Descubrir",
  "Build": "Construir",
  "Maintain": "Mantener",
  "Most small-business websites fail because they feel unfinished, unclear, or hard to update.": "Muchos sitios de pequenos negocios fallan porque se sienten incompletos, poco claros o dificiles de actualizar.",
  "Visored builds the site around what your customer needs to see first.": "Visored construye el sitio alrededor de lo que su cliente necesita ver primero.",
  "We turn your business details into a clear website direction.": "Convertimos los detalles de su negocio en una direccion web clara.",
  "Send the basics, photos, ideas, colors, and goals. We shape that into a demo so you can react to something real instead of guessing from a blank page.": "Envie lo basico, fotos, ideas, colores y metas. Lo convertimos en una demo para que pueda reaccionar a algo real en vez de adivinar desde una pagina en blanco.",
  "We create a polished site that feels trustworthy and easy to use.": "Creamos un sitio pulido que se siente confiable y facil de usar.",
  "Layouts, pages, mobile responsiveness, calls to action, and visual direction are handled with small-business customers in mind.": "Los disenos, paginas, adaptacion movil, llamadas a la accion y direccion visual se manejan pensando en clientes de pequenos negocios.",
  "We stay available after launch for updates and improvements.": "Seguimos disponibles despues del lanzamiento para cambios y mejoras.",
  "Your site can keep changing with your business.": "Su sitio puede seguir cambiando con su negocio.",
  "Promotions, photos, content changes, popup announcements, calendars, subscriptions, accounts, and social portals can be added as your needs grow.": "Promociones, fotos, cambios de contenido, anuncios emergentes, calendarios, suscripciones, cuentas y portales sociales se pueden agregar conforme crecen sus necesidades.",
  "Visored Build Map": "Mapa de Desarrollo Visored",
  "Demo in as little as 48 hours": "Demo en tan solo 48 horas",
  "Payment starts before full development.": "El pago empieza antes del desarrollo completo.",
  "Sites need ongoing support after launch.": "Los sitios necesitan soporte continuo despues del lanzamiento.",
  "Start with a useful demo before the full build begins.": "Empiece con una demo util antes del desarrollo completo.",
  "Get a free demo first, review the direction, then move into full development when you are ready.": "Reciba primero una demo gratis, revise la direccion y avance al desarrollo completo cuando este listo.",
  "A preview direction in as little as 48 hours.": "Una direccion visual en tan solo 48 horas.",
  "Talk through what feels right and what needs to change.": "Hablemos de lo que funciona y de lo que debe cambiar.",
  "A personalized, functional site built around your business.": "Un sitio personalizado y funcional creado alrededor de su negocio.",
  "Friendly support with a serious finished product.": "Soporte cercano con un resultado final profesional.",
  "Flexible financing": "Financiamiento flexible",
  "Options are available when you are ready to move forward.": "Hay opciones disponibles cuando este listo para avanzar.",
  "Easy updates": "Actualizaciones faciles",
  "Keep the site current as your business changes.": "Mantenga el sitio actualizado conforme cambia su negocio.",
  "Simple launch path": "Ruta de lanzamiento simple",
  "From first preview to a site that is ready for customers.": "Desde la primera vista previa hasta un sitio listo para clientes.",
  "Placeholder feedback today, real client proof tomorrow.": "Comentarios de muestra hoy, prueba real de clientes manana.",
  "These sample reviews hold the space for future testimonials once Visored collects client feedback.": "Estas resenas de muestra reservan espacio para futuros testimonios cuando Visored recopile comentarios de clientes.",
  "\"The demo helped us picture the site before committing to the full build.\"": "\"La demo nos ayudo a visualizar el sitio antes de comprometernos con el desarrollo completo.\"",
  "\"The final website made our business look much more trustworthy online.\"": "\"El sitio final hizo que nuestro negocio se viera mucho mas confiable en linea.\"",
  "\"Updates were simple, fast, and easy to request after launch.\"": "\"Las actualizaciones fueron simples, rapidas y faciles de pedir despues del lanzamiento.\"",
  "Taylor S.": "Taylor S.",
  "Morgan P.": "Morgan P.",
  "Alex R.": "Alex R.",
  "Launch support": "Soporte de lanzamiento",
  "Flexible updates": "Actualizaciones flexibles",
  "Room to grow": "Espacio para crecer",
  "Flexible financing options": "Opciones de financiamiento flexible",
  "Project paths can be discussed around your business needs and timeline.": "Las rutas del proyecto se pueden conversar segun las necesidades y tiempos de su negocio.",
  "Always customizable after launch": "Siempre personalizable despues del lanzamiento",
  "Your site can keep evolving with new pages, content, images, forms, and features.": "Su sitio puede seguir evolucionando con nuevas paginas, contenido, imagenes, formularios y funciones.",
  "Add-on Preview": "Vista Previa del Add-on",
  "Add-on preview": "Vista previa del add-on",
  "Advanced Growth Package selected": "Paquete Avanzado de Crecimiento seleccionado",
  "$49.99 monthly site operations plan applies after launch.": "El plan mensual de operaciones de $49.99 aplica despues del lanzamiento.",
  "Monthly site operations details will be confirmed with your estimate.": "Los detalles del plan mensual se confirmaran con su estimado.",
  "A sign up or account add-on gives customers a place to register, join a list, create an account path, or show interest in a service.": "El add-on de registro o cuentas da a los clientes un lugar para registrarse, unirse a una lista, crear una ruta de cuenta o mostrar interes en un servicio.",
  "Useful for member areas and waitlists.": "Util para areas de miembros y listas de espera.",
  "Can collect account-style information.": "Puede recopilar informacion tipo cuenta.",
  "Helps organize customer signups.": "Ayuda a organizar registros de clientes.",
  "A calendar add-on helps show events, available dates, classes, deadlines, launches, booking windows, or upcoming business activity.": "El add-on de calendario ayuda a mostrar eventos, fechas disponibles, clases, vencimientos, lanzamientos, ventanas de reserva o actividad proxima.",
  "Good for event-based businesses.": "Bueno para negocios basados en eventos.",
  "Helps visitors understand timing.": "Ayuda a visitantes a entender fechas y horarios.",
  "Can support recurring updates.": "Puede apoyar actualizaciones recurrentes.",
  "A subscription add-on helps present recurring memberships, service plans, paid access, or subscription interest in a clean way.": "El add-on de suscripciones ayuda a presentar membresias recurrentes, planes de servicio, acceso pagado o interes de suscripcion de forma clara.",
  "Good for monthly offers or memberships.": "Bueno para ofertas mensuales o membresias.",
  "Can show plan tiers.": "Puede mostrar niveles de planes.",
  "Helps explain recurring value.": "Ayuda a explicar el valor recurrente.",
  "A Google Ads add-on helps prepare ad-focused landing sections, campaign callouts, conversion buttons, and tracking-friendly visitor paths.": "El add-on de Google Ads ayuda a preparar secciones enfocadas en anuncios, llamados de campana, botones de conversion y rutas listas para seguimiento.",
  "Useful for paid traffic campaigns.": "Util para campanas de trafico pagado.",
  "Helps visitors take action quickly.": "Ayuda a que visitantes tomen accion rapido.",
  "Can support campaign-specific messaging.": "Puede apoyar mensajes especificos de campana.",
  "A popup announcement helps highlight time-sensitive updates such as sales, events, holiday hours, limited offers, or important business notices.": "Un anuncio emergente ayuda a destacar avisos sensibles al tiempo como ventas, eventos, horarios especiales, ofertas limitadas o avisos importantes.",
  "Good for urgent updates and promotions.": "Bueno para avisos urgentes y promociones.",
  "Can point visitors toward a form or offer.": "Puede dirigir visitantes hacia un formulario u oferta.",
  "Easy to refresh when campaigns change.": "Facil de actualizar cuando cambian las campanas.",
  "Social media portals give visitors a clear path to your social profiles, video pages, community links, promotions, and active platforms.": "Los portales de redes sociales dan a visitantes una ruta clara hacia perfiles sociales, videos, enlaces de comunidad, promociones y plataformas activas.",
  "Great for Instagram, TikTok, Facebook, and YouTube.": "Ideal para Instagram, TikTok, Facebook y YouTube.",
  "Keeps social links organized.": "Mantiene los enlaces sociales organizados.",
  "Works well for mobile visitors.": "Funciona bien para visitantes moviles.",
  "Create Your Account": "Cree Su Cuenta",
  "Full name": "Nombre completo",
  "Password": "Contrasena",
  "Choose account type": "Elija tipo de cuenta",
  "Sign Up": "Registrarse",
  "Basic": "Basico",
  "Plus": "Plus",
  "Pro": "Pro",
  "Important Update": "Actualizacion Importante",
  "Popup message": "Mensaje emergente",
  "English": "Ingles",
  "Spanish": "Espanol",
  "Hello": "Hola",
  "Hola": "Hola",
  "Google Ad Landing Page": "Pagina de Google Ads",
  "Claim This Offer": "Reclamar Esta Oferta",
  "Service area": "Area de servicio",
  "Ready to get started?": "Listo para empezar?",
  "Call Now": "Llamar Ahora",
  "Event calendar": "Calendario de eventos",
  "Ad landing path": "Ruta de anuncio",
  "Account signup": "Registro de cuenta",
  "Subscription plan": "Plan de suscripcion",
  "Business basics": "Datos basicos del negocio",
  "Name, services, location or service area, and preferred contact details.": "Nombre, servicios, ubicacion o area de servicio, y datos de contacto preferidos.",
  "Brand direction": "Direccion de marca",
  "Logo, colors, style preferences, examples, or inspiration photos if available.": "Logo, colores, preferencias de estilo, ejemplos o fotos de inspiracion si estan disponibles.",
  "Website goals": "Metas del sitio",
  "What visitors should do next, such as call, book, request a quote, or learn more.": "Lo que los visitantes deben hacer despues, como llamar, reservar, pedir cotizacion o aprender mas.",
  "Important content": "Contenido importante",
  "What helps us build a stronger demo.": "Lo que nos ayuda a crear una demo mas fuerte.",
  "Visored keeps the steps simple so business owners know what to expect before, during, and after the website build.": "Visored mantiene los pasos simples para que los duenos sepan que esperar antes, durante y despues del desarrollo.",
  "Built for small businesses": "Creado para pequenos negocios",
  "Affordable, practical websites without confusing steps.": "Sitios accesibles y practicos sin pasos confusos.",
  "Fast turnaround": "Entrega rapida",
  "Inspiration websites": "Sitios de inspiracion",
  "Clear color": "Borrar color",
  "Photos, flyers, pricing notes, policies, FAQs, social links, or must-have wording.": "Fotos, volantes, notas de precios, politicas, preguntas frecuentes, enlaces sociales o texto obligatorio.",
  "This is the start-to-finish path most website projects follow.": "Esta es la ruta de principio a fin que siguen la mayoria de proyectos web.",
  "Free Demo": "Demo Gratis",
  "2-4 business days": "2-4 dias habiles",
  "A preview that shows the site direction. It is usually 60%-70% personalized, and demo add-ons may be visible or clickable without being fully functional.": "Una vista previa que muestra la direccion del sitio. Usualmente esta personalizada 60%-70%, y algunos add-ons pueden verse o ser clicables sin funcionar por completo.",
  "Feedback & Review": "Comentarios y Revision",
  "Client discussion": "Conversacion con el cliente",
  "We review the demo together, discuss what should change, and decide whether to move into full website development.": "Revisamos la demo juntos, hablamos de lo que debe cambiar y decidimos si avanzar al desarrollo completo.",
  "Website Development": "Desarrollo del Sitio Web",
  "10-14 business days": "10-14 dias habiles",
  "Payment is required before this stage begins. The final site is built to be live, functional, and 100% personalized.": "El pago se requiere antes de esta etapa. El sitio final se crea para estar activo, funcional y 100% personalizado.",
  "Completed Review": "Revision Final",
  "3 business days": "3 dias habiles",
  "After delivery, clients have 3 business days to request final changes. After that, new requests are handled as paid add-ons.": "Despues de la entrega, los clientes tienen 3 dias habiles para pedir cambios finales. Luego, las nuevas solicitudes se manejan como add-ons pagados.",
  "Select a timeline step to spotlight that part of the process.": "Seleccione un paso del cronograma para destacar esa parte del proceso.",
  "The free demo helps you see the possible direction first. If you decide to move forward, payment is handled before full website development begins. Flexible financing options may be available depending on the project.": "La demo gratis le permite ver primero la posible direccion. Si decide avanzar, el pago se maneja antes del desarrollo completo. Puede haber opciones de financiamiento segun el proyecto.",
  "The Advanced Growth Package requires a $49.99 monthly site operations plan. This supports hosting help, form checks, basic upkeep, and general site availability.": "El Paquete Avanzado de Crecimiento requiere un plan mensual de operaciones de $49.99. Esto apoya hosting, revision de formularios, mantenimiento basico y disponibilidad general.",
  "Updates and site operations keep the website useful after launch.": "Las actualizaciones y operaciones mantienen el sitio util despues del lanzamiento.",
  "After the completed review window, new changes can still be requested as paid add-ons. This can include flyers, sales, photos, content updates, business changes, and new features.": "Despues de la ventana de revision final, aun se pueden solicitar cambios como add-ons pagados. Esto puede incluir volantes, ventas, fotos, contenido, cambios del negocio y nuevas funciones.",
  "Restaurant, salon, contractor, boutique, nonprofit": "Restaurante, salon, contratista, boutique, organizacion sin fines de lucro",
  "Owner or main contact": "Dueno o contacto principal",
  "Links or business names you like": "Enlaces o nombres de negocios que le gustan",
  "Color choices are optional. Inspiration links, brand colors, or even colors you want to avoid are all helpful.": "Los colores son opcionales. Enlaces de inspiracion, colores de marca o incluso colores que desea evitar son utiles.",
  "Shop": "Tienda",
  "Shop / Products": "Tienda / Productos",
  "Examples: get more calls, collect bookings, show services, sell products, build credibility.": "Ejemplos: recibir mas llamadas, recopilar reservas, mostrar servicios, vender productos, crear confianza.",
  "Anything else you want included or avoided?": "Algo mas que quiera incluir o evitar?",
  "After you review these details, submit them so Visored can follow up with next steps.": "Despues de revisar estos detalles, envielos para que Visored pueda dar seguimiento con los proximos pasos.",
  "Not provided": "No proporcionado",
  "Business Type": "Tipo de Negocio",
  "Business Name": "Nombre del Negocio",
  "Owner Name": "Nombre del Dueno",
  "Phone": "Telefono",
  "Current Website": "Sitio Actual",
  "Preferred Style": "Estilo Preferido",
  "Inspiration": "Inspiracion",
  "Color Choices": "Colores Elegidos",
  "Pages Requested": "Paginas Solicitadas",
  "Add-Ons Requested": "Add-ons Solicitados",
  "Reference Photos": "Fotos de Referencia",
  "Site Goal": "Meta del Sitio",
  "Must Include": "Debe Incluir",
  "Other Request": "Otra Solicitud",
  "selected": "seleccionadas",
  "Form cleared.": "Formulario borrado.",
  "Please enter the owner name.": "Ingrese el nombre del dueno.",
  "Please enter either an email address or a phone number.": "Ingrese un correo electronico o un numero de telefono.",
  "Please enter the owner name and either an email address or a phone number.": "Ingrese el nombre del dueno y un correo electronico o numero de telefono.",
  "Are you sure you want to clear this form?": "Seguro que desea borrar este formulario?",
  "I am interested in a free demo": "Estoy interesado en una demo gratis",
  "I am interested in the": "Estoy interesado en",
  "add-on.": "add-on.",
  "Add-ons selected:": "Add-ons seleccionados:",
  "Feedback": "Comentarios",
  "Launch": "Lanzamiento",
  "Review": "Revision",
  "Care": "Cuidado",
  "Demo stage: Visored builds a visual direction so you can see possibilities before committing.": "Etapa de demo: Visored crea una direccion visual para que vea posibilidades antes de comprometerse.",
  "Feedback stage: You share what feels right, what needs changing, and what should be added.": "Etapa de comentarios: usted comparte lo que se siente correcto, lo que debe cambiar y lo que se debe agregar.",
  "Development stage: The full site is personalized, made functional, and prepared for launch.": "Etapa de desarrollo: el sitio completo se personaliza, se vuelve funcional y se prepara para el lanzamiento.",
  "Review stage: You get a final window to request adjustments before future changes become add-ons.": "Etapa de revision: tiene una ventana final para pedir ajustes antes de que cambios futuros se vuelvan add-ons.",
  "Tip: complete only what you know right now. Blank sections are okay.": "Consejo: complete solo lo que sabe ahora. Las secciones en blanco estan bien.",
  "Answer coming soon.": "Respuesta proximamente."
});

reverseTranslations = Object.fromEntries(
  Object.entries(translations.Spanish).map(([english, spanish]) => [spanish, english])
);

const placeholderTranslations = {
  Spanish: {
    "Jane Smith": "Juan Perez",
    "jane@example.com": "juan@ejemplo.com",
    "Your Business Name": "Nombre de su negocio",
    "(555) 123-4567": "(555) 123-4567",
    "Tell us what you are looking for.": "Cuentenos que esta buscando.",
    "Restaurant, salon, contractor, retail shop, nonprofit, etc.": "Restaurante, salon, contratista, tienda, organizacion, etc.",
    "Restaurant, salon, contractor, boutique, nonprofit": "Restaurante, salon, contratista, boutique, organizacion sin fines de lucro",
    "https://example.com": "https://ejemplo.com",
    "Owner or main contact": "Dueno o contacto principal",
    "name@example.com": "nombre@ejemplo.com",
    "Links or business names you like": "Enlaces o nombres de negocios que le gustan",
    "Examples: get more calls, collect bookings, show services, sell products, build credibility.": "Ejemplos: recibir mas llamadas, recopilar reservas, mostrar servicios, vender productos, crear confianza.",
    "Business hours, service areas, pricing notes, policies, FAQs, slogans, or specific wording.": "Horarios, areas de servicio, precios, politicas, preguntas, lemas o texto especifico.",
    "Anything else you want included or avoided?": "Algo mas que quiera incluir o evitar?",
    "Tell us about your business, the pages you need, and any features you want.": "Cuentenos sobre su negocio, las paginas que necesita y las funciones que desea.",
    "Use this area for anything that does not fit above, including ideas you are unsure about.": "Use esta area para cualquier cosa que no encaje arriba, incluso ideas que aun no tiene claras."
  }
};

const reversePlaceholderTranslations = Object.fromEntries(
  Object.entries(placeholderTranslations.Spanish).map(([english, spanish]) => [spanish, english])
);

const localizeText = (text) => {
  if (!text || activeLanguage !== "Spanish") return text || "";
  return translations.Spanish[text] || text;
};

const localizeListText = (text) => {
  if (!text || activeLanguage !== "Spanish") return text || "";
  return text.split(", ").map((item) => localizeText(item)).join(", ");
};

const packageMap = {
  growth: { label: "Advanced Growth Package", price: 499, monthly: true }
};

const addonMap = {
  popup: { label: "Popup announcement", price: 6.99 },
  portals: { label: "Social media portals", price: 8.99 },
  accounts: { label: "Sign up / accounts", price: 9.99 },
  calendar: { label: "Calendar", price: 10.99 },
  subscriptions: { label: "Subscriptions", price: 12.99 },
  googleads: { label: "Google Ads", price: 14.99 }
};

const addonPreviews = {
  popup: {
    title: "Popup Announcement",
    price: "$6.99",
    visual: "Popup alert",
    description: "A popup announcement helps highlight time-sensitive updates such as sales, events, holiday hours, limited offers, or important business notices.",
    bullets: ["Good for urgent updates and promotions.", "Can point visitors toward a form or offer.", "Easy to refresh when campaigns change."]
  },
  portals: {
    title: "Social Media Portals",
    price: "$8.99",
    visual: "Social hub",
    description: "Social media portals give visitors a clear path to your social profiles, video pages, community links, promotions, and active platforms.",
    bullets: ["Great for Instagram, TikTok, Facebook, and YouTube.", "Keeps social links organized.", "Works well for mobile visitors."]
  },
  accounts: {
    title: "Sign Up / Accounts",
    price: "$9.99",
    visual: "Account signup",
    description: "A sign up or account add-on gives customers a place to register, join a list, create an account path, or show interest in a service.",
    bullets: ["Useful for member areas and waitlists.", "Can collect account-style information.", "Helps organize customer signups."]
  },
  calendar: {
    title: "Calendar",
    price: "$10.99",
    visual: "Event calendar",
    description: "A calendar add-on helps show events, available dates, classes, deadlines, launches, booking windows, or upcoming business activity.",
    bullets: ["Good for event-based businesses.", "Helps visitors understand timing.", "Can support recurring updates."]
  },
  subscriptions: {
    title: "Subscriptions",
    price: "$12.99",
    visual: "Subscription plan",
    description: "A subscription add-on helps present recurring memberships, service plans, paid access, or subscription interest in a clean way.",
    bullets: ["Good for monthly offers or memberships.", "Can show plan tiers.", "Helps explain recurring value."]
  },
  googleads: {
    title: "Google Ads",
    price: "$14.99",
    visual: "Ad landing path",
    description: "A Google Ads add-on helps prepare ad-focused landing sections, campaign callouts, conversion buttons, and tracking-friendly visitor paths.",
    bullets: ["Useful for paid traffic campaigns.", "Helps visitors take action quickly.", "Can support campaign-specific messaging."]
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

      if (field.tagName === "SELECT" && field.multiple) {
        values[field.name] = Array.from(field.selectedOptions).map((option) => option.value);
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

        if (field.tagName === "SELECT" && field.multiple) {
          const selectedValues = Array.isArray(values[field.name]) ? values[field.name] : [];
          Array.from(field.options).forEach((option) => {
            option.selected = selectedValues.includes(option.value);
          });
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
    note.textContent = localizeText("Form cleared.");
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
    owner.setCustomValidity(localizeText("Please enter the owner name."));
  }

  if (email && phone && !email.value.trim() && !phone.value.trim()) {
    email.setCustomValidity(localizeText("Please enter either an email address or a phone number."));
  }

  const isValid = form.checkValidity();
  if (!isValid) {
    if (note) {
      note.textContent = localizeText("Please enter the owner name and either an email address or a phone number.");
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

const fieldLabel = (field) => {
  const label = field.id ? document.querySelector(`label[for="${field.id}"]`) : null;
  return label?.textContent.trim() || field.name || "Field";
};

const fieldValue = (field) => {
  if (field.type === "checkbox" || field.type === "radio") {
    return field.checked ? field.value : "";
  }

  if (field.tagName === "SELECT" && field.multiple) {
    return Array.from(field.selectedOptions)
      .map((option) => option.textContent.trim())
      .filter(Boolean)
      .join(", ");
  }

  if (field.type === "file") {
    return field.files.length ? Array.from(field.files).map((file) => file.name).join(", ") : "";
  }

  return field.value.trim();
};

const buildSubmission = (form, formName) => {
  const fields = Array.from(form.querySelectorAll("input, select, textarea"))
    .filter((field) => field.name && !["button", "submit", "reset"].includes(field.type));
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New ${formName} inquiry from Visored LLC website`,
    from_name: "Visored LLC Website",
    replyto: form.querySelector('input[type="email"]')?.value.trim() || "",
    botcheck: ""
  };
  const lines = [];

  fields.forEach((field) => {
    const label = fieldLabel(field);
    const value = fieldValue(field);

    if (!value) return;

    if (field.type !== "file") {
      payload[label] = value;
    }

    lines.push(`${label}: ${value}`);
  });

  payload["Source page"] = window.location.href;
  payload["Message summary"] = lines.join("\n");

  return { payload };
};

const submitInquiryForm = async (form, note, storageKey, formName) => {
  const submitButton = form.querySelector('[type="submit"]');
  const originalText = submitButton?.textContent;
  const submission = buildSubmission(form, formName);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  if (note) {
    note.textContent = "Sending your message...";
    note.classList.remove("error");
  }

  try {
    const response = await fetch(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(submission.payload),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Form submission failed.");
    }

    form.reset();
    if (storageAvailable && storageKey) {
      localStorage.removeItem(storageKey);
    }

    window.location.href = `thank-you.html?source=${encodeURIComponent(formName)}`;
  } catch {
    if (note) {
      note.textContent = CONTACT_FORM_ERROR_NOTE;
      note.classList.add("error");
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
    window.visoredApplyCurrentLanguage?.();
  }
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
    modalFormNote.textContent = localizeText(CONTACT_FORM_DEFAULT_NOTE);
    modalFormNote.classList.remove("error");
  }
};

clearFormButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const confirmed = window.confirm(localizeText("Are you sure you want to clear this form?"));
    if (!confirmed) return;

    if (button.dataset.clearForm === "design") {
      resetForm(designForm, "visored-design-form", designNote);
      closeSummaryModal();
      if (photoNote) {
        photoNote.textContent = localizeText("You can select up to 4 pictures for the site direction.");
        photoNote.classList.remove("error");
      }
      return;
    }

    resetForm(modalForm, "visored-modal-form", modalFormNote);
  });
});

if (languageSwitch && languageCurrent) {
  const translatePage = (language) => {
    const targetMap = language === "Spanish" ? translations.Spanish : reverseTranslations;
    const currentTitle = document.title.trim().replace(/\s+/g, " ");
    if (targetMap[currentTitle]) {
      document.title = targetMap[currentTitle];
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const original = node.nodeValue;
      const trimmed = original.trim().replace(/\s+/g, " ");
      const translated = targetMap[trimmed];
      if (!translated) return;
      const leading = original.match(/^\s*/)?.[0] || "";
      const trailing = original.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${translated}${trailing}`;
    });

    document.querySelectorAll("[aria-label], [alt], [title]").forEach((element) => {
      ["aria-label", "alt", "title"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const value = element.getAttribute(attribute).trim().replace(/\s+/g, " ");
        const translated = targetMap[value];
        if (translated) {
          element.setAttribute(attribute, translated);
        }
      });
    });

    const placeholderMap = language === "Spanish" ? placeholderTranslations.Spanish : reversePlaceholderTranslations;
    document.querySelectorAll("[placeholder]").forEach((field) => {
      const translated = placeholderMap[field.getAttribute("placeholder")];
      if (translated) field.setAttribute("placeholder", translated);
    });

    document.documentElement.lang = language === "Spanish" ? "es" : "en";
    document.documentElement.classList.toggle("language-spanish", language === "Spanish");
  };

  const setLanguageLabels = (language) => {
    languageCurrent.textContent = languageLabels[language] || languageLabels.English;
    languageOptions.forEach((option) => {
      const value = option.dataset.language || option.textContent.trim();
      option.textContent = languageLabels[value] || value;
    });
  };

  const applyLanguage = (language) => {
    activeLanguage = language;
    translatePage(language);
    setLanguageLabels(language);
    if (storageAvailable) {
      localStorage.setItem("visored-language", language);
    }
  };

  window.visoredApplyCurrentLanguage = () => {
    translatePage(activeLanguage);
    setLanguageLabels(activeLanguage);
  };

  const closeLanguageGate = () => {
    if (!languageGate) return;
    languageGate.classList.add("closing");
    document.body.classList.remove("language-gate-active");
    window.setTimeout(() => {
      languageGate.remove();
      languageGate = null;
    }, 420);
  };

  const openLanguageGate = () => {
    if (languageGate) return;
    document.body.insertAdjacentHTML("beforeend", languageGateMarkup);
    languageGate = document.querySelector("#language-gate");
    document.body.classList.add("language-gate-active");
    requestAnimationFrame(() => {
      languageGate?.classList.add("open");
      languageGate?.setAttribute("aria-hidden", "false");
    });

    languageGate?.querySelectorAll("[data-gate-language]").forEach((button) => {
      button.addEventListener("click", () => {
        applyLanguage(button.dataset.gateLanguage || "English");
        if (storageAvailable) {
          localStorage.setItem("visored-language-gate-complete", "true");
        }
        closeLanguageGate();
      });
    });
  };

  const savedLanguage = storageAvailable ? localStorage.getItem("visored-language") : "";
  const languageGateComplete = storageAvailable ? localStorage.getItem("visored-language-gate-complete") === "true" : false;
  if (savedLanguage === "Spanish") {
    applyLanguage("Spanish");
  } else if (savedLanguage === "English") {
    applyLanguage("English");
  } else {
    setLanguageLabels("English");
  }

  if (!languageGateComplete) {
    openLanguageGate();
  }

  languageCurrent.addEventListener("click", () => {
    const isOpen = languageSwitch.classList.toggle("open");
    languageCurrent.setAttribute("aria-expanded", String(isOpen));
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const language = option.dataset.language || option.textContent.trim();
      applyLanguage(language);
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
  const allowedPackages = ["growth", "na"];

  if (allowedPackages.includes(selectedPackage)) {
    packageSelect.value = selectedPackage;
  }
}

if (messageField && params.get("demo") === "free") {
  messageField.value = localizeText("I am interested in a free demo");
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

    customSelect.className = select.multiple ? "custom-select multiple-select" : "custom-select";
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
      const selectedOptions = Array.from(select.selectedOptions).filter((option) => option.value);

      if (select.multiple) {
        const label = select.dataset.multipleLabel || "items";
        buttonText.textContent = selectedOptions.length
          ? `${selectedOptions.length} ${label} selected`
          : "----";
        customSelect.dataset.selectedCount = selectedOptions.length ? selectedOptions.map((option) => option.textContent.trim()).join(", ") : "";
        button.dataset.selectedCount = customSelect.dataset.selectedCount;
        customSelect.classList.toggle("has-multiple-selected", selectedOptions.length > 0);
      } else {
        const selectedOption = select.options[select.selectedIndex] || select.options[0];
        buttonText.textContent = selectedOption ? selectedOption.textContent : "----";
        customSelect.dataset.selectedCount = "";
        button.dataset.selectedCount = "";
        customSelect.classList.remove("has-multiple-selected");
      }

      menu.querySelectorAll("[data-select-value]").forEach((optionButton) => {
        const matchingOption = Array.from(select.options).find((option) => option.value === optionButton.dataset.selectValue);
        const isSelected = select.multiple ? Boolean(matchingOption?.selected) : optionButton.dataset.selectValue === select.value;
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
        if (select.multiple) {
          option.selected = option.value ? !option.selected : false;
          if (!option.value) {
            Array.from(select.options).forEach((item) => {
              item.selected = false;
            });
          }
        } else {
          select.value = option.value;
        }
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
        if (!select.multiple) {
          customSelect.classList.remove("open");
          button.setAttribute("aria-expanded", "false");
          button.focus();
        }
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
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateOwnerContact(contactForm, "#name", "#email", "#phone", formNote)) return;
    await submitInquiryForm(contactForm, formNote, "visored-contact-form", "contact form");
  });
}

if (photosInput && photoNote) {
  photosInput.addEventListener("change", () => {
    if (photosInput.files.length > 4) {
      photosInput.value = "";
      photoNote.textContent = localizeText("Please select no more than 4 pictures.");
      photoNote.classList.add("error");
    } else {
      photoNote.textContent = activeLanguage === "Spanish"
        ? `${photosInput.files.length} imagen(es) seleccionada(s).`
        : `${photosInput.files.length} picture(s) selected.`;
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
    Array.from(modalAddons.options).forEach((option) => {
      option.selected = false;
    });
    modalAddons.dispatchEvent(new Event("change", { bubbles: true }));
  } else if (modalAddons && addOns) {
    const addOnList = addOns.split(",").map((item) => item.trim()).filter(Boolean);
    Array.from(modalAddons.options).forEach((option) => {
      option.selected = addOnList.some((addOn) => {
        return option.value === getOptionValue(modalAddons, addOn) || option.textContent.trim().toLowerCase() === addOn.toLowerCase();
      });
    });
    modalAddons.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (modalMessage && demoType === "free") {
    modalMessage.value = localizeText("I am interested in a free demo");
    modalMessage.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (modalMessage && demoType === "addon-only" && addOns) {
    modalMessage.value = activeLanguage === "Spanish"
      ? `Estoy interesado en el add-on ${localizeListText(addOns)}.`
      : `I am interested in the ${addOns} add-on.`;
    modalMessage.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (modalMessage && packageName) {
    modalMessage.value = activeLanguage === "Spanish"
      ? `Estoy interesado en ${localizeText(packageName)}.`
      : `I am interested in the ${packageName}.`;
    if (addOns) {
      modalMessage.value += activeLanguage === "Spanish"
        ? `\nAdd-ons seleccionados: ${localizeListText(addOns)}.`
        : `\nAdd-ons selected: ${addOns}.`;
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
    accounts: `
      <div class="mock-form-card">
        <b>Create Your Account</b>
        <span>Full name</span><span>Email</span><span>Password</span>
        <span class="large">Choose account type</span>
        <button>Sign Up</button>
      </div>
      <div class="mock-progress"><i></i><i></i><i></i></div>
    `,
    subscriptions: `
      <div class="mock-catalog-grid">
        <i><b>Basic</b></i><i><b>Plus</b></i><i><b>Pro</b></i><i><b>Join</b></i>
      </div>
      <div class="mock-confirm">Monthly plans</div>
    `,
    calendar: `
      <div class="mock-calendar">
        <b>Upcoming Dates</b>
        <div><span>Mon</span><span>Tue</span><span>Wed</span></div>
        <div><button>Event</button><button>Class</button><button>Open</button></div>
      </div>
      <div class="mock-confirm">Next event highlighted</div>
    `,
    googleads: `
      <div class="mock-announcement">Google Ad Landing Page</div>
      <div class="mock-form-card">
        <b>Claim This Offer</b>
        <span>Service area</span><span>Phone</span>
        <span class="large">Ready to get started?</span>
        <button>Call Now</button>
      </div>
    `,
    portals: `
      <div class="mock-linkhub">
        <b>Connect With Us</b>
        <button>Instagram</button><button>Facebook</button><button>TikTok</button><button>YouTube</button>
      </div>
    `,
    popup: `
      <div class="mock-announcement">Important Update</div>
      <div class="mock-page-lines"><i></i><i></i><i></i></div>
      <div class="mock-confirm">Popup message</div>
    `,
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

  window.visoredApplyCurrentLanguage?.();

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

  window.visoredApplyCurrentLanguage?.();

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
  modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateOwnerContact(modalForm, "#modalName", "#modalEmail", "#modalPhone", modalFormNote)) return;
    await submitInquiryForm(modalForm, modalFormNote, "visored-modal-form", "website inquiry");
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
  strong.textContent = localizeText(label);
  span.textContent = value ? localizeListText(String(value)) : localizeText("Not provided");
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
    addSummaryItem("Reference Photos", photosInput && photosInput.files.length
      ? activeLanguage === "Spanish" ? `${photosInput.files.length} seleccionada(s)` : `${photosInput.files.length} selected`
      : "");
    addSummaryItem("Site Goal", data.get("mainGoal"));
    addSummaryItem("Must Include", data.get("mustInclude"));
    addSummaryItem("Other Request", data.get("otherRequest"));

    openSummaryModal();
  });
}

if (confirmDesignSubmit && designNote) {
  confirmDesignSubmit.addEventListener("click", async () => {
    closeSummaryModal();
    await submitInquiryForm(designForm, designNote, "visored-design-form", "design details");
    if (summaryNote) {
      summaryNote.textContent = localizeText("Design details reviewed.");
    }
  });
}

const saveEstimateState = () => {
  if (!storageAvailable || !estimatePackages.length) return;
  const selectedPackageKey = Array.from(estimatePackages).find((item) => item.checked)?.value || "growth";
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
    if (!Array.from(estimatePackages).some((item) => item.checked)) {
      const growthPackage = Array.from(estimatePackages).find((item) => item.value === "growth");
      if (growthPackage) growthPackage.checked = true;
    }
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

  const selectedPackageKey = Array.from(estimatePackages).find((item) => item.checked)?.value || "growth";
  const selectedPackage = packageMap[selectedPackageKey];
  const selectedAddons = Array.from(estimateAddons).filter((item) => item.checked);
  const addonTotal = selectedAddons.reduce((sum, item) => sum + (addonMap[item.value]?.price || 0), 0);
  const total = selectedPackage.price + addonTotal;

  setEstimateTotal(`$${total.toFixed(2).replace(".00", "")}`, animate);
  estimateMonthly.innerHTML = selectedPackage.monthly
    ? '<span class="estimate-financing">Financing Available!</span><span>$49.99 monthly site operations plan applies after launch.</span>'
    : "<span>Monthly site operations details will be confirmed with your estimate.</span>";

  estimateSummary.innerHTML = "";
  const summaryLines = [localizeText(selectedPackage.label)];

  if (selectedAddons.length) {
    selectedAddons.forEach((addon) => {
      const details = addonMap[addon.value];
      summaryLines.push(`- ${localizeText(details?.label || addon.value)} ($${(details?.price || 0).toFixed(2)})`);
    });
  } else {
    summaryLines.push(localizeText("No add-ons selected"));
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
  window.visoredApplyCurrentLanguage?.();
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
        timelineNote.textContent = localizeText("Select a timeline step to spotlight that part of the process.");
        return;
      }

      stage.classList.add("active-stage");
      timelineNote.textContent = localizeText(timelineMessages[stage.dataset.timelineStage] || "Select a timeline step to spotlight that part of the process.");
    }
  });
});

document.querySelectorAll(".price-card, .next-step-grid article, .add-on-grid article, .process-detail-grid article, .faq-item, .estimate-output, .estimate-controls fieldset").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

const revealTargets = document.querySelectorAll(
  "main > section, .price-card, .next-step-grid article, .timeline-diagram article, .add-on-grid article, .process-detail-grid article, .faq-item, .contact-card, fieldset"
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

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${Math.min(100, Math.max(0, progress))}%`);
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

const discoveryHome = document.querySelector(".discovery-home");
let discoveryBgFrame = null;

const updateDiscoveryBackground = () => {
  discoveryBgFrame = null;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const shift = Math.max(-360, Math.min(360, window.scrollY * 0.24));
  document.body.style.setProperty("--bg-shift", `${shift.toFixed(2)}px`);
  if (discoveryHome) {
    discoveryHome.style.setProperty("--bg-shift", `${shift.toFixed(2)}px`);
  }
};

const requestDiscoveryBackground = () => {
  if (discoveryBgFrame) {
    return;
  }

  discoveryBgFrame = window.requestAnimationFrame(updateDiscoveryBackground);
};

updateDiscoveryBackground();
window.addEventListener("scroll", requestDiscoveryBackground, { passive: true });
window.addEventListener("resize", requestDiscoveryBackground);
