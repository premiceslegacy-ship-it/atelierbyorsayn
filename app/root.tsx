import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  type LinksFunction,
} from "react-router";
import { useEffect, useRef } from "react";
import stylesheet from "./styles.css?url";
import { META_PIXEL_ID } from "./data/site";
import { trackMetaEvent } from "./lib/metaPixel";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", type: "image/png", href: "/icon_meta.png" },
  { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
  { rel: "alternate", type: "application/rss+xml", title: "Le journal Atelier", href: "/rss.xml" },
  { rel: "preload", href: "/fonts/geist-variable.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function usePixelPageView() {
  const location = useLocation();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      let activated = false;
      const activate = () => {
        if (activated) return;
        activated = true;
        trackMetaEvent("PageView");
        cleanup();
      };
      const cleanup = () => {
        window.clearTimeout(fallbackTimer);
        window.removeEventListener("pointerdown", activate);
        window.removeEventListener("keydown", activate);
        window.removeEventListener("scroll", activate);
      };
      const fallbackTimer = window.setTimeout(activate, 15_000);
      window.addEventListener("pointerdown", activate, { once: true, passive: true });
      window.addEventListener("keydown", activate, { once: true });
      window.addEventListener("scroll", activate, { once: true, passive: true });
      return cleanup;
    }
    trackMetaEvent("PageView");
  }, [location.pathname]);
}

export default function App() {
  usePixelPageView();
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <main className="error-page">
      <p className="eyebrow">Atelier</p>
      <h1>Cette page n'existe pas.</h1>
      <a className="button button--primary" href="/">Revenir à l'accueil</a>
    </main>
  );
}
