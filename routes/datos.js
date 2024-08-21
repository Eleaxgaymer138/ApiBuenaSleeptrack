const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

// Obtener todos los datos
Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * FROM datos", (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send("Error al obtener datos");
        }
    });
});

// Obtener datos de sueño por usuario
Router.get("/:userId/sleep", (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT temperatura, humedad, horas_sueno, fecha FROM datos WHERE user_id = ? ORDER BY fecha DESC";

    mysqlConexion.query(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(rows);
    });
});

// Endpoint para actualizar el sonido
Router.put('/sonido/:id', (req, res) => {
    const id = req.params.id;
    const sonido = req.body.sonido;

    // Asegúrate de validar el valor de 'sonido'
    if (typeof sonido !== 'boolean') {
        return res.status(400).json({ error: 'Invalid value for sonido' });
    }

    // Query para actualizar el valor de sonido en la base de datos
    const query = 'UPDATE sonido SET sonido = ? WHERE id = ?';
    
    mysqlConexion.query(query, [sonido ? 1 : 0, id], (error, results) => {
        if (error) {
            console.error('Error updating sonido:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Sonido updated successfully' });
        }
    });
});

module.exports = Router;
