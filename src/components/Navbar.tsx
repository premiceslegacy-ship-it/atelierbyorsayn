import { ShieldCheck, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-5 px-4 md:px-12 bg-transparent relative z-50">
      {/* Brand Logo with a clean custom minimal icon */}
      <div className="flex items-center gap-2.5 md:gap-3 select-none">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-accent flex items-center justify-center shadow-glow-accent-soft shrink-0">
          <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-bg-base stroke-[2.5]" />
        </div>
        <div className="font-display text-lg md:text-xl font-bold tracking-tight text-white flex items-center">
          Atelier
        </div>
      </div>

      {/* Navigation Links centered */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 lg:top-auto lg:left-auto w-full lg:w-auto bg-[#0a0a0f]/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-5 lg:p-0 border-b border-white/10 lg:border-none items-center gap-6 lg:gap-10 shadow-2xl lg:shadow-none`}>
        <a 
          href="#fonctionnement" 
          onClick={() => setIsMenuOpen(false)}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide"
        >
          Fonctionnement
        </a>
        <a 
          href="#change" 
          onClick={() => setIsMenuOpen(false)}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide"
        >
          Ce que ça change
        </a>
        <a 
          href="#tarifs" 
          onClick={() => setIsMenuOpen(false)}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide"
        >
          Tarifs
        </a>
        <a 
          href="#faq" 
          onClick={() => setIsMenuOpen(false)}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide"
        >
          FAQ
        </a>
        <button 
          onClick={() => {
            setIsMenuOpen(false);
            window.open("https://wa.me/33651664068?text=Bonjour%20Samuel", "_blank");
          }}
          className="lg:hidden mt-2 bg-white text-bg-base font-display text-[14px] font-extrabold tracking-wide px-6 py-2.5 rounded-xl border border-white border-b-[4px] border-b-neutral-300 hover:bg-neutral-50 active:translate-y-[4px] active:border-b-0 transition-all duration-100 cursor-pointer shadow-md w-full max-w-[280px]"
        >
          Parler à Samuel
        </button>
      </div>

      {/* Right side Parler à Samuel action button styled in tactical keyboard mechanical key-press design */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => window.open("https://wa.me/33651664068?text=Bonjour%20Samuel", "_blank")}
          id="btn-nav-demo"
          className="hidden lg:block bg-white text-bg-base font-display text-[11px] md:text-sm font-extrabold tracking-wide px-4 py-2 md:px-6 md:py-2.5 rounded-xl border border-white border-b-[3px] md:border-b-[4px] border-b-neutral-300 hover:bg-neutral-50 active:translate-y-[4px] active:border-b-0 transition-all duration-100 cursor-pointer shadow-md whitespace-nowrap"
        >
          Parler à Samuel
        </button>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex items-center justify-center p-2 text-white bg-white/5 border border-white/10 rounded-lg active:scale-95 transition-transform"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
