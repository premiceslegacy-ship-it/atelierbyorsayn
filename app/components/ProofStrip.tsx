import { CASE_STUDIES } from "../data/site";

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
        <p><strong>Mesuré chez les entreprises accompagnées.</strong><span>Des cas réels, anonymisés. Pas des promesses marketing.</span></p>
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
    </section>
  );
}
