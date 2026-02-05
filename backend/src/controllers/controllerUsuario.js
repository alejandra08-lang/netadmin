const bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/modelUsuario.js');
const HistorialSistema = require('../models/modelHistorialsistema.js');
const Tiposaccion = require('../config/Tiposaccion.js');
const Credencialesmodel = require('../models/modelCredenciales');

exports.createUsuario = async (req, res) => {
    try {

        //ip del usuario
        const ip =
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress;

        const { usu_nombre, 
                usu_apellido, 
                usu_correo, 
                usu_telefono, 
                usu_contrasena,
                id_rol, 
                id_campana 
            } = req.body;

        if (!usu_nombre || !usu_correo || !id_rol || !id_campana ||!usu_contrasena) {
            return res.status(400).json({ 
                message: 'usu_nombre, usu_correo, id_rol e id_campana son obligatorios' 
            });
        }

        const usuario = await UsuarioModel.create({ 
            usu_nombre, 
            usu_apellido, 
            usu_correo, 
            usu_telefono, 
            id_rol,
            id_campana
        });

        //hashear contraseña

        const hash = await bcrypt.hash(usu_contrasena, 10);

        //Registrar credenciales
        await Credencialesmodel.create({
            id_usuario: usuario.id_usuario,
            usu_contrasena: hash
        });

        // Registrar historial
        await HistorialSistema.create({
            his_accion: 'crear_usuario',
            id_usuario: req.usuario.id_usuario, 
            id_campana: id_campana,
            id_tipo_accion: Tiposaccion.CREAR_USUARIO,
            his_descripcion: `Usuario ${usuario.usu_nombre} ${usuario.usu_apellido} creado`,
            his_ip: ip
        });

        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({message: 'Error al listar los usuarios'});
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json(error);
    }
};

//actualizar datos

exports.updateUsuario = async (req, res) => {

    const ip =
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress;
    try {
        const usuario = await UsuarioModel.update(req.params.id, req.body);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        // Registrar auditoría
        await HistorialSistema.create({
            id_usuario: req.usuario.id_usuario,
            his_accion: `Actualización datos del usuario ${usuario.usu_nombre}`,
            id_tipo_accion: Tiposaccion.CAMBIARON_DATOS_USUARIO,
            id_campana: usuario.id_campana,
            his_ip: ip
        });

        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar usuario',
            error: error.message
        });
    }
};

//cambiar contraseña para usuarios

exports.cambioContraseña = async (req, res) => {
    try {
        const {id_usuario} = req.params;
        const { nueva_contrasena} = req.body;
        
        if(!nueva_contrasena){
            return res.status(400).json({ message: 'La nueva contraseña es obligatoria'});
        }

        //1, obtener usuario
        const usuario = await UsuarioModel.findById(id_usuario);
        if(!usuario){
            return res.status(404).json({message: 'Usuarios no encontrado'});
        }

        //2. Hashear nueva contraseña
        const hash = await bcrypt.hash(nueva_contrasena, 10);

        //3. Actualizar contraseña
        await UsuarioModel.updatePassword(id_usuario, hash);

        //4. Registrar historial
        await HistorialSistema.create({
            id_usuario: req.usuario.id_usuario, //el administrador ejecuta
            his_accion: `Se ha cambiado la contraseña al usuario ${usuario.usu_nombre}`,
            id_tipo_accion: Tiposaccion.CAMBIO_DE_CONTRASENA,
            id_campana: usuario.id_campana
        });

        res.json({message: 'Contraseña actualizada correctamente'});

    } catch (error){
        console.error(error);
        res.status(500).json({message: error.message});

    }

};

//eliminar datos
exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        await UsuarioModel.delete(req.params.id);

        // Registrar auditoría
        await HistorialSistema.create({
            his_accion: 'eliminar_usuario',
            id_usuario: req.usuario.id_usuario,
            id_campana: null, //editar
            his_descripcion: `Usuario ${usuario.usu_nombre} ${usuario.usu_apellido} eliminado`
        });

        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json(error);
    }
};
