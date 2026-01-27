const express = require('express');
const router = express.Router();
const controllerCiudad= require ('../controllers/controllerCiudad.js');

router.get('/', controllerCiudad.obtener_ciudades);

module.exports = router;