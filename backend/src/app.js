const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para que el servidor entienda JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de NetAdmin funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});