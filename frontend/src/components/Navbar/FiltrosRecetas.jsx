import React, { useState } from "react";
import styles from "./FiltrosRecetas.module.css";

const tiempos = ["Menos de 15 min", "15-30 min", "Más de 45 min"];
const niveles = ["Fácil", "Intermedio", "Avanzado"];

const FiltrosRecetas = ({ onFiltrar, autores = [], onSorprendeme, categorias = [] }) => {
    const [filtros, setFiltros] = useState({
        nombre: "",
        categoria: "",
        tiempo: "",
        nivel: "",
        autor: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nuevosFiltros = { ...filtros, [name]: value };
        setFiltros(nuevosFiltros);
        onFiltrar(nuevosFiltros);
    };

    const limpiarFiltros = () => {
        const vacios = {
            nombre: "",
            categoria: "",
            tiempo: "",
            nivel: "",
            autor: "",
        };
        setFiltros(vacios);
        onFiltrar(vacios);
    };

    return (
        <div className={styles.filtrosContainer}>
            <h3 className={styles.titulo}>🎛️ Filtros de Recetas</h3>
            <p className={styles.microcopy}>¿Buscas algo específico o quieres dejarte sorprender? ¡Filtra y descubre!</p>

            <div className={styles.filtrosGrid}>
                <div className={styles.inputGroup}>
                    <span>🔍</span>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la receta"
                        value={filtros.nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <span>🍽️</span>
                    <select name="categoria" value={filtros.categoria} onChange={handleChange}>
                        <option value="">Categoría</option>
                        {categorias.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <span>⏱️</span>
                    <select name="tiempo" value={filtros.tiempo} onChange={handleChange}>
                        <option value="">Tiempo estimado</option>
                        {tiempos.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <span>👩‍🍳</span>
                    <select name="nivel" value={filtros.nivel} onChange={handleChange}>
                        <option value="">Nivel</option>
                        {niveles.map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <span>👤</span>
                    <input
                        type="text"
                        name="autor"
                        placeholder="Autor"
                        value={filtros.autor}
                        onChange={handleChange}
                        list="autores"
                    />
                    <datalist id="autores">
                        {autores.map((a) => (
                            <option key={a} value={a} />
                        ))}
                    </datalist>
                </div>
            </div>

            <div className={styles.botones}>
                <button onClick={limpiarFiltros} className={styles.btnLimpiar}>
                    ✨ Limpiar Filtros
                </button>
                <button onClick={onSorprendeme} className={styles.btnSorpresa}>
                    🎲 Sorpréndeme
                    <span className={styles.vajillaFlotante}>🍽️</span>
                </button>
            </div>
        </div>
    );
};

export default FiltrosRecetas;
