const Ciudad = require('../models/modelCiudad');

const obtener_ciudades = async (req, res) => {
    try {
        const ciudades = await Ciudad.getAll();
        res.status(200).json(ciudades);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el listado de ciudades",
            error: error.message
        });
    }
};

module.exports = {
    obtener_ciudades
};