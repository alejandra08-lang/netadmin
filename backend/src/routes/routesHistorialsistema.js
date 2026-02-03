const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const rol = require('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');
const controller = require('../controllers/controllerHistorialsistema');

// Ver todos los historiales
router.get(
    '/',
    auth,
    rol([ROLES.Administrador]),
    controller.getAll
);

// Ver historial por usuario
router.get(
    '/usuario/:id_usuario',
    auth,
    rol([ROLES.Administrador]),
    controller.getByUsuario
);


// Eliminar historial (solo admin)
router.delete(
    '/:id',
    auth,
    rol([ROLES.Administrador]),
    controller.delete
);

module.exports = router;
