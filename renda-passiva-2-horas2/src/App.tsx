import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./components/HeroSection/HeroSection";
import AuthoritySection from "./components/AuthoritySection/AuthoritySection";
import ComparisonSection from "./components/ComparisonSection/ComparisonSection";
import ContentCards from "./components/ContentCards/ContentCards";
import SocialProof from "./components/SocialProof/SocialProof";
import GuaranteeSection from "./components/GuaranteeSection/GuaranteeSection";
import SpecialistSection from "./components/SpecialistSection/SpecialistSection";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app">
      <HeroSection />

      {/* Content sections - controlled by Vturb via #content-gate */}
      <div id="content-gate" style={{ display: "none" }}>
        <AuthoritySection />
        <ComparisonSection />
        <ContentCards />
        <SocialProof />
        <GuaranteeSection />
        <SpecialistSection />
        <Footer />
      </div>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
