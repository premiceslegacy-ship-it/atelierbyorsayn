import { useState, useRef, CSSProperties } from "react";
import { Laptop, Smartphone, Bot, ArrowLeft, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const steps = [
    {
      num: "01.",
      title: "On installe votre environnement en 48h.",
      desc: "Un appel, vos accès, vos bases métier. Vous démarrez avec un outil prêt à servir.",
      glowColor: "rgba(255, 159, 28, 0.15)",
      ledGlowColor: "rgba(255, 159, 28, 0.9)",
      badgeGlow: "rgba(255, 159, 28, 0.2)",
      iconColor: "text-accent",
      ledColor: "bg-accent",
      icon: Laptop,
    },
    {
      num: "02.",
      title: "Vous pilotez depuis le terrain.",
      desc: "Devis, factures, chantiers, équipes et dépenses restent au même endroit, sur téléphone ou ordinateur.",
      glowColor: "rgba(99, 102, 241, 0.15)",
      ledGlowColor: "rgba(99, 102, 241, 0.9)",
      badgeGlow: "rgba(99, 102, 241, 0.2)",
      iconColor: "text-accent-secondary",
      ledColor: "bg-accent-secondary",
      icon: Smartphone,
    },
    {
      num: "03.",
      title: "Atelier automatise ce qui vous ralentit.",
      desc: "Relances, marges, suivis et alertes se mettent à jour pour vous rendre du temps chaque semaine.",
      glowColor: "rgba(16, 185, 129, 0.15)",
      ledGlowColor: "rgba(16, 185, 129, 0.9)",
      badgeGlow: "rgba(16, 185, 129, 0.25)",
      iconColor: "text-emerald-500",
      ledColor: "bg-emerald-500",
      icon: Bot,
    },
  ];

  const getNearestMobileStepIndex = () => {
    const el = scrollRef.current;
    if (!el) return activeIndex;

    const cards: HTMLElement[] = [];
    el.querySelectorAll(':scope > div').forEach((card) => {
      if (card instanceof HTMLElement) cards.push(card);
    });
    const containerRect = el.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardDistance = Math.abs(cardRect.left + cardRect.width / 2 - containerCenter);
      if (cardDistance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = cardDistance;
      }
    });

    return nearestIndex;
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    if (!scrollRef.current || globalThis.innerWidth >= 1024) return;
    const newIndex = getNearestMobileStepIndex();
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  const jumpTo = (index: number) => {
    setActiveIndex(index);
    if (!scrollRef.current || globalThis.innerWidth >= 1024) return;
    const el = scrollRef.current;
    const targetCard = el.querySelectorAll<HTMLElement>(':scope > div')[index];
    if (!targetCard) return;
    isProgrammaticScroll.current = true;
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setTimeout(() => { isProgrammaticScroll.current = false; }, 600);
  };

  const handleNext = () => jumpTo((activeIndex + 1) % steps.length);
  const handlePrev = () => jumpTo((activeIndex - 1 + steps.length) % steps.length);

  return (
    <section id="fonctionnement" className="px-6 py-24 md:py-32 bg-[#050505] relative overflow-hidden scroll-mt-20">
      
      {/* 1. Custom Responsive Card Layout Styles (Pure mathematical constraints based on carousel) */}
      <style>{`
        :root {
          --card-width: 290px;
          --gap: 20px;
        }
        @media (min-width: 640px) {
          :root {
            --card-width: 360px;
            --gap: 28px;
          }
        }
        @media (min-width: 1024px) {
          :root {
            --card-width: 410px;
            --gap: 36px;
          }
        }
      `}</style>
      
      {/* 2. Structural high-end Blueprint Mesh Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] select-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* 3. Immersive hardware glow behind */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[15%] w-[550px] h-[550px] rounded-full bg-accent/5 blur-[130px] opacity-40" />
        <div className="absolute bottom-[20%] right-[15%] w-[550px] h-[550px] rounded-full bg-accent-secondary/5 blur-[130px] opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Modern Header + Controllers Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8 px-4">
          <div className="text-left max-w-3xl">
            <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] block mb-4 font-bold">
              Comment ça marche
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
              48h pour arrêter de courir après l'administratif
            </h2>
            <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed">
              Vous gardez vos habitudes. Atelier remet vos devis, factures et marges dans le bon ordre.
            </p>
          </div>

          {/* Solid 3D tactile navigation keys with clean 3D physical extrusion */}
          <div className="flex items-center gap-4 bg-[#141419] p-3 px-4 rounded-[1.25rem] border border-white/10 shadow-[0_8px_0_0_#000,0_8px_0_1.5px_rgba(255,255,255,0.1),0_16px_32px_rgba(0,0,0,0.8)] self-start lg:self-end mb-2">
            <button 
              onClick={handlePrev}
              aria-label="Étape précédente"
              className="group p-2.5 rounded-xl bg-gradient-to-b from-[#2d2d3a] to-[#181822] text-white/80 hover:text-white border border-white/15 active:translate-y-[4px] shadow-[0_5px_0_0_#000,0_5px_0_1.5px_rgba(255,255,255,0.15),0_10px_20px_rgba(0,0,0,0.6)] active:shadow-[0_1px_0_0_#000,0_1px_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.6)] transition-all cursor-pointer"
            >
              <ArrowLeft 
                className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-x-0.5"
                style={{ filter: "drop-shadow(0px 1px 0px #000) drop-shadow(0px 2px 0px #000) drop-shadow(0px 4px 6px rgba(0,0,0,0.8))" }}
              />
            </button>
            
            <div className="flex items-center gap-3 px-2">
              {steps.map((step, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => jumpTo(dotIdx)}
                  aria-label={`Aller à l'étape ${dotIdx + 1}`}
                  className="p-1 cursor-pointer flex items-center justify-center group"
                >
                  <span
                    className={`block w-2 h-2 rounded-full transition-all duration-300
                      ${activeIndex === dotIdx
                        ? `${step.ledColor} scale-125`
                        : "bg-[#2b2b36] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] group-hover:bg-[#3b3b4d] scale-100"
                      }
                    `}
                    style={activeIndex === dotIdx ? { boxShadow: `0 0 10px ${step.ledGlowColor}` } : undefined}
                  />
                </button>
              ))}
            </div>

            <button 
              onClick={handleNext}
              aria-label="Étape suivante"
              className="group p-2.5 rounded-xl bg-gradient-to-b from-[#2d2d3a] to-[#181822] text-white/80 hover:text-white border border-white/15 active:translate-y-[4px] shadow-[0_5px_0_0_#000,0_5px_0_1.5px_rgba(255,255,255,0.15),0_10px_20px_rgba(0,0,0,0.6)] active:shadow-[0_1px_0_0_#000,0_1px_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.6)] transition-all cursor-pointer"
            >
              <ArrowRight 
                className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ filter: "drop-shadow(0px 1px 0px #000) drop-shadow(0px 2px 0px #000) drop-shadow(0px 4px 6px rgba(0,0,0,0.8))" }}
              />
            </button>
          </div>
        </div>

        {/* Cinematic Card Roulette Section with generously padded heights to prevent border clipping */}
        <div className="relative w-full h-auto lg:h-[620px] flex items-center justify-center overflow-visible">
          
          {/* Active Card Glow Spotlight backdrop */}
          <div className="hidden lg:flex absolute inset-0 pointer-events-none items-center justify-center select-none z-0">
            <div className="w-[300px] h-[300px] rounded-full bg-accent/5 blur-[90px] opacity-40" />
          </div>

          {/* MOBILE SCROLL CONTIANER (Native horizontal scroll) */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full lg:hidden overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 pb-12 pt-4 [&::-webkit-scrollbar]:hidden"
            style={{ paddingInline: "max(0px, calc((100% - 300px) / 2))" }}
          >
            {steps.map((step, i) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={i}
                  className="relative w-[300px] min-w-[300px] h-[400px] snap-center bg-gradient-to-b from-[#14141a] to-[#0d0d10] rounded-[2rem] p-6 flex flex-col justify-end border border-white/10 shadow-[0_6px_0_0_#000,0_6px_0_1px_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.8),inset_0_1px_0px_rgba(255,255,255,0.05)]"
                >
                  <span className={`absolute top-6 left-6 font-display text-[70px] font-black leading-none select-none pointer-events-none z-0 ${step.iconColor} opacity-[0.1]`}>
                    {step.num}
                  </span>
                  
                  <div className="relative z-20 mt-auto">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-b from-[#2e2e3a] to-[#16161d] flex items-center justify-center mb-5 border border-white/10 shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.6),inset_0_1.5px_1.5px_rgba(255,255,255,0.18)]`}>
                      <IconComponent className={`w-5 h-5 stroke-[2.5] ${step.iconColor}`} />
                    </div>

                    <h3 className="font-display text-xl font-extrabold tracking-tight mb-2 leading-snug text-white">
                      {step.title}
                    </h3>

                    <p className="font-body text-[13px] leading-relaxed text-text-secondary/90">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP Cards Stack Layout Container with no clipping constraints */}
          <div className="hidden lg:flex relative w-full h-[580px] max-w-7xl mx-auto overflow-visible items-center justify-center">
            {steps.map((step, i) => {
              const IconComponent = step.icon;
              
              const diff = i - activeIndex;
              // Loop values properly for 3 steps
              let offset = diff;
              if (diff < -1) offset += 3;
              if (diff > 1) offset -= 3;

              const isActive = offset === 0;
              const isHoveredLocal = hoveredIndex === i;
              const isHighlighted = isActive || isHoveredLocal;

              return (
                <div 
                  key={i} 
                  onClick={() => {
                    if (!isActive) setActiveIndex(i);
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    transform: `translateX(calc(${offset} * (var(--card-width) + var(--gap)))) scale(${isActive ? 1.05 : 0.92}) translateY(${isActive ? -24 : 0}px)`,
                    opacity: isActive ? 1 : isHoveredLocal ? 0.65 : 0.35,
                    zIndex: isActive ? 30 : 10,
                    boxShadow: isActive 
                      ? `0 12px 0 0 #000, 0 12px 0 1.5px rgba(255, 255, 255, 0.15), 0 45px 80px -15px rgba(0, 0, 0, 1), 0 5px 30px -10px ${step.glowColor}, inset 0 1.5px 0px rgba(255, 255, 255, 0.15)` 
                      : `0 6px 0 0 #000, 0 6px 0 1px rgba(255, 255, 255, 0.06), 0 12px 30px rgba(0, 0, 0, 0.8), inset 0 1px 0px rgba(255, 255, 255, 0.05)`
                  }}
                  className={`absolute w-[var(--card-width)] h-[440px] md:h-[480px] select-none group bg-gradient-to-b from-[#14141a] to-[#0d0d10] rounded-[2.5rem] transition-all duration-500 ease-out p-8 md:p-10 flex flex-col justify-end cursor-pointer
                    border border-white/10
                    ${isActive 
                      ? "border-white/20" 
                      : "blur-[0.5px]"
                    }
                    ${isHoveredLocal && !isActive ? "blur-0 border-white/15" : ""}
                  `}
                >
                  
                  {/* ABSOLUTE BACKGROUND SEQUENCE NUMBER - LOWERED OPACITY & INDEX TO PREVENT COLLISION WITH ICONS */}
                  <span className={`absolute top-6 left-8 font-display text-[90px] md:text-[104px] font-black leading-none transition-all duration-500 select-none pointer-events-none z-0
                    ${isHighlighted 
                      ? step.iconColor + " opacity-[0.35]" 
                      : step.iconColor + " opacity-[0.08]"
                    }
                  `}>
                    {step.num}
                  </span>

                  {/* ABSOLUTE FLOATING LED STATUS INDICATOR */}
                  <div className="absolute top-8 right-8 z-10">
                    <span
                      className={`block w-2 h-2 rounded-full ring-2 ring-black/40 ${step.ledColor}
                        ${isHighlighted ? "animate-pulse opacity-100" : "opacity-30"}`}
                      style={isHighlighted ? { boxShadow: `0 0 8px ${step.ledGlowColor}` } : undefined}
                    />
                  </div>

                  {/* Solid physical relief 3D icon Stamp + Text Layout */}
                  <div className="relative z-20 mt-auto">
                    
                    {/* EXTRUDED 3D SOLID PHYSICAL KEYCAP ICON BADGE (CLEAN 3D HEIGHT WITH REFINED TEXTURED OUTLINE) */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-b from-[#2e2e3a] to-[#16161d] flex items-center justify-center mb-6 transition-all duration-300
                      border border-white/10
                      ${isHighlighted 
                        ? "scale-105 -translate-y-2 shadow-[0_6px_0_0_#000,0_6px_0_1.5px_rgba(255,255,255,0.15),0_16px_28px_rgba(0,0,0,0.85),0_0_20px_var(--badge-glow),inset_0_1.5px_1.5px_rgba(255,255,255,0.3)]"
                        : "group-hover:-translate-y-1 shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.6),inset_0_1.5px_1.5px_rgba(255,255,255,0.18)]"
                      }
                    `}
                    style={{ "--badge-glow": step.badgeGlow } as CSSProperties}
                    >
                      <IconComponent 
                        className={`w-6 h-6 stroke-[2.5] transition-all duration-300
                          ${isHighlighted 
                            ? step.iconColor 
                            : "text-white/40"
                          }
                        `} 
                        style={{
                          filter: isHighlighted
                            ? "drop-shadow(0px 1px 0px #000) drop-shadow(0px 2px 0px #000) drop-shadow(0px 3px 0px #000) drop-shadow(0px 6px 8px rgba(0,0,0,0.85))"
                            : "drop-shadow(0px 1px 0px #000) drop-shadow(0px 2px 0px rgba(0,0,0,0.8))"
                        }}
                      />
                    </div>

                    {/* Step Title */}
                    <h3 className={`font-display text-xl sm:text-2xl font-extrabold tracking-tight mb-3 transition-colors duration-300 leading-snug
                      ${isHighlighted ? "text-white" : "text-white/85"}
                    `}>
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className={`font-body text-[13.5px] sm:text-[14px] leading-relaxed max-w-sm transition-colors duration-500
                      ${isHighlighted ? "text-text-secondary" : "text-text-secondary/60"}
                    `}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Customer Benefit CTA */}
        <div className="relative z-20 mt-8 mb-4 w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center px-4 md:pb-12">
          <div className="inline-flex flex-col items-center w-full sm:w-auto">
            <button
              onClick={() => document.getElementById('tarifs')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-b from-[#ffffff] to-[#d4d4d4] text-black px-6 py-3.5 md:px-10 md:py-5 rounded-2xl border border-white/50 shadow-[0_6px_0_0_#808080,0_6px_0_1.5px_rgba(255,255,255,0.5),0_16px_32px_rgba(0,0,0,0.8)] active:translate-y-[4px] active:shadow-[0_2px_0_0_#808080,0_2px_0_1px_rgba(255,255,255,0.5),0_6px_12px_rgba(0,0,0,0.6)] transition-all cursor-pointer"
            >
              <span className="font-display font-black text-[15px] md:text-xl drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] tracking-tight whitespace-nowrap">
                Reprenez le contrôle
              </span>
              <ArrowRight className="hidden md:block w-5 h-5 md:w-6 md:h-6 stroke-[3] transition-transform duration-300 group-hover:translate-x-1.5 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]" />
            </button>
            <span className="mt-6 md:mt-8 font-sans text-[11px] md:text-[13px] font-bold text-text-secondary uppercase tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 leading-tight w-full whitespace-nowrap">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse shrink-0"></span>
              Jusqu'à 15h gagnées / sem.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
