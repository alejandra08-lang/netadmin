const db = require('../config/db');
const { getAll } = require('./modelDepartamento');

const Ciudad = {
    getAll: async () => {
        const query = `
        SELECT c.ID_ciudad, c.ciu_nombre, d.dep_nombre
        FROM ciudad c
        JOIN departamento d ON c.ID_departamento = d.ID_departamento
        ORDER BY c.ciu_nombre ASC
        `;
        const { rows } = await db.query(query);
        return rows;
    }, 

    getByDepartamento: async (id_departamento) => {
        const query = 'SELECT * FROM ciudad WHERE ID_departamento = $1';
        const { rows } = await db.query(query, [id_departamento]);
        return rows;
    }

};

module.exports = Ciudad;