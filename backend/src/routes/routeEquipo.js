const express = require('express');
const router = express.Router();
const controllerEquipos = require('../controllers/controllerEquipos');


router.get('/', controllerEquipos);

router.post('/', controllerEquipos.crear_equipo);
router.put('/', controllerEquipos.editar_equipo);
router.delete('/', controllerEquipos.eliminar_equipo);

module.exports = router;