-- Active: 1769276078135@@127.0.0.1@5432@Netadmin

create type tipo_via AS enum ('Avenida', 'Calle', 'Callera', 'Transversal', 'Diagonal');
CREATE type activo_hoja AS ENUM ('Activo', 'Baja', 'Garantia');
CREATE type disponibilidad_equipo AS ENUM ('Disponibilidad', 'Asignado', 'En mantenimiento');
create type impacto as enum ('Critico', 'Alto', 'Medio', 'Bajo');
create type tipo_equipo AS enum ('Firewall', 'Switch', 'Punto de acceso');
create type en_linea As enum('Online', 'offline');
create type estructura AS enum('Gabinete', 'Rack');
create type estado_token as Enum('Activo', 'Utilizado', 'No utilizado');
create type tipo_mantenimiento AS ENUM('Preventivo_logico', 'Preventico futuras fallas', 'Correctivo', 'Actualización');
    
Create table Departamento (
	ID_departamento SERIAL primary key,
	dep_nombre Varchar (50) not null
	
);

create table ciudad (
	ID_ciudad SERIAL primary key,
	ciu_nombre varchar(50) not null,
	ID_departamento INT references Departamento(ID_departamento) ON DELETE restrict
);

create table ubicacion (
    ID_ubicacion SERIAL primary key,
    ubi_localidad_municipio varchar not null,
	ubi_barrio varchar(50) not null,
	ubi_tipo_via tipo_via not null,
	ubi_numero varchar(50),
    ID_ciudad INT references ciudad(ID_ciudad) ON DELETE restrict
);

create table site (
    ID_site SERIAL primary key,
    sit_nombre VARCHAR(15) not null,
    ID_ubicacion INT references ubicacion(ID_ubicacion) ON DELETE restrict 
);

create table campana (
    ID_campana SERIAL primary key,
    cam_nombre_campana varchar(50) not null,
    ID_site INT references site(ID_site) ON DELETE restrict
);

create table datos_basicos (
    ID_datos_basicos SERIAL primary key,
    dtb_modelo varchar(25) not null,
    dtb_marca varchar(25) not null,
    dtb_elemento elemento,
    dtb_estructura VARCHAR(25) not null,
    dtb_numero_serie VARCHAR(50) not null,
    dtb_fehca_compra DATE not null
);

create table proveedor (
    ID_proveedor serial PRIMARY key,
    pro_nombre varchar(50) not null,
    pro_razon_social varchar(50) not null UNIQUE   ,
    pro_telefono_1 varchar(11) not null,
    pro_telefono_2 varchar(11),
    constraint chk_telefono_valido check (
            (pro_telefono_1 ~ '^[0-9]+$' AND LENGTH(pro_telefono_1) >= 7)
            AND
            (pro_telefono_2 IS NULL OR (pro_telefono_2 ~ '^[0-9]+$' AND LENGTH(pro_telefono_2) >= 7))
        ),  
    pro_correo varchar(50) Not null UNIQUE,
    pro_responsable VARCHAR(50) NOT NULL,
    pro_tiempo_garantia VARCHAR NOT NULL,
    pro_fecha_entrega  TIMESTAMP NOT NULL,
    pro_fecha_finalizacion TIMESTAMP NOT NULL
);

create table instalador_responsable(
    ID_instalador_responsable serial primary key,
    inr_nombre varchar(50) not null,
    ID_proveedor INT REFERENCES proveedor(ID_proveedor) ON DELETE RESTRICT not NULL
);


create table dependencia_impacto(
    ID_dependencia_impacto serial PRIMARY KEY,
    dpo_dependencias TEXT,
    dpo_impacto TEXT,
    dpo_nivel_impacto impacto,
    dpo_congenitas TEXT
);

create table caracteristicas_tecnicas(
    ID_caracteristicas_tecnicas serial PRIMARY key,
    crt_procesador varchar(50) not null,
    crt_memoria_nvra varchar(12) not null,
    crt_version_firmware varchar(25) not null,
    crt_sistema_operativo varchar(25) not null,
    crt_respaldo BOOLEAN DEFAULT TRUE not null,
    crt_funciones text not null,
    ID_dependencia_impacto INT REFERENCES dependencia_impacto(ID_dependencia_impacto) ON DELETE restrict not null,
    
);

create table rol (
    ID_rol serial PRIMARY key,
    rol_nombre varchar(25) not null
);

create table usuario(
    ID_usuario serial PRIMARY KEY,
    usu_nombre VARCHAR(50) not null,
    usu_apellido varchar(50) not null,
    usu_correo varchar(50) not null,
    usu_telefono varchar(11) not null,
        constraint chk_telefono_valido
        check (usu_telefono ~ '^\+[0-9]+$' AND LENGTH(usu_telefono) >= 7),
    ID_rol INT REFERENCES rol(ID_rol) ON DELETE RESTRICT not null
);


create table rest_token(
    ID_rest_token serial PRIMARY key,
    res_token varchar(50) not null,
    res_estado estado_token not null,
    res_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_usuario INT REFERENCES usuario(ID_usuario) ON DELETE RESTRICT NOT null
);

create table credenciales (
    ID_credenciales serial PRIMARY KEY,
    cre_intentos_fallidos INT,
    cre_ultimo_login TIMESTAMP,
    cre_tiempo_bloqueo TIMESTAMP,
    usu_contraseña VARCHAR(225),
    ID_usuario INT REFERENCES usuario(ID_usuario) ON DELETE RESTRICT not null
);

create table equipos(
    ID_equipos serial PRIMARY KEY,
    eqp_version varchar(25) not null,
    eqp_nombre_host varchar(50) not null,
    eqp_tipo_equipo tipo_equipo not null,
    eqp_en_linea en_linea not null,
    eqp_modelo: varchar(25) not null,
    eqp_marca: varchar(25) not null,
    eqp_estructura estructura not null,
    eqp_fecha_regsitro TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE not null,
    ID_equipos INT REFERENCES equipos(ID_equipos) ON DELETE RESTRICT not null
);



create table hoja_de_vida (
    ID_hoja_de_vida SERIAL PRIMARY KEY,
    hdv_creador int,
    hdv_activo activo_hoja not null,
    hdv_disponibilidad disponibilidad_equipo not null,
    hdv_fecha_creacion TIMESTAMP not null,
    ID_equipos INT REFERENCES equipos(ID_equipos) ON DELETE RESTRICT UNIQUE,
    ID_caracteristicas_tecnicas INT REFERENCES caracteristicas_tecnicas(ID_caracteristicas_tecnicas) ON DELETE RESTRICT UNIQUE,
    ID_datos_basicos INT REFERENCES datos_basicos (ID_datos_basicos) ON DELETE RESTRICT UNIQUE not null,
    ID_camapana INT REFERENCES campana(ID_campana) ON DELETE RESTRICT not null,
    ID_proveedor INT REFERENCES proveedor(ID_proveedor) ON DELETE RESTRICT not null,
    ID_usuario INT REFERENCES usuario(ID_usuario) ON DELETE RESTRICT not null
);

create table manteniemiento (
    ID_mantenimiento Serial PRIMARY KEY,
    mto_tipo tipo_mantenimiento not null,
    mto_responsable varchar(50) not null,
    mto_descripcion text not null,
    mto_fecha TIMESTAMP,
    ID_hoja_de_vida INT REFERENCES hoja_de_vida (ID_hoja_de_vida) ON DELETE RESTRICT
)

CREATE TABLE historial_sistema (
    ID_historial_sistema SERIAL PRIMARY KEY,
    his_accion VARCHAR(100),
    his_fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_usuario INT NOT NULL,
    ID_site INT NOT NULL,
    CONSTRAINT fk_usuario_historial 
        FOREIGN KEY (ID_usuario) REFERENCES usuario(ID_usuario) 
        ON DELETE RESTRICT,
    CONSTRAINT fk_site_historial 
        FOREIGN KEY (ID_site) REFERENCES site(ID_site) 
        ON DELETE RESTRICT
);

create table switch (
    ID_switch serial PRIMARY key,
    swt_direccion_IP VARCHAR(100) not null,
    swt_hostname VARCHAR(50) not null,
    swt_modelo VARCHAR(50),
    ID_hoja_de_vida INT not null,
    CONSTRAINT fk_switch
        FOREIGN KEY (ID_hoja_de_vida) REFERENCES hoja_de_vida (ID_hoja_de_vida) 
        ON DELETE RESTRICT
);
