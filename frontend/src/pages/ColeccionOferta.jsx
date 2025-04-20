// ✅ src/pages/ColeccionOferta.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductosEnOferta from "../components/Tienda/ProductosEnOferta";

const ColeccionOferta = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productos") // ⚠️ Cambia al dominio de producción si es necesario
      .then((res) => {
        // ✅ Filtrar solo los productos en oferta
        const enOferta = res.data.filter((p) => p.oferta === 1);
        setProductos(enOferta);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const handleAgregarCarrito = (producto) => {
    console.log("Agregar al carrito:", producto);
    // Aquí iría tu lógica para el contexto del carrito
  };

  return (
    <div>
      <ProductosEnOferta productos={productos} onAgregar={handleAgregarCarrito} />
    </div>
  );
};

export default ColeccionOferta;
