import { useState } from "react";
import { Sparkles, Mail, Check, AlertCircle, Clock, CheckCircle2, ChevronRight, Bell, Calendar, User } from "lucide-react";

export default function IPhoneMockup() {
  const [invoices, setInvoices] = useState([
    {
      id: "fac-1",
      client: "M. Deschamps",
      ref: "FAC-2026-057",
      amountVal: 846,
      amount: "846 €",
      delay: "7 jours",
      object: "Opération atelier",
      relanceCount: 1,
      relanced: false,
    },
    {
      id: "fac-2",
      client: "Julie Lemaire",
      ref: "FAC-2026-059",
      amountVal: 279,
      amount: "279 €",
      delay: "4 jours",
      object: "Situation n°1",
      relanceCount: 0,
      relanced: false,
    }
  ]);

  const [devis, setDevis] = useState([
    {
      id: "dev-1",
      client: "Ets Martin",
      ref: "DEV-2026-112",
      amountVal: 1420,
      amount: "1 420 €",
      delay: "9 jours",
      object: "Menuiseries Verrière",
      relanceCount: 0,
      relanced: false,
    }
  ]);

  const handleRelanceInvoice = (id: string) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, relanced: true, relanceCount: inv.relanceCount + 1 } : inv
      )
    );
  };

  const handleRelanceDevis = (id: string) => {
    setDevis(prev =>
      prev.map(dev =>
        dev.id === id ? { ...dev, relanced: true, relanceCount: dev.relanceCount + 1 } : dev
      )
    );
  };

  const handleRelanceAll = () => {
    setInvoices(prev => prev.map(inv => ({ ...inv, relanced: true, relanceCount: inv.relanceCount + 1 })));
    setDevis(prev => prev.map(dev => ({ ...dev, relanced: true, relanceCount: dev.relanceCount + 1 })));
  };

  // Calculations for dynamic status cards
  const activeInvoiceRelancesCount = invoices.filter(i => !i.relanced).length;
  const activeDevisRelancesCount = devis.filter(i => !i.relanced).length;
  
  const totalInvoicesAmount = invoices.reduce((sum, item) => sum + (item.relanced ? 0 : item.amountVal), 0);
  const totalInvoicesDisplay = totalInvoicesAmount > 0 ? `${totalInvoicesAmount.toLocaleString('fr-FR')} €` : "0 €";
  
  const totalDevisAmount = devis.reduce((sum, item) => sum + (item.relanced ? 0 : item.amountVal), 0);

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-3xl animate-fade-in-up duration-700">
      
      {/* GLOWING AMBIENT BACKGROUND BEHIND THE SCREEN */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/15 via-accent-secondary/5 to-transparent blur-3xl opacity-80 -z-10" />

      {/* DETAILED SCREEN WINDOW CONTAINER */}
      <div className="relative w-full bg-[#0d0e10]/95 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-white/10 overflow-hidden">
        
        {/* 1. PREMIUM macOS WINDOW HEADER */}
        <div className="h-11 border-b border-white/5 bg-black/40 flex items-center justify-between px-4 relative select-none">
          {/* Mock macOS traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0 z-10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm cursor-pointer opacity-90 hover:opacity-100" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm cursor-pointer opacity-90 hover:opacity-100" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm cursor-pointer opacity-90 hover:opacity-100" />
          </div>

          {/* Centered window Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16">
            <span className="text-[10px] sm:text-[11px] font-display font-medium text-text-secondary tracking-[0.1em] truncate">
              <span className="sm:hidden lowercase">atelier-btp.fr</span>
              <span className="hidden sm:inline">ATELIER - CENTRE DE RELANCES</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 z-10 w-12 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>

        {/* 2. CORE INTERFACE CANVAS */}
        <div className="p-4 md:p-5 space-y-4">
          
          {/* WIDGET METRICS BAR (SIDE-BY-SIDE SUMMARY STATS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Stat 1: FACTURES EN RETARD */}
            <div className="bg-gradient-to-b from-[#1e1f28] to-[#16171d] border border-white/10 shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.4)] transform -translate-y-0.5 rounded-xl p-3 flex items-center justify-between relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-16 h-16 rounded-full bg-accent/5 blur-lg" />
              <div className="flex flex-col">
                <span className="text-[9px] font-display font-black text-[#ff9f1c] uppercase tracking-wider mb-1">
                  Urgences factures
                </span>
                <span className="text-xl font-display font-extrabold text-white leading-none">
                  {totalInvoicesDisplay}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block bg-[#ff9f1c]/10 text-[#ff9f1c] text-[9px] font-display font-black px-2 py-0.5 rounded-full uppercase">
                  {activeInvoiceRelancesCount} à relancer
                </span>
              </div>
            </div>

            {/* Stat 2: DEVIS SANS RÉPONSE */}
            <div className="bg-gradient-to-b from-[#1e1f28] to-[#16171d] border border-white/10 shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05),0_8px_16px_rgba(0,0,0,0.4)] transform -translate-y-0.5 rounded-xl p-3 flex items-center justify-between relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-16 h-16 rounded-full bg-indigo-500/5 blur-lg" />
              <div className="flex flex-col">
                <span className="text-[9px] font-display font-black text-accent-secondary uppercase tracking-wider mb-1">
                  Attente devis
                </span>
                <span className="text-xl font-display font-extrabold text-white leading-none">
                  {activeDevisRelancesCount > 0 ? `${totalDevisAmount.toLocaleString('fr-FR')} €` : "—"}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block bg-indigo-500/20 text-indigo-300 text-[9px] font-display font-black px-2 py-0.5 rounded-full uppercase">
                  {activeDevisRelancesCount} sans réponse
                </span>
              </div>
            </div>
          </div>

          {/* TWO MAIN COLUMNS SIDE-BY-SIDE (COMPACTING HEIGHT DRASTICALLY) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* COLUMN 1: FACTURES */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-xs font-display font-extrabold text-white">
                  Relances factures
                </span>
                {activeInvoiceRelancesCount > 0 && (
                  <button
                    onClick={handleRelanceAll}
                    className="bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 border-b-[3px] border-b-red-500/50 font-display font-extrabold text-[9px] px-2.5 py-1 rounded-lg flex items-center gap-1 active:translate-y-[1.5px] active:border-b-[1px] transition-all duration-100 cursor-pointer shadow-sm"
                  >
                    <span>Relancer tout</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div 
                    key={inv.id} 
                    className={`bg-gradient-to-b from-[#1e1f28] to-[#16171d] shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05)] border transition-all duration-300 p-2.5 rounded-xl text-left ${
                      inv.relanced ? "border-success/30" : "border-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.4)]"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1 gap-1">
                      <div>
                        <h4 className="text-[11px] font-display font-bold text-white leading-tight">
                          {inv.client}
                        </h4>
                        <span className="inline-block text-[8px] font-body text-text-secondary font-medium">
                          {inv.ref}
                        </span>
                      </div>
                      {inv.relanced ? (
                        <div className="flex items-center gap-0.5 bg-gradient-to-b from-success/30 to-success/10 text-[#b4f481] border border-success/40 shadow-[0_2px_0_0_rgba(0,0,0,0.8),0_2px_0_1px_rgba(34,197,94,0.2)] transform -translate-y-0.5 text-[8px] font-display font-black px-1.5 py-0.5 rounded uppercase whitespace-nowrap shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          <span>Relancé</span>
                        </div>
                      ) : (
                        inv.relanceCount > 0 && (
                          <div className="bg-gradient-to-b from-accent/30 to-accent/10 text-[#ff9f1c] border border-accent/40 shadow-[0_2px_0_0_rgba(0,0,0,0.8),0_2px_0_1px_rgba(255,159,28,0.3)] transform -translate-y-0.5 text-[8px] font-display font-black px-1.5 py-0.5 rounded uppercase whitespace-nowrap shrink-0">
                            {inv.relanceCount} relance
                          </div>
                        )
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-white text-[11px] font-display font-black tracking-tight flex items-baseline gap-1">
                          {inv.amount}
                          <span className="text-[8px] text-danger font-display font-semibold">
                            Depuis {inv.delay}
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() => handleRelanceInvoice(inv.id)}
                        disabled={inv.relanced}
                        className={`text-[8.5px] font-display font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm transition-all duration-100 ${
                          inv.relanced
                            ? "bg-white/5 border border-white/5 text-text-secondary cursor-not-allowed"
                            : "bg-accent hover:bg-amber-400 text-bg-base border border-accent border-b-[3.5px] border-b-amber-600 active:translate-y-[1.5px] active:border-b-[1px] cursor-pointer"
                        }`}
                      >
                        <Mail className="w-2.5 h-2.5" />
                        <span>{inv.relanced ? "Relancé" : "Relancer"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: DEVIS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-xs font-display font-extrabold text-white">
                  Suivi devis
                </span>
                <span className="text-[9px] font-display text-text-secondary font-bold">
                  Relances immédiates
                </span>
              </div>

              <div className="space-y-2">
                {devis.map((dev) => (
                  <div 
                    key={dev.id} 
                    className={`bg-gradient-to-b from-[#1e1f28] to-[#16171d] shadow-[0_3px_0_0_#000,0_3px_0_1px_rgba(255,255,255,0.05)] border transition-all duration-300 p-2.5 rounded-xl text-left ${
                      dev.relanced ? "border-success/30" : "border-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#000,0_4px_0_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.4)]"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1 gap-1">
                      <div>
                        <h4 className="text-[11px] font-display font-bold text-white leading-tight">
                          {dev.client}
                        </h4>
                        <span className="inline-block text-[8px] font-body text-text-secondary font-medium">
                          {dev.ref}
                        </span>
                      </div>
                      {dev.relanced ? (
                        <div className="flex items-center gap-0.5 bg-gradient-to-b from-success/30 to-success/10 text-[#b4f481] border border-success/40 shadow-[0_2px_0_0_rgba(0,0,0,0.8),0_2px_0_1px_rgba(34,197,94,0.2)] transform -translate-y-0.5 text-[8px] font-display font-black px-1.5 py-0.5 rounded uppercase whitespace-nowrap shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          <span>Relancé</span>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-b from-indigo-500/30 to-indigo-500/10 text-indigo-300 border border-indigo-500/40 shadow-[0_2px_0_0_rgba(0,0,0,0.8),0_2px_0_1px_rgba(99,102,241,0.3)] transform -translate-y-0.5 text-[7.5px] font-display font-bold px-1.5 py-0.5 rounded uppercase whitespace-nowrap shrink-0">
                          Sans réponse
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-white text-[11px] font-display font-black tracking-tight flex items-baseline gap-1">
                          {dev.amount}
                          <span className="text-[8px] text-[#ff9f1c] font-display font-semibold">
                            Depuis {dev.delay}
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() => handleRelanceDevis(dev.id)}
                        disabled={dev.relanced}
                        className={`text-[8.5px] font-display font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm transition-all duration-100 ${
                          dev.relanced
                            ? "bg-white/5 border border-white/5 text-text-secondary cursor-not-allowed"
                            : "bg-accent hover:bg-amber-400 text-bg-base border border-accent border-b-[3.5px] border-b-amber-600 active:translate-y-[1.5px] active:border-b-[1px] cursor-pointer"
                        }`}
                      >
                        <Mail className="w-2.5 h-2.5" />
                        <span>{dev.relanced ? "Relancé" : "Relancer"}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {devis.length === 0 && (
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-5 h-5 text-text-secondary/60 mb-1" />
                    <p className="text-[9px] text-white font-display font-bold">Aucun devis en attente</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
