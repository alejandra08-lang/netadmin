const Equipo = require ('../models/modelEquipos');

const obtener_equipos = async (req, res) => {
    try {
        const equipos = await Equipo.obtener_equipos();
        res.status(200).json(equipos);
    }catch (error) {
        res.status(500).json({
            message: "Error al obtener el inventario de equipos",
            error: error.message
        });
    }
};

const crear_equipo = async (req, res) => {
    const { eqp_version, eqp_nombre_host, eqp_tipo_equipo, eqp_en_linea, eqp_fecha_registro, eqp_modelo, eqp_marca, eqp_estructura, id_campana, id_hoja_de_vida} = req.body;
    if (!eqp_version || !eqp_nombre_host || !eqp_tipo_equipo ||!eqp_en_linea ||!eqp_fecha_registro ||!eqp_modelo ||!eqp_marca ||!eqp_estructura ||!id_campana ||!id_hoja_de_vida) {
        return res.status(400).json({message: "Faltan datos criticos para el registro fisico."});
    }

    try {
        const nuevoEquipo = await Equipo.crear_equipo(req.body);
        res.status(201).json({ message: "Equipo registrado con 'exito", data: nuevoEquipo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editar_equipo = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizado = await Equipo.editar_equipo(id, req.body);
        if (!actualizado) return res.status(400).json({ message: "Equipo no encontrado." });

        res.json({ message: "Informacion de hardware actualizada", data: actualizado});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminar_equipo = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Equipo.eliminar_equipo(id);
        res.json({ message: "Equipo retirado del inventario", data: eliminado });
    } catch (error) {
        if (error.message.includes('Hoja de Vida')) {
            return res.status(403).json({
                message: "Operacion rechazada: El equipo esta documentado en una Hoja de Vida y no puede eliminarse. "
            });
        }
        res.status(500).json({ error: error.massage});
    }
};

module.exports = { 
    obtener_equipos,
    crear_equipo,
    editar_equipo,
    eliminar_equipo
};