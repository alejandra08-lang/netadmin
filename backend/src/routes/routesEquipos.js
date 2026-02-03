const express = require('express');

const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const rol = require('../middlewares/rolMiddleware');
const equiposcontroller = require('../controllers/controllersequipos')