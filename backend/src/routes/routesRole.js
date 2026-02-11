const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const rol = require('../middlewares/rolMiddleware')
const controller = require('../controllers/controllerRol');
const ROLES = require('../config/roles');

//crear rol
router.post('/', auth, rol([ROLES.Administrador]), controller.createRol);

//optener rol
router.get('/', auth, rol([ROLES.Administrador]), controller.getRoles);
router.get('/', auth, rol([ROLES.Administrador]), controller.getRolbyId);

//actualizar
router.put('/', auth, rol([ROLES.Administrador]), controller.updateRol);

//eliminar
router.delete('/', auth, rol([ROLES.Administrador]), controller.deleteRol);

module.exports = router;