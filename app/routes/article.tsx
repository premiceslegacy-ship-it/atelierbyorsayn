import { data, Link, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { SiteShell } from "../components/Shell";
import { StructuredData } from "../components/StructuredData";
import { getArticle, getRelatedArticles } from "../lib/articles";
import { buildWhatsAppUrl, SITE_URL } from "../data/site";
import { ConversionLink } from "../components/ConversionLink";

export function loader({ params }: LoaderFunctionArgs) {
  const article = getArticle(params.slug ?? "");
  if (!article) throw data("Article introuvable", { status: 404 });
  return { article, related: getRelatedArticles(article) };
}

export const meta: MetaFunction<typeof loader> = ({ data: routeData }) => {
  if (!routeData) return [{ title: "Article introuvable · Atelier" }];
  const { article } = routeData;
  const url = `${SITE_URL}/blog/${article.slug}`;
  return [
    { title: `${article.title} · Atelier` },
    { name: "description", content: article.description },
    { name: "author", content: article.author },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "article" },
    { property: "og:title", content: article.title },
    { property: "og:description", content: article.description },
    { property: "og:url", content: url },
    { property: "og:image", content: `${SITE_URL}${article.heroImage}` },
    { property: "article:published_time", content: article.publishedAt },
    ...(article.updatedAt ? [{ property: "article:modified_time", content: article.updatedAt }] : []),
    { name: "twitter:card", content: "summary_large_image" },
    { tagName: "link", rel: "canonical", href: url },
  ];
};

export default function ArticleRoute() {
  const { article, related } = useLoaderData<typeof loader>();
  const published = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${article.publishedAt}T12:00:00`));
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: [`${SITE_URL}${article.heroImage}`],
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: { "@type": "Person", name: article.author, url: article.authorUrl },
    publisher: { "@type": "Organization", name: "Orsayn", url: "https://orsayn.fr" },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
    inLanguage: "fr-FR",
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Le journal", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/blog/${article.slug}` },
    ],
  };
  return (
    <SiteShell>
      <StructuredData data={[schema, breadcrumbs]} />
      <main className="article-page">
        <header className="article-hero">
          <Link to="/blog" className="back-link"><ArrowLeft /> Le journal</Link>
          <p className="eyebrow">{article.pillar}</p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.description}</p>
          <div className="article-meta">
            <span>Par <a href={article.authorUrl} target="_blank" rel="noreferrer">{article.author}</a></span>
            <span>{published}</span>
            {article.updatedAt && <span>Mis à jour le {article.updatedAt}</span>}
            <span><Clock /> {article.readingMinutes} min</span>
          </div>
          <picture><source srcSet={article.heroImage.replace(".webp", ".avif")} type="image/avif" /><img src={article.heroImage} alt="" width="1200" height="750" fetchPriority="high" /></picture>
        </header>
        <div className="article-layout">
          <aside className="article-toc">
            <p>Dans cet article</p>
            {article.headings.map((heading) => <a key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}
          </aside>
          <article className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
        <section className="article-sources">
          <h2>Sources</h2>
          <ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} target={source.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{source.title}</a></li>)}</ol>
        </section>
        <section className="article-cta">
          <p className="eyebrow">Votre cas est toujours plus précis qu'un article</p>
          <h2>Expliquez-le à Samuel en deux messages.</h2>
          <ConversionLink className="button button--primary" href={buildWhatsAppUrl(`l'article « ${article.title} »`)} source={`article-${article.slug}`} target="_blank" rel="noreferrer">
            Récupérer du temps <ArrowRight />
          </ConversionLink>
        </section>
        {related.length > 0 && <section className="related"><p className="eyebrow">Continuer</p><div>{related.map((item) => <Link key={item.slug} to={`/blog/${item.slug}`}>{item.title}<ArrowRight /></Link>)}</div></section>}
      </main>
    </SiteShell>
  );
}
