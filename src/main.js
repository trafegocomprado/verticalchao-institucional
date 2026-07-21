const commercialWhatsapp = "5531996848477";

const header = document.querySelector("[data-site-header]");
const whatsappForm = document.querySelector("[data-whatsapp-form]");

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setFieldError(form, name, message) {
  const field = form.elements.namedItem(name);
  const error = form.querySelector(`[data-error-for="${name}"]`);

  if (field instanceof HTMLElement) {
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  if (error) {
    error.textContent = message;
  }
}

function getFormValue(form, name) {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement
    ? field.value.trim()
    : "";
}

function validateQuoteForm(form) {
  const rules = [
    ["nome", "Informe seu nome."],
    ["telefone", "Informe um telefone para retorno."],
    ["servico", "Escolha o serviço desejado."]
  ];

  let valid = true;

  for (const [name, message] of rules) {
    const value = getFormValue(form, name);
    setFieldError(form, name, value ? "" : message);
    if (!value) valid = false;
  }

  return valid;
}

function buildWhatsappMessage(form) {
  const nome = getFormValue(form, "nome");
  const telefone = getFormValue(form, "telefone");
  const servico = getFormValue(form, "servico");
  const mensagem = getFormValue(form, "mensagem");
  const detalhes = mensagem || "Ainda preciso detalhar o serviço com a equipe.";

  return [
    "Olá, preciso de um atendimento!",
    "",
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
    `Serviço: ${servico}`,
    `Mensagem: ${detalhes}`
  ].join("\n");
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

whatsappForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  if (!(form instanceof HTMLFormElement)) return;

  if (!validateQuoteForm(form)) {
    const invalid = form.querySelector('[aria-invalid="true"]');
    if (invalid instanceof HTMLElement) invalid.focus();
    return;
  }

  const text = encodeURIComponent(buildWhatsappMessage(form));
  const url = `https://api.whatsapp.com/send?phone=${commercialWhatsapp}&text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
