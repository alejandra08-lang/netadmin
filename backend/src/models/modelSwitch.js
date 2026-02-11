const db = require('../config/db');

const Switch = {

    crear_switch: async (datos) => {
        const { swt_direccion_ip, swt_hostname, swt_modelo } = datos;

        const query = `
        INSERT INTO switch (
        swt_direccion_IP,
        swt_hostname,
        swt_modelo
        ) VALUES ($1, $2, $3) RETURNING *
        `;

        const values = [swt_direccion_ip, swt_hostname, swt_modelo];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    //enlistar switch
        obtener_switches: async () => {
        const query = `
        SELECT * FROM switch ORDER by swt_hostname`;
        const { rows } = await db.query(query);
        return rows;
    },

    //enlistar por direccion ip
    obtener_swicth_ip : async (swt_direccion_ip) => {
        const query = `
            SELECT * FROM switch WHERE LOWER(swt_direccion_ip) = LOWER($1);
        `;
        const {rows} = await db.query(query, swt_direccion_ip);
        return rows;
    },

    eliminar_switch: async (id) => {
        const query = 'DELETE FROM switch WHERE ID_switch = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = Switch;