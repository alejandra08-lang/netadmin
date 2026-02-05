const db = require('../config/db');
const { obtener_switches, crear_switch, eliminar_switch } = require('../controllers/controllerSwitch');

const Switch = {
    obtener_switches: async () => {
        const query = `
        SELECT s.*, h.hdv_activo, h.hdv_disponibilidad
        FROM switch s
        LEFT JOIN hoja_de_vida h ON s.id_hoja_de_vida = h.id_hoja_de_vida
        ORDER BY s.swt_hostname ASC
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    crear_switch: async (datos) => {
        const { swt_direccion_ip, swt_hostname, swt_modelo, id_hoja_de_vida } = datos;

        const query = `
        INSERT INTO switch (
        swt_direccion_IP,
        swt_hostname,
        swt_modelo,
        id_hoja_de_vida
        ) VALUES ($1, $2, $3, $4) RETURNING *
        `;

        const values = [swt_direccion_ip, swt_hostname, swt_modelo, id_hoja_de_vida];
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