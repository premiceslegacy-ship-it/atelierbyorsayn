export const SITE_URL = "https://www.atelier-btp.fr";
export const APP_URL = "https://app.atelier-btp.fr";
export const WHATSAPP_NUMBER = "33651664068";
export const META_PIXEL_ID = "1032268456078970";
export const AUTHOR = {
  name: "Samuel Mbeboura",
  url: "https://fr.linkedin.com/in/samuel-mbeboura-b28796293",
};

export type PricingTier = {
  id: "pro" | "expert";
  name: string;
  price: number;
  promise: string;
  audience: string;
  featured?: boolean;
  badge?: string;
  trial?: boolean;
  benefits: string[];
  quotas: string[];
};

export const TRIAL_DAYS = 14;

/** Offre clé en main : configuration métier, reprise du catalogue, prise en main guidée et 14 jours de support prioritaire. */
export const SETUP_PRICE = 3000;

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "pro",
    name: "Pro",
    price: 69,
    promise: "Une secrétaire IA qui répond à votre place.",
    audience: "Pour l'artisan actif et les petites équipes.",
    trial: true,
    benefits: [
      "Sarah, l'assistante IA, répond sur vos clients, chantiers et planning",
      "Vous pouvez lui parler à la voix, y compris en direct au téléphone",
      "Devis préparés par IA à partir d'un texte, d'un plan ou d'une photo",
      "Facturation électronique incluse, conforme à la réforme 2026-2027",
    ],
    quotas: ["120 échanges avec l'assistante IA / mois", "60 analyses de devis (dont pré-métré sur plan) / mois", "60 minutes de conversation vocale en direct / mois"],
  },
  {
    id: "expert",
    name: "Expert",
    price: 169,
    promise: "Plus aucune limite sur l'IA, à mesure que vous grandissez.",
    audience: "Pour les équipes qui veulent piloter sans angle mort.",
    featured: true,
    badge: "Le choix des équipes qui grandissent",
    benefits: [
      "Devis, relances et analyses par IA sans quota mensuel",
      "Conversation vocale en direct avec l'assistante : 5x plus de minutes qu'en Pro",
      "Pensé pour une équipe qui utilise l'IA tous les jours, sans surveiller un compteur",
      "Facturation électronique incluse, conforme à la réforme 2026-2027",
    ],
    quotas: ["Échanges et analyses de devis illimités", "300 minutes de conversation vocale en direct / mois", "Extraction catalogue et imports illimités"],
  },
];

export type MaterialId = "fuel" | "drill" | "generator" | "saw" | "scaffold" | "tiles" | "compressor" | "trailer" | "excavator" | "van";

export type TradeSimulatorProfile = {
  title: string;
  lead: string;
  equivalentLabel: string;
  materialEquivalents: { id: MaterialId; price: number; label: string }[];
};

/** Repères de dépenses propres à chaque métier, affichés dans le simulateur de la page métier. */
export const TRADE_SIMULATOR_PROFILES: Record<string, TradeSimulatorProfile> = {
  electricien: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "drill", price: 750, label: "une sertisseuse électrique professionnelle" },
      { id: "saw", price: 450, label: "un coffret de mesure et de repérage" },
      { id: "fuel", price: 150, label: "un plein de camionnette pour vos chantiers" },
    ],
  },
  plombier: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "compressor", price: 900, label: "une sertisseuse multicouche professionnelle" },
      { id: "drill", price: 500, label: "un détecteur de fuite ou caméra d'inspection" },
      { id: "fuel", price: 150, label: "un plein de camionnette d'intervention" },
    ],
  },
  menuisier: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "saw", price: 850, label: "une défonceuse ou scie à onglet professionnelle" },
      { id: "drill", price: 500, label: "un lot de quincaillerie pour vos prochains ouvrages" },
      { id: "fuel", price: 150, label: "un plein pour vos livraisons et prises de cotes" },
    ],
  },
  peintre: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "compressor", price: 800, label: "un pistolet airless professionnel" },
      { id: "scaffold", price: 650, label: "un échafaudage roulant" },
      { id: "fuel", price: 150, label: "un plein pour vos tournées de chantier" },
    ],
  },
  tolier: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "saw", price: 900, label: "une meuleuse professionnelle" },
      { id: "compressor", price: 700, label: "une bouteille de gaz et un jeu de consommables" },
      { id: "drill", price: 350, label: "un coffret de perçage métal" },
    ],
  },
  paysagiste: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "trailer", price: 900, label: "une remorque de chantier équipée" },
      { id: "saw", price: 700, label: "une débroussailleuse professionnelle" },
      { id: "fuel", price: 150, label: "un plein pour vos tournées multi-sites" },
    ],
  },
  macon: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "excavator", price: 900, label: "une journée de location de mini-pelle" },
      { id: "scaffold", price: 650, label: "un échafaudage roulant de chantier" },
      { id: "fuel", price: 150, label: "un plein pour l'utilitaire et les livraisons" },
    ],
  },
  couvreur: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "scaffold", price: 900, label: "une journée de location d'échafaudage" },
      { id: "tiles", price: 750, label: "une palette de tuiles" },
      { id: "fuel", price: 150, label: "un plein pour vos déplacements de chantier" },
    ],
  },
  charpentier: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "saw", price: 900, label: "une scie à onglet professionnelle" },
      { id: "trailer", price: 800, label: "une livraison de bois de structure" },
      { id: "drill", price: 450, label: "un coffret de perçage et de levage" },
    ],
  },
  carreleur: {
    title: "Le coût d'un mois d'IA, comparé à votre matériel.",
    lead: "Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.",
    equivalentLabel: "Ce que j'ai perdu",
    materialEquivalents: [
      { id: "tiles", price: 900, label: "un lot de carrelage pour une salle de bain" },
      { id: "saw", price: 600, label: "une carrelette électrique professionnelle" },
      { id: "drill", price: 250, label: "un kit de préparation et de nivellement" },
    ],
  },
};

/** Accroche par section du site, injectée dans le message WhatsApp pour qualifier l'origine du contact. */
const SECTION_CONTEXT: Record<string, string> = {
  navbar: "je regardais votre site",
  "mobile-sticky": "je regardais votre site",
  hero: "je viens de voir votre page d'accueil",
  demo: "je viens de voir la démo de Sarah sur votre site",
  benefits: "je viens de voir ce qu'Atelier change au quotidien",
  "proof-band": "je viens de voir les résultats d'autres artisans sur votre site",
  cases: "je viens de voir les témoignages d'artisans qui utilisent Atelier",
  faq: "j'avais une question après avoir lu votre FAQ",
  closing: "je regardais votre site",
};

function sectionHook(source: string, tradeLabel?: string, articleTitle?: string) {
  if (source.startsWith("article-")) return articleTitle ? `je viens de lire votre article "${articleTitle}"` : "je viens de lire votre article de blog";
  if (source.endsWith("-done-for-you")) return "je regardais votre offre clé en main";
  if (source.startsWith("pricing")) return "je regardais vos tarifs";
  if (source.startsWith("metier-problems-")) return `je me reconnais dans le quotidien d'un ${tradeLabel ?? "artisan"} que vous décrivez`;
  if (source.startsWith("metier-cases-")) return "je viens de voir les témoignages d'artisans qui utilisent Atelier";
  if (source.startsWith("metier-closing-")) return "je regardais votre page";
  if (source.startsWith("metier-")) return "je viens de voir votre page";
  return SECTION_CONTEXT[source] ?? "je regardais votre site";
}

export function buildWhatsAppUrl(tier?: PricingTier, source = "site", articleTitle?: string) {
  const details = tier
    ? `\n\nOffre envisagée : ${tier.name}, ${tier.price} € HT/mois d'abonnement`
    : "";
  const message = `Bonjour Samuel, ${sectionHook(source, undefined, articleTitle)}, je suis intéressé par Atelier pour mon entreprise.${details}\n\nOn peut en parler ?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTradeWhatsAppUrl(tradeLabel: string, tier?: PricingTier, hook?: string, source = "metier") {
  const details = tier
    ? ` L'offre ${tier.name} m'intéresse : ${tier.price} € HT/mois d'abonnement.`
    : "";
  const message = hook
    ? `${hook}\n\nMétier : ${tradeLabel}.${details}`
    : `Bonjour Samuel, ${sectionHook(source, tradeLabel)}, je suis ${tradeLabel} et je suis intéressé par ce qu'Atelier peut m'apporter.${details}\n\nOn peut en parler ?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildPricingSignupUrl(tier: PricingTier["id"]) {
  const params = new URLSearchParams({ mode: "signup", intent: tier === "pro" ? "trial" : "none", preferred: tier, source: "atelier-lp" });
  return `${APP_URL}/login?${params.toString()}`;
}

export type CaseStudy = {
  id: string;
  name: string;
  trade: string;
  team: string;
  region: string;
  result: string;
  quote: string;
  portrait: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "stephane",
    name: "Stéphane M.",
    trade: "Menuisier & charpentier métallique",
    team: "4 salariés",
    region: "Rhône-Alpes",
    result: "12 500 € d'impayés récupérés",
    quote: "Avant Atelier, je passais mes dimanches après-midi à rédiger mes devis et je traînais plus de 12 500 € de factures impayées. En moins d'un mois, j'ai récupéré 100 % de mes retards grâce aux relances automatiques.",
    portrait: "/images/portraits/stephane.webp",
  },
  {
    id: "julien",
    name: "Julien R.",
    trade: "Électricien du bâtiment",
    team: "Indépendant",
    region: "Gironde",
    result: "Un devis généré en 1 minute",
    quote: "Dicter mes infos de chantier à la voix depuis mon camion et voir le devis généré en 1 minute, ça m'a retiré la boule au ventre du dimanche soir.",
    portrait: "/images/portraits/julien.webp",
  },
  {
    id: "sandrine",
    name: "Sandrine T.",
    trade: "Plâtrerie & rénovation intégrale",
    team: "7 salariés",
    region: "Occitanie",
    result: "+18 % de rentabilité nette",
    quote: "Grâce au suivi des marges en direct, notre rentabilité nette a bondi de 18 % en un semestre. Je sais enfin si un chantier tient la route avant la fin.",
    portrait: "/images/portraits/sandrine.webp",
  },
  {
    id: "marc",
    name: "Marc D.",
    trade: "Peintre en bâtiment",
    team: "2 salariés",
    region: "Bretagne",
    result: "Paiement moyen : 45 → 12 jours",
    quote: "Depuis que j'utilise Atelier, le délai de paiement moyen de mes clients est tombé de 45 à 12 jours. Je respire enfin côté trésorerie.",
    portrait: "/images/portraits/marc.webp",
  },
  {
    id: "karim",
    name: "Karim B.",
    trade: "Plombier-chauffagiste",
    team: "Indépendant",
    region: "Île-de-France",
    result: "Propositions en moins de 3 minutes",
    quote: "Avec le chiffrage guidé, je sors mes propositions en moins de 3 minutes. Je réponds avant les concurrents et je signe plus vite.",
    portrait: "/images/portraits/karim.webp",
  },
  {
    id: "sophie",
    name: "Sophie L.",
    trade: "Maçonnerie générale",
    team: "12 salariés",
    region: "Normandie",
    result: "10 heures gagnées par mois",
    quote: "Les rappels automatiques m'ont fait économiser 10 heures par mois, et notre encours client a chuté de 30 k€. C'est devenu beaucoup plus calme.",
    portrait: "/images/portraits/sophie.webp",
  },
  {
    id: "antoine",
    name: "Antoine V.",
    trade: "Couvreur-zingueur",
    team: "5 salariés",
    region: "Grand Est",
    result: "Temps administratif divisé par 3",
    quote: "J'ai divisé par 3 le temps administratif. Retrouver mes soirées tout en facturant 20 % de plus a changé mon quotidien.",
    portrait: "/images/portraits/antoine.webp",
  },
];

export type MarketStat = {
  id: string;
  icon: "clock" | "calendar" | "shield";
  value: string;
  problem: string;
  answer: string;
  source: string;
  accent?: boolean;
};

export const MARKET_STATS: MarketStat[] = [
  {
    id: "admin",
    icon: "clock",
    value: "2 h",
    problem: "perdues chaque jour sur le devis, la relance ou le pointage du soir.",
    answer: "Sarah les prépare pendant que vous êtes encore sur le chantier.",
    source: "Filière BTP",
  },
  {
    id: "delai",
    icon: "calendar",
    value: "46 j",
    problem: "de délai de paiement moyen quand personne ne relance à votre place.",
    answer: "Atelier relance tout seul, avant que ça devienne un trou de trésorerie.",
    source: "Filière BTP",
  },
  {
    id: "facturx",
    icon: "shield",
    value: "1er sept. 2026",
    problem: "le PDF envoyé par mail ne vaudra plus facture, pour tout le monde.",
    answer: "Vos factures sont déjà au bon format. Rien à changer ce jour-là.",
    source: "Loi de finances 2026, art. 123",
    accent: true,
  },
];

type MarketSource = {
  name: string;
  logo: string;
  width: number;
  height: number;
  variant?: string;
};

export const MARKET_SOURCES: MarketSource[] = [
  { name: "Gouvernement français", logo: "/images/logos/gouvernement.svg", width: 895, height: 455 },
  { name: "Insee", logo: "/images/logos/insee.svg", width: 253, height: 85 },
  { name: "FFB", logo: "/images/logos/ffb.png", width: 240, height: 196 },
  { name: "CAPEB", logo: "/images/logos/capeb.jpg", width: 200, height: 83 },
  { name: "Bpifrance", logo: "/images/logos/bpifrance.webp", width: 2000, height: 588, variant: "bpifrance" },
  { name: "Qualibat", logo: "/images/logos/qualibat.jpg", width: 380, height: 285, variant: "qualibat" },
  { name: "PRO BTP", logo: "/images/logos/pro-btp.png", width: 1385, height: 355, variant: "pro-btp" },
];

export const FAQ_ITEMS = [
  {
    question: "Est-ce que Sarah envoie des documents sans mon accord ?",
    answer: "Non. Sarah prépare, explique et propose. Un devis, une relance ou une action sensible reste soumis à votre validation avant envoi.",
  },
  {
    question: "Combien de temps faut-il pour démarrer ?",
    answer: "Avec l'essai, vous pouvez créer votre espace immédiatement et avancer à votre rythme. Avec l'offre clé en main, nous configurons votre métier, reprenons votre catalogue, vous montrons comment vous en servir en direct, puis restons prioritaires sur votre support pendant 14 jours.",
  },
  {
    question: "Atelier fonctionne-t-il sur téléphone ?",
    answer: "Oui. Atelier fonctionne dans le navigateur sur téléphone, tablette et ordinateur, sans logiciel lourd à installer.",
  },
  {
    question: "Setup ou abonnement, comment choisir ?",
    answer: `Deux façons de démarrer. À ${SETUP_PRICE.toLocaleString("fr-FR")} € HT, on s'occupe de tout : configuration métier, reprise du catalogue, prise en main guidée et 14 jours de support prioritaire, avec un accès sans abonnement mensuel. Pro à ${PRICING_TIERS[0].price} € HT/mois et Expert à ${PRICING_TIERS[1].price} € HT/mois vous permettent de démarrer vous-même. Pro est offert pendant ${TRIAL_DAYS} jours sans carte bancaire ; pour Expert, le checkout Stripe est généré après votre onboarding.`,
  },
  {
    question: "La facturation électronique est-elle prise en compte ?",
    answer: "Oui, et c'est inclus, sans surcoût, dans les deux offres. Chaque facture est déjà générée au format réglementaire Factur-X. À partir de septembre 2026, les entreprises devront pouvoir recevoir leurs factures fournisseurs par une plateforme agréée : Atelier s'en charge. L'obligation d'émettre électroniquement, elle, n'arrive qu'en septembre 2027 pour les artisans — vous choisissez d'être prêt dès maintenant ou d'attendre l'échéance.",
  },
];
