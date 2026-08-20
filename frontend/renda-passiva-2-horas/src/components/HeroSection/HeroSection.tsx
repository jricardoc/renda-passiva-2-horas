import { useEffect, useRef } from "react";
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

  useEffect(() => {
    // Check if script already exists to avoid duplicates
    const scriptId = "vturb-script-ab-6a124f855c583dca6c7627aa";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/ab-test/6a124f855c583dca6c7627aa/player.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // GSAP animation useEffect removed - handled by CSS classes

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-bg-gradient"></div>

      <div className="container hero-container">
        <h1 className="hero-headline" ref={headlineRef}>
          Existe uma coisa que{" "}
          <span className="text-orange">menos de 0,5% do mundo usa</span>. E não
          é segredo de ninguém.
        </h1>

        <p className="hero-subheadline" ref={subheadlineRef}>
          Está disponível há décadas. Só não te contaram.{" "}
          <span className="text-orange">Ainda.</span>
        </p>

        <div className="hero-vsl-container" ref={videoRef}>
          <div className="vsl-wrapper">
            <vturb-smartplayer
              id="ab-6a124f855c583dca6c7627aa"
              style={{ display: "block", margin: "0 auto", width: "100%" }}
            ></vturb-smartplayer>
          </div>
        </div>

        <a
          href="https://pay.hotmart.com/N103487414R?checkoutMode=10&utm_source=vsl&utm_medium=botao&utm_campaign=vsl_fechada&utm_content=botao_vturbo"
          className="btn-primary btn-pulse hero-cta"
          ref={ctaRef}
          id="content-gate"
          style={{
            opacity: 1,
            display: "none",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          GARANTA O PROTOCOLO POR 12x DE R$&nbsp;10,03
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
