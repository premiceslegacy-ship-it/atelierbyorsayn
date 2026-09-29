import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, MessageCircle, MousePointerClick } from "lucide-react";
import { buildWhatsAppUrl } from "../data/site";
import { ConversionLink } from "./ConversionLink";
import { ProofInvoicesVisual } from "./proof/ProofInvoicesVisual";
import { ProofCalendarVisual } from "./proof/ProofCalendarVisual";
import { ProofTimeVisual } from "./proof/ProofTimeVisual";
import { ProofQuoteVisual } from "./proof/ProofQuoteVisual";

type Stat = {
  id: string;
  visual: (props: { active: boolean }) => ReactNode;
  /** Valeur mise en avant (grand chiffre). */
  label: string;
  description: string;
  /** Valeur numérique à compter de 0 jusqu'à cette cible. Absent = pas de count-up (ex: "45 → 12 j"). */
  countTo?: number;
  suffix?: string;
  /** Valeur affichée telle quelle si countTo est absent. */
  staticValue?: string;
  featured?: boolean;
  /** Invitation à interagir, affichée sous le visuel. */
  hint: string;
};

const stats: Stat[] = [
  { id: "impayes", visual: ProofInvoicesVisual, countTo: 12500, suffix: " €", featured: true, hint: "Touchez une facture pour la marquer payée", label: "d'impayés récupérés en moins d'un mois", description: "Sarah relance à J+3 puis J+7, sur le bon ton. Vous validez, l'argent rentre." },
  { id: "delai", visual: ProofCalendarVisual, staticValue: "45 → 12 j", hint: "Touchez un événement, ou masquez un scénario", label: "de délai de paiement moyen", description: "Facture envoyée le jour J, relancée sans y penser, payée en 12 jours au lieu de 45." },
  { id: "temps", visual: ProofTimeVisual, countTo: 10, suffix: " h / mois", hint: "Touchez une tâche pour comparer le temps", label: "rendues à l'équipe", description: "Devis, relances, acomptes : préparés pendant que vous êtes sur le chantier." },
  { id: "devis", visual: ProofQuoteVisual, staticValue: "Devis envoyé", hint: "Envoyez le devis, puis signez-le comme le client", label: "avant que le client ne compare ailleurs", description: "Le devis part le soir même, en PDF conforme, signable en ligne." },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /** rootMargin réduit la zone de déclenchement au tiers central du viewport ; threshold exige que 30 % de la carte y soit déjà, pour que l'animation soit vue plutôt que déjà terminée. */
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } }, { rootMargin: "-20% 0px -20% 0px", threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({ to, prefix = "", suffix = "", active }: { to: number; prefix?: string; suffix?: string; active: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { if (active) setValue(to); return; }
    const duration = 1100;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, to]);
  return <>{prefix}{value.toLocaleString("fr-FR")}{suffix}</>;
}

function ProofCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, inView } = useInView<HTMLElement>();
  const Visual = stat.visual;
  return (
    <article
      className={`proof-card ${stat.featured ? "proof-card--featured" : ""} ${inView ? "is-visible" : ""}`}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
      ref={ref}
    >
      <div className="proof-card__visual">
        <Visual active={inView} />
        <p className="pf-hint"><MousePointerClick aria-hidden="true" />{stat.hint}</p>
      </div>
      <div className="proof-card__body">
        <strong>{stat.countTo !== undefined ? <CountUp to={stat.countTo} suffix={stat.suffix} active={inView} /> : stat.staticValue}</strong>
        <span className="proof-card__label">{stat.label}</span>
        <p>{stat.description}</p>
      </div>
    </article>
  );
}

export function ProofStrip({ onWhatsAppClick }: { onWhatsAppClick?: () => void } = {}) {
  return (
    <section className="proof-band" aria-label="Résultats clients mesurés">
      <div className="proof-band__heading">
        <p className="eyebrow">Mesuré chez les entreprises accompagnées</p>
        <h2>Ce qui change dès le premier mois.</h2>
        <p>Des factures payées plus vite, des devis envoyés plus tôt, des soirées rendues à l'équipe. Voici à quoi ça ressemble dans Atelier.</p>
      </div>
      <div className="proof-band__grid">
        {stats.map((stat, index) => <ProofCard stat={stat} index={index} key={stat.id} />)}
      </div>
      <div className="proof-band__actions">
        <Link className="button button--primary" to="#tarifs">Retrouver mes soirées <ArrowRight aria-hidden="true" /></Link>
        {onWhatsAppClick ? (
          <button type="button" className="button button--dark" onClick={onWhatsAppClick}>
            <MessageCircle aria-hidden="true" /> Rejoindre ces artisans
          </button>
        ) : (
          <ConversionLink className="button button--dark" href={buildWhatsAppUrl(undefined, "proof-band")} source="proof-band" target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> Rejoindre ces artisans
          </ConversionLink>
        )}
      </div>
    </section>
  );
}
