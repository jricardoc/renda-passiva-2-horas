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
                <svg
                  className="vsl-thumbnail-bg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 1600 900"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
                >
                  <rect width="1600" height="900" fill="#0a0a0a" />
                  <radialGradient
                    id="grad1"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "rgb(255,99,0)", stopOpacity: 0.2 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "rgb(10,10,10)", stopOpacity: 1 }}
                    />
                  </radialGradient>
                  <rect width="1600" height="900" fill="url(#grad1)" />
                  <circle
                    cx="800"
                    cy="450"
                    r="400"
                    fill="rgba(255,99,0,0.05)"
                  />
                </svg>

                <div
                  className="vsl-content-wrapper"
                  style={{
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: "20px" }}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon
                      points="10 8 16 12 10 16 10 8"
                      fill="rgba(255,255,255,0.1)"
                    ></polygon>
                  </svg>
                  <div className="loading-spinner"></div>
                </div>
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
