require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para que el servidor entienda JSON

app.use('/mantenimiento', require('./routes/routeMantenimiento.js')); //✅
app.use('/Switch', require('./routes/routeSwitch.js'));//✅
app.use('/Dependencias_impacto', require('./routes/routeDependencias.js'));//✅
app.use('/CaracteristicasTecnicas', require('./routes/routeCaracteristicasTecnicas.js')); //✅
app.use('/Equipos', require('./routes/routeEquipo.js'));//✅
app.use('/Campana', require('./routes/routeCampana.js')); //✅
app.use('/Ubicacion', require('./routes/routeUbicacion.js'));//✅
app.use('/Ciudad', require('./routes/routeCiudad.js')); //✅
app.use('/Departamento', require('./routes/routeDepartamento.js')); //✅
app.use('/Site', require('./routes/routeSite.js'));//✅

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de NetAdmin funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});