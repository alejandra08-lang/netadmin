const db = require('../config/db');
const { obtener_caracteristicas, crear_caracteristicas, editar_caracteristicas, eliminar_caracteristicas } = require('../controllers/controllerCaracteristicasTecnicas');

const CaracteristicasTecnicas = {
    obtener_caracteristicas: async () => {
        const query = `
        SELECT crt.*,
        di.dpo_nivel_impacto, 
        di.dpo_dependencias
        FROM  caracteristicas_tecnicas crt
        LEFT JOIN dependencia_impacto di ON crt.Id_dependencia_impacto = di.ID_dependencia_impacto
        ORDER BY crt.ID_caracteristicas_tecnicas DESC
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    crear_caracteristicas: async (datos) => {
        const {
            crt_procesador, 
            crt_memoria_nvra, 
            crt_version_firmware,
            crt_sistema_operativo, 
            crt_respaldo, 
            crt_funciones, 
            id_dependencia_impacto
        } = datos;

        const query = `
        INSERT INTO caracteristicas_tecnicas (
        crt_procesador, 
        crt_memoria_nvra,
        crt_version_firmware,
        crt_sistema_operativo,
        crt_respaldo, 
        crt_funciones,
        id_dependencia_impacto
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `;

        const values = [
            crt_procesador, 
            crt_memoria_nvra, 
            crt_version_firmware, 
            crt_sistema_operativo, 
            crt_respaldo, 
            crt_funciones, 
            id_dependencia_impacto
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },

    editar_caracteristicas: async (id, datos) => {
        const {
            crt_procesador, 
            crt_memoria_nvra, 
            crt_version_firmware,
            crt_sistema_operativo, 
            crt_respaldo, 
            crt_funciones, 
            id_dependencia_impacto
        } = datos;

        const query = `
        UPDATE caracteristicas_tecnicas
        SET crt_procesador = $1, crt_memoria_nvra = $2, crt_version_firmware = $3,
        crt_sistema_operativo = $4, crt_respaldo = $5, crt_funciones = $6,
        Id_dependencia_impacto = $7
        WHERE ID_caracteristicas_tecnicas = $8
        RETURNING *
        `;

        const values = [
            crt_procesador, 
            crt_memoria_nvra, 
            crt_version_firmware,
            crt_sistema_operativo, 
            crt_respaldo, 
            crt_funciones, 
            id_dependencia_impacto, id
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },

    eliminar_caracteristicas: async (id) => {
        const checkHojaVida = 'SELECT * FROM hoja_de_vida WHERE ID_caracteristicas_tecnicas = $1';
        const {rows: hdv } = await db.query(checkHojaVida, [id]);

        if (hdv.length > 0) {
            throw new Error('No se puedeb eliminar: Estas caracteristicas tecnicas estan vinculadas a una Hoja de Vida activa. ');
        }

        const query = 'DELETE FROM caracteristicas_tecnicas WHERE ID_caracteristicas_tecnicas = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports =    CaracteristicasTecnicas;