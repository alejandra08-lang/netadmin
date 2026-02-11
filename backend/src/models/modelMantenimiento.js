const db = require('../config/db');
const Mantenimiento = {
    obtener_mantenimiento: async () => {
        const query = `
        SELECT m.*, u.usu_nombre, e.eqp_nombre_host
        FROM mantenimiento m 
        JOIN usuario u ON m.ID_usuario = u.ID_usuario
        JOIN hoja_de_vida h ON m.id_hoja_de_vida = h.id_hoja_de_vida
        JOIN equipos e ON h.ID_equipos = e.ID_equipos
        ORDER BY m.mto_fecha DESC
        `;
        const { rows } = await db.query(query);
        return rows;
    }, 

    crear_mantenimiento: async (datos) => {
        const {
            mto_tipo, 
            mto_descripcion, 
            mto_fecha, 
            id_hoja_de_vida, 
            id_usuario, 
            mto_responsable,
            mto_estado
        } = datos;

        const query = `
        INSERT INTO mantenimiento (
        mto_tipo,
        mto_descripcion, 
        mto_fecha,
        id_hoja_de_vida,
        id_usuario,
        mto_responsable,
        mto_estado
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `;

        const values = [
            mto_tipo,
            mto_descripcion, 
            mto_fecha, 
            id_hoja_de_vida, 
            id_usuario, 
            mto_responsable,
            mto_estado
        ];
        const { rows } = await db.query(query, values);
        return rows [0];
    },

    editar_mantenimiento: async (id, datos) => {
        const { 
            mto_tipo, 
            mto_descripcion, 
            mto_fecha, 
            id_hoja_de_vida, 
            id_usuario, 
            mto_responsable,
            mto_estado
        } = datos; 

        const query = `
        UPDATE mantenimiento
        SET mto_tipo = $1,
        mto_descripcion = $2, 
        mto_fecha = $3,
        id_hoja_de_vida = $4,
        id_usuario = $5,
        mto_responsable = $6,
        mto_estado = $7
        WHERE ID_mantenimiento = $8
        RETURNING *
        `;

        const values = [mto_tipo, mto_descripcion, mto_fecha,id_hoja_de_vida, id_usuario ,mto_responsable, mto_estado, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    cancelar_mantenimiento: async(id) => {

        const query = `
            UPDATE mantenimiento
            SET mto_estado = 'Cancelado'
            WHERE id_mantenimiento = $1
                AND mto_estado IN ('Agendado','Realizado', 'Pendiente')
            RETURNING *
        `;
        const {rows} = await db.query(query, [id]);
        return rows [0];
    }
};

module.exports = Mantenimiento;