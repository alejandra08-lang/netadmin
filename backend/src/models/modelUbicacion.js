const db = require('../config/db');
const { obtener_ubicaciones, eliminar_ubicacion } = require('../controllers/controllerUbicacion');

const Ubicacion = {
    obtener_ubicaciones: async () => {
        const query = `
        SELECT u.*, c.ciu_nombre
        FROM ubicacion u
        JOIN ciudad c ON u.ID_ciudad = c.ID_ciudad
        ORDER BY u.ubi_barrio ASC
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    crear_ubicacion: async (datos) => {
        const { 
            ubi_barrio, 
            ubi_localidad_municipio, 
            ubi_tipo_via, 
            ubi_numero, 
            id_ciudad
        } = datos;

        const query = `
        INSERT INTO ubicacion (
        ubi_barrio,
        ubi_localidad_municipio,
        ubi_tipo_via,
        ubi_numero,
        id_ciudad
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;

        const values = [
            ubi_barrio, 
            ubi_localidad_municipio, 
            ubi_tipo_via, 
            ubi_numero, 
            id_ciudad];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    eliminar_ubicacion: async (id) => {
        const checkSite = 'SELECT * FROM site WHERE ID_ubicacion = $1 ';
        const { rows: sites } = await db.query(checkSite, [id]);

        if (sites.length > 0) {
            throw new Error('No se puede eliminar: Esta ubicacion tiene un Site de red activo asignado.');
        }

        const query = 'DELETE FROM ubicacion WHERE ID_ubicacion = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};
module.exports = Ubicacion;