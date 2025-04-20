import React, { useEffect, useRef, useContext } from "react";
import "../css/coleccion.css";
import { Link } from "react-router-dom";

import lightGallery from "lightgallery";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

import { CarritoContext } from "../context/CarritoContext";

const Coleccion = () => {
  const galeriaRef = useRef(null);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    if (galeriaRef.current) {
      const instance = lightGallery(galeriaRef.current, {
        plugins: [lgZoom],
        speed: 500,
        zoom: true,
        download: false,
        selector: ".zoom-link",
      });

      return () => {
        instance && instance.destroy();
      };
    }
  }, []);

  const imagenes = [
    {
      product_id: 1,
      nombre: "Chaqueta bordada – Fuego interior",
      src: "/images/colgada.png",
      imagen: "images/soyfuego.jpg",
      alt: "Chaqueta bordada",
      precio: 129000,
      descripcion:
        "Despierta tu poder con cada puntada. Esta chaqueta en denim azul profundo está bordada con flores ardientes que simbolizan tu fuerza interior. Detalles en pedrería y la frase “Soy Arte” en la espalda hacen de esta pieza una declaración de identidad. Ideal para almas apasionadas.",
    },
    {
      product_id: 2,
      nombre: "Tennis addidas – Soy Arte",
      src: "/images/tennis-adidas-soyarte.png",
      imagen: "images/modelo-tennisaddias.png",
      alt: "Tennis florales",
      precio: 79000,
      descripcion:
        "Estilo deportivo con esencia femenina. Estos tennis con flores son perfectos para mujeres activas que caminan con arte.",
    },
    {
      product_id: 3,
      nombre: "Vestido rosa empoderado",
      src: "/images/vestido.png",
      imagen: "images/vestidosoyarte.png",
      alt: "Vestido rosa puesto",
      precio: 99000,
      descripcion:
        "Un vestido que florece contigo. Con encaje delicado y caída vaporosa, te acompaña en momentos especiales con fuerza y belleza.",
    },
    {
      product_id: 4,
      nombre: "Top floral – Soy fuego",
      src: "/images/ropainteriorPresentacion.png",
      imagen: "images/ropainterior.png",
      alt: "Top floral",
      precio: 79000,
      descripcion:
        "Delicado pero poderoso. Este top combina feminidad y libertad en una pieza cómoda, versátil y llena de intención.",
    },
  ];

  return (
    <div className="coleccion-container">
      <h1 className="coleccion-titulo" data-aos="fade-down">
        🔥  Soy Fuego
      </h1>

      <p className="coleccion-descripcion" data-aos="fade-up">
        Prendas que encienden tu esencia femenina. Cada pieza fue diseñada para
        abrazar tu fuerza, tu pasión y tu forma de florecer.
      </p>

      <div id="galeria-producto" className="galeria-imagenes" ref={galeriaRef}>
        {imagenes.map((item, index) => (
          <div key={index} className="tarjeta-producto">
            <a href={item.src} className="zoom-link">
              <img src={`/${item.imagen}`} alt={item.alt} />
            </a>

            <p className="nombre-prenda">{item.nombre}</p>

            {/* ✅ Descripción siempre renderizada (aunque esté vacía) */}
            <p className="descripcion-prenda">{item.descripcion || ""}</p>

            <p className="precio-prenda">
              ${item.precio.toLocaleString("es-CO")}
            </p>

            <button
              className="boton-carrito"
              onClick={() =>
                agregarAlCarrito({
                  product_id: item.product_id,
                  nombre: item.nombre,
                  precio: item.precio,
                  imagen: item.imagen,
                  cantidad: 1,
                })
              }
            >
              🛒 Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <Link to="/tienda" className="volver-tienda">
        ← Volver a la tienda
      </Link>
    </div>
  );
};

export default Coleccion;
