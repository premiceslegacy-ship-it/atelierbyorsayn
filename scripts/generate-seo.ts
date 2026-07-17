import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const SITE_URL = "https://www.atelier-btp.fr";
const output = join(process.cwd(), "build/client");
const contentDirectory = join(process.cwd(), "content/blog");
const staticRoutes = [
  "",
  "blog",
  "mentions-legales",
  "confidentialite",
  "cgv",
  "electricien",
  "plombier",
  "menuisier",
  "peintre",
  "tolier",
  "paysagiste",
  "macon",
];
const articles = readdirSync(contentDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => matter(readFileSync(join(contentDirectory, file), "utf8")))
  .filter((article) => article.data.draft !== true)
  .sort((a, b) => String(b.data.publishedAt).localeCompare(String(a.data.publishedAt)));

mkdirSync(output, { recursive: true });

const routeEntries = [
  ...staticRoutes.map((path) => ({ path, lastmod: "2026-07-17" })),
  ...articles.map((article) => ({ path: `blog/${article.data.slug}`, lastmod: article.data.updatedAt ?? article.data.publishedAt })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routeEntries.map(({ path, lastmod }) => `  <url><loc>${SITE_URL}/${path}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}
</urlset>\n`;
writeFileSync(join(output, "sitemap.xml"), sitemap);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Le journal Atelier</title><link>${SITE_URL}/blog</link><description>Gestion, marge et IA métier pour les artisans du BTP.</description><language>fr-FR</language>
${articles.map(({ data }) => `  <item><title><![CDATA[${data.title}]]></title><link>${SITE_URL}/blog/${data.slug}</link><guid>${SITE_URL}/blog/${data.slug}</guid><pubDate>${new Date(`${data.publishedAt}T12:00:00Z`).toUTCString()}</pubDate><description><![CDATA[${data.description}]]></description></item>`).join("\n")}
</channel></rss>\n`;
writeFileSync(join(output, "rss.xml"), rss);

writeFileSync(join(output, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /assets/*.map$\nSitemap: ${SITE_URL}/sitemap.xml\n`);

const llms = `# Atelier\n\n> Application de gestion et assistante IA métier pour les artisans du BTP, conçue par Orsayn.\n\n## Pages principales\n\n- [Accueil](${SITE_URL}/) : proposition de valeur, Sarah, résultats clients et tarifs\n- [Le journal](${SITE_URL}/blog) : guides sourcés pour artisans du BTP\n- [Tarifs](${SITE_URL}/#tarifs) : Starter 39 €, Pro 79 €, Expert 159 € HT/mois\n\n## Articles\n\n${articles.map(({ data }) => `- [${data.title}](${SITE_URL}/blog/${data.slug}) : ${data.description}`).join("\n")}\n\n## Vérité produit\n\nSarah prépare et propose à partir du contexte Atelier ; l'utilisateur valide les actions sensibles. Setup : 3 000 € HT sans abonnement, ou 1 500 € HT avec abonnement. Les résultats clients publiés sont des cas réels anonymisés et ne constituent pas une garantie.\n`;
writeFileSync(join(output, "llms.txt"), llms);

console.log(`SEO généré : ${routeEntries.length} URLs, ${articles.length} articles, sitemap, RSS, robots et llms.txt.`);
