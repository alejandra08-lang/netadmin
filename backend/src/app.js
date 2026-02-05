require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de NetAdmin funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});