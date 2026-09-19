import HeroSection, { HeroCta } from "./components/HeroSection/HeroSection";
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

        {/* Content sections - controlled by Vturb via #content-gate */}
        {/* Um único #content-gate: o player faz querySelectorAll("#content-gate")
            e aplica display:block !important. O CTA do hero é o primeiro filho. */}
        <div id="content-gate" style={{ display: "none" }}>
          <HeroCta />
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
    </div>
  );
}

export default App;
