import { useEffect, useState } from "react";
import "./HeroSection.css";
// Foto de perfil do Instagram @ocaradocopytrade (150px, salva em 102px para telas 3x)
import avatarImg from "../../assets/images/hendi-perfil.webp";
// Rosto gerado por IA (thispersondoesnotexist.com): pessoa que não existe, para o perfil fictício do "Curtido por"
import likedAvatarImg from "../../assets/images/curtido-avatar.webp";

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
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if script already exists to avoid duplicates
    const scriptId = "vturb-script-ab-69eeaa9ee47d7b09a8e429e2";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/ab-test/69eeaa9ee47d7b09a8e429e2/player.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-vsl-container">
        <div className="vsl-wrapper">
          <vturb-smartplayer
            id="ab-69eeaa9ee47d7b09a8e429e2"
            style={{ display: "block", margin: "0 auto", width: "100%" }}
          ></vturb-smartplayer>
        </div>

        {/* Camada de reel sobre o vídeo, igual à da referência. Só o "curtir" recebe
            clique; o resto deixa o clique passar para o player. Números fictícios (pedido
            do dono em 18/09/2026), os mesmos da referência. */}
        <div className="reel-overlay">
          {/* Curtir, repostar e enviar (Feather, MIT), na ordem da referência */}
          <div className="reel-actions" aria-hidden="true">
            <div
              className={`reel-action-item reel-like-btn${liked ? " liked" : ""}`}
              onClick={() => setLiked(!liked)}
            >
              <svg viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="reel-action-count">{liked ? "63.255" : "63 mil"}</span>
            </div>
            <div className="reel-action-item">
              <svg viewBox="0 0 24 24">
                <path d="M17 1l4 4-4 4" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <path d="M7 23l-4-4 4-4" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span className="reel-action-count">1.672</span>
            </div>
            <div className="reel-action-item">
              <svg viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span className="reel-action-count">5.638</span>
            </div>
          </div>

          {/* "Curtido por", perfil e legenda de uma linha (o H1, cortado com … se não couber) */}
          <div className="reel-caption">
            <div className="reel-liked" aria-hidden="true">
              <img
                className="reel-liked-avatar"
                src={likedAvatarImg}
                alt=""
                width="20"
                height="20"
                decoding="async"
              />
              <span className="reel-liked-text">
                Curtido por <strong>julianasouza</strong> e outras{" "}
                <strong>63.568 pessoas</strong>
              </span>
            </div>

            <div className="reel-user-row">
              <img
                className="reel-avatar"
                src={avatarImg}
                alt=""
                width="34"
                height="34"
                decoding="async"
              />
              <span className="reel-username">Hendi</span>
              <svg className="reel-verified" viewBox="0 0 40 40" width="16" height="16">
                <circle cx="20" cy="20" r="20" fill="#0095f6" />
                <path d="M17.5 27.5l-7-7 2.8-2.8 4.2 4.2 9.2-9.2 2.8 2.8z" fill="#fff" />
              </svg>
              <span className="reel-followers">1.5M seguidores</span>
            </div>

            <div className="reel-caption-text">
              <h1 className="hero-headline">Vou te provar que é possível mudar de vida</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Primeiro filho do #content-gate (App.tsx): o CTA aparece quando o VTurb revela o conteúdo.
export const HeroCta = () => (
  <div className="hero-cta-band">
    <a
      href="https://pay.hotmart.com/N103487414R?checkoutMode=10&utm_source=vsl&utm_medium=botao&utm_campaign=vsl_fechada&utm_content=botao_vturbo"
      className="btn-primary btn-pulse hero-cta"
    >
      GARANTA O PROTOCOLO POR 12x DE R$&nbsp;30,71
    </a>
  </div>
);

export default HeroSection;
