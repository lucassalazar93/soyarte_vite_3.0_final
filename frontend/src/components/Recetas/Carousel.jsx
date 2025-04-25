// ✅ src/components/Recetas/Carousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./Carousel.css";

const images = [
  {
    src: "/images/Brownie.jpeg",
    title: "Un bocado dulce, un momento para ti",
    subtitle: "Brownies, tartas y dulces que reconfortan el alma.",
    link: "/recetas/postres",
    categoria: "postre",
  },
  {
    src: "/images/pasta.jpg",
    title: "Explora el arte de la pasta",
    subtitle: "Platos que acarician el alma con cada bocado.",
    link: "/recetas/pasta",
    categoria: "pasta",
  },
  {
    src: "/images/carne.jpeg",
    title: "Carnes jugosas y llenas de sabor",
    subtitle: "La intensidad de lo hecho en casa con amor.",
    link: "/recetas/carne",
    categoria: "carne",
  },
  {
    src: "/images/sopa.jpeg",
    title: "Sopas calientes para el alma",
    subtitle: "Calor, sabor y hogar en cada cucharada.",
    link: "/recetas/sopa",
    categoria: "sopa",
  },
];

const Carousel = () => {
  return (
    <div className="carousel">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="swiper-recetas"
      >
        {images.map(({ src, title, subtitle, link, categoria }, i) => (
          <SwiperSlide key={i}>
            <div className="slide">
              <img
                src={src}
                alt={title}
                className="carousel-image"
                onError={(e) => (e.target.src = "/images/default.jpg")}
              />
              <div className="carousel-overlay">
                <div className="text-background">
                  <h2 className="carousel-title">{title}</h2>
                  <p className="carousel-subtitle">{subtitle}</p>
                  <a href={link} className={`btn-carousel ${categoria}`}>
                    Explorar receta
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
