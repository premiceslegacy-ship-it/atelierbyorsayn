import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, CASE_STUDIES } from "../data/site";
import { ConversionLink } from "./ConversionLink";
import { Avatar } from "./Avatar";

/** "Stéphane M." -> "Stéphane" : on n'affiche que le prénom sur les proof-cards. */
function firstName(fullName: string) {
  return fullName.split(" ")[0];
}

type Stat = {
  caseId: string;
  label: string;
  /** Valeur numérique à compter de 0 jusqu'à cette cible. Absent = pas de count-up (ex: "45 → 12 j"). */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  /** Valeur affichée telle quelle si countTo est absent. */
  staticValue?: string;
  /** Variante de couleur de la carte, alignée sur la palette des bento-cards. */
  tone: "orange" | "green" | "indigo" | "dark";
};

const stats: Stat[] = [
  { caseId: "stephane", countTo: 12500, suffix: " €", label: "d'impayés récupérés en moins d'un mois", tone: "orange" },
  { caseId: "marc", staticValue: "45 → 12 j", label: "de délai de paiement moyen", tone: "indigo" },
  { caseId: "sophie", countTo: 10, suffix: " h / mois", label: "rendues à l'équipe", tone: "green" },
  { caseId: "sebastien", staticValue: "Devis envoyé", label: "avant que le client ne compare ailleurs", tone: "dark" },
];

/** Cas tôlerie/métallerie mis en avant sans portrait (pas de photo client disponible pour l'instant). */
const SEBASTIEN = {
  name: "Sébastien T.",
  trade: "Tôlerie / Métallerie",
  team: "14 salariés",
  region: "Montval-sur-Loire",
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } }, { threshold: 0.4 });
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
  const caseStudy = stat.caseId === "sebastien" ? null : CASE_STUDIES.find((item) => item.id === stat.caseId)!;
  const person = caseStudy ?? SEBASTIEN;
  return (
    <article
      className={`proof-card proof-card--${stat.tone} ${inView ? "is-visible" : ""}`}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
      ref={ref}
    >
      <strong>{stat.countTo !== undefined ? <CountUp to={stat.countTo} prefix={stat.prefix} suffix={stat.suffix} active={inView} /> : stat.staticValue}</strong>
      <span>{stat.label}</span>
      <footer>
        <b>{firstName(person.name)}</b>
        <small>{person.trade} · {person.team}</small>
      </footer>
    </article>
  );
}

export function ProofStrip({ onWhatsAppClick }: { onWhatsAppClick?: () => void } = {}) {
  return (
    <section className="proof-band" aria-label="Résultats clients mesurés">
      <div className="proof-band__intro">
        <div className="avatar-stack">
          {CASE_STUDIES.slice(0, 4).map((item) => <Avatar key={item.id} src={item.portrait} alt="" />)}
        </div>
        <p><strong>Mesuré chez les entreprises accompagnées.</strong></p>
      </div>
      <div className="proof-band__grid">
        {stats.map((stat, index) => <ProofCard stat={stat} index={index} key={stat.caseId} />)}
      </div>
      <div className="proof-band__cta">
        <p>
          <strong>Ils ont remis le bureau à sa place.</strong>
          <span>Des artisans comme vous, qui ont décidé de ne plus perdre leurs soirées.</span>
        </p>
        <div>
          {onWhatsAppClick ? (
            <button type="button" className="button button--primary" onClick={onWhatsAppClick}>
              <MessageCircle aria-hidden="true" /> Rejoindre ces artisans
            </button>
          ) : (
            <ConversionLink className="button button--primary" href={buildWhatsAppUrl(undefined, "proof-band")} source="proof-band" target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Rejoindre ces artisans
            </ConversionLink>
          )}
          <Link className="button button--dark" to="#tarifs">Retrouver mes soirées <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
