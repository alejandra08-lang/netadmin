const db = require('../config/db');
const { obtener_equipos, crear_equipo, editar_equipo, eliminar_equipo } = require('../controllers/controllerEquipos');

const Equipo = {
    obtener_equipos: async () => {
        const query = `
        SELECT e.*, c.cam_nombre_campana, s.sit_nombre
        FROM equipos e
        JOIN campana c ON e.ID_campana = c.ID_campana
        JOIN site s ON c.Id_site = s.ID_site
        ORDER BY e.eqp_fecha_registro DESC
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    crear_equipo: async (datos) => {
        const{
            eqp_version, eqp_nombre_host, eqp_tipo_equipo, eqp_en_linea, eqp_fecha_registro,
            eqp_modelo, eqp_marca, eqp_estructura, id_campana
        } = datos;

        const query = `
        INSERT INTO equipos(
        eqp_version, 
        eqp_nombre_host, 
        eqp_tipo_equipo, 
        eqp_en_linea, 
        eqp_fecha_registro, 
        eqp_modelo, 
        eqp_marca,
        eqp_estructura, 
        ID_campana
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `;

        const values = [
            eqp_version, eqp_nombre_host, eqp_tipo_equipo, eqp_en_linea, eqp_fecha_registro,
            eqp_modelo, eqp_marca, eqp_estructura, id_campana
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },

    editar_equipo: async (id, datos) => {
        const {
            eqp_version, eqp_nombre_host, eqp_tipo_equipo, eqp_en_linea, eqp_fecha_registro,
            eqp_modelo, eqp_marca, eqp_estructura, id_campana
        } = datos;

        const query = `
        UPDATE equipos
        SET eqp_version = $1, eqp_nombre_host = $2, eqp_tipo_equipo = $3,
        eqp_en_linea = $4, eqp_fecha_registro = $5, eqp_modelo = $6, eqp_marca = $7,
        eqp_estructura = $8, ID_campana = $9
        WHERE ID_equipos = $10
        RETURNING *
        `;
        const values = [
            eqp_version, 
            eqp_nombre_host, 
            eqp_tipo_equipo, 
            eqp_en_linea, 
            eqp_fecha_registro, 
            eqp_modelo, 
            eqp_marca, 
            eqp_estructura, 
            id_campana, id
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    eliminar_equipo: async (id) => {
        const checkHojaVida = 'SELECT * FROM hoja_de_vida WHERE ID_equipos = $1';
        const { rows: hoja } = await db.query(checkHojaVida, [id]);

        if (hoja.length > 0) {
            throw new Error('No se puede eliminar: El equipo tiene una Hoja de Vida técnica activa.');
        }

        const query = 'DELETE FROM equipos WHERE ID_equipos = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = Equipo;