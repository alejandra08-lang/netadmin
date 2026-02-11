const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const controllerMantenimiento = require('../controllers/controllerMantenimiento');
const rol = require ('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

router.get('/',  auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerMantenimiento.obtener_mantenimiento);
router.post('/',  auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerMantenimiento.crear_mantenimiento);
router.put('/:id',  auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerMantenimiento.editar_mantenimiento);
router.patch('/cancelar/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerMantenimiento.cancelar_mantenimiento);

module.exports = router;