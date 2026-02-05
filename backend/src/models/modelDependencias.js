const db = require('../config/db');

const DependenciasImpacto = {
    obtener_dependencias: async () => {
        const query = 'SELECT * FROM dependencia_impacto ORDER BY dpo_nivel_impacto DESC';
        const { rows } = await db.query(query);
        return rows;
    },

    crear_dependencia: async (datos) => {
        const { dpo_dependencias, dpo_impacto, dpo_nivel_impacto, dpo_congenitas } = datos;
        const query = `
        INSERT INTO dependencia_impacto (
        dpo_dependencias, 
        dpo_impacto,
        dpo_nivel_impacto,
        dpo_congenitas
        ) VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const values = [dpo_dependencias, dpo_impacto, dpo_nivel_impacto, dpo_congenitas];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    editar_dependencia: async (id,datos) => {
        const { dpo_dependencias, dpo_impacto, dpo_nivel_impacto, dpo_congenitas} = datos;
        const query = `
        UPDATE dependencia_impacto
        SET dpo_dependencias = $1, dpo_impacto = $2, dpo_nivel_impacto = $3, dpo_congenitas = $4
        WHERE ID_dependencia_impacto = $5
        RETURNING *
        `;

        const values = [dpo_dependencias, dpo_impacto, dpo_nivel_impacto, dpo_congenitas, id];
        const { rows } =await db.query(query, values);
        return rows[0];
    },

    eliminar_dependencia: async (id) => {
        const query = 'DELETE FROM dependencia_impacto WHERE ID_dependencia_impacto = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = DependenciasImpacto;