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
    desc: "Plus de volume, plus d'automatisation et l'agent WhatsApp dès disponibilité.",
    bestFor: "Artisan actif ou petite équipe",
    features: ["Quotas doublés à triplés", "Assistant WhatsApp prévu", "Suivi trésorerie et chantier renforcé"],
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

  const setupPrice = (isMrr ? 800 : 1500) + (hasEinvoicing ? 450 : 0);
  const setupName = hasEinvoicing ? "App + conformité facturation électronique" : "App seule";

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
        msg += `Assistant WhatsApp inclus dès disponibilité\n`;
      }
    } else {
      msg += `Abonnement mensuel : Aucun\n`;
    }
    if (hasEinvoicing) {
      msg += `Option conformité : connexion au réseau légal via partenaire PDP (450€ HT/an la 1ère année, puis à partir de 250€ HT/an dès la 2e année selon le volume d'activité)\n`;
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
                    className={`group text-left rounded-[1.5rem] border p-5 transition-all duration-200 shadow-[0_6px_0_0_#000,0_6px_0_1px_rgba(255,255,255,0.05),0_18px_34px_rgba(0,0,0,0.65),inset_0_1.5px_0_rgba(255,255,255,0.06)] ${
                      isSelected
                        ? "bg-gradient-to-b from-[#1b1d28] to-[#12131a] border-accent/60 ring-1 ring-accent/30"
                        : "bg-gradient-to-b from-[#12131a] to-[#0a0a0f] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-black text-white">{tier.name}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">{tier.bestFor}</p>
                      </div>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${isSelected ? "border-accent bg-accent text-black" : "border-white/10 bg-black/30 text-transparent"}`}>
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
                        <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-white/82">
                          <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[2.8] ${isSelected ? "text-accent" : "text-white/28"}`} />
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
              className={`mt-4 w-full rounded-[1.35rem] border p-4 md:p-5 text-left transition-all duration-200 shadow-[0_6px_0_0_#000,0_6px_0_1px_rgba(255,255,255,0.05),0_18px_34px_rgba(0,0,0,0.55),inset_0_1.5px_0_rgba(255,255,255,0.06)] ${
                selectedTier === "none"
                  ? "bg-gradient-to-b from-[#1b1d28] to-[#12131a] border-accent/60 ring-1 ring-accent/30"
                  : "bg-gradient-to-b from-[#12131a] to-[#0a0a0f] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${selectedTier === "none" ? "border-accent bg-accent text-black" : "border-white/10 bg-black/30 text-transparent"}`}>
                      <Check className="h-4 w-4 stroke-[3]" />
                    </span>
                    <p className="font-display text-lg md:text-xl font-black text-white">{noAiTier.name}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{noAiTier.desc}</p>
                </div>
                <div className="shrink-0 text-left md:text-right">
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
                className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
                  hasEinvoicing
                    ? "bg-gradient-to-b from-[#211f18] to-[#14120a] border-amber-500/50 shadow-[0_8px_30px_rgba(245,158,11,0.12),inset_0_2px_4px_rgba(255,255,255,0.1)]"
                    : "bg-gradient-to-b from-[#12131a] to-[#0a0a0f] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${hasEinvoicing ? "bg-amber-500 border-amber-500 text-black" : "bg-black/40 border-white/10 text-transparent"}`}>
                    <Check className="h-5 w-5 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <p className="font-display text-base font-black text-white">
                        Oui, je veux être prêt pour la facturation électronique
                      </p>
                      <span className="w-fit rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 font-display text-xs font-bold text-amber-400">
                        +450€ HT/an la 1ère année
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      Atelier génère déjà vos factures Factur-X. L'option connecte vos flux au réseau légal via partenaire PDP. Puis à partir de 250€ HT/an dès la 2e année selon votre volume d'activité.
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
                  <span className="font-display text-sm font-black text-white">{hasEinvoicing ? "450€ HT/an" : "Non sélectionnée"}</span>
                </div>
              </div>

              {hasEinvoicing && (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-amber-300/80">
                  Facturation électronique : 450€ HT/an la 1ère année, puis à partir de 250€ HT/an dès la 2e année selon votre volume d'activité.
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
