import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackMetaEvent } from "../lib/metaPixel";

declare global {
  interface Window {
    atelierEvents?: Array<Record<string, string>>;
  }
}

const AD_UTM_SOURCES = ["meta", "facebook", "fb", "instagram", "google", "ads", "adwords"];

/**
 * Un lead vient des ads si l'URL porte le clic-id d'une régie (fbclid, gclid) ou un
 * utm_source publicitaire connu. Lu une seule fois au premier rendu de la page d'atterrissage :
 * la navigation interne ne réécrit pas ces paramètres, donc le signal doit être capturé tôt.
 */
export function isAdsLanding(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has("fbclid") || params.has("gclid")) return true;
  const utmSource = params.get("utm_source")?.toLowerCase() ?? "";
  return AD_UTM_SOURCES.includes(utmSource);
}

export function trackConversion(event: Record<string, string>, options: { skipPixel?: boolean } = {}) {
  if (typeof window === "undefined") return;
  window.atelierEvents = window.atelierEvents ?? [];
  window.atelierEvents.push({ type: "conversion", ...event });
  if (!options.skipPixel) trackMetaEvent("Contact");
}

export function ConversionLink({
  source,
  tier,
  preserveUtm = false,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { source: string; tier?: string; preserveUtm?: boolean }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackConversion({ source, page: window.location.pathname, tier: tier ?? "none" });
    if (preserveUtm) {
      const destination = new URL(event.currentTarget.href);
      const current = new URLSearchParams(window.location.search);
      for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
        const value = current.get(key);
        if (value) destination.searchParams.set(key, value);
      }
      event.currentTarget.href = destination.toString();
    }
    onClick?.(event);
  };
  return <a {...props} onClick={handleClick} />;
}
