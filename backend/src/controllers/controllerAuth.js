const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require ('../config/db');
const Auth = require('../models/modelAuth');
const {MAX_INTENTOS, MINUTOS_BLOQUEO} = require ('../config/constans');
const HistorialSistema = require('../models/modelHistorialsistema');
const registrarHistorial = require('../utils/historialHelper');
const TiposAccion = require('../config/Tiposaccion');
const Credencialesmodel = require('../models/modelCredenciales');
const getClientIp = require('../utils/ipHelper');


    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

//inicio de sesión o login
exports.login = async (req, res) => {
    try {        
        //IP del usuario
        const ip =
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress;

        const { usu_correo, usu_contrasena } = req.body;

        const userQuery = `
            SELECT 
                u.id_usuario, 
                u.usu_nombre, 
                u.usu_apellido, 
                u.id_rol,
                u.id_campana,
                r.rol_nombre
            FROM usuario u
            INNER JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.usu_correo = $1
        `;

    const { rows } = await db.query(userQuery, [usu_correo]);

    if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const usuario = rows[0];

    //obtener credenciales
    const credenciales = await Auth.getcredencialesByUsuario(usuario.id_usuario);

    if (!credenciales) {
        return res.status(401).json({ message: 'Credenciales no registradas' });
    }


    // Verificar bloqueo
    if (
        credenciales.cre_tiempo_bloqueo &&
        new Date() < credenciales.cre_tiempo_bloqueo
    ) {
    return res.status(403).json({
        message: 'Usuario bloqueado temporalmente. Intente más tarde'
        });
    }

    //comparar contraseña

    console.log('--- DEPURACIÓN DE LOGIN ---');
    console.log('Valor de usu_contrasena (Postman):', usu_contrasena);
    console.log('Objeto credenciales completo:', credenciales);
    console.log('---------------------------');

    const match = await bcrypt.compare(
        usu_contrasena,
        credenciales.usu_contrasena
    );
    // CONTRASEÑA INCORRECTA
    if (!match) {
        const nuevosIntentos = credenciales.cre_intentos_fallidos + 1;

        if (nuevosIntentos >= MAX_INTENTOS) {
            const bloqueoHasta = new Date();
            bloqueoHasta.setMinutes(
                bloqueoHasta.getMinutes() + MINUTOS_BLOQUEO
            );

            await Auth.increaseFail(
                credenciales.id_credenciales,
                nuevosIntentos,
                bloqueoHasta
            );

            return res.status(403).json({
                message: 'Cuenta bloqueada por múltiples intentos fallidos'
            });
        }

        await Auth.increaseFail(
            credenciales.id_credenciales,
            nuevosIntentos,
            null
        );

        await Credencialesmodel.updateIntentosfallidos(usuario.id_usuario);

        await HistorialSistema.create({
            id_usuario: usuario.id_usuario,
            his_accion: 'Intento fallido de inicio de sesión',
            id_tipo_accion: TiposAccion.LOGIN_FALLIDO,
            id_campana: usuario.id_campana
        });

        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    //contraseña correcta
    await Credencialesmodel.updateLoginInfo(usuario.id_usuario, ip);

    //crear JWT = web token JSOn
    const token = jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            rol: usuario.id_rol,
            id_campana: usuario.id_campana
        },

        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    await registrarHistorial({
        id_usuario: usuario.id_usuario,
        id_campana: usuario.id_campana ,
        accion: `Ha iniciado sesion el usuario ${usuario.usu_nombre}`,
        tipoAccion: TiposAccion.INICIO_SESION,
        his_ip: ip
    });

    console.log('USUARIO LOGIN:', usuario);

    //respuesta login

    res.json({
        message: 'Login exitoso',
        token,
        usuario: {
            id: usuario.id_usuario,
            nombre: usuario.usu_nombre,
            apellido: usuario.usu_apellido,
            rol: usuario.rol_nombre
        }
    });


    } catch (error) {
        console.error(error); 
        res.status(500).json({ 
            message: error.message,
            stack: error.stack
        });
    }
};
