const express = require('express');
const router = express.Router();
const controllerCampana= require ('../controllers/controllerCampana.js');

router.get('/', controllerCampana.obtener_campanas);
router.post('/',controllerCampana.crear_campana);
router.put('/:id', controllerCampana.editar_campana);
router.delete('/:id', controllerCampana.eliminar_campana);

module.exports = router;