import { useState } from "react";
import { ArrowRight, HelpCircle, Minus, Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Atelier fonctionne pour quel type d'artisan ?",
      a: "Atelier est conçu pour les artisans du second œuvre BTP et les petites équipes de 1 à 15 personnes : électricité, plomberie, CVC, menuiserie, tôlerie, peinture, plâtrerie, maçonnerie, paysagisme et métiers proches.",
    },
    {
      q: "Qu'est-ce que je gagne concrètement ?",
      a: "Le bénéfice principal est le temps récupéré : jusqu'à 15h par semaine selon votre volume administratif. Par extension, vous relancez plus vite, vous encaissez mieux et vous voyez la rentabilité de vos chantiers avant qu'il soit trop tard.",
    },
    {
      q: "Est-ce que je dois installer une application ?",
      a: "Non. Atelier fonctionne dans le navigateur sur téléphone, tablette et ordinateur. Vos équipes peuvent accéder aux fonctions utiles via un lien sécurisé, sans installation compliquée.",
    },
    {
      q: "Combien de temps pour être opérationnel ?",
      a: "48 heures en moyenne. On démarre par un appel, on configure votre instance, vos accès et les bases de votre activité. Vous prenez ensuite la main sur un environnement déjà prêt.",
    },
    {
      q: "Pourquoi payer un setup au départ ?",
      a: "Le setup finance l'installation de votre infrastructure dédiée, la configuration de votre environnement, la mise en production et l'accompagnement de démarrage. Vous ne louez pas un compte générique noyé dans une plateforme commune.",
    },
    {
      q: "Suis-je obligé de prendre un abonnement IA ?",
      a: "Non. L'offre sans abonnement IA donne accès à l'application métier : devis, factures, chantiers, pointage, exports et Factur-X. Les abonnements IA servent à automatiser davantage et à gagner plus de temps.",
    },
    {
      q: "L'abonnement est-il engageant ?",
      a: "Non. L'abonnement IA est sans engagement minimum et résiliable avec 30 jours de préavis, conformément aux CGV.",
    },
    {
      q: "Mes données m'appartiennent-elles ?",
      a: "Oui. Votre environnement est isolé et vos données restent les vôtres. L'objectif est de vous donner un outil de travail clair, réversible et exploitable pour votre entreprise.",
    },
    {
      q: "Comment fonctionnent les relances automatiques ?",
      a: "Atelier repère les factures en retard et les devis sans réponse. Les relances peuvent être préparées et envoyées selon vos règles, avec un ton professionnel, sans appel gênant à passer.",
    },
    {
      q: "La facturation électronique est-elle gérée ?",
      a: "Oui. Atelier génère nativement vos factures au format Factur-X. L'option conformité ajoute la connexion de vos flux au réseau légal via partenaire PDP lorsque vous voulez aller plus loin.",
    },
    {
      q: "Quelle est la différence entre Factur-X, OD et PDP ?",
      a: "Atelier génère le fichier Factur-X et agit comme opérateur de dématérialisation. Pour la transmission réglementaire via une plateforme immatriculée PDP, l'option conformité s'appuie sur un partenaire adapté.",
    },
  ];

  return (
    <section id="faq" className="px-4 md:px-6 py-20 pb-28 scroll-mt-20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] font-display text-accent uppercase tracking-[0.08em] font-extrabold block mb-3">
            Réponses directes
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pas de mauvaise surprise avant de choisir.
          </h2>
          <p className="text-text-secondary font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Prix, données, engagement, conformité : vous savez exactement où vous mettez les pieds.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? "bg-bg-surface border-white/15 shadow-glass" : "bg-[#0c0c10] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 md:px-6 py-5 flex items-center justify-between gap-4 font-display font-bold text-sm md:text-base text-white hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-4.5 h-4.5 shrink-0 transition-colors duration-300 ${isOpen ? "text-accent" : "text-text-secondary"}`} />
                    <span>{faq.q}</span>
                  </div>
                  <div className="shrink-0 p-1 bg-white/5 border border-white/5 rounded-lg text-text-secondary">
                    {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                  </div>
                </button>

                <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 border-t border-white/5" : "max-h-0 opacity-0"}`}>
                  <div className="px-5 md:px-6 py-5 text-xs md:text-[14px] leading-relaxed text-text-secondary font-body select-text">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#14141a] to-[#0d0d10] p-6 text-center shadow-[0_8px_0_0_#000,0_8px_0_1px_rgba(255,255,255,0.05),0_18px_34px_rgba(0,0,0,0.65)]">
          <p className="font-display text-xl md:text-2xl font-black text-white">
            Prêt à choisir l'offre la plus simple pour votre boîte ?
          </p>
          <button
            onClick={() => document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-5 group flex items-center justify-center gap-3 rounded-xl border border-white border-b-[3px] border-b-neutral-300 bg-white px-5 py-3 font-display text-sm font-extrabold text-bg-base shadow-md transition-all duration-100 hover:bg-neutral-50 active:translate-y-[3px] active:border-b-[1px] md:border-b-[4px] md:px-6"
          >
            <span>Voir les offres</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
