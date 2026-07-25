/**
 * Configuration de la capture de leads par page.
 *
 * Chaque page qui capture des leads pointe vers une base Notion et une variante
 * de formulaire. Le token Notion reste côté serveur (api/lead.ts) : ici on ne
 * manipule que des identifiants de data source, pas de secret.
 *
 * Modèle d'extension : quand un métier passe en campagne Ads, on lui crée une
 * base Notion dédiée (comme "tolier-ads") et on ajoute une entrée dans
 * LEAD_FORM_CONFIGS pointant vers cette base — sans toucher au reste.
 */

export type LeadFormVariant = "metallerie" | "general";

export type LeadFormConfig = {
  /** Identifiant logique de la config, envoyé au serveur pour router vers la bonne base. */
  key: string;
  /** Variante de champs affichés dans le formulaire. */
  variant: LeadFormVariant;
  /** Valeur écrite dans la propriété "Source" de la base Notion. */
  source: string;
  /**
   * Métier pré-sélectionné dans le champ "Métier" (variante general).
   * Sur une page métier, on connaît déjà le métier ; sur la home, on laisse vide.
   */
  defaultMetier?: string;
};

/** Base "Leads Landing Métallerie" — campagne Ads tôlier, isolée du trafic organique. */
export const TOLIER_ADS_CONFIG: LeadFormConfig = {
  key: "tolier-ads",
  variant: "metallerie",
  source: "Ads Métallerie - prix matière",
};

/**
 * Métiers du site, tels qu'affichés dans le champ "Métier" de la base générale.
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

/**
 * Renvoie la config de capture pour un slug de page métier.
 * - tolier → base Ads dédiée (variante métallerie)
 * - autres métiers → base générale, métier pré-sélectionné
 */
export function getMetierLeadConfig(slug: string, metierLabel: string): LeadFormConfig {
  if (slug === "tolier") return TOLIER_ADS_CONFIG;
  return {
    key: "general",
    variant: "general",
    source: "Organique",
    defaultMetier: SITE_METIERS.includes(metierLabel as (typeof SITE_METIERS)[number]) ? metierLabel : "Autre",
  };
}

/** Config de capture pour la home : base générale, aucun métier pré-sélectionné. */
export const HOME_LEAD_CONFIG: LeadFormConfig = {
  key: "general",
  variant: "general",
  source: "Home",
};
