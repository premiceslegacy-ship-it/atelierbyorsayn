import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] pt-16 pb-12 px-6 md:px-12 mt-12">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
        
        {/* Left Column Brand */}
        <div className="md:col-span-7 flex flex-col items-start justify-between min-h-[160px]">
          <div>
            <div className="font-display text-xl font-bold tracking-tight text-white mb-2">
              Atelier <span className="text-text-secondary font-normal text-sm ml-1">by Orsayn</span>
            </div>
            <p className="text-text-secondary text-xs md:text-sm max-w-sm mt-3 leading-relaxed">
              Le cockpit numérique mobile-first conçu sur-mesure pour redéfinir la sérénité et la productivité des artisans du BTP.
            </p>
          </div>
          <p className="text-[11px] font-display font-medium text-text-secondary mt-4">
            Atelier by Orsayn © 2026. Tous droits réservés.
          </p>
        </div>

        {/* Right Column Contacts */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <h4 className="text-[11px] font-display text-accent uppercase tracking-[0.08em] font-extrabold">Contact & Support</h4>
          <ul className="space-y-3.5 text-xs text-neutral-300">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-text-secondary" />
              <span>contact@orsayn.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-text-secondary" />
              <span>+33 (0)1 84 60 92 11</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-text-secondary" />
              <span>75 Boulevard Haussmann, Paris 75008</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-display font-bold text-text-secondary">
        <div className="flex gap-6">
          <a href="#fonctionnement" className="hover:text-white transition-colors duration-150">Fonctionnement</a>
          <a href="#change" className="hover:text-white transition-colors duration-150">Ce que ça change</a>
          <a href="#tarifs" className="hover:text-white transition-colors duration-150">Tarifs</a>
          <a href="#faq" className="hover:text-white transition-colors duration-150">FAQ</a>
        </div>
        <div className="text-center sm:text-right text-[10px]">
          Conçu en conformité avec les standards de la sécurité financière et réglementations BTP 2026.
        </div>
      </div>
    </footer>
  );
}
