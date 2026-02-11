const Tiposaccion = require('../config/Tiposaccion');
const Equipo = require ('../models/modelEquipos');
const { stack } = require('../routes/routeEquipo');
const registrarHistorial = require('../utils/historialHelper');
const obtenerIp = require('../utils/ipHelper');

//crear equipo
const crear_equipo = async (req, res) => {
    const { eqp_version, eqp_nombre_host, eqp_tipo_equipo, eqp_en_linea, eqp_modelo, eqp_marca, eqp_estructura, id_campana, id_hoja_de_vida} = req.body;
    if (!eqp_version || !eqp_nombre_host || !eqp_tipo_equipo ||!eqp_en_linea ||!eqp_modelo ||!eqp_marca ||!eqp_estructura ||!id_campana ||!id_hoja_de_vida) {
        return res.status(400).json({message: "Faltan datos criticos para el registro fisico."});
    }

    try {
        const nuevoEquipo = await Equipo.crear_equipo(req.body);

        const ip = obtenerIp(req);
        await registrarHistorial({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            accion: 'Equipo creado correctamente',
            tipoAccion: Tiposaccion.CREACION_EQUIPO,
            his_ip: ip
        })

        res.status(201).json({ message: "Equipo registrado con 'exito", data: nuevoEquipo });
    } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
    }
};

//enlistar equipos
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

//obtener euqipo por marca
const obtener_equipo_marca = async (req, res) => {
    try {
        const marca = decodeURIComponent(req.params.eqp_marca);
        const data = await Equipo.obtener_equipo_marca(marca);

        if (data.length === 0) {
            return res.status(404).json({
                message: 'Equipo no encontrado'
            });
        }
        res.json(data);
    }catch (error){
        res.status(500).json({error: error.message});
    }
};

//obtener equipo por nombre host
const obtener_equipo_host = async (req, res) => {
    try{
        const host = decodeURIComponent(req.params.eqp_nombre_host);
        const data = await Equipo.obtener_equipo_host(host);

        if (data.length === 0){
            return res.status(404).json({
                message: 'Equipo no encontrado rectifique el nmbre del host'
            });
        }
        res.json(data);
    }catch (error){
        res.status(500).json({error: error.message});
    }
};

// obtener por tipo de equipo
const obtener_equipo_tipo = async (req, res) => {
    try{
        const tipo = decodeURIComponent(req.params.eqp_tipo_equipo);
        const data = await Equipo.obtener_equipo_tipo(tipo);

        if (data.length === 0){
            return res.status(404).json({
                message: 'Equipo no encontrado, por favor rectifique el tipo de quipo'
            });
        }

        res.json(data);
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

const editar_equipo = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizado = await Equipo.editar_equipo(id, req.body);
        if (!actualizado) return res.status(400).json({ message: "Equipo no encontrado." });

        const ip = obtenerIp(req);
        await registrarHistorial({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            accion: `Equipo actualizado ${id}`,
            tipoAccion: Tiposaccion.ACTUALIZAR_EQUIPO,
            his_ip: ip
        });

        res.json({ message: "Informacion de hardware actualizada", data: actualizado});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminar_equipo = async (req, res) => {
    const { id_equipos } = req.params;
    try {
        const eliminado = await Equipo.eliminar_equipo(id_equipos);

        const ip = obtenerIp(req);
        await registrarHistorial({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            accion: `Se Eliminó un equipo ${id}`,
            tipoAccion: Tiposaccion.ELIMINAR_EQUIPO,
            his_ip: ip
        });

        res.json({ message: "Equipo retirado del sistema", data: eliminado });
    } catch (error) {
        if (error.message.includes('Hoja de Vida')) {
            return res.status(403).json({
                message: "Operacion rechazada: El equipo esta documentado en una Hoja de Vida y no puede eliminarse. "
            });
        }
        res.status(500).json({ error: error.message});
    }
};

module.exports = { 
    obtener_equipos,
    crear_equipo,
    editar_equipo,
    eliminar_equipo,
    obtener_equipo_marca,
    obtener_equipo_host,
    obtener_equipo_tipo
};