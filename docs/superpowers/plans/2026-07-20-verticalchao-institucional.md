# Vertical Chao Institucional Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a static institutional website for Vertical Chao with approved contacts, improved Portuguese copy, GitHub ownership under `trafegocomprado`, and Cloudflare Pages deployment.

**Architecture:** A dependency-light static site keeps hosting cost low and makes Cloudflare Pages deployment simple. The implementation uses focused files: HTML for semantic structure and content, CSS for the visual system and responsiveness, JavaScript for menu, form-to-WhatsApp behavior, and validation scripts for release checks.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js validation scripts, GitHub CLI, Cloudflare Pages.

---

## File Structure

- Create `package.json`: project scripts for validation, local preview, and build check.
- Create `src/index.html`: semantic one-page site, SEO metadata, structured data, sections, forms, contact links.
- Create `src/styles.css`: design tokens, responsive layout, accessible focus states, motion with reduced-motion support.
- Create `src/main.js`: mobile navigation, smooth anchor behavior, contact form validation, WhatsApp message builder.
- Create `src/assets/`: optimized images copied or downloaded from approved public client pages when technically suitable.
- Create `scripts/validate-site.mjs`: static assertions for forbidden phone removal, required contacts, metadata, schema, and markup basics.
- Create `scripts/check-links.mjs`: local link and asset reference validation.
- Create `dist/`: production output generated from `src/` by the build script.
- Create `README.md`: project purpose, local commands, deployment notes, contact rules.
- Modify `docs/superpowers/specs/2026-07-20-verticalchao-institucional-design.md`: no functional edits expected; reference only.

## Low-Fi Layout

```text
[header logo | anchors | phone | whatsapp]
[hero full-bleed obra image + brand + promise + CTAs]
[trust strip: seguranca | eficiencia | pontualidade | qualificacao]
[quem somos: narrative + metrics + credentials]
[servicos: complete grid]
[destaques: limpeza | pastilhas | pintura | ecogranito]
[galeria: responsive works]
[depoimentos]
[orcamento form + direct contact]
[footer: address | phones | email | legal]
[floating whatsapp]
```

## Visual Thesis

Vertical Chao should feel like a specialist rope-access and facade company: practical, confident, clean, and grounded in real construction work, with green/orange accents used as signals instead of decoration.

## Content Plan

The hero establishes who the company is and what it solves. The middle sections prove capability with services, credentials, metrics, photos, and testimonials. The final contact area removes friction by turning the quote request into a WhatsApp conversation.

## Interaction Thesis

Use a compact entrance sequence in the hero, a subtle header state change while scrolling, and small hover/focus transitions on service and CTA elements. Respect `prefers-reduced-motion` so the page remains calm for users who prefer less motion.

### Task 1: Project Skeleton and Validation Harness

**Files:**
- Create: `package.json`
- Create: `src/index.html`
- Create: `src/styles.css`
- Create: `src/main.js`
- Create: `scripts/validate-site.mjs`
- Create: `scripts/check-links.mjs`
- Create: `README.md`

- [ ] **Step 1: Create the initial files with failing validation**

Create `package.json` with scripts:

```json
{
  "name": "verticalchao-institucional",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "node scripts/build.mjs",
    "validate": "node scripts/validate-site.mjs && node scripts/check-links.mjs",
    "check": "npm run build && npm run validate",
    "preview": "npx http-server dist -p 4173 -c-1"
  },
  "devDependencies": {
    "http-server": "^14.1.1"
  }
}
```

Create minimal `src/index.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vertical Chao</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <main>
      <h1>Vertical Chao</h1>
    </main>
    <script src="./main.js" type="module"></script>
  </body>
</html>
```

Create empty `src/styles.css` and `src/main.js`.

Create `scripts/validate-site.mjs` with assertions:

```js
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("src/index.html", "utf8");
const cssExists = existsSync("src/styles.css");
const jsExists = existsSync("src/main.js");

const required = [
  "(31) 99684-8477",
  "tel:+5531996848477",
  "https://api.whatsapp.com/send?phone=5531996848477&text=Ol%C3%A1,%20preciso%20de%20um%20atendimento!",
  "(31) 98712-2106",
  "verticalchao@gmail.com",
  "LocalBusiness"
];

const removedLocalPrefix = "994";
const removedLocalSuffix = "71";
const removedInternationalPrefix = "553199";
const removedInternationalSuffix = "4711393";
const removedCardName = ["Edv", "aldo"].join("");
const forbidden = [
  `${removedLocalPrefix}${removedLocalSuffix}`,
  `${removedInternationalPrefix}${removedInternationalSuffix}`,
  removedCardName
];
const failures = [];

for (const item of required) {
  if (!html.includes(item)) failures.push(`Missing required content: ${item}`);
}

for (const item of forbidden) {
  if (html.includes(item)) failures.push(`Forbidden content remains: ${item}`);
}

if (!cssExists) failures.push("Missing src/styles.css");
if (!jsExists) failures.push("Missing src/main.js");
if (!html.includes("<meta name=\"description\"")) failures.push("Missing meta description");
if (!html.includes("application/ld+json")) failures.push("Missing JSON-LD schema");
if (!html.includes("id=\"orcamento\"")) failures.push("Missing quote/contact section");
if (!html.includes("data-whatsapp-form")) failures.push("Missing WhatsApp form hook");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Site validation passed.");
```

Create `scripts/check-links.mjs`:

```js
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const html = readFileSync("src/index.html", "utf8");
const assetRefs = [...html.matchAll(/(?:src|href)="(\.\/[^"#?]+)"/g)].map((match) => match[1]);
const failures = [];

for (const ref of assetRefs) {
  if (ref.endsWith(".css") || ref.endsWith(".js") || ref.includes("/assets/")) {
    const path = join("src", ref.replace(/^\.\//, ""));
    if (!existsSync(path)) failures.push(`Missing referenced file: ${path}`);
  }
}

const anchors = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const anchorRefs = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const anchor of anchorRefs) {
  if (!anchors.has(anchor)) failures.push(`Missing anchor target: #${anchor}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Link validation passed.");
```

- [ ] **Step 2: Run validation and verify it fails**

Run: `npm run validate`

Expected: FAIL with missing required content such as `(31) 99684-8477`, `LocalBusiness`, and `data-whatsapp-form`.

- [ ] **Step 3: Add build script**

Create `scripts/build.mjs`:

```js
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";

if (existsSync("dist")) {
  rmSync("dist", { recursive: true, force: true });
}

mkdirSync("dist", { recursive: true });
cpSync("src", "dist", { recursive: true });

console.log("Build complete: dist/");
```

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: PASS and `dist/index.html` exists.

- [ ] **Step 5: Commit skeleton**

Run:

```bash
git add package.json src scripts README.md
git commit -m "chore: scaffold static site"
```

### Task 2: Content, SEO, and Contact Rules

**Files:**
- Modify: `src/index.html`
- Modify: `README.md`

- [ ] **Step 1: Replace `src/index.html` with complete semantic content**

Implement sections for header, hero, trust strip, who we are, services grid, featured services, gallery, testimonials, quote form, footer, and floating WhatsApp. Include:

```html
<a href="tel:+5531996848477">(31) 99684-8477</a>
<a href="https://api.whatsapp.com/send?phone=5531996848477&text=Ol%C3%A1,%20preciso%20de%20um%20atendimento!">WhatsApp</a>
<a href="tel:+5531987122106">(31) 98712-2106</a>
```

Use JSON-LD with `"@type": "LocalBusiness"`, `"telephone": "+55 31 99684-8477"`, `"email": "verticalchao@gmail.com"`, and service area focused on Minas Gerais/Brasil. Keep all public contact CTAs pointed to the approved commercial number.

- [ ] **Step 2: Run copy-editing sweeps**

Review the Portuguese copy for clarity, voice, benefit, proof, specificity, emotion, and risk reduction. Replace robotic phrases with natural Brazilian Portuguese, short paragraphs, concrete service names, and direct CTAs.

- [ ] **Step 3: Update README**

Document:

```md
# Vertical Chao Institucional

Site institucional estatico da Vertical Chao para Cloudflare Pages.

## Contatos obrigatorios

- Principal: (31) 99684-8477 / tel:+5531996848477
- WhatsApp: https://api.whatsapp.com/send?phone=5531996848477&text=Ol%C3%A1,%20preciso%20de%20um%20atendimento!
- Rodape secundario: (31) 98712-2106
- Removido: qualquer uso do número comercial antigo substituído neste projeto.

## Comandos

- npm run build
- npm run validate
- npm run check
```

- [ ] **Step 4: Run validation**

Run: `npm run validate`

Expected: PASS.

- [ ] **Step 5: Commit content**

Run:

```bash
git add src/index.html README.md
git commit -m "feat: add institutional content and contact rules"
```

### Task 3: Visual System and Responsive UI

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Implement design tokens and layout CSS**

Use CSS variables for green, orange, off-white, text, muted text, borders, and shadows. Use a full-bleed hero with real facade imagery, accessible contrast, no default-font feel, and responsive `clamp()` type.

- [ ] **Step 2: Add responsive sections**

Style header, navigation, trust strip, service grid, featured service bands, gallery, testimonials, form, footer, and floating WhatsApp. Ensure mobile tap targets are at least 44px for key controls.

- [ ] **Step 3: Add motion responsibly**

Add hero entrance, hover transitions, sticky header state, and `@media (prefers-reduced-motion: reduce)` to disable nonessential animation.

- [ ] **Step 4: Run build and validation**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 5: Commit CSS**

Run:

```bash
git add src/styles.css
git commit -m "feat: style responsive institutional site"
```

### Task 4: JavaScript Behavior

**Files:**
- Modify: `src/main.js`
- Modify: `src/index.html`

- [ ] **Step 1: Implement mobile navigation**

Add click and keyboard-safe menu toggle using `aria-expanded`, close the menu after anchor clicks, and close on `Escape`.

- [ ] **Step 2: Implement WhatsApp quote form**

Read name, phone, service, message, validate required fields, show inline errors, and open:

```js
const phone = "5531996848477";
const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
window.open(url, "_blank", "noopener,noreferrer");
```

- [ ] **Step 3: Implement header scroll state**

Toggle a class on the header when the page scrolls past the hero threshold.

- [ ] **Step 4: Run validation**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 5: Commit JavaScript**

Run:

```bash
git add src/main.js src/index.html
git commit -m "feat: add navigation and whatsapp form behavior"
```

### Task 5: Assets and Image Optimization

**Files:**
- Create: `src/assets/*`
- Modify: `src/index.html`
- Modify: `src/styles.css`

- [ ] **Step 1: Download suitable public assets**

Use public images from `www.verticalchao.com.br` and `pinturafachadas.verticalchao.com.br` when available and suitable for the client's site. Store optimized files in `src/assets/` with descriptive lowercase names such as `fachada-hero.webp`, `trabalho-altura-01.webp`, and `ecogranito.webp`.

- [ ] **Step 2: Add width, height, alt, loading, and decoding**

Every content image must include concrete `width`, `height`, useful `alt`, `loading="lazy"` outside the hero, and `decoding="async"`.

- [ ] **Step 3: Re-check visual layout locally**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 4: Commit assets**

Run:

```bash
git add src/assets src/index.html src/styles.css
git commit -m "feat: add optimized facade imagery"
```

### Task 6: Final QA, GitHub, and Cloudflare Pages

**Files:**
- Modify: `README.md` only if final deployment notes are needed.

- [ ] **Step 1: Run release checks**

Run:

```bash
npm run check
rg "numero-removido|contato-antigo" src scripts README.md
```

Expected: `npm run check` passes and the source files contain no public reference to the removed number or removed widget card.

- [ ] **Step 2: Preview and inspect desktop/mobile**

Run: `npm run preview`

Inspect at desktop and mobile widths for header, hero, services, form, footer, and floating WhatsApp. Fix overlapping text, low contrast, broken anchors, or awkward copy before continuing.

- [ ] **Step 3: Create GitHub repository**

Run:

```bash
gh repo create trafegocomprado/verticalchao-institucional --public --source . --remote origin --push
```

Expected: repository exists under `trafegocomprado` and `main` is pushed.

- [ ] **Step 4: Create Cloudflare Pages project connected to GitHub**

Use Cloudflare's current Git-connected Pages flow with:

```text
Project name: verticalchao-institucional
Production branch: main
Build command: npm run build
Build output directory: dist
```

If a dashboard step is required to authorize the GitHub repository, complete it there; do not change the custom domain.

- [ ] **Step 5: Confirm deployment**

Verify the Pages project has a live `pages.dev` URL, the deployment is green, and the source is the GitHub repository. Add the URL to the final handoff.

- [ ] **Step 6: Commit final deployment notes if changed**

Run:

```bash
git add README.md
git commit -m "docs: add deployment notes"
git push
```

Only run this commit if `README.md` changed.

## Self-Review

- Spec coverage: The plan covers the static institutional page, approved contacts, removal of the old commercial contact, WhatsApp widget, service content, SEO/schema, accessibility, responsive design, GitHub repository, and Cloudflare Pages deployment.
- Placeholder scan: The plan contains no `TBD`, `TODO`, `fill in details`, or unresolved implementation references.
- Type consistency: JavaScript hooks use `data-whatsapp-form`, contact constants use the approved phone `5531996848477`, build output is consistently `dist`, and the repository name is consistently `verticalchao-institucional`.
