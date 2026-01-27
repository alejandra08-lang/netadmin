const site = require ('../models/modelSite.js');

const obtener_todos_site = async (req, res) => {
    try {
        const sites = await site.obtener_todos_site();
        res.status(200).json(sites);
    } catch (error){
        res.status(500).json({
            message: "Error al obtener los sitios físicos",
            error: error.message
        });
    }
};

const crear_site = async (req, res) => {
    const { sit_nombre, ID_ubicacion} = req.body;

    if(!sit_nombre || !ID_ubicacion){
        return res.status(400).json({
            message: "Faltan datos obligatorios: Nombre o ubicacion"
        });
    }
    try{
        const nuevoSite = await site.crear_site(sit_nombre, ID_ubicacion);
        res.Status(201).json({
            message: "Sitio creado correctamente",
            data: nuevoSite
        });
    }

    catch (error) {
        if (error.code === '23505'){
            return res.status(409).json({
                message: "conflicto: Ya existe un site con este nombre en esta ubicacion."
            });
        }
        res.status(500).json({
            message: "Error al creaar el site",
            error: error.message
        });
    }
};

const eliminar_site = async (req, res ) => {
    const {id} = req.params;
    try {
        const eliminar_site = await  site.delete(id);

        if(!eliminar_site) {
            return res.status(404).json({message: "La site no existe."});
        }

        res.json({ message: "Sitio eliminado corecctamente", date: eliminar_site});
    }catch (error){
        if (error.code === '23503'){
            return res.status(400).json({
                message: "No se puede eliminar: Este sitio tiene campañas o historiales asociados."
            });
        }
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    obtener_todos_site,
    crear_site,
    eliminar_site};