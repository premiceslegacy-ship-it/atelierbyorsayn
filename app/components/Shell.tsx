import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, MessageCircle, Play, X } from "lucide-react";
import { metiers } from "@legacy/data/metiers";
import { buildWhatsAppUrl } from "../data/site";
import { ConversionLink } from "./ConversionLink";

const links = [
  ["Ce que ça change", "/#benefices"],
  ["Sarah", "/#sarah"],
  ["Résultats", "/#resultats"],
  ["Tarifs", "/#tarifs"],
  ["Le journal", "/blog"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <header className="site-header">
      <nav className="capsule-nav" aria-label="Navigation principale">
        <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">Menu</span>
        </button>
        <div className="nav-links nav-links--left">
          {links.slice(0, 3).map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}
        </div>
        <Link className="wordmark wordmark--nav" to="/" aria-label="Atelier, accueil">
          <img src="/logo-atelier-blanc.png" alt="" width="706" height="80" />
        </Link>
        <div className="nav-links nav-links--right">
          {links.slice(3).map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}
        </div>
        <div className="nav-actions">
          <Link className="button button--ghost button--small" to="/#demo"><Play aria-hidden="true" /> Voir la démo</Link>
          <ConversionLink
            className="button button--primary button--small"
            href={buildWhatsAppUrl("la navigation")}
            source="navbar"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" /> Récupérer du temps
          </ConversionLink>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {links.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}
          <Link to="/#demo">Voir la démo</Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-grid">
        <div>
          <Link className="wordmark wordmark--footer" to="/" aria-label="Atelier, accueil">
            <img src="/logo-atelier-blanc.png" alt="" width="706" height="80" />
          </Link>
          <p>L'assistante de gestion pensée pour les artisans du BTP.</p>
        </div>
        <div>
          <p className="footer-label">Découvrir</p>
          <Link to="/#benefices">Ce que ça change</Link>
          <Link to="/#tarifs">Tarifs</Link>
          <Link to="/blog">Le journal</Link>
        </div>
        <div>
          <p className="footer-label">Métiers</p>
          {metiers.map((metier) => <Link key={metier.slug} to={`/${metier.slug}`}>{metier.metier}</Link>)}
        </div>
        <div>
          <p className="footer-label">Informations</p>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
          <Link to="/cgv">CGV</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Orsayn</span>
        <span>Conçu en France, pour le terrain.</span>
      </div>
    </footer>
  );
}

export function SiteShell({ children, darkHeader = false }: { children: React.ReactNode; darkHeader?: boolean }) {
  const location = useLocation();
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) {
      setShowMobileCta(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setShowMobileCta(!entry.isIntersecting), { threshold: 0.08 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className={darkHeader ? "site-shell site-shell--dark" : "site-shell"}>
      <Navbar />
      {children}
      <Footer />
      <ConversionLink
        className={`mobile-whatsapp ${showMobileCta ? "is-visible" : ""}`}
        href={buildWhatsAppUrl("le site")}
        source="mobile-sticky"
        target="_blank"
        rel="noreferrer"
        tabIndex={showMobileCta ? undefined : -1}
        aria-hidden={!showMobileCta}
      >
        <MessageCircle aria-hidden="true" /> Récupérer du temps
      </ConversionLink>
    </div>
  );
}
