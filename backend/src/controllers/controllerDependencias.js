const Dependencias = require('../models/modelDependencias');

const obtener_dependencias = async (req, res) => {
    try {
        const lista = await Dependencias.obtener_dependencias();
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el análisis de impacto",
            error: error.message
        });
    }
}; 

const crear_dependencia = async (req, res) => {
    const { dpo_dependencias, dpo_impacto, dpo_nivel_impacto, dpo_congenitas} = req.body;

    if (!dpo_dependencias ||!dpo_impacto ||!dpo_nivel_impacto || !dpo_congenitas) {
        return res.status(400).json({
            message: "El nivel de impacto y la descripcion de dependencias son obligatorios. "
        });
    }

    try {
        const nuevaDep = await Dependencias.crear_dependencia(req.body);
        res.status(201).json({
            message: "Analisis de impacto creado con éxito",
            data: nuevaDep
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}; 

const editar_dependencia = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizada = await Dependencias.editar_dependencia(id, req.body);

        if (!actualizada) {
            return res.status(404).json({ message: "Registro de impacto no encontrado."});
        }

        res.json({
            message: "Analisis de impacto actualizado correctamente",
            data: actualizada
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminar_dependencia = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminada = await Dependencias.eliminar_dependencia(id);
        res.json({
            message: "Registro de impacto eliminado",
            data: eliminada
        });
    } catch (error) {
        if (error.message.includes('Hoja de Vida activa')) {
            return res.status(403).json({
                message: "No se puede eliminar: Hay equipos con Hoja de Vida que dependen de esta clasificacion de impacto."
            });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtener_dependencias,
    crear_dependencia,
    editar_dependencia,
    eliminar_dependencia
};