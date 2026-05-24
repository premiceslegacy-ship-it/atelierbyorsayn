import { Folder, DollarSign, TrendingUp, HardHat, Mail, Check, FileText, UserPlus, Calendar, ArrowUpRight } from "lucide-react";

export default function DashboardMockup() {
  return (
    <div className="w-full max-w-[840px] bg-[#0c0d12]/95 rounded-[2rem] border border-[#ff9f1c]/15 p-5 md:p-8 shadow-[0_0_50px_rgba(255,159,28,0.06)] relative text-white font-sans select-none overflow-hidden">
      {/* Subtle outer stroke decoration */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />
      
      {/* Top 4 Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        
        {/* Stat 1: CA PREVISIONNEL TTC */}
        <div className="bg-gradient-to-b from-[#1a1b23] to-[#121319] border border-white/10 shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.6)] transform -translate-y-1 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-display font-bold tracking-[0.05em] text-text-secondary uppercase">CA prévisionnel TTC</span>
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <Folder className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl md:text-2xl font-bold tracking-tight">1 125 €</div>
            <div className="text-[10px] text-danger font-display font-bold flex items-center gap-1 mt-1">
              <span>↘</span> -80% vs mois préc.
            </div>
          </div>
        </div>

        {/* Stat 2: ENCAISSÉ */}
        <div className="bg-gradient-to-b from-[#1a1b23] to-[#121319] border border-white/10 shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.6)] transform -translate-y-1 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-display font-bold tracking-[0.05em] text-text-secondary uppercase">Encaissé</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl md:text-2xl font-bold tracking-tight">—</div>
            <div className="text-[10px] text-danger font-display font-bold flex items-center gap-1 mt-1">
              <span>↘</span> -100% vs mois préc.
            </div>
          </div>
        </div>

        {/* Stat 3: DEVIS EN ATTENTE */}
        <div className="bg-gradient-to-b from-[#1a1b23] to-[#121319] border border-white/10 shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.6)] transform -translate-y-1 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-display font-bold tracking-[0.05em] text-text-secondary uppercase">Devis en attente</span>
            <TrendingUp className="w-4 h-4 text-accent-secondary" />
          </div>
          <div className="mt-4">
            <p className="text-[10.5px] text-text-secondary leading-normal">Aucun devis en attente de réponse.</p>
          </div>
        </div>

        {/* Stat 4: CHANTIERS EN COURS */}
        <div className="bg-gradient-to-b from-[#1a1b23] to-[#121319] border border-white/10 shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.6)] transform -translate-y-1 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-display font-bold tracking-[0.05em] text-text-secondary uppercase">Chantiers en cours</span>
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <HardHat className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold tracking-tight">5</div>
          </div>
        </div>

      </div>

      {/* Main Bottom Grid Content columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Box: Suivi prioritaire */}
        <div className="lg:col-span-8 bg-gradient-to-b from-[#1a1b23] to-[#121319] border border-white/10 shadow-[0_5px_0_0_#000,0_5px_0_1px_rgba(255,255,255,0.05),0_12px_24px_rgba(0,0,0,0.6)] transform -translate-y-1 rounded-2xl p-5 md:p-6">
          <div className="flex justify-between items-center mb-5">
            <h4 className="font-display font-bold text-sm md:text-base text-white">Suivi prioritaire</h4>
            <span className="bg-gradient-to-b from-accent/20 to-accent/5 text-accent border border-accent/40 shadow-[0_2px_0_0_rgba(0,0,0,0.8),0_2px_0_1px_rgba(255,159,28,0.3)] text-[10px] font-display px-2.5 py-0.5 rounded-full font-extrabold tracking-wide transform -translate-y-0.5">
              2 à relancer
            </span>
          </div>

          {/* Rows container */}
          <div className="space-y-3.5">
            {/* Row 1 */}
            <div className="bg-gradient-to-b from-[#1e1f28] to-[#16171d] border border-white/10 shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05)] p-4 rounded-xl relative hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3b2413] flex items-center justify-center text-accent mt-0.5 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-display font-bold text-text-secondary uppercase tracking-[0.04em]">Groupe Deschamps Industrie • Opération atelier</p>
                    <h5 className="text-xs md:text-sm font-bold text-white mt-1">Facture FAC-2026-057 à relancer</h5>
                    <span className="text-[10px] text-text-secondary font-display font-medium mt-1.5 block">Envoyée le : 15 mai 2026</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-white/5 sm:border-0 pt-3 sm:pt-0 shrink-0">
                  <span className="font-display font-extrabold text-white text-sm md:text-base">846 €</span>
                  <div className="flex items-center gap-1.5">
                    <button className="w-7.5 h-7.5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-success transition-all">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="w-7.5 h-7.5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-text-secondary transition-all">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-gradient-to-b from-[#1e1f28] to-[#16171d] border border-white/10 shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05)] p-4 rounded-xl relative hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3b2413] flex items-center justify-center text-accent mt-0.5 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-display font-bold text-text-secondary uppercase tracking-[0.04em]">Groupe Deschamps Industrie • Situation nº1 • Opération atelier</p>
                    <h5 className="text-xs md:text-sm font-bold text-white mt-1">Facture FAC-2026-059 à relancer</h5>
                    <span className="text-[10px] text-text-secondary font-display font-semibold mt-1.5 block">Envoyée le : 18 mai 2026</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-white/5 sm:border-0 pt-3 sm:pt-0 shrink-0">
                  <span className="font-display font-extrabold text-white text-sm md:text-base">279 €</span>
                  <div className="flex items-center gap-1.5">
                    <button className="w-7.5 h-7.5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-success transition-all">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="w-7.5 h-7.5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-text-secondary transition-all">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Actions rapides & Planning */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Actions rapides Card */}
          <div className="bg-gradient-to-b from-[#1a1b23] to-[#121319] border border-white/10 shadow-[0_5px_0_0_#000,0_5px_0_1px_rgba(255,255,255,0.05),0_12px_24px_rgba(0,0,0,0.6)] transform -translate-y-1 rounded-2xl p-5">
            <h4 className="font-display font-bold text-sm text-white mb-4">Actions rapides</h4>
            <div className="space-y-3">
              <button className="w-full bg-accent hover:bg-amber-500 text-bg-base font-display font-extrabold text-xs tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-glow-accent-soft">
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>Nouveau devis</span>
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 text-white font-display font-bold text-xs tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 border border-white/5 transition-all duration-200 cursor-pointer">
                <UserPlus className="w-4 h-4 text-text-secondary" />
                <span>Nouveau client</span>
              </button>
            </div>
          </div>

          {/* Planning du jour Card */}
          <div className="bg-gradient-to-b from-[#1a1b23] to-[#121319] border border-white/10 shadow-[0_5px_0_0_#000,0_5px_0_1px_rgba(255,255,255,0.05),0_12px_24px_rgba(0,0,0,0.6)] transform -translate-y-1 rounded-2xl p-5 flex flex-col justify-between flex-1 min-h-[140px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-display font-bold text-text-secondary uppercase tracking-[0.05em]">Planning du jour</span>
              <button className="text-[10px] font-display font-bold text-accent hover:underline flex items-center gap-0.5">
                <span>Tout voir</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-3">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Jeudi 21 mai</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2 text-center text-text-secondary">
                <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-text-secondary mb-2">
                  <Calendar className="w-4 h-4 opacity-40 text-text-secondary" />
                </div>
                <p className="text-[11px]">Aucun créneau planifié aujourd'hui.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
