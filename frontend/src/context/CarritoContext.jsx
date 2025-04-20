// CarritoContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    // 🔁 Al cargar: intenta recuperar desde localStorage
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // 🔄 Sincronizar con localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.product_id === producto.product_id);
      if (existe) {
        return prev.map((p) =>
          p.product_id === producto.product_id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.product_id === id && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.product_id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = carrito.reduce((total, item) => {
    const precio = item.oferta === 1 ? item.precio_oferta : item.precio;
    return total + (parseFloat(precio) || 0) * item.cantidad;
  }, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
