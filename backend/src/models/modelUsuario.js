const pool = require('../config/db.js');


const Usuariomodel= {
    async create(data) {
        const {
            usu_nombre, 
            usu_apellido,
            usu_correo,
            usu_telefono,
            id_rol,
            id_campana
        } = data;

        const query =  ` 
            INSERT into usuario
            (usu_nombre, usu_apellido, usu_correo, usu_telefono, id_rol, id_campana)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const { rows} = await pool.query(query, [
            usu_nombre,
            usu_apellido,
            usu_correo, 
            usu_telefono,
            id_rol,
            id_campana
        ]);

        return rows[0];
    },

    async findAll(){
        const query =  ` 
            Select u.id_usuario, 
                u.usu_nombre, 
                u.usu_apellido, 
                u.usu_correo, 
                u.usu_telefono, 
                r.rol_nombre,
                u.id_campana
            from usuario u
            INNER JOIN rol r ON u.id_rol = r.id_rol;
        `;
        const {rows} = await pool.query(query);
        return rows;
    },

    async findById(id){
        const query =  `
            SELECT * FROM usuario  where id_usuario = $1;
        `;
        const {rows } = await pool.query(query, [id]);
        return rows[0];
    },

    async update(id, data){
        const {
            usu_nombre,
            usu_apellido,
            usu_correo, 
            usu_telefono, 
            id_rol,
            id_campana
        } = data;

        const query =  ` 
            UPDATE usuario
            SET usu_nombre = $1,
                usu_apellido = $2,
                usu_correo = $3,
                usu_telefono = $4,
                id_rol = $5,
                id_campana =$6
            WHERE id_usuario = $7
            RETURNING *;
        `;

        const {rows} = await pool.query(query, [
            usu_nombre,
            usu_apellido,
            usu_correo, 
            usu_telefono,
            id_rol,
            id_campana,
            id_usuario
        ]);

        return rows[0];
    },

    async updatePassword(id_usuario, password) {
        const { rows } = await pool.query(
            `
            UPDATE credenciales
            SET usu_contrasena = $1
            WHERE id_usuario = $2
            RETURNING id_usuario`,
            [password, id_usuario]
        );
        return rows[0];
    },

    async delete(id){
        await pool.query(
            'DELETE from usuario WHERE id_usuario = $1',
            [id]
        );
    }
};

module.exports = Usuariomodel;