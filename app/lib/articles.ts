import generatedArticles from "../generated/articles";

export type ArticleSource = { title: string; url: string };
export type ArticleFrontmatter = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorUrl: string;
  pillar: string;
  searchIntent: string;
  primaryQuery: string;
  tags: string[];
  heroImage: string;
  sources: ArticleSource[];
  draft: boolean;
};
export type Article = ArticleFrontmatter & {
  body: string;
  html: string;
  readingMinutes: number;
  headings: Array<{ id: string; text: string }>;
};

const articles = generatedArticles as Article[];

export function getArticles() { return articles; }
export function getArticle(slug: string) { return articles.find((article) => article.slug === slug); }
export function getRelatedArticles(article: Article, limit = 2) {
  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((a, b) => {
      const aScore = Number(a.pillar === article.pillar) + a.tags.filter((tag) => article.tags.includes(tag)).length;
      const bScore = Number(b.pillar === article.pillar) + b.tags.filter((tag) => article.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}
