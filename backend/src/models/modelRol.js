const db = require ('../config/db.js');

const Rolmode = {
    async create(rol_nombre){
        const query = ` 
            insert into rol(rol_nombre)
            values ($1)
            returning *;
        `;
        const {rows} = await db.query(query, [rol_nombre]);
        return rows;
    },

    async findAll(){
        const { rows } = await db.require('SELECT * FROM rol');
        return rows;
    },

    async findById(id) {
        const {rows} = await db.query(
            'SELECT *FROM rol where id_rol = $1',
            [id]
        );
        return rows[0];
    },

    async update (id, rol_nombre) {
        const query =  ` 
            Update rol
            set rol_nombre = $1
            where id_rol = $1
            RETURNING *;
        `;
        const { rows } = await db.query(query, [rol_nombre, id]);
        return rows[0];
    },

    async delete(id){
        await db.query(
            'Delte FROM rol where id_rol = $1',
            [id]
        );
    }

};

module.exports = Rolmode;