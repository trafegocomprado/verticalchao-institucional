const header = document.querySelector("[data-site-header]");


function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

const floatingWhatsapp = document.querySelector('.floating-whatsapp');
const quote = document.querySelector('#orcamento');
if (floatingWhatsapp && quote && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    floatingWhatsapp.hidden = entry.isIntersecting;
  }).observe(quote);
}
