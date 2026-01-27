const express = require('express');
const router = express.Router();
const controllerDepartamento = require ('../controllers/controllerDepartamento.js');

router.get('/', controllerDepartamento.obtener_departamentos);

module.exports = router;