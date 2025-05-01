const db = require('../config/db');

// Mostrar solo comentarios visibles por post
exports.obtenerComentariosPorPost = (req, res) => {
  const { post_id } = req.params;
  db.query(
    'SELECT * FROM comentarios_blog WHERE post_id = ? AND visible = TRUE ORDER BY fecha DESC',
    [post_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

// Crear nuevo comentario
exports.crearComentario = (req, res) => {
  const { post_id, texto, calificacion } = req.body;
  db.query(
    'INSERT INTO comentarios_blog (post_id, texto, calificacion) VALUES (?, ?, ?)',
    [post_id, texto, calificacion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

// Obtener todos los comentarios (admin)
exports.obtenerTodos = (req, res) => {
  db.query('SELECT * FROM comentarios_blog ORDER BY fecha DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Cambiar visibilidad (bloquear/mostrar)
exports.cambiarVisibilidad = (req, res) => {
  const { id } = req.params;
  const { visible } = req.body;
  db.query(
    'UPDATE comentarios_blog SET visible = ? WHERE id = ?',
    [visible, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    }
  );
};
