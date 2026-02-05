const Instaladorresponsablemodel = require('../models/modelsInstaladorresponsable');

exports.create = async (req, res) => {
    try {
        const { 
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        } = req.body;

        if (!inr_nombre || !inr_apellido || !inr_telefono   || !id_proveedor) {
            return res.status(400).json({
                message: 'inr_nombre, inr_apellido, inr_telefono, id_proveedor son datos obligatorios'
            });
        }

        const instalador_responsable = await Instaladorresponsablemodel.create({
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        });

        res.status(201).json(instalador_responsable);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

exports.getInstaladores = async (req, res ) => {
    try {
        const instalador_responsable = await Instaladorresponsablemodel.findAll();
        res.json(instalador_responsable);
    } catch (error){
        res.estatus(500).json({message: 'Error al tratar de listar a los instaladores responsable'});
    }
};

exports.getinstaladorByname = async (req, res) => {
    try {

        const { inr_nombre } = req.params;
        const data = await Instaladorresponsablemodel.findNombre(inr_nombre);
        res.json(data);

    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

exports.updateInstaladores = async (req, res) => {
    try {
        const instalador_responsable = await Instaladorresponsablemodel.updateInstaladores(req.params.id, req.id_proveedorbody);
        res.json(instalador_responsable);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const instalador_responsable = await Instaladorresponsablemodel.delete(req.params.id);
        if (!instalador_responsable) return res.status(404).json({ message: 'Instalador responsable no encontrado'});
        
        await instalador_responsable.delete(req.params.id);

        res.json({message: 'Instalador responsable eliminado correctamente'});
    } catch(error){
        res.status(500).json(error);
    }
};