const Switch = require('../models/modelSwitch');

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

const crear_switch = async (req, res) => {
    const { swt_direccion_ip, swt_hostname, swt_modelo, id_hoja_de_vida} = req.body;

    if (!swt_direccion_ip || !swt_hostname || !swt_modelo || !id_hoja_de_vida) {
        return res.status(400).json({
            message: "Faltan datos: IP, Hostname e ID de Hoja de Vida son obligatorios."
        });
    }

    try {
        const nuevoSwitch = await Switch.crear_switch({
            swt_direccion_ip,
            swt_hostname,
            swt_modelo,
            id_hoja_de_vida
        });
        res.status(201).json({
            message: "Switch registrado exitosamente",
            data: nuevoSwitch
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
    eliminar_switch
};