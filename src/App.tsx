import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Comparison from './components/Comparison';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-bg-base min-h-screen text-white selection:bg-accent selection:text-bg-base overflow-x-hidden">
      {/* Upper header space for navbar layout */}
      <Navbar />
      
      {/* Core layout sections */}
      <main className="w-full">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <Comparison />
        <Pricing />
        <FAQ />
      </main>

      {/* Styled Orsayn BTP footer */}
      <Footer />
    </div>
  );
}
