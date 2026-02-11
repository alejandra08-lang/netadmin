const express = require('express');
const router = express.Router();
const controllerEquipos = require('../controllers/controllerEquipos');
const auth = require('../middlewares/authMiddleware');
const rol = require ('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerEquipos.crear_equipo);
router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerEquipos.obtener_equipos);
router.get('/marca/:eqp_marca', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerEquipos.obtener_equipo_marca);
router.get('/host/:eqp_nombre_host', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerEquipos.obtener_equipo_host );
router.get('/tipo/:eqp_tipo_equipo', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerEquipos.obtener_equipo_tipo);
router.patch('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerEquipos.editar_equipo);
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerEquipos.eliminar_equipo);

module.exports = router;