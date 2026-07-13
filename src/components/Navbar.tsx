import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-5 px-6 md:px-12 bg-transparent relative z-50">
      {/* Brand Logo with a clean custom minimal icon */}
      <a href="/" className="flex items-center gap-2.5 md:gap-3 select-none">
        <img
          src="/logo-atelier-blanc.png"
          alt="Atelier — logiciel de gestion artisans BTP"
          className="h-6 w-auto"
        />
      </a>

      {/* Navigation Links centered */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 lg:top-auto lg:left-auto w-full lg:w-auto bg-[#0a0a0f]/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-5 lg:p-0 border-b border-white/10 lg:border-none items-center gap-6 lg:gap-10 shadow-2xl lg:shadow-none`}>
        <button
          onClick={() => scrollTo("fonctionnement")}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide cursor-pointer"
        >
          Fonctionnement
        </button>
        <button
          onClick={() => scrollTo("change")}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide cursor-pointer"
        >
          Ce que ça change
        </button>
        <button
          onClick={() => scrollTo("tarifs")}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide cursor-pointer"
        >
          Tarifs
        </button>
        <button
          onClick={() => scrollTo("faq")}
          className="font-body text-[14px] font-medium text-text-secondary hover:text-white transition-colors duration-200 tracking-wide cursor-pointer"
        >
          FAQ
        </button>
        <button 
          onClick={() => {
            setIsMenuOpen(false);
            window.open("https://wa.me/33651664068?text=Bonjour%20Samuel%2C%20j%27ai%20vu%20Atelier.%20Je%20voudrais%20en%20savoir%20plus.", "_blank");
          }}
          className="lg:hidden mt-2 bg-white text-bg-base font-display text-[14px] font-extrabold tracking-wide px-6 py-2.5 rounded-xl border border-white border-b-[4px] border-b-neutral-300 hover:bg-neutral-50 active:translate-y-[4px] active:border-b-0 transition-all duration-100 cursor-pointer shadow-md w-full max-w-[280px]"
        >
          Parler à Samuel
        </button>
      </div>

      {/* Right side Parler à Samuel action button styled in tactical keyboard mechanical key-press design */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => window.open("https://wa.me/33651664068?text=Bonjour%20Samuel%2C%20j%27ai%20vu%20Atelier.%20Je%20voudrais%20en%20savoir%20plus.", "_blank")}
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
