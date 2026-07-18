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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
          }}
        />
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
      return;
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
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
