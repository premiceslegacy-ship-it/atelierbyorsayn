import { readFileSync } from "node:fs";
import { join } from "node:path";

const SITE_HOST = "www.atelier-btp.fr";
const INDEXNOW_KEY = "5fe7e8915b079b559e53a2d7ead54d27";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const sitemapPath = join(process.cwd(), "build/client/sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf8");
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) {
  console.error("Aucune URL trouvée dans le sitemap, abandon.");
  process.exit(1);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList,
  }),
});

if (response.ok) {
  console.log(`IndexNow : ${urlList.length} URL soumises avec succès (${response.status}).`);
} else {
  console.error(`IndexNow a échoué (${response.status} ${response.statusText}).`);
  console.error(await response.text());
  process.exit(1);
}
