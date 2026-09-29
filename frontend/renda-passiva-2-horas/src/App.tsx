import HeroSection, { HeroCta } from "./components/HeroSection/HeroSection";
import "./App.css";
import "./backredirect";
import { DESCONTO } from "./oferta";
import { Suspense, lazy } from "react";

const Desconto = lazy(() => import("./components/Desconto/Desconto"));

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
  const secoes = (
    <Suspense fallback={<div style={{ height: "100vh" }} />}>
      <AuthoritySection />
      <ComparisonSection />
      <ContentCards />
      <SocialProof />
      <GuaranteeSection />
      <SpecialistSection />
      <Footer />
    </Suspense>
  );

  // Página de desconto (destino do backredirect): a VSL sem o vídeo, com tudo aberto desde o início.
  if (DESCONTO) {
    return (
      <div className="app">
        <main>
          <Suspense fallback={null}>
            <Desconto />
          </Suspense>
          {secoes}
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main>
        <HeroSection />

        {/* Content sections - controlled by Vturb via #content-gate */}
        {/* Um único #content-gate: o player faz querySelectorAll("#content-gate")
            e aplica display:block !important. O CTA do hero é o primeiro filho. */}
        <div id="content-gate" style={{ display: "none" }}>
          <HeroCta />
          {secoes}
        </div>
      </main>
    </div>
  );
}

export default App;
