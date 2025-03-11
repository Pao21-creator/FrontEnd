import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Carousel = () => {
  const swiperRef = useRef(null); // Creamos la referencia para acceder al swiper

  const images = [
    {
      src: "/assets/img/agrometeorologia.jpg",
      link: "/nieve", // Enlace asociado a la imagen
    },
    {
      src: "/assets/img/escenarios-evolutivos.jpg",
      link: "https://example.com/escenarios-evolutivos", // Enlace asociado a la imagen
    },
    {
      src: "/assets/img/indice-de-vegetacion.jpg",
      link: "/ndvi", // Enlace asociado a la imagen
    },
  ];

  // Método para ir al siguiente slide
  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext(); // Avanza al siguiente slide
    }
  };

  // Método para ir al slide anterior
  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev(); // Retrocede al slide anterior
    }
  };

  return (
    <div className="carousel">
      {/* Inicializamos Swiper y le asignamos la referencia */}
      <Swiper
        ref={swiperRef} // Pasamos la referencia a Swiper
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={500}
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {/* Cada imagen está envuelta en un enlace <a> */}
            <a href={image.link} target="_blank" rel="noopener noreferrer">
              <img src={image.src} alt={`Imagen ${index + 1}`} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botones personalizados para navegar entre los slides */}
      <button onClick={goToPrevSlide} className="swiper-button-prev">
      </button>
      <button onClick={goToNextSlide} className="swiper-button-next">
      </button>
    </div>
  );
};

export default Carousel;

