const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Token requerido' });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2) {
            return res.status(401).json({ message: 'Formato de token inválido' });
        }

        const [bearer, token] = parts;

        if (bearer !== 'Bearer') {
            return res.status(401).json({ message: 'Formato de token inválido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { rows } = await db.query(`
            SELECT id_usuario, usu_nombre, id_rol, id_campana
            FROM usuario
            WHERE id_usuario = $1
        `, [decoded.id_usuario]);

        if (!rows[0]) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.usuario = rows[0];
        next();

    } catch (error) {
        console.error('Error JWT:', error.message);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
