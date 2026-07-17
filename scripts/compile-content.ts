import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDirectory = join(process.cwd(), "content/blog");
const outputDirectory = join(process.cwd(), "app/generated");

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const articles = readdirSync(contentDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file): Record<string, any> => {
    const { data, content } = matter(readFileSync(join(contentDirectory, file), "utf8"));
    const metadata = data as Record<string, unknown>;
    const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => ({ text: match[1].replace(/[*_`]/g, ""), id: slugify(match[1]) }));
    let headingIndex = 0;
    const html = (marked.parse(content, { async: false }) as string).replace(/<h2>(.*?)<\/h2>/g, (full, inner) => {
      const heading = headings[headingIndex++];
      return heading ? `<h2 id="${heading.id}">${inner}</h2>` : full;
    });
    return { ...metadata, body: content, html, headings, readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220)) };
  })
  .filter((article) => article.draft !== true)
  .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, "articles.ts"), `// Généré depuis content/blog. Ne pas modifier à la main.\nexport default ${JSON.stringify(articles, null, 2)};\n`);
console.log(`${articles.length} articles Markdown compilés pour le client.`);
