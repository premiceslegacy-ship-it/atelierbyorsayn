import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "En combien de temps mon compte Atelier est-il opérationnel ?",
      a: "En moins de 48 heures. Notre équipe Orsayn se charge de configurer votre interface selon votre métier (gros œuvre, électricité, plomberie, menuiserie, etc.) et importe vos premiers fichiers d'anciens devis ou listes de tarifs matériaux pour que tout soit prêt dès le premier jour.",
    },
    {
      q: "Dois-je installer un logiciel complexe sur mon ordinateur ?",
      a: "Aucun logiciel à installer ni à mettre à jour. Atelier est une application métier mobile-first accessible instantanément via un simple navigateur web sécurisé sur votre téléphone, votre tablette ou votre ordinateur. L'interface se comporte comme une application native fluide.",
    },
    {
      q: "Est-ce difficile d'importer mes catalogues ou anciens clients ?",
      a: "C’est l'avantage de la configuration clé en main par Orsayn. Vous nous envoyez vos fichiers Excel, PDF ou extraits comptables existants, et notre équipe technique les nettoie et les organise pour les intégrer directement dans votre cockpit Atelier sans action complexe de votre part.",
    },
    {
      q: "Comment fonctionne la relance automatique des factures en retard ?",
      a: "Une facture dépasse la date d'échéance définie ? Atelier prépare automatiquement un pack de relance poli par SMS ou email de rappel. Vous visualisez la relance dans votre espace de suivi prioritaire et déterminez si vous souhaitez l'ajuster ou la faire partir automatiquement. Pas de coups de fil embarrassants nécessaires.",
    },
    {
      q: "Puis-je suivre mes ouvriers ou collègues sur les chantiers ?",
      a: "Absolument. Atelier intègre un module de pointage et de feuilles d'heures mobiles ultra-épuré. Vos techniciens ou ouvriers sur le terrain peuvent saisir leurs heures et leurs notes de chantier en 3 secondes depuis leur mobile. Vous centralisez tout instantanément pour valider les fiches de paye.",
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
