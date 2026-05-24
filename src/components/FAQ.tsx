import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Atelier fonctionne pour quel type d’artisan ?",
      a: "Atelier est conçu pour les artisans du second œuvre BTP qui dirigent une structure de 1 à 15 personnes : électricité, plomberie, CVC, menuiserie, tôlerie, peinture, plâtrerie, plaquiste, maçonnerie et paysagisme.",
    },
    {
      q: "Est-ce que je dois installer quelque chose sur mon téléphone ?",
      a: "Non. Atelier fonctionne depuis votre navigateur sur téléphone, tablette ou ordinateur. Pas d’application à télécharger, pas de logiciel à installer.",
    },
    {
      q: "Combien de temps pour être opérationnel ?",
      a: "48 heures en moyenne. On démarre par un appel de setup, on installe votre environnement. Vous vous connectez et vous prenez la main.",
    },
    {
      q: "La facturation électronique est-elle obligatoire pour les artisans en 2026 ?",
      a: "Oui. À partir du 1er septembre 2026, toutes les entreprises françaises, y compris les artisans et micro-entrepreneurs, doivent pouvoir recevoir des factures électroniques au format structuré. Atelier génère nativement le format Factur-X requis.",
    },
    {
      q: "En quoi Atelier est différent des autres logiciels de gestion pour artisans ?",
      a: "La plupart des logiciels du marché résolvent soit la facturation, soit la gestion de chantier, mais rarement les deux, et encore moins depuis un téléphone. Atelier combine ces usages en un seul outil, pilotable en mobilité, avec un agent WhatsApp intégré pour les mises à jour terrain en temps réel. C'est aussi la seule solution qui propose une offre sans abonnement donnant accès à toutes les fonctionnalités de l'application.",
    },
    {
      q: "Comment fonctionnent les relances automatiques ?",
      a: "Chaque matin, Atelier identifie les factures en retard et les devis sans réponse. Les relances sont rédigées automatiquement et envoyées par email selon les échéances définies.",
    },
    {
      q: "Que se passe-t-il si je dépasse mon quota mensuel ?",
      a: "La fonctionnalité est mise en pause jusqu’au renouvellement du quota le 1er du mois suivant, avec un message clair dans l’application. Le passage à l’offre supérieure se fait en 24h.",
    },
  ];

  return (
    <section id="faq" className="px-4 md:px-6 py-20 pb-28 scroll-mt-20">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-display text-accent uppercase tracking-[0.08em] font-extrabold block mb-3">Réponses Directes</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-text-secondary font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Tout ce qu'un artisan BTP doit savoir avant de configurer sa solution d'entreprise mobile-first.
          </p>
        </div>

        {/* Accordion Questions container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-bg-surface border-white/15 shadow-glass" 
                    : "bg-[#0c0c10] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5.5 flex items-center justify-between gap-4 font-display font-bold text-sm md:text-base text-white hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-4.5 h-4.5 shrink-0 transition-colors duration-300 ${isOpen ? "text-accent" : "text-text-secondary"}`} />
                    <span>{faq.q}</span>
                  </div>
                  <div className="shrink-0 p-1 bg-white/5 border border-white/5 rounded-lg text-text-secondary">
                    {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                  </div>
                </button>

                {/* Animated collapse logic */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-72 opacity-100 border-t border-white/5" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 py-5 text-xs md:text-[14px] leading-relaxed text-text-secondary font-body select-text">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
