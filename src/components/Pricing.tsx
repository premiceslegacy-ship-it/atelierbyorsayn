import { useState, useRef } from "react";
import { Check, MessageCircle, FileText, Cpu, CheckCircle2, HelpCircle, ChevronRight, ChevronLeft } from "lucide-react";

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState<"none" | "starter" | "pro" | "expert">("expert");
  const [hasEinvoicing, setHasEinvoicing] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const mrrTiers = [
    {
      id: "none",
      name: "Sans abonnement IA",
      price: 0,
      desc: "L'application métier robuste en toute autonomie. L'intelligence artificielle est désactivée.",
      features: [
        "Base de données privée et isolée",
        "Génération PDF & XML (Factur-X) incluse",
        "Gestion complète des chantiers, plannings et devis",
        "Outils de pointage équipe de base"
      ]
    },
    {
      id: "starter",
      name: "Starter",
      price: 39,
      desc: "Toutes les IA intégrées à l'application pour automatiser votre quotidien (sans l'agent WhatsApp).",
      features: [
        "Pour l'artisan qui veut que l'IA s'occupe du quotidien sans y penser.",
        "Quotas calibrés pour 1 personne active."
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: 69,
      originalPrice: 89,
      desc: "Tout le pack Starter avec des quotas doublés, plus un agent réactif (bientôt disponible sur WhatsApp).",
      features: [
        "Pour l'artisan très actif ou la petite équipe.",
        "Quotas doublés à triplés sur toutes les features."
      ]
    },
    {
      id: "expert",
      name: "Expert",
      price: 119,
      originalPrice: 149,
      desc: "L'assistant analytique expert. Il met en évidence en un clic les urgences sur vos chantiers et votre trésorerie.",
      features: [
        "Toutes les features sans aucune limite.",
        "Pour ceux qui veulent que l'IA travaille autant qu'eux."
      ]
    }
  ];

  // Pricing calculation based on user requested pricing matrix:
  // Setup (one-shot, livraison complète en production):
  // - with MRR (selectedTier !== "none"):
  //   - App seule: 800€
  //   - App + WA (forced if selectedTier is pro/expert): 1200€
  //   - App + Elec: 1000€
  //   - App + WA + Elec: 1500€
  // - without MRR (selectedTier === "none"):
  //   - App seule: 1500€
  //   - App + WA: 2200€
  //   - App + Elec: 1900€
  //   - App + WA + Elec: 2800€

  const isMrr = selectedTier !== "none";
  const hasWhatsApp = selectedTier === "pro" || selectedTier === "expert";

  // Compute exact delivery / setup price matching user's grid:
  const getSetupPrice = () => {
    let basePrice = 1500;
    if (isMrr) {
      basePrice = 800;
    } else {
      basePrice = 1500;
    }
    return basePrice + (hasEinvoicing ? 450 : 0);
  };

  const setupPrice = getSetupPrice();
  
  // Format setup description name
  const getSetupName = () => {
    if (hasEinvoicing) return "App + Facturation élec.";
    return "App seule";
  };

  const setupName = getSetupName();
  const selectedTierData = mrrTiers.find(t => t.id === selectedTier)!;

  const generateWhatsAppMessage = () => {
    let msg = `Bonjour Samuel, je souhaite configurer mon environnement Atelier :\n\n`;
    msg += `- Configuration initiale : ${setupName} (${setupPrice}€ HT)\n`;
    if (isMrr) {
      msg += `- Abonnement mensuel : Pack ${selectedTierData.name} (${selectedTierData.price}€ HT/mois)\n`;
      if (selectedTierData.id === 'pro' || selectedTierData.id === 'expert') {
        msg += `(incluant les fonctionnalités WhatsApp dès leur disponibilité)\n`;
      }
    } else {
      msg += `- Abonnement mensuel : Aucun\n`;
    }
    if (hasEinvoicing) {
      msg += `- Option facturation : Dépôt automatique PDP (à partir de 450€ HT la 1ère année)\n`;
    }
    msg += `\nPouvons-nous planifier un appel de démarrage ?`;
    return encodeURIComponent(msg);
  };

  const phone = "33651664068"; 
  const waLink = `https://wa.me/${phone}?text=${generateWhatsAppMessage()}`;

  return (
    <section id="tarifs" className="px-3 md:px-6 py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden scroll-mt-20">
      
      {/* Background soft design accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] font-extrabold block mb-4">
            Prix et modalités de service
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Votre tarification en toute transparence
          </h2>
          <p className="text-text-secondary font-body text-base max-w-2xl mx-auto leading-relaxed">
            Sélectionnez vos options ci-dessous. Votre configuration technique s'ajuste en temps réel. Pas d'engagement de durée, vous restez propriétaire absolu de toutes vos données d'entreprise.
          </p>
        </div>

        {/* Step-by-Step interactive selector flow */}
        <div className="space-y-8 md:space-y-12">
          
          {/* STEP 1: AI Subscription selection */}
          <div className="bg-white/[0.01] border border-white/10 p-5 md:p-8 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)] backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-xl bg-accent flex items-center justify-center text-black font-display font-black text-lg border border-accent border-b-[4px] border-b-[#15803d] shadow-[0_4px_12px_rgba(74,222,128,0.4)]">
                  1
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-white leading-tight">
                    Niveau d'intelligence artificielle
                  </h3>
                  <p className="text-xs text-text-secondary mt-1.5 md:mt-1 font-body">
                    Choisissez l'intensité de l'IA embarquée au quotidien.
                  </p>
                </div>
              </div>
              
              {/* Mobile scroll hints */}
              <div className="flex md:hidden items-center gap-2 mt-2">
                <button onClick={scrollLeft} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 active:bg-white/10">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={scrollRight} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 active:bg-white/10">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 pt-4 pb-6 md:pb-0 md:pt-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5"
            >
              {mrrTiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id as any)}
                    className={`cursor-pointer text-left py-6 px-5 rounded-2xl border transition-all duration-300 flex flex-col w-[85vw] max-w-[320px] md:w-auto shrink-0 snap-center relative group ${
                      isSelected
                        ? "bg-gradient-to-b from-[#1b1d28] to-[#12131a] border-accent/60 shadow-[0_8px_30px_rgba(180,244,129,0.12),inset_0_2px_4px_rgba(255,255,255,0.1)] ring-1 ring-accent/30"
                        : "bg-gradient-to-b from-[#12131a] to-[#0a0a0f] border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.1)]"
                    }`}
                  >
                    {/* Selected state indicator badge */}
                    {isSelected && (
                      <span className="absolute top-3 right-3 text-[10px] font-display font-semibold select-none bg-accent/10 border border-accent/30 text-accent px-2 py-0.5 rounded-full">
                        Actif
                      </span>
                    )}

                    <div className="mb-4">
                      <div className="font-display font-medium text-xs text-text-secondary uppercase tracking-wider mb-1">
                        Formule
                      </div>
                      <h4 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors">
                        {tier.name}
                      </h4>
                    </div>

                    <div className="mb-4 pt-1 flex items-end gap-2">
                      <div>
                        {tier.originalPrice && (
                          <span className="font-display text-base md:text-lg font-bold text-white/30 line-through block -mb-1">{tier.originalPrice}€</span>
                        )}
                        <span className="font-display text-3xl font-black text-white">{tier.price}€</span>
                        <span className="text-[11px] text-text-secondary"> / mois HT</span>
                      </div>
                    </div>

                    <p className="text-xs md:text-[12.5px] text-text-secondary leading-relaxed mb-6 border-b border-white/5 pb-4 min-h-[40px] md:min-h-[50px]">
                      {tier.desc}
                    </p>

                    <ul className="space-y-2.5 mt-auto">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="text-xs md:text-[11.5px] text-white/80 flex items-start gap-2 leading-relaxed">
                          <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSelected ? "text-accent stroke-[3]" : "text-white/20"}`} />
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: PDP Network option */}
          <div className="bg-white/[0.01] border border-white/10 p-5 md:p-8 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.01)] backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6 text-center md:text-left">
              <div className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-xl bg-amber-500 flex items-center justify-center text-black font-display font-black text-lg border border-amber-500 border-b-[4px] border-b-[#b45309] shadow-[0_4px_12px_rgba(245,158,11,0.4)]">
                2
              </div>
              <div>
                <h3 className="font-display text-lg md:text-xl font-bold text-white leading-tight">
                  Réseau de facturation électronique
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 font-body">
                  Connectez votre facturation aux plateformes d'échange réglementées de l'État.
                </p>
              </div>
            </div>

            <div 
              onClick={() => setHasEinvoicing(!hasEinvoicing)}
              className={`cursor-pointer p-5 md:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-6 ${
                hasEinvoicing 
                  ? "bg-gradient-to-b from-[#211f18] to-[#14120a] border-amber-500/50 shadow-[0_8px_30px_rgba(245,158,11,0.12),inset_0_2px_4px_rgba(255,255,255,0.1)]" 
                  : "bg-gradient-to-b from-[#12131a] to-[#0a0a0f] border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.1)]"
              }`}
            >
              {hasEinvoicing && (
                <div className="absolute top-0 right-0 md:-right-10 md:-top-10 w-32 h-32 md:w-64 md:h-64 bg-amber-500/10 blur-[60px] pointer-events-none rounded-full" />
              )}
              
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                hasEinvoicing ? "bg-amber-500 border-amber-500" : "bg-black/40 border-white/10"
              }`}>
                {hasEinvoicing && <Check className="w-5 h-5 text-black stroke-[3]" />}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="font-display font-bold text-[15px] md:text-base text-white leading-tight">
                    Option : dépôt automatique (PDP)
                  </div>
                  <div className="inline-flex justify-center py-1 px-3 text-[11px] md:text-xs font-bold font-display rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    450€ la 1ère année (puis dès 250€ / an)
                  </div>
                </div>
                
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed">
                  <span className="text-white font-medium">L'app génère déjà vos PDF + XML (Factur-X) gratuitement.</span>
                  <br className="hidden md:block" /> La future loi européenne (2026/2027) obligera toutes les entreprises à passer par une Plateforme de Dématérialisation Partenaire (PDP) pour l'e-reporting & la facturation électronique. Cochez cette option pour relier votre interface au futur réseau légal certifié.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3: Single high-legibility horizontal Synthesis Block at the bottom */}
          <div className="border border-white/10 bg-gradient-to-b from-[#1a1b26] to-[#0f0f15] p-5 md:p-10 rounded-[2.5rem] shadow-[0_24px_60px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)] block relative">
            
            <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-between">
              
              {/* Detailed Breakdown column */}
              <div className="flex-1">
                {/* Underlined synthesis header */}
                <div className="mb-6 pb-4 border-b border-white/15 flex items-center justify-center md:justify-start">
                  <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] font-black">
                    Configuration
                  </span>
                </div>

                <div className="flex flex-col gap-y-6">
                  {/* Setup/Production deployment info */}
                  <div className="space-y-1 block md:text-left text-center">
                    <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:mb-0 mb-1">
                      <span className="font-medium text-white mb-1 md:mb-0">Livraison en production</span>
                      <span className="font-display font-black text-white text-base md:text-lg">{setupPrice}€</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-normal">
                      Infrastructure isolée sur-mesure ({setupName}).
                    </p>
                  </div>

                  {/* AI Subscription monthly info */}
                  <div className="space-y-1 block md:text-left text-center">
                    <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:mb-0 mb-1">
                      <span className="font-medium text-white mb-1 md:mb-0">Abonnement intelligence artificielle</span>
                      <span className="font-display font-black text-white text-base md:text-lg">{selectedTierData.price}€ / mois</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-normal">
                      Niveau choisi : {selectedTierData.name}.
                    </p>
                  </div>
                </div>

                {/* PDP visual pill at synthesis bottom if active */}
                {hasEinvoicing && (
                  <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                    <div>
                      <span className="text-xs font-bold text-amber-500">Option PDP activée</span>
                      <span className="text-[11px] text-text-secondary block mt-0.5">Dépôt automatique des flux</span>
                    </div>
                    <div className="md:text-right">
                      <span className="font-display font-bold text-white text-sm">À partir de 450 €</span>
                      <span className="text-[10px] text-text-secondary block">la 1ère année</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Aggregated Total & Order validation button */}
              <div className="w-full lg:w-[300px] bg-white/[0.02] border border-white/5 p-5 md:p-6 rounded-2xl flex flex-col justify-between shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <span className="text-[11px] md:text-xs text-text-secondary uppercase tracking-wider">Invest. unique</span>
                    <span className="font-display font-bold text-white text-sm md:text-base">{setupPrice}€ HT</span>
                  </div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] md:text-xs text-text-secondary uppercase tracking-wider">Abonnement</span>
                    <span className="font-display font-black text-accent text-lg md:text-xl">{selectedTierData.price}€ HT</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <a 
                    href={waLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group w-full relative inline-flex items-center justify-center gap-2 bg-[#4ade80] hover:bg-[#22c55e] text-black px-4 py-3.5 md:py-4 rounded-xl border border-white/40 shadow-[0_4px_15px_rgba(74,222,128,0.3),inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_0_0_#14532d] hover:translate-y-[2px] hover:shadow-[0_2px_10px_rgba(74,222,128,0.3),inset_0_2px_4px_rgba(255,255,255,0.8),0_2px_0_0_#14532d] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer font-display font-black text-sm md:text-[15px] tracking-tight uppercase whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" fill="currentColor" />
                    Valider le choix
                  </a>
                  
                  <span className="text-[10px] text-text-secondary/60 leading-normal block text-center font-body hidden md:block">
                    Ce choix ouvre une discussion WhatsApp avec Samuel.
                  </span>
                </div>
              </div>

            </div>

            {/* Note d'infrastructure */}
            <div className="text-[11px] text-text-secondary/70 leading-relaxed mt-6 md:mt-8 max-w-xl mx-auto text-center border-t border-white/10 pt-5 md:pt-6">
              Cette configuration installe une infrastructure isolée et sécurisée qui vous est exclusive.<br className="hidden md:block"/>
              {" "}L'abonnement IA peut être ajusté par la suite.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
