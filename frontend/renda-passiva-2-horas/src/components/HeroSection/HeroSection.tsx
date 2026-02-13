import { useEffect, useRef, useState } from "react";
// GSAP removed for performance optimization (using CSS animations)
import "./HeroSection.css";

declare global {
  interface Window {
    smartplayer: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { id?: string; style?: React.CSSProperties };
    }
  }
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const [isVideoActive, setIsVideoActive] = useState(false);

  useEffect(() => {
    // Delay video loading to prioritize LCP (Lighthouse score)
    const timer = setTimeout(() => {
      setIsVideoActive(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVideoActive) return;

    // Check if script already exists to avoid duplicates
    const scriptId = "vturb-script-698b8008";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/players/698b8008aa8949c7cb355734/v4/player.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, [isVideoActive]);

  // GSAP animation useEffect removed - handled by CSS classes

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-bg-gradient"></div>

      <div className="container hero-container">
        <h1 className="hero-headline" ref={headlineRef}>
          Ative sua{" "}
          <span className="text-orange">renda passiva automática</span> em dólar
          em <span className="text-green">duas horas</span>
        </h1>

        <p className="hero-subheadline" ref={subheadlineRef}>
          E faça seu{" "}
          <span className="text-orange">dinheiro trabalhar por você</span>,
          todos os dias, com um passo a passo direto sem enrolação
        </p>

        <div className="hero-vsl-container" ref={videoRef}>
          <div className="vsl-wrapper">
            {!isVideoActive ? (
              <div className="vsl-placeholder">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <vturb-smartplayer
                id="vid-698b8008aa8949c7cb355734"
                style={{ display: "block", margin: "0 auto", width: "100%" }}
              ></vturb-smartplayer>
            )}
          </div>
        </div>

        <a
          href="https://pay.hotmart.com/N103487414R?checkoutMode=10&utm_source=vsl&utm_medium=botao&utm_campaign=vsl_aberta&utm_content=botao_vturb"
          className="btn-primary btn-pulse hero-cta"
          ref={ctaRef}
          id="hero-cta"
          style={{ display: "none" }}
        >
          GARANTA O PROTOCOLO POR R$&nbsp;97,00
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
