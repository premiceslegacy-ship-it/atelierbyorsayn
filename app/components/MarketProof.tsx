import { MARKET_SOURCES, MARKET_STATS } from "../data/site";
import { IconPointage, IconCalendrier, IconConformite } from "./AtelierIcons";

const ICONS = { clock: IconPointage, calendar: IconCalendrier, shield: IconConformite };

export function MarketProof({ title, actions }: { title?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section id="resultats" className="section section--results">
      <div className="section-heading section-heading--center">
        <p className="eyebrow">Ce que dit le marché</p>
        <h2>{title ?? <>Moins d'administratif.<br />Plus de maîtrise.</>}</h2>
        <p>Ce n'est pas un problème d'organisation. C'est un problème d'outil.</p>
      </div>
      <div className="market-grid">
        {MARKET_STATS.map((stat) => {
          const Icon = ICONS[stat.icon];
          return (
            <article className={`market-card ${stat.accent ? "is-accent" : ""}`} key={stat.id}>
              <Icon className="market-card__icon" />
              <strong>{stat.value}</strong>
              <p className="market-card__problem">{stat.problem}</p>
              <p className="market-card__answer">{stat.answer}</p>
              <footer>{stat.source}</footer>
            </article>
          );
        })}
      </div>
      <div className="market-sources">
        <div className="market-sources__track">
          {Array.from({ length: 6 }, (_, set) => MARKET_SOURCES.map((source, index) => (
            <img
              key={`${source.name}-${set}-${index}`}
              src={source.logo}
              alt={set === 0 ? source.name : ""}
              aria-hidden={set !== 0}
              loading="lazy"
            />
          ))).flat()}
        </div>
      </div>
      {actions && <div className="market-actions">{actions}</div>}
    </section>
  );
}
