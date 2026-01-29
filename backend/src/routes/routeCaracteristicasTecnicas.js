const express = require('express');
const router = express.Router();
const controllerCaracteristicasTecnicas= require('../controllers/controllerCaracteristicasTecnicas');

router.get('/', controllerCaracteristicasTecnicas.obtener_caracteristicas);
router.post('/', controllerCaracteristicasTecnicas.crear_caracteristicas);
router.put('/:id', controllerCaracteristicasTecnicas.editar_caracteristicas);
router.delete('/:id', controllerCaracteristicasTecnicas.eliminar_caracteristicas);

module.exports = router;