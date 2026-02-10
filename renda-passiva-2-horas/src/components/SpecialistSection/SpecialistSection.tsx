import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./SpecialistSection.css";

import p1 from "../../assets/images/p-1.webp";
import p2 from "../../assets/images/p-2.webp";
import p3 from "../../assets/images/p-3.webp";
import p4 from "../../assets/images/p-4.webp";
import p5 from "../../assets/images/p-5.webp";
import p6 from "../../assets/images/p-6.webp";
import p7 from "../../assets/images/p-7.webp";
import p8 from "../../assets/images/p-8.webp";
import p9 from "../../assets/images/p-9.webp";
import p10 from "../../assets/images/p-10.webp";

const SpecialistSection = () => {
  const images = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

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
                  width="300"
                  height="400"
                  loading="lazy"
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
