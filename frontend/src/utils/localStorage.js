// Guarda una receta en el historial de recetas cocinadas
export const guardarRecetaCocinada = (receta) => {
    const recetas = JSON.parse(localStorage.getItem("recetasCocinadas")) || [];
    const yaExiste = recetas.find((r) => r.id === receta.id);
    if (!yaExiste) {
      recetas.push(receta);
      localStorage.setItem("recetasCocinadas", JSON.stringify(recetas));
    }
  };
  
  // Obtiene todas las recetas marcadas como cocinadas
  export const obtenerRecetasCocinadas = () => {
    return JSON.parse(localStorage.getItem("recetasCocinadas")) || [];
  };
  
  // Limpia el historial de recetas cocinadas
  export const limpiarHistorialCocina = () => {
    localStorage.removeItem("recetasCocinadas");
  };
  