const express = require('express');
const router = express.Router();
const controllerDependencias = require('../controllers/controllerDependencias');
const auth = require('../middlewares/authMiddleware');
const rol = require ('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerDependencias.obtener_dependencias);
router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerDependencias.crear_dependencia);
router.patch('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerDependencias.editar_dependencia);
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerDependencias.eliminar_dependencia);

module.exports = router;