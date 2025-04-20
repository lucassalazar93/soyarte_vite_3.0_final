import React, { useEffect, useState } from "react";
import "./VistaRecetas.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import RecetaForm from "../../../components/Recetas/RecetaForm";
import BASE_URL from "../../../BASE_URL";

const VistaRecetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  // 🔄 Obtener todas las recetas
  const obtenerRecetas = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/recetas`);
      const data = await res.json();
      setRecetas(data);
    } catch (error) {
      console.error("❌ Error al cargar recetas:", error);
      alert("Ocurrió un error al cargar las recetas.");
    }
  };

  useEffect(() => {
    obtenerRecetas();
  }, []);

  // ✅ Agregar nueva
  const abrirModalNueva = () => {
    setModoEdicion(false);
    setFormData({});
    setMostrarModal(true);
  };

  // ✏️ Editar receta
  const abrirModalEdicion = (receta) => {
    setModoEdicion(true);
    setEditando(receta.id);
    setFormData({ ...receta });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setFormData({});
    setEditando(null);
  };

  // 🗑️ Eliminar receta
  const eliminarReceta = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta receta? Esta acción no se puede deshacer.")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/recetas/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("No se pudo eliminar");

      alert("✅ Receta eliminada correctamente.");
      obtenerRecetas();
    } catch (error) {
      console.error("❌ Error al eliminar la receta:", error);
      alert("Ocurrió un error al intentar eliminar la receta.");
    }
  };

  // 📦 Exportaciones
  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(recetas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Recetas");
    XLSX.writeFile(libro, "recetas_soy_arte.xlsx");
  };

  const exportarPDF = () => {
    const tabla = document.querySelector(".tabla-recetas");
    html2canvas(tabla).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save("recetas_soy_arte.pdf");
    });
  };

  // 🎯 Filtrado
  const recetasFiltradas = recetas.filter((r) => {
    const matchTitulo = r.titulo?.toLowerCase().includes(filtroTitulo.toLowerCase());
    const matchCategoria = filtroCategoria ? r.categoria_nombre === filtroCategoria : true;
    const matchNivel = filtroNivel ? r.nivel_dificultad === filtroNivel : true;
    return matchTitulo && matchCategoria && matchNivel;
  });

  const categoriasUnicas = [...new Set(recetas.map((r) => r.categoria_nombre).filter(Boolean))];
  const nivelesUnicos = [...new Set(recetas.map((r) => r.nivel_dificultad).filter(Boolean))];

  return (
    <div className="vista-recetas">
      <h2>📖 Recetas Guardadas</h2>

      <div className="acciones-recetas">
        <button onClick={abrirModalNueva}>➕ Agregar receta</button>
        <button onClick={exportarExcel}>📊 Exportar Excel</button>
        <button onClick={exportarPDF}>📄 Exportar PDF</button>
      </div>

      <div className="filtros-contenedor">
        <input
          type="text"
          placeholder="🔍 Buscar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categoriasUnicas.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
        <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
          <option value="">Todos los niveles</option>
          {nivelesUnicos.map((n, i) => (
            <option key={i} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <table className="tabla-recetas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Tiempo</th>
            <th>Dificultad</th>
            <th>Autor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recetasFiltradas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.titulo}</td>
              <td>{r.categoria_nombre || "Sin asignar"}</td>
              <td>{r.tiempo_preparacion} min</td>
              <td>{r.nivel_dificultad}</td>
              <td>{r.autor}</td>
              <td className="acciones-btns">
                <button onClick={() => abrirModalEdicion(r)} title="Editar">✏️</button>
                <button onClick={() => eliminarReceta(r.id)} title="Eliminar" className="btn-eliminar">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarModal && (
        <RecetaForm
          receta={formData}
          setReceta={setFormData}
          modoEdicion={modoEdicion}
          recetaId={editando}
          cerrarModal={cerrarModal}
          recargar={obtenerRecetas}
        />
      )}
    </div>
  );
};

export default VistaRecetas;
