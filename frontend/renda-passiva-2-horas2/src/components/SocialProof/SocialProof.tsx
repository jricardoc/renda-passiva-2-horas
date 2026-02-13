import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";

gsap.registerPlugin(ScrollTrigger);
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./SocialProof.css";

import img1 from "../../assets/images/img1.jpeg";
import img2 from "../../assets/images/img2.jpeg";
import img3 from "../../assets/images/img3.jpeg";
import img4 from "../../assets/images/img4.jpeg";
import img5 from "../../assets/images/img5.jpeg";
import img6 from "../../assets/images/img6.jpeg";
import img7 from "../../assets/images/img7.jpeg";
import img8 from "../../assets/images/img8.jpeg";
import img9 from "../../assets/images/img9.png";
import img10 from "../../assets/images/img10.png";
import img11 from "../../assets/images/img11.png";
import img12 from "../../assets/images/img12.png";

const SocialProof = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: img1,
      caption: "Aluno comemorando primeiro lucro em dólar",
    },
    {
      src: img2,
      caption: "Feedback positivo após configurar o setup",
    },
    {
      src: img3,
      caption: "Resultado consistente na primeira semana",
    },
    {
      src: img4,
      caption: "Aluno impressionado com a simplicidade",
    },
    {
      src: img5,
      caption: "Conta ativa gerando resultados diários",
    },
    {
      src: img6,
      caption: "Depoimento de aluno satisfeito",
    },
    {
      src: img7,
      caption: "Setup funcionando automaticamente",
    },
    {
      src: img8,
      caption: "Resultados superando expectativas",
    },
    {
      src: img9,
      caption: "Ganhos recorrentes comprovados",
    },
    {
      src: img10,
      caption: "Estratégia rodando com sucesso",
    },
    {
      src: img11,
      caption: "Aluno agradecendo pelo método",
    },
    {
      src: img12,
      caption: "Histórico real de rendimentos",
    },
  ];

  useEffect(() => {
    // Disable GSAP animations on mobile for performance
    if (window.matchMedia("(max-width: 768px)").matches) return;

    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Block body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <section className="social-proof-section" ref={sectionRef}>
      <div className="container">
        <h2 className="proof-title">
          <span className="text-green">Prova Social</span> - Resultados Reais
        </h2>
        <p className="proof-subtitle">
          Você não é o primeiro que irei ensinar. Veja os feedbacks de quem já
          adquiriu o Protocolo
        </p>

        <div className="proof-slider-wrapper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoHeight={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="proof-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="proof-item"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="proof-image-wrapper">
                    <img
                      src={image.src}
                      alt={image.caption}
                      className="proof-image"
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="400"
                    />
                    <div className="proof-overlay">
                      <span className="icon-check">✓</span>
                    </div>
                  </div>
                  <p className="proof-caption">{image.caption}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img src={selectedImage} alt="Resultado ampliado" />
          </div>
        </div>
      )}
    </section>
  );
};

export default SocialProof;
