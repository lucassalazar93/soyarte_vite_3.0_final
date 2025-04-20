// ✅ backend/seedRecetasNoreQuintero.js
const db = require("./config/db");

async function insertarVariasRecetas() {
  const recetas = [
    {
      titulo: "Galletas de avena y miel",
      descripcion: "Crujientes, dulces y nutritivas",
      descripcion_larga: "<p>Perfectas para la tarde con café o una merienda saludable.</p>",
      imagen: "/uploads/imagenes-recetas/galletas-avena.jpg",
      tiempo_preparacion: 25,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.6,
      grupo_id: 1, // Ajusta según tus datos
      categoria_id: 9, // Postres
      ingredientes: `<ul><li>1 taza de avena</li><li>1/2 taza de miel</li><li>1 huevo</li></ul>`,
      preparacion: "<p>Mezcla, forma bolitas y hornea 15 minutos.</p>",
      pasos: [
        { numero: 1, descripcion: "Mezclar todos los ingredientes", tiempo: "5 min" },
        { numero: 2, descripcion: "Formar bolitas y colocar en bandeja", tiempo: "5 min" },
        { numero: 3, descripcion: "Hornear", tiempo: "15 min" },
      ],
      utensilios: [2, 5, 9]
    },
    {
      titulo: "Tostadas francesas con canela",
      descripcion: "Un desayuno que acaricia el alma",
      descripcion_larga: "<p>Dulces, suaves y doradas. Como un abrazo en la mañana.</p>",
      imagen: "/uploads/imagenes-recetas/tostadas-francesas.jpg",
      tiempo_preparacion: 20,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.9,
      grupo_id: 1,
      categoria_id: 7, // Desayunos
      ingredientes: `<ul><li>Pan tajado</li><li>Huevos</li><li>Canela</li><li>Leche</li></ul>`,
      preparacion: "<p>Remoja el pan, fríe en mantequilla y espolvorea canela.</p>",
      pasos: [
        { numero: 1, descripcion: "Batir huevos con leche y canela", tiempo: "3 min" },
        { numero: 2, descripcion: "Remojar pan y freír", tiempo: "10 min" },
      ],
      utensilios: [3, 4, 5]
    },

    {
      titulo: "Lasaña casera de carne",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.2,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 9,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },

    {
      titulo: "Pollo al horno con especias",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.5,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Tarta de manzana clásica",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.8,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 9,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Sopa reconfortante de verduras",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 40,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.2,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 7,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },


    {
      titulo: "Ensalada fresca mediterránea",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.0,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 8,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Pasta cremosa con champiñones",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 40,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.7,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Empanadas de pollo y maíz",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 30,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.6,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Flan de coco tradicional",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.2,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 9,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Pan artesanal integral",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 45,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.0,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 8,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },

    {
      titulo: "Pechuga rellena al horno",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 45,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.7,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Crema de calabaza",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 45,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.1,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 7,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Tortilla de patata jugosa",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 45,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.3,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 7,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Arroz con pollo y verduras",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 20,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.9,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Bizcocho de limón esponjoso",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 20,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.1,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 9,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Hamburguesa casera vegetariana",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.2,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Tallarines con salsa boloñesa",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 30,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.1,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Tarta de queso al horno",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.9,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 9,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Canelones rellenos de carne",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 60,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.2,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Smoothie antioxidante de frutos rojos",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 30,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.1,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 10,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Chili con carne colombiano",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 30,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.1,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Arepas rellenas con queso",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 45,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.5,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Muffins de zanahoria y nueces",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 20,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.2,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 9,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Croquetas de jamón cremosas",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 20,
      nivel_dificultad: "Fácil",
      autor: "Nore Quintero",
      calificacion: 4.9,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Lomo en salsa de champiñones",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 30,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 5.0,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Costillas BBQ al horno",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 40,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.5,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Tarta de banano saludable",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 45,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.8,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 9,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
      {
      titulo: "Quiche de espinaca",
      descripcion: "Deliciosa receta casera para compartir en familia.",
      descripcion_larga: "<p>Una preparación pensada para reconectar con el alma a través de sabores auténticos.</p>",
      imagen: "/uploads/imagenes-recetas/default.jpg",
      tiempo_preparacion: 45,
      nivel_dificultad: "Media",
      autor: "Nore Quintero",
      calificacion: 4.1,
      video: null,
      audio: null,
      youtube_link: null,
      grupo_id: 1,
      categoria_id: 6,
      ingredientes: "<ul><li>1 huevo</li><li>1 taza de harina</li><li>1/2 taza de leche</li></ul>",
      preparacion: "<p>Mezcla todos los ingredientes y cocina con amor.</p>",
      es_paga: 0,
      bloqueada: 0,
      pasos: [
        { numero: 1, descripcion: "Prepara todos los ingredientes", tiempo: "5 min", imagen: null },
        { numero: 2, descripcion: "Sigue el proceso paso a paso", tiempo: "10 min", imagen: null },
        { numero: 3, descripcion: "Finaliza con amor y sirve", tiempo: "5 min", imagen: null }
      ],
      utensilios: [1, 2, 3]
    },
    // Puedes agregar más recetas aquí...
  ];

  try {
    for (const receta of recetas) {
      const [res] = await db.query(`
        INSERT INTO recetas (
          titulo, descripcion, descripcion_larga, imagen,
          tiempo_preparacion, nivel_dificultad, autor, calificacion,
          video, audio, youtube_link, grupo_id, categoria_id,
          ingredientes, preparacion, es_paga, bloqueada
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        receta.titulo, receta.descripcion, receta.descripcion_larga, receta.imagen,
        receta.tiempo_preparacion, receta.nivel_dificultad, receta.autor, receta.calificacion,
        null, null, null,
        receta.grupo_id, receta.categoria_id,
        receta.ingredientes, receta.preparacion,
        0, 0
      ]);

      const recetaId = res.insertId;

      for (const paso of receta.pasos) {
        await db.query(`
          INSERT INTO pasos_receta (receta_id, numero_paso, descripcion, tiempo, imagen)
          VALUES (?, ?, ?, ?, ?)
        `, [recetaId, paso.numero, paso.descripcion, paso.tiempo, null]);
      }

      for (const utensilioId of receta.utensilios) {
        await db.query(`
          INSERT INTO receta_utensilios (receta_id, utensilio_id)
          VALUES (?, ?)
        `, [recetaId, utensilioId]);
      }

      console.log(`✅ Receta "${receta.titulo}" insertada correctamente.`);
    }

    process.exit();
  } catch (err) {
    console.error("❌ Error al insertar recetas:", err);
    process.exit(1);
  }
}

insertarVariasRecetas();
