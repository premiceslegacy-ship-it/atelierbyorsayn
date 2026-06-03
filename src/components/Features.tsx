import React, { useState, useEffect } from "react";
import {
  Check,
  ArrowRight,
  FileText,
  Clock,
  Send,
  FileCheck2,
  Mic,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Camera,
  CheckCheck,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Share2,
  Bot,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

interface FeatureItem {
  id: string;
  label: string;
  h2: string;
  body: React.ReactNode;
  bullets?: string[];
  isComingSoon?: boolean;
  h3?: string;
  body2?: string;
  cta?: string;
  chatExample?: { role: string; text: string; }[];
}

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swiped left, go to next tab
      if (activeTab < featuresData.length - 1) {
        setActiveTab(prev => prev + 1);
      }
    } else if (isRightSwipe) {
      // Swiped right, go to previous tab
      if (activeTab > 0) {
        setActiveTab(prev => prev - 1);
      }
    }
  };

  // States for the interactive Devis simulation
  const [devisState, setDevisState] = useState<"idle" | "loading" | "success">("idle");
  const [devisStep, setDevisStep] = useState(0);

  // Trigger animation of the code preview panel when activeTab changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Steps sequence of the simulated Devis creation
  const devisSteps = [
    "Vérification des métrés...",
    "Calcul de la surface utile...",
    "Création du fichier Factur-X compatible DFGE...",
    "Signature de l'empreinte cryptographique...",
    "Envoi par e-mail en cours..."
  ];

  // Logic to simulate an itemized, complex "tôlerie" engineering process
  const triggerDevisCreation = () => {
    if (devisState === "success") {
      setDevisState("idle");
      setDevisStep(0);
      return;
    }
    
    setDevisState("loading");
    setDevisStep(0);
    
    const interval = setInterval(() => {
      setDevisStep((prev) => {
        if (prev >= devisSteps.length - 1) {
          clearInterval(interval);
          setDevisState("success");
          return prev;
        }
        return prev + 1;
      });
    }, 650);
  };

  const featuresData: FeatureItem[] = [
    {
      id: "devis",
      label: "Devis",
      h2: "Envoyez le devis avant de quitter le client",
      body: (
        <>
          Vos prestations types et vos tarifs sont déjà prêts. Vous entrez les mesures, Atelier calcule, génère le devis et vous permet de l'envoyer pendant que le client a encore le chantier en tête.
        </>
      ),
      bullets: [
        "Chiffrage guidé au m², au ml ou au forfait",
        "Catalogue métier réutilisable à chaque devis",
        "Signature électronique accessible au client"
      ]
    },
    {
      id: "relances",
      label: "Relances & trésorerie",
      h2: "Relancez sans y penser, encaissez plus vite",
      body: (
        <>
          Atelier repère les factures en retard et les devis sans réponse. Les rappels partent avec un ton propre, sans vous obliger à passer l'appel gênant entre deux chantiers.
        </>
      ),
      bullets: [
        "Factures en retard visibles immédiatement",
        "Relances professionnelles par email",
        "Acomptes, situations et solde suivis au même endroit"
      ]
    },
    {
      id: "rentabilite",
      label: "Chantiers & rentabilité",
      h2: "Voyez la marge avant la mauvaise surprise",
      body: (
        <>
          Heures, achats, sous-traitance et dépenses remontent dans le chantier. Vous savez si le projet tient sa marge pendant qu'il est encore possible d'agir.
        </>
      ),
      h3: "La marge utile se regarde pendant le chantier",
      body2: "Votre comptable constate l'année passée. Atelier vous montre ce qui se passe maintenant.",
      bullets: [
        "Marge actualisée avec heures et matériaux",
        "Alerte si le budget commence à déraper",
        "Facturation à l'avancement suivie proprement"
      ]
    },
    {
      id: "pointage",
      label: "Équipes & pointage",
      h2: "Vos équipes pointent sans nouvelle application",
      body: (
        <>
          Chaque compagnon accède à son planning et pointe ses heures depuis un lien sécurisé. Vous arrêtez de reconstituer la semaine le vendredi soir.
        </>
      ),
      bullets: [
        "Accès mobile simple par lien sécurisé",
        "Heures rattachées au bon chantier",
        "Exports prêts pour la paie"
      ]
    },
    {
      id: "facturation2026",
      label: "Facturation 2026",
      h2: "Soyez prêt pour Factur-X sans vous perdre dans la réforme",
      body: (
        <>
          Atelier génère vos factures au format Factur-X. Vous gardez un PDF lisible pour le client et les données structurées nécessaires pour avancer vers la conformité.
        </>
      ),
      h3: "Une conformité lisible",
      body2: "Factur-X combine un PDF clair et un fichier XML structuré. Atelier s'occupe de cette partie technique.",
      bullets: []
    },
    {
      id: "agent",
      label: "Atelier IA",
      isComingSoon: true,
      h2: "Le secrétaire IA qui connaît vos chantiers",
      body: (
        <>
          Parlez à Atelier comme à un assistant. Il prépare vos devis, classe vos documents, suit vos relances et vous aide à piloter l'activité. Vous gardez toujours le dernier mot.
        </>
      ),
      h3: "L'IA propose. Vous validez. Atelier exécute.",
      body2: "Contrairement à un simple chatbot, Atelier IA est connecté à votre vraie activité : vos clients, vos documents, vos devis et vos chantiers. Rien n'est envoyé, modifié ou facturé sans votre accord.",
      bullets: [
        "Il comprend votre activité : chantiers, clients, devis, factures",
        "Proactif : il vous alerte quand une facture tarde ou un devis doit être relancé",
        "Validation obligatoire avant tout envoi ou modification"
      ]
    }
  ];

  const currentFeature = featuresData[activeTab];

  // Render highly-polished mockups aligned with visual DA (3D relief, accurate text, etc.)
  const renderMockup = (idx: number) => {
    switch (idx) {
      case 0: // Devis
        return (
          <div className="flex flex-col gap-4 w-full px-4 pt-4 pb-2">
            
            {/* Header of Devis panel */}
            <div className="flex items-center justify-between px-1 mb-1">
              <div className="flex items-center gap-2.5">
                {/* 3D Tactile Keycap Icon Badge matching the brand's relief design direction */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-accent to-[#d97706] flex items-center justify-center text-black border border-accent border-b-[3px] border-b-[#92400e] shadow-[0_2.5px_6px_rgba(245,158,11,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)] relative">
                  <FileText className="w-4 h-4 stroke-[2.5]" style={{ filter: "drop-shadow(0px 1px 0px rgba(255,255,255,0.2))" }} />
                </div>
                <span className="text-xs font-display font-extrabold text-accent tracking-wider uppercase drop-shadow-[0_0_10px_rgba(255,159,28,0.25)]">Nouveau devis</span>
              </div>
              <span className="text-[10px] font-sans text-white/40">DEV-2026-042</span>
            </div>

            <div className="bg-gradient-to-b from-[#1e1f28] to-[#16171d] border border-white/10 shadow-[0_4px_0_0_#000,0_4px_0_1.5px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.4)] rounded-xl p-3 flex flex-col gap-2 relative overflow-hidden transition-all duration-300">
              
              {/* Complex industrial Sheet-metal "Tôlerie/Bardage" simulation */}
              <div className="flex flex-col gap-1 text-left">
                <div className="flex justify-between items-start border-b border-white/5 pb-2 mb-2">
                  <div>
                    <span className="block text-white text-[11px] font-display font-bold tracking-wide leading-tight">Bardage d'acier nervuré double peau</span>
                    <span className="text-[10px] text-text-secondary">Surface utile : 120 m² • Isolation laine de roche</span>
                  </div>
                  <span className="font-display font-black text-white text-xs whitespace-nowrap">4 560 €</span>
                </div>

                <div className="flex justify-between items-start border-b border-white/5 pb-2 mb-2">
                  <div>
                    <span className="block text-white text-[11px] font-display font-bold tracking-wide leading-tight">Tôlerie de finition en acier galvanisé</span>
                    <span className="text-[10px] text-text-secondary">Pliage 15/10e sur mesure • 24 ml</span>
                  </div>
                  <span className="font-display font-black text-white text-xs whitespace-nowrap">912 €</span>
                </div>

                {/* Totals */}
                <div className="flex justify-between items-center pt-1 text-[11px] font-display font-black">
                  <span className="text-text-secondary uppercase tracking-wider text-[9px]">Total TTC (TVA 20% incluse)</span>
                  <span className="text-accent text-[12px] bg-accent/10 px-2 py-0.5 rounded border border-accent/20">6 566,40 €</span>
                </div>
              </div>

              {/* Speech recognition simulated feedback */}
              <div className="bg-black/40 border border-white/5 p-2 rounded-lg text-[10px] font-body text-text-secondary mt-1 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
                  <Mic className="w-2.5 h-2.5 text-accent" />
                </div>
                <span>Dictée : <span className="text-white">"Ajoute vingt-quatre mètres linéaires de bavettes en acier galvanisé plié."</span></span>
              </div>
            </div>
            
            {/* Interactive button that triggers step animations */}
            <div className="flex flex-col gap-2">
              {devisState === "loading" && (
                <div className="bg-[#121318] border border-white/10 rounded-xl p-3 flex items-center gap-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                  <RefreshCw className="w-3.5 h-3.5 text-accent animate-spin shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-sans font-bold text-accent uppercase tracking-wider">Traitement en cours</div>
                    <div className="text-[11px] text-white/95 font-body truncate">{devisSteps[devisStep]}</div>
                  </div>
                  <div className="w-8 bg-[#181920] h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-accent h-full transition-all duration-300" style={{ width: `${((devisStep + 1) / devisSteps.length) * 100}%` }}></div>
                  </div>
                </div>
              )}

              {devisState === "success" && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-2.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] text-left animate-fadeIn">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-black shrink-0 shadow-[0_2px_4px_rgba(16,185,129,0.3)]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-display font-extrabold text-[#b4f481] uppercase tracking-wider">Envoi validé</div>
                    <div className="text-[10px] text-text-secondary">Signature Factur-X scellée • E-mail expédié</div>
                  </div>
                  <button 
                    onClick={() => setDevisState("idle")}
                    className="p-1 text-text-secondary hover:text-white transition-colors"
                    title="Nouveau devis"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {devisState === "idle" && (
                <button 
                  onClick={triggerDevisCreation}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#ffffff] to-[#d4d4d4] hover:from-white hover:to-white text-black py-3 rounded-xl border border-white/50 shadow-[0_4px_0_0_#808080,0_4px_0_1.5px_rgba(255,255,255,0.5),0_8px_16px_rgba(0,0,0,0.4)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#808080,0_1px_0_1px_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.4)] transition-all font-display text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Générer et envoyer le devis
                </button>
              )}
            </div>
          </div>
        );
      
      case 1: // Relances
        return (
          <div className="flex flex-col gap-3 w-full px-4 pt-8 pb-4">
            <div className="bg-gradient-to-b from-[#1e1f28] to-[#16171d] border border-white/10 shadow-[0_4px_0_0_#000,0_4px_0_1.5px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.4)] rounded-xl p-4 relative">
              <div className="absolute -top-3 -right-2 bg-gradient-to-b from-red-500/90 to-red-600/90 text-white shadow-[0_2px_0_0_rgba(153,27,27,1),0_4px_8px_rgba(220,38,38,0.5)] px-3 py-1 rounded-full text-[10px] font-display font-black tracking-wider uppercase border border-red-400/50">
                +14 jours
              </div>
              <div className="flex justify-between items-start mb-2 text-left">
                <div>
                  <div className="text-white font-display font-bold text-sm tracking-wide">Rénovation charpente métallique</div>
                  <div className="text-text-secondary text-[10px]">Mme Dubois • FAC-2026-089</div>
                </div>
                <div className="font-display font-black text-white text-right text-sm">3 450 €</div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs font-body font-medium bg-emerald-500/10 text-[#b4f481] p-2.5 rounded-lg border border-emerald-500/20 shadow-[inset_0_1px_2px_rgba(16,185,129,0.1)]">
                <Check className="w-4 h-4 stroke-[3] text-emerald-400" />
                Relance automatique envoyée ce matin
              </div>
            </div>
          </div>
        );

      case 2: // Rentabilité
        return (
          <div className="flex flex-col gap-5 w-full px-4 pt-6 pb-4">
            <div className="flex flex-col gap-1 text-left">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-display font-bold text-white/95">Coût de la main-d'œuvre</span>
                <span className="text-[9px] bg-emerald-500/15 text-[#b4f481] px-2 py-0.5 rounded font-black border border-emerald-500/30 uppercase tracking-wider">Au budget</span>
              </div>
              <div className="w-full bg-[#101015] rounded-full h-3 border border-white/5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
              <div className="text-[10px] text-text-secondary text-right mt-1 font-sans">1 200 € / 1 800 €</div>
            </div>

            <div className="flex flex-col gap-1 text-left mt-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-display font-bold text-white/95">Matériaux & fournitures</span>
                <span className="text-[9px] bg-red-500/15 text-red-400 px-2 py-0.5 rounded font-black border border-red-500/30 uppercase tracking-wider">Alerte marge</span>
              </div>
              <div className="w-full bg-[#101015] rounded-full h-3 border border-white/5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex">
                <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full" style={{ width: "85%" }}></div>
                <div className="bg-red-500 h-full" style={{ width: "15%" }}></div>
              </div>
              <div className="text-[10px] text-red-400 text-right mt-1 font-bold font-sans">2 450 € / 2 200 €</div>
            </div>
          </div>
        );

      case 3: // Pointage
        return (
          <div className="flex flex-col gap-3 w-full px-4 pt-4 pb-4">
            {[
              { name: "Thomas R.", hours: "8h", status: "Pointé aujourd'hui", color: "bg-emerald-500", done: true },
              { name: "Julien M.", hours: "4h", status: "Pointé ce matin", color: "bg-emerald-500", done: true },
              { name: "Marc L.", hours: "-", status: "En attente", color: "bg-[#2a2a35]", done: false }
            ].map((worker, i) => (
              <div key={i} className={`bg-gradient-to-b from-[#1e1f28] to-[#16171d] border border-white/10 shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05),0_6px_10px_rgba(0,0,0,0.3)] rounded-xl p-2.5 flex items-center justify-between transition-all duration-300 ${!worker.done && 'opacity-55 grayscale'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#2a2a35] flex items-center justify-center font-display font-extrabold text-white text-xs border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                      {worker.name.charAt(0)}
                    </div>
                    {worker.done && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#16171d]"></div>}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-display font-bold text-xs tracking-wide">{worker.name}</div>
                    <div className="text-text-secondary text-[9px]">{worker.status}</div>
                  </div>
                </div>
                {worker.done ? (
                   <div className="font-sans text-xs font-black text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    {worker.hours}
                  </div>
                ) : (
                  <div className="text-text-secondary text-[10px] pr-2">En ligne...</div>
                )}
              </div>
            ))}
          </div>
        );

      case 4: // Factur-X
        return (
          <div className="flex flex-col items-center justify-center h-full w-full relative pt-6 pb-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-24 h-32 bg-gradient-to-br from-white/95 to-white/65 rounded-xl shadow-[0_10px_0_0_#000,0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-white/40 flex flex-col items-center justify-center transform -rotate-3 transition-transform duration-300 hover:rotate-0">
                <FileCheck2 className="w-10 h-10 text-indigo-600 mb-2" />
                <div className="w-12 h-1 bg-indigo-600/30 rounded-full mb-1"></div>
                <div className="w-8 h-1 bg-indigo-600/30 rounded-full"></div>
                
                {/* 3D Hybrid Badge */}
                <div className="absolute -bottom-3 -right-6 flex items-center gap-1">
                  <div className="bg-gradient-to-b from-indigo-500 to-indigo-600 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded shadow-[0_3px_0_0_#312e81,0_4px_8px_rgba(0,0,0,0.5)] border border-indigo-400">
                    PDF/A-3
                  </div>
                  <div className="bg-gradient-to-b from-emerald-500 to-emerald-600 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded shadow-[0_3px_0_0_#064e3b,0_4px_8px_rgba(0,0,0,0.5)] border border-emerald-400">
                    XML
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-indigo-500/20 to-indigo-500/5 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-xl text-xs font-display font-bold flex items-center gap-2 shadow-[inset_0_1px_2px_rgba(99,102,241,0.2)]">
              <Check className="w-4 h-4 stroke-[3]" />
              Format Factur-X 100% conforme
            </div>
          </div>
        );

      case 5: // Atelier IA — assistant intégré à l'app, triptyque Demandez / Prépare / Validez
        return (
          <div className="flex flex-col w-full h-full bg-[#07070a] rounded-xl relative overflow-hidden text-left">

            {/* Header bar */}
            <div className="bg-gradient-to-b from-[#141419] to-[#0f0f13] px-3 py-2.5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-accent to-[#d97706] flex items-center justify-center border border-accent/60 border-b-[2px] border-b-[#92400e] shadow-[0_2px_5px_rgba(245,158,11,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                  <Bot className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-[11px] font-display font-black tracking-wide">Atelier IA</span>
                    <span className="text-[8px] bg-accent/15 text-accent px-1.5 py-0.5 rounded font-bold border border-accent/25 uppercase tracking-wider">Bientôt</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-body block -mt-0.5">Connecté à votre activité</span>
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-white/30" />
            </div>

            {/* Steps triptyque */}
            <div className="flex-1 flex flex-col gap-2.5 p-3 justify-center">

              {/* Step 1 — Demandez */}
              <div className="bg-gradient-to-b from-[#1a1b24] to-[#111218] border border-white/8 rounded-xl p-3 shadow-[0_3px_0_0_#000,0_6px_10px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-b from-accent to-[#d97706] flex items-center justify-center border border-accent/50 border-b-[2px] border-b-[#92400e] shadow-[0_1.5px_3px_rgba(245,158,11,0.3)] shrink-0">
                    <span className="text-black text-[9px] font-black">1</span>
                  </div>
                  <span className="text-[10px] font-display font-black text-accent uppercase tracking-wider">Demandez</span>
                </div>
                <div className="bg-[#0d0d10] border border-white/6 rounded-lg px-3 py-2 text-[12px] font-body text-white/85 leading-snug flex items-center gap-2">
                  <Mic className="w-3 h-3 text-accent shrink-0 animate-pulse" />
                  <span>"Prépare un devis pour le chantier Leclerc Rénovation."</span>
                </div>
              </div>

              {/* Step 2 — L'assistant prépare */}
              <div className="bg-gradient-to-b from-[#1a1b24] to-[#111218] border border-white/8 rounded-xl p-3 shadow-[0_3px_0_0_#000,0_6px_10px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-b from-[#2d2d3a] to-[#181822] flex items-center justify-center border border-white/15 border-b-[2px] border-b-black/60 shadow-[0_1.5px_3px_rgba(0,0,0,0.4)] shrink-0">
                    <span className="text-white/70 text-[9px] font-black">2</span>
                  </div>
                  <span className="text-[10px] font-display font-black text-white/60 uppercase tracking-wider">L'assistant prépare</span>
                </div>
                <div className="flex flex-col gap-1.5 text-[10px] font-body text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3] shrink-0" />
                    <span>Client Leclerc Rénovation trouvé · 3 chantiers actifs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3] shrink-0" />
                    <span>Lignes de devis ajoutées · Prix estimé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3 h-3 text-accent stroke-[2.5] shrink-0 animate-spin" />
                    <span className="text-accent">Document en cours de génération…</span>
                  </div>
                </div>
              </div>

              {/* Step 3 — Vous validez */}
              <div className="bg-gradient-to-b from-[#1a1b24] to-[#111218] border border-emerald-500/25 rounded-xl p-3 shadow-[0_3px_0_0_#000,0_6px_10px_rgba(0,0,0,0.4),0_0_12px_rgba(16,185,129,0.06)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-b from-emerald-500 to-emerald-600 flex items-center justify-center border border-emerald-400/60 border-b-[2px] border-b-[#064e3b] shadow-[0_1.5px_3px_rgba(16,185,129,0.3)] shrink-0">
                    <span className="text-black text-[9px] font-black">3</span>
                  </div>
                  <span className="text-[10px] font-display font-black text-[#b4f481] uppercase tracking-wider">Vous validez</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-lg px-3 py-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black shrink-0 shadow-[0_1.5px_3px_rgba(16,185,129,0.4)]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-display font-bold text-[#b4f481]">Envoyer le devis</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#b4f481]/60 ml-auto" />
                </div>
                <p className="mt-1.5 text-[9.5px] text-text-secondary/60 text-center">Rien n'est envoyé sans votre accord.</p>
              </div>

            </div>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="fonctionnalites" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden flex flex-col items-center border-t border-white/5 scroll-mt-20">
      
      {/* Background Ambience / Glow circles */}
      <div className="absolute top-[35%] -left-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] -right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header Topic */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] font-bold mb-4 block">
            Fonctionnalités clés
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Tout ce dont vous avez besoin, sans complication
          </h2>
        </div>

        {/* 1. Dynamic Segmented Control Pill Panel */}
        <div className="w-full mb-10 md:mb-16 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max mx-auto px-4">
            <div className="flex gap-2 p-1.5 bg-[#141419] rounded-2xl border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            {featuresData.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`relative px-4 md:px-5 py-2.5 rounded-xl font-display font-bold text-[12.5px] md:text-sm tracking-wide transition-all whitespace-nowrap outline-none select-none flex items-center gap-2 cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-b from-[#2d2d3a] to-[#181822] text-white border border-white/15 shadow-[0_4px_0_0_#000,0_4px_0_1.5px_rgba(255,255,255,0.15),0_10px_20px_rgba(0,0,0,0.6)] transform -translate-y-1 z-10'
                      : 'text-text-secondary/70 hover:text-white/90 hover:bg-white/[0.03] border border-transparent hover:-translate-y-0.5'
                    }
                  `}
                >
                  {tab.label}
                  {tab.isComingSoon && (
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow-[0_1.5px_0_0_rgba(0,0,0,0.5)] font-bold">
                      Bientôt
                    </span>
                  )}
                </button>
              );
            })}
            </div>
          </div>
        </div>

        {/* 2. Structured Layout: Text Left / Display Right */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-14 items-stretch min-h-[500px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* Left panel: Deep SEO written content */}
          <div 
            className={`lg:col-span-7 flex flex-col justify-center bg-transparent transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {currentFeature.h2}
            </h2>
            
            <p className="font-body text-[15px] md:text-base text-text-secondary leading-relaxed mb-6 md:mb-8 font-light max-w-2xl">
              {currentFeature.body}
            </p>

            {currentFeature.h3 && (
              <div className="hidden md:block mb-6 bg-white/[0.02] border border-white/5 p-5 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                <h3 className="font-display font-bold text-base md:text-lg text-white mb-2 tracking-tight">
                  {currentFeature.h3}
                </h3>
                {currentFeature.body2 && (
                  <p className="font-body text-sm text-text-secondary/80 leading-relaxed">
                    {currentFeature.body2}
                  </p>
                )}
              </div>
            )}

            {currentFeature.bullets && currentFeature.bullets.length > 0 && (
              <ul className="hidden md:flex flex-col gap-3.5 mb-8">
                {currentFeature.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm md:text-[15px] font-body text-text-secondary/90">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gradient-to-b from-[#2d2d3a] to-[#181822] flex items-center justify-center border border-white/10 shadow-[0_2px_0_0_#000,0_2px_4px_rgba(0,0,0,0.5)]">
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {currentFeature.cta && (
              <button className="group self-start inline-flex items-center gap-3 bg-gradient-to-b from-[#2d2d3a] to-[#181822] text-white/90 font-display font-medium text-sm tracking-wide px-6 py-4 rounded-xl border border-white/15 shadow-[0_5px_0_0_#000,0_5px_0_1.5px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.6)] active:translate-y-[4px] active:shadow-[0_1px_0_0_#000,0_1px_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.6)] transition-all cursor-pointer">
                <span>{currentFeature.cta}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            )}
            
          </div>

           {/* Right panel: Live 3D Extruded Smartphone bezel mockup */}
           <div 
             className={`lg:col-span-5 w-full flex items-center justify-center transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
           >
             {/* Master Solid 3D Bezel Chassis */}
             <div className="w-full max-w-[380px] min-h-[420px] md:h-[500px] bg-gradient-to-b from-[#14141a] to-[#0d0d10] border border-white/10 rounded-[2.25rem] shadow-[0_12px_0_0_#030305,0_12px_0_1.5px_rgba(255,255,255,0.05),0_30px_50px_-10px_rgba(0,0,0,1)] p-4 md:p-5 flex flex-col relative overflow-hidden mx-auto mb-10 md:mb-0">
                
                {/* Frame Inner Bezel / Dynamic Island Accent */}
                <div className="flex justify-between items-center mb-4 pl-1 shrinks-0">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                  </div>
                  <div className="text-[9px] font-display font-bold text-white/30 uppercase tracking-widest text-right">
                    {currentFeature.label}
                  </div>
                </div>

                {/* Inner Device Screen Canvas */}
                <div className="flex-1 w-full bg-[#07070a] rounded-2xl border border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-center items-center relative min-h-[350px] md:min-h-0">
                   {renderMockup(activeTab)}
                </div>

             </div>
           </div>

        </div>
      </div>

      {/* Call To Action */}
      <div className="w-full flex flex-col items-center justify-center mt-16 md:mt-24 px-4">
        <button 
          onClick={() => document.getElementById('tarifs')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center justify-center gap-2 md:gap-4 bg-gradient-to-b from-accent to-[#993b00] text-white font-display font-extrabold text-[13px] md:text-lg tracking-wide px-5 py-3 md:px-10 md:py-5 rounded-xl md:rounded-2xl shadow-[0_4px_0_0_#6b2900,0_4px_0_1px_rgba(255,255,255,0.15),0_10px_20px_rgba(245,158,11,0.4)] md:shadow-[0_6px_0_0_#6b2900,0_6px_0_2px_rgba(255,255,255,0.15),0_15px_30px_rgba(245,158,11,0.4)] active:translate-y-[4px] md:active:translate-y-[6px] active:shadow-[0_0px_0_0_#6b2900,0_0px_0_1px_rgba(255,255,255,0.1),0_5px_10px_rgba(245,158,11,0.6)] transition-all cursor-pointer w-auto max-w-full md:w-fit md:max-w-none md:whitespace-nowrap mx-auto border border-[#fcd34d]/30 overflow-hidden text-center"
        >
          <span>Divisez votre temps administratif par 2</span>
        </button>
        <p className="mt-5 text-text-secondary text-[12px] md:text-[13px] font-body text-center">
          Voyez l'offre qui vous fait gagner du temps dès cette semaine.
        </p>
      </div>

    </section>
  );
}
