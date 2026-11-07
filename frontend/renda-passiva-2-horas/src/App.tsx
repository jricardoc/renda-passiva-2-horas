import HeroSection, { HeroCta } from "./components/HeroSection/HeroSection";
import "./App.css";
import "./backredirect";
import { DESCONTO } from "./oferta";
import { Suspense, lazy, useEffect, useRef, useState, type RefObject } from "react";

const Desconto = lazy(() => import("./components/Desconto/Desconto"));

const carregarSecoes = {
  authority: () => import("./components/AuthoritySection/AuthoritySection"),
  comparison: () => import("./components/ComparisonSection/ComparisonSection"),
  cards: () => import("./components/ContentCards/ContentCards"),
  socialProof: () => import("./components/SocialProof/SocialProof"),
  guarantee: () => import("./components/GuaranteeSection/GuaranteeSection"),
  specialist: () => import("./components/SpecialistSection/SpecialistSection"),
  footer: () => import("./components/Footer/Footer"),
};

const AuthoritySection = lazy(carregarSecoes.authority);
const ComparisonSection = lazy(carregarSecoes.comparison);
const ContentCards = lazy(carregarSecoes.cards);
const SocialProof = lazy(carregarSecoes.socialProof);
const GuaranteeSection = lazy(carregarSecoes.guarantee);
const SpecialistSection = lazy(carregarSecoes.specialist);
const Footer = lazy(carregarSecoes.footer);

// Seções só montam quando o VTurb revela o #content-gate: antes disso o gsap, o swiper
// e o render das seções não disputam o processador com o player (taxa de conexão).
// Os chunks baixam alguns segundos depois do load, para a revelação não esperar a rede.
function useGateAberto(gate: RefObject<HTMLDivElement>) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const el = gate.current;
    if (!el) return;
    const conferir = () => {
      if (getComputedStyle(el).display === "none") return false;
      setAberto(true);
      return true;
    };
    if (conferir()) return;
    const observer = new MutationObserver(() => {
      if (conferir()) observer.disconnect();
    });
    observer.observe(el, { attributes: true, attributeFilter: ["style", "class"] });
    return () => observer.disconnect();
  }, [gate]);

  useEffect(() => {
    let timer: number | undefined;
    const baixar = () => {
      timer = window.setTimeout(() => {
        Object.values(carregarSecoes).forEach((carregar) => carregar().catch(() => {}));
      }, 5000);
    };
    if (document.readyState === "complete") baixar();
    else window.addEventListener("load", baixar, { once: true });
    return () => {
      window.removeEventListener("load", baixar);
      window.clearTimeout(timer);
    };
  }, []);

  return aberto;
}

function App() {
  const gate = useRef<HTMLDivElement>(null);
  const gateAberto = useGateAberto(gate);

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
        <div id="content-gate" ref={gate} style={{ display: "none" }}>
          <HeroCta />
          {gateAberto && secoes}
        </div>
      </main>
    </div>
  );
}

export default App;
