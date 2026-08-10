import { useContext, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { PRICING_TIERS, SETUP_PRICE, TRIAL_DAYS, buildTrialSignupUrl } from "../data/site";
import { OpenLeadModalContext } from "../lib/leadModal";
import { ConversionLink } from "./ConversionLink";

type PricingProps = {
  /** Suffixe ajouté au source de tracking pour distinguer l'origine (ex: slug du métier). */
  sourceSuffix?: string;
  /** Précision métier affichée sous les formules (ex: module prix matières métal). Absent = rien d'affiché. */
  note?: string;
};

export function Pricing({ sourceSuffix, note }: PricingProps) {
  const [selected, setSelected] = useState("pro");
  const [showTrialTiers, setShowTrialTiers] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const openLeadModal = useContext(OpenLeadModalContext);
  const source = sourceSuffix ? `pricing-${sourceSuffix}` : "pricing";

  const setupSource = `${source}-done-for-you`;

  const revealTiers = () => {
    setShowTrialTiers(true);
    requestAnimationFrame(() => revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <section id="tarifs" className="section section--pricing">
      <div className="section-heading section-heading--center section-heading--light">
        <p className="eyebrow">Deux chemins, le même résultat</p>
        <h2>Récupérez vos soirées.<br />Choisissez simplement qui démarre.</h2>
        <p>Vous voulez que l'on prépare tout avec vous, ou commencer aujourd'hui sans frais de départ ?</p>
      </div>
      {showTrialTiers ? (
        <div className="pricing-reveal" ref={revealRef}>
          <div className="pricing-reveal__heading"><p className="eyebrow">Commencez sans risque</p><h3>Tout Expert pendant {TRIAL_DAYS} jours.</h3><p>Sans carte bancaire. Sans prélèvement automatique à la fin. Choisissez Pro ou Expert ci-dessous pour créer votre espace.</p></div>
          <div className="pricing-carousel">
            <div className="pricing-carousel__viewport">
              <div className="pricing-carousel__track">
                {PRICING_TIERS.map((tier) => (
                  <div className="pricing-carousel__slide" key={tier.id}>
                    <ConversionLink
                      className={`pricing-card ${tier.featured ? "pricing-card--featured" : ""}`}
                      href={buildTrialSignupUrl(tier.id)}
                      source={source}
                      tier={tier.id}
                      preserveUtm
                    >
                      {tier.featured && <span className="pricing-badge">Le plus choisi</span>}
                      <div className="pricing-card__top">
                        <p>{tier.name}</p>
                        <div><strong>{tier.price} €</strong><span>HT / mois</span></div>
                        <p className="pricing-card__trial">Expert offert {TRIAL_DAYS} jours · aucune carte demandée</p>
                        <h3>{tier.promise}</h3>
                        <p>{tier.audience}</p>
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
                      <span className={`button ${tier.featured ? "button--primary" : "button--dark"}`}>Essayer Expert gratuitement pendant {TRIAL_DAYS} jours<ArrowRight /></span>
                    </ConversionLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {note && <p className="pricing-note pricing-note--trade">{note}</p>}
          <button type="button" className="text-link pricing-reveal__back" onClick={() => setShowTrialTiers(false)}>
            Voir l'offre clé en main
          </button>
        </div>
      ) : (
        <div className="pricing-choice-grid" aria-label="Choisir un modèle tarifaire">
          <button type="button" className="pricing-choice" onClick={() => openLeadModal(setupSource)}>
            <span className="pricing-choice__label">On s'occupe de tout</span>
            <div className="pricing-choice__price"><strong>{SETUP_PRICE.toLocaleString("fr-FR")} €</strong><span>HT, une seule fois</span></div>
            <h3>Votre entreprise est prête, sans soirée sacrifiée.</h3>
            <p>Configuration métier, reprise du catalogue, formation de l'équipe et 30 jours d'accompagnement. Puis accès sans abonnement mensuel.</p>
            <span className="pricing-choice__action">Parler de mon entreprise <ArrowRight /></span>
          </button>
          <button type="button" className="pricing-choice" onClick={revealTiers}>
            <span className="pricing-choice__label">Je démarre maintenant</span>
            <div className="pricing-choice__price"><strong>{TRIAL_DAYS} jours</strong><span>d'Expert offerts, sans carte</span></div>
            <h3>Votre premier devis peut partir aujourd'hui.</h3>
            <p>Commencez sans frais de départ. Testez tout Expert, puis choisissez Pro à {PRICING_TIERS[0].price} € ou Expert à {PRICING_TIERS[1].price} € HT/mois.</p>
            <span className="pricing-choice__action">Voir les deux formules <ArrowRight /></span>
          </button>
        </div>
      )}
      <p className="pricing-note">Connexion facturation électronique (facultative) : à partir de 450 € HT la première année, puis 250 € HT/an selon le volume.</p>
    </section>
  );
}
