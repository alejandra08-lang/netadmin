const express = require('express');
const router = express.Router();
const HojaController = require('../controllers/controllerHoja_vida');
const auth = require('../middlewares/authMiddleware');
const rol = require('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), HojaController.crearHojaDeVida);
router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor, ROLES.Lector]), HojaController.obtenerHojaDeVida);
router.get('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), HojaController.obternerHojaDeVidaPorId);
router.put('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), HojaController.actualizarHojaDeVida);
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), HojaController.eliminarHojaDeVida);

module.exports = router