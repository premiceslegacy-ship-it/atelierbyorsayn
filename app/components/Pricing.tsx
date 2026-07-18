import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Star } from "lucide-react";
import { buildTradeWhatsAppUrl, buildWhatsAppUrl, PRICING_TIERS, SETUP_ADOPTION, SETUP_PRICES, type PricingTier } from "../data/site";
import { ConversionLink } from "./ConversionLink";

type PricingProps = {
  /** Libellé métier ("électricien", "métallier", …) pour personnaliser le message WhatsApp. Absent sur la home. */
  tradeLabel?: string;
  /** Suffixe ajouté au source de tracking pour distinguer l'origine (ex: slug du métier). */
  sourceSuffix?: string;
};

function AdoptionProof({ count }: { count: number }) {
  return (
    <div className="pricing-proof">
      <span>Adopté par {count} artisan{count > 1 ? "s" : ""}</span>
      <div className="pricing-proof__stars" aria-label="5 étoiles">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
      </div>
    </div>
  );
}

export function Pricing({ tradeLabel, sourceSuffix }: PricingProps) {
  const [model, setModel] = useState<"subscription" | null>(null);
  const [selected, setSelected] = useState("pro");
  const source = sourceSuffix ? `pricing-${sourceSuffix}` : "pricing";

  const buildUrl = (contextSource: string, tier?: PricingTier) =>
    tradeLabel ? buildTradeWhatsAppUrl(tradeLabel, tier) : buildWhatsAppUrl(contextSource, tier);

  return (
    <section id="tarifs" className="section section--pricing">
      <div className="section-heading section-heading--center section-heading--light">
        <p className="eyebrow">Commencez par un choix simple</p>
        <h2>Avec Sarah tous les mois.<br />Ou seulement quand il faut.</h2>
        <p>Choisissez d'abord votre modèle. Les formules détaillées apparaissent ensuite, uniquement si elles vous concernent.</p>
      </div>
      <div className="pricing-choice-grid" aria-label="Choisir un modèle tarifaire">
        <button type="button" className={`pricing-choice ${model === "subscription" ? "is-selected" : ""}`} aria-pressed={model === "subscription"} onClick={() => setModel("subscription")}>
          <span className="pricing-choice__label">Avec abonnement</span>
          <div className="pricing-choice__price"><strong>{SETUP_PRICES.withSubscription.toLocaleString("fr-FR")} €</strong><span>HT de setup, app à vie</span></div>
          <h3>Sarah travaille avec vous chaque mois.</h3>
          <p>Le setup vous donne l'application à vie. L'abonnement démarre à 39 € HT/mois, Sarah (l'IA) est incluse à partir du palier Pro, 79 € HT/mois.</p>
          <AdoptionProof count={SETUP_ADOPTION.withSubscription} />
          <span className="pricing-choice__action">Voir les 3 formules <ArrowRight /></span>
        </button>
        <ConversionLink
          className="pricing-choice"
          href={buildUrl("l'offre sans abonnement")}
          source={`${source}-usage`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="pricing-choice__label">Sans abonnement</span>
          <div className="pricing-choice__price"><strong>{SETUP_PRICES.withoutSubscription.toLocaleString("fr-FR")} €</strong><span>HT de setup, app à vie</span></div>
          <h3>À partir de 0 € par mois.</h3>
          <p>Le setup vous donne l'application à vie, sans abonnement à payer. Sarah reste en veille et peut être activée à l'usage.</p>
          <AdoptionProof count={SETUP_ADOPTION.withoutSubscription} />
          <span className="pricing-choice__action">Choisir sans abonnement <ArrowRight /></span>
        </ConversionLink>
      </div>
      {model === "subscription" && (
        <div className="pricing-reveal" aria-live="polite">
          <div className="pricing-reveal__heading"><p className="eyebrow">Étape 2 sur 2</p><h3>Choisissez le rythme de Sarah.</h3><p>Le setup ({SETUP_PRICES.withSubscription.toLocaleString("fr-FR")} € HT, réglé une fois) vous donne l'application à vie. Le montant ci-dessous est l'abonnement mensuel pour Sarah, l'IA.</p></div>
          <div className="pricing-grid">
            {PRICING_TIERS.map((tier) => (
              <ConversionLink
                className={`pricing-card ${tier.featured ? "pricing-card--featured" : ""}`}
                href={buildUrl("les tarifs", tier)}
                source={source}
                tier={tier.id}
                target="_blank"
                rel="noreferrer"
                key={tier.id}
              >
                {tier.featured && <span className="pricing-badge">Le plus choisi</span>}
                <div className="pricing-card__top">
                  <p>{tier.name}</p>
                  <div><strong>{tier.price} €</strong><span>HT / mois</span></div>
                  <h3>{tier.promise}</h3>
                  <p>{tier.audience}</p>
                  <AdoptionProof count={tier.adoptedBy} />
                </div>
                <ul>{tier.benefits.map((item) => <li key={item}><Check />{item}</li>)}</ul>
                <details
                  open={selected === tier.id}
                  onClick={(event) => event.stopPropagation()}
                  onToggle={(event) => event.currentTarget.open && setSelected(tier.id)}
                >
                  <summary>Voir les quotas <ChevronDown /></summary>
                  <ul>{tier.quotas.map((quota) => <li key={quota}>{quota}</li>)}</ul>
                </details>
                <span className={`button ${tier.featured ? "button--primary" : "button--dark"}`}>Choisir {tier.name}<ArrowRight /></span>
              </ConversionLink>
            ))}
          </div>
        </div>
      )}
      <p className="pricing-note">Connexion facturation électronique (facultative) : à partir de 450 € HT la première année, puis 250 € HT/an selon le volume.</p>
    </section>
  );
}
