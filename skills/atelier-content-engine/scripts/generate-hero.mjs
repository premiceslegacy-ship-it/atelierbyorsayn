// Génère l'image héro d'un article depuis le template de marque (fond noir, logo Atelier, hook Geist).
// Usage : node skills/atelier-content-engine/scripts/generate-hero.mjs <slug> "<hook HTML avec <br /> et <em>>"
// Écrit directement dans public/images/blog/<slug>.webp au format 1200x750.
import { chromium } from "playwright";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const repoRoot = resolve(import.meta.dirname, "../../..");
const [, , slug, hook] = process.argv;

if (!slug || !hook) {
  console.error('Usage: node generate-hero.mjs <slug> "<hook HTML>"');
  process.exit(1);
}

const templatePath = join(repoRoot, "skills/atelier-content-engine/assets/hero-template.html");
let html = readFileSync(templatePath, "utf8").replaceAll("ABSOLUTE_PATH_TO_REPO", repoRoot);

const tmpHtmlPath = join(repoRoot, `.hero-tmp-${slug}.html`);
writeFileSync(tmpHtmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 2 });
await page.goto(`file://${tmpHtmlPath}`);
await page.evaluate((h) => { document.getElementById("hook").innerHTML = h; }, hook);
await page.waitForTimeout(200);
const pngBuffer = await page.screenshot();
await browser.close();
unlinkSync(tmpHtmlPath);

const outPath = join(repoRoot, `public/images/blog/${slug}.webp`);
await sharp(pngBuffer).resize(1200, 750).webp({ quality: 88 }).toFile(outPath);
console.log(`Image héro générée : public/images/blog/${slug}.webp`);
