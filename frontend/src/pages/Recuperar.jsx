import React, { useState } from "react";
import "./Login.css";

function Recuperar() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [fase, setFase] = useState(1);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const solicitarCodigo = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/recuperar/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setFase(2);
        setMensaje("✉️ Código enviado a tu correo.");
      } else {
        setError(data.error || "Error al enviar código");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  const confirmarCodigo = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/recuperar/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo, nuevaPass }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("✨ Contraseña actualizada. Ahora puedes ingresar.");
        setFase(3);
      } else {
        setError(data.error || "Error al cambiar contraseña");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-page login">
        <div className="left-panel" style={{ backgroundImage: "url(/img/fondo-login.png)" }}>
          <div className="welcome-box">
            <h2>Recuperar acceso</h2>
            <p>Te enviaremos un código temporal para cambiar tu clave.</p>
            <span>Confía en tu proceso ✨</span>
          </div>
        </div>

        <div className="right-panel">
          <form className="form-container" onSubmit={(e) => e.preventDefault()}>
            <h2>Recuperar Contraseña</h2>
            {mensaje && <div className="success-message">{mensaje}</div>}
            {error && <div className="error-message">{error}</div>}

            {fase === 1 && (
              <>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Correo registrado"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button className="register-button" onClick={solicitarCodigo}>
                  Enviar código
                </button>
              </>
            )}

            {fase === 2 && (
              <>
                <div className="input-group">
                  <input
                    placeholder="Código recibido"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={nuevaPass}
                    onChange={(e) => setNuevaPass(e.target.value)}
                    required
                  />
                </div>
                <button className="register-button" onClick={confirmarCodigo}>
                  Cambiar contraseña
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recuperar;
