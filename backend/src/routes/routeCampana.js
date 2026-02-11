const express = require('express');
const router = express.Router();
const controllerCampana= require ('../controllers/controllerCampana.js');
const auth = require('../middlewares/authMiddleware');
const rol = require ('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCampana.obtener_campanas);
router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCampana.crear_campana);
router.put('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCampana.editar_campana);
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCampana.eliminar_campana);

module.exports = router;