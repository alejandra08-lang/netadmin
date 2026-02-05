const Mantenimiento = require('../models/modelMantenimiento');

const obtener_mantenimiento = async (req, res) => {
    try {
        const mantenimientos = await Mantenimiento.obtener_mantenimiento();
        res.status(200).json(mantenimientos);
    }catch (error) {
        res.status(500).json({
            message: "Error al obtener el historial de mantenimiento",
            error: error.message
        });
    }
}; 

const crear_mantenimiento = async (req, res) => {
    const { 
        mto_tipo,
        mto_descripcion, 
        mto_fecha, 
        id_hoja_de_vida, 
        id_usuario, 
        mto_responsable
    } = req.body;

    if (!mto_tipo || !mto_descripcion || !mto_fecha || !id_hoja_de_vida ||!id_usuario ||!mto_responsable) {
        return res.status(400).json({
            messagee: "Faltan datos obligatorios: mto_tipo, mto_descripcion, mto_fecha, id_hoja_de_vida, id_usuario y mto_responsable. "
        });
    }

    try {
        const nuevoMto = await Mantenimiento.crear_mantenimiento({
            mto_tipo,
            mto_descripcion,
            mto_fecha,
            id_hoja_de_vida,
            id_usuario,
            mto_responsable
        });

        res.status(201).json({
            message: "Mantenimiento registrado exitosamente",
            data: nuevoMto
        });
    }catch (error) {
        if (error.code === '23503') {
            return res.status(400).json({
                message: "Error de referencia: El usuario o la hoja de vida no existen."
            });
        }
        res.status(500).json({ error: error.message});
    }
};

const editar_mantenimiento = async (req, res) => {
    const { id } = req.params;
    const { mto_tipo, mto_descripcion, mto_fecha, id_hoja_de_vida, id_usuario, mto_responsable } = req.body;

    try {
        const actualizado = await Mantenimiento.editar_mantenimiento(id, {mto_tipo, mto_descripcion, mto_fecha, id_hoja_de_vida, id_usuario, mto_responsable});

        if (!actualizado) {
            return res.status(400).json({ message: "Registro de mantenimiento no encontrado"});
        }

        res.json({
            message: "Registro de mantenimiento actualizado",
            data: actualizado
        });
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
};

module.exports = {
    obtener_mantenimiento,
    crear_mantenimiento,
    editar_mantenimiento
};