const jwt = require('jsonwebtoken');
const pool = require('../config/db');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Formato de token inválido' });
        }

        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();

        // Traer usuario completo con rol
        const { rows } = await pool.query(`
            SELECT u.id_usuario, u.usu_nombre, u.id_rol, r.rol_nombre AS rol
            FROM usuario u
            INNER JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.id_usuario = $1
        `, [decoded.id_usuario]);

        if (!rows[0]) return res.status(401).json({ message: 'Usuario no encontrado' });

        // Ahora req.usuario tiene id_usuario, usu_nombre, id_rol y rol (nombre)
        req.usuario = {
            id_usuario: decoded.id_usuario,
            usu_nombre: decoded.usu_nombre,
            id_rol: decoded.rol
        };
        next();

    } catch (error) {
        console.error('Error JWT:', error.message);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
///FALTA VERIFICAR ACCIONES EN PROVEEDORES