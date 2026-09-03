import { useContext, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { PRICING_TIERS, SETUP_PRICE, TRIAL_DAYS, buildTrialSignupUrl, type TradeSimulatorProfile } from "../data/site";
import { OpenLeadModalContext } from "../lib/leadModal";
import { ConversionLink } from "./ConversionLink";
import { AiCostSimulator } from "./AiCostSimulator";

type PricingProps = {
  /** Suffixe ajouté au source de tracking pour distinguer l'origine (ex: slug du métier). */
  sourceSuffix?: string;
  /** Précision métier affichée sous les formules (ex: module prix matières métal). Absent = rien d'affiché. */
  note?: string;
  /** Titre + sous-texte du bloc "On s'occupe de tout", personnalisés dans le langage du métier. Absent = texte générique (page d'accueil). */
  setupOffer?: { headline: string; subline: string };
  /** Repères de coûts et d'outillage propres au métier affiché dans le simulateur. */
  simulatorProfile?: TradeSimulatorProfile;
};

const DEFAULT_SETUP_OFFER = {
  headline: "Votre entreprise est prête, sans soirée sacrifiée.",
  subline: "Configuration métier, reprise du catalogue, prise en main guidée et accès prioritaire au support pendant 14 jours. Puis accès sans abonnement mensuel.",
};

const SETUP_PROCESS = [
  {
    title: "On configure votre catalogue et vos prix",
    copy: "Prestations types, tarifs, TVA applicable : votre instance Atelier reflète votre métier avant même votre premier échange avec Samuel.",
  },
  {
    title: "On reprend ce que vous avez déjà",
    copy: "Devis en cours, clients, historique : vos données existantes sont importées. Rien à ressaisir, rien à perdre.",
  },
  {
    title: "Vous prenez la main, en direct",
    copy: "Un appel avec Samuel, votre catalogue sous les yeux. Vous validez, vous ajustez, vous repartez en sachant vous en servir. Pas une formation de 30 jours : une heure utile.",
  },
  {
    title: "14 jours de support prioritaire",
    copy: "Une question, un blocage, un réglage à revoir ? Réponse directe de Samuel, en priorité, pendant les deux premières semaines. Ensuite, votre accès reste actif sans abonnement.",
  },
];

/** Chiffres tracés au trait, dans l'esprit croquis des icônes maison — pas de badge, pas de forme pleine. */
function StepDigit({ n }: { n: 1 | 2 | 3 | 4 }) {
  const paths: Record<1 | 2 | 3 | 4, string> = {
    1: "M11 8 L17 4 V28 M11 28 H23",
    2: "M9 10 C9 5.5 13 3 17 3 C21.5 3 24.5 6 24.5 9.5 C24.5 15 17 17.5 9.5 28 H25",
    3: "M9.5 6 C11 3.8 14 2.7 17 3 C21 3.4 24 6 24 9.5 C24 12.5 21.5 14.3 18.5 14.8 C22 15.2 25 17.3 25 21.5 C25 25.8 21.5 28.7 17 28.7 C13 28.7 9.7 27 8.5 24",
    4: "M20 28 V3 L7 20.5 H27",
  };
  return (
    <svg className="setup-process__digit" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d={paths[n]} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing({ sourceSuffix, note, setupOffer = DEFAULT_SETUP_OFFER, simulatorProfile }: PricingProps) {
  const [selected, setSelected] = useState("pro");
  const [showTrialTiers, setShowTrialTiers] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const openLeadModal = useContext(OpenLeadModalContext);
  const source = sourceSuffix ? `pricing-${sourceSuffix}` : "pricing";
  // Le simulateur est rendu dans ce même bloc : une ancre locale évite de
  // recharger la page métier et de laisser ScrollRestoration revenir en haut.
  const simulatorHref = "#simulateur-ia";

  const setupSource = `${source}-done-for-you`;
  const simulatorSource = `${source}-simulator`;

  const revealTiers = () => {
    setShowTrialTiers(true);
    requestAnimationFrame(() => revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const backToSetupOffer = () => {
    setShowTrialTiers(false);
    requestAnimationFrame(() => document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth", block: "start" }));
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
                      <span className={`button ${tier.featured ? "button--primary" : "button--dark"}`}>Choisir {tier.name}<ArrowRight /></span>
                    </ConversionLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {note && <p className="pricing-note pricing-note--trade">{note}</p>}
          <button type="button" className="text-link pricing-reveal__back" onClick={backToSetupOffer}>
            Voir l'offre clé en main
          </button>
        </div>
      ) : (
        <div className="pricing-choice-grid" aria-label="Choisir un modèle tarifaire">
          <button type="button" className="pricing-choice" onClick={() => openLeadModal(setupSource)}>
            <span className="pricing-choice__label">On s'occupe de tout</span>
            <div className="pricing-choice__price"><strong>{SETUP_PRICE.toLocaleString("fr-FR")} €</strong><span>HT, une seule fois</span></div>
            <h3>{setupOffer.headline}</h3>
            <p>{setupOffer.subline}</p>
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
      {!showTrialTiers && (
        <div className="pricing-simulator-link-wrap">
          <a href={simulatorHref} className="pricing-simulator-link">
            Voir combien vous économisez, sans abonnement
          </a>
        </div>
      )}
      {!showTrialTiers && (
        <div className="setup-process">
          <p className="setup-process__heading">Concrètement, comment ça se passe avec<br />« On s'occupe de tout »</p>
          <ol>
            {SETUP_PROCESS.map((step, index) => (
              <li key={step.title}>
                <StepDigit n={(index + 1) as 1 | 2 | 3 | 4} />
                <div className="setup-process__body">
                  <h4>{step.title}</h4>
                  <p>{step.copy}</p>
                </div>
                {index < SETUP_PROCESS.length - 1 && <span className="setup-process__connector" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      )}
      {!showTrialTiers && <AiCostSimulator onOpenLeadModal={openLeadModal} source={simulatorSource} profile={simulatorProfile} />}
      <p className="pricing-note">Facturation électronique incluse : chaque facture est déjà au format réglementaire, et la connexion à une plateforme agréée est comprise dans les deux offres, sans surcoût.</p>
    </section>
  );
}
