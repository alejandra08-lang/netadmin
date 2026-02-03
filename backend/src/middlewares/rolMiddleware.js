const ROLES= require('../config/roles');
module.exports = (rolesPermitidos = []) => {
    return (req, res, next) => {
        console.log('================ ROL MIDDLEWARE ================');
        console.log('USUARIO:', req.usuario);
        console.log('ROLES PERMITIDOS:', rolesPermitidos);
        
        console.log('ROL USUARIO', req.usuario);

        if(!req.usuario || req.usuario.id_rol === undefined){
            console.log('No viene id_rol');
            return res.status(403).json({
                message: 'Rol no encontrado en el token'
            });
        }

        const rolUsuario = Number(req.usuario.id_rol);

        console.log('ROL USUARIO (ID):', rolUsuario);

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
