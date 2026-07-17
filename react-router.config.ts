import type { Config } from "@react-router/dev/config";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { metiers } from "./src/data/metiers";

const CONTENT_DIR = join(process.cwd(), "content/blog");

function publishedArticlePaths() {
  return readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => matter(readFileSync(join(CONTENT_DIR, file), "utf8")).data)
    .filter((data) => data.draft !== true && data.slug)
    .map((data) => `/blog/${data.slug}`);
}

export default {
  ssr: false,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
  async prerender() {
    return [
      "/",
      "/blog",
      "/mentions-legales",
      "/confidentialite",
      "/cgv",
      ...metiers.map((metier) => `/${metier.slug}`),
      ...publishedArticlePaths(),
    ];
  },
} satisfies Config;
