import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("src/index.html", "utf8");
const css = readFileSync("src/styles.css", "utf8");
const js = readFileSync("src/main.js", "utf8");
const source = `${html}\n${css}\n${js}`;
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
if (!existsSync("src/assets/logo.webp")) failures.push("Missing official logo asset");
if (!existsSync("src/assets/favicon-32.png")) failures.push("Missing favicon asset");
if (!existsSync("src/assets/apple-touch-icon.png")) failures.push("Missing Apple touch icon asset");
if (!html.includes('<meta name="description"')) failures.push("Missing meta description");
if (!html.includes("application/ld+json")) failures.push("Missing JSON-LD schema");
if (!html.includes('id="orcamento"')) failures.push("Missing quote/contact section");
if (!html.includes("data-contact-form")) failures.push("Missing email contact form hook");
for (const contactAsset of ["src/contact-config.js", "src/contact-form.js"]) {
  if (!existsSync(contactAsset)) failures.push(`Missing email contact asset: ${contactAsset}`);
}
if (!html.includes('<meta name="theme-color" content="#14171f">')) failures.push("Theme color must match the graphite brand token");
if (!html.includes('href="./assets/favicon-32.png"')) failures.push("Missing favicon link");
if (!html.includes('href="./assets/apple-touch-icon.png"')) failures.push("Missing Apple touch icon link");
if ((html.match(/src="\.\/assets\/logo\.webp"/g) ?? []).length !== 2) failures.push("Official logo must appear in header and footer");
if (html.includes("brand-mark")) failures.push("Legacy VC monogram remains");
for (const legacyToken of ["--green-900", "--green-800", "--green-700", "--green-100", "--orange-600", "--orange-500"]) {
  if (css.includes(legacyToken)) failures.push(`Legacy color token remains: ${legacyToken}`);
}
for (const requiredToken of ["--red: #e8333b", "--ink: #14171f", "--paper: #fafaf8", "--whatsapp: #25d366"]) {
  if (!css.toLowerCase().includes(requiredToken)) failures.push(`Missing brand color token: ${requiredToken}`);
}

for (const menuArtifact of ["data-menu-toggle", "menu-toggle", "menu-open", "is-open"]) {
  if (source.includes(menuArtifact)) failures.push(`Mobile menu artifact remains: ${menuArtifact}`);
}

const mobileGallery = css.slice(css.lastIndexOf("@media (max-width: 680px)"));
if (!/\.gallery\s*\{\s*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(mobileGallery) || !/\.gallery img\s*\{[^}]*aspect-ratio:\s*1;/.test(css)) {
  failures.push("Gallery thumbnails must remain square in two columns on mobile");
}

if ((html.match(/data-gallery-link/g) ?? []).length < 8) failures.push("Gallery must include at least eight expandable photos");
if (!html.includes('data-gallery-dialog') || !existsSync('src/gallery.js')) failures.push("Missing gallery lightbox");
if (!html.includes('Registro: 141201165-5') || html.includes('CFT/BR:')) failures.push("Technical registration label must read Registro");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Site validation passed.");
