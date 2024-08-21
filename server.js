const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConexion = require("./conexion");
const usuarios = require("./routes/usuarios");
const datos = require("./routes/datos");
const register = require("./routes/register");
const login = require("./routes/login");

const app = express();
app.use(bodyParser.json());

// Configuración de CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Manejo de solicitudes OPTIONS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Rutas de la API
app.use("/usuarios", usuarios);
app.use("/datos", datos);
app.use("/register", register);
app.use("/login", login);

// Ruta para obtener los últimos datos insertados en la tabla "datos"
app.get('/datos/latest', (req, res) => {
    const query = 'SELECT * FROM datos ORDER BY fecha DESC LIMIT 1';

    mysqlConexion.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error retrieving sleep data' });
        } else {
            res.json(result);
        }
    });
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
