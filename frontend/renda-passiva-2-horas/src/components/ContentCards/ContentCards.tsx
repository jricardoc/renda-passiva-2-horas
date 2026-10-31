import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContentCards.css";
import { Checkout } from "../../oferta";
import { t } from "../../textos";

gsap.registerPlugin(ScrollTrigger);

const ContentCards = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  const icons = ["📋", "📊", "🛡️", "⚡"];
  const cards = t.conteudo.cards.map((card, index) => ({
    icon: icons[index],
    title: card.titulo,
    description: card.descricao,
  }));

  useEffect(() => {
    // Disable GSAP animations on mobile for performance
    if (window.matchMedia("(max-width: 768px)").matches) return;

    if (!cardsRef.current) return;

    const cardElements = cardsRef.current.querySelectorAll(".content-card");

    gsap.fromTo(
      cardElements,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="content-cards-section">
      <div className="container">
        <h2 className="cards-title">{t.conteudo.titulo}</h2>

        <div className="cards-grid" ref={cardsRef}>
          {cards.map((card, index) => (
            <div className="content-card glass-card" key={index}>
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-name">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
        <div
          className="button-vsl-wrapper"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <Checkout
            href={t.checkout.pagina}
            className="button-vsl btn-primary btn-pulse"
            style={{
              display: "inline-block",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            {t.conteudo.cta}
          </Checkout>
        </div>
      </div>
    </section>
  );
};

export default ContentCards;
