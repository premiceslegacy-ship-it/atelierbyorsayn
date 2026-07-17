import { Link, type MetaFunction } from "react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "../components/Shell";
import { StructuredData } from "../components/StructuredData";
import { getArticles } from "../lib/articles";
import { SITE_URL } from "../data/site";

export const meta: MetaFunction = () => [
  { title: "Le journal Atelier : Gestion, marge et IA pour artisans du BTP" },
  { name: "description", content: "Guides de terrain sur la facturation, la marge chantier, la trésorerie et l'IA métier pour les artisans du BTP." },
  { name: "robots", content: "index, follow" },
  { property: "og:title", content: "Le journal Atelier" },
  { property: "og:type", content: "website" },
  { property: "og:url", content: `${SITE_URL}/blog` },
  { tagName: "link", rel: "canonical", href: `${SITE_URL}/blog` },
];

export default function BlogRoute() {
  const articles = getArticles();
  return (
    <SiteShell>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Le journal Atelier", url: `${SITE_URL}/blog` }} />
      <main className="blog-page">
        <header className="blog-hero">
          <p className="eyebrow">Le journal Atelier</p>
          <h1>Des réponses de terrain.<br /><em>Pour mieux décider.</em></h1>
          <p>Facturation, marge, trésorerie et IA métier expliquées avec des phrases de terrain, des sources et des limites claires.</p>
        </header>
        <div className="article-grid article-grid--blog">
          {articles.map((article, index) => (
            <Link className={`article-card ${index === 0 ? "article-card--featured" : ""}`} to={`/blog/${article.slug}`} key={article.slug}>
              <picture><source srcSet={article.heroImage.replace(".webp", ".avif")} type="image/avif" /><img src={article.heroImage} alt="" width="1200" height="750" /></picture>
              <div>
                <p className="eyebrow">{article.pillar}</p>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span>{article.readingMinutes} min de lecture <ArrowRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
