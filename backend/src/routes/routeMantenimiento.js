const express = require('express');
const router = express.Router();
const controllerMantenimiento = require('../controllers/controllerMantenimiento');

router.get('/', controllerMantenimiento.obtener_mantenimiento);
router.post('/', controllerMantenimiento.crear_mantenimiento);
router.put('/:id', controllerMantenimiento.editar_mantenimiento);

module.exports = router;