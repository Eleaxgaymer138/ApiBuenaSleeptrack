const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

Router.post("/", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM usuarios WHERE email = ? AND contrasena = ?";
    mysqlConexion.query(query, [email, password], (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else if (rows.length > 0) {
            // Aquí puedes generar y devolver un token de autenticación si es necesario
            res.json({ token: "fake-jwt-token", user: rows[0] });
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});

module.exports = Router;
