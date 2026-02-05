const ROLES = require('../config/roles');
module.exports = (rolesPermitidos = []) => {
    return (req, res, next) => {
        console.log('================ ROL MIDDLEWARE ================');
        console.log('USUARIO:', req.usuario);
        console.log('ROLES PERMITIDOS:', rolesPermitidos);

        if(!req.usuario || req.usuario.rol === undefined){
            console.log('No viene id_rol');
            return res.status(403).json({
                message: 'Rol no encontrado en el token'
            });
        }

        const rolUsuario = Number(req.usuario.rol);

        console.log('ROL USUARIO (ID):', req.usuario.rol);

        if (!rolesPermitidos.includes(rolUsuario)) {
            console.log('rol no permitido')
            return res.status(403).json({
                message: 'No tiene permisos para acceder a este recurso'
            });
        }
        console.log('Rol permitido, todo bello, todo bonito');
        next();
    };
};
