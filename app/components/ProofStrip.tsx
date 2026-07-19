import { Link } from "react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, CASE_STUDIES } from "../data/site";
import { ConversionLink } from "./ConversionLink";

const stats = [
  { value: "12 500 €", label: "d'impayés récupérés en moins d'un mois", caseId: "stephane" },
  { value: "45 → 12 j", label: "de délai de paiement moyen", caseId: "marc" },
  { value: "10 h / mois", label: "rendues à l'équipe", caseId: "sophie" },
  { value: "×3", label: "sur le temps administratif", caseId: "antoine" },
];

export function ProofStrip() {
  return (
    <section className="proof-band" aria-label="Résultats clients mesurés">
      <div className="proof-band__intro">
        <div className="avatar-stack">
          {CASE_STUDIES.slice(0, 4).map((item) => <img key={item.id} src={item.portrait} alt="" width="48" height="48" loading="lazy" />)}
        </div>
        <p><strong>Mesuré chez les entreprises accompagnées.</strong></p>
      </div>
      <div className="proof-band__grid">
        {stats.map((stat) => {
          const caseStudy = CASE_STUDIES.find((item) => item.id === stat.caseId)!;
          return (
            <article className="proof-card" key={stat.caseId}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <footer>
                <img src={caseStudy.portrait} alt="" width="48" height="48" loading="lazy" />
                <small><b>{caseStudy.name}</b>{caseStudy.trade} · {caseStudy.team}</small>
              </footer>
            </article>
          );
        })}
      </div>
      <div className="proof-band__cta">
        <p>
          <strong>Ils ont remis le bureau à sa place.</strong>
          <span>Des artisans comme vous, qui ont décidé de ne plus perdre leurs soirées.</span>
        </p>
        <div>
          <ConversionLink className="button button--primary" href={buildWhatsAppUrl("les résultats clients")} source="proof-band" target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> Rejoindre ces artisans
          </ConversionLink>
          <Link className="button button--dark" to="#tarifs">Retrouver mes soirées <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
