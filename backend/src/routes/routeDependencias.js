const express = require('express');
const router = express.Router();
const controllerDependencias = require('../controllers/controllerDependencias');

router.get('/', controllerDependencias.obtener_dependencias);
router.post('/', controllerDependencias.crear_dependencia);
router.put('/:id', controllerDependencias.editar_dependencia);
router.delete('/:id', controllerDependencias.eliminar_dependencia);

module.exports = router;