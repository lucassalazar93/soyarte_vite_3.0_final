import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BASE_URL from "../../../BASE_URL";
import "./BlogPreviewSwiper.css";

const BlogPreviewSwiper = ({ entradas }) => {
  if (!entradas || entradas.length === 0) return null;

  const recientes = entradas.slice(0, 5); // Limita a 5 artículos

  return (
    <section className="blog-preview-section">
      <h2 className="blog-preview-title">🌸 Artículos Recientes</h2>
      <p className="blog-preview-subtitle">
        Inspírate y sana a través de nuestras historias ✨
      </p>

      <div className="blog-swiper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {recientes.map((entrada) => (
            <SwiperSlide key={entrada.post_id}>
              <Link to={`/blog/${entrada.slug}`} className="blog-card-link">
                <div className="blog-card">
                  <div className="categoria-badge">
                    {entrada.categoria || "Reflexión"}
                  </div>

                  <img
                    src={entrada.imagen ? `${BASE_URL}${entrada.imagen}` : "/images/blog/default-blog.jpg"}
                    alt={entrada.titulo}
                    className="imagen-blog-card"
                  />

                  <div className="blog-card-content">
                    <h3>🌸 {entrada.titulo}</h3>
                    <p>
                      {entrada.resumen?.length > 90
                        ? `${entrada.resumen.slice(0, 90)}...`
                        : entrada.resumen}
                    </p>
                    <span className="read-more">Leer más →</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogPreviewSwiper;
