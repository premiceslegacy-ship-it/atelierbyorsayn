import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const directory = join(process.cwd(), "content/blog");
const required = ["title", "slug", "description", "publishedAt", "author", "authorUrl", "pillar", "searchIntent", "primaryQuery", "tags", "heroImage", "sources", "draft"];
const queries = new Map<string, string>();
const slugs = new Map<string, string>();
const errors: string[] = [];
const today = new Date().toISOString().slice(0, 10);

for (const file of readdirSync(directory).filter((name) => name.endsWith(".md"))) {
  const { data, content } = matter(readFileSync(join(directory, file), "utf8"));
  for (const key of required) if (data[key] === undefined || data[key] === "") errors.push(`${file}: champ ${key} manquant`);
  if (data.author !== "Samuel Mbeboura") errors.push(`${file}: auteur attendu Samuel Mbeboura`);
  if (data.authorUrl !== "https://fr.linkedin.com/in/samuel-mbeboura-b28796293") errors.push(`${file}: authorUrl inattendue`);
  if (typeof data.draft !== "boolean") errors.push(`${file}: draft doit être booléen`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt ?? "")) errors.push(`${file}: publishedAt invalide`);
  if (data.publishedAt > today) errors.push(`${file}: date future interdite`);
  if (data.updatedAt && (data.updatedAt < data.publishedAt || data.updatedAt > today)) errors.push(`${file}: updatedAt incohérente`);
  if (!Array.isArray(data.sources) || data.sources.length === 0) errors.push(`${file}: au moins une source requise`);
  if (!Array.isArray(data.tags) || data.tags.length === 0) errors.push(`${file}: au moins un tag requis`);
  if (!content.match(/^##\s+/m)) errors.push(`${file}: au moins un intertitre H2 requis`);
  const filenameSlug = file.replace(/\.md$/, "");
  if (filenameSlug !== data.slug) errors.push(`${file}: le nom du fichier doit correspondre au slug`);
  const normalizedQuery = String(data.primaryQuery ?? "").trim().toLowerCase();
  const duplicateQuery = queries.get(normalizedQuery);
  if (duplicateQuery) errors.push(`${file}: primaryQuery déjà utilisée dans ${duplicateQuery}`);
  else queries.set(normalizedQuery, file);
  const duplicateSlug = slugs.get(data.slug);
  if (duplicateSlug) errors.push(`${file}: slug déjà utilisé dans ${duplicateSlug}`);
  else slugs.set(data.slug, file);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`${slugs.size} articles validés : métadonnées, dates, sources, requêtes et slugs cohérents.`);
