const pool = require('../config/db');

const HistorialSistemaModel = {

    async create(data) {
        const {
            id_usuario, 
            his_accion,
            id_tipo_accion,
            id_campana,
            his_ip
        } = data;

        const query = `
            INSERT INTO historial_sistema (
                id_usuario, 
                his_accion,
                his_fecha_hora,
                id_tipo_accion,
                id_campana,
                his_ip
            )
            VALUES ($1, $2, now(), $3, $4, $5)
             RETURNING *;
        `;

        const { rows } = await pool.query(query, [
            id_usuario, 
            his_accion,
            id_tipo_accion,
            id_campana,
            his_ip
        ]);

        return rows[0];
    },

    async findAll() {
        const query = `
        SELECT 
            h.id_historial_sistema,
            h.his_accion,
            h.his_fecha_hora,
            u.usu_nombre,
            u.usu_apellido,
            h.id_campana
        FROM historial_sistema h
        INNER JOIN usuario u ON h.id_usuario = u.id_usuario 
        ORDER BY h.his_fecha_hora DESC;
    `;
        const { rows } = await pool.query(query);
        return rows;
    },

    async findById(id) {
        const query = `
        SELECT * FROM historial_sistema
        WHERE id_historial_sistema = $1;
    `;

        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    async findByUsuario(id_usuario) {
        const query = `
        SELECT * FROM historial_sistema
        WHERE id_usuario = $1
        ORDER BY his_fecha_hora DESC;
    `;

        const { rows } = await pool.query(query, [id_usuario]);
        return rows;
    },

    async delete(id) {
        await pool.query(
            'DELETE FROM historial_sistema WHERE id_historial_sistema = $1',
            [id]
        );
    }
};

module.exports = HistorialSistemaModel;
