require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db.js');
const app = express();
// Middlewares
app.use(cors());
app.use(express.json()); // Para que el servidor entienda JSON
app.use('/rol', require('./routes/routesRole')); 
app.use('/usuarios', require('./routes/routesUsuario')); 
app.use('/credenciales', require('./routes/routesCredenciales')); 
app.use('/auth', require('./routes/routesAuth')); 
app.use('/historial', require ('./routes/routesHistorialsistema')); 
app.use('/site', require('./routes/routeSite')); 
app.use('/instalador_responsable', require('./routes/routesInstaladorresponsabel')); //ya
app.use('/proveedor', require('./routes/routesProveedor'));
app.set('trust proxy', true);
app.use('/mantenimiento', require('./routes/routeMantenimiento.js')); //✅
app.use('/Switch', require('./routes/routeSwitch.js'));//✅
app.use('/Dependencias_impacto', require('./routes/routeDependencias.js'));//✅
app.use('/CaracteristicasTecnicas', require('./routes/routeCaracteristicasTecnicas.js')); //✅
app.use('/Equipos', require('./routes/routeEquipo.js'));//✅
app.use('/Campana', require('./routes/routeCampana.js')); //✅
app.use('/Ubicacion', require('./routes/routeUbicacion.js'));//✅
app.use('/Ciudad', require('./routes/routeCiudad.js')); //✅
app.use('/Departamento', require('./routes/routeDepartamento.js')); //✅

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de NetAdmin funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});