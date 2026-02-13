import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
    if (!isVideoActive) return;

    // Check if script already exists to avoid duplicates
    const scriptId = "vturb-script-698b9d0d";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/players/698b9d0d27b4e43f0073d121/v4/player.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, [isVideoActive]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
    )
      .fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5",
      )
      .fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.4",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      );
  }, []);

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
              <div
                className="vsl-placeholder"
                onClick={() => setIsVideoActive(true)}
              >
                <div className="vsl-play-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="vsl-text">Seu vídeo já começou</p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "8px",
                  }}
                >
                  🔊 Clique para ouvir
                </p>
              </div>
            ) : (
              <vturb-smartplayer
                id="vid-698b9d0d27b4e43f0073d121"
                style={{ display: "block", margin: "0 auto", width: "100%" }}
              ></vturb-smartplayer>
            )}
          </div>
        </div>

        <a
          href="https://pay.hotmart.com/N103487414R?checkoutMode=10&utm_source=vsl&utm_medium=botao&utm_campaign=vsl_fechada&utm_content=botao_vturbo"
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
