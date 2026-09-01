/**
 * Toutes les captures passent par la base Notion "Website Leads Atelier".
 * "Source" distingue le canal (Ads, Organique, Home, Autre) ; "Offre" distingue
 * ce qui a motivé le clic (Clé en main, abonnement, page métier, blog, home).
 * Les deux ensemble qualifient la valeur du lead sans jamais isoler une base à part.
 */
export type LeadFormConfig = {
  /** Toujours "general" : conservé pour compat avec le payload envoyé au serveur. */
  key: "general";
  /** Valeur écrite dans la propriété "Source" de la base Notion (le canal). */
  source: string;
  /** Valeur écrite dans la propriété "Offre" de la base Notion (l'intention). */
  offer: string;
  /**
   * Métier pré-sélectionné dans le champ "Métier".
   * Sur une page métier, on connaît déjà le métier ; sur la home, on laisse vide.
   */
  defaultMetier?: string;
  /** Affiche le champ "Métaux travaillés" (pertinent pour tôlier/métallier). */
  showMetaux?: boolean;
};

/**
 * Métiers du site, tels qu'affichés dans le champ "Métier" de la base générale.
 * Inclut les sous-métiers métallerie (ex-base Ads dédiée, désormais fusionnée ici).
 * L'ordre et les libellés doivent correspondre aux options de la base Notion.
 */
export const SITE_METIERS = [
  "Électricien",
  "Plombier / CVC",
  "Menuisier",
  "Peintre / Plâtrier",
  "Tôlier / Métallier",
  "Paysagiste",
  "Maçon / Rénovation",
  "Couvreur / Zingueur",
  "Charpentier bois",
  "Carreleur / Mosaïste",
  "Tôlerie",
  "Chaudronnerie",
  "Métallerie sur mesure",
  "Serrurerie",
  "Autre",
] as const;

/** Douleurs BTP transversales proposées en qualification (multi-select). */
export const BTP_DOULEURS = [
  "Mes devis partent trop tard",
  "Je cours après mes impayés",
  "Je ne sais pas si mes chantiers sont rentables",
  "Je passe mes soirées sur l'administratif",
  "Je perds du temps à tout recalculer à la main",
] as const;

const resolveDefaultMetier = (metierLabel: string) =>
  SITE_METIERS.includes(metierLabel as (typeof SITE_METIERS)[number]) ? metierLabel : "Autre";

/** Config de capture pour une page métier : source Organique, Offre "Page métier", métier pré-sélectionné. */
export function getMetierLeadConfig(slug: string, metierLabel: string): LeadFormConfig {
  return {
    key: "general",
    source: "Organique",
    offer: "Page métier",
    defaultMetier: resolveDefaultMetier(metierLabel),
    showMetaux: slug === "tolier",
  };
}

/** Config de capture pour la home : Offre "Home", aucun métier pré-sélectionné. */
export const HOME_LEAD_CONFIG: LeadFormConfig = {
  key: "general",
  source: "Organique",
  offer: "Home",
};

/** Config de capture pour l'offre clé en main (setup 3000€) : Offre dédiée pour isoler ces leads à forte valeur. */
export const SETUP_LEAD_CONFIG: LeadFormConfig = {
  key: "general",
  source: "Organique",
  offer: "Clé en main (3 000 €)",
};

/** Variante de SETUP_LEAD_CONFIG avec le métier pré-sélectionné, pour une page métier. */
export function getSetupLeadConfig(metierLabel: string): LeadFormConfig {
  return {
    ...SETUP_LEAD_CONFIG,
    defaultMetier: resolveDefaultMetier(metierLabel),
  };
}
