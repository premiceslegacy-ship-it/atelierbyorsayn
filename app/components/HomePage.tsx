import { useContext, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Mic,
  Play,
  RefreshCw,
} from "lucide-react";
import {
  IconDevis,
  IconRelance,
  IconPointage,
  IconMarge,
  IconCalendrier,
  IconConformite,
  IconTresorerie,
  IconEquipe,
  IconPropose,
  IconApprend,
} from "./AtelierIcons";
import { getArticles } from "../lib/articles";
import { OpenLeadModalContext } from "../lib/leadModal";
import { buildWhatsAppUrl, FAQ_ITEMS } from "../data/site";
import { MarketProof } from "./MarketProof";
import { ProofStrip } from "./ProofStrip";
import { Pricing } from "./Pricing";
import { SiteShell } from "./Shell";
import { LeadCaptureModal } from "./LeadCaptureModal";
import { HOME_LEAD_CONFIG, SETUP_LEAD_CONFIG } from "../data/leadForms";

/** Bouton CTA WhatsApp de la home : ouvre la modale de capture au lieu d'un lien direct. */
function WhatsAppCta({ className, source, children }: { className: string; source: string; children: ReactNode }) {
  const openModal = useContext(OpenLeadModalContext);
  return (
    <button type="button" className={className} onClick={() => openModal(source)}>
      {children}
    </button>
  );
}

const benefits = [
  {
    icon: IconDevis,
    label: "Devis",
    title: "Répondez avant que le client appelle ailleurs.",
    copy: "Dictez le besoin sur place. Sarah retrouve vos prestations, prépare le document et vous laisse vérifier le prix.",
    metric: "1 min",
    metricLabel: "pour préparer un devis",
    className: "bento-card--wide bento-card--orange",
  },
  {
    icon: IconTresorerie,
    label: "Trésorerie",
    title: "Les relances partent. Pas votre énergie.",
    copy: "Les retards sont repérés, la relance est adaptée au client et l'historique reste visible.",
    metric: "45 → 12 j",
    metricLabel: "chez Marc D.",
  },
  {
    icon: IconMarge,
    label: "Marge",
    title: "Voyez le chantier déraper avant la fin.",
    copy: "Heures, achats et sous-traitance remontent dans une seule marge réelle.",
    metric: "+18 %",
    metricLabel: "de rentabilité nette",
    className: "bento-card--green",
  },
  {
    icon: IconCalendrier,
    label: "Planning",
    title: "Le bon compagnon, sur le bon chantier.",
    copy: "Planning, absences, urgences et informations terrain restent synchronisés.",
    metric: "1 vue",
    metricLabel: "pour toute l'équipe",
  },
  {
    icon: IconConformite,
    label: "Conformité",
    title: "Préparez 2026 et 2027 sans subir la réforme.",
    copy: "Chaque facture part déjà au format réglementaire. La connexion à une plateforme agréée est incluse, sans surcoût.",
    metric: "Factur-X",
    metricLabel: "inclus, sans supplément",
    className: "bento-card--wide bento-card--indigo",
  },
];

const demoSteps = [
  { label: "Vous parlez", note: "Depuis le chantier, sans formulaire à rallonge.", duration: 5200 },
  { label: "Sarah retrouve", note: "L'historique du client, pas une relance générique.", duration: 6200 },
  { label: "Elle rédige", note: "Le ton reste le vôtre, ferme mais correct.", duration: 7200 },
  { label: "Vous validez", note: "Sarah programme la suite. Le dernier mot reste le vôtre.", duration: 6800 },
];

const demoContext = [
  { label: "Client pro", value: "Dupont Immobilier", detail: "Client depuis 2023" },
  { label: "Facture", value: "FAC-2026-087", detail: "Échue depuis 18 jours" },
  { label: "Montant", value: "4 250 €", detail: "Solde restant dû" },
  { label: "Historique", value: "0 retard", detail: "Toujours réglé à temps avant" },
];

const demoRelance = {
  invoice: "FAC-2026-087",
  amount: "4 250 €",
  overdue: "18 jours de retard",
  message: "Bonjour, votre facture FAC-2026-087 de 4 250 € est échue depuis le 12 août. Pourriez-vous programmer le règlement cette semaine ? Merci, l'équipe.",
  followUp: "Relance automatique programmée dans 7 jours si le paiement n'arrive pas.",
};

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
        <p>Elle connaît vos clients, vos factures, vos échéances.<br />Regardez-la relancer un impayé en 60 secondes.</p>
      </div>
      <ul className="demo-sarah-strip">
        <li><IconPropose aria-hidden="true" />Propose l'action et explique pourquoi.</li>
        <li><IconApprend aria-hidden="true" />Apprend du contexte validé dans Atelier.</li>
        <li><IconConformite aria-hidden="true" />Attend votre accord avant les actions sensibles.</li>
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
          <div className="demo-phone__top"><img src="/icon_meta-48.png" alt="" width="22" height="22" /> Atelier · Sarah <span className="status-dot" /></div>
          <div className="demo-conversation demo-conversation--sim" key={started ? active : "idle"}>
            {!started && (
              <div className="demo-idle">
                <div className="demo-idle-scene" aria-hidden="true">
                  <div className="demo-idle-invoice">
                    <IconDevis aria-hidden="true" className="demo-idle-invoice__icon" />
                    <span>FAC-2026-087</span>
                    <b>18 j</b>
                  </div>
                  <div className="demo-idle-track">
                    <i />
                  </div>
                  <div className="demo-idle-bell"><IconRelance className="demo-idle-bell__icon" /></div>
                </div>
                <p className="demo-prompt">Une vraie relance, prête avant que vous y pensiez.</p>
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
                <p className="demo-prompt demo-stagger" style={{ animationDelay: "0.9s" }}>« Sarah, regarde si Dupont Immobilier a payé sa dernière facture. »</p>
              </>
            )}
            {started && active === 1 && (
              <>
                <div className="demo-sarah-line demo-stagger"><span className="sarah-orb sarah-orb--mini">
                  <picture>
                    <source srcSet="/sarah-avatar-144.avif" type="image/avif" />
                    <img src="/sarah-avatar-144.webp" alt="" width="144" height="144" />
                  </picture>
                </span><p>Je retrouve la facture et son historique…</p></div>
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
                <div className="demo-doc__head"><strong>{demoRelance.invoice}</strong><span className="demo-doc__overdue">{demoRelance.overdue}</span></div>
                <div className="demo-doc__message demo-stagger" style={{ animationDelay: "0.6s" }}>{demoRelance.message}</div>
                <div className="demo-doc__total demo-stagger" style={{ animationDelay: "2.8s" }}>
                  <span>Solde dû</span><strong>{demoRelance.amount}</strong>
                </div>
                <div className="demo-doc__badge demo-stagger" style={{ animationDelay: "3.6s" }}>Ton ajusté au client, pas de mise en demeure</div>
              </div>
            )}
            {started && active === 3 && !sent && (
              <>
                <div className="demo-doc demo-doc--compact demo-stagger">
                  <div className="demo-doc__head"><strong>{demoRelance.invoice}</strong><span>{demoRelance.amount} · prêt à partir</span></div>
                  <div className="demo-doc__line"><span>Relu par Sarah, rien d'envoyé</span><strong>✓</strong></div>
                </div>
                <button className="demo-validate demo-stagger" style={{ animationDelay: "0.8s" }} type="button" onClick={() => setSent(true)}><Check aria-hidden="true" /> Valider l'envoi</button>
              </>
            )}
            {started && active === 3 && sent && (
              <div className="demo-sent">
                <div className="demo-sent__check"><Check aria-hidden="true" /></div>
                <p className="demo-prompt">Relance envoyée à Dupont Immobilier.</p>
                <p className="demo-note">{demoRelance.followUp}</p>
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
          <div><IconEquipe /> <span><strong>Dupont Immobilier</strong>Client pro depuis 2023</span></div>
          <div><IconDevis /> <span><strong>{demoRelance.invoice}</strong>{demoRelance.overdue}</span></div>
          <div><IconTresorerie /> <span><strong>{demoRelance.amount}</strong>Solde restant dû</span></div>
        </div>
      </div>
      <div className="demo-cta">
        <p>Sarah est prête. Il ne manque que votre entreprise.</p>
        <div>
          <a className="button button--primary" href="#tarifs">Gagner du temps <ArrowRight aria-hidden="true" /></a>
          <WhatsAppCta className="button button--glass" source="demo">
            <MessageCircle aria-hidden="true" /> Poser une question
          </WhatsAppCta>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ structuredData }: { structuredData?: ReactNode }) {
  const articles = getArticles().slice(0, 3);
  const [leadModalSource, setLeadModalSource] = useState<string | null>(null);
  const isSetupLead = leadModalSource?.endsWith("-done-for-you") ?? false;
  const whatsappUrl = buildWhatsAppUrl(undefined, leadModalSource ?? "site");

  return (
    <OpenLeadModalContext.Provider value={setLeadModalSource}>
      <SiteShell darkHeader onWhatsAppClick={() => setLeadModalSource("navbar")}>
        {structuredData}
        <HomeContent articles={articles} />
        <LeadCaptureModal
          open={leadModalSource !== null}
          onClose={() => setLeadModalSource(null)}
          whatsappUrl={whatsappUrl}
          config={isSetupLead ? SETUP_LEAD_CONFIG : HOME_LEAD_CONFIG}
          trackingSource={leadModalSource ? `home-${leadModalSource}` : ""}
        />
      </SiteShell>
    </OpenLeadModalContext.Provider>
  );
}

function HomeContent({ articles }: { articles: ReturnType<typeof getArticles> }) {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Le logiciel de gestion des artisans du BTP</p>
          <h1>Je récupère 10 h et <em>18 % de marge</em> chaque mois.</h1>
          <p className="hero__lead">Je prépare mes devis, mes relances et mon suivi de marge automatiquement pendant que je suis sur le chantier. Je garde la décision, pas les heures de paperasse le soir.</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#tarifs">Récupérer mes 10 heures <ArrowRight aria-hidden="true" /></a>
          </div>
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
            <WhatsAppCta className="button button--dark" source="benefits">
              <MessageCircle aria-hidden="true" /> Gagner du temps
            </WhatsAppCta>
          </div>
        </div>
      </section>

      <section id="sarah" className="section phrase-section">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Ça commence par une phrase</p>
          <h2>Parlez comme sur le chantier.<br />Sarah comprend l'entreprise.</h2>
          <p>Elle ne part pas d'une page blanche : elle retrouve ce qui existe déjà dans Atelier. La preuve juste en dessous.</p>
        </div>
        <div className="flow-diagram">
          <svg className="flow-diagram__lines" viewBox="0 0 1040 420" preserveAspectRatio="none" aria-hidden="true">
            <path className="flow-line" d="M 220 210 H 420" />
            <path className="flow-line flow-line--pulse flow-line--pulse-1" pathLength="100" d="M 220 210 H 420" />
            <path className="flow-line" d="M 620 210 H 680 Q 700 210 700 192 V 133 Q 700 115 720 115 H 820" />
            <path className="flow-line flow-line--pulse flow-line--pulse-2" pathLength="100" d="M 620 210 H 680 Q 700 210 700 192 V 133 Q 700 115 720 115 H 820" />
            <path className="flow-line" d="M 620 210 H 680 Q 700 210 700 192 V 196 Q 700 178 720 178 H 820" />
            <path className="flow-line flow-line--pulse flow-line--pulse-2" pathLength="100" d="M 620 210 H 680 Q 700 210 700 192 V 196 Q 700 178 720 178 H 820" />
            <path className="flow-line" d="M 620 210 H 680 Q 700 210 700 228 V 224 Q 700 242 720 242 H 820" />
            <path className="flow-line flow-line--pulse flow-line--pulse-2" pathLength="100" d="M 620 210 H 680 Q 700 210 700 228 V 224 Q 700 242 720 242 H 820" />
            <path className="flow-line" d="M 620 210 H 680 Q 700 210 700 228 V 287 Q 700 305 720 305 H 820" />
            <path className="flow-line flow-line--pulse flow-line--pulse-2" pathLength="100" d="M 620 210 H 680 Q 700 210 700 228 V 287 Q 700 305 720 305 H 820" />
          </svg>
          <div className="flow-diagram__grid">
            <div className="flow-node flow-node--input">
              <div className="mic-button"><Mic /></div>
              <p>« Sarah, prépare le devis de la SCI du Parc pour les bureaux visités ce matin. »</p>
              <span>Transcription terminée · 8 secondes</span>
            </div>
            <div className="flow-node flow-node--core">
              <picture>
                <source srcSet="/sarah-avatar-144.avif" type="image/avif" />
                <img src="/sarah-avatar-144.webp" alt="Sarah, l'assistante IA d'Atelier" width="144" height="144" />
              </picture>
            </div>
            <div className="flow-node__outputs">
              <div className="flow-node flow-node--output"><IconDevis className="flow-node__icon" /><span>Devis PDF</span></div>
              <div className="flow-node flow-node--output"><IconRelance className="flow-node__icon" /><span>Relance</span></div>
              <div className="flow-node flow-node--output"><IconPointage className="flow-node__icon" /><span>Pointage</span></div>
              <div className="flow-node flow-node--output"><IconMarge className="flow-node__icon" /><span>Marge</span></div>
            </div>
          </div>
        </div>
      </section>

      <Demo />

      <Pricing />

      <MarketProof
        actions={
          <>
            <a className="button button--primary" href="#tarifs">Retrouver mes soirées <ArrowRight aria-hidden="true" /></a>
            <WhatsAppCta className="button button--dark" source="cases">
              <MessageCircle aria-hidden="true" /> Voir Atelier en action
            </WhatsAppCta>
          </>
        }
      />

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
            <a className="button button--primary" href="#tarifs">Gagner du temps <ArrowRight aria-hidden="true" /></a>
            <WhatsAppCta className="button button--dark" source="faq">
              <MessageCircle aria-hidden="true" /> Poser ma question
            </WhatsAppCta>
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
            <a className="button button--primary" href="#tarifs">Protéger ma marge <ArrowRight aria-hidden="true" /></a>
            <WhatsAppCta className="button button--glass" source="closing">
              Récupérer mes soirées <ArrowRight />
            </WhatsAppCta>
          </div>
        </div>
      </section>
    </main>
  );
}
