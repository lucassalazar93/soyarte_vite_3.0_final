import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Mujeres.css";
import MujerCard from "./MujerCard";
import FormularioParticipacion from "./FormularioParticipacion";

const mujeresData = [
  {
    id: 1,
    nombre: "Catalina Ríos",
    ciudad: "Medellín",
    frase: "Cuando una mujer sana, sana toda su historia.",
    resumen: "Empezó vendiendo artesanías y ahora lidera un centro de formación.",
    imagen: "/images/mujeres/catalina.png",
  },
  {
    id: 2,
    nombre: "Luisa Moreno",
    ciudad: "Cali",
    frase: "El arte fue mi terapia y mi voz.",
    resumen: "Transformó su historia de violencia en murales que inspiran a su comunidad.",
    imagen: "/images/mujeres/luisa.png",
  },
  {
    id: 3,
    nombre: "Paola Salas",
    ciudad: "Bogotá",
    frase: "Me caí muchas veces, pero aprendí a volar.",
    resumen: "Después de perderlo todo, creó un emprendimiento que empodera a madres solteras.",
    imagen: "/images/mujeres/paola.png",
  },
  {
    id: 4,
    nombre: "Diana Arango",
    ciudad: "Cartagena",
    frase: "No soy lo que me pasó, soy lo que decidí ser.",
    resumen: "Fundadora de un colectivo de apoyo emocional para mujeres migrantes.",
    imagen: "/images/mujeres/diana.png",
  },
  {
    id: 5,
    nombre: "Mónica Quintero",
    ciudad: "Bucaramanga",
    frase: "Escribí para sanar, y sanando empecé a brillar.",
    resumen: "Publicó un libro sobre resiliencia femenina tras superar una pérdida profunda.",
    imagen: "/images/mujeres/monica.png",
  },
];

const MujeresInspiran = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="mujeres-section">
      {/* Hero emocional */}
      <div className="mujeres-hero">
        <h1>🌸 Mujeres que Son Arte</h1>
        <p>
          Hay mujeres que transforman el dolor en arte, los retos en fuerza, y la vida
          en inspiración. Este espacio es para ellas.
        </p>
      </div>

      {/* Carrusel destacado */}
      <Slider {...settings} className="mujeres-slider">
        {mujeresData.map((mujer) => (
          <div key={mujer.id} className="mujer-slide">
            <div
              className="mujer-background"
              style={{ backgroundImage: `url(${mujer.imagen})` }}
            >
              <div className="mujer-content">
                <h2>{mujer.nombre}</h2>
                <p className="frase">{mujer.frase}</p>
                <p>{mujer.resumen}</p>
                <Link to={`/mujeres/${mujer.id}`} className="btn-ver-historia">
                  Ver historia
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Galería de tarjetas */}
      <div className="mujeres-galeria">
        <h2 className="galeria-title">Más mujeres que inspiran</h2>
        <p className="galeria-sub">
          Cada historia es una chispa de luz. Descúbrelas.
        </p>
        <div className="mujeres-grid">
          {mujeresData.map((mujer) => (
            <MujerCard key={mujer.id} {...mujer} />
          ))}
        </div>
      </div>

      {/* Formulario de participación */}
      <FormularioParticipacion />

      {/* Hashtag con icono animado */}
      <div className="hashtag-boton">
        <a
          href="https://www.instagram.com/explore/tags/mujeresqueinspiran/"
          target="_blank"
          rel="noopener noreferrer"
          className="hashtag-link"
        >
          <span>#mujeresqueinspiran</span>
          <img
            src="/images/instagram.png"
            alt="Instagram"
            className="icono-rebote"
          />
        </a>
      </div>

      {/* Bloque de reflexión final */}
      <div className="bloque-reflexion">
        <p className="frase-final">
          ✨ Este espacio es un reflejo de ti, de todas nosotras.
          Porque somos muchas, somos arte.
        </p>
        <Link to="/compartir-historia" className="btn-rosa">
          Quiero compartir mi historia
        </Link>
      </div>
    </section>
  );
};

export default MujeresInspiran;
