const db = require('../config/db');

const HojaDeVida = {

    //Crear
    crearHojaDeVida: async (data) => {
        const {
            hdv_activo,
            hdv_disponibilidad,
            id_switch,
            id_caracteristicas_tecnicas,
            id_campana,
            id_proveedor,
            id_usuario
        } = data;

        const query = `
            INSERT INTO hoja_de_vida (
                hdv_activo,
                hdv_disponibilidad,
                id_switch,
                id_caracteristicas_tecnicas,
                id_campana,
                id_proveedor,
                id_usuario
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

        const values = [
            hdv_activo,
            hdv_disponibilidad,
            id_switch,
            id_caracteristicas_tecnicas,
            id_campana,
            id_proveedor,
            id_usuario
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },

    existeSwitch: async (id_switch) => {
        const {rows} = await db.query(
            `SELECT 1 FROM hoja_de_vida WHERE id_switch = $1`,
            [id_switch]
        );
        return rows.length > 0;
    },

    existeCaracteristicas: async (id_caracteristicas_tecnicas) => {
        const { rows } = await db.query(
            `SELECT 1 FROM hoja_de_vida WHERE id_caracteristicas_tecnicas = $1`,
            [id_caracteristicas_tecnicas]
        );
        return rows.length > 0;
    },

    //Listar todos
    obtenerTodasHojas: async () => {
        const query = `
            SELECT *
            FROM hoja_de_vida
            ORDER BY id_hoja_de_vida DESC
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    // Encontrar por id
    obtenerHojasPorId: async (id) => {
        const query = `
            SELECT *
            FROM hoja_de_vida
            WHERE id_hoja_de_vida = $1
        `;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    // Actualizar editar
    actualizarHojaDeVida: async (id, data) => {
        const {
            hdv_activo,
            hdv_disponibilidad,
            id_campana,
            id_proveedor
        } = data;

        const query = `
            UPDATE hoja_de_vida
            SET
                hdv_activo = $1,
                hdv_disponibilidad = $2,
                id_campana = $3,
                id_proveedor = $4
            WHERE id_hoja_de_vida = $5
            RETURNING *
        `;

        const values = [
            hdv_activo,
            hdv_disponibilidad,
            id_campana,
            id_proveedor,
            id
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },

    // DELETE LÓGICO (DESACTIVAR)
    desactivarHojaDeVida: async (id) => {
        const query = `
            UPDATE hoja_de_vida
            SET hdv_activo = 'Garantia'
            WHERE id_hoja_de_vida = $1
            RETURNING *
        `;

        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = HojaDeVida;