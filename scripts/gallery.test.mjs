import test from 'node:test';
import assert from 'node:assert/strict';
import { initGallery } from '../src/gallery.js';

class Element {
  constructor() { this.events = {}; this.dataset = {}; this.style = {}; }
  addEventListener(name, callback) { this.events[name] = callback; }
  dispatch(name, extra = {}) { const event = { target: this, preventDefault() { this.prevented = true; }, ...extra }; this.events[name]?.(event); return event; }
  focus() { this.focused = true; }
}
function setup() {
  const image = new Element();
  const caption = new Element();
  const close = new Element();
  const dialog = new Element();
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; dialog.dispatch('close'); };
  const links = ['Lavagem dos vidros', 'Aplicação de EcoGranito'].map((text, i) => {
    const link = new Element(); link.href = `https://example.test/${i}.jpg`;
    link.querySelector = () => ({ alt: text }); link.dataset.caption = text; return link;
  });
  const body = { style: { overflow: 'auto' } };
  const root = { body, querySelectorAll: () => links, querySelector: (selector) => ({ '[data-gallery-dialog]': dialog, '[data-gallery-image]': image, '[data-gallery-caption]': caption, '[data-gallery-close]': close })[selector] };
  initGallery(root);
  return { links, dialog, image, caption, close, body };
}
test('gallery opens the selected full image and readable caption, then restores scroll and focus', () => {
  const { links, dialog, image, caption, close, body } = setup();
  assert.equal(links[1].dispatch('click').prevented, true);
  assert.equal(dialog.open, true); assert.equal(image.src, links[1].href);
  assert.equal(image.alt, 'Aplicação de EcoGranito'); assert.equal(caption.textContent, image.alt);
  assert.equal(body.style.overflow, 'hidden');
  close.dispatch('click');
  assert.equal(dialog.open, false); assert.equal(links[1].focused, true); assert.equal(body.style.overflow, 'auto');
});
test('native Escape/close returns focus; backdrop closes but image click does not', () => {
  const { links, dialog, image } = setup();
  links[0].dispatch('click'); dialog.close(); assert.equal(links[0].focused, true);
  links[1].dispatch('click'); dialog.dispatch('click', { target: image }); assert.equal(dialog.open, true);
  dialog.dispatch('click'); assert.equal(dialog.open, false); assert.equal(links[1].focused, true);
});
test('modified clicks keep normal image link behavior', () => {
  const { links, dialog } = setup();
  assert.equal(links[0].dispatch('click', { ctrlKey: true }).prevented, undefined);
  assert.equal(dialog.open, undefined);
});
