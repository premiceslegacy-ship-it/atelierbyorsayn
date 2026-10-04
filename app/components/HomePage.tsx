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
  { label: "Vous dictez", note: "Après la visite, en une minute. Pas de formulaire à remplir le soir.", duration: 6800 },
  { label: "Sarah passe le relais", note: "Elle retrouve la cliente et transmet le brief à Chloé.", duration: 6200 },
  { label: "Chloé chiffre", note: "Chaque ligne indique d'où vient son prix. Les estimations sont signalées.", duration: 8600 },
  { label: "Vous vérifiez", note: "Vous relisez, vous corrigez, et c'est vous qui envoyez.", duration: 6800 },
];

const demoDictation = "Chez Mme Lefèvre à Villeurbanne, salle de bain de 6 m². Je dépose la baignoire et l'ancien carrelage, je pose une douche italienne 90 par 120, carrelage 60 par 60 au sol, faïence sur 14 m², un meuble vasque, un sèche-serviettes, la mise aux normes de l'électricité et la peinture du plafond.";

const demoContext = [
  { label: "Cliente", value: "Mme Lefèvre", detail: "Cliente depuis 2024" },
  { label: "Chantier", value: "Salle de bain, 6 m²", detail: "Villeurbanne, logement de plus de 2 ans" },
  { label: "Prix", value: "Catalogue + anciens devis", detail: "Les sources de Chloé" },
  { label: "TVA", value: "10 % proposée", detail: "Rénovation, à vérifier à l'écran" },
];

/** Postes du devis (total HT 6 064 €, TVA 10 % soit 6 670,40 € TTC). Les étiquettes reprennent les sources réelles de Chloé : catalogue, devis précédents, estimation. */
const demoQuote = {
  reference: "Salle de bain Lefèvre",
  lines: [
    { label: "Dépose baignoire, carrelage, évacuation", amount: "780 €", source: "Devis précédent", tone: "ok" },
    { label: "Douche italienne 90 × 120", amount: "1 450 €", source: "Catalogue", tone: "ok" },
    { label: "Meuble vasque et sèche-serviettes", amount: "1 200 €", source: "Catalogue", tone: "ok" },
    { label: "Carrelage sol, faïence 14 m², étanchéité", amount: "1 862 €", source: "Catalogue", tone: "ok" },
    { label: "Mise aux normes électricité", amount: "640 €", source: "Estimé, à vérifier", tone: "warn" },
    { label: "Peinture du plafond", amount: "132 €", source: "Devis précédent", tone: "ok" },
  ],
  totalHt: "6 064 € HT",
  totalTtc: "6 670,40 € TTC",
  warning: "1 prix estimé, signalé pour relecture",
  followUp: "Vous êtes prévenu dès qu'elle signe, depuis son téléphone.",
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
        <p className="eyebrow">Sarah et Chloé, assistantes IA métier</p>
        <h2>Sarah travaille.<br />Vous décidez.</h2>
        <p>Le devis détaillé se rédige souvent le soir, après le chantier.<br />Voici comment Sarah et Chloé le préparent à votre place.</p>
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
                    <Mic aria-hidden="true" className="demo-idle-invoice__icon" />
                    <span>Visite dictée</span>
                    <b>0:24</b>
                  </div>
                  <div className="demo-idle-track">
                    <i />
                  </div>
                  <div className="demo-idle-bell"><IconDevis className="demo-idle-bell__icon" /></div>
                </div>
                <p className="demo-prompt">Une visite dictée, un devis détaillé prêt à relire.</p>
                <p className="demo-note">Quatre étapes. Rien ne part sans votre validation.</p>
                <button className="demo-validate" type="button" onClick={() => goTo(0)}><Play aria-hidden="true" /> Lancer la démonstration</button>
              </div>
            )}
            {started && active === 0 && (
              <>
                <div className="demo-bubble demo-bubble--user demo-stagger" style={{ animationDelay: "0.2s" }}>
                  <div className="demo-wave" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.08}s` }} />)}</div>
                  <span>0:24</span>
                </div>
                <p className="demo-transcript demo-stagger" style={{ animationDelay: "0.9s" }}>« {demoDictation} »</p>
              </>
            )}
            {started && active === 1 && (
              <>
                <div className="demo-sarah-line demo-stagger"><span className="sarah-orb sarah-orb--mini">
                  <picture>
                    <source srcSet="/sarah-avatar-144.avif" type="image/avif" />
                    <img src="/sarah-avatar-144.webp" alt="" width="144" height="144" />
                  </picture>
                </span><p>Mme Lefèvre est dans vos clients. Je transmets le brief à Chloé.</p></div>
                <div className="demo-chips">
                  {demoContext.map((chip, index) => (
                    <div className="demo-chip demo-stagger" style={{ animationDelay: `${0.7 + index * 0.6}s` }} key={chip.label}>
                      <span>{chip.label}</span><strong>{chip.value}</strong><small>{chip.detail}</small>
                    </div>
                  ))}
                </div>
              </>
            )}
            {started && active === 2 && (
              <>
                <div className="demo-sarah-line demo-stagger"><span className="sarah-orb sarah-orb--mini">
                  <img src="/chloe-avatar-144.webp" alt="" width="144" height="144" />
                </span><p>Chloé prépare les lignes à partir de votre catalogue et de vos anciens devis.</p></div>
                <div className="demo-doc demo-doc--quote demo-stagger" style={{ animationDelay: "0.5s" }}>
                  <div className="demo-doc__head"><strong>{demoQuote.reference}</strong><span>9 lignes</span></div>
                  {demoQuote.lines.map((line, index) => (
                    <div className="demo-doc__line demo-doc__line--quote demo-stagger" style={{ animationDelay: `${1.1 + index * 0.55}s` }} key={line.label}>
                      <span>{line.label}<em className={`demo-source demo-source--${line.tone}`}>{line.source}</em></span>
                      <strong>{line.amount}</strong>
                    </div>
                  ))}
                  <div className="demo-doc__total demo-stagger" style={{ animationDelay: "4.6s" }}>
                    <span>Total</span><strong>{demoQuote.totalHt}</strong>
                  </div>
                  <div className="demo-doc__badge demo-doc__badge--warn demo-stagger" style={{ animationDelay: "5.4s" }}>{demoQuote.warning}</div>
                </div>
              </>
            )}
            {started && active === 3 && !sent && (
              <>
                <div className="demo-doc demo-doc--compact demo-stagger">
                  <div className="demo-doc__head"><strong>{demoQuote.reference}</strong><span>{demoQuote.totalTtc} · prêt à partir</span></div>
                  <div className="demo-doc__line"><span>Lignes et sources relues</span><strong>✓</strong></div>
                  <div className="demo-doc__line"><span>Prix estimé confirmé par vous</span><strong>✓</strong></div>
                </div>
                <button className="demo-validate demo-stagger" style={{ animationDelay: "0.8s" }} type="button" onClick={() => setSent(true)}><Check aria-hidden="true" /> Envoyer le devis</button>
              </>
            )}
            {started && active === 3 && sent && (
              <div className="demo-sent">
                <div className="demo-sent__check"><Check aria-hidden="true" /></div>
                <p className="demo-prompt">Devis envoyé à Mme Lefèvre.</p>
                <p className="demo-note">PDF et lien de signature en ligne. {demoQuote.followUp}</p>
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
          <div><IconEquipe /> <span><strong>Mme Lefèvre</strong>Cliente depuis 2024</span></div>
          <div><IconDevis /> <span><strong>Salle de bain, 6 m²</strong>Villeurbanne, logement de plus de 2 ans</span></div>
          <div><IconApprend /> <span><strong>Vos anciens devis</strong>Chloé y retrouve vos prix</span></div>
        </div>
      </div>
      <div className="demo-cta">
        <p>Sarah et Chloé sont prêtes. Il ne manque que votre entreprise.</p>
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
