const HistorialSistema = require ('../models/modelHistorialsistema');

const registrarHistorial = async ({id_usuario, id_campana, accion, tipoAccion, his_ip}) => {
    return HistorialSistema.create({

        id_usuario,
        id_campana,
        his_accion: accion,
        id_tipo_accion: tipoAccion,
        his_ip

    });
};

module.exports = registrarHistorial;
