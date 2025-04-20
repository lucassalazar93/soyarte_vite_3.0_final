// DiarioCulinario.jsx
import React, { useState, useEffect } from "react";
import "./DiarioCulinario.css";

const DiarioCulinario = () => {
  const userId = localStorage.getItem("userId");
  const backendURL = "http://localhost:5000"; // Cambiar por tu URL en producción si es necesario

  const [entradas, setEntradas] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    emocion: "",
    receta: "",
    reflexion: "",
    imagen: null,
    fecha: new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", userId);
    formDataToSend.append("titulo", formData.titulo);
    formDataToSend.append("emocion", formData.emocion);
    formDataToSend.append("receta", formData.receta);
    formDataToSend.append("reflexion", formData.reflexion);
    if (formData.imagen) {
      formDataToSend.append("imagen", formData.imagen);
    }

    try {
      const response = await fetch(`${backendURL}/api/diario`, {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.id) {
        fetchEntradas();
        setFormData({
          titulo: "",
          emocion: "",
          receta: "",
          reflexion: "",
          imagen: null,
          fecha: new Date().toLocaleDateString(),
        });
      }
    } catch (error) {
      console.error("Error al guardar entrada:", error);
    }
  };

  const fetchEntradas = () => {
    if (!userId) return;
    fetch(`${backendURL}/api/diario/${userId}`)
      .then((res) => res.json())
      .then((data) => setEntradas(data))
      .catch((err) => console.error("Error cargando entradas:", err));
  };

  useEffect(() => {
    fetchEntradas();
  }, [userId]);

  return (
    <section className="diario-section">
      <h2 className="diario-titulo">📖 Diario Culinario Emocional</h2>
      <p className="diario-subtitulo">
        Un espacio para guardar tus emociones, recuerdos y reflexiones desde la cocina. <br />
        Totalmente privado y solo para ti <strong>"inicia sesión"</strong>
      </p>

      {!userId ? (
        <p className="mensaje-sesion">Inicia sesión para ver tu diario personal 💜</p>
      ) : (
        <>
          <form className="formulario-diario" onSubmit={handleSubmit}>
            <input
              type="text"
              name="titulo"
              placeholder="Dale un nombre a tu momento (ej: Cena bajo la lluvia...)"
              value={formData.titulo}
              onChange={handleChange}
              required
            />

            <select name="emocion" value={formData.emocion} onChange={handleChange} required>
              <option value="">¿Cómo te sentiste?</option>
              <option value="😊 Alegría">😊 Alegría</option>
              <option value="😌 Calma">😌 Calma</option>
              <option value="💭 Nostalgia">💭 Nostalgia</option>
              <option value="💗 Gratitud">💗 Gratitud</option>
              <option value="🌀 Ansiedad">🌀 Ansiedad</option>
              <option value="🌙 Tranquilidad">🌙 Tranquilidad</option>
              <option value="✨ Inspiración">✨ Inspiración</option>
              <option value="❤️ Amor propio">❤️ Amor propio</option>
            </select>

            <input
              type="text"
              name="receta"
              placeholder="¿Qué receta o reto acompaña este momento?"
              value={formData.receta}
              onChange={handleChange}
            />

            <textarea
              name="reflexion"
              placeholder="Escribe tu experiencia, cómo te sentiste, qué descubriste..."
              value={formData.reflexion}
              onChange={handleChange}
              required
            />

            <input type="file" name="imagen" accept="image/*" onChange={handleChange} />

            <button type="submit">💜 Guardar entrada</button>
          </form>

          <div className="entradas-diario">
            {entradas.map((entrada) => (
              <div key={entrada.id} className="entrada">
                <h3>{entrada.titulo}</h3>
                <p className="meta">{entrada.emocion} • {new Date(entrada.fecha).toLocaleDateString()}</p>
                <p className="receta">🍽️ {entrada.receta}</p>
                <p className="texto">{entrada.reflexion}</p>
                {entrada.imagen && (
                  <img
                    src={`${backendURL}/uploads/${entrada.imagen}`}
                    alt="entrada emocional"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default DiarioCulinario;
