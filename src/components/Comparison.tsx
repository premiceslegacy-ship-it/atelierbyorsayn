import { useState } from "react";
import { 
  Clock, 
  TrendingDown, 
  BadgeCheck, 
  Quote, 
  Users, 
  MapPin, 
  Wrench, 
  Star, 
  FileWarning,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function Comparison() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: "testi-stephane",
      initial: "S",
      name: "Stéphane M.",
      profession: "Menuisier & charpentier métallique",
      effectif: "4 salariés",
      location: "Rhône-Alpes",
      quote: "Avant Atelier, je passais mes dimanches après-midi à rédiger mes devis et je traînais plus de 12 500 € de factures impayées. En moins d'un mois, j'ai récupéré 100% de mes retards grâce aux relances automatiques et je ne travaille plus le week-end."
    },
    {
      id: "testi-julien",
      initial: "J",
      name: "Julien R.",
      profession: "Électricien du bâtiment",
      effectif: "Indépendant",
      location: "Gironde",
      quote: "Dicter mes infos de chantier à la voix depuis mon camion et voir le devis généré en 1 minute... Fini la boule au ventre le dimanche soir devant la paperasse, j'ai regagné 6 heures de vrai temps libre par semaine."
    },
    {
      id: "testi-sandrine",
      initial: "S",
      name: "Sandrine T.",
      profession: "Plâtrerie & rénovation intégrale",
      effectif: "7 salariés",
      location: "Occitanie",
      quote: "Travailler à l'aveugle me rongeait. Grâce au suivi des marges en direct d'Atelier, notre rentabilité nette a bondi de 18% en un semestre. C'est un soulagement immense d'enfin savoir qu'un chantier est rentable avant même de le commencer."
    },
    {
      id: "testi-marc",
      initial: "M",
      name: "Marc D.",
      profession: "Peintre en bâtiment",
      effectif: "2 salariés",
      location: "Bretagne",
      quote: "L'angoisse du découvert m'empêchait littéralement de dormir. Depuis que j'utilise Atelier, le délai de paiement moyen de mes clients est tombé de 45 à 12 jours. Je respire enfin, libéré de ce poids."
    },
    {
      id: "testi-karim",
      initial: "K",
      name: "Karim B.",
      profession: "Plombier-chauffagiste",
      effectif: "Indépendant",
      location: "Île-de-France",
      quote: "Chaque soir, c'était le cauchemar face à la montagne de devis. Avec le chiffrage guidé, je sors mes propositions en moins de 3 minutes chrono. Le fait d'avoir augmenté mon taux de signature de 40% m'offre une sérénité incroyable."
    },
    {
      id: "testi-sophie",
      initial: "S",
      name: "Sophie L.",
      profession: "Maçonnerie générale",
      effectif: "12 salariés",
      location: "Normandie",
      quote: "Les relances clients téléphoniques étaient une source de tension permanente. Les rappels automatiques et bienveillants m'ont fait économiser 10 heures par mois, et notre encours client a chuté de 30 k€. La tranquillité d'esprit n'a pas de prix."
    },
    {
      id: "testi-antoine",
      initial: "A",
      name: "Antoine V.",
      profession: "Couvreur-zingueur",
      effectif: "5 salariés",
      location: "Grand Est",
      quote: "La charge mentale de la gestion administrative me bouffait la santé. En fluidifiant toute mon entreprise sur Atelier, j'ai divisé par 3 le temps administratif. Retrouver mes soirées en famille tout en facturant 20% de plus m'a rendu le sourire."
    }
  ];

  const stats = [
    {
      id: "stat-payments",
      badge: "Retards de paiement",
      metric: "1 sur 4",
      highlight: "+46 jours de retard moyen",
      desc: "En France, un quart des factures BTP est payé en retard. Atelier sécurise votre trésorerie grâce à ses relances automatiques et bienveillantes.",
      icon: FileWarning,
      iconColor: "text-red-400",
      bgGlow: "rgba(239, 68, 68, 0.08)"
    },
    {
      id: "stat-admin",
      badge: "Charge administrative",
      metric: "2 heures",
      highlight: "perdues chaque jour par les artisans",
      desc: "Le temps moyen consacré à des tâches administratives pesantes au lieu d'être sur le terrain. Atelier vous rend ce temps précieux.",
      icon: Clock,
      iconColor: "text-accent",
      bgGlow: "rgba(255, 159, 28, 0.08)"
    },
    {
      id: "stat-legal",
      badge: "Conformité légale",
      metric: "Sept. 2026",
      highlight: "Facturation obligatoire",
      desc: "La réforme s'imposera à toutes les entreprises françaises, y compris les TPE. Atelier vous prépare et assure votre conformité Factur-X native.",
      icon: BadgeCheck,
      iconColor: "text-emerald-400",
      bgGlow: "rgba(16, 185, 129, 0.08)"
    }
  ];

  return (
    <section id="preuve-sociale" className="px-6 py-24 md:py-32 bg-[#050505] relative overflow-hidden scroll-mt-20">
      
      {/* Structural high-end Blueprint Mesh Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Immersive hardware glows behind cards */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[30%] left-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[140px] opacity-40" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[140px] opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Section Header: Emotional & Reassuring */}
        <div className="text-left max-w-3xl mb-16 md:mb-20 px-4">
          <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] block mb-4 font-extrabold">
            Impact & Réalité du terrain
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Ce que ça change concrètement
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Gérer un chantier ne devrait pas signifier passer vos dimanches après-midi sur un clavier ou courir après vos factures. Voici pourquoi Atelier a été conçu par et pour les artisans du bâtiment.
          </p>
        </div>

        {/* Core Layout: Grid for Stats & Highlighted Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch px-4">
          
          {/* Left panel: 3 Market Statistics Cards (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-center">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={stat.id}
                    style={{
                      boxShadow: `0 4px 0 0 #000, 0 4px 0 1px rgba(255, 255, 255, 0.05), 0 12px 24px rgba(0, 0, 0, 0.5), inset 0 1.5px 0px rgba(255, 255, 255, 0.05)`
                    }}
                    className="group bg-gradient-to-b from-[#14141a] to-[#0d0d10] p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 relative overflow-hidden flex flex-col md:flex-row gap-5 items-start md:items-center"
                  >
                    {/* Subtle micro background glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at center, ${stat.bgGlow} 0%, transparent 70%)` }}
                    />

                    {/* Left Icon Panel */}
                    <div className="w-12 h-12 rounded-xl bg-[#2e2e3a]/10 border border-white/5 flex items-center justify-center shrink-0 shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05)]">
                      <IconComponent className={`w-5 h-5 ${stat.iconColor} stroke-[2.5]`} />
                    </div>

                    {/* Middle Content */}
                    <div className="flex-1 text-left relative z-10">
                      <div className="text-[10px] font-display font-black text-text-secondary/60 uppercase tracking-widest mb-1">
                        {stat.badge}
                      </div>
                      
                      {/* Big highlight number embedded nicely */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 mb-2">
                        <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                          {stat.metric}
                        </span>
                        <span className="font-display font-bold text-xs sm:text-sm text-accent tracking-wide">
                          • {stat.highlight}
                        </span>
                      </div>
                      
                      <p className="font-body text-[13.5px] text-text-secondary leading-relaxed font-light">
                        {stat.desc}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

          {/* Right panel: Large Dynamic Testimonial Placeholder Card with Interactive Controls (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div 
              style={{
                boxShadow: `0 16px 0 0 #030305, 0 16px 0 1.5px rgba(255, 255, 255, 0.05), 0 40px 60px -10px rgba(0, 0, 0, 1), inset 0 1.5px 0px rgba(255, 255, 255, 0.1)`
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-gradient-to-b from-[#14141a] to-[#0d0d10] p-8 rounded-[2.25rem] border border-white/10 transition-all duration-300 hover:border-white/15 relative overflow-hidden flex flex-col justify-between h-full min-h-[460px]"
            >
              
              {/* Card top details */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  {/* Real visual 5-star ranking indicator */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Navigation keys for multiple testimonials */}
                  <div className="flex items-center gap-1.5 bg-[#1a1b23] border border-white/5 p-1 rounded-xl">
                    <button
                      onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                      className="p-1 hover:bg-white/5 text-text-secondary hover:text-white rounded-md transition-colors cursor-pointer"
                      title="Précédent"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-text-secondary px-1 font-sans select-none">
                      {activeTestimonial + 1}/{testimonials.length}
                    </span>
                    <button
                      onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
                      className="p-1 hover:bg-white/5 text-text-secondary hover:text-white rounded-md transition-colors cursor-pointer"
                      title="Suivant"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtitle kicker with live testimony indicator */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] bg-accent/20 border border-accent/30 text-accent font-display font-bold px-2 py-0.5 rounded shadow-[0_1.5px_0_0_rgba(0,0,0,0.5)] tracking-wider uppercase inline-block">
                    Témoignage vérifié
                  </span>
                  
                  {/* Dots indicator */}
                  <div className="flex gap-1.5">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-350 cursor-pointer ${
                          activeTestimonial === idx ? "bg-accent scale-125" : "bg-white/15 hover:bg-white/30"
                        }`}
                        title={`Témoignage ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial Direct blockquote quotation */}
                <div className="min-h-[140px] md:min-h-[120px] flex items-center">
                  <h3 className="font-body text-base md:text-lg text-white/95 tracking-tight italic leading-relaxed text-left font-light border-l-2 border-accent pl-4 transition-all duration-300">
                    "{testimonials[activeTestimonial].quote}"
                  </h3>
                </div>
              </div>

              {/* Client Profile details block */}
              <div className="border-t border-white/5 pt-6 mt-4">
                <div className="flex items-center gap-4 text-left">
                  {/* Profile Initial container */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#2e2e3a] to-[#16161d] flex items-center justify-center text-white text-base font-display font-black border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] shrink-0 select-none">
                    {testimonials[activeTestimonial].initial}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block text-white font-display font-extrabold text-sm tracking-wide">
                      {testimonials[activeTestimonial].name}
                    </span>
                    <span className="block text-text-secondary font-body text-[11px] md:text-xs mt-0.5 flex flex-wrap items-center gap-1 md:gap-1.5 leading-snug">
                      <Wrench className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent shrink-0" />
                      {testimonials[activeTestimonial].profession}
                    </span>
                  </div>
                </div>

                {/* Bottom hardware labels for region & team */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 mt-4 pt-4 border-t border-white/5">
                  <div className="bg-[#050505] p-2 md:p-2.5 rounded-xl border border-white/5 flex items-start md:items-center gap-1.5 md:gap-2">
                    <Users className="w-3 md:w-3.5 h-3 md:h-3.5 text-text-secondary/60 shrink-0 mt-0.5 md:mt-0" />
                    <div className="text-left w-full">
                       <span className="block text-[8px] md:text-[9px] font-display text-text-secondary/40 font-bold uppercase leading-none">Effectif</span>
                      <span className="text-[10px] md:text-[11px] font-display text-white font-bold block">{testimonials[activeTestimonial].effectif}</span>
                    </div>
                  </div>

                  <div className="bg-[#050505] p-2 md:p-2.5 rounded-xl border border-white/5 flex items-start md:items-center gap-1.5 md:gap-2">
                    <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5 text-text-secondary/60 shrink-0 mt-0.5 md:mt-0" />
                    <div className="text-left w-full">
                       <span className="block text-[8px] md:text-[9px] font-display text-text-secondary/40 font-bold uppercase leading-none">Localisation</span>
                      <span className="text-[10px] md:text-[11px] font-display text-white font-bold block">{testimonials[activeTestimonial].location}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
