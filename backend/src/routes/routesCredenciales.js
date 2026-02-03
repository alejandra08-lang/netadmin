const express = require('express');
const router = express.Router();
const credencialesController = require('../controllers/controllerCredenciales');

router.post('/', credencialesController.create);
router.get('/', credencialesController.getAll);
router.get('/:id', credencialesController.getById);
router.put('/:id', credencialesController.updatePassword);
router.delete('/:id', credencialesController.delete);

module.exports = router;