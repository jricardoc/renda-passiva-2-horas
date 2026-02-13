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

function App() {
  return (
    <div className="app">
      <main>
        <HeroSection />

        {/* Content sections - Open Version (Always Visible) */}
        <div id="content-container">
          <Suspense fallback={<div style={{ height: "100vh" }} />}>
            <AuthoritySection />
            <ComparisonSection />
            <ContentCards />
            <SocialProof />
            <GuaranteeSection />
            <SpecialistSection />
            <Footer />
          </Suspense>
        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
