const db = require('../config/db');

const Instaladorresponsablemodel = {

    //crear
    async create(data) {
        const {
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        } = data;

        const query = `
            INSERT INTO instalador_responsable (
                inr_nombre,
                inr_apellido,
                inr_telefono,
                id_proveedor
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const { rows } = await db.query(query, [
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        ]);

        return rows[0];
    },

    //listar todos
    async findAll({ nombre, activo, limit, offset }) {
        const filtros = [];
        const valores = [];

        if (nombre) {
            valores.push(`%${nombre}%`);
            filtros.push(`prov_nombre ILIKE $${valores.length}`);
        }

        if (activo !== undefined) {
            valores.push(activo === 'true');
            filtros.push(`prov_activo = $${valores.length}`);
        }

        const where = filtros.length
            ? `WHERE ${filtros.join(' AND ')}`
            : '';

        const query = `
            SELECT *
            FROM instalador_responsable
            ${where}
            ORDER BY id_instalador_responsable DESC
            LIMIT $${valores.length + 1}
            OFFSET $${valores.length + 2}
        `;

        const countQuery = `
            SELECT COUNT(*) 
            FROM instalador_responsable
            ${where}
        `;

        const { rows } = await db.query(query, [...valores, limit, offset]);
        const totalResult = await db.query(countQuery, valores);

        return {
            rows,
            total: Number(totalResult.rows[0].count)
        };
    },

    //buscar por nombre
    async findNombre(inr_nombre) {
        const query = `
            SELECT *
            FROM instalador_responsable
            WHERE inr_nombre ILIKE $1;
        `;

        const { rows } = await db.query(query, [`%${inr_nombre}%`]);
        return rows;
    },

    //buscar por telefono
    async findTelefono(inr_telefono) {
        const query = `
            SELECT *
            FROM instalador_responsable
            WHERE inr_telefono ILIKE $1;
        `;

        const { rows } = await db.query(query, [`%${inr_telefono}%`]);
        return rows;
    },

    //actualizar 
    async updateById(id, data) {
        const {
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor
        } = data;

        const query = `
            UPDATE instalador_responsable
            SET
                inr_nombre   = COALESCE($1, inr_nombre),
                inr_apellido = COALESCE($2, inr_apellido),
                inr_telefono = COALESCE($3, inr_telefono),
                id_proveedor = COALESCE($4, id_proveedor)
            WHERE id_instalador_responsable = $5
            RETURNING *;
        `;

        const { rows } = await db.query(query, [
            inr_nombre,
            inr_apellido,
            inr_telefono,
            id_proveedor,
            id
        ]);

        return rows[0];
    },

    //paginación
    async findAllPaginated({ nombre, telefono, id_proveedor, limit, offset }) {
        const filters = [];
        const values = [];

        if (nombre) {
            values.push(`%${nombre}%`);
            filters.push(`inr_nombre ILIKE $${values.length}`);
        }

        if (telefono) {
            values.push(`%${telefono}%`);
            filters.push(`inr_telefono ILIKE $${values.length}`);
        }

        if (id_proveedor) {
            values.push(id_proveedor);
            filters.push(`id_proveedor = $${values.length}`);
        }

        const whereClause =
            filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

        const dataQuery = `
            SELECT *
            FROM instalador_responsable
            ${whereClause}
            ORDER BY inr_nombre
            LIMIT $${values.length + 1}
            OFFSET $${values.length + 2};
        `;

        const countQuery = `
            SELECT COUNT(*) AS total
            FROM instalador_responsable
            ${whereClause};
        `;

        const dataResult = await db.query(dataQuery, [...values, limit, offset]);
        const countResult = await db.query(countQuery, values);

        return {
            data: dataResult.rows,
            total: parseInt(countResult.rows[0].total)
        };
    },

    //eliminar por id
    async delete(id) {
        const query = `
            DELETE FROM instalador_responsable
            WHERE id_instalador_responsable = $1
            RETURNING *;
        `;

        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = Instaladorresponsablemodel;
