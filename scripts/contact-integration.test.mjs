import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../src/index.html', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('email form markup prevents GET fallback and requires a reply email', () => {
  assert.match(html, /<form\b[^>]*data-contact-form[^>]*method="post"[^>]*action="#orcamento"[^>]*novalidate/i);
  assert.match(html, /<input\b[^>]*name="email"[^>]*type="email"[^>]*required/);
  const phone = html.match(/<input\b[^>]*name="telefone"[^>]*>/)?.[0];
  assert.ok(phone);
  assert.doesNotMatch(phone, /\brequired\b/);
  for (const name of ['nome', 'email', 'telefone', 'servico', 'mensagem', 'website']) assert.match(html, new RegExp(`name="${name}"`));
  assert.match(html, /<button\b[^>]*type="submit"[^>]*disabled/);
  assert.match(html, /<noscript>[\s\S]*?mailto:verticalchao@gmail\.com[\s\S]*?<\/noscript>/);
  assert.ok(html.includes('data-form-status'));
  assert.ok(html.includes('data-turnstile'));
  assert.ok(html.includes('data-contact-fallback'));
});

test('contact config loads before the client and the old form handler is removed', () => {
  const config = html.indexOf('src="./contact-config.js"');
  const client = html.indexOf('src="./contact-form.js"');
  assert.ok(config > 0 && client > config);
  assert.doesNotMatch(main, /addEventListener\(["']submit/);
  assert.doesNotMatch(main, /form_submitted/);
  assert.doesNotMatch(html, /data-whatsapp-form|Nenhum dado fica armazenado/);
  assert.ok(html.includes('https://api.whatsapp.com/send?phone=5531996848477'), 'Independent WhatsApp CTAs must remain');
});
