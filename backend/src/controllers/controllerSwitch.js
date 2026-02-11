const Tiposaccion = require('../config/Tiposaccion');
const HistorialSistemaModel = require('../models/modelHistorialsistema');
const Switch = require('../models/modelSwitch');
const { stack } = require('../routes/routeEquipo');

const crear_switch = async (req, res) => {
    const { swt_direccion_ip, swt_hostname, swt_modelo} = req.body;

    if (!swt_direccion_ip || !swt_hostname || !swt_modelo) {
        return res.status(400).json({
            message: "Faltan datos: IP, Hostname son obligatorios."
        });
    }

    try {
        const nuevoSwitch = await Switch.crear_switch({
            swt_direccion_ip,
            swt_hostname,
            swt_modelo
        });
        res.status(201).json({
            message: "Switch registrado exitosamente",
            data: nuevoSwitch
        });
        
        await HistorialSistemaModel.create({
            id_usuario: req.usuario.id_usuario, 
            id_campana: id_campana,
            his_accion: 'Se ha creado una switch',
            his_descripcion: `Se ha creado un switch para la hoja de vida ${id_hoja_de_vida.id_hoja_de_vida}`
        });

    } catch (error) {
        if(error.code === '23503') {
            return res.status(400).json({
                message: "Error: El id_hoja_de_vida proporcionado no existe."
            });
        }
        res.status(500).json({ error: error.message });
    }
};

//obtener switch
const obtener_switches = async (req, res) => {
    try {
        const switches = await Switch.obtener_switches();
        res.status(200).json(switches);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el inventario de switches",
            error: error.message 
        });
    }
};

//obtener switch pot direccion ip
const obtener_swicth_ip = async(req, res) => {
    try{
        const ip = decodeURIComponent(req.params.swt_direccion_ip);
        const data = await Switch.obtener_swicth_ip(ip);

        if(data.length === 0) {
            return res.status(404).json({
                message: 'Switch no encontrada'
            });
        }
        res.json(data);
    }catch(error){
        res.status(500).json({error: error.message, stack: error.stack});
    }
};

const eliminar_switch = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Switch.eliminar_switch(id);

        if (!eliminado) {
            return res.status(400).json({ message: "El switch no existe."});
        }

        res.json({ message: " Switch eliminado correctamente", data: eliminado});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

module.exports = {
    obtener_switches,
    crear_switch,
    eliminar_switch,
    obtener_swicth_ip
};