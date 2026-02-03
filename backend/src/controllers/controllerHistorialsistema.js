const HistorialSistema = require('../models/modelHistorialsistema');
const TiposAccion = require('../config/Tiposaccion');
    
// Crear registro de historial
exports.create = async ({
    id_usuario,
    his_accion,
    id_campana,
    id_tipo_accion
}) => {
    return await HistorialSistema.create({
        id_usuario,
        his_accion,
        id_campana,
        id_tipo_accion
    });

};

// Obtener todo el historial
exports.getAll = async (req, res) => {
    console.log('el controller historial ha entrdo al chat epicamente');
    try {
        const data = await HistorialSistema.findAll();
        console.log('información;', data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

// Obtener por ID
exports.getById = async (req, res) => {
    try {
        const historial = await HistorialSistema.findById(req.params.id);

        if (!historial) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.json(historial);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Obtener historial por usuario
exports.getByUsuario = async (req, res) => {
    try {
        const data = await HistorialSistema.findByUsuario(req.params.id_usuario);
        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Eliminar registro (solo admin)
exports.delete = async (req, res) => {
    try {
        await HistorialSistema.delete(req.params.id);
        res.json({ message: 'Registro eliminado' });
    } catch (error) {
        res.status(500).json(error);
    }
};
