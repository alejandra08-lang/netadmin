const Tiposaccion = require('../config/Tiposaccion');
const HojaDeVida = require('../models/modelHoja_vida');
const registrarHistorial = require('../utils/historialHelper');
const obtenerIp = require('../utils/ipHelper');

exports.crearHojaDeVida = async (req, res) => {

    const {
        hdv_activo,
        hdv_disponibilidad,
        id_switch,
        id_caracteristicas_tecnicas,
        id_campana,
        id_proveedor
    } = req.body;

    if (
        !hdv_activo ||!hdv_disponibilidad ||!id_switch ||!id_caracteristicas_tecnicas ||!id_campana ||!id_proveedor
    ){
        return res.status(400).json({
            message: 'Faltan datos obligatorios para crear la hoja de vida'
        });
    }

    try {
        const switchExiste = await HojaDeVida.existeSwitch(id_switch);
        if (switchExiste){
            return res.status(409).json({
                message: 'El switch ya está asociado a una hoja de vida'
            });
        }

        const caractetisitcasExistentes =
            await HojaDeVida.existeCaracteristicas(id_caracteristicas_tecnicas);

        if (caractetisitcasExistentes) {
            return res.status(409).json({
                message: 'Estas caracteristicas tecnicas ya estan asociadas a una hoja de vida'
            });
        }

        const data = await HojaDeVida.crearHojaDeVida ({
            hdv_activo,
            hdv_disponibilidad,
            id_switch,
            id_caracteristicas_tecnicas,
            id_campana,
            id_proveedor,
            id_usuario: req.usuario.id_usuario
        });

        const ip = obtenerIp(req);
        await registrarHistorial({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            accion: 'Hoja de vida creada',
            tipoAccion: Tiposaccion.CREACION_HOJA_VIDA,
            his_ip: ip
        })

        res.status(201).json({
            message: 'Hoja de vida creada correctamente',
            data
        });

        
    } catch (error){
        res.status(500).json({
            error: error.message
        });
    }
    
};

exports.obtenerHojaDeVida = async (req, res) => {
    try {
        const hojas = await HojaDeVida.obtenerTodasHojas();
        res.json(hojas);
    }catch (error){
        res.status(500).json({error: error.message});
    }
};

exports.obternerHojaDeVidaPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const hoja = await HojaDeVida.obtenerHojasPorId(id);

        if (!hoja){
            return res.status(404).json({
                message: 'Hoja de vida no encontrada'
            });
        }
        res.json(hoja);
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

exports.actualizarHojaDeVida = async (req, res ) => {

    const ip = (req) =>
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket.remoteAddress ||
    null;

    try {
        const {id} = req.params;

        const {
            hdv_activo,
            hdv_disponibilidad,
            id_campana,
            id_proveedor
        } = req.body;

        const resultado = await HojaDeVida.actualizarHojaDeVida(id, {
            hdv_activo,
            hdv_disponibilidad,
            id_campana,
            id_proveedor
        });

        if(!resultado){
            return res.status(404).json({
                message: 'Hoja de vida no encontrada'
            });
        }

        await registrarHistorial({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            accion: 'Se Actualizó hoja de vida',
            tipoAccion: Tiposaccion.ACTUALIZAR_HOJA_DE_VIDA,
            his_ip: ip
        });

        res.json({
            message: 'Hoja de vida actualizada correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}; 

exports.eliminarHojaDeVida = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const resultado = await HojaDeVida.desactivarHojaDeVida (id);

        if (!resultado) {
            return res.status(404).json({
                message: 'Hoja de vida no encontrada'
            });
        }
        const ip = obtenerIp(req);
        await registrarHistorial({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            accion: 'Se desactivo una hoja de vida',
            tipoAccion: Tiposaccion.DESACTIVAR_HOJA_DE_VIDA,
            his_ip: ip
        });

        res.json({
            message: 'Hoja de vida desactivada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};