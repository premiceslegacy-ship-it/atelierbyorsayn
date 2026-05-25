import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Check,
  HelpCircle,
  Plus,
  Minus,
  FileText,
  Bell,
  TrendingUp,
  Calendar,
  Receipt,
  MapPin,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Pricing from "./Pricing";
import DashboardMockup from "./DashboardMockup";
import { getMetierBySlug } from "../data/metiers";

interface PageMetierProps {
  slug: string;
}

const FEATURE_ICONS = [FileText, Bell, TrendingUp, Calendar, Receipt, MapPin];

export default function PageMetier({ slug }: PageMetierProps) {
  const data = getMetierBySlug(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!data) return;
    document.title = data.seo.title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = data.seo.description;
  }, [data]);

  if (!data) {
    return (
      <div className="bg-bg-base min-h-screen text-white flex items-center justify-center">
        <p className="text-text-secondary">Page introuvable.</p>
      </div>
    );
  }

  const openWhatsApp = () =>
    window.open(
      "https://wa.me/33651664068?text=Bonjour%20Samuel%2C%20j%27ai%20vu%20Atelier%20et%20je%20voudrais%20en%20savoir%20plus%20pour%20mon%20activit%C3%A9.",
      "_blank"
    );

  const scrollToPricing = () =>
    document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-bg-base min-h-screen text-white selection:bg-accent selection:text-bg-base overflow-x-hidden">
      <Navbar />

      <main className="w-full">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="px-3 md:px-6 py-4">
          <div className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] bg-bg-base overflow-hidden border border-white/10 min-h-[580px] lg:min-h-[680px] flex flex-col justify-start gap-6 md:gap-8 p-5 md:p-12 lg:p-14">

            {/* Background — identique à la landing */}
            <div className="absolute inset-0 select-none overflow-hidden z-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px]" />
              <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] rounded-full bg-accent-secondary/5 blur-[120px]" />
              <div className="absolute right-[-20%] md:right-[-100px] top-[14%] w-[120%] md:w-[80%] max-w-[900px] opacity-10 md:opacity-[0.18] lg:opacity-[0.28] lg:scale-[0.9] xl:scale-100 pointer-events-none transform rotate-[2deg] rounded-3xl origin-top-right transition-all duration-500">
                <DashboardMockup />
              </div>
            </div>

            {/* Gradient masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/90 to-bg-base/40 md:to-bg-base/20 pointer-events-none z-10" />
            <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-b md:bg-gradient-to-r from-bg-base via-bg-base/90 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-bg-base to-transparent pointer-events-none z-10" />

            {/* Headline — pleine largeur */}
            <div className="relative z-20 w-full max-w-4xl pt-2 lg:pt-4 text-center lg:text-left flex flex-col items-center lg:items-start md:mx-auto lg:mx-0">
              <h1 className="font-display text-4xl sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.2rem] font-black leading-[1.05] tracking-tight text-white mb-2">
                {(() => {
                  const parts = data.hero.headline.split(". ");
                  if (parts.length >= 2) {
                    const last = parts.pop()!;
                    return (
                      <>
                        {parts.join(". ")}.<br className="hidden lg:block" />{" "}
                        <span className="text-accent relative inline-block drop-shadow-[0_0_30px_rgba(255,159,28,0.25)] font-black mt-1 lg:mt-0">
                          {last}
                        </span>
                      </>
                    );
                  }
                  // Phrase unique : colorer les 3 derniers mots
                  const words = data.hero.headline.replace(/\.$/, "").split(" ");
                  const cutoff = Math.max(words.length - 3, 1);
                  const before = words.slice(0, cutoff).join(" ");
                  const highlighted = words.slice(cutoff).join(" ");
                  return (
                    <>
                      {before}{" "}
                      <span className="text-accent relative inline-block drop-shadow-[0_0_30px_rgba(255,159,28,0.25)] font-black">
                        {highlighted}.
                      </span>
                    </>
                  );
                })()}
              </h1>
            </div>

            {/* Bottom grid: texte gauche + stats droite */}
            <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start mt-0">

              {/* Gauche */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start w-full">
                <p className="font-body text-[15px] md:text-lg lg:text-[18px] leading-relaxed text-text-secondary mb-6 md:mb-8 text-center lg:text-left max-w-sm md:max-w-xl">
                  {data.hero.subheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:max-w-[585px]">
                  {/* CTA primaire → pricing */}
                  <button
                    onClick={scrollToPricing}
                    className="group flex items-center justify-center md:justify-between gap-4 md:gap-6 bg-white text-bg-base font-display font-extrabold text-sm md:text-[15px] px-4 md:px-6 py-2.5 md:py-3 pr-2 rounded-xl border border-white border-b-[3px] md:border-b-[4px] border-b-neutral-300 hover:bg-neutral-50 active:translate-y-[3px] active:border-b-[1px] transition-all duration-100 cursor-pointer shadow-md w-full sm:w-auto flex-1"
                  >
                    <span>Récupérer mes soirées</span>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-accent flex items-center justify-center text-bg-base shrink-0">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* CTA secondaire → WhatsApp */}
                  <button
                    onClick={openWhatsApp}
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

                {/* Proof chips */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-3 md:gap-x-6 mt-12 md:mt-16 text-[10px] md:text-[11px] font-display font-bold text-text-secondary tracking-[0.06em] border-t border-white/5 pt-6 w-full max-w-xl">
                  {[
                    "OPÉRATIONNEL EN 48H",
                    "RELANCES AUTOMATIQUES",
                    "MARGE CHANTIER VISIBLE",
                    "AUCUN LOGICIEL À INSTALLER",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent stroke-[2.5] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <div className="col-span-2 mt-2 flex items-center gap-2 bg-gradient-to-r from-accent/15 to-transparent border border-accent/25 px-3 py-1.5 rounded-lg w-fit">
                    <div className="w-[12px] h-[9px] rounded-sm overflow-hidden flex shadow-sm shrink-0">
                      <div className="w-1/3 h-full bg-[#002395]" />
                      <div className="w-1/3 h-full bg-[#FFFFFF]" />
                      <div className="w-1/3 h-full bg-[#ED2939]" />
                    </div>
                    <span className="text-[10px] text-white tracking-wider font-extrabold">FACTUR-X 2026 INCLUS</span>
                  </div>
                </div>
              </div>

              {/* Droite — panel live metrics */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
                <div className="w-full max-w-[380px] flex flex-col gap-3 mb-10 md:mb-0">

                  {/* Card 1 — Marge chantier */}
                  <div className="bg-gradient-to-b from-[#14141a] to-[#0d0d10] border border-white/10 rounded-2xl p-5 shadow-[0_8px_0_0_#030305,0_8px_0_1.5px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-accent to-[#d97706] flex items-center justify-center text-black border border-accent border-b-[3px] border-b-[#92400e] shadow-[0_2px_5px_rgba(245,158,11,0.35)]">
                          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-[11px] font-display font-extrabold text-accent uppercase tracking-wider">Marge chantier</span>
                      </div>
                      <span className="text-[9px] bg-emerald-500/15 text-[#b4f481] px-2 py-0.5 rounded font-display font-black border border-emerald-500/30 uppercase tracking-wider">En cours</span>
                    </div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-display font-black text-white text-2xl">28%</span>
                      <span className="text-[11px] text-text-secondary font-body">Budget cible : 25%</span>
                    </div>
                    <div className="w-full bg-[#101015] rounded-full h-2.5 border border-white/5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full" style={{ width: "28%" }} />
                    </div>
                    <p className="text-[10px] text-text-secondary mt-2 font-body">CA facturé vs heures + matières + dépenses terrain</p>
                  </div>

                  {/* Card 2 — Relance auto */}
                  <div className="bg-gradient-to-b from-[#14141a] to-[#0d0d10] border border-white/10 rounded-2xl p-5 shadow-[0_8px_0_0_#030305,0_8px_0_1.5px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-gradient-to-b from-emerald-500/90 to-emerald-600/90 text-white shadow-[0_2px_0_0_rgba(4,120,87,1),0_4px_8px_rgba(16,185,129,0.4)] px-2.5 py-0.5 rounded-full text-[10px] font-display font-black tracking-wider uppercase border border-emerald-400/50">
                      Ce matin
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-700 flex items-center justify-center text-black border border-emerald-400 border-b-[3px] border-b-emerald-900 shadow-[0_2px_5px_rgba(16,185,129,0.35)]">
                        <Bell className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-[11px] font-display font-extrabold text-[#b4f481] uppercase tracking-wider">Relance automatique</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />
                      <div>
                        <span className="text-[12px] font-display font-bold text-white block">FAC-2026-031 · M. Durand</span>
                        <span className="text-[10px] text-text-secondary">2 850€ encaissés suite à la relance</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 — Devis terrain */}
                  <div className="bg-gradient-to-b from-[#14141a] to-[#0d0d10] border border-white/10 rounded-2xl p-5 shadow-[0_8px_0_0_#030305,0_8px_0_1.5px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#2d2d3a] to-[#181822] flex items-center justify-center text-white border border-white/15 border-b-[3px] border-b-black/50 shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                          <FileText className="w-3.5 h-3.5 stroke-[2]" />
                        </div>
                        <span className="text-[11px] font-display font-extrabold text-white/70 uppercase tracking-wider">Dernier devis</span>
                      </div>
                      <span className="text-[10px] text-text-secondary font-body">Il y a 4 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-display font-black text-white text-sm block">DEV-2026-089</span>
                        <span className="text-[10px] text-text-secondary">Envoyé depuis le terrain via WhatsApp</span>
                      </div>
                      <span className="font-display font-black text-accent text-base">4 560€</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── PROBLÈMES ─────────────────────────────────────────────── */}
        <section id="fonctionnement" className="py-20 md:py-28 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] font-bold block mb-3">
                Le quotidien réel
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                {data.problems.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.problems.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-b from-[#1a1a22] to-[#111116] border border-white/8 rounded-2xl p-5 shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.04),0_8px_20px_rgba(0,0,0,0.4)] flex items-start gap-4"
                >
                  <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-gradient-to-b from-[#2d2d3a] to-[#181822] border border-white/10 shadow-[0_2px_0_0_#000] flex items-center justify-center">
                    <span className="font-display font-black text-[11px] text-accent">{i + 1}</span>
                  </div>
                  <p className="font-body text-sm md:text-[15px] text-text-secondary leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────── */}
        <section id="change" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[10%] -right-[10%] w-[400px] h-[400px] rounded-full bg-accent-secondary/5 blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] font-bold block mb-3">
                Ce que ça change
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                {data.features.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.features.items.map((feat, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                return (
                  <div
                    key={i}
                    className="bg-gradient-to-b from-[#14141a] to-[#0d0d10] border border-white/10 rounded-2xl p-6 shadow-[0_8px_0_0_#030305,0_8px_0_1.5px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.6)] flex flex-col gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-accent to-[#d97706] flex items-center justify-center text-black border border-accent border-b-[3px] border-b-[#92400e] shadow-[0_2.5px_6px_rgba(245,158,11,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)] shrink-0">
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-white text-base md:text-lg tracking-tight mb-2">
                        {feat.titre}
                      </h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ───────────────────────────────────────────────── */}
        <Pricing metierContext={data.metier} />

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section id="faq" className="py-20 md:py-28 border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[11px] font-display text-accent uppercase tracking-[0.08em] font-extrabold block mb-3">
                Réponses directes
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-4">
              {data.faq.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-bg-surface border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        : "bg-[#0c0c10] border-white/5 hover:border-white/10"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-display font-bold text-sm md:text-base text-white hover:text-accent transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <HelpCircle
                          className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                            isOpen ? "text-accent" : "text-text-secondary"
                          }`}
                        />
                        <span>{item.question}</span>
                      </div>
                      <div className="shrink-0 p-1 bg-white/5 border border-white/5 rounded-lg">
                        {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100 border-t border-white/5" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 py-5 text-sm leading-relaxed text-text-secondary font-body">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-32 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center gap-3 mb-2">
              <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {data.cta.headline}
              </h2>
              <p className="font-body text-text-secondary text-base md:text-lg max-w-lg">
                {data.cta.subline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={scrollToPricing}
                className="group relative flex items-center justify-center gap-3 md:gap-4 bg-gradient-to-b from-accent to-[#993b00] text-white font-display font-extrabold text-[14px] md:text-lg tracking-wide px-7 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl shadow-[0_6px_0_0_#6b2900,0_6px_0_2px_rgba(255,255,255,0.15),0_15px_30px_rgba(245,158,11,0.4)] active:translate-y-[6px] active:shadow-[0_0px_0_0_#6b2900,0_0px_0_1px_rgba(255,255,255,0.1),0_5px_10px_rgba(245,158,11,0.6)] transition-all cursor-pointer border border-[#fcd34d]/30"
              >
                <span>Voir les offres</span>
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-display font-extrabold text-[13px] md:text-[14px] px-6 py-4 rounded-xl border border-white/10 border-b-[4px] border-b-white/20 active:translate-y-[3px] active:border-b-[1px] transition-all duration-100 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.437.002 9.861-4.417 9.864-9.859.002-2.637-1.019-5.115-2.876-6.974-1.857-1.859-4.329-2.883-6.97-2.884-5.441 0-9.864 4.42-9.867 9.863-.001 1.991.517 3.931 1.5 5.653l-.982 3.582 3.68-.964zm10.702-4.948c-.287-.143-1.696-.837-1.959-.933-.262-.096-.453-.143-.643.143-.19.287-.738.933-.905 1.118-.167.188-.334.21-.619.068-.285-.143-1.205-.444-2.295-1.415-.848-.757-1.421-1.693-1.588-1.979-.167-.286-.018-.441.125-.582.128-.127.287-.334.43-.501.143-.167.19-.286.285-.477.096-.192.048-.36-.024-.503-.071-.143-.643-1.551-.881-2.122-.232-.558-.466-.482-.643-.491-.167-.008-.358-.01-.55-.01s-.502.072-.764.358c-.262.287-1 .978-1 2.387 0 1.41 1.026 2.769 1.169 2.96.143.19 2.018 3.081 4.891 4.319.683.294 1.217.469 1.632.6s.793.118 1.091.074c.333-.05 1.696-.693 1.936-1.361.24-.668.24-1.241.167-1.36-.072-.119-.262-.167-.549-.31z" />
                  </svg>
                </div>
                <span>Parler à Samuel</span>
              </button>
            </div>

            <p className="text-text-secondary text-xs font-body">
              Un appel de démarrage. Pas de carte bancaire requise.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
