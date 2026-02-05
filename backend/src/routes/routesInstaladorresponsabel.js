const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const Instaladorresponsable = require ('../controllers/controllerInstaladorrespondable');
const rol = require ('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

//crear instalador responsable
router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), Instaladorresponsable.create); //listo

//listar los instaladores
router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), Instaladorresponsable.getInstaladores);

//buscar instalador por nombre
router.get('/:inr_nombre', auth, rol([ROLES.Administrador, ROLES.Gestor]), Instaladorresponsable.getinstaladorByname);

//actualiza datos de instalador
router.put('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), Instaladorresponsable.updateInstaladores);

//eliminar instalador
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), Instaladorresponsable.delete);

module.exports = router;