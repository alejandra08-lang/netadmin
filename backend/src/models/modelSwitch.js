const db = require('../config/db');

const Switch = {
    obtener_switches: async () => {
        const query = `
        SELECT * FROM switch ORDER by swt_hostname`;
        const { rows } = await db.query(query);
        return rows;
    },

    crear_switch: async (datos) => {
        const { swt_direccion_ip, swt_hostname, swt_modelo } = datos;

        const query = `
        INSERT INTO switch (
        swt_direccion_IP,
        swt_hostname,
        swt_modelo,
        ) VALUES ($1, $2, $3) RETURNING *
        `;

        const values = [swt_direccion_ip, swt_hostname, swt_modelo];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    eliminar_switch: async (id) => {
        const query = 'DELETE FROM switch WHERE ID_switch = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = Switch;