const db = require('../config/db.js');
const Tiposaccion = require('../config/Tiposaccion.js');

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

        const { rows} = await db.query(query, [
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
        const {rows} = await db.query(query);
        return rows;
    },

    async update(id_usuario, data) {

        const campos = [];
        const valores = [];
        let index = 1;

        if (data.usu_nombre !== undefined) {
            campos.push(`usu_nombre = $${index++}`);
            valores.push(data.usu_nombre);
        }

        if (data.usu_apellido !== undefined) {
            campos.push(`usu_apellido = $${index++}`);
            valores.push(data.usu_apellido);
        }

        if (data.usu_correo !== undefined) {
            campos.push(`usu_correo = $${index++}`);
            valores.push(data.usu_correo);
        }

        if (data.usu_telefono !== undefined) {
            campos.push(`usu_telefono = $${index++}`);
            valores.push(data.usu_telefono);
        }

        if (data.id_rol !== undefined) {
            campos.push(`id_rol = $${index++}`);
            valores.push(data.id_rol);
        }

        if (data.id_campana !== undefined) {
            campos.push(`id_campana = $${index++}`);
            valores.push(data.id_campana);
        }

        if (campos.length === 0) return null;

        const query = `
            UPDATE usuario
            SET ${campos.join(', ')}
            WHERE id_usuario = $${index}
            RETURNING *;
        `;

        valores.push(id_usuario);
        const { rows } = await db.query(query, valores);
        return rows[0];
    },

    async updatePassword(id_usuario, password) {
        const { rows } = await db.query(
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
        await db.query(
            'DELETE from usuario WHERE id_usuario = $1',
            [id]
        );
    }
};

module.exports = Usuariomodel;