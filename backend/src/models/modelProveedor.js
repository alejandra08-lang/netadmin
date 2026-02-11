const db = require('../config/db.js');

const Proveedormodel = {
    //crear proveedor
    async create(data){
        const pro_fecha_entrega = new Date();
        const {
            pro_nombre,
            pro_razon_social,
            pro_telefono_1,
            pro_telefono_2,
            pro_correo,
            pro_tiempo_garantia,
            pro_fecha_finalizacion
        } = data;

        const query = `
            INSERT into proveedor
            (
                pro_nombre,
                pro_razon_social,
                pro_telefono_1,
                pro_telefono_2,
                pro_correo,
                pro_tiempo_garantia,
                pro_fecha_finalizacion
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;    
        `;

        const {rows} = await db.query(query, [
            pro_nombre,
            pro_razon_social,
            pro_telefono_1,
            pro_telefono_2,
            pro_correo,
            pro_tiempo_garantia,
            pro_fecha_finalizacion
        ]);

        return rows[0];
    },

    //enlistar todos los proveedores

    async findAll(){
        const query = ` 
            SELECT * from proveedor
        `;

        const {rows} = await db.query(query);
        return rows;
    },

    //encontrar proveedor por nombre

    async findRasonsocial(pro_razon_social){
        const query = `
            SELECT * from 
            proveedor 
            where LOWER(pro_razon_social) = LOWER($1);
        `;
        const { rows } = await db.query(query, [pro_razon_social]);
        return rows;
    },

    //paginacion
    //+++++++++++++++++++++++++
    //////////+++

    //actualizar proveedor

    async update(id_proveedor, data){
        const campos = [];
        const valores = [];
        let index = 1;

        if (data.pro_nombre !== undefined) {
            campos.push(`pro_nombre = $${index++}`);
            valores.push(data.pro_nombre);
        }

        if (data.pro_razon_social !== undefined) {
            campos.push(`pro_razon_social = $${index++}`);
            valores.push(data.pro_razon_social);
        }

        if (data.pro_telefono_1 !== undefined) {
            campos.push(`pro_telefono_1 = $${index++}`);
            valores.push(data.pro_telefono_1);
        }

        if (data.pro_telefono_2 !== undefined) {
            campos.push(`pro_telefono_2 = $${index++}`);
            valores.push(data.pro_telefono_2);
        }

        if (data.pro_correo !== undefined) {
            campos.push(`pro_correo = $${index++}`);
            valores.push(data.pro_correo);
        }

        if (data.pro_tiempo_garantia !== undefined) {
            campos.push(`pro_tiempo_garantia = $${index++}`);
            valores.push(data.pro_tiempo_garantia);
        }


        if (campos.length === 0) return null;

        const query = `
            UPDATE proveedor
            SET ${campos.join(', ')}
            WHERE id_proveedor = $${index}
            RETURNING *;
        `;

        valores.push(id_proveedor);
        const { rows } = await db.query(query, valores);
        return rows[0];
    },

    async deleteProveedor(id){
        const query = `
            DELETE from proveedor 
            where id_proveedor = $1
            RETURNING *; 
        `;

        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = Proveedormodel;