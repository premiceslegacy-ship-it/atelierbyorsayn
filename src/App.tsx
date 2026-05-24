import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Comparison from './components/Comparison';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import CGV from './pages/CGV';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [pathname, hash]);
  return null;
}

function LandingPage() {
  return (
    <div className="bg-bg-base min-h-screen text-white selection:bg-accent selection:text-bg-base overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <Comparison />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/cgv" element={<CGV />} />
      </Routes>
    </BrowserRouter>
  );
}
