// archivo: routes/sonido.js

const express = require('express');
const router = express.Router();
const connection = require('../conexion'); // Asegúrate de importar tu conexión de base de datos

// Ruta para actualizar el estado del sonido
router.post('/sonido', (req, res) => {
    const { sonido } = req.body;
    const query = 'UPDATE sonido SET sonido = ? WHERE id = 1';

    connection.query(query, [sonido], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Estado del sonido actualizado' });
    });
});

module.exports = router;
