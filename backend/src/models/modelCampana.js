const db = require('../config/db');

const Campana = {
    obtener_campanas: async () => {
        const query = `
        SELECT c.*, s.sit_nombre
        FROM campana c
        JOIN site s ON c.Id_site = s.ID_site
        ORDER BY c.cam_nombre_campana ASC
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    crear_campana: async (nombre_campana, id_site) => {
        const query = `
        INSERT INTO campana (cam_nombre_campana, id_site)
        VALUES ($1, $2) RETURNING *
        `;
        const { rows } = await db.query(query, [nombre_campana, id_site]);
        return rows[0];
    }, 

    editar_campana: async (id, datos) => {
        const {cam_nombre_campana, id_site} = datos;
        const query = `
        UPDATE campana
        SET cam_nombre_campana = $1, Id_site= $2
        WHERE ID_campana = $3
        RETURNING *
        `;
        const { rows } = await db.query(query, [cam_nombre_campana, id_site, id ]);
        return rows[0];
    },

    eliminar_campana: async (id) => {
        const checkEquipos = 'SELECT * FROM equipos WHERE id_campana = $1 ';
        const { rows: equipos } = await db.query(checkEquipos, [id]);

        if (equipos.length > 0) {
            throw new Error('No se puede eliminar: La campaña tiene equipos de red asignados ');
        }

        const query = 'DELETE FROM campana WHERE id_campana = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

};

module.exports = Campana;