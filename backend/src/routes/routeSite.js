const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const rol = require('../middlewares/rolMiddleware.js');
const controllerSite = require ('../controllers/controllerSite.js');
const ROLES = require('../config/roles.js');

router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerSite.obtener_todos_site);
router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerSite.crear_site);

//eliminar si no se depende el
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), controllerSite.eliminar_site);

module.exports = router;