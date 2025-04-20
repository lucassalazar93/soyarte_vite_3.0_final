import React, { useEffect, useState } from "react";
import "./VistaInventario.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ProductoForm from "../../components/Inventario/ProductoForm";
import BASE_URL from "../../BASE_URL";

const VistaInventario = () => {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // 🔄 Obtener productos
  const obtenerProductos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/productos`);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("❌ Error al cargar productos", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await fetch(`${BASE_URL}/api/productos/${id}`, { method: "DELETE" });
      await obtenerProductos();
    } catch (error) {
      console.error("❌ Error al eliminar producto", error);
    }
  };

  const abrirModalEdicion = (producto) => {
    setModoEdicion(true);
    setEditando(producto.product_id);
    setFormData({ ...producto });
    setMostrarModal(true);
  };

  const abrirModalNuevo = () => {
    setModoEdicion(false);
    setFormData({});
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setFormData({});
    setEditando(null);
  };

  const guardarProducto = async () => {
    const metodo = modoEdicion ? "PUT" : "POST";
    const url = modoEdicion
      ? `${BASE_URL}/api/productos/${editando}`
      : `${BASE_URL}/api/productos`;

    try {
      const form = new FormData();
      form.append("nombre", formData.nombre);
      form.append("precio", formData.precio);
      form.append("stock", formData.stock);
      form.append("categoria_id", formData.categoria_id);
      form.append("grupo_id", formData.grupo_id || 0);
      form.append("descripcion", formData.descripcion || "");
      form.append("oferta", formData.oferta || 0);
      form.append("temperatura", formData.temperatura || 0);
      if (formData.precio_oferta) form.append("precio_oferta", formData.precio_oferta);
      if (formData.imagen instanceof File) form.append("imagen", formData.imagen);

      const res = await fetch(url, { method: metodo, body: form });
      const result = await res.json();
      if (result.error) return alert(result.error);

      cerrarModal();
      obtenerProductos();
    } catch (error) {
      console.error("❌ Error al guardar producto:", error);
      alert("Error al guardar producto");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen" && files.length > 0) {
      setFormData((prev) => ({ ...prev, imagen: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(productos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Inventario");
    XLSX.writeFile(libro, "inventario_soy_arte.xlsx");
  };

  const exportarPDF = () => {
    const tabla = document.querySelector(".tabla-inventario");
    html2canvas(tabla).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save("inventario_soy_arte.pdf");
    });
  };

  const productosFiltrados = productos.filter((p) => {
    const matchNombre = p.nombre?.toLowerCase().includes(filtroNombre.toLowerCase());
    const matchGrupo = filtroGrupo ? p.grupo_nombre === filtroGrupo : true;
    const matchCategoria = filtroCategoria ? p.categoria_nombre === filtroCategoria : true;
    return matchNombre && matchGrupo && matchCategoria;
  });

  const categoriasUnicas = [...new Set(productos.map(p => p.categoria_nombre).filter(Boolean))];
  const gruposUnicos = [...new Set(productos.map(p => p.grupo_nombre).filter(Boolean))];

  return (
    <div className="inventario-panel">
      <h2>📦 Inventario de Productos</h2>

      <div className="acciones-inventario">
        <button onClick={abrirModalNuevo}>➕ Agregar nuevo producto</button>
        <button onClick={exportarExcel}>📊 Exportar Excel</button>
        <button onClick={exportarPDF}>📄 Exportar PDF</button>
      </div>

      <div className="filtros-contenedor">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <select value={filtroGrupo} onChange={(e) => setFiltroGrupo(e.target.value)}>
          <option value="">Grupo: Todos</option>
          {gruposUnicos.map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
          <option value="">Categoría: Todas</option>
          {categoriasUnicas.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Oferta</th>
            <th>Categoría</th>
            <th>Grupo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((p) => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>
                <img
                  src={`${BASE_URL}${p.imagen}`}
                  alt={p.nombre}
                  className="preview-img"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </td>
              <td>{p.nombre}</td>
              <td>${parseInt(p.precio).toLocaleString("es-CO")}</td>
              <td>{p.stock}</td>
              <td>{p.oferta ? "🔥 Sí" : "🧊 No"}</td>
              <td>{p.categoria_nombre || "Sin categoría"}</td>
              <td>{p.grupo_nombre || "Sin grupo"}</td>
              <td>
                <button onClick={() => abrirModalEdicion(p)}>✏️</button>
                <button onClick={() => eliminarProducto(p.product_id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarModal && (
        <ProductoForm
          formData={formData}
          setFormData={setFormData} // ✅ Necesario para ReactQuill
          handleChange={handleChange}
          guardarProducto={guardarProducto}
          cerrarModal={cerrarModal}
          modoEdicion={modoEdicion}
        />
      )}
    </div>
  );
};

export default VistaInventario;
