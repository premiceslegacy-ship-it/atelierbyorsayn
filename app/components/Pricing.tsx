import { useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { buildTradeWhatsAppUrl, buildWhatsAppUrl, PRICING_TIERS, SETUP_ADOPTION, SETUP_PRICE, TRIAL_DAYS, type PricingTier } from "../data/site";
import { ConversionLink } from "./ConversionLink";

type PricingProps = {
  /** Libellé métier ("électricien", "métallier", …) pour personnaliser le message WhatsApp. Absent sur la home. */
  tradeLabel?: string;
  /** Suffixe ajouté au source de tracking pour distinguer l'origine (ex: slug du métier). */
  sourceSuffix?: string;
  /** Précision métier affichée sous les formules (ex: module prix matières métal). Absent = rien d'affiché. */
  note?: string;
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

export function Pricing({ tradeLabel, sourceSuffix, note }: PricingProps) {
  const [model, setModel] = useState<"subscription" | null>(null);
  const [selected, setSelected] = useState("pro");
  const [activeTier, setActiveTier] = useState(0);
  const revealRef = useRef<HTMLDivElement>(null);
  const source = sourceSuffix ? `pricing-${sourceSuffix}` : "pricing";

  const buildUrl = (tier?: PricingTier) =>
    tradeLabel ? buildTradeWhatsAppUrl(tradeLabel, tier) : buildWhatsAppUrl(tier);

  const showFormulas = () => {
    setModel("subscription");
    requestAnimationFrame(() => revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const goToTier = (direction: -1 | 1) => setActiveTier((current) => (current + direction + PRICING_TIERS.length) % PRICING_TIERS.length);

  return (
    <section id="tarifs" className="section section--pricing">
      <div className="section-heading section-heading--center section-heading--light">
        <p className="eyebrow">Commencez par un choix simple</p>
        <h2>Avec Sarah tous les mois.<br />Ou en une seule fois.</h2>
        <p>Choisissez d'abord votre modèle. Les formules détaillées apparaissent ensuite, uniquement si elles vous concernent.</p>
      </div>
      <div className="pricing-choice-grid" aria-label="Choisir un modèle tarifaire">
        <button type="button" className={`pricing-choice ${model === "subscription" ? "is-selected" : ""}`} aria-pressed={model === "subscription"} onClick={showFormulas}>
          <span className="pricing-choice__label">Abonnement mensuel</span>
          <div className="pricing-choice__price"><strong>{TRIAL_DAYS} jours</strong><span>d'essai offerts, sans CB</span></div>
          <h3>Sarah travaille avec vous chaque mois.</h3>
          <p>Testez Sarah, l'assistante IA, {TRIAL_DAYS} jours sans engagement. L'abonnement démarre à {PRICING_TIERS[0].price} € HT/mois.</p>
          <AdoptionProof count={SETUP_ADOPTION} />
          <span className="pricing-choice__action">Voir les formules <ArrowRight /></span>
        </button>
        <ConversionLink
          className="pricing-choice"
          href={buildUrl()}
          source={`${source}-usage`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="pricing-choice__label">Paiement unique</span>
          <div className="pricing-choice__price"><strong>{SETUP_PRICE.toLocaleString("fr-FR")} €</strong><span>HT, l'application à vie</span></div>
          <h3>À partir de 0 € par mois.</h3>
          <p>Un seul paiement vous donne l'application à vie, sans abonnement à payer ensuite.</p>
          <AdoptionProof count={SETUP_ADOPTION} />
          <span className="pricing-choice__action">Choisir le paiement unique <ArrowRight /></span>
        </ConversionLink>
      </div>
      {model === "subscription" && (
        <div className="pricing-reveal" ref={revealRef} aria-live="polite">
          <div className="pricing-reveal__heading"><p className="eyebrow">Étape 2 sur 2</p><h3>Choisissez le rythme de Sarah.</h3><p>{TRIAL_DAYS} jours d'essai gratuit, sans carte bancaire. Le montant ci-dessous est l'abonnement mensuel une fois l'essai terminé.</p></div>
          <div className="pricing-carousel">
            <div className="pricing-carousel__controls">
              <button type="button" onClick={() => goToTier(-1)} aria-label="Formule précédente"><ChevronLeft /></button>
              <div className="pricing-carousel__dots" role="tablist" aria-label="Choisir une formule">
                {PRICING_TIERS.map((tier, index) => (
                  <button
                    key={tier.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTier === index}
                    aria-label={tier.name}
                    className={activeTier === index ? "is-active" : ""}
                    onClick={() => setActiveTier(index)}
                  />
                ))}
              </div>
              <button type="button" onClick={() => goToTier(1)} aria-label="Formule suivante"><ChevronRight /></button>
            </div>
            <div className="pricing-carousel__viewport">
              <div className="pricing-carousel__track" style={{ transform: `translateX(-${activeTier * 100}%)` }}>
                {PRICING_TIERS.map((tier) => (
                  <div className="pricing-carousel__slide" key={tier.id}>
                    <ConversionLink
                      className={`pricing-card ${tier.featured ? "pricing-card--featured" : ""}`}
                      href={buildUrl(tier)}
                      source={source}
                      tier={tier.id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {tier.featured && <span className="pricing-badge">Le plus choisi</span>}
                      <div className="pricing-card__top">
                        <p>{tier.name}</p>
                        <div><strong>{tier.price} €</strong><span>HT / mois</span></div>
                        <p className="pricing-card__trial">{TRIAL_DAYS} jours d'essai offerts, sans carte bancaire</p>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
          {note && <p className="pricing-note pricing-note--trade">{note}</p>}
        </div>
      )}
      <p className="pricing-note">Connexion facturation électronique (facultative) : à partir de 450 € HT la première année, puis 250 € HT/an selon le volume.</p>
    </section>
  );
}
