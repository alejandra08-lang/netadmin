const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const credencialesController = require('../controllers/controllerCredenciales');
const rol = require ('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

router.post('/',  auth, rol([ROLES.Administrador, ROLES.Gestor]), credencialesController.create);
router.get('/',  auth, rol([ROLES.Administrador, ROLES.Gestor]), credencialesController.getAll);
router.get('/:id',  auth, rol([ROLES.Administrador, ROLES.Gestor]), credencialesController.getById);
router.put('/:id',  auth, rol([ROLES.Administrador, ROLES.Gestor]), credencialesController.updatePassword);
router.delete('/:id',  auth, rol([ROLES.Administrador, ROLES.Gestor]), credencialesController.delete);

module.exports = router;