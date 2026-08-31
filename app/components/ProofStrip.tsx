import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../data/site";
import { ConversionLink } from "./ConversionLink";
import { ProofInvoice, ProofCalendarCheck, ProofClock, ProofSent } from "./AtelierIcons";

type Stat = {
  id: string;
  illustration: typeof ProofInvoice;
  label: string;
  /** Valeur numérique à compter de 0 jusqu'à cette cible. Absent = pas de count-up (ex: "45 → 12 j"). */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  /** Valeur affichée telle quelle si countTo est absent. */
  staticValue?: string;
};

const stats: Stat[] = [
  { id: "impayes", illustration: ProofInvoice, countTo: 12500, suffix: " €", label: "d'impayés récupérés en moins d'un mois" },
  { id: "delai", illustration: ProofCalendarCheck, staticValue: "45 → 12 j", label: "de délai de paiement moyen" },
  { id: "temps", illustration: ProofClock, countTo: 10, suffix: " h / mois", label: "rendues à l'équipe" },
  { id: "devis", illustration: ProofSent, staticValue: "Devis envoyé", label: "avant que le client ne compare ailleurs" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /** rootMargin réduit la zone de déclenchement au tiers central du viewport ; threshold exige que la moitié de la carte y soit déjà, pour que l'animation soit vue plutôt que déjà terminée. */
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } }, { rootMargin: "-20% 0px -20% 0px", threshold: 0.5 });
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

/** Comparaison avant/après pour le délai de paiement : deux barres, l'une pleine (avant), l'une réduite (après). */
function DelaiBars({ active }: { active: boolean }) {
  return (
    <div className={`proof-card__bars ${active ? "is-visible" : ""}`} aria-hidden="true">
      <div className="proof-card__bar-row">
        <span>Avant</span>
        <div className="proof-card__bar-track"><i className="proof-card__bar proof-card__bar--before" /></div>
      </div>
      <div className="proof-card__bar-row">
        <span>Avec Atelier</span>
        <div className="proof-card__bar-track"><i className="proof-card__bar proof-card__bar--after" /></div>
      </div>
    </div>
  );
}

function ProofCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, inView } = useInView<HTMLElement>();
  const Illustration = stat.illustration;
  return (
    <article
      className={`proof-card ${inView ? "is-visible" : ""}`}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
      ref={ref}
    >
      <Illustration className="proof-card__illustration" active={inView} />
      <strong>{stat.countTo !== undefined ? <CountUp to={stat.countTo} prefix={stat.prefix} suffix={stat.suffix} active={inView} /> : stat.staticValue}</strong>
      <span>{stat.label}</span>
      {stat.id === "delai" && <DelaiBars active={inView} />}
    </article>
  );
}

export function ProofStrip({ onWhatsAppClick }: { onWhatsAppClick?: () => void } = {}) {
  return (
    <section className="proof-band" aria-label="Résultats clients mesurés">
      <p className="eyebrow">Mesuré chez les entreprises accompagnées</p>
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
