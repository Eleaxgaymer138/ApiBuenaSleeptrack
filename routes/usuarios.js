// routes/usuarios.js
const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

// Obtener todos los usuarios
Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * FROM usuarios", (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Obtener un usuario por ID
Router.get("/:id", (req, res) => {
    const id = req.params.id;
    mysqlConexion.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

module.exports = Router;
