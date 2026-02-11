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

    editar_dependencia: async (id_dependencia_impacto, data) => {
        const campos = [];
        const valores = [];
        let index = 1;

        if(data.dpo_dependencias !== undefined ){
            campos.push(`dpo_dependencias = $${index++}`);
            valores.push(data.dpo_dependencias);
        }

        if (data.dpo_impacto !== undefined) {
            campos.push(`dpo_impacto = $${index++}`);
            valores.push(data.dpo_impacto);
        }

        if (data.dpo_nivel_impacto !== undefined) {
            campos.push(`dpo_nivel_impacto = $${index++}`);
            valores.push(data.dpo_nivel_impacto);
        }

        if(data.dpo_congenitas !== undefined){
            campos.push(`dpo_congenitas =$${index++}`); 
            valores.push(data.dpo_congenitas);
        }

        if (campos.length === 0) return null;

        const query = `
            UPDATE dependencia_impacto
            SET ${campos.join(', ')}
            WHERE id_dependencia_impacto = $${index}
            RETURNING *;
        `;

        valores.push(id_dependencia_impacto);
        const {rows} = await db.query(query, valores);
        return rows[0];
    },

    eliminar_dependencia: async (id) => {
        const query = 'DELETE FROM dependencia_impacto WHERE ID_dependencia_impacto = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = DependenciasImpacto;