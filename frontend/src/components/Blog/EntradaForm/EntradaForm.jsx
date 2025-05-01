import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import BASE_URL from "../../../BASE_URL";
import "./EntradaForm.css";

const EntradaForm = ({ formData, setFormData, guardarEntrada, cerrarModal, modoEdicion }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);
  const [previewMusic, setPreviewMusic] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [miniHistorias, setMiniHistorias] = useState([""]);
  const [reflexiones, setReflexiones] = useState([""]);

  useEffect(() => {
    if (modoEdicion && formData) {
      if (formData.imagen && typeof formData.imagen === "string") {
        setPreviewImage(`${BASE_URL}${formData.imagen}`);
      }
      if (formData.audio_url && typeof formData.audio_url === "string") {
        setPreviewAudio(`${BASE_URL}${formData.audio_url}`);
      }
      if (formData.musica_url && typeof formData.musica_url === "string") {
        setPreviewMusic(`${BASE_URL}${formData.musica_url}`);
      }

      if (formData.mini_historia) {
        setMiniHistorias(Array.isArray(formData.mini_historia) ? formData.mini_historia : [formData.mini_historia]);
      }

      if (formData.reflexion) {
        setReflexiones(Array.isArray(formData.reflexion) ? formData.reflexion : [formData.reflexion]);
      }
    }
  }, [modoEdicion, formData]);

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    if (!file) return;
    if (tipo === "imagen") setPreviewImage(URL.createObjectURL(file));
    if (tipo === "audio_url") setPreviewAudio(URL.createObjectURL(file));
    if (tipo === "musica_url") setPreviewMusic(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, [tipo]: file }));
  };

  const agregarMiniHistoria = () => setMiniHistorias([...miniHistorias, ""]);
  const agregarReflexion = () => setReflexiones([...reflexiones, ""]);
  const actualizarMiniHistoria = (i, value) => {
    const nuevas = [...miniHistorias];
    nuevas[i] = value;
    setMiniHistorias(nuevas);
  };
  const actualizarReflexion = (i, value) => {
    const nuevas = [...reflexiones];
    nuevas[i] = value;
    setReflexiones(nuevas);
  };
  const eliminarMiniHistoria = (i) => {
    const nuevas = [...miniHistorias];
    nuevas.splice(i, 1);
    setMiniHistorias(nuevas);
  };
  const eliminarReflexion = (i) => {
    const nuevas = [...reflexiones];
    nuevas.splice(i, 1);
    setReflexiones(nuevas);
  };

  const handleGuardar = async () => {
    if (!formData.titulo?.trim() || !formData.resumen?.trim() || !formData.contenido?.trim()) {
      alert("⚠️ Completa Título, Resumen y Contenido antes de guardar.");
      return;
    }

    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("resumen", formData.resumen);
    data.append("pregunta", formData.pregunta || "");
    data.append("contenido", formData.contenido);
    data.append("youtube_embed", formatearYoutubeEmbed(formData.youtube_embed || ""));

    miniHistorias.forEach((historia) => data.append("mini_historias[]", historia));
    reflexiones.forEach((reflexion) => data.append("reflexiones[]", reflexion));

    if (formData.imagen instanceof File) data.append("imagen", formData.imagen);
    if (formData.audio_url instanceof File) data.append("audio_url", formData.audio_url);
    if (formData.musica_url instanceof File) data.append("musica_url", formData.musica_url);

    try {
      setEnviando(true);
      await guardarEntrada(data);
      alert("✅ Entrada guardada correctamente.");
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar entrada");
    } finally {
      setEnviando(false);
    }
  };

  const formatearYoutubeEmbed = (url) => {
    if (!url.includes("youtube.com/watch?v=")) return url;
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <div className="entrada-modal-overlay">
      <div className="entrada-modal-contenido">
        <h3>{modoEdicion ? "✏️ Editar Entrada" : "➕ Nueva Entrada"}</h3>
        <div className="form-scroll">
          <input
            name="titulo"
            value={formData.titulo || ""}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            placeholder="Título"
          />
          <textarea
            name="resumen"
            value={formData.resumen || ""}
            onChange={(e) => setFormData({ ...formData, resumen: e.target.value })}
            placeholder="Resumen breve"
          />
          <textarea
            name="pregunta"
            value={formData.pregunta || ""}
            onChange={(e) => setFormData({ ...formData, pregunta: e.target.value })}
            placeholder="Pregunta motivadora"
          />

          <label>Contenido principal:</label>
          <SunEditor
            defaultValue={formData.contenido || ""}
            onChange={(v) => setFormData({ ...formData, contenido: v })}
            height="200px"
          />

          <label>🌸 Mini Historias:</label>
          {miniHistorias.map((h, i) => (
            <div key={i}>
              <SunEditor
                defaultValue={h}
                onChange={(v) => actualizarMiniHistoria(i, v)}
                height="150px"
              />
              <button type="button" onClick={() => eliminarMiniHistoria(i)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={agregarMiniHistoria}>➕ Agregar Mini Historia</button>

          <label>🌿 Reflexiones:</label>
          {reflexiones.map((r, i) => (
            <div key={i}>
              <SunEditor
                defaultValue={r}
                onChange={(v) => actualizarReflexion(i, v)}
                height="150px"
              />
              <button type="button" onClick={() => eliminarReflexion(i)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={agregarReflexion}>➕ Agregar Reflexión</button>

          <label>Subir Imagen:</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "imagen")} />
          {previewImage && <img src={previewImage} alt="Vista previa" className="preview-img" />}

          <label>Subir Audio Reflexión:</label>
          <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, "audio_url")} />
          {previewAudio && <audio controls src={previewAudio}></audio>}

          <label>Subir Música:</label>
          <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, "musica_url")} />
          {previewMusic && <audio controls src={previewMusic}></audio>}

          <input
            name="youtube_embed"
            value={formData.youtube_embed || ""}
            onChange={(e) => setFormData({ ...formData, youtube_embed: e.target.value })}
            placeholder="Enlace de YouTube"
          />
        </div>

        <div className="entrada-modal-acciones">
          <button onClick={handleGuardar} disabled={enviando}>
            {enviando ? "Guardando..." : "💾 Guardar"}
          </button>
          <button onClick={cerrarModal}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EntradaForm;
