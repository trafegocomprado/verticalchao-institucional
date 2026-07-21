import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

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
