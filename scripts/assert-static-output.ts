import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const root = join(process.cwd(), "build/client");
const fixed = ["", "blog", "mentions-legales", "confidentialite", "cgv", "electricien", "plombier", "menuisier", "peintre", "tolier", "paysagiste", "macon"];
const articleRoutes = readdirSync(join(process.cwd(), "content/blog"))
  .filter((file) => file.endsWith(".md"))
  .map((file) => matter(readFileSync(join(process.cwd(), "content/blog", file), "utf8")).data)
  .filter((meta) => meta.draft !== true)
  .map((meta) => `blog/${meta.slug}`);
const failures: string[] = [];

for (const route of [...fixed, ...articleRoutes]) {
  const file = join(root, route, "index.html");
  if (!existsSync(file)) { failures.push(`${route || "/"}: HTML absent`); continue; }
  const html = readFileSync(file, "utf8");
  if (html.includes("Cette page n'existe pas")) failures.push(`${route || "/"}: fallback 404 pré-rendu`);
  if (!/<h1[\s>]/i.test(html)) failures.push(`${route || "/"}: H1 absent`);
  if (!/<link[^>]+rel="canonical"/i.test(html)) failures.push(`${route || "/"}: canonical absent`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${route || "/"}: title absent`);
  if (!/<script[^>]+application\/ld\+json/i.test(html) && !["mentions-legales", "confidentialite", "cgv"].includes(route)) failures.push(`${route || "/"}: JSON-LD absent`);
}

for (const file of ["sitemap.xml", "rss.xml", "robots.txt", "llms.txt"]) {
  if (!existsSync(join(root, file))) failures.push(`${file}: absent`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`${fixed.length + articleRoutes.length} routes pré-rendues et artefacts SEO validés.`);
