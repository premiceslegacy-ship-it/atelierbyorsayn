import React from 'react';
import { MagicText } from './ui/magic-text';
import { ArrowRight } from 'lucide-react';

const quotes = [
  "Il est 22h. Je suis sur mon devis pendant que ma famille est dans la pièce d'à côté.",
  "J'ai une facture de 3 800 euros que je n'ai pas relancée depuis deux mois. Je ne sais même plus si le client a payé.",
  "Je travaille bien. Mes chantiers tournent. Mais à la fin de l'année, je ne comprends pas pourquoi il ne reste pas grand-chose.",
  "On m'a dit que la facturation électronique devient obligatoire en 2026. Je n'ai aucune idée de ce que ça change pour moi."
];

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title, not H2 */}
        <p className="text-xl md:text-2xl font-display font-medium text-white/90 mb-12 md:mb-16 tracking-tight">
          Ce que vous vivez, vous n'êtes pas le seul.
        </p>
        
        {/* Citations displayed with spacious paddings for individual focus */}
        <div className="divide-y divide-white/[0.03]">
          {quotes.map((quote, index) => (
            <div 
              key={index}
              className="min-h-[60vh] md:min-h-[85vh] py-12 flex items-center justify-center overflow-hidden"
            >
              <MagicText 
                text={`“${quote}”`} 
                className="text-[19px] sm:text-2xl md:text-3xl lg:text-[40px] font-body italic text-text-secondary leading-normal md:leading-relaxed max-w-full md:max-w-3xl mx-auto text-center"
                wordClassName="text-[19px] sm:text-2xl md:text-3xl lg:text-[40px] font-body italic text-text-secondary"
              />
            </div>
          ))}
        </div>

        {/* Beautiful, tactile high-fidelity CTA at the end of the citations block */}
        <div className="mt-16 md:mt-20 pt-16 border-t border-white/5 flex flex-col items-center justify-center">
          <p className="text-xl md:text-2xl font-display font-medium text-white/90 mb-8 max-w-2xl tracking-tight text-center">
            Assez de subir la paperasse ? <span className="block md:mt-1">Il est temps de reprendre vos soirées.</span>
          </p>
          <button
            onClick={() => document.getElementById('tarifs')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-row items-center justify-center md:justify-between gap-3 md:gap-6 bg-white text-bg-base font-display font-extrabold text-[12px] md:text-[15px] px-4 md:px-6 py-3.5 md:py-3 md:pr-2 rounded-xl border border-white border-b-[3px] md:border-b-[4px] border-b-neutral-300 hover:bg-neutral-50 active:translate-y-[3px] active:border-b-[1px] transition-all duration-100 cursor-pointer shadow-md w-full sm:w-auto"
          >
            <span className="text-center whitespace-nowrap">Récupérer mes soirées & week-ends</span>
            <div className="hidden md:flex w-8 h-8 md:w-9 md:h-9 rounded-lg bg-accent items-center justify-center text-bg-base shrink-0">
              <ArrowRight className="w-4 h-4 md:w-5 h-5 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
