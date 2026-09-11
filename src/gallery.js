export function initGallery(root = document) {
  const dialog = root.querySelector('[data-gallery-dialog]');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = root.querySelector('[data-gallery-image]');
  const caption = root.querySelector('[data-gallery-caption]');
  const close = root.querySelector('[data-gallery-close]');
  let opener;
  let previousOverflow;

  for (const link of root.querySelectorAll('[data-gallery-link]')) {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = link.dataset.caption;
      previousOverflow = root.body.style.overflow;
      root.body.style.overflow = 'hidden';
      dialog.showModal();
      close.focus();
    });
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  // Native dialog handles Escape and traps keyboard focus while the image is open.
  dialog.addEventListener('close', () => {
    root.body.style.overflow = previousOverflow;
    opener?.focus();
  });
}

if (typeof document !== 'undefined') initGallery();
