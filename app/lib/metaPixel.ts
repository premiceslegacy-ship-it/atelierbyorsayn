import { META_PIXEL_ID } from "../data/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

/** Installe la file Meta puis charge le SDK asynchrone au premier besoin réel. */
export function loadMetaPixel() {
  if (typeof window === "undefined" || window.fbq) return;

  /* eslint-disable */
  (function (f: Window, b: Document, e: string, v: string, n: any, t: any, s: any) {
    if (f.fbq) return;
    n = f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js", undefined, undefined, undefined);
  /* eslint-enable */

  window.fbq!("init", META_PIXEL_ID);
}

/** Garantit que les conversions sont mises en file même avant le chargement du SDK. */
export function trackMetaEvent(eventName: "PageView" | "Contact" | "Lead") {
  loadMetaPixel();
  window.fbq?.("track", eventName);
}
