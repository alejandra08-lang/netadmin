const Ubicacion = require('../models/modelUbicacion');

const obtener_ubicaciones = async (req, res) => {
    try { 
        const ubicaciones = await Ubicacion.getAll();
        res.status(200).json(ubicaciones);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el listado de ubicaciones",
            error: error.message
        });
    }
};

const crear_ubicacion = async (req, res) => {
    console.log(req.body);

    const { ubi_barrio, 
        ubi_localidad_municipio, 
        ubi_tipo_via, 
        ubi_numero, 
        id_ciudad 
    } = req.body;

    if (!ubi_barrio || !ubi_localidad_municipio ||!ubi_tipo_via ||!id_ciudad) {
        return res.status(400).json({
            message: "Faltan campos obligatorios de ubicacion."
        });
    }

    try { 
        const nuevaUbi = await Ubicacion.create({ 
            ubi_barrio, 
            ubi_localidad_municipio,
            ubi_tipo_via, 
            ubi_numero, 
            id_ciudad 
        });

        res.status(201).json ({
            message: "Ubicación creada exitosamente",
            data: nuevaUbi
        });
    } catch (error) {

        if (error.code === '23503') {
            return res.status(400).json({ message: "La ciudad especificada no existe. "});
        }
        res.status(500).json({ error: error.message});
    }
};

const eliminar_ubicacion = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminada = await Ubicacion.delete(id);

        if (!eliminada) {
            return res.status(400).json({message: "La ubicación no existe,"});
        }
        
        res.json({ message: "Ubicacion eliminada correctamente", data: eliminada });
    }catch (error) {
        if (error.message.includes('Site de red activo')) {
            return res.status(403).json({
                message: "Operacion denegada: No puedes borrar una ubicacion que tiene un Site (edificio) asignado. "
            });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtener_ubicaciones,
    crear_ubicacion,
    eliminar_ubicacion
};