import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./SocialProof.css";

const SocialProof = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img1.jpeg",
      caption: "Aluno comemorando primeiro lucro em dólar",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img2.jpeg",
      caption: "Feedback positivo após configurar o setup",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img3.jpeg",
      caption: "Resultado consistente na primeira semana",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img4.jpeg",
      caption: "Aluno impressionado com a simplicidade",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img5.jpeg",
      caption: "Conta ativa gerando resultados diários",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img6.jpeg",
      caption: "Depoimento de aluno satisfeito",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img7.jpeg",
      caption: "Setup funcionando automaticamente",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img8.jpeg",
      caption: "Resultados superando expectativas",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img9.png",
      caption: "Ganhos recorrentes comprovados",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img10.png",
      caption: "Estratégia rodando com sucesso",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img11.png",
      caption: "Aluno agradecendo pelo método",
    },
    {
      src: "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img12.png",
      caption: "Histórico real de rendimentos",
    },
  ];

  useEffect(() => {
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
      }
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
