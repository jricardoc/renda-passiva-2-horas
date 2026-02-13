import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./components/HeroSection/HeroSection";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./App.css";
import { Suspense, lazy } from "react";

const AuthoritySection = lazy(
  () => import("./components/AuthoritySection/AuthoritySection"),
);
const ComparisonSection = lazy(
  () => import("./components/ComparisonSection/ComparisonSection"),
);
const ContentCards = lazy(
  () => import("./components/ContentCards/ContentCards"),
);
const SocialProof = lazy(() => import("./components/SocialProof/SocialProof"));
const GuaranteeSection = lazy(
  () => import("./components/GuaranteeSection/GuaranteeSection"),
);
const SpecialistSection = lazy(
  () => import("./components/SpecialistSection/SpecialistSection"),
);
const Footer = lazy(() => import("./components/Footer/Footer"));

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app">
      <main>
        <HeroSection />

        {/* Content sections - controlled by Vturb via #content-gate */}
        <div id="content-gate" style={{ display: "none" }}>
          <Suspense fallback={null}>
            <AuthoritySection />
            <ComparisonSection />
            <ContentCards />
            <SocialProof />
            <GuaranteeSection />
            <SpecialistSection />
            <Footer />
            <WhatsAppButton />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
