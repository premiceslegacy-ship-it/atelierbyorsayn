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
import { buildWhatsAppUrl, CASE_STUDIES, FAQ_ITEMS } from "../data/site";
import { ConversionLink } from "./ConversionLink";
import { CaseCarousel } from "./CaseCarousel";
import { ProofStrip } from "./ProofStrip";
import { Pricing } from "./Pricing";

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
  { label: "Client pro", value: "SCI du Parc", detail: "Compte client depuis 2022" },
  { label: "Visite", value: "Ce matin", detail: "Plateau de bureaux · 260 m²" },
  { label: "Catalogue", value: "Cloisons & finitions", detail: "Vos prix, votre TVA" },
  { label: "Conditions", value: "Acompte 30 %", detail: "Règlement à 30 jours" },
];

const demoLines = [
  { label: "Dépose & préparation des locaux", amount: "2 400 €" },
  { label: "Cloisons & doublages · 120 m²", amount: "6 830 €" },
  { label: "Peinture & finitions", amount: "3 870 €" },
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
        <p className="eyebrow">Sarah, assistante IA métier</p>
        <h2>Sarah travaille.<br />Vous décidez.</h2>
        <p>Elle connaît vos clients, vos chantiers, vos prix.<br />Regardez-la préparer un devis en 60 secondes.</p>
      </div>
      <ul className="demo-sarah-strip">
        <li><Sparkles aria-hidden="true" />Propose l'action et explique pourquoi.</li>
        <li><RefreshCw aria-hidden="true" />Apprend du contexte validé dans Atelier.</li>
        <li><ShieldCheck aria-hidden="true" />Attend votre accord avant les actions sensibles.</li>
      </ul>
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
                <p className="demo-prompt demo-stagger" style={{ animationDelay: "0.9s" }}>« Sarah, prépare le devis de la SCI du Parc pour les bureaux visités ce matin. »</p>
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
                <div className="demo-doc__head"><strong>DEV-2026-114</strong><span>Brouillon · SCI du Parc</span></div>
                {demoLines.map((line, index) => (
                  <div className="demo-doc__line demo-stagger" style={{ animationDelay: `${0.6 + index * 0.9}s` }} key={line.label}>
                    <span>{line.label}</span><strong>{line.amount}</strong>
                  </div>
                ))}
                <div className="demo-doc__total demo-stagger" style={{ animationDelay: "3.6s" }}>
                  <span>Total HT</span><strong>13 100 €</strong>
                </div>
                <div className="demo-doc__badge demo-stagger" style={{ animationDelay: "4.4s" }}>Marge cible 28 % · Acompte 30 %</div>
              </div>
            )}
            {started && active === 3 && !sent && (
              <>
                <div className="demo-doc demo-doc--compact demo-stagger">
                  <div className="demo-doc__head"><strong>DEV-2026-114</strong><span>13 100 € HT · prêt à partir</span></div>
                  <div className="demo-doc__line"><span>Relu par Sarah, rien d'envoyé</span><strong>✓</strong></div>
                </div>
                <button className="demo-validate demo-stagger" style={{ animationDelay: "0.8s" }} type="button" onClick={() => setSent(true)}><Check aria-hidden="true" /> Valider l'envoi</button>
              </>
            )}
            {started && active === 3 && sent && (
              <div className="demo-sent">
                <div className="demo-sent__check"><Check aria-hidden="true" /></div>
                <p className="demo-prompt">Devis envoyé à la SCI du Parc.</p>
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
          <div><FileCheck2 /> <span><strong>SCI du Parc</strong>Client pro depuis 2022</span></div>
          <div><ReceiptText /> <span><strong>DEV-2026-114</strong>Brouillon enregistré</span></div>
          <div><BarChart3 /> <span><strong>28 %</strong>Marge cible</span></div>
        </div>
      </div>
      <div className="demo-cta">
        <p>Sarah est prête. Il ne manque que votre entreprise.</p>
        <div>
          <a className="button button--primary" href="#tarifs">Gagner du temps <ArrowRight aria-hidden="true" /></a>
          <ConversionLink className="button button--glass" href={buildWhatsAppUrl()} source="demo" target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> Poser une question
          </ConversionLink>
        </div>
      </div>
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
          <p className="eyebrow eyebrow--light">Le logiciel de gestion des artisans du BTP</p>
          <h1>Retrouvez 10h et <em>18 % de marge</em> par mois.<br />Sans embaucher, sans y passer vos soirées.</h1>
          <p className="hero__lead">Sarah prépare vos devis, relance les impayés et repère les chantiers qui dérapent. Vous gardez la décision.</p>
          <div className="hero__actions">
            <ConversionLink className="button button--primary" href={buildWhatsAppUrl()} source="hero" target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Récupérer mes soirées
            </ConversionLink>
            <a className="button button--glass" href="#demo">Voir Atelier fonctionner <ArrowRight /></a>
          </div>
        </div>
        <div className="hero__proof">
          <div className="avatar-stack">
            {CASE_STUDIES.slice(0, 4).map((item) => <img key={item.id} src={item.portrait} alt="" width="48" height="48" />)}
          </div>
          <p><strong>Rejoignez les artisans qui ont repris la main.</strong><span>Temps, encours et marge mesurés sur le terrain, ensemble.</span></p>
        </div>
      </section>

      <ProofStrip />

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
        <div className="section-cta">
          <p><strong>Cinq angles morts couverts, une seule mémoire.</strong><br />Voyez ce que ça coûte et ce que ça vous rend.</p>
          <div>
            <a className="button button--primary" href="#tarifs">Reprendre mes soirées <ArrowRight aria-hidden="true" /></a>
            <ConversionLink className="button button--dark" href={buildWhatsAppUrl()} source="benefits" target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Gagner du temps
            </ConversionLink>
          </div>
        </div>
      </section>

      <section id="sarah" className="section phrase-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Ça commence par une phrase</p>
          <h2>Parlez comme sur le chantier.<br />Sarah comprend l'entreprise.</h2>
          <p>Elle ne part pas d'une page blanche : elle retrouve ce qui existe déjà dans Atelier. La preuve juste en dessous.</p>
        </div>
        <div className="phrase-orbit">
          <div className="orbit orbit--one" aria-hidden="true" />
          <div className="orbit orbit--two" aria-hidden="true" />
          <div className="context-chip context-chip--client"><span>Client</span>SCI du Parc</div>
          <div className="context-chip context-chip--catalogue"><span>Catalogue</span>Cloisons & finitions</div>
          <div className="context-chip context-chip--planning"><span>Planning</span>Démarrage · jeudi</div>
          <div className="context-chip context-chip--margin"><span>Marge cible</span>28 %</div>
          <div className="phrase-core">
            <div className="mic-button"><Mic /></div>
            <p>« Sarah, prépare le devis de la SCI du Parc pour les bureaux visités ce matin. »</p>
            <span>Transcription terminée · 8 secondes</span>
          </div>
        </div>
      </section>

      <Demo />

      <Pricing />

      <CaseCarousel />
      <div className="section belonging-cta">
        <div className="section-cta">
          <p><strong>Eux aussi hésitaient.</strong><br />Aujourd'hui ils ont retrouvé leurs soirées.<br />Rejoignez des artisans qui se sont rendu le temps.</p>
          <div>
            <ConversionLink className="button button--primary" href={buildWhatsAppUrl()} source="cases" target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Rejoindre ces artisans
            </ConversionLink>
            <a className="button button--dark" href="#tarifs">Retrouver mes soirées <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>

      <section className="section faq-section">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow">Les questions franches</p><h2>Avant de confier une partie du bureau à Sarah.</h2></div>
          <p>Pas de jargon, pas de ligne cachée.<br />Si votre cas est particulier, Samuel vous répond directement.</p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<ChevronDown /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="section-cta">
          <p><strong>Une question qui n'est pas dans la liste ?</strong> Samuel répond directement, sans script ni engagement.</p>
          <div>
            <ConversionLink className="button button--primary" href={buildWhatsAppUrl()} source="faq" target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Poser ma question
            </ConversionLink>
            <a className="button button--dark" href="#tarifs">Gagner du temps <ArrowRight aria-hidden="true" /></a>
          </div>
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
          <div className="hero__actions">
            <ConversionLink className="button button--primary" href={buildWhatsAppUrl()} source="closing" target="_blank" rel="noreferrer">
              Récupérer mes soirées <ArrowRight />
            </ConversionLink>
            <a className="button button--glass" href="#tarifs">Protéger ma marge <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
