import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const directory = join(process.cwd(), "content/blog");
const inventoryPath = join(process.cwd(), "skills/atelier-content-engine/references/content-inventory.json");
const required = ["title", "slug", "description", "publishedAt", "author", "authorUrl", "pillar", "searchIntent", "primaryQuery", "tags", "heroImage", "sources", "draft"];
const queries = new Map<string, string>();
const slugs = new Map<string, string>();
const errors: string[] = [];
const today = new Date().toISOString().slice(0, 10);
const renderedLinks = new Map<string, string[]>();

for (const file of readdirSync(directory).filter((name) => name.endsWith(".md"))) {
  const { data, content } = matter(readFileSync(join(directory, file), "utf8"));
  for (const key of required) if (data[key] === undefined || data[key] === "") errors.push(`${file}: champ ${key} manquant`);
  if (typeof data.title === "string" && data.title.length > 70) errors.push(`${file}: title trop long (${data.title.length} caractères, max 70)`);
  if (typeof data.description === "string" && (data.description.length < 25 || data.description.length > 160)) errors.push(`${file}: description hors bornes (${data.description.length} caractères, attendu 25-160)`);
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
  renderedLinks.set(data.slug, [...content.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)].map((match) => match[1]));
}

type InventoryArticle = {
  slug: string;
  parent: string;
  intent: string;
  primaryQuery: string;
  internalLinks: string[];
  relatedLinks: string[];
  incomingLinks: string[];
  commercialTarget: string;
};

const inventory = JSON.parse(readFileSync(inventoryPath, "utf8")) as { articles?: InventoryArticle[] };
if (!Array.isArray(inventory.articles)) {
  errors.push("content-inventory.json: articles doit être un tableau");
} else {
  const entries = new Map(inventory.articles.map((article) => [article.slug, article]));
  for (const slug of slugs.keys()) if (!entries.has(slug)) errors.push(`${slug}: absent de content-inventory.json`);
  for (const slug of entries.keys()) if (!slugs.has(slug)) errors.push(`${slug}: inventorié sans article Markdown`);

  const expectedIncoming = new Map([...slugs.keys()].map((slug) => [slug, [] as string[]]));
  for (const article of inventory.articles) {
    if (!article.parent || (article.parent !== "/blog" && !slugs.has(article.parent))) errors.push(`${article.slug}: parent invalide`);
    if (!article.intent?.trim()) errors.push(`${article.slug}: intention de cocon manquante`);
    if (!article.primaryQuery?.trim()) errors.push(`${article.slug}: requête principale manquante dans l'inventaire`);
    if (!article.commercialTarget?.startsWith("/")) errors.push(`${article.slug}: destination commerciale invalide`);
    if (!Array.isArray(article.internalLinks) || article.internalLinks.length === 0) errors.push(`${article.slug}: liens internes sortants manquants`);
    if (!Array.isArray(article.relatedLinks)) errors.push(`${article.slug}: relatedLinks doit être un tableau`);
    if (!Array.isArray(article.incomingLinks) || article.incomingLinks.length === 0) errors.push(`${article.slug}: page orpheline, lien entrant manquant`);

    const actual = [...new Set(renderedLinks.get(article.slug) ?? [])].sort();
    const declared = [...new Set(article.internalLinks ?? [])].sort();
    if (JSON.stringify(actual) !== JSON.stringify(declared)) errors.push(`${article.slug}: internalLinks ne correspond pas aux liens rendus`);
    for (const target of declared) {
      if (!slugs.has(target)) errors.push(`${article.slug}: cible interne inconnue ${target}`);
      else expectedIncoming.get(target)?.push(article.slug);
      if (target === article.slug) errors.push(`${article.slug}: lien interne vers lui-même`);
    }
    for (const target of article.relatedLinks ?? []) {
      if (!slugs.has(target)) errors.push(`${article.slug}: article associé inconnu ${target}`);
      if (target === article.slug) errors.push(`${article.slug}: article associé vers lui-même`);
    }
  }

  for (const article of inventory.articles) {
    const expected = [...new Set(expectedIncoming.get(article.slug) ?? [])].sort();
    const declared = [...new Set(article.incomingLinks ?? [])].sort();
    if (JSON.stringify(expected) !== JSON.stringify(declared)) errors.push(`${article.slug}: incomingLinks ne correspond pas aux liens entrants réels`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`${slugs.size} articles validés : métadonnées, sources, cocon sémantique et maillage interne cohérents.`);
