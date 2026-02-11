const db = require('../config/db');

const Credencialesmodel = {
    async create(data){
        const {
            usu_contrasena,
            id_usuario
        }= data;

        const query = `
            INSERT INTO credenciales
                (usu_contrasena, id_usuario, cre_intentos_fallidos) 
                values ($1, $2, 0)
                RETURNING *;
        `;

        const { rows } = await db.query(query, [
            usu_contrasena,
            id_usuario
        ]);

        return rows [0];
    },

    async findAll(){
        const query = `
            SELECT  c.id_credenciales,
                    c.cre_intentos_fallidos,
                    c.cre_ultimo_login,
                    c.cre_tiempo_bloqueo,
                    u.usu_nombre,
                    u.usu_apellido
            FROM credenciales c
            INNER JOIN usuario u ON c.id_usuario = u.id_usuario;
        `;
        const {rows} = await db.query(query);
        return rows;
    },

    async findById(id) {
        const {rows} = await db.query(
            'SELECT * FROM credenciales WHERE id_credenciales = $1',
            [id]
        );
        return rows[0];
    },


    async updatePassword(id_usuario, nuevacontrasena){ 
        const query = `
            UPDATE credenciales
            SET usu_contrasena = $1
            WHERE id_usuario = $2
            RETURNING *;
        `;
        const {rows } = await db.query(query, [
            nuevacontrasena,
            id_usuario
        ]);
        return rows[0];
    },

    async updateLoginInfo(id_usuario, ip) {
        const query = `
            UPDATE credenciales
            SET 
                cre_ultimo_login = CURRENT_TIMESTAMP,
                cre_intentos_fallidos = 0,
                cre_tiempo_bloqueo = NULL,
                cre_ultima_ip = $2
            WHERE id_usuario = $1
            RETURNING *;
        `;

        const {rows} = await db.query(query, [id_usuario, ip]);
        return rows[0];
    },

    async updateIntentosfallidos(id_usuario){
        const {rows} = await db.query( `
            UPDATE credenciales
            SET cre_intentos_fallidos = cre_intentos_fallidos + 1
            WHERE id_usuario = $1
            RETURNING cre_intentos_fallidos
        `, [id_usuario]);

        if (rows[0].cre_intentos_fallidos >= 5) {
            await db.query(`
                UPDATE credenciales
                SET cre_tiempo_bloqueo = now() + interval '15 minutes'
                WHERE id_usuario = $1
            `,  [id_usuario]);
        }
    },

    async delete(id){
        await db.query(
            'DELETE from credenciales WHERE id_credenciales = $1',
            [id]
        );
    }
};

module.exports = Credencialesmodel;