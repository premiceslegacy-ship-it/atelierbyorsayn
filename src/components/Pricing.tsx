import { useRef, useState } from "react";
import { Check, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";

interface PricingProps {
  metierContext?: string;
}

type TierId = "none" | "starter" | "pro" | "expert";

const aiTiers: Array<{
  id: Exclude<TierId, "none">;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  bestFor: string;
  features: string[];
}> = [
  {
    id: "starter",
    name: "Starter",
    price: 39,
    desc: "L'IA vous aide dans l'application pour les devis, relances et tâches répétitives.",
    bestFor: "Solo qui veut gagner du temps vite",
    features: ["Relances et aide au chiffrage", "Quotas adaptés à 1 personne active", "Application complète incluse"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 69,
    originalPrice: 89,
    desc: "Plus de volume, plus d'automatisation et l'assistant IA intégré dès disponibilité.",
    bestFor: "Artisan actif ou petite équipe",
    features: ["Quotas doublés à triplés", "Assistant Atelier IA prévu", "Suivi trésorerie et chantier renforcé"],
  },
  {
    id: "expert",
    name: "Expert",
    price: 119,
    originalPrice: 149,
    desc: "Le maximum d'IA pour suivre urgences, trésorerie et rentabilité sans limite.",
    bestFor: "Équipe qui veut tout déléguer à l'IA",
    features: ["Toutes les fonctions sans limite", "Priorités chantier et trésorerie", "Assistant analytique complet"],
  },
];

const noAiTier = {
  id: "none" as const,
  name: "Sans abonnement IA",
  price: 0,
  desc: "Vous gardez l'application métier complète, votre base privée, vos devis, factures, chantiers, pointages et Factur-X, sans abonnement mensuel IA.",
  features: ["Application complète", "Base dédiée et isolée", "Factur-X inclus"],
};

export default function Pricing({ metierContext }: PricingProps = {}) {
  const [selectedTier, setSelectedTier] = useState<TierId>("starter");
  const [hasEinvoicing, setHasEinvoicing] = useState(false);
  const complianceRef = useRef<HTMLDivElement>(null);

  const allTiers = [...aiTiers, noAiTier];
  const selectedTierData = allTiers.find((tier) => tier.id === selectedTier)!;
  const isMrr = selectedTier !== "none";

  const setupPrice = (isMrr ? 1200 : 2500) + (hasEinvoicing ? 450 : 0);
  const setupName = hasEinvoicing ? "App + facturation électronique" : "App seule";

  const selectTier = (tier: TierId) => {
    setSelectedTier(tier);
    window.setTimeout(() => {
      complianceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  const generateWhatsAppMessage = () => {
    const context = metierContext ? ` pour mon activité de ${metierContext}` : "";
    let msg = `Bonjour Samuel, je souhaite valider mon choix Atelier${context} :\n\n`;
    msg += `Configuration initiale : ${setupName} (${setupPrice}€ HT)\n`;
    if (isMrr) {
      msg += `Abonnement mensuel : Pack ${selectedTierData.name} (${selectedTierData.price}€ HT/mois)\n`;
      if (selectedTier === "pro" || selectedTier === "expert") {
        msg += `Assistant Atelier IA inclus dès disponibilité\n`;
      }
    } else {
      msg += `Abonnement mensuel : Aucun\n`;
    }
    if (hasEinvoicing) {
      msg += `Option conformité : connexion au réseau légal via partenaire PDP (à partir de 450€ HT/an, puis à partir de 250€ HT/an dès la 2e année, montant exact selon volume)\n`;
    }
    msg += `\nPouvons-nous planifier un appel de démarrage ?`;
    return encodeURIComponent(msg);
  };

  const waLink = `https://wa.me/33651664068?text=${generateWhatsAppMessage()}`;

  return (
    <section id="tarifs" className="px-3 md:px-6 py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-14">
          <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] font-extrabold block mb-4">
            Offres Atelier
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Reprenez du temps sans recruter.
          </h2>
          <p className="text-text-secondary font-body text-base max-w-2xl mx-auto leading-relaxed">
            Choisissez le niveau d'automatisation qui vous évite les devis tardifs, les relances oubliées et les marges floues.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.01] p-4 md:p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]">
            <div className="mb-6 flex flex-col gap-2 text-center md:text-left">
              <span className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-accent">1. Abonnement IA</span>
              <h3 className="font-display text-2xl font-black text-white">Quel niveau d'automatisation voulez-vous ?</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {aiTiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => selectTier(tier.id)}
                    className={`group text-left rounded-[1.5rem] border p-5 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-b from-[#1c1f2e] to-[#111219] border-accent border-b-[5px] border-b-[#92400e] -translate-y-2 shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_0px_rgba(255,255,255,0.15),0_0_20px_rgba(255,159,28,0.15)] ring-1 ring-accent/30 active:-translate-y-0.5 active:border-b-[2px] active:shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                        : "bg-gradient-to-b from-[#141419] to-[#0a0a0d] border-white/10 border-b-[4px] border-b-black/80 shadow-[0_8px_16px_rgba(0,0,0,0.65),inset_0_1.5px_0px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:border-b-[5px] hover:border-b-black/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] active:translate-y-0 active:border-b-[2px] active:shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-black text-white">{tier.name}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">{tier.bestFor}</p>
                      </div>
                      {/* 3D Tactile Keycap Checkbox Stamp */}
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                        isSelected 
                          ? "border-accent border-b-[3px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_2.5px_5px_rgba(255,159,28,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]" 
                          : "border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[3px] border-b-black/60 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.05)] text-transparent"
                      }`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </span>
                    </div>

                    <div className="mt-5 flex items-end gap-2">
                      <div>
                        {tier.originalPrice && (
                          <span className="block -mb-1 font-display text-base font-bold text-white/30 line-through">{tier.originalPrice}€</span>
                        )}
                        <span className="font-display text-4xl font-black text-white">{tier.price}€</span>
                      </div>
                      <span className="mb-1 text-xs text-text-secondary">HT / mois</span>
                    </div>

                    <p className="mt-4 min-h-[58px] border-b border-white/6 pb-4 text-sm leading-relaxed text-text-secondary">
                      {tier.desc}
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/82">
                          {/* 3D Tactile check stamp badge matching the other checklists */}
                          <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                            isSelected 
                              ? "border-accent border-b-[2px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_1.5px_3px_rgba(255,159,28,0.2),inset_0_0.75px_0.75px_rgba(255,255,255,0.4)]" 
                              : "border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[2px] border-b-black/60 shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-transparent"
                          }`}>
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => selectTier("none")}
              className={`mt-4 w-full rounded-[1.35rem] border p-4 md:p-5 text-left transition-all duration-300 cursor-pointer ${
                selectedTier === "none"
                  ? "bg-gradient-to-b from-[#1c1f2e] to-[#111219] border-accent border-b-[5px] border-b-[#92400e] -translate-y-2 shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_0px_rgba(255,255,255,0.15),0_0_20px_rgba(255,159,28,0.15)] ring-1 ring-accent/30 active:-translate-y-0.5 active:border-b-[2px] active:shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                  : "bg-gradient-to-b from-[#141419] to-[#0a0a0d] border-white/10 border-b-[4px] border-b-black/80 shadow-[0_8px_16px_rgba(0,0,0,0.65),inset_0_1.5px_0px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:border-b-[5px] hover:border-b-black/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] active:translate-y-0 active:border-b-[2px] active:shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {/* 3D Tactile Checkbox Stamp */}
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                      selectedTier === "none" 
                        ? "border-accent border-b-[3px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_2.5px_5px_rgba(255,159,28,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]" 
                        : "border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[3px] border-b-black/60 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.05)] text-transparent"
                    }`}>
                      <Check className="h-4 w-4 stroke-[3]" />
                    </span>
                    <p className="font-display text-lg md:text-xl font-black text-white">{noAiTier.name}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{noAiTier.desc}</p>
                  
                  {/* Features list for No-AI tier with 3D checkmarks */}
                  <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2">
                    {noAiTier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs leading-relaxed text-white/82">
                        <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                          selectedTier === "none" 
                            ? "border-accent border-b-[2px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_1.5px_3px_rgba(255,159,28,0.2),inset_0_0.75px_0.75px_rgba(255,255,255,0.4)]" 
                            : "border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[2px] border-b-black/60 shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-transparent"
                        }`}>
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 text-left md:text-right mt-3 md:mt-0">
                  <p className="font-display text-3xl font-black text-white">0€</p>
                  <p className="text-xs text-text-secondary">HT / mois</p>
                </div>
              </div>
            </button>
          </div>

          <div ref={complianceRef} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-white/[0.01] p-5 md:p-7 shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500 border-b-[4px] border-b-[#b45309] bg-amber-500 font-display text-lg font-black text-black shadow-[0_4px_12px_rgba(245,158,11,0.35)]">
                  2
                </div>
                <div>
                  <span className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-amber-400">
                    Conformité facturation électronique
                  </span>
                  <h3 className="mt-1 font-display text-xl md:text-2xl font-black text-white">
                    Voulez-vous être prêt pour la facturation électronique ?
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setHasEinvoicing((value) => !value)}
                className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer ${
                  hasEinvoicing
                    ? "bg-gradient-to-b from-[#252219] to-[#15130b] border-amber-500 border-b-[5px] border-b-[#b45309] -translate-y-2 shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_0px_rgba(255,255,255,0.15),0_0_20px_rgba(245,158,11,0.15)] active:-translate-y-0.5 active:border-b-[2px] active:shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                    : "bg-gradient-to-b from-[#141419] to-[#0a0a0d] border-white/10 border-b-[4px] border-b-black/80 shadow-[0_8px_16px_rgba(0,0,0,0.65),inset_0_1.5px_0px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:border-b-[5px] hover:border-b-black/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] active:translate-y-0 active:border-b-[2px] active:shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* 3D Tactile Keycap Checkbox Stamp (Amber) */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                    hasEinvoicing 
                      ? "bg-gradient-to-b from-amber-400 to-[#d97706] text-black border-amber-400 border-b-[3.5px] border-b-[#92400e] shadow-[0_3px_6px_rgba(245,158,11,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)]" 
                      : "border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[3px] border-b-black/60 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.05)] text-transparent"
                  }`}>
                    <Check className="h-5 w-5 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <p className="font-display text-base font-black text-white">
                        Oui, je veux être prêt pour la facturation électronique
                      </p>
                      <span className="w-fit rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 font-display text-xs font-bold text-amber-400">
                        à partir de 450€ HT/an
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      Atelier génère déjà vos factures Factur-X. L'option connecte vos flux au réseau légal via partenaire PDP. Tarif annuel selon votre volume d'activité, à partir de 250€ HT/an dès la 2e année.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="lg:col-span-5 rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1a1b26] to-[#0f0f15] p-5 md:p-7 shadow-[0_18px_0_0_#000,0_18px_0_1px_rgba(255,255,255,0.05),0_38px_70px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#b4f481]/25 bg-[#b4f481]/10 text-[#b4f481] shadow-[0_3px_0_0_#000]">
                  <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <p className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-accent">Récap</p>
                  <h3 className="font-display text-xl font-black text-white">Votre choix</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-black/20 p-3">
                  <span className="text-sm text-text-secondary">Setup</span>
                  <span className="font-display text-sm font-black text-white">{setupPrice}€ HT</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-black/20 p-3">
                  <span className="text-sm text-text-secondary">{selectedTierData.name}</span>
                  <span className="font-display text-sm font-black text-white">{selectedTierData.price}€ HT / mois</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-black/20 p-3">
                  <span className="text-sm text-text-secondary">Conformité</span>
                  <span className="font-display text-sm font-black text-white">{hasEinvoicing ? "à partir de 450€ HT/an" : "Non sélectionnée"}</span>
                </div>
              </div>

              {hasEinvoicing && (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-amber-300/80">
                  Facturation électronique : à partir de 450€ HT/an (an 1), puis à partir de 250€ HT/an, montant exact selon votre volume d'activité.
                </p>
              )}

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 group w-full relative inline-flex items-center justify-center gap-2 bg-[#4ade80] hover:bg-[#22c55e] text-black px-4 py-4 rounded-xl border border-white/40 shadow-[0_4px_15px_rgba(74,222,128,0.3),inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_0_0_#14532d] hover:translate-y-[2px] hover:shadow-[0_2px_10px_rgba(74,222,128,0.3),inset_0_2px_4px_rgba(255,255,255,0.8),0_2px_0_0_#14532d] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer font-display font-black text-sm md:text-[15px] tracking-tight uppercase"
              >
                <MessageCircle className="w-5 h-5 stroke-[2.5]" fill="currentColor" />
                VALIDER LE CHOIX
              </a>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-text-secondary/70">
                Tarifs HT. TVA non applicable article 293 B du CGI. Abonnement IA sans engagement minimum, résiliable avec 30 jours de préavis. CGV disponibles sur le site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
