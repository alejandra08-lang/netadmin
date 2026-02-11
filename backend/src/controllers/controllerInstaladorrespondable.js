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

exports.findAllPaginated = async (req, res ) => {
    try {
        const {
            page = $1,
            limit = 10,
            int_nombre,
            inr_telefono,
            id_proveedor
        } = req.query;

        const pageNum = Math.max(parseInt(page), 1);
        const limitNum= Math.min(parseInt(limit), 50);
        const offset = (pageNum - 1) * limitNum;

        const {data, total} =
        await Instaladorresponsablemodel.findAll({
            int_nombre,
            inr_telefono,
            id_proveedor,
            limit: limitNum,
            offset
        });

        res.json({
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum),
            data
        });
    } catch (error) {
        console.error('Error al listar a los instaladores:', error);
        res.status(500).json({
            message: 'Error al obtener instaladores responsables',
            error: error.message
        });
    }
};

//listar todos
exports.getAllInstalador = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            nombre,
            activo
        } = req.query;

        const offset = (page - 1) * limit;

        const data = await Instaladorresponsablemodel.findAll({
            nombre,
            activo,
            limit: Number(limit),
            offset
        });

        res.json({
            page: Number(page),
            limit: Number(limit),
            total: data.total,
            data: data.rows
        });

    } catch (error) {
        console.error('Error al listar a los instaladores:', error);
        res.status(500).json({
            message: 'Error al listar a los instaladores',
            error: error.message
        });
    }
};

//buscar por nombre
exports.getinstaladorByname = async (req, res) => {
    try {

        const { inr_nombre } = req.params;
        const data = await Instaladorresponsablemodel.findNombre(inr_nombre);
        res.json(data);

    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

//actualizar

exports.updateInstaladores = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            message: 'ID inválido'
        });
    }

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            message: 'No se enviaron datos para actualizar'
        });
    }

    try {
        const instalador = await Instaladorresponsablemodel.updateById(id, data);

        if (!instalador) {
            return res.status(404).json({
                message: 'Instalador responsable no encontrado'
            });
        }

        res.json({
            message: 'Instalador actualizado correctamente',
            data: instalador
        });

    } catch (error) {
        console.error('Error al actualizar instalador:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
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