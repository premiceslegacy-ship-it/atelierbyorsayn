import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="w-full border-t border-white/5 bg-[#050505] pt-16 pb-12 px-6 md:px-12 mt-12">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">

        {/* Left Column Brand */}
        <div className="md:col-span-7 flex flex-col items-start justify-between min-h-[160px]">
          <div>
            <img
              src="/logo-atelier-blanc.png"
              alt="Atelier — logiciel de gestion artisans BTP"
              className="h-6 w-auto mb-2"
            />
            <p className="text-text-secondary text-xs md:text-sm max-w-sm mt-3 leading-relaxed">
              Le cockpit numérique mobile-first conçu sur-mesure pour redéfinir la sérénité et la productivité des artisans du BTP.
            </p>
          </div>
          <p className="mt-4 text-[11px] font-display font-medium text-text-secondary">
            © 2026 Orsayn
          </p>
        </div>

        {/* Right Column Contacts */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <h4 className="text-[11px] font-display text-accent uppercase tracking-[0.08em] font-extrabold">Contact & Support</h4>
          <ul className="space-y-3.5 text-xs text-neutral-300">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-text-secondary" />
              <a href="mailto:contact@orsayn.fr" className="hover:text-white transition-colors">contact@orsayn.fr</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-display font-bold text-text-secondary">
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start">
          <a href="#fonctionnement" className="hover:text-white transition-colors duration-150">Fonctionnement</a>
          <a href="#change" className="hover:text-white transition-colors duration-150">Ce que ça change</a>
          <a href="#tarifs" className="hover:text-white transition-colors duration-150">Tarifs</a>
          <a href="#faq" className="hover:text-white transition-colors duration-150">FAQ</a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-end">
          <Link to="/mentions-legales" className="hover:text-white transition-colors duration-150">Mentions légales</Link>
          <Link to="/confidentialite" className="hover:text-white transition-colors duration-150">Confidentialité</Link>
          <Link to="/cgv" className="hover:text-white transition-colors duration-150">CGV</Link>
          <a href="mailto:contact@orsayn.fr" className="hover:text-white transition-colors duration-150">Contact</a>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-6 pt-5 border-t border-white/5 text-[10px] text-text-secondary/50 text-center leading-relaxed">
        Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun tracker publicitaire.{" "}
        <Link to="/confidentialite" className="underline hover:text-text-secondary transition-colors">En savoir plus</Link>
      </div>
    </footer>
  );
}
