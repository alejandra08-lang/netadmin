const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerRol');


//crear rol
router.post('/', controller.createRol);

//optener rol
router.get('/', controller.getRoles);
router.get('/',controller.getRolbyId);

//actualizar
router.put('/', controller.updateRol);

//eliminar
router.delete('/',controller.deleteRol);

module.exports = router;