import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Euro,
  FileWarning,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import DashboardMockup from "./DashboardMockup";

const beforeItems = [
  { icon: Clock, label: "22h", text: "Devis encore à finir" },
  { icon: FileWarning, label: "3 800 €", text: "Facture oubliée" },
  { icon: TrendingUp, label: "Marge floue", text: "Vous découvrez trop tard" },
  { icon: ShieldCheck, label: "Conformité", text: "Factur-X pas clair" },
];

const afterItems = [
  { icon: Clock, label: "15h", text: "Libérées chaque semaine" },
  { icon: Euro, label: "Relances", text: "Envoyées toutes seules" },
  { icon: TrendingUp, label: "Marge", text: "Visible chantier par chantier" },
  { icon: ShieldCheck, label: "Factur-X", text: "Prêt pour la réforme" },
];

const companyLogos = [
  "RENOBAT",
  "QualiSur",
  "Hariri Energie",
  "EuroBTP",
  "LEPAGE",
  "LORET SARL",
  "QualiChaudière",
  "RENOBAT",
  "QualiSur",
  "Hariri Energie",
  "EuroBTP",
  "LEPAGE",
  "LORET SARL",
  "QualiChaudière",
];

function LogoMark({ index }: { index: number }) {
  const mark = index % 7;
  if (mark === 0) {
    return (
      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 22h20L12 2z" />
        <path d="M12 9l-4 7h8l-4-7z" fill="currentColor" className="opacity-30" />
      </svg>
    );
  }
  if (mark === 1) {
    return (
      <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="2 14 12 5 22 14" />
        <rect x="10" y="8" width="4" height="4" fill="currentColor" strokeWidth="0" className="opacity-70" />
      </svg>
    );
  }
  if (mark === 2) {
    return (
      <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="2 12 6 8 12 12 18 8 22 12" />
      </svg>
    );
  }
  if (mark === 3) {
    return (
      <svg className="w-6 h-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M9 21V9l6-4 6 4v12" />
        <path d="M3 21v-8l6-4" />
        <line x1="15" y1="13" x2="15" y2="21" />
        <line x1="9" y1="13" x2="21" y2="13" />
      </svg>
    );
  }
  if (mark === 4) {
    return (
      <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" opacity="0.8" />
      </svg>
    );
  }
  if (mark === 5) {
    return (
      <div className="flex flex-col gap-[2px]" aria-hidden="true">
        <div className="w-4 h-[3px] bg-neutral-400" />
        <div className="w-4 h-[3px] bg-neutral-500" />
        <div className="w-4 h-[3px] bg-neutral-600" />
      </div>
    );
  }
  return (
    <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16v16H4z" className="opacity-30" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="15" x2="16" y2="19" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.437.002 9.861-4.417 9.864-9.859.002-2.637-1.019-5.115-2.876-6.974-1.857-1.859-4.329-2.883-6.97-2.884-5.441 0-9.864 4.42-9.867 9.863-.001 1.991.517 3.931 1.5 5.653l-.982 3.582 3.68-.964zm10.702-4.948c-.287-.143-1.696-.837-1.959-.933-.262-.096-.453-.143-.643.143-.19.287-.738.933-.905 1.118-.167.188-.334.21-.619.068-.285-.143-1.205-.444-2.295-1.415-.848-.757-1.421-1.693-1.588-1.979-.167-.286-.018-.441.125-.582.128-.127.287-.334.43-.501.143-.167.19-.286.285-.477.096-.192.048-.36-.024-.503-.071-.143-.643-1.551-.881-2.122-.232-.558-.466-.482-.643-.491-.167-.008-.358-.01-.55-.01s-.502.072-.764.358c-.262.287-1 .978-1 2.387 0 1.41 1.026 2.769 1.169 2.96.143.19 2.018 3.081 4.891 4.319.683.294 1.217.469 1.632.6s.793.118 1.091.074c.333-.05 1.696-.693 1.936-1.361.24-.668.24-1.241.167-1.36-.072-.119-.262-.167-.549-.31z" />
    </svg>
  );
}

function HeroComparisonMockup() {
  const [activeSide, setActiveSide] = useState<"before" | "after">("after");
  const activeText =
    activeSide === "after"
      ? "Atelier remet du temps dans la semaine et de la trésorerie dans la boîte."
      : "Sans système, chaque oubli finit par coûter du temps ou de l'argent.";

  return (
    <div className="relative w-full max-w-3xl mx-auto lg:ml-auto select-none">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/15 via-emerald-500/10 to-transparent blur-3xl opacity-80" />

      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        <button
          onClick={() => setActiveSide("before")}
          className={`text-left rounded-[1.65rem] bg-gradient-to-b from-[#171821] to-[#0b0b0f] border border-red-400/20 p-4 md:p-5 transition-all duration-300 cursor-pointer ${
            activeSide === "before"
              ? "-translate-y-2 shadow-[0_16px_0_0_#000,0_16px_0_1px_rgba(248,113,113,0.16),0_36px_70px_rgba(0,0,0,0.95),inset_0_2px_0_rgba(255,255,255,0.12)]"
              : "shadow-[0_9px_0_0_#000,0_9px_0_1px_rgba(255,255,255,0.06),0_24px_44px_rgba(0,0,0,0.78),inset_0_1.5px_0_rgba(255,255,255,0.08)] hover:-translate-y-1"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-red-300">
              Avant Atelier
            </span>
            <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />
          </div>
          <div className="space-y-3">
            {beforeItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/8 bg-black/30 p-3 transition-all duration-200 shadow-[0_4px_0_0_#030303,0_4px_0_1px_rgba(255,255,255,0.04)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#030303,0_6px_0_1px_rgba(255,255,255,0.07)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                      <Icon className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-black text-white">{item.label}</p>
                      <p className="mt-0.5 text-xs leading-snug text-text-secondary">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </button>

        <button
          onClick={() => setActiveSide("after")}
          className={`text-left rounded-[1.65rem] bg-gradient-to-b from-[#182016] to-[#0c100b] border border-emerald-400/30 p-4 md:p-5 transition-all duration-300 cursor-pointer ${
            activeSide === "after"
              ? "-translate-y-2 shadow-[0_16px_0_0_#000,0_16px_0_1px_rgba(180,244,129,0.22),0_36px_70px_rgba(0,0,0,0.95),0_0_34px_rgba(74,222,128,0.18),inset_0_2px_0_rgba(255,255,255,0.14)]"
              : "shadow-[0_9px_0_0_#000,0_9px_0_1px_rgba(180,244,129,0.12),0_24px_44px_rgba(0,0,0,0.78),0_0_24px_rgba(74,222,128,0.08),inset_0_1.5px_0_rgba(255,255,255,0.1)] hover:-translate-y-1"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-[#b4f481]">
              Avec Atelier
            </span>
            <span className="h-2 w-2 rounded-full bg-[#b4f481] shadow-[0_0_12px_rgba(180,244,129,0.9)]" />
          </div>
          <div className="space-y-3">
            {afterItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#b4f481]/18 bg-[#b4f481]/[0.035] p-3 transition-all duration-200 shadow-[0_4px_0_0_#030303,0_4px_0_1px_rgba(180,244,129,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#030303,0_6px_0_1px_rgba(180,244,129,0.16)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#b4f481]/30 bg-[#b4f481]/10 text-[#b4f481] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                      <Icon className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-black text-white">{item.label}</p>
                      <p className="mt-0.5 text-xs leading-snug text-text-secondary">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </button>
      </div>

      <div className="relative mx-auto mt-5 max-w-lg rounded-2xl border border-accent/25 bg-gradient-to-b from-[#1f2028] to-[#0d0d10] p-3 text-center shadow-[0_10px_0_0_#000,0_10px_0_1px_rgba(255,159,28,0.18),0_24px_44px_rgba(0,0,0,0.85),inset_0_1.5px_0_rgba(255,255,255,0.1)]">
        <p className="font-display text-sm font-black text-white">
          {activeText}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const openWhatsApp = () =>
    window.open(
      "https://wa.me/33651664068?text=Bonjour%20Samuel%2C%20j%27ai%20vu%20Atelier%20et%20je%20voudrais%20en%20savoir%20plus%20pour%20mon%20activit%C3%A9.",
      "_blank"
    );

  return (
    <section className="px-3 md:px-6 py-4">
      <div className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] bg-bg-base overflow-hidden border border-white/10 min-h-[640px] lg:min-h-[700px] p-5 md:p-12 lg:p-14">
        <div className="absolute inset-0 select-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px]" />
          <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] rounded-full bg-accent-secondary/5 blur-[120px]" />
          <div className="absolute right-[-20%] md:right-[-100px] top-[14%] w-[120%] md:w-[80%] max-w-[900px] opacity-10 md:opacity-[0.22] lg:opacity-[0.35] lg:scale-[0.9] xl:scale-100 pointer-events-none transform rotate-[2deg] rounded-3xl origin-top-right transition-all duration-500">
            <DashboardMockup />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/90 to-bg-base/40 md:to-bg-base/20 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-b md:bg-gradient-to-r from-bg-base via-bg-base/90 to-transparent md:to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-bg-base to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[600px] max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left lg:pl-4 xl:pl-8">
            <h1
              id="hero-main-title"
              className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-[3.55rem] md:text-[4.2rem] lg:text-[4.65rem]"
            >
              Récupérez jusqu’à{" "}
              <span className="text-accent drop-shadow-[0_0_30px_rgba(255,159,28,0.25)]">15h/semaine.</span>
              <span className="mt-1 block text-white">
                Sans <span className="text-accent drop-shadow-[0_0_30px_rgba(255,159,28,0.22)]">recruter.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl font-body text-[15px] leading-relaxed text-text-secondary md:text-lg lg:text-[19px]">
              Devis plus rapides, relances auto, marge claire. Vous gagnez du temps et vous encaissez plus vite.
            </p>

            <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:max-w-[585px] sm:flex-row sm:items-center">
              <button
                id="cta-pricing"
                onClick={() => document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex w-full flex-1 items-center justify-center gap-4 rounded-xl border border-white border-b-[3px] border-b-neutral-300 bg-white px-4 py-3 pr-2 font-display text-sm font-extrabold text-bg-base shadow-md transition-all duration-100 hover:bg-neutral-50 active:translate-y-[3px] active:border-b-[1px] md:gap-6 md:border-b-[4px] md:px-6 md:text-[15px]"
              >
                <span>Récupérer mes 15h</span>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-bg-base md:h-9 md:w-9">
                  <ArrowRight className="h-4 w-4 stroke-[2.5] md:h-5 md:w-5" />
                </div>
              </button>

              <button
                onClick={openWhatsApp}
                id="cta-demo-secondary"
                className="group flex w-full flex-1 items-center justify-center gap-3 rounded-xl border border-white/10 border-b-[3px] border-b-white/20 bg-white/5 px-4 py-3.5 font-display text-[13px] font-extrabold text-white transition-all duration-100 hover:bg-white/10 active:translate-y-[3px] active:border-b-[1px] md:border-b-[4px] md:px-6 md:text-[14px]"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#25D366]/20 text-[#25D366]">
                  <WhatsAppIcon />
                </div>
                <span>Parler à Samuel</span>
              </button>
            </div>

            <div className="mt-10 grid w-full max-w-xl grid-cols-2 gap-x-3 gap-y-3.5 border-t border-white/5 pt-6 font-display text-[10px] font-bold uppercase tracking-[0.06em] text-text-secondary md:mt-12 md:gap-x-6 md:text-[11px]">
              {["Jusqu'à 15h gagnées / sem.", "Factures relancées seules", "Marge chantier visible", "Prêt Factur-X"].map((proof) => (
                <div key={proof} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent stroke-[2.5]" />
                  <span>{proof}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-10 w-full max-w-xl items-center lg:items-start">
              <div className="flex flex-col mt-1 items-center lg:items-start">
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 fill-accent text-accent" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[13px] font-body text-text-secondary text-center lg:text-left">
                  Adopté par <strong className="text-white font-medium">les meilleurs artisans</strong>
                </p>
              </div>
              <div className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-[580px] overflow-hidden opacity-85 hover:opacity-100 transition-opacity -ml-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_30px,_black_calc(100%-30px),transparent_100%)]">
                <div className="flex w-max gap-8 items-center animate-marquee">
                  {companyLogos.map((logo, index) => (
                    <div key={`${logo}-${index}`} className="flex items-center gap-1.5 shrink-0">
                      <LogoMark index={index} />
                      <span className="font-display font-black text-[13px] sm:text-[15px] tracking-widest text-[#e5e5e5]">{logo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroComparisonMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
