import type { AnchorHTMLAttributes, MouseEvent } from "react";

declare global {
  interface Window {
    atelierEvents?: Array<Record<string, string>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackConversion(event: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.atelierEvents = window.atelierEvents ?? [];
  window.atelierEvents.push({ type: "conversion", ...event });
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact");
  }
}

export function ConversionLink({
  source,
  tier,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { source: string; tier?: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackConversion({ source, page: window.location.pathname, tier: tier ?? "none" });
    onClick?.(event);
  };
  return <a {...props} onClick={handleClick} />;
}
