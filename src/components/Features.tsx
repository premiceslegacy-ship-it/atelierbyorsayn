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
  Share2
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
      h2: "Créer un devis de chantier en 5 minutes sur votre téléphone",
      body: (
        <>
          Votre catalogue se construit à votre rythme dans l'application avec vos tarifs matériaux, vos prestations habituelles et votre tarification au mètre carré ou au mètre linéaire selon votre métier. Une fois enregistré, vous sélectionnez la tâche, vous renseignez les valeurs, et le calcul se fait automatiquement pour votre <span className="text-white font-medium">devis au mètre carré</span>. Vous envoyez le document via votre <span className="text-white font-medium">devis chantier téléphone</span> directement depuis le terrain, avant même d'avoir démarré votre camion.
          <span className="hidden md:inline"><br /><br />
          Un devis envoyé dans l'heure qui suit la visite client multiplie vos chances de le voir signé. Atelier se comporte comme le meilleur <span className="text-white font-medium">logiciel devis artisan</span> de votre quotidien pour vous donner cet avantage compétitif sans effort administratif.</span>
        </>
      ),
      bullets: [
        "Dictée vocale intelligente ou sélection de vos prestations types depuis le chantier",
        "Tarification modulaire au m², au ml ou au forfait selon votre métier",
        "Signature électronique intégrée directement accessible pour vos clients"
      ]
    },
    {
      id: "relances",
      label: "Relances & trésorerie",
      h2: "Relances automatiques de vos factures impayées",
      body: (
        <>
          Savoir <span className="text-white font-medium">comment relancer un client qui ne paie pas</span> est un combat quotidien pour les artisans. Chaque matin, Atelier identifie vos factures en retard et vos devis restés sans réponse. Grâce au module de <span className="text-white font-medium">relance facture impayée automatique</span>, des relances cordiales et professionnelles sont rédigées et expédiées de manière autonome. Vous gagnez du temps sans passer les appels gênants.
          <span className="hidden md:inline"><br /><br />
          En France, une facture sur quatre est réglée en retard, avec un délai moyen dépassant 46 jours. Pour un artisan réalisant 500 000 euros de chiffre d'affaires, cela représente un poids considérable sur la trésorerie. Notre outil apporte un <span className="text-white font-medium">suivi factures impayées artisan</span> hautement performant.</span>
        </>
      ),
      bullets: [
        "Relances intelligentes par e-mail adaptées à l'échéance et de ton respectueux",
        "Tableau de bord de trésorerie simplifié : payé, en attente et restant dû",
        "Gestion automatique des acomptes initiaux, des états d'avancement et du solde"
      ]
    },
    {
      id: "rentabilite",
      label: "Chantiers & rentabilité",
      h2: "Suivre la rentabilité réelle de vos chantiers en temps réel",
      body: (
        <>
          Atelier consolide pour chaque projet vos heures pointées, vos achats de matériaux, vos sous-traitants et l'ensemble des dépenses annexes. Avec un authentique <span className="text-white font-medium">suivi coûts chantier artisan</span>, vous pilotez votre <span className="text-white font-medium">marge chantier réelle main d'oeuvre matériaux</span> en continu, sans mauvaise surprise finale.
          <span className="hidden md:inline"><br /><br />
          Si un projet commence à s'éloigner du budget prévisionnel fixé, une alerte intelligente vous prévient immédiatement. Réaliser le <span className="text-white font-medium">calcul rentabilité chantier BTP</span> n'a jamais été aussi simple et accessible.</span>
        </>
      ),
      h3: "Le calcul de marge que votre comptable ne peut pas faire en cours de route",
      body2: "Votre expert-comptable dresse le bilan de l'année passée mais Atelier vous donne la vision en temps réel de votre rentabilité, chaque jour, directement sur vos chantiers.",
      bullets: [
        "Marge brute et nette actualisées après déduction de la main-d'œuvre et de la matière",
        "Alerte de sécurité visuelle automatique en cas de déviation budgétaire",
        "Gestion des facturations à l'avancement avec recalcul automatique du restant dû"
      ]
    },
    {
      id: "pointage",
      label: "Équipes & pointage",
      h2: "Vos ouvriers pointent leurs heures sans installer d'application",
      body: (
        <>
          Chaque compagnon accède directement à son espace via un message ou un lien sécurisé unique envoyé par SMS. Il peut consulter son <span className="text-white font-medium">planning équipe artisan</span>, découvrir l'adresse de ses chantiers, et assurer son <span className="text-white font-medium">pointage heures chantier téléphone</span> en deux clics, sans mot de passe à retenir.
          <span className="hidden md:inline"><br /><br />
          Vous n'avez plus à courir après les justificatifs papier ou les messages le vendredi soir. Le service de <span className="text-white font-medium">suivi heures ouvriers BTP</span> s'organise seul et alimente instantanément vos indicateurs mensuels.</span>
        </>
      ),
      bullets: [
        "Accès instantané par mobile sans mot de passe ni téléchargement requis",
        "Pointage horaire détaillé par chantier et par tâche spécifique en cours",
        "Export et centralisation des grilles d'heures mensuelles en un clic pour la paie"
      ]
    },
    {
      id: "facturation2026",
      label: "Facturation 2026",
      h2: "Facturation électronique : Atelier est prêt pour la réforme de 2026",
      body: (
        <>
          À compter du 1er septembre 2026, l'obligation d'accepter la réception de factures électroniques structurées concernera absolument toutes les structures, y compris les petits entrepreneurs et artisans du bâtiment.
          L'émission obligatoire entrera ensuite en vigueur. Un simple fichier PDF au format d'origine perdra sa conformité légale.
          <span className="hidden md:inline"><br /><br />
          Notre <span className="text-white font-medium">logiciel facture électronique BTP</span> produit nativement vos factures selon le standard international PDF/A-3 avec métadonnées Factur-X intégrées. Vous êtes assuré de respecter la législation sur la <span className="text-white font-medium">facturation électronique artisan 2026</span> et la conformité de la <span className="text-white font-medium">facturation électronique obligatoire TPE</span> en toute sérénité.</span>
        </>
      ),
      h3: "Qu'est-ce que le format réglementaire Factur-X ?",
      body2: "La norme hybride Factur-X associe un rendu PDF clair et lisible par vos clients, doublé d'un document XML structuré invisible mais nécessaire aux systèmes de l'administration fiscale. C'est le précieux sésame légal que l'État s'apprête à exiger pour le standard Factur-X artisan obligatoire. Atelier s'en charge en toute transparence.",
      bullets: []
    },
    {
      id: "agent",
      label: "Assistant WhatsApp",
      isComingSoon: true,
      h2: "Mathieu, votre assistant de terrain intelligent par WhatsApp",
      body: (
        <>
          Atelier intègre Mathieu, un interlocuteur virtuel que vous contactez directement par message à n'importe quel moment de la journée. Vous communiquez de façon tout à fait naturelle en français, comme avec un secrétaire de confiance.
          <span className="hidden md:inline"><br /><br />
          Il accède instantanément à vos prestations types, vos chantiers du jour, l'état de vos règlements ou de vos factures de situation. Dictez-lui un devis de pliage ou de bardage à la fin de vos métrés, confirmez d'un mot et le devis est expédié.
          <br /><br />
          Pas de menu compliqué, pas de formulaire à remplir. Un simple message sur votre messagerie habituelle suffit.</span>
        </>
      ),
      chatExample: [
        { role: "user", text: "Pointe 4h sur Martin et envoie la facture de solde." },
        { role: "bot", text: "4h pointées sur chantier Martin. FAC-2026-031 générée et envoyée à pierre.martin@gmail.com. Relance automatique programmée dans 30 jours." }
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
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center text-accent border border-accent/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-display font-bold text-accent tracking-wider uppercase">Nouveau devis</span>
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

      case 5: // Real French WhatsApp Screen Interface
        return (
          <div className="flex flex-col w-full h-full bg-[#0b141a] rounded-xl relative overflow-hidden text-left border border-emerald-500/10">
            
            {/* Real WhatsApp Header Bar */}
            <div className="bg-[#1f2c34] px-3 py-2.5 flex items-center justify-between border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" className="text-emerald-500 shrink-0">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.065-.301-.15-1.265-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.065-.17-.295-.017-.454.131-.603.134-.135.301-.35.451-.523.15-.181.201-.3.301-.502.1-.2.05-.38-.025-.521-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.301-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.36z" fill="currentColor" stroke="none"></path>
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.846.5 3.584 1.38 5.071L2 22l5.044-1.3A9.957 9.957 0 0012 22z"></path>
                </svg>
                <div className="relative ml-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#128c7e] to-[#075e54] flex items-center justify-center text-white text-xs font-display font-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
                    M
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1f2c34]" />
                </div>
                <div className="ml-1">
                  <div className="flex items-center gap-1">
                    <span className="text-white text-xs font-display font-bold tracking-wide">Mathieu</span>
                    <span className="text-[9px] bg-emerald-500/20 text-[#b4f481] px-1 py-0.1 select-none rounded text-center scale-90 font-bold border border-emerald-500/30">Bot</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-body -mt-0.5 block">en ligne</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3.5 text-white/70">
                <Video className="w-4.5 h-4.5 cursor-pointer hover:text-white" />
                <Phone className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Conversation Grid with Authentic WhatsApp background */}
            <div className="flex-1 p-3.5 flex flex-col justify-end gap-3.5 relative">
              
              {/* WhatsApp background pattern opacity simulator */}
              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 pointer-events-none" />
              <div className="absolute inset-0 bg-[#0b141a]/60 z-0 pointer-events-none" />

              {/* Day Badge */}
              <div className="self-center bg-[#121b22] border border-white/5 px-3 py-1 rounded-lg text-[9px] font-sans font-bold text-text-secondary/80 shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-10 uppercase tracking-widest select-none">
                Aujourd'hui
              </div>

              {/* User message sent on WhatsApp (Green-ish bubble) */}
              <div className="self-end max-w-[85%] relative z-10 flex flex-col items-end">
                <div className="bg-[#005c4b]/95 text-white p-3 rounded-2xl rounded-tr-none shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#005c4b]/50 text-[12.5px] font-body leading-relaxed">
                  Pointe 4h sur Martin et envoie la facture de solde pour la charpente.
                </div>
                <div className="flex items-center gap-1.5 mt-1 pr-1 text-[9px] text-text-secondary font-sans select-none">
                  <span>14:26</span>
                  <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] stroke-[2.5]" />
                </div>
              </div>

              {/* Bot response message (Grey bubble) */}
              <div className="self-start max-w-[90%] relative z-10">
                <div className="bg-[#202c33]/95 text-[#e9edef] p-3 rounded-2xl rounded-tl-none shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1.5px_1.5px_rgba(255,255,255,0.05)] border border-white/5 text-[12.5px] font-body leading-relaxed flex flex-col gap-2">
                  <p>4h pointées avec succès sur le chantier <strong>Martin</strong>.</p>
                  
                  <div className="bg-black/25 p-2 rounded-lg border border-white/5 text-[11px] text-text-secondary flex items-start gap-2 leading-snug">
                    <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
                    <div>
                      <span className="block font-bold text-white/95">FAC-2026-031_solde.pdf</span>
                      <span>Montant : 1 650,00 € TTC générée et expédiée au client.</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> Relance automatique programmée (30j)
                  </span>
                </div>
                <div className="text-[9px] text-text-secondary font-sans mt-1 pl-1 select-none">
                  <span>14:26</span>
                </div>
              </div>

            </div>

            {/* Bottom Input dock simulation */}
            <div className="bg-[#1f2c34] px-3 py-2 flex items-center justify-between gap-2.5 border-t border-white/5 relative z-10">
              <div className="flex items-center gap-2 text-white/60">
                <Paperclip className="w-4.5 h-4.5 cursor-pointer hover:text-white" />
              </div>

              <div className="flex-1 bg-[#2a3942] rounded-full px-3.5 py-1.5 border border-white/5 text-[11px] text-white/30 truncate flex items-center justify-between">
                <span>Écrire à Mathieu...</span>
                <Camera className="w-4 h-4 text-white/50 cursor-pointer hover:text-white" />
              </div>

              <div className="w-7 h-7 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black shrink-0 cursor-pointer transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                <Mic className="w-3.5 h-3.5 stroke-[2.5]" style={{ transform: "rotate(0deg)" }} />
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
          Configurez votre environnement personnalisé en 2 minutes.
        </p>
      </div>

    </section>
  );
}
