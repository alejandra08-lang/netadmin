const db = require('../config/db');
const Equipo = {
    //crear equipo

    crear_equipo: async (datos) => {
        const{
            eqp_version, 
            eqp_nombre_host, 
            eqp_tipo_equipo, 
            eqp_en_linea, 
            eqp_modelo, 
            eqp_marca, 
            eqp_estructura, 
            id_campana, 
            id_hoja_de_vida
        } = datos;

        const query = `
        INSERT INTO equipos(
        eqp_version, 
        eqp_nombre_host, 
        eqp_tipo_equipo, 
        eqp_en_linea, 
        eqp_modelo, 
        eqp_marca,
        eqp_estructura, 
        ID_campana,
        ID_hoja_de_vida
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `;

        const values = [
            eqp_version, eqp_nombre_host, eqp_tipo_equipo, eqp_en_linea,
            eqp_modelo, eqp_marca, eqp_estructura, id_campana, id_hoja_de_vida
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },

    editar_equipo: async (id_equipos, data) => {
        const campos = [];
        const valores = [];
        let index = 1;

        campos.push(`eqp_ultima_modificacion = NOW()`);

        if (data.eqp_version !== undefined) {
            campos.push(`eqp_version = $${index++}`);
            valores.push(data.eqp_version);
        }

        if (data.eqp_nombre_host !== undefined) {
            campos.push(`eqp_nombre_host = $${index++}`);
            valores.push(data.eqp_nombre_host);
        }

        if (data.eqp_tipo_equipo !== undefined) {
            campos.push(`eqp_tipo_equipo = $${index++}`);
            valores.push(data.eqp_tipo_equipo);
        }

        if (data.eqp_modelo !== undefined) {
            campos.push(`eqp_modelo = $${index++}`);
            valores.push(data.eqp_modelo);
        }

        if (data.eqp_marca !== undefined) {
            campos.push(`eqp_marca = $${index++}`);
            valores.push(data.eqp_marca);
        }

        if (data.eqp_estructura !== undefined) {
            campos.push(`eqp_estructura = $${index++}`);
            valores.push(data.eqp_estructura);
        }

        if (data.id_campana !== undefined) {
            campos.push(`id_campana = $${index++}`);
            valores.push(data.id_campana);
        }

        if (data.id_hoja_de_vida !== undefined) {
            campos.push(`id_hoja_de_vida = $${index++}`);
            valores.push(data.id_hoja_de_vida);
        }
        
        if(campos.length === 0) return null;

        const query = `
            UPDATE equipos
            SET ${campos.join(', ')}
            WHERE id_equipos = $${index}
            RETURNING *;
        `;

        valores.push(id_equipos);
        const {rows} = await db.query(query, valores);
        return rows [0];
    },

    //enlitar equipos
        obtener_equipos: async () => {
        const query = `
        SELECT * FROM equipos
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    //enlistar equipos por marca
    obtener_equipo_marca: async (eqp_marca) => {
        const query = `
            SELECT * FROM equipos where LOWER(eqp_marca) = LOWER($1);
        `;
        const {rows} = await db.query(query, [eqp_marca]);
        return rows;
    },

    //enlistar por nombre host
    obtener_equipo_host: async (eqp_nombre_host) =>{
        const query = `
            SELECT * FROM equipos where LOWER(eqp_nombre_host) = LOWER($1);
        `;
        const {rows} = await db.query(query, [eqp_nombre_host]);
        return rows;
    },

    //enlitar por tipo equipo
    obtener_equipo_tipo: async(eqp_tipo_equipo) => {
        const query = `
            SELECT * FROM equipos WHERE eqp_tipo_equipo::text ILIKE $1
        `;
        const {rows} = await db.query(query, [eqp_tipo_equipo]);
        return rows;
    },


    eliminar_equipo: async (id) => {
        const checkHojaVida = 'SELECT * FROM hoja_de_vida WHERE ID_equipos = $1';
        const { rows: hoja } = await db.query(checkHojaVida, [id]);

        if (hoja.length > 0) {
            throw new Error('No se puede eliminar: El equipo tiene una Hoja de Vida técnica activa.');
        }

        const query = 'DELETE FROM equipos WHERE ID_equipos = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = Equipo;