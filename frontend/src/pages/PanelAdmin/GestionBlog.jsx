// src/pages/PanelAdmin/GestionBlog.jsx
import React, { useState, useEffect } from "react";
import AdminBlogForm from "../../components/Blog/AdminBlogForm";
import BASE_URL from "../../BASE_URL";
import "./GestionBlog.css";

const GestionBlog = () => {
  const [entradas, setEntradas] = useState([]);
  const [formData, setFormData] = useState({});
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    obtenerEntradas();
  }, []);

  const obtenerEntradas = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/blog`);
      const data = await res.json();
      setEntradas(data);
    } catch (error) {
      console.error("❌ Error al cargar entradas:", error);
    }
  };

  const abrirModalNuevo = () => {
    setModoEdicion(false);
    setFormData({});
    setMostrarModal(true);
  };

  const abrirModalEdicion = (entrada) => {
    setModoEdicion(true);
    setEditando(entrada.post_id);
    setFormData({
      ...entrada,
      mini_historia: entrada.mini_historia ? JSON.parse(entrada.mini_historia) : [""],
      reflexion: entrada.reflexion ? JSON.parse(entrada.reflexion) : [""],
    });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setFormData({});
    setEditando(null);
  };

  const eliminarEntrada = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta entrada?")) return;
    try {
      await fetch(`${BASE_URL}/api/blog/${id}`, { method: "DELETE" });
      obtenerEntradas();
    } catch (error) {
      console.error("❌ Error al eliminar entrada:", error);
    }
  };

  const guardarEntrada = async () => {
    const metodo = modoEdicion ? "PUT" : "POST";
    const url = modoEdicion
      ? `${BASE_URL}/api/blog/${editando}`
      : `${BASE_URL}/api/blog`;

    const data = new FormData();
    for (let key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => data.append(`${key}[]`, item));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(url, {
        method: metodo,
        body: data,
      });

      const result = await res.json();
      if (result.error) {
        alert(result.error);
      } else {
        cerrarModal();
        obtenerEntradas();
      }
    } catch (error) {
      console.error("❌ Error al guardar entrada:", error);
      alert("❌ Error al guardar entrada");
    }
  };

  const entradasFiltradas = entradas.filter((entrada) =>
    entrada.titulo?.toLowerCase().includes(filtroTitulo.toLowerCase())
  );

  return (
    <div className="gestion-blog-panel">
      <h2>📝 Gestión de Entradas del Blog</h2>

      <div className="acciones-blog">
        <button onClick={abrirModalNuevo}>➕ Agregar nueva entrada</button>
      </div>

      <div className="filtros-contenedor">
        <input
          type="text"
          placeholder="🔍 Buscar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
      </div>

      <table className="tabla-blog">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Audio</th>
            <th>Música</th>
            <th>Video</th>
            <th>Título</th>
            <th>Resumen</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entradasFiltradas.map((entrada) => (
            <tr key={entrada.post_id}>
              <td>{entrada.post_id}</td>

              <td>
                {entrada.imagen && (
                  <img
                    src={`${BASE_URL}${entrada.imagen}`}
                    alt="Miniatura"
                    className="preview-img"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </td>

              <td>
                {entrada.audio_url && (
                  <audio
                    controls
                    src={`${BASE_URL}${entrada.audio_url}`}
                    className="preview-audio"
                  />
                )}
              </td>

              <td>
                {entrada.musica_url && (
                  <audio
                    controls
                    src={`${BASE_URL}${entrada.musica_url}`}
                    className="preview-audio"
                  />
                )}
              </td>

              <td>
                {entrada.youtube_embed && (
                  <a
                    href={entrada.youtube_embed}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎥 Ver Video
                  </a>
                )}
              </td>

              <td>{entrada.titulo}</td>
              <td>{entrada.resumen?.slice(0, 50)}...</td>
              <td>{new Date(entrada.fecha_creacion).toLocaleDateString()}</td>
              <td>
                <button onClick={() => abrirModalEdicion(entrada)}>✏️</button>
                <button onClick={() => eliminarEntrada(entrada.post_id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarModal && (
        <AdminBlogForm
          formData={formData}
          setFormData={setFormData}
          handleGuardar={guardarEntrada}
          cerrarModal={cerrarModal}
          modoEdicion={modoEdicion}
        />
      )}
    </div>
  );
};

export default GestionBlog;
