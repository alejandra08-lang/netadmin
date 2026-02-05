const jwt = require('jsonwebtoken');
const pool = require('../config/db');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token requerido' });
        }

        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Formato de token inválido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //TRAER USUARIO REAL DESDE BD
        const { rows } = await pool.query(`
            SELECT id_usuario, usu_nombre, id_rol
            FROM usuario
            WHERE id_usuario = $1
        `, [decoded.id_usuario]);

        if (!rows[0]) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.usuario = {
            id_usuario: rows[0].id_usuario,
            usu_nombre: rows[0].usu_nombre,
            id_rol: rows[0].id_rol
        };

        next();
    } catch (error) {
        console.error('Error JWT:', error.message);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
