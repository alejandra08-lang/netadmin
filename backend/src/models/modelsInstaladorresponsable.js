const pool = require('../config/db');

const Instaladorresponsablemodel = {
    async create(data){
        const {
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        } = data;    

        const query = `
            INSERT into instalador_responsable 
                (   inr_nombre, 
                    inr_apellido, 
                    inr_telefono, 
                    id_proveedor
                )
            values ($1, $2, $3, $4)
            RETURNING *;
        `;

        const { rows } = await pool.query(query, [
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        ]);
        return rows[0];
    },

    async findAll(){
        const query = `
            SELECT i.id_instalador_responsable,
                i.inr_nombre,
                i.inr_apellido,
                i.inr_telefono,
                p.id_proveedor
            from instalador_responsable i
            INNER JOIN proveedor p ON i.id_proveedor = p.id_proveedor;
        `;
        const {rows} = await pool.query(query);
        return rows;
    },

    async findNombre(inr_nombre){
        const query = `
            SELECT * FROM
            instalador_responsable 
            where LOWER(inr_nombre) = LOWER($1);
        `;
        const { rows } = await pool.query(query, [inr_nombre]);
        return rows;
    },

    async updateInstaladores(inr_nombre, data){
        const {
            inr_apellido,
            inr_telefono,
            id_proveedor
        } = data;

        const query = ` 
            UPDATE instalador_responsable
            SET inr_nombre = $1,
                inr_apellido = $2,
                inr_telefono = $3,
                id_proveedor = $4
            WHERE id_instalador_responsable = $5
            RETURNING *;
        `;

        const {rows} = await pool.query(query, {
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        });

        return rows[0];
    },

    async delete(id){
        await pool.query(
            'DELETE FROM instalador_responsable where id_instalador_responsable = $1',
            [id]
        );
    }
};

module.exports = Instaladorresponsablemodel;