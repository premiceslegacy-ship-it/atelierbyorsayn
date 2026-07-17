import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  FileCheck2,
  FileText,
  MessageCircle,
  Mic,
  Play,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { getArticles } from "../lib/articles";
import { buildWhatsAppUrl, CASE_STUDIES, FAQ_ITEMS, PRICING_TIERS, SETUP_PRICES } from "../data/site";
import { ConversionLink } from "./ConversionLink";
import { CaseCarousel } from "./CaseCarousel";
import { ProofStrip } from "./ProofStrip";

const benefits = [
  {
    icon: FileText,
    label: "Devis",
    title: "Répondez avant que le client appelle ailleurs.",
    copy: "Dictez le besoin sur place. Sarah retrouve vos prestations, prépare le document et vous laisse vérifier le prix.",
    metric: "1 min",
    metricLabel: "pour préparer un devis",
    className: "bento-card--wide bento-card--orange",
  },
  {
    icon: WalletCards,
    label: "Trésorerie",
    title: "Les relances partent. Pas votre énergie.",
    copy: "Les retards sont repérés, la relance est adaptée au client et l'historique reste visible.",
    metric: "45 → 12 j",
    metricLabel: "chez Marc D.",
  },
  {
    icon: BarChart3,
    label: "Marge",
    title: "Voyez le chantier déraper avant la fin.",
    copy: "Heures, achats et sous-traitance remontent dans une seule marge réelle.",
    metric: "+18 %",
    metricLabel: "de rentabilité nette",
    className: "bento-card--green",
  },
  {
    icon: CalendarDays,
    label: "Planning",
    title: "Le bon compagnon, sur le bon chantier.",
    copy: "Planning, absences, urgences et informations terrain restent synchronisés.",
    metric: "1 vue",
    metricLabel: "pour toute l'équipe",
  },
  {
    icon: ShieldCheck,
    label: "Conformité",
    title: "Préparez 2026 et 2027 sans subir la réforme.",
    copy: "Données structurées, statuts et flux réglementaires s'intègrent à votre gestion courante.",
    metric: "Factur-X",
    metricLabel: "et connexion agréée",
    className: "bento-card--wide bento-card--indigo",
  },
];

const demoSteps = [
  { label: "Vous parlez", note: "Depuis le chantier, sans formulaire à rallonge.", duration: 5200 },
  { label: "Sarah retrouve", note: "Le contexte de votre entreprise, pas une réponse générique.", duration: 6200 },
  { label: "Elle chiffre", note: "Les hypothèses restent visibles avant toute action.", duration: 7200 },
  { label: "Vous validez", note: "Sarah travaille. Le dernier mot reste le vôtre.", duration: 6800 },
];

const demoContext = [
  { label: "Cliente", value: "Mme Martin", detail: "Cliente depuis 2023" },
  { label: "Visite", value: "Ce matin", detail: "PAC air/eau repérée" },
  { label: "Catalogue", value: "PAC 8,4 kW", detail: "Vos prix, votre TVA" },
  { label: "Conditions", value: "Acompte 30 %", detail: "Vos règles habituelles" },
];

const demoLines = [
  { label: "PAC air/eau 8,4 kW", amount: "5 990 €" },
  { label: "Pose & raccordement", amount: "1 870 €" },
  { label: "Mise en service & réglages", amount: "600 €" },
];

function Demo() {
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!started || !playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    if (active < demoSteps.length - 1) {
      timers.push(window.setTimeout(() => setActive(active + 1), demoSteps[active].duration));
    } else {
      timers.push(window.setTimeout(() => setSent(true), 2400));
      timers.push(window.setTimeout(() => setPlaying(false), demoSteps[active].duration));
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active, playing, started]);

  const goTo = (index: number) => {
    setStarted(true);
    setActive(index);
    setSent(false);
    setPlaying(true);
  };

  return (
    <section id="demo" className="section section--dark demo-section">
      <div className="section-heading section-heading--center">
        <p className="eyebrow">60 secondes avec Atelier</p>
        <h2>Regardez Sarah préparer un devis.</h2>
        <p>De la demande vocale à votre validation. Rien ne part sans vous.</p>
      </div>
      <div className="demo-shell">
        <div className="demo-sidebar" role="tablist" aria-label="Étapes de la démonstration">
          {demoSteps.map((step, index) => (
            <button
              key={step.label}
              role="tab"
              aria-selected={active === index}
              onClick={() => goTo(index)}
              className={active === index ? "is-active" : index < active ? "is-done" : ""}
            >
              <span className="demo-step-index">{index < active ? <Check aria-hidden="true" /> : String(index + 1).padStart(2, "0")}</span>
              {step.label}
              {active === index && playing && <i className="demo-step-progress" style={{ animationDuration: `${step.duration}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div className="demo-phone" role="tabpanel">
          <div className="demo-phone__top"><img src="/icon_meta.png" alt="" width="22" height="22" /> Atelier · Sarah <span className="status-dot" /></div>
          <div className="demo-conversation demo-conversation--sim" key={started ? active : "idle"}>
            {!started && (
              <div className="demo-idle">
                <div className="sarah-orb"><img src="/sarah-avatar.webp" alt="" width="512" height="512" /></div>
                <p className="demo-prompt">Une vraie demande, chiffrée sous vos yeux.</p>
                <p className="demo-note">60 secondes, étape par étape. Rien ne part sans votre validation.</p>
                <button className="demo-validate" type="button" onClick={() => goTo(0)}><Play aria-hidden="true" /> Lancer la démonstration</button>
              </div>
            )}
            {started && active === 0 && (
              <>
                <div className="demo-bubble demo-bubble--user demo-stagger" style={{ animationDelay: "0.2s" }}>
                  <div className="demo-wave" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.08}s` }} />)}</div>
                  <span>0:06</span>
                </div>
                <p className="demo-prompt demo-stagger" style={{ animationDelay: "0.9s" }}>« Sarah, prépare le devis de Mme Martin pour la PAC vue ce matin. »</p>
              </>
            )}
            {started && active === 1 && (
              <>
                <div className="demo-sarah-line demo-stagger"><span className="sarah-orb sarah-orb--mini"><img src="/sarah-avatar.webp" alt="" width="512" height="512" /></span><p>Je retrouve le contexte de l'entreprise…</p></div>
                <div className="demo-chips">
                  {demoContext.map((chip, index) => (
                    <div className="demo-chip demo-stagger" style={{ animationDelay: `${0.7 + index * 0.7}s` }} key={chip.label}>
                      <span>{chip.label}</span><strong>{chip.value}</strong><small>{chip.detail}</small>
                    </div>
                  ))}
                </div>
              </>
            )}
            {started && active === 2 && (
              <div className="demo-doc demo-stagger">
                <div className="demo-doc__head"><strong>DEV-2026-081</strong><span>Brouillon · Mme Martin</span></div>
                {demoLines.map((line, index) => (
                  <div className="demo-doc__line demo-stagger" style={{ animationDelay: `${0.6 + index * 0.9}s` }} key={line.label}>
                    <span>{line.label}</span><strong>{line.amount}</strong>
                  </div>
                ))}
                <div className="demo-doc__total demo-stagger" style={{ animationDelay: "3.6s" }}>
                  <span>Total HT</span><strong>8 460 €</strong>
                </div>
                <div className="demo-doc__badge demo-stagger" style={{ animationDelay: "4.4s" }}>Marge cible 31 % · Acompte 30 %</div>
              </div>
            )}
            {started && active === 3 && !sent && (
              <>
                <div className="demo-doc demo-doc--compact demo-stagger">
                  <div className="demo-doc__head"><strong>DEV-2026-081</strong><span>8 460 € HT · prêt à partir</span></div>
                  <div className="demo-doc__line"><span>Relu par Sarah, rien d'envoyé</span><strong>✓</strong></div>
                </div>
                <button className="demo-validate demo-stagger" style={{ animationDelay: "0.8s" }} type="button" onClick={() => setSent(true)}><Check aria-hidden="true" /> Valider l'envoi</button>
              </>
            )}
            {started && active === 3 && sent && (
              <div className="demo-sent">
                <div className="demo-sent__check"><Check aria-hidden="true" /></div>
                <p className="demo-prompt">Devis envoyé à Mme Martin.</p>
                <p className="demo-note">Sarah archive le devis et suivra la réponse. Vous n'avez rien tapé.</p>
                <button className="demo-replay" type="button" onClick={() => goTo(0)}><RefreshCw aria-hidden="true" /> Revoir la démonstration</button>
              </div>
            )}
            {started && !(active === 3 && sent) && (
              <>
                <p className="demo-label">{demoSteps[active].label}</p>
                <p className="demo-note">{demoSteps[active].note}</p>
              </>
            )}
          </div>
        </div>
        <div className="demo-context">
          <p className="eyebrow">Contexte actif</p>
          <div><FileCheck2 /> <span><strong>Mme Martin</strong>Cliente depuis 2023</span></div>
          <div><ReceiptText /> <span><strong>DEV-2026-081</strong>Brouillon enregistré</span></div>
          <div><BarChart3 /> <span><strong>31 %</strong>Marge cible</span></div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [model, setModel] = useState<"subscription" | "usage" | null>(null);
  const [selected, setSelected] = useState("pro");
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
          <div className="pricing-choice__price"><strong>{SETUP_PRICES.withSubscription.toLocaleString("fr-FR")} €</strong><span>HT de setup</span></div>
          <h3>Sarah travaille avec vous chaque mois.</h3>
          <p>Application complète, IA incluse et abonnement à partir de 39 € HT/mois.</p>
          <span className="pricing-choice__action">Voir les 3 formules <ArrowRight /></span>
        </button>
        <button type="button" className={`pricing-choice ${model === "usage" ? "is-selected" : ""}`} aria-pressed={model === "usage"} onClick={() => setModel("usage")}>
          <span className="pricing-choice__label">Sans abonnement</span>
          <div className="pricing-choice__price"><strong>{SETUP_PRICES.withoutSubscription.toLocaleString("fr-FR")} €</strong><span>HT de setup</span></div>
          <h3>L'application complète, sans mensualité.</h3>
          <p>Votre gestion reste disponible. Sarah reste en veille et peut être activée à l'usage.</p>
          <span className="pricing-choice__action">Choisir sans abonnement <ArrowRight /></span>
        </button>
      </div>
      {model === "subscription" && (
        <div className="pricing-reveal" aria-live="polite">
          <div className="pricing-reveal__heading"><p className="eyebrow">Étape 2 sur 2</p><h3>Choisissez le rythme de Sarah.</h3></div>
          <div className="pricing-grid">
            {PRICING_TIERS.map((tier) => (
              <article className={`pricing-card ${tier.featured ? "pricing-card--featured" : ""}`} key={tier.id}>
                {tier.featured && <span className="pricing-badge">Le plus choisi</span>}
                <div className="pricing-card__top">
                  <p>{tier.name}</p>
                  <div><strong>{tier.price} €</strong><span>HT / mois</span></div>
                  <h3>{tier.promise}</h3>
                  <p>{tier.audience}</p>
                </div>
                <ul>{tier.benefits.map((item) => <li key={item}><Check />{item}</li>)}</ul>
                <details open={selected === tier.id} onToggle={(event) => event.currentTarget.open && setSelected(tier.id)}>
                  <summary>Voir les quotas <ChevronDown /></summary>
                  <ul>{tier.quotas.map((quota) => <li key={quota}>{quota}</li>)}</ul>
                </details>
                <ConversionLink
                  className={`button ${tier.featured ? "button--primary" : "button--dark"}`}
                  href={buildWhatsAppUrl("les tarifs", tier)}
                  source="pricing"
                  tier={tier.id}
                  target="_blank"
                  rel="noreferrer"
                >Choisir {tier.name}<ArrowRight /></ConversionLink>
              </article>
            ))}
          </div>
        </div>
      )}
      {model === "usage" && (
        <div className="pricing-usage" aria-live="polite">
          <div><p className="eyebrow">Sans mensualité</p><h3>Atelier reste votre bureau métier.</h3><p>Devis, factures, clients, chantiers et planning restent disponibles. Vous activez Sarah seulement lorsque vous en avez besoin.</p></div>
          <ConversionLink className="button button--primary" href={buildWhatsAppUrl("l'offre sans abonnement")} source="pricing-usage" target="_blank" rel="noreferrer">Choisir ce modèle <ArrowRight /></ConversionLink>
        </div>
      )}
      <p className="pricing-note">Connexion facturation électronique : à partir de 450 € HT la première année, puis 250 € HT/an selon le volume.</p>
    </section>
  );
}

export default function HomePage() {
  const articles = getArticles().slice(0, 3);
  return (
    <main>
      <section className="hero">
        <picture>
          <source srcSet="/images/hero-chantier-v2-640.avif 640w, /images/hero-chantier-v2-960.avif 960w, /images/hero-chantier-v2.avif 1600w" sizes="100vw" type="image/avif" />
          <source srcSet="/images/hero-chantier-v2-640.webp 640w, /images/hero-chantier-v2-960.webp 960w, /images/hero-chantier-v2.webp 1600w" sizes="100vw" type="image/webp" />
          <img className="hero__image" src="/images/hero-chantier-v2.webp" alt="Chef de chantier consultant sa tablette pendant que son équipe travaille" width="1600" height="900" fetchPriority="high" />
        </picture>
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">L'assistante de gestion des artisans du BTP</p>
          <h1>Une secrétaire métier<br />dans votre poche.<br /><em>Pas un salarié de plus.</em></h1>
          <p className="hero__lead">Sarah prépare vos devis, relance les impayés et repère les chantiers qui dérapent. Vous gardez la décision.</p>
          <div className="hero__actions">
            <ConversionLink className="button button--primary" href={buildWhatsAppUrl("la page d'accueil")} source="hero" target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Récupérer du temps
            </ConversionLink>
            <a className="button button--glass" href="#demo">Voir Atelier fonctionner <ArrowRight /></a>
          </div>
        </div>
        <div className="hero__proof">
          <div className="avatar-stack">
            {CASE_STUDIES.slice(0, 4).map((item) => <img key={item.id} src={item.portrait} alt="" width="48" height="48" />)}
          </div>
          <p><strong>Des cas réels, pas des promesses.</strong><span>Temps, encours et marge mesurés sur le terrain.</span></p>
        </div>
      </section>

      <ProofStrip />

      <section className="section phrase-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Ça commence par une phrase</p>
          <h2>Parlez comme sur le chantier.<br />Sarah comprend l'entreprise.</h2>
          <p>Elle ne part pas d'une page blanche : elle retrouve ce qui existe déjà dans Atelier.</p>
        </div>
        <div className="phrase-orbit">
          <div className="orbit orbit--one" aria-hidden="true" />
          <div className="orbit orbit--two" aria-hidden="true" />
          <div className="context-chip context-chip--client"><span>Client</span>Mme Martin</div>
          <div className="context-chip context-chip--catalogue"><span>Catalogue</span>PAC air/eau</div>
          <div className="context-chip context-chip--planning"><span>Planning</span>Pose · jeudi</div>
          <div className="context-chip context-chip--margin"><span>Marge cible</span>31 %</div>
          <div className="phrase-core">
            <div className="mic-button"><Mic /></div>
            <p>« Sarah, prépare le devis de Mme Martin pour la PAC vue ce matin. »</p>
            <span>Transcription terminée · 8 secondes</span>
          </div>
        </div>
      </section>

      <section id="benefices" className="section bento-section">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow">Ce que ça change</p><h2>Cinq angles morts.<br />Une seule mémoire.</h2></div>
          <p>Atelier relie l'administratif au travail réel, pour que chaque information serve la prochaine décision.</p>
        </div>
        <div className="bento-grid">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article className={`bento-card ${benefit.className ?? ""}`} key={benefit.label}>
                <div className="bento-card__icon"><Icon /></div>
                <p className="eyebrow">{benefit.label}</p>
                <h3>{benefit.title}</h3>
                <p>{benefit.copy}</p>
                <div className="bento-metric"><strong>{benefit.metric}</strong><span>{benefit.metricLabel}</span></div>
              </article>
            );
          })}
        </div>
      </section>

      <Demo />

      <section id="sarah" className="section sarah-section">
        <div className="sarah-copy">
          <p className="eyebrow">Sarah, assistante IA métier</p>
          <h2>Sarah travaille.<br />Vous décidez.</h2>
          <p>Elle connaît les clients, les chantiers, le planning et vos habitudes. Elle prépare la suite sans transformer votre entreprise en boîte noire.</p>
          <ul>
            <li><Sparkles />Propose l'action et explique pourquoi.</li>
            <li><RefreshCw />Apprend du contexte validé dans Atelier.</li>
            <li><ShieldCheck />Attend votre accord avant les actions sensibles.</li>
          </ul>
        </div>
        <div className="sarah-visual">
          <div className="sarah-console">
            <div className="sarah-console__bar">
              <img src="/logo-atelier-blanc.png" alt="Atelier" width="706" height="80" />
              <span><i /> Sarah est active</span>
            </div>
            <div className="sarah-console__body">
              <div className="sarah-halo" />
              <img className="sarah-avatar" src="/sarah-avatar.webp" alt="Sarah, assistante IA Atelier" width="512" height="512" loading="lazy" />
            </div>
          </div>
          <div className="sarah-card sarah-card--top"><span>Devis technique</span><strong>PAC air/eau · 8,4 kW</strong><small>Marge 31 % · acompte 30 %</small></div>
          <div className="sarah-card sarah-card--bottom"><span>Prêt à vérifier</span><strong>DEV-2026-081</strong><small>8 460 € HT · 6 postes chiffrés</small></div>
        </div>
      </section>

      <CaseCarousel />
      <Pricing />

      <section className="section faq-section">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow">Les questions franches</p><h2>Avant de confier une partie du bureau à Sarah.</h2></div>
          <p>Pas de jargon, pas de ligne cachée. Si votre cas est particulier, Samuel vous répond directement.</p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<ChevronDown /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section journal-preview">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow">Le journal Atelier</p><h2>Les bons repères pour mieux gérer vos chantiers.</h2></div>
          <Link className="text-link" to="/blog">Voir tous les articles <ArrowRight /></Link>
        </div>
        <div className="article-grid">
          {articles.map((article) => (
            <Link className="article-card" to={`/blog/${article.slug}`} key={article.slug}>
              <picture><source srcSet={article.heroImage.replace(".webp", ".avif")} type="image/avif" /><img src={article.heroImage} alt="" width="1200" height="750" loading="lazy" /></picture>
              <div><p className="eyebrow">{article.pillar}</p><h3>{article.title}</h3><span>{article.readingMinutes} min de lecture <ArrowRight /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div>
          <p className="eyebrow eyebrow--light">Atelier par Orsayn</p>
          <h2>Votre entreprise ne manque pas de courage.<br /><em>Elle manque d'un bureau qui suit.</em></h2>
          <p>Montrez votre quotidien à Samuel. Il vous dira franchement où Atelier peut vous rendre du temps.</p>
          <ConversionLink className="button button--primary" href={buildWhatsAppUrl("le bas de la page d'accueil")} source="closing" target="_blank" rel="noreferrer">
            Récupérer du temps <ArrowRight />
          </ConversionLink>
        </div>
      </section>
    </main>
  );
}
