import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContentCards.css";
import { Checkout } from "../../oferta";

gsap.registerPlugin(ScrollTrigger);

const ContentCards = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      icon: "📋",
      title: "O Passo a Passo do Zero",
      description:
        "Como abrir sua conta internacional, configurar tudo corretamente e conectar sua conta à estratégia automática em minutos.",
    },
    {
      icon: "📊",
      title: "Checklist de Segurança Validado",
      description:
        "Critérios, filtros e exemplos reais dos profissionais que entregam consistência e não promessas vazias.",
    },
    {
      icon: "🛡️",
      title: "Guia de Gestão de Risco Simplificado",
      description:
        "Instrumentos para proteger seu capital e manter seu patrimônio seguro, mesmo num mercado volátil.",
    },
    {
      icon: "⚡",
      title: "Tutorial Prático em 2 Horas",
      description:
        "Checklists, atalhos e orientações claras para você implementar tudo rapidamente.",
    },
  ];

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
        <h2 className="cards-title">
          O que você vai receber dentro do{" "}
          <span className="text-orange">Protocolo</span>
        </h2>

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
            href="https://pay.hotmart.com/N103487414R?checkoutMode=10&utm_source=vsl&utm_medium=botao&utm_campaign=vsl_aberta&utm_content=botao_vturb"
            className="button-vsl btn-primary btn-pulse"
            style={{
              display: "inline-block",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            QUERO COMPRAR AGORA
          </Checkout>
        </div>
      </div>
    </section>
  );
};

export default ContentCards;
