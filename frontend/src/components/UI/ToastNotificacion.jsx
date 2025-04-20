import React from "react";
import "./toast.css";

const ToastNotificacion = ({ mensaje, visible }) => {
  return (
    visible && (
      <div className="toast">
        <span className="toast-icon">💖</span> {/* Puedes cambiar a ✅ si prefieres */}
        <span className="toast-text">{mensaje}</span>
      </div>
    )
  );
};

export default ToastNotificacion;
