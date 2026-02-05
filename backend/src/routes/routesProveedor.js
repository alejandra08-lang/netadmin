const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const proveedor = require ('../controllers/controllerProveedor');
const rol = require ('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');

//crear proveedor
router.post('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), proveedor.createproveedor);

//listar todos los proovedores
router.get('/', auth, rol([ROLES.Administrador, ROLES.Gestor]), proveedor.getproveedores);

//buscar instalador por reazon_social
router.get('/:pro_razon_social', auth, rol([ROLES.Administrador, ROLES.Gestor]), proveedor.getproveedorByrazonsocial);

//actualizar datos de proveedor
router.put('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), proveedor.updateproveedor);

//eliminar proveedor
router.delete('/:id', auth, rol([ROLES.Administrador, ROLES.Gestor]), proveedor.deleteproveedor);

module.exports = router; 