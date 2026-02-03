const bcrypt = require ('bcrypt');
const Credencialesmodel = require('../models/modelCredenciales.js');

//crear credenciales
exports.create = async (req, res) => {

    console.log(' BODY CREDENCIALES 👉', req.body);
    console.log(' CONTROLLER CREDENCIALES EJECUTADO');
    console.log(req.body);

    try {
        const {id_usuario, usu_contrasena} = req.body;

        //se encripta la contraseña

        const hash = await bcrypt.hash(usu_contrasena, 10);

        const nuevaCredenciales = await Credencialesmodel.create({
            id_usuario,
            usu_contrasena: hash
        });

        res.status(201).json({
            message: 'Credenciales creadas correctamente.',
            credencial: nuevaCredenciales
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//conseguir todo
exports.getAll = async (req, res) => {
    try {
        const data = await Credencialesmodel.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

//conseguir contrasena atravez del id
exports.getById = async (req, res) => {
    try {
        const data = await Credencialesmodel.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

//actualizar contrasena
exports.updatePassword = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.usu_contrasena, 10);

        await Credencialesmodel.updatePassword(
            req.params.id,
            hash
        );
        res.json({message: 'Contraseña actualizada correctamente'});
    }catch (error) {
        res.status(500).json(error);
    }
};

//eliminar credenciales
exports.delete = async (req, res) =>{
    try {
        await Credencialesmodel.delete(req.params.id);
        res.json({message: 'Credenciales eliminadas'});
    } catch (error){
        res.status(500).json(error);
    }
};