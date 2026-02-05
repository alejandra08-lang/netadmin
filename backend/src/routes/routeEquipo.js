
const express = require('express');
const router = express.Router();
const controllerEquipos = require('../controllers/controllerEquipos');


router.get('/', controllerEquipos.obtener_equipos);
router.post('/', controllerEquipos.crear_equipo);
router.put('/:id', controllerEquipos.editar_equipo);
router.delete('/:id', controllerEquipos.eliminar_equipo);

module.exports = router;