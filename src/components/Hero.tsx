import { ArrowRight, Play, CheckCircle2, Zap, Droplet, Hammer, Paintbrush } from "lucide-react";
import DashboardMockup from "./DashboardMockup";
import IPhoneMockup from "./IPhoneMockup";

export default function Hero() {
  return (
    <section className="px-3 md:px-6 py-4">
      {/* 
        The Huge Immersive Hero Card 
        Styled identically to the Solsars screenshot with extremely rounded corners, ultra-dark tone, and detailed BTP dashboard mock layers.
      */}
      <div className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] bg-bg-base overflow-hidden border border-white/10 min-h-[580px] lg:min-h-[680px] flex flex-col justify-start gap-6 md:gap-8 p-5 md:p-12 lg:p-14">
        
        {/* HIGH-FIDELITY BTP COCKPIT APP BACKDROP LAYER */}
        <div className="absolute inset-0 select-none overflow-hidden z-0">
          {/* Glowing tech mesh grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Elegant radial mesh lights */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px]" />
          <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] rounded-full bg-accent-secondary/5 blur-[120px]" />
          
          {/* High fidelity background dashboard rendering. 
              Beautiful offset placing to represent a dark desktop/tablet app on the background. */}
          <div className="absolute right-[-20%] md:right-[-100px] top-[14%] w-[120%] md:w-[80%] max-w-[900px] opacity-10 md:opacity-[0.22] lg:opacity-[0.35] lg:scale-[0.9] xl:scale-100 pointer-events-none transform rotate-[2deg] rounded-3xl origin-top-right transition-all duration-500">
            <DashboardMockup />
          </div>
        </div>

        {/* Graduated double-layer background overlay masks to guarantee high visual contrast and absolute clean readability for text on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/90 to-bg-base/40 md:to-bg-base/20 pointer-events-none z-10" />
        <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-b md:bg-gradient-to-r from-bg-base via-bg-base/90 to-transparent md:to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-bg-base to-transparent pointer-events-none z-10" />

        {/* 1. TOP LEFT: HIGH-IMPACT HERO HEADER */}
        <div className="relative z-20 w-full max-w-4xl pt-2 lg:pt-4 text-center lg:text-left flex flex-col items-center lg:items-start md:mx-auto lg:mx-0">
          <h1 
            id="hero-main-title"
            className="font-display text-4xl sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.2rem] font-black leading-[1.05] tracking-tight text-white mb-2"
          >
            Votre métier,<br className="hidden lg:block"/> c’est le chantier.<br />
            <span className="text-accent relative inline-block drop-shadow-[0_0_30px_rgba(255,159,28,0.25)] font-black mt-1 lg:mt-0">
              Pas les devis à 22h.
            </span>
          </h1>
        </div>

        {/* 2. BOTTOM SECTION */}
        <div className="relative z-25 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start mt-0">
          
          {/* Bottom Left Area: Subtitle & Premium Button Cluster */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start w-full">
            {/* Elegant, clean body text */}
            <p className="font-body text-[15px] md:text-lg lg:text-[19px] leading-relaxed text-text-secondary mb-6 md:mb-8 text-center lg:text-left max-w-sm md:max-w-xl lg:max-w-none lg:whitespace-nowrap select-text">
              L'outil des artisans du second œuvre qui ont mieux à faire après 18h.
            </p>
            
            {/* CTA cluster mimicking ultra-premium mechanical keyboard keys */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-4 w-full sm:max-w-[585px]">
              {/* Principal Solsars tactile/PC-key style CTA */}
              <button 
                id="cta-how-it-works"
                onClick={() => document.getElementById('fonctionnement')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center justify-center md:justify-between gap-4 md:gap-6 bg-white text-bg-base font-display font-extrabold text-sm md:text-[15px] px-4 md:px-6 py-2.5 md:py-3 pr-2 rounded-xl border border-white border-b-[3px] md:border-b-[4px] border-b-neutral-300 hover:bg-neutral-50 active:translate-y-[3px] active:border-b-[1px] transition-all duration-100 cursor-pointer shadow-md w-full sm:w-auto flex-1"
              >
                <span>Comment ça marche</span>
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-accent flex items-center justify-center text-bg-base shrink-0">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                </div>
              </button>
 
              {/* Secondary CTA: Tactical tactile WhatsApp action */}
              <button 
                onClick={() => window.open("https://wa.me/33651664068?text=Bonjour%20Samuel", "_blank")}
                id="cta-demo-secondary"
                className="group flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-display font-extrabold text-[13px] md:text-[14px] px-4 md:px-6 py-3.5 rounded-xl border border-white/10 border-b-[3px] md:border-b-[4px] border-b-white/20 active:translate-y-[3px] active:border-b-[1px] transition-all duration-100 cursor-pointer w-full sm:w-auto flex-1"
              >
                <div className="w-6 h-6 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.437.002 9.861-4.417 9.864-9.859.002-2.637-1.019-5.115-2.876-6.974-1.857-1.859-4.329-2.883-6.97-2.884-5.441 0-9.864 4.42-9.867 9.863-.001 1.991.517 3.931 1.5 5.653l-.982 3.582 3.68-.964zm10.702-4.948c-.287-.143-1.696-.837-1.959-.933-.262-.096-.453-.143-.643.143-.19.287-.738.933-.905 1.118-.167.188-.334.21-.619.068-.285-.143-1.205-.444-2.295-1.415-.848-.757-1.421-1.693-1.588-1.979-.167-.286-.018-.441.125-.582.128-.127.287-.334.43-.501.143-.167.19-.286.285-.477.096-.192.048-.36-.024-.503-.071-.143-.643-1.551-.881-2.122-.232-.558-.466-.482-.643-.491-.167-.008-.358-.01-.55-.01s-.502.072-.764.358c-.262.287-1 .978-1 2.387 0 1.41 1.026 2.769 1.169 2.96.143.19 2.018 3.081 4.891 4.319.683.294 1.217.469 1.632.6s.793.118 1.091.074c.333-.05 1.696-.693 1.936-1.361.24-.668.24-1.241.167-1.36-.072-.119-.262-.167-.549-.31z" />
                  </svg>
                </div>
                <span>Parler à Samuel</span>
              </button>
            </div>
 
            {/* Micro-proof list with premium sans typography (never monospace) */}
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-3 md:gap-x-6 mt-12 md:mt-16 text-[10px] md:text-[11px] font-display font-bold text-text-secondary tracking-[0.06em] border-t border-white/5 pt-6 w-full max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent stroke-[2.5]" />
                <span>OPÉRATIONNEL EN 48H</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent stroke-[2.5]" />
                <span>RELANCES AUTOMATIQUES</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent stroke-[2.5]" />
                <span>MARGE CHANTIER VISIBLE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent stroke-[2.5]" />
                <span>AUCUN LOGICIEL À INSTALLER</span>
              </div>
              {/* Factur-X badge */}
              <div className="col-span-2 mt-2 flex items-center gap-2 bg-gradient-to-r from-accent/15 to-transparent border border-accent/25 px-3 py-1.5 rounded-lg w-fit">
                <div className="w-[12px] h-[9px] rounded-sm overflow-hidden flex shadow-sm shrink-0">
                  <div className="w-1/3 h-full bg-[#002395]" />
                  <div className="w-1/3 h-full bg-[#FFFFFF]" />
                  <div className="w-1/3 h-full bg-[#ED2939]" />
                </div>
                <span className="text-[10px] text-white tracking-wider font-extrabold">FACTUR-X 2026 INCLUS</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col gap-4 mt-12 w-full max-w-xl">
              <div className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-[580px] overflow-hidden opacity-85 hover:opacity-100 transition-opacity -ml-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_30px,_black_calc(100%-30px),transparent_100%)]">
                <div className="flex w-max gap-8 items-center animate-marquee">
                  {[
                    // RENOBAT
                    <div key="logo-1" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 22h20L12 2z"/>
                        <path d="M12 9l-4 7h8l-4-7z" fill="currentColor" className="opacity-30" />
                      </svg>
                      <span className="font-display font-black text-[13px] sm:text-[15px] tracking-widest text-[#e5e5e5]">RENOBAT</span>
                    </div>,
                    // QualiSur
                    <div key="logo-2" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 14 12 5 22 14" />
                        <rect x="10" y="8" width="4" height="4" fill="currentColor" strokeWidth="0" className="opacity-70" />
                      </svg>
                      <span className="font-display font-bold text-[14px] sm:text-[16px] tracking-wider text-[#e5e5e5]">QualiSur</span>
                    </div>,
                    // Hariri Energie
                    <div key="logo-3" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 12 6 8 12 12 18 8 22 12" />
                      </svg>
                      <div className="flex flex-col -gap-1">
                        <span className="font-display font-medium text-[13px] leading-tight text-[#e5e5e5] -mb-1">Hariri</span>
                        <span className="font-body text-[10px] text-amber-500 leading-tight">Energie</span>
                      </div>
                    </div>,
                    // EuroBTP
                    <div key="logo-4" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-6 h-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18" />
                        <path d="M9 21V9l6-4 6 4v12" />
                        <path d="M3 21v-8l6-4" />
                        <line x1="15" y1="13" x2="15" y2="21" />
                        <line x1="9" y1="13" x2="21" y2="13" />
                      </svg>
                      <span className="font-display font-semibold text-[14px] sm:text-[15px] tracking-wide text-[#e5e5e5]">EuroBTP</span>
                    </div>,
                    // LEPAGE
                    <div key="logo-5" className="flex items-center gap-2 shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" opacity="0.8" />
                      </svg>
                      <span className="font-display font-black text-[15px] tracking-widest text-[#e5e5e5]">LEPAGE</span>
                    </div>,
                    // LORET SARL
                    <div key="logo-6" className="flex items-center gap-2 shrink-0">
                      <div className="flex flex-col gap-[2px]">
                        <div className="w-4 h-[3px] bg-neutral-400"></div>
                        <div className="w-4 h-[3px] bg-neutral-500"></div>
                        <div className="w-4 h-[3px] bg-neutral-600"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display font-black text-[12px] leading-tight text-[#e5e5e5] -mb-0.5">LORET</span>
                        <span className="font-display font-medium text-[10px] leading-tight text-[#a1a1aa]">SARL</span>
                      </div>
                    </div>,
                    // QualiChaudière
                    <div key="logo-7" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16v16H4z" className="opacity-30" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="12" y1="15" x2="16" y2="19" />
                      </svg>
                      <span className="font-display font-bold text-[14px] text-amber-500">QualiChaudière</span>
                    </div>,
                    // Duplicate for infinite scroll
                    <div key="logo-1-dup" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 22h20L12 2z"/>
                        <path d="M12 9l-4 7h8l-4-7z" fill="currentColor" className="opacity-30" />
                      </svg>
                      <span className="font-display font-black text-[13px] sm:text-[15px] tracking-widest text-[#e5e5e5]">RENOBAT</span>
                    </div>,
                    <div key="logo-2-dup" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 14 12 5 22 14" />
                        <rect x="10" y="8" width="4" height="4" fill="currentColor" strokeWidth="0" className="opacity-70" />
                      </svg>
                      <span className="font-display font-bold text-[14px] sm:text-[16px] tracking-wider text-[#e5e5e5]">QualiSur</span>
                    </div>,
                    <div key="logo-3-dup" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 12 6 8 12 12 18 8 22 12" />
                      </svg>
                      <div className="flex flex-col -gap-1">
                        <span className="font-display font-medium text-[13px] leading-tight text-[#e5e5e5] -mb-1">Hariri</span>
                        <span className="font-body text-[10px] text-amber-500 leading-tight">Energie</span>
                      </div>
                    </div>,
                    <div key="logo-4-dup" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-6 h-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18" />
                        <path d="M9 21V9l6-4 6 4v12" />
                        <path d="M3 21v-8l6-4" />
                        <line x1="15" y1="13" x2="15" y2="21" />
                        <line x1="9" y1="13" x2="21" y2="13" />
                      </svg>
                      <span className="font-display font-semibold text-[14px] sm:text-[15px] tracking-wide text-[#e5e5e5]">EuroBTP</span>
                    </div>,
                    <div key="logo-5-dup" className="flex items-center gap-2 shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" opacity="0.8" />
                      </svg>
                      <span className="font-display font-black text-[15px] tracking-widest text-[#e5e5e5]">LEPAGE</span>
                    </div>,
                    <div key="logo-6-dup" className="flex items-center gap-2 shrink-0">
                      <div className="flex flex-col gap-[2px]">
                        <div className="w-4 h-[3px] bg-neutral-400"></div>
                        <div className="w-4 h-[3px] bg-neutral-500"></div>
                        <div className="w-4 h-[3px] bg-neutral-600"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display font-black text-[12px] leading-tight text-[#e5e5e5] -mb-0.5">LORET</span>
                        <span className="font-display font-medium text-[10px] leading-tight text-[#a1a1aa]">SARL</span>
                      </div>
                    </div>,
                    <div key="logo-7-dup" className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16v16H4z" className="opacity-30" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="12" y1="15" x2="16" y2="19" />
                      </svg>
                      <span className="font-display font-bold text-[14px] text-amber-500">QualiChaudière</span>
                    </div>
                  ]}
                </div>
              </div>
              
              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 fill-accent text-accent" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[13px] font-body text-text-secondary">
                  Adopté par <strong className="text-white font-medium">les meilleurs artisans</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Right Area: Solsars-Style Beautiful App Screen Mockup */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            <IPhoneMockup />
          </div>
          
        </div>

      </div>
    </section>
  );
}

