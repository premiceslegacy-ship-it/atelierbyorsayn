import { ArrowRight, CheckCircle2, Clock, Euro, FileQuestion, TrendingUp } from "lucide-react";

const rows = [
  {
    without: "Devis terminés tard le soir",
    with: "Devis envoyés depuis le terrain",
    icon: Clock,
  },
  {
    without: "Factures oubliées, trésorerie tendue",
    with: "Relances automatiques et argent qui rentre",
    icon: Euro,
  },
  {
    without: "Marge réelle découverte trop tard",
    with: "Rentabilité visible pendant le chantier",
    icon: TrendingUp,
  },
  {
    without: "Réforme Factur-X incompréhensible",
    with: "Factures prêtes pour la conformité",
    icon: FileQuestion,
  },
];

export default function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.08]">
            Atelier remplace la charge mentale par des décisions simples.
          </h2>
          <p className="mt-5 text-text-secondary font-body text-base md:text-lg leading-relaxed">
            Moins d'administratif, plus de visibilité, plus de temps récupéré.
          </p>
        </div>

        <div className="relative rounded-[2.25rem] border border-white/10 bg-gradient-to-b from-[#171820] to-[#08080b] p-4 md:p-7 shadow-[0_18px_0_0_#000,0_18px_0_1.5px_rgba(255,255,255,0.07),0_42px_80px_rgba(0,0,0,0.95),inset_0_2px_0_rgba(255,255,255,0.1)]">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-accent/10 via-transparent to-[#b4f481]/10 blur-3xl opacity-70" />
          <div className="grid grid-cols-2 gap-3 border-b border-white/8 pb-4 font-display text-[11px] font-black uppercase tracking-[0.16em]">
            <div className="rounded-2xl border border-red-400/20 bg-gradient-to-b from-red-500/10 to-black/20 px-4 py-3 text-red-300 shadow-[0_5px_0_0_#000,0_5px_0_1px_rgba(248,113,113,0.1)]">
              Sans Atelier
            </div>
            <div className="rounded-2xl border border-[#b4f481]/25 bg-gradient-to-b from-[#b4f481]/12 to-black/20 px-4 py-3 text-[#b4f481] shadow-[0_5px_0_0_#000,0_5px_0_1px_rgba(180,244,129,0.14)]">
              Avec Atelier
            </div>
          </div>

          <div className="divide-y divide-white/6">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.without} className="grid grid-cols-1 gap-3 py-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-gradient-to-b from-[#181820] to-[#0d0d12] p-4 text-left shadow-[0_6px_0_0_#000,0_6px_0_1px_rgba(255,255,255,0.04)] transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-300">
                      <Icon className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <p className="font-display text-sm font-bold text-white/80">{row.without}</p>
                  </div>

                  <div className="hidden h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent shadow-[0_3px_0_0_#000] md:flex">
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#b4f481]/20 bg-gradient-to-b from-[#b4f481]/10 to-[#0d120c] p-4 text-left shadow-[0_6px_0_0_#000,0_6px_0_1px_rgba(180,244,129,0.1)] transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#b4f481]/25 bg-[#b4f481]/10 text-[#b4f481]">
                      <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <p className="font-display text-sm font-black text-white">{row.with}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => document.getElementById("tarifs")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white border-b-[3px] border-b-neutral-300 bg-white px-5 py-3.5 font-display text-[13px] font-extrabold text-bg-base shadow-md transition-all duration-100 hover:bg-neutral-50 active:translate-y-[3px] active:border-b-[1px] sm:w-auto md:border-b-[4px] md:px-6 md:text-[15px]"
          >
            <span>Récupérer jusqu'à 15h par semaine</span>
            <ArrowRight className="hidden h-5 w-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 md:block" />
          </button>
        </div>
      </div>
    </section>
  );
}
