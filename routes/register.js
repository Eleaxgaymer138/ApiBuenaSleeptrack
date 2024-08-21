const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

Router.post("/", (req, res) => {
    const { nombre, email, numero, password, birthdate } = req.body;

    // Verificar si el email ya está registrado
    mysqlConexion.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (rows.length > 0) {
            return res.status(400).send("Email already registered");
        }

        // Insertar nuevo usuario
        const query = "INSERT INTO usuarios (nombre, email, telefono, contrasena, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)";
        mysqlConexion.query(query, [nombre, email, numero, password, birthdate], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

module.exports = Router;
