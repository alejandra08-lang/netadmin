const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const rol = require('../middlewares/rolMiddleware');
const ROLES = require('../config/roles');
const usuarioController = require('../controllers/controllerUsuario');

// Listar todos los usuarios
router.get('/', auth, rol([ROLES.Administrador]), usuarioController.getUsuarios);

// Crear usuario
router.post('/', auth, rol([ROLES.Administrador]), usuarioController.createUsuario);

// Obtener usuario por ID
router.get('/:id', auth, rol([ROLES.Administrador]), usuarioController.getUsuarioById);

// Actualizar usuario por nombre
router.put('/:id', auth, rol([ROLES.Administrador]), usuarioController.updateUsuario);

//Cambiar contraseña a otros usuarios
router.put('/:id_usuario/contrasena', auth, rol([ROLES.Administrador]), usuarioController.cambioContraseña);

// Eliminar usuario por ID
router.delete('/:id', auth, rol([ROLES.Administrador]), usuarioController.deleteUsuario);

module.exports = router;