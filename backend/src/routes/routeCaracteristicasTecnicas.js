const express = require('express');
const auth = require('../middlewares/authMiddleware');
const ROLES = require('../config/roles.js');
const router = express.Router();
const controllerCaracteristicasTecnicas= require('../controllers/controllerCaracteristicasTecnicas');
const rol = require ('../middlewares/rolMiddleware');

router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCaracteristicasTecnicas.obtener_caracteristicas);
router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCaracteristicasTecnicas.crear_caracteristicas);
router.put('/:id',auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCaracteristicasTecnicas.editar_caracteristicas);
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerCaracteristicasTecnicas.eliminar_caracteristicas);

module.exports = router;