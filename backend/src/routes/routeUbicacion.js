const express = require('express');
const router = express.Router();
const controllerUbicacion = require ('../controllers/controllerUbicacion.js');

router.get('/', controllerUbicacion.obtener_ubicaciones);
router.post('/', controllerUbicacion.crear_ubicacion);
router.delete('/:id', controllerUbicacion.eliminar_ubicacion);

module.exports = router;