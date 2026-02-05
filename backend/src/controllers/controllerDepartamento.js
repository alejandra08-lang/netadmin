const Departamento = require('../models/modelDepartamento');

const obtener_departamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.obtener_departamentos();
        res.status(200).json(departamentos);
    }catch (error) {
        res.status(500).json({
            message: "Error al obtener la lista de departamentos",
            error: error.message
        });
    }
};

module.exports = {
    obtener_departamentos
}