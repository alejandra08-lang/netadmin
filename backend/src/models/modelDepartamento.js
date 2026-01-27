const db = require('../confing/db');

const Departamento = {
    getAll: async () => {
        const query ='SELECT * FROM departamentos ORDER BY dep_nombre ASC';
        const {rows} = await db.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = `
        SELECT d.dep_nombre, c.ciu_nombre
        FROM departamentos d
        LEFT JOIN ciudad c ON d.ID_departamento = c.ID_departamento
        WHERE d.ID_departamento = &1

        `;
        const {rows} = await db.query(query, [id]);
        return rows;
    }
};

module.exports = Departamento;