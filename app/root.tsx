import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
} from "react-router";
import stylesheet from "./styles.css?url";

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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
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
