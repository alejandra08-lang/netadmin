const express = require('express');
const router = express.Router();
const controllerSwitch = require('../controllers/controllerSwitch');

router.get('/', controllerSwitch.obtener_switches);
router.post('/', controllerSwitch.crear_switch);
router.delete('/:id', controllerSwitch.eliminar_switch);

module.exports = router; 