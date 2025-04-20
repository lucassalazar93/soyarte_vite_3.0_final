import React, { useEffect, useState } from "react";
import logo from "../assets/images/Logo_Morado.png";
import sonidoInicio from "../assets/sounds/icy-meditation-glockenspiel-108771.mp3";
import "./SplashScreen.css";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const sonido = new Audio(sonidoInicio);
    sonido.volume = 0.3;
    sonido.play().catch((err) => console.error("Error al reproducir sonido:", err));

    const fadeTimer = setTimeout(() => setFadeOut(true), 4000); // Aplica fade
    const hideTimer = setTimeout(() => setShow(false), 5000);  // Oculta completamente

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return show ? (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <img 
        src={logo} 
        alt="Soy Arte - Logo" 
        className="logo-splash" 
        aria-label="Logo de Soy Arte"
      />
      <p className="splash-tagline">La magia comienza aquí...</p>
    </div>
  ) : null;
}
