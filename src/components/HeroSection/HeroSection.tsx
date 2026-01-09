import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HeroSection.css";

// Declare global smartplayer variable
declare global {
  interface Window {
    smartplayer: any;
  }
}

interface HeroSectionProps {
  onVideoProgress?: (progress: number) => void;
}

// VTurb video configuration
const VTURB_SCRIPT_URL =
  "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/players/694f3a3771611df8184f17a9/v4/player.js";

const HeroSection = ({ onVideoProgress }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  // Load VTurb script and set up polling
  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Inject Script
    const script = document.createElement("script");
    script.src = VTURB_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    // Poll for smartplayer instance
    let attempts = 0;
    const checkSmartPlayer = () => {
      if (
        typeof window.smartplayer === "undefined" ||
        !window.smartplayer.instances ||
        !window.smartplayer.instances.length
      ) {
        if (attempts >= 20) return; // Stop after 20 seconds
        attempts++;
        setTimeout(checkSmartPlayer, 1000);
        return;
      }

      const player = window.smartplayer.instances[0];

      if (onVideoProgress) {
        player.on("timeupdate", () => {
          const video = player.video;
          if (video && video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            // console.log("Video progress:", progress);
            onVideoProgress(progress);
          }
        });
      }
    };

    checkSmartPlayer();

    // Removed immediate fallback unlock to respect the delay logic
    // You can re-enable this for testing if needed
    /*
    setTimeout(() => {
      if (onVideoProgress) onVideoProgress(100);
    }, 5000);
    */
  }, [onVideoProgress]);

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-bg-gradient"></div>

      <div className="container hero-container">
        <h1 className="hero-headline" ref={headlineRef}>
          Ative sua{" "}
          <span className="text-orange">renda passiva automática em dólar</span>{" "}
          — e faça sua conta trabalhar por você,{" "}
          <span className="text-green">todos os dias</span>
        </h1>

        <p className="hero-subheadline" ref={subheadlineRef}>
          Depois de anos investindo com estratégias automatizadas e validando um
          método que funciona na minha própria conta e na de centenas de alunos,
          eu empacotei tudo em um passo a passo direto ao ponto para você ativar
          hoje mesmo, sem enrolação.
        </p>

        <div className="hero-vsl-container" ref={videoRef}>
          <div className="vsl-wrapper">
            {/* VTurb Smart Player - using dangerouslySetInnerHTML to ensure proper rendering */}
            <div
              dangerouslySetInnerHTML={{
                __html: `<vturb-smartplayer id="vid-694f3a3771611df8184f17a9" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>`,
              }}
            />
          </div>
        </div>

        <a
          href="#oferta"
          className="btn-primary btn-pulse hero-cta"
          ref={ctaRef}
        >
          QUERO ATIVAR MEU SETUP POR R$&nbsp;97
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
