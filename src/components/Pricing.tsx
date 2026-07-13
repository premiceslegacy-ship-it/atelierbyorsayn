import { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, MessageCircle, Mic, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

interface PricingProps {
  metierContext?: string;
  metierSlug?: string;
}

type TierId = "none" | "starter" | "pro" | "expert";
type Mode = "none" | "subscription";

const aiTiers: Array<{
  id: Exclude<TierId, "none">;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  bestFor: string;
  features: string[];
  hasSarah: boolean;
}> = [
  {
    id: "expert",
    name: "Expert",
    price: 139,
    originalPrice: 169,
    desc: "Le maximum d'IA pour suivre urgences, trésorerie et rentabilité sans limite.",
    bestFor: "Équipe qui veut tout déléguer à l'IA",
    hasSarah: true,
    features: [
      "Tout le Pro, plus alertes proactives de Sarah sur urgences trésorerie et chantiers à risque",
      "Pointage équipe intégré : chaque compagnon pointe depuis un lien, les heures tombent sur le bon chantier",
      "Exports comptables, rapports de rentabilité et suivi de marge prêts à l'emploi",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 69,
    originalPrice: 89,
    desc: "Plus de volume, plus d'automatisation et l'assistante Sarah intégrée à votre activité.",
    bestFor: "Artisan actif ou petite équipe",
    hasSarah: true,
    features: [
      "Tout le Starter, sans limite de volume sur devis, factures et chantiers",
      "Marge chantier en temps réel : heures, achats et sous-traitance remontent automatiquement",
      "Sarah, votre assistante IA, prépare les actions — vous validez avant envoi",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 39,
    desc: "L'IA vous aide dans l'application pour les devis, relances et tâches répétitives.",
    bestFor: "Solo qui veut gagner du temps vite",
    hasSarah: false,
    features: [
      "Devis générés depuis vos prestations types, envoyés avant de quitter le client",
      "Relances automatiques sur factures impayées, sans passer l'appel vous-même",
      "Tableau de bord : CA encaissé, devis en attente, chantiers ouverts",
    ],
  },
];

const noAiTier = {
  id: "none" as const,
  name: "À l'usage",
  price: 0,
  desc: "Aucun abonnement mensuel. Vous payez uniquement ce que vous consommez.",
  features: ["Application complète", "Base dédiée et isolée", "Factur-X inclus"],
};

export default function Pricing({ metierContext, metierSlug }: PricingProps = {}) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const complianceRef = useRef<HTMLDivElement>(null);

  const isMetalMetier = metierSlug === "tolier" || (!!metierContext && /tôlier|métallier/i.test(metierContext));

  const selectedTier: TierId = mode === "none" ? "none" : mode === "subscription" ? aiTiers[carouselIndex].id : "starter";
  const allTiers = [...aiTiers, noAiTier];
  const selectedTierData = allTiers.find((tier) => tier.id === selectedTier)!;
  const isMrr = selectedTier !== "none";

  const setupPrice = isMrr ? 1500 : 3000;

  const chooseMode = (nextMode: Mode) => {
    setMode(nextMode);
    if (nextMode === "subscription") setCarouselIndex(0);
    window.setTimeout(() => {
      complianceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  const goToCard = (direction: 1 | -1) => {
    setCarouselIndex((current) => (current + direction + aiTiers.length) % aiTiers.length);
  };

  const generateWhatsAppMessage = () => {
    const context = metierContext ? ` (${metierContext})` : "";
    const baseSetup = isMrr ? 1500 : 3000;
    let msg = `Bonjour Samuel, je veux démarrer Atelier${context}.\n\n`;
    msg += `Setup : ${baseSetup}€ HT\n`;
    if (isMrr) {
      msg += `Abonnement : ${selectedTierData.name}, ${selectedTierData.price}€/mois\n`;
    }
    msg += `\nOn peut caler un appel ?`;
    return encodeURIComponent(msg);
  };

  const waLink = `https://wa.me/33651664068?text=${generateWhatsAppMessage()}`;

  const activeTier = mode === "subscription" ? aiTiers[carouselIndex] : null;

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
            Un seul choix à faire : voulez-vous l'IA de Sarah à vos côtés, ou payer uniquement à l'usage ?
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Étape 1 : Sans abonnement / Avec abonnement */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.01] p-4 md:p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]">
            <div className="mb-6 flex flex-col gap-2 text-center md:text-left">
              <span className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-accent">1. Votre formule</span>
              <h3 className="font-display text-2xl font-black text-white">Comment voulez-vous payer Atelier ?</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Carte Sans abonnement */}
              <button
                onClick={() => chooseMode("none")}
                className={`group text-left rounded-[1.5rem] border p-5 md:p-6 transition-all duration-300 cursor-pointer flex flex-col ${
                  mode === "none"
                    ? "bg-gradient-to-b from-[#1c1f2e] to-[#111219] border-accent border-b-[5px] border-b-[#92400e] -translate-y-2 shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_0px_rgba(255,255,255,0.15),0_0_20px_rgba(255,159,28,0.15)] ring-1 ring-accent/30 active:-translate-y-0.5 active:border-b-[2px] active:shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                    : "bg-gradient-to-b from-[#141419] to-[#0a0a0d] border-white/10 border-b-[4px] border-b-black/80 shadow-[0_8px_16px_rgba(0,0,0,0.65),inset_0_1.5px_0px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:border-b-[5px] hover:border-b-black/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] active:translate-y-0 active:border-b-[2px] active:shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl font-black text-white">Sans abonnement</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">À l'usage, sans mensualité</p>
                  </div>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                    mode === "none"
                      ? "border-accent border-b-[3px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_2.5px_5px_rgba(255,159,28,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                      : "border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[3px] border-b-black/60 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.05)] text-transparent"
                  }`}>
                    <Check className="h-4 w-4 stroke-[3]" />
                  </span>
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <span className="font-display text-4xl font-black text-white">0€</span>
                  <span className="mb-1 text-xs text-text-secondary">HT / mois</span>
                </div>

                <p className="mt-4 min-h-[58px] border-b border-white/6 pb-4 text-sm leading-relaxed text-text-secondary">
                  {noAiTier.desc}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {noAiTier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/82">
                      <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                        mode === "none"
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

              {/* Carte Avec abonnement */}
              <button
                onClick={() => chooseMode("subscription")}
                className={`group relative text-left rounded-[1.5rem] border p-5 md:p-6 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden ${
                  mode === "subscription"
                    ? "bg-gradient-to-b from-[#1c1f2e] to-[#111219] border-accent border-b-[5px] border-b-[#92400e] -translate-y-2 shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_0px_rgba(255,255,255,0.15),0_0_20px_rgba(255,159,28,0.15)] ring-1 ring-accent/30 active:-translate-y-0.5 active:border-b-[2px] active:shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                    : "bg-gradient-to-b from-[#141419] to-[#0a0a0d] border-white/10 border-b-[4px] border-b-black/80 shadow-[0_8px_16px_rgba(0,0,0,0.65),inset_0_1.5px_0px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:border-b-[5px] hover:border-b-black/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] active:translate-y-0 active:border-b-[2px] active:shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                }`}
              >
                <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-display font-black uppercase tracking-wide text-accent">
                  <Sparkles className="h-3 w-3" />
                  Avec Sarah
                </span>

                <div className="flex items-start justify-between gap-3 pr-24">
                  <div>
                    <p className="font-display text-xl font-black text-white">Avec abonnement</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">L'IA travaille pour vous</p>
                  </div>
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <span className="font-display text-4xl font-black text-white">dès 39€</span>
                  <span className="mb-1 text-xs text-text-secondary">HT / mois</span>
                </div>

                <p className="mt-4 min-h-[58px] border-b border-white/6 pb-4 text-sm leading-relaxed text-text-secondary">
                  Sarah, votre assistante IA, prépare devis, relances et suivi de chantier. Vous gardez toujours le dernier mot.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="relative shrink-0">
                    <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,159,28,0.35)", animationDuration: "1.4s" }} />
                    <img
                      src="/sarah-avatar.webp"
                      alt="Sarah"
                      width={34}
                      height={34}
                      className="relative w-[34px] h-[34px] rounded-full object-cover"
                      style={{ background: "#1a1008", boxShadow: "0 0 0 2px rgba(255,159,28,0.45), inset 0 1.5px 0 rgba(255,255,255,0.35)" }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0e0e12]" />
                  </div>
                  <span className="text-xs text-white/60">3 niveaux d'automatisation : Starter, Pro, Expert</span>
                </div>
              </button>
            </div>
          </div>

          {/* Étape 2 : détail selon le mode choisi */}
          {mode === "subscription" && activeTier && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.01] p-4 md:p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]">
              <div className="mb-5 flex flex-col gap-2 text-center md:text-left">
                <span className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-accent">2. Votre niveau d'automatisation</span>
                <h3 className="font-display text-2xl font-black text-white">Choisissez votre abonnement</h3>
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-6">
                <button
                  onClick={() => goToCard(-1)}
                  aria-label="Abonnement précédent"
                  className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[3px] border-b-black/60 text-white/70 shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:border-b-[1px] cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                  key={activeTier.id}
                  className="w-full max-w-md rounded-[1.5rem] border bg-gradient-to-b from-[#1c1f2e] to-[#111219] border-accent border-b-[5px] border-b-[#92400e] shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_0px_rgba(255,255,255,0.15),0_0_20px_rgba(255,159,28,0.15)] ring-1 ring-accent/30 p-5 md:p-6 flex flex-col animate-[fadeIn_0.25s_ease]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl font-black text-white">{activeTier.name}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">{activeTier.bestFor}</p>
                    </div>
                    {activeTier.hasSarah && (
                      <div className="relative shrink-0">
                        <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,159,28,0.35)", animationDuration: "1.4s" }} />
                        <img
                          src="/sarah-avatar.webp"
                          alt="Sarah"
                          width={40}
                          height={40}
                          className="relative w-10 h-10 rounded-full object-cover"
                          style={{ background: "#1a1008", boxShadow: "0 0 0 2px rgba(255,159,28,0.45), inset 0 1.5px 0 rgba(255,255,255,0.35)" }}
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0e0e12]" />
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-end gap-2">
                    <div>
                      {activeTier.originalPrice && (
                        <span className="block -mb-1 font-display text-base font-bold text-white/30 line-through">{activeTier.originalPrice}€</span>
                      )}
                      <span className="font-display text-4xl font-black text-white">{activeTier.price}€</span>
                    </div>
                    <span className="mb-1 text-xs text-text-secondary">HT / mois</span>
                  </div>

                  <p className="mt-4 border-b border-white/6 pb-4 text-sm leading-relaxed text-text-secondary">
                    {activeTier.desc}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {activeTier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/82">
                        <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border border-accent border-b-[2px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_1.5px_3px_rgba(255,159,28,0.2),inset_0_0.75px_0.75px_rgba(255,255,255,0.4)]">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {isMetalMetier && (activeTier.id === "pro" || activeTier.id === "expert") && (
                      <li className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border border-accent/60 bg-accent/15 text-accent shadow-[0_1px_3px_rgba(255,159,28,0.2)]">
                          <TrendingUp className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span className="text-accent font-semibold">Module prix matières inclus</span>
                      </li>
                    )}
                  </ul>

                  {activeTier.hasSarah && (
                    <div className="mt-4 rounded-xl border border-accent/20 bg-black/30 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="h-3 w-3 text-accent shrink-0" />
                        <span className="text-[10px] uppercase tracking-wide text-accent/80 font-display font-bold">Avec Sarah incluse</span>
                      </div>
                      <div className="flex items-end gap-1.5">
                        <div className="max-w-[70%] px-2.5 py-1.5 text-[10px] font-body leading-snug text-[#050505] font-medium" style={{ background: "linear-gradient(to bottom, #FFB84D, #FF9F1C)", borderRadius: "14px 3px 14px 14px" }}>
                          "Prépare le devis pour Leclerc."
                        </div>
                      </div>
                      <div className="mt-1.5 flex items-end gap-1.5">
                        <img src="/sarah-avatar.webp" alt="" width={18} height={18} className="w-[18px] h-[18px] rounded-full object-cover shrink-0" style={{ background: "#1a1008" }} />
                        <div className="flex-1 px-2.5 py-1.5 text-[9px] text-emerald-300/90 font-body leading-snug" style={{ background: "rgba(255,255,255,0.05)", borderRadius: "3px 14px 14px 14px" }}>
                          Devis prêt, en attente de votre validation ✓
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => chooseMode("subscription")}
                    className="mt-5 w-full rounded-xl border border-accent/40 bg-accent/15 py-2.5 font-display text-xs font-black uppercase tracking-wide text-accent"
                  >
                    Choisir {activeTier.name}
                  </button>
                </div>

                <button
                  onClick={() => goToCard(1)}
                  aria-label="Abonnement suivant"
                  className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-[#1c1d24] to-[#121318] border-b-[3px] border-b-black/60 text-white/70 shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:border-b-[1px] cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2">
                {aiTiers.map((tier, index) => (
                  <button
                    key={tier.id}
                    onClick={() => setCarouselIndex(index)}
                    aria-label={`Voir ${tier.name}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === carouselIndex ? "w-6 bg-accent" : "w-2 bg-white/20 hover:bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {mode !== null && (
            <div ref={complianceRef} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Right column: recap */}
              <div className="lg:col-span-12 max-w-md mx-auto w-full rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1a1b26] to-[#0f0f15] p-5 md:p-7 shadow-[0_18px_0_0_#000,0_18px_0_1px_rgba(255,255,255,0.05),0_38px_70px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)]">
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
                    <span className="font-display text-sm font-black text-white">{selectedTier === "none" ? "0€ HT / mois" : `${selectedTierData.price}€ HT / mois`}</span>
                  </div>
                  {isMetalMetier && (selectedTier === "pro" || selectedTier === "expert") && (
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-accent/20 bg-accent/5 p-3">
                      <span className="text-sm text-text-secondary">Prix matières</span>
                      <span className="font-display text-sm font-black text-accent">Inclus</span>
                    </div>
                  )}
                </div>

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
          )}
        </div>
      </div>
    </section>
  );
}
