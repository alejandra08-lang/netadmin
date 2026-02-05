const express = require('express');
const router = express.Router();
const controllerSwitch = require('../controllers/controllerSwitch.js');
const auth = require('../middlewares/authMiddleware.js');
const rol = require('../middlewares/rolMiddleware.js')
const ROLES = require('../config/roles');

//listar todos los switchs
router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerSwitch.obtener_switches);

//crear nuevos switch
router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerSwitch.crear_switch);

//Eliminar switch
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerSwitch.eliminar_switch);

module.exports = router; 