import { useState } from "react";
import { data, Link, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { ArrowRight, ChevronDown, ChevronRight, FileText, MessageCircle, RefreshCw, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { getMetierBySlug } from "@legacy/data/metiers";
import { SiteShell } from "../components/Shell";
import { StructuredData } from "../components/StructuredData";
import { CaseCarousel } from "../components/CaseCarousel";
import { ProofStrip } from "../components/ProofStrip";
import { buildTradeWhatsAppUrl, CASE_STUDIES, SITE_URL } from "../data/site";
import { Pricing } from "../components/Pricing";
import { LeadCaptureModal } from "../components/LeadCaptureModal";
import { getMetierLeadConfig } from "../data/leadForms";

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

const featureIcons = [FileText, Sparkles, TrendingUp];

export default function MetierRoute() {
  const { metier } = useLoaderData<typeof loader>();
  const { primaryMetric, highlight, latest } = metier.heroMockup;
  const leadConfig = getMetierLeadConfig(metier.slug, metier.metier);
  const [leadModalSource, setLeadModalSource] = useState<string | null>(null);
  const whatsappUrl = buildTradeWhatsAppUrl(metier.whatsapp, undefined, metier.whatsappHook);

  const whatsAppCta = (source: string, className: string, children: React.ReactNode) => (
    <button type="button" className={className} onClick={() => setLeadModalSource(source)}>
      {children}
    </button>
  );
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
    <SiteShell onWhatsAppClick={() => setLeadModalSource("navbar")}>
      <StructuredData data={schema} />
      <main className="trade-page">
        <nav className="breadcrumbs breadcrumbs--trade" aria-label="Fil d'Ariane">
          <ol>
            <li><Link to="/">Accueil</Link></li>
            <li><ChevronRight aria-hidden="true" /><span aria-current="page">{metier.metier}</span></li>
          </ol>
        </nav>
        <section className="trade-hero">
          <div className="trade-hero__copy">
            <p className="eyebrow">Logiciel de gestion & suivi de chantier · {metier.metier}</p>
            <h1>{metier.hero.headline}</h1>
            <p>{metier.hero.subheadline.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
            <div className="hero__actions">
              <Link className="button button--primary" to="#tarifs">{metier.hero.ctaPrimary} <ArrowRight /></Link>
              {whatsAppCta(`metier-${metier.slug}`, "button button--dark", <><MessageCircle /> Voir Atelier en action</>)}
            </div>
            <div className="trade-hero__proof">
              <div className="avatar-stack">
                {CASE_STUDIES.slice(0, 4).map((item) => <img key={item.id} src={item.portrait} alt="" width="48" height="48" />)}
              </div>
              <p><strong>Des artisans du bâtiment, comme vous.</strong><span>Temps, encours et marge mesurés sur le terrain.</span></p>
            </div>
          </div>
          <div className="trade-visual">
            <div className="trade-visual__glow" aria-hidden="true" />
            <div className="trade-app">
              <div className="trade-app__bar">
                <img src="/logo-atelier-blanc.png" alt="Atelier" width="706" height="80" />
                <span className="trade-app__status"><i /> {metier.metier}</span>
              </div>
              <div className="trade-app__body">
                <div className="trade-app__metric">
                  <p>{primaryMetric.label} <em>{primaryMetric.status}</em></p>
                  <strong>{primaryMetric.value}</strong>
                  <div className="progress progress--light"><span style={{ width: primaryMetric.progress }} /></div>
                  <div className="trade-app__meta"><small>{primaryMetric.detail}</small><small>{primaryMetric.target}</small></div>
                </div>
                <div className="trade-app__highlight"><Sparkles /><span><b>{highlight.label}</b>{highlight.detail}</span><i>{highlight.badge}</i></div>
              </div>
            </div>
            <div className="trade-float">
              <span>{latest.label} · {latest.time}</span>
              <strong>{latest.reference} · {latest.amount}</strong>
              <small>{latest.detail}</small>
            </div>
          </div>
        </section>

        <ProofStrip onWhatsAppClick={() => setLeadModalSource("proof-band")} />

        <section className="section trade-problems">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Le quotidien réel</p><h2>{metier.problems.title}</h2></div>
            <p>Si vous vous reconnaissez dans deux de ces situations, Atelier a été construit pour vous.</p>
          </div>
          <div className="problem-grid">{metier.problems.items.map((item, index) => <article key={item}><span className="problem-num">{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div>
          <div className="section-cta">
            <p><strong>Ce quotidien n'est pas une fatalité.</strong> Dans un mois, vos soirées peuvent ressembler à autre chose : des devis qui partent le jour même, des relances qui tournent sans vous.</p>
            <div>
              <Link className="button button--primary" to="#tarifs">Arrêter les recalculs <ArrowRight aria-hidden="true" /></Link>
              {whatsAppCta(`metier-problems-${metier.slug}`, "button button--dark", <><MessageCircle aria-hidden="true" /> Changer ce quotidien</>)}
            </div>
          </div>
        </section>

        <section className="section trade-features">
          <div className="section-heading section-heading--split"><div><p className="eyebrow">Dans Atelier</p><h2>{metier.features.title}</h2></div><p>Trois automatismes concrets, adaptés à votre métier dès votre démarrage.<br />Pas une liste de fonctionnalités.</p></div>
          <div className="feature-list">{metier.features.items.map((item, index) => {
            const Icon = featureIcons[index] ?? Sparkles;
            return <article key={item.titre}><div><Icon /></div><h3>{item.titre}</h3><p>{item.description}</p></article>;
          })}</div>
          <div className="section-cta">
            <p><strong>C'est exactement ce que fait Atelier pour {metier.metier.toLowerCase()}.</strong><br />Votre catalogue et vos prix restent au cœur de chaque proposition.</p>
            <div>
              <Link className="button button--dark" to="#tarifs">Retrouver mes soirées <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <Pricing tradeLabel={metier.whatsapp} whatsappHook={metier.whatsappHook} sourceSuffix={metier.slug} note={metier.pricingNote} />

        <CaseCarousel title={<>Des artisans qui ont<br />retrouvé leurs soirées.</>} />
        <div className="section belonging-cta">
          <div className="section-cta">
            <p><strong>Eux aussi hésitaient.</strong><br />Aujourd'hui ils ont retrouvé leurs soirées.<br />Rejoignez des artisans qui se sont rendu le temps.</p>
            <div>
              {whatsAppCta(`metier-cases-${metier.slug}`, "button button--primary", <><MessageCircle aria-hidden="true" /> Rejoindre ces artisans</>)}
              <Link className="button button--dark" to="#tarifs">Sécuriser ma marge <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>

        <section className="section trade-sarah">
          <div className="trade-sarah__portrait">
            <div className="sarah-orb"><img src="/sarah-avatar.webp" alt="Sarah, assistante IA Atelier" width="512" height="512" loading="lazy" /></div>
          </div>
          <div className="trade-sarah__copy">
            <p className="eyebrow">Sarah, votre assistante métier</p>
            <h2>Elle connaît vos clients, vos chantiers, vos prix.</h2>
            <p>Vous lui parlez comme à une secrétaire qui connaît la maison : elle prépare le devis, la relance ou le point chantier. Rien ne part sans votre validation.</p>
            <ul>
              <li><Sparkles />Propose l'action et explique pourquoi.</li>
              <li><RefreshCw />Apprend du contexte validé dans Atelier.</li>
              <li><ShieldCheck />Attend votre accord avant les actions sensibles.</li>
            </ul>
            <Link className="text-link" to="/#demo">Voir Sarah préparer un devis <ArrowRight /></Link>
          </div>
        </section>

        <section className="section trade-faq">
          <div className="section-heading"><p className="eyebrow">Questions {metier.metier.toLowerCase()}</p><h2>Les réponses franches, avant de démarrer.</h2></div>
          <div className="faq-list">{metier.faq.map((item) => <details key={item.question}><summary>{item.question}<ChevronDown /></summary><p>{item.answer}</p></details>)}</div>
        </section>

        <section className="trade-cta">
          <p className="eyebrow eyebrow--light">{metier.metier}</p>
          <h2>{metier.cta.headline}</h2>
          <p>{metier.cta.subline}</p>
          {whatsAppCta(`metier-closing-${metier.slug}`, "button button--primary", <>Récupérer mes soirées <ArrowRight /></>)}
          <small>Réponse directe de Samuel, sans engagement.</small>
        </section>
      </main>
      <LeadCaptureModal
        open={leadModalSource !== null}
        onClose={() => setLeadModalSource(null)}
        whatsappUrl={whatsappUrl}
        config={leadConfig}
        trackingSource={leadModalSource ? `metier-${leadModalSource}-${metier.slug}` : ""}
      />
    </SiteShell>
  );
}
