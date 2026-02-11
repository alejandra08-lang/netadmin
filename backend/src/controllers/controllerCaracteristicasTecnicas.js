const CaracteristicasTecnicas = require('../models/modelCaracteristicasTecnicas');
const caracteristicas = require('../models/modelCaracteristicasTecnicas');

const obtener_caracteristicas = async (req, res) => {
    try {
        const lista = await caracteristicas.obtener_caracteristicas();
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las especificaciones tecnicas",
            error : error.message
        });
    }
};

const crear_caracteristicas = async (req, res) => {
    const {
        crt_procesador, 
        crt_memoria_nvra, 
        crt_version_firmware,
        crt_sistema_operativo, 
        crt_respaldo, 
        crt_funciones, 
        id_dependencia_impacto
    } = req.body;

    if(!crt_procesador || !crt_memoria_nvra || !crt_version_firmware || !crt_sistema_operativo || !crt_respaldo || !crt_funciones || !id_dependencia_impacto) {
        return res.status(400).json({
            message:"Faltan datos obligatorios: procesador, firmware e ID de impacto."
        });
    } 

    try {
        const nuevoCrt = await caracteristicas.crear_caracteristicas(req.body);
        res.status(201).json({
            message: "Perfil técnico creado exitosamente",
            data: nuevoCrt
        });
    }     catch (error) {
        if (error.code === '23503') {
            return res.status(400).json({ message: "El ID de dependencias de impacto no existe. "});
        }
        res.status(500).json({ error: error.message});
    }
};
    
const editar_caracteristicas = async (req, res) => {
    const { id } = req.params; 
    const data = req.body
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
        const instalador = await CaracteristicasTecnicas.editar_caracteristicas(id, data);

        if (!instalador) {
            return res.status(404).json({
                message: 'Cracteristicas tecnicas no encontradas'
            });
        }

        res.json({
            message: 'Cracteristicas tecnicas correctamente',
            data: instalador
        });

    } catch (error) {
        console.error('Error al actualizar Cracteristicas tecnicas:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

const eliminar_caracteristicas = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminada = await caracteristicas.eliminar_caracteristicas(id);
        res.json({
            message: "Perfil tecnico eliminado del sistema",
            data: eliminada
        });
    } catch (error) {
        if (error.message.includes('Hoja de Vida activa')) {
            return res.status(403).json({
                message: "No se puede eliminar: Este perfil tecnico esta siendo utilizado por un equipo en su Hoja de Vida,"
            });
        }
        res.status(500).json({ error: error.message});
    }
};

module.exports = {
    obtener_caracteristicas,
    crear_caracteristicas,
    editar_caracteristicas,
    eliminar_caracteristicas
};
