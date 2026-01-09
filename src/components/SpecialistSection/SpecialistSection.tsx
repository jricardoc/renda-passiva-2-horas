import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./SpecialistSection.css";

const SpecialistSection = () => {
  const images = [
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-1.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-2.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-3.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-4.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-5.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-6.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-7.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-8.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-9.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-10.webp",
  ];

  return (
    <section className="specialist-section animate-section">
      {/* Header with container */}
      <div className="container">
        <div className="specialist-header">
          <h2 className="specialist-title">
            Quem é o <span className="text-orange">Especialista</span>?
          </h2>
          <p className="specialist-subtitle">
            Conheça um pouco mais sobre quem está por trás do Protocolo
          </p>
        </div>
      </div>

      {/* Slider full-width outside container */}
      <div className="specialist-slider-fullwidth">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="specialist-swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="specialist-slide">
                <img
                  src={src}
                  alt={`Hendi - Foto ${index + 1}`}
                  className="specialist-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SpecialistSection;
