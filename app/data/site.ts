export const SITE_URL = "https://www.atelier-btp.fr";
export const WHATSAPP_NUMBER = "33651664068";
export const META_PIXEL_ID = "1032268456078970";
export const AUTHOR = {
  name: "Samuel Mbeboura",
  url: "https://fr.linkedin.com/in/samuel-mbeboura-b28796293",
};

export type PricingTier = {
  id: "starter" | "pro" | "expert";
  name: string;
  price: number;
  promise: string;
  audience: string;
  featured?: boolean;
  benefits: string[];
  quotas: string[];
  adoptedBy: number;
};

export const SETUP_PRICES = {
  withoutSubscription: 3000,
  withSubscription: 1500,
} as const;

/** Nombre d'artisans ayant choisi chaque modèle de setup, pour la réassurance social proof sur le pricing. */
export const SETUP_ADOPTION = {
  withSubscription: 14,
  withoutSubscription: 9,
} as const;

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "pro",
    name: "Pro",
    price: 79,
    promise: "Une secrétaire IA qui répond à votre place.",
    audience: "Pour l'artisan actif et les petites équipes.",
    featured: true,
    benefits: [
      "Sarah, l'assistante IA, répond sur vos clients, chantiers et planning",
      "Vous pouvez lui parler à la voix, y compris en direct au téléphone",
      "Quotas de devis et relances nettement plus élevés qu'en Starter",
    ],
    quotas: ["120 échanges avec l'assistante IA / mois", "60 analyses de devis (dont pré-métré sur plan) / mois", "60 minutes de conversation vocale en direct / mois"],
    adoptedBy: 7,
  },
  {
    id: "expert",
    name: "Expert",
    price: 169,
    promise: "Plus aucune limite sur l'IA, à mesure que vous grandissez.",
    audience: "Pour les équipes qui veulent piloter sans angle mort.",
    benefits: [
      "Devis, relances et analyses par IA sans quota mensuel",
      "Conversation vocale en direct avec l'assistante : 5x plus de minutes qu'en Pro",
      "Pensé pour une équipe qui utilise l'IA tous les jours, sans surveiller un compteur",
    ],
    quotas: ["Échanges et analyses de devis illimités", "300 minutes de conversation vocale en direct / mois", "Extraction catalogue et imports illimités"],
    adoptedBy: 2,
  },
  {
    id: "starter",
    name: "Starter",
    price: 39,
    promise: "Les bons automatismes, sans complexité.",
    audience: "Pour l'artisan solo qui veut souffler vite.",
    benefits: [
      "Devis préparés par IA à partir d'un texte, d'un plan ou d'une photo",
      "Relances d'impayés rédigées et envoyées automatiquement",
      "Application métier complète : chantiers, planning, factures, marge",
    ],
    quotas: ["20 relances automatiques / mois", "15 analyses de devis (dont pré-métré sur plan) / mois", "Pas d'assistante IA conversationnelle (Sarah)"],
    adoptedBy: 5,
  },
];

export function buildWhatsAppUrl(tier?: PricingTier) {
  const details = tier
    ? `\n\nOffre envisagée : ${tier.name}, setup ${SETUP_PRICES.withSubscription.toLocaleString("fr-FR")} € HT (app à vie) + ${tier.price} € HT/mois d'abonnement`
    : "";
  const message = `Bonjour Samuel, je suis intéressé par Atelier pour mon entreprise.${details}\n\nOn peut en parler ?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTradeWhatsAppUrl(tradeLabel: string, tier?: PricingTier, hook?: string) {
  const details = tier
    ? ` L'offre ${tier.name} m'intéresse : setup ${SETUP_PRICES.withSubscription.toLocaleString("fr-FR")} € HT (app à vie) + ${tier.price} € HT/mois d'abonnement.`
    : "";
  const message = hook
    ? `${hook}${details}`
    : `Bonjour Samuel, je suis ${tradeLabel} et je suis intéressé par ce qu'Atelier peut m'apporter.${details}\n\nOn peut en parler ?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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

export const FAQ_ITEMS = [
  {
    question: "Est-ce que Sarah envoie des documents sans mon accord ?",
    answer: "Non. Sarah prépare, explique et propose. Un devis, une relance ou une action sensible reste soumis à votre validation avant envoi.",
  },
  {
    question: "Combien de temps faut-il pour démarrer ?",
    answer: "Comptez en moyenne 48 heures après l'appel de démarrage. Votre environnement, votre catalogue et vos premiers automatismes sont configurés avec vous.",
  },
  {
    question: "Atelier fonctionne-t-il sur téléphone ?",
    answer: "Oui. Atelier fonctionne dans le navigateur sur téléphone, tablette et ordinateur, sans logiciel lourd à installer.",
  },
  {
    question: "Le setup, c'est quoi exactement ?",
    answer: `C'est un paiement unique qui vous donne l'application à vie. Sans abonnement, le setup est de ${SETUP_PRICES.withoutSubscription.toLocaleString("fr-FR")} € HT : l'application métier reste complète et l'IA est mise en veille. Avec abonnement, le setup est de ${SETUP_PRICES.withSubscription.toLocaleString("fr-FR")} € HT, et l'abonnement mensuel s'ajoute pour que Sarah (l'IA) travaille avec vous.`,
  },
  {
    question: "La facturation électronique est-elle prise en compte ?",
    answer: "Atelier prépare les formats et les flux nécessaires. La connexion réglementaire est facultative et proposée séparément, à partir de 450 € HT la première année puis 250 € HT/an, selon le volume.",
  },
];
