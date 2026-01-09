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

const HeroSection = ({ onVideoProgress }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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

  // Move o player Vturb do container PHP para dentro do React
  useEffect(() => {
    const vturbContainer = document.getElementById("vturb-container");
    const vturbPlayer = vturbContainer?.querySelector("vturb-smartplayer");
    const targetWrapper = document.querySelector(".vsl-wrapper");

    if (vturbPlayer && targetWrapper && !targetWrapper.querySelector("vturb-smartplayer")) {
      targetWrapper.appendChild(vturbPlayer);
      vturbContainer!.style.display = "none";
    }

    // --- VTurb Documentation Logic Start ---
    const SECONDS_TO_DISPLAY = 455;
    let attempts = 0;
    let elsDisplayed = false;
    const alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
    const alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

    const showHiddenElements = function () {
      elsDisplayed = true;
      if (onVideoProgress) onVideoProgress(100);
      localStorage.setItem(alreadyDisplayedKey, "true");
    };

    const startWatchVideoProgress = function () {
      if (
        typeof window.smartplayer === "undefined" ||
        !window.smartplayer.instances ||
        !window.smartplayer.instances.length
      ) {
        if (attempts >= 60) return;
        attempts += 1;
        return setTimeout(function () {
          startWatchVideoProgress();
        }, 1000);
      }

      const player = window.smartplayer.instances[0];

      player.on("timeupdate", () => {
        if (elsDisplayed || player.smartAutoPlay) return;
        const video = player.video;
        if (video.currentTime < SECONDS_TO_DISPLAY) return;
        showHiddenElements();
      });
    };

    if (alreadyElsDisplayed === "true") {
      setTimeout(function () {
        showHiddenElements();
      }, 100);
    } else {
      startWatchVideoProgress();
    }
    // --- VTurb Documentation Logic End ---
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
            {/* VTurb Smart Player - movido do container PHP */}
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
