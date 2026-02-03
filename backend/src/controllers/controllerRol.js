const Rolcontroller = require ('../models/modelRol');

exports.createRol = async (req, res) => {
    try {
        const {rol_nombre} = req.body;
        const rol = await Rolcontroller.create(rol_nombre);
        res.status(201).json(rol);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Rolcontroller.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getRolbyId = async (req, res) => {
    try {
        const rol = await Rolcontroller.findById(req.params.id);
        res.json(rol);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateRol = async (req, res) => {
    try {
        const {rol_nombre } = req.body;
        const rol = await Rolcontroller.update(req.params.id, rol_nombre);
        res.json(rol);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteRol = async (req, res) => {
    try {
        await Rolcontroller.delete(req.params.id);
        res.json({message: 'Rol eliminado correctamente.'});
    } catch (error){
        res.status(500).json({
            message: 'No se puede eliminar este rol debido a que está en uso.'
        });
    }
};