const db = require('../config/db');

const site = {
    obtener_todos_site: async () =>{
        const query = 
        `
            SELECT s.id_site, s.sit_nombre, u.ubi_barrio, c.ciu_nombre
            FROM site s
            JOIN ubicacion u ON s.id_ubicacion = u.id_ubicacion
            JOIN ciudad c ON u.id_ciudad = c.id_ciudad
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    crear_site: async (sit_nombre, id_ubicacion) => {
        const query = 
        `
            INSERT INTO site(sit_nombre, id_ubicacion) 
            values ($1, $2) RETURNING *
        `;
        const {rows} = await db.query(query, [sit_nombre, id_ubicacion]);
        return rows[0];
    },

    eliminar_site: async (id) => {
        const query = 'Delete FROM site WHERE id_site = $1 RETURNING *';
        const {rows} = await db.query(query, [id]);
        return rows[0];
    }
};
module.exports = site;