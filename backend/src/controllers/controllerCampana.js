const Campana = require('../models/modelCampana');

const obtener_campanas = async (req, res) => {
    try {
        const campanas = await Campana.obtener_campanas();
        res.status(200).json(campanas);
    } catch (error) {
        res.status(500).json({
            message:"Error al obtener las campañas fisicas",
            error: error.message
        });
    }
};

const crear_campana = async (req, res) => {
    const { cam_nombre_campana, id_site } = req.body;

    if (!cam_nombre_campana || !id_site){
        return res.status(400).json({
            message: "Nombre de campaña e Id_site son obligatorios."
        });
    }

    try {
        const nuevaCampana = await Campana.crear_campana(cam_nombre_campana, id_site);
        res.status(201).json({
            message: "Campaña creada con éxito",
            data: nuevaCampana
        });
    }catch (error) {
        if (error.code == '23503') {
            return res.status(400).json({ message: "El site especificado no existe. "});
        }
        res.status(500).json({ error:message });
    }
};

const editar_campana = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizada = await Campana.editar_campana(id, req.body);

        if (!actualizada) {
            return res.status(400).json({ message: "Campaña no encontrada." });
        }

        res.json({
            message: "Campaña actualizada correctamente",
            data: actualizada
        });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminar_campana = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminada = await Campana.eliminar_campana(id);
        res.json({
            message: "Campaña eliminada del sistema",
            data: eliminada
        });
    }catch (error) {
        if (error.message.includes('equipos de red asignados')) {
            return res.status(403).json({
                message: "No se puede eliminar: Debes retirar o mover los equipos de esta campaña primero. "
            });
        }
        res.status(500).json({ error: error.message});
    }
};

module.exports = {
    obtener_campanas,
    crear_campana,
    editar_campana,
    eliminar_campana
};