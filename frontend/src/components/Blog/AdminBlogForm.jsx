import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import BASE_URL from "../../BASE_URL";
import "./AdminBlogForm.css";

const AdminBlogForm = ({ formData, setFormData, guardarEntrada, cerrarModal, modoEdicion }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);
  const [previewMusic, setPreviewMusic] = useState(null);
  const [previewYoutube, setPreviewYoutube] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (modoEdicion && formData) {
      if (typeof formData.imagen === "string") {
        setPreviewImage(`${BASE_URL}${formData.imagen}`);
      }
      if (typeof formData.audio_url === "string") {
        setPreviewAudio(`${BASE_URL}${formData.audio_url}`);
      }
      if (typeof formData.musica_url === "string") {
        setPreviewMusic(`${BASE_URL}${formData.musica_url}`);
      }
      if (formData.youtube_embed) {
        setPreviewYoutube(formatearYoutubeEmbed(formData.youtube_embed));
      }
    }
  }, [formData, modoEdicion]);

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    if (!file) return;

    if (tipo === "imagen") setPreviewImage(URL.createObjectURL(file));
    if (tipo === "audio_url") setPreviewAudio(URL.createObjectURL(file));
    if (tipo === "musica_url") setPreviewMusic(URL.createObjectURL(file));

    setFormData((prev) => ({ ...prev, [tipo]: file }));
  };

  const handleYoutubeChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, youtube_embed: url }));
    setPreviewYoutube(formatearYoutubeEmbed(url));
  };

  const formatearYoutubeEmbed = (url) => {
    if (!url.includes("watch?v=")) return url;
    const id = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  };

  const agregarCampo = (campo) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: [...(prev[campo] || []), ""],
    }));
  };

  const actualizarCampo = (campo, index, valor) => {
    const copia = [...(formData[campo] || [])];
    copia[index] = valor;
    setFormData((prev) => ({ ...prev, [campo]: copia }));
  };

  const handleSubmit = async () => {
    if (!formData.titulo || !formData.resumen || !formData.contenido) {
      alert("⚠️ Título, resumen y contenido son obligatorios.");
      return;
    }

    const datos = new FormData();
    datos.append("titulo", formData.titulo);
    datos.append("resumen", formData.resumen);
    datos.append("pregunta", formData.pregunta || "");
    datos.append("contenido", formData.contenido);
    datos.append("mini_historia", JSON.stringify(formData.mini_historia || []));
    datos.append("reflexion", JSON.stringify(formData.reflexion || []));
    datos.append("youtube_embed", formData.youtube_embed || "");

    if (formData.imagen instanceof File) datos.append("imagen", formData.imagen);
    if (formData.audio_url instanceof File) datos.append("audio_url", formData.audio_url);
    if (formData.musica_url instanceof File) datos.append("musica_url", formData.musica_url);

    try {
      setEnviando(true);
      if (typeof guardarEntrada === "function") {
        await guardarEntrada(datos);
      } else {
        throw new Error("guardarEntrada no está definido como función.");
      }
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("Ocurrió un error al guardar la entrada.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="blog-modal-overlay">
      <div className="blog-modal-contenido">
        <h3>{modoEdicion ? "✏️ Editar Entrada" : "➕ Nueva Entrada"}</h3>

        <div className="form-scroll">
          <input
            type="text"
            placeholder="Título del artículo"
            value={formData.titulo || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
          />

          <label>Resumen emocional:</label>
          <SunEditor
            defaultValue={formData.resumen || ""}
            onChange={(value) => setFormData((prev) => ({ ...prev, resumen: value }))}
            height="120px"
          />

          <label>Pregunta reflexiva:</label>
          <SunEditor
            defaultValue={formData.pregunta || ""}
            onChange={(value) => setFormData((prev) => ({ ...prev, pregunta: value }))}
            height="120px"
          />

          <label>Contenido principal:</label>
          <SunEditor
            defaultValue={formData.contenido || ""}
            onChange={(value) => setFormData((prev) => ({ ...prev, contenido: value }))}
            height="200px"
          />

          <label>Mini Historias:</label>
          {(formData.mini_historia || [""]).map((item, idx) => (
            <div key={idx}>
              <SunEditor
                defaultValue={item}
                onChange={(value) => actualizarCampo("mini_historia", idx, value)}
                height="100px"
              />
            </div>
          ))}
          <button type="button" onClick={() => agregarCampo("mini_historia")}>
            ➕ Agregar Historia
          </button>

          <label>Reflexiones:</label>
          {(formData.reflexion || [""]).map((item, idx) => (
            <div key={idx}>
              <SunEditor
                defaultValue={item}
                onChange={(value) => actualizarCampo("reflexion", idx, value)}
                height="100px"
              />
            </div>
          ))}
          <button type="button" onClick={() => agregarCampo("reflexion")}>
            ➕ Agregar Reflexión
          </button>

          <label>📷 Imagen principal:</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "imagen")} />
          {previewImage && <img src={previewImage} alt="Vista previa" className="preview-img" />}

          <label>🎧 Audio de voz:</label>
          <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, "audio_url")} />
          {previewAudio && <audio controls src={previewAudio} className="preview-audio" />}

          <label>🎵 Música ambiental:</label>
          <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, "musica_url")} />
          {previewMusic && <audio controls src={previewMusic} className="preview-audio" />}

          <label>🎥 Enlace de YouTube:</label>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            value={formData.youtube_embed || ""}
            onChange={handleYoutubeChange}
          />
          {previewYoutube && (
            <div className="iframe-container">
              <iframe
                width="100%"
                height="315"
                src={previewYoutube}
                title="YouTube Preview"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <div className="blog-modal-acciones">
          <button onClick={handleSubmit} disabled={enviando}>
            {enviando ? "⏳ Guardando..." : "💾 Guardar"}
          </button>
          <button onClick={cerrarModal}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogForm;
