const db = require('../config/db');

const Departamento = {
    obtener_departamentos: async () => {
        const query ='SELECT * FROM departamento ORDER BY dep_nombre ASC';
        const {rows} = await db.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = `
        SELECT d.dep_nombre, c.ciu_nombre
        FROM departamento d
        LEFT JOIN ciudad c ON d.ID_departamento = c.ID_departamento
        WHERE d.ID_departamento = &1

        `;
        const {rows} = await db.query(query, [id]);
        return rows;
    }
};

module.exports = Departamento;