const express = require('express');
const router = express.Router();
const controller = require ('../controllers/controllerAuth.js');

router.post('/login', controller.login);

module.exports = router;