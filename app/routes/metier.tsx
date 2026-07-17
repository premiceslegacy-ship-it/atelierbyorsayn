import { data, Link, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { ArrowRight, Check, FileText, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { getMetierBySlug } from "@legacy/data/metiers";
import { SiteShell } from "../components/Shell";
import { StructuredData } from "../components/StructuredData";
import { buildWhatsAppUrl, SITE_URL } from "../data/site";
import { ConversionLink } from "../components/ConversionLink";

export function loader({ params, request }: LoaderFunctionArgs) {
  const slug = params.slug ?? new URL(request.url).pathname.split("/").filter(Boolean)[0] ?? "";
  const metier = getMetierBySlug(slug);
  if (!metier) throw data("Métier introuvable", { status: 404 });
  return { metier };
}

export const meta: MetaFunction<typeof loader> = ({ data: routeData }) => {
  if (!routeData) return [{ title: "Atelier pour les artisans du BTP" }];
  const { metier } = routeData;
  const url = `${SITE_URL}/${metier.slug}`;
  return [
    { title: metier.seo.title },
    { name: "description", content: metier.seo.description },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: metier.seo.title },
    { property: "og:description", content: metier.seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
  ];
};

export default function MetierRoute() {
  const { metier } = useLoaderData<typeof loader>();
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Atelier pour ${metier.metier}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: metier.seo.description,
      url: `${SITE_URL}/${metier.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: metier.metier, item: `${SITE_URL}/${metier.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: metier.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
    },
  ];
  return (
    <SiteShell>
      <StructuredData data={schema} />
      <main className="trade-page">
        <section className="trade-hero">
          <div>
            <p className="eyebrow">Atelier pour {metier.metier.toLowerCase()}</p>
            <h1>{metier.hero.headline}</h1>
            <p>{metier.hero.subheadline}</p>
            <div className="hero__actions">
              <ConversionLink className="button button--primary" href={buildWhatsAppUrl(`la page ${metier.metier}`)} source={`metier-${metier.slug}`} target="_blank" rel="noreferrer"><MessageCircle /> Récupérer du temps</ConversionLink>
              <Link className="button button--dark" to="/#demo">Voir la démo <ArrowRight /></Link>
            </div>
          </div>
          <div className="trade-dashboard">
            <div className="trade-dashboard__top"><span>Atelier</span><span>{metier.metier}</span></div>
            <p>{metier.heroMockup.primaryMetric.label}</p>
            <strong>{metier.heroMockup.primaryMetric.value}</strong>
            <div className="progress"><span style={{ width: metier.heroMockup.primaryMetric.progress }} /></div>
            <small>{metier.heroMockup.primaryMetric.detail}</small>
            <div className="trade-dashboard__card"><Sparkles /><span><b>{metier.heroMockup.highlight.label}</b>{metier.heroMockup.highlight.detail}</span></div>
          </div>
        </section>

        <section className="section trade-problems">
          <div className="section-heading section-heading--split"><div><p className="eyebrow">Le quotidien réel</p><h2>{metier.problems.title}</h2></div><p>Atelier part des frottements qui reviennent chaque semaine, pas d'une liste de fonctionnalités.</p></div>
          <div className="problem-grid">{metier.problems.items.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div>
        </section>

        <section className="section trade-features">
          <div className="section-heading"><p className="eyebrow">Dans Atelier</p><h2>{metier.features.title}</h2></div>
          <div className="feature-list">{metier.features.items.map((item, index) => <article key={item.titre}><div>{index === 0 ? <FileText /> : index === 1 ? <Sparkles /> : <TrendingUp />}</div><span>0{index + 1}</span><h3>{item.titre}</h3><p>{item.description}</p></article>)}</div>
        </section>

        <section className="section trade-faq"><div className="section-heading"><p className="eyebrow">Questions {metier.metier.toLowerCase()}</p><h2>Avant de démarrer.</h2></div><div className="faq-list">{metier.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>
        <section className="trade-cta"><p className="eyebrow eyebrow--light">{metier.metier}</p><h2>{metier.cta.headline}</h2><p>{metier.cta.subline}</p><ConversionLink className="button button--primary" href={buildWhatsAppUrl(`la page ${metier.metier}`)} source={`metier-closing-${metier.slug}`} target="_blank" rel="noreferrer">Vérifier si Atelier vous correspond <ArrowRight /></ConversionLink></section>
      </main>
    </SiteShell>
  );
}
