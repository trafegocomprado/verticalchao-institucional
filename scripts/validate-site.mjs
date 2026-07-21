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
if (!html.includes('<meta name="description"')) failures.push("Missing meta description");
if (!html.includes("application/ld+json")) failures.push("Missing JSON-LD schema");
if (!html.includes('id="orcamento"')) failures.push("Missing quote/contact section");
if (!html.includes("data-whatsapp-form")) failures.push("Missing WhatsApp form hook");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Site validation passed.");
