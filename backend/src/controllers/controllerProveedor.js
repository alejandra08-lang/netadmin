const Tiposaccion = require('../config/Tiposaccion');
const HistorialSistema = require('../models/modelHistorialsistema');
const Proveedormodel = require('../models/modelProveedor');
const registrarHistorial = require('../utils/historialHelper');
const obtenerIp = require('../utils/ipHelper');

//crear proveedores
exports.createproveedor = async(req, res) => {
    const ip = obtenerIp(req);
    try {
        const pro_fecha_entrega = new Date();

        const {
            pro_nombre,
            pro_razon_social,
            pro_telefono_1,
            pro_telefono_2,
            pro_correo,
            pro_tiempo_garantia,
            pro_fecha_finalizacion
        } = req.body;

        console.log('BODY RECIBIDO:', req.body);
        console.log('pro_nombre:', req.body.pro_nombre);


        if (!pro_nombre || !pro_razon_social || !pro_telefono_1 || !pro_correo || !pro_tiempo_garantia || !pro_fecha_finalizacion){
            return res.status(400).json({
                message: 'pro_nombre, pro_razon_social, pro_telefono_1, pro_telefono_2, pro_correo, pro_tiempo_garantia, pro_fecha_finalizacion son obligarotios'
            });
        }

        const proveedor = await Proveedormodel.create({
            pro_nombre,
            pro_razon_social,
            pro_telefono_1,
            pro_telefono_2,
            pro_correo,
            pro_tiempo_garantia,
            pro_fecha_finalizacion
        });

        console.log('USUARIO AUTH:', req.usuario);

        await HistorialSistema.create({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            his_accion: `Se ha creado el proveedor ${proveedor.pro_nombre}`,
            id_tipo_accion: Tiposaccion.CREACION_DE_PROVEEDOR,
            his_ip: req.ip
        });

        res.status(201).json(proveedor);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

//enlistar proveedores
exports.getproveedores = async (req, res) => {
    try {
        const {razon_social} = req.query;

        if(razon_social){
            const razonDecodificada = decodeURIComponent(razon_social);
            const proveedor = await Proveedormodel.findAll (
                razonDecodificada
            );
            if (proveedor.length === 0){
                return res.status(404).json({
                    message: 'Proveedor no encontrado'
                });
            }

            return res.json(proveedor);
        }
        const proveedores = await Proveedormodel.findAll();
        res.json(proveedores);
        
    } catch (error){
        res.status(500).json({
            message: 'Error al tratar de listar a los proveedores',
            error: error.message});
    }
};

//buscar proveedor por razonsocial
exports.getproveedorByrazonsocial = async (req, res) => {
    try {
        const razonsocial = decodeURIComponent(req.params.pro_razon_social);
        const data = await Proveedormodel.findRasonsocial(razonsocial);

        if (data.length === 0) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            });
        }

        res.json(data);
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

//actualizar proveedor
exports.updateproveedor = async (req, res) => {

    console.log('ID recibido:', req.params.id, typeof req.params.id);

    try {
        const razonsocial = decodeURIComponent(req.params.pro_razon_social);
        const proveedorActualizado = await Proveedormodel.update(
            req.params.id,
            req.body
        );

        if (!proveedorActualizado) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        const ip = obtenerIp(req);
        await registrarHistorial({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            accion: `Proveedor actualizado ${razonsocial}`,
            his_ip: ip
        })

        res.json({ message: "proveedor actualizado correctamente", data: proveedorActualizado});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//eliminar proveedor

exports.deleteproveedor = async (req, res) => {
    try {
        console.log('ID_recibido:', req.params.id);
        const proveedor =await Proveedormodel.deleteProveedor(req.params.id);
        if (!proveedor) {
            return res.status(404).json({
                message: "Proveedor responsable no encontrado"
            });
        }

        await HistorialSistema.create({
            id_usuario: req.usuario.id_usuario,
            id_campana: req.usuario.id_campana,
            his_accion: `Eliminó el proveedor ${proveedor.pro_razon_social}`,
            id_tipo_accion: Tiposaccion.ELIMINO_PROVEEDOR,
            his_ip: req.ip
        });

        return res.json({message: "Proveedor eliminado correctamente",
            data: proveedor
        });
    } catch(error){
        return res.status(500).json({error: error.message});
    }
};

