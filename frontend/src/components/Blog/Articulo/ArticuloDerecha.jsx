import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../BASE_URL";
import "./ArticuloDerecha.css";

// Función para seleccionar artículos aleatorios
const getRandomPosts = (blogPosts) => {
  if (!blogPosts || blogPosts.length === 0) return [];
  return [...blogPosts].sort(() => Math.random() - 0.5).slice(0, 5);
};

const ArticuloDerecha = ({ articulo, blogPosts }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || (!correo && !telefono)) {
      return alert("Por favor completa al menos el nombre y un medio de contacto.");
    }

    try {
      const res = await fetch(`${BASE_URL}/api/red-sanadora`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          correo: correo || null,
          telefono: telefono || null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("💌 Gracias por unirte a la Red Sanadora. Pronto recibirás inspiración ✨");
        setNombre("");
        setCorreo("");
        setTelefono("");
      } else {
        alert("Hubo un error al guardar tu mensaje. Intenta nuevamente.");
      }
    } catch (err) {
      console.error("❌ Error al enviar mensaje:", err);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <aside className="articulo-derecha" data-aos="fade-left">
      {/* Foto y nombre */}
      <section className="autor-foto">
        <img
          src="/images/blog/nore-blog.jpg"
          alt="Foto de Nore Quintero"
          className="foto-autor"
          loading="lazy"
        />
        <h3 className="autor-nombre">Nore Quintero</h3>
      </section>

      {/* Historia del autor */}
      <section className="historia-autor">
        <p>{articulo.autorHistoria}</p>
        <p className="historia-cita">
          "Soy Arte nace desde mi propia historia: una infancia marcada por la ausencia,
          el maltrato y la soledad, que con los años me llevó a enfrentar un diagnóstico
          de ansiedad y depresión. En la cocina encontré un refugio, un lugar para sanar.
          Así nació la Terapia Culinaria y esta comunidad de luz."
        </p>
      </section>

      {/* Firma manuscrita */}
      <section className="firma-autor">
        <img
          src="/images/blog/firma.png"
          alt="Firma de Nore Quintero"
          className="firma-imagen"
          loading="lazy"
        />
      </section>

      {/* Formulario: Red Sanadora */}
      <section className="formulario-suscripcion">
        <h3>Únete a la Red Sanadora</h3>
        <p>Déjanos tu nombre y forma de contacto ✨</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input-suscripcion"
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico (opcional)"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="input-suscripcion"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Número de WhatsApp (opcional)"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="input-suscripcion"
          />
          <button type="submit" className="btn-suscripcion">
            Unirme 💜
          </button>
        </form>
      </section>

      {/* Lo más leído */}
      <section className="lo-mas-leido">
        <h2>Lo más leído</h2>
        <div className="post-list">
          {getRandomPosts(blogPosts).map((post) => (
            <Link
              key={post.post_id}
              to={`/blog/${post.slug}`}
              className="post-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="post-card">
                <h4>{post.titulo}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default ArticuloDerecha;
