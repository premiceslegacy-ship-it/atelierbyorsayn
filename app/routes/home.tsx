import type { MetaFunction } from "react-router";
import HomePage from "../components/HomePage";
import { SiteShell } from "../components/Shell";
import { StructuredData } from "../components/StructuredData";
import { FAQ_ITEMS, PRICING_TIERS, SETUP_PRICES, SITE_URL } from "../data/site";

export const meta: MetaFunction = () => [
  { title: "Atelier : L'assistante de gestion des artisans du BTP" },
  { name: "description", content: "Sarah prépare vos devis, relance les impayés et suit la marge de vos chantiers. Atelier est l'assistante de gestion conçue pour les artisans du BTP." },
  { name: "robots", content: "index, follow" },
  { property: "og:title", content: "Atelier : Une secrétaire métier dans votre poche" },
  { property: "og:description", content: "Devis, relances, marge et planning. Sarah travaille, vous décidez." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: `${SITE_URL}/` },
  { property: "og:image", content: `${SITE_URL}/images/hero-atelier.webp` },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: `${SITE_URL}/` },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Orsayn",
    url: "https://orsayn.fr",
    founder: { "@type": "Person", name: "Samuel Mbeboura" },
    brand: { "@type": "Brand", name: "Atelier" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atelier",
    url: SITE_URL,
    inLanguage: "fr-FR",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Atelier",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Application de gestion et assistante IA métier pour artisans du BTP.",
    provider: { "@type": "Organization", name: "Orsayn" },
    offers: {
      "@type": "OfferCatalog",
      name: "Offres Atelier",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Application sans abonnement",
          price: SETUP_PRICES.withoutSubscription,
          priceCurrency: "EUR",
          description: "Setup de l'application complète avec IA en veille.",
        },
        ...PRICING_TIERS.map((tier) => ({
          "@type": "Offer",
          name: `Atelier ${tier.name}`,
          price: tier.price,
          priceCurrency: "EUR",
          priceSpecification: { "@type": "UnitPriceSpecification", price: tier.price, priceCurrency: "EUR", unitText: "mois" },
        })),
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export default function HomeRoute() {
  return <SiteShell darkHeader><StructuredData data={schemas} /><HomePage /></SiteShell>;
}
