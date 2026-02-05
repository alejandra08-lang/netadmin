<<<<<<< HEAD
=======
-- Active: 1769202202005@@127.0.0.1@5432@netadmin2
>>>>>>> origin/alejandra
--
-- PostgreSQL database dump
--

<<<<<<< HEAD
\restrict dFH66fJHkrGYhoIKP8Sv2cbM146Rei1IT71bJgWeeMyNjavwhXMb87mhSzLiiMV
=======

>>>>>>> origin/alejandra

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-01-29 15:16:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 892 (class 1247 OID 28214)
-- Name: activo_hoja; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.activo_hoja AS ENUM (
    'Activo',
    'Baja',
    'Garantia'
);


ALTER TYPE public.activo_hoja OWNER TO postgres;

--
-- TOC entry 895 (class 1247 OID 28222)
-- Name: disponibilidad_equipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.disponibilidad_equipo AS ENUM (
    'Disponibilidad',
    'Asignado',
    'En mantenimiento'
);


ALTER TYPE public.disponibilidad_equipo OWNER TO postgres;

--
-- TOC entry 889 (class 1247 OID 28207)
-- Name: elemento; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.elemento AS ENUM (
    'Switch',
    'Firewall',
    'Punto de acceso'
);


ALTER TYPE public.elemento OWNER TO postgres;

--
-- TOC entry 904 (class 1247 OID 28246)
-- Name: en_linea; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.en_linea AS ENUM (
    'Online',
    'offline'
);


ALTER TYPE public.en_linea OWNER TO postgres;

--
-- TOC entry 907 (class 1247 OID 28252)
-- Name: estado_token; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estado_token AS ENUM (
    'Activo',
    'Utilizado',
    'No utilizado'
);


ALTER TYPE public.estado_token OWNER TO postgres;

--
-- TOC entry 964 (class 1247 OID 28657)
-- Name: estructura; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estructura AS ENUM (
    'Gabinete',
    'Rack'
);


ALTER TYPE public.estructura OWNER TO postgres;

--
-- TOC entry 898 (class 1247 OID 28230)
-- Name: impacto; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.impacto AS ENUM (
    'Critico',
    'Alto',
    'Medio',
    'Bajo'
);


ALTER TYPE public.impacto OWNER TO postgres;

--
-- TOC entry 901 (class 1247 OID 28240)
-- Name: tipo_equipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_equipo AS ENUM (
    'Firewall',
    'Switch',
    'Punto de acceso'
);


ALTER TYPE public.tipo_equipo OWNER TO postgres;

--
-- TOC entry 910 (class 1247 OID 28260)
-- Name: tipo_mantenimiento; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_mantenimiento AS ENUM (
    'Preventivo_logico',
    'Preventico futuras fallas',
    'Correctivo',
    'Actualización'
);


ALTER TYPE public.tipo_mantenimiento OWNER TO postgres;

--
-- TOC entry 958 (class 1247 OID 28595)
-- Name: tipo_via; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_via AS ENUM (
    'Avenida',
    'Calle',
    'Carrera',
    'Diagobnal',
    'Transversal'
);


ALTER TYPE public.tipo_via OWNER TO postgres;

--
-- TOC entry 255 (class 1255 OID 28649)
-- Name: funcion_grabar_historial(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.funcion_grabar_historial() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ahora usamos ID_campana en ambos lados
    INSERT INTO historial_sistema (his_accion, his_fecha_hora, ID_usuario, ID_campana)
    VALUES ('Cambio detectado', CURRENT_TIMESTAMP, NEW.ID_usuario, NEW.ID_campana);
    
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.funcion_grabar_historial() OWNER TO postgres;

--
-- TOC entry 256 (class 1255 OID 28688)
-- Name: validar_permisos_usuario(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validar_permisos_usuario() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_rol INT;
BEGIN
    -- Cambia 'rol' por el nombre real de tu columna
    -- Y asegúrate de que 'usuario' sea el nombre correcto de la tabla
    SELECT id_rol INTO v_rol FROM usuario WHERE id_usuario = NEW.id_usuario;

    IF v_rol IN (1, 2) THEN
        RETURN NEW;
    ELSIF v_rol = 3 THEN
        RAISE EXCEPTION 'Los usuarios con el rol de lector no tienen permisos para crear o gestionar las hojas de vida de lso equipos.';
    ELSE
        RAISE EXCEPTION 'Usuario sin permisos.';
    END IF;
END;
$$;


ALTER FUNCTION public.validar_permisos_usuario() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 28324)
-- Name: campana; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campana (
    id_campana integer NOT NULL,
    cam_nombre_campana character varying(50) NOT NULL,
    id_site integer NOT NULL
);


ALTER TABLE public.campana OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 28323)
-- Name: campana_id_campana_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campana_id_campana_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.campana_id_campana_seq OWNER TO postgres;

--
-- TOC entry 5261 (class 0 OID 0)
-- Dependencies: 227
-- Name: campana_id_campana_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campana_id_campana_seq OWNED BY public.campana.id_campana;


--
-- TOC entry 234 (class 1259 OID 28380)
-- Name: caracteristicas_tecnicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caracteristicas_tecnicas (
    id_caracteristicas_tecnicas integer NOT NULL,
    crt_procesador character varying(50) NOT NULL,
    crt_memoria_nvra character varying(12) NOT NULL,
    crt_version_firmware character varying(25) NOT NULL,
    crt_sistema_operativo character varying(25) NOT NULL,
    crt_respaldo boolean DEFAULT true NOT NULL,
    crt_funciones text NOT NULL,
    id_dependencia_impacto integer NOT NULL
);


ALTER TABLE public.caracteristicas_tecnicas OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 28379)
-- Name: caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq OWNER TO postgres;

--
-- TOC entry 5262 (class 0 OID 0)
-- Dependencies: 233
-- Name: caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq OWNED BY public.caracteristicas_tecnicas.id_caracteristicas_tecnicas;


--
-- TOC entry 222 (class 1259 OID 28279)
-- Name: ciudad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ciudad (
    id_ciudad integer NOT NULL,
    ciu_nombre character varying(50) NOT NULL,
    id_departamento integer NOT NULL
);


ALTER TABLE public.ciudad OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 28278)
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ciudad_id_ciudad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ciudad_id_ciudad_seq OWNER TO postgres;

--
-- TOC entry 5263 (class 0 OID 0)
-- Dependencies: 221
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ciudad_id_ciudad_seq OWNED BY public.ciudad.id_ciudad;


--
-- TOC entry 242 (class 1259 OID 28445)
-- Name: credenciales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credenciales (
    id_credenciales integer NOT NULL,
    cre_intentos_fallidos integer,
    cre_ultimo_login timestamp without time zone,
    cre_tiempo_bloqueo timestamp without time zone,
    usu_contrasena character varying(225),
    id_usuario integer NOT NULL
);


ALTER TABLE public.credenciales OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 28444)
-- Name: credenciales_id_credenciales_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credenciales_id_credenciales_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.credenciales_id_credenciales_seq OWNER TO postgres;

--
-- TOC entry 5264 (class 0 OID 0)
-- Dependencies: 241
-- Name: credenciales_id_credenciales_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credenciales_id_credenciales_seq OWNED BY public.credenciales.id_credenciales;


--
-- TOC entry 220 (class 1259 OID 28270)
-- Name: departamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamento (
    id_departamento integer NOT NULL,
    dep_nombre character varying(50) NOT NULL
);


ALTER TABLE public.departamento OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 28269)
-- Name: departamento_id_departamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamento_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamento_id_departamento_seq OWNER TO postgres;

--
-- TOC entry 5265 (class 0 OID 0)
-- Dependencies: 219
-- Name: departamento_id_departamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamento_id_departamento_seq OWNED BY public.departamento.id_departamento;


--
-- TOC entry 232 (class 1259 OID 28370)
-- Name: dependencia_impacto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dependencia_impacto (
    id_dependencia_impacto integer NOT NULL,
    dpo_dependencias text,
    dpo_impacto text,
    dpo_nivel_impacto public.impacto,
    dpo_congenitas text
);


ALTER TABLE public.dependencia_impacto OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 28369)
-- Name: dependencia_impacto_id_dependencia_impacto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dependencia_impacto_id_dependencia_impacto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dependencia_impacto_id_dependencia_impacto_seq OWNER TO postgres;

--
-- TOC entry 5266 (class 0 OID 0)
-- Dependencies: 231
-- Name: dependencia_impacto_id_dependencia_impacto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dependencia_impacto_id_dependencia_impacto_seq OWNED BY public.dependencia_impacto.id_dependencia_impacto;


--
-- TOC entry 244 (class 1259 OID 28458)
-- Name: equipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipos (
    id_equipos integer NOT NULL,
    eqp_version character varying(25) NOT NULL,
    eqp_nombre_host character varying(50) CONSTRAINT equipos_eqp_nombre_not_null NOT NULL,
    eqp_tipo_equipo public.tipo_equipo NOT NULL,
    eqp_en_linea public.en_linea NOT NULL,
    eqp_fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    eqp_modelo character varying(25),
    eqp_marca character varying(25),
    eqp_estructura public.estructura,
    id_campana integer
);


ALTER TABLE public.equipos OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 28457)
-- Name: equipos_id_equipos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipos_id_equipos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipos_id_equipos_seq OWNER TO postgres;

--
-- TOC entry 5267 (class 0 OID 0)
-- Dependencies: 243
-- Name: equipos_id_equipos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipos_id_equipos_seq OWNED BY public.equipos.id_equipos;


--
-- TOC entry 252 (class 1259 OID 28619)
-- Name: historial_sistema; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_sistema (
    id_historial_sistema integer NOT NULL,
    his_accion character varying(100),
    his_fecha_hora timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_usuario integer NOT NULL,
    id_campana integer CONSTRAINT historial_sistema_id_site_not_null NOT NULL
);


ALTER TABLE public.historial_sistema OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 28618)
-- Name: historial_sistema_id_historial_sistema_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_sistema_id_historial_sistema_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_sistema_id_historial_sistema_seq OWNER TO postgres;

--
-- TOC entry 5268 (class 0 OID 0)
-- Dependencies: 251
-- Name: historial_sistema_id_historial_sistema_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_sistema_id_historial_sistema_seq OWNED BY public.historial_sistema.id_historial_sistema;


--
-- TOC entry 246 (class 1259 OID 28472)
-- Name: hoja_de_vida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hoja_de_vida (
    id_hoja_de_vida integer NOT NULL,
    hdv_activo public.activo_hoja NOT NULL,
    hdv_disponibilidad public.disponibilidad_equipo NOT NULL,
    hdv_fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_equipos integer NOT NULL,
    id_caracteristicas_tecnicas integer NOT NULL,
    id_campana integer NOT NULL,
    id_proveedor integer NOT NULL,
    id_usuario integer NOT NULL
);


ALTER TABLE public.hoja_de_vida OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 28471)
-- Name: hoja_de_vida_id_hoja_de_vida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hoja_de_vida_id_hoja_de_vida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hoja_de_vida_id_hoja_de_vida_seq OWNER TO postgres;

--
-- TOC entry 5269 (class 0 OID 0)
-- Dependencies: 245
-- Name: hoja_de_vida_id_hoja_de_vida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hoja_de_vida_id_hoja_de_vida_seq OWNED BY public.hoja_de_vida.id_hoja_de_vida;


--
-- TOC entry 250 (class 1259 OID 28564)
-- Name: instalador_responsable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instalador_responsable (
    id_instalador_responsable integer NOT NULL,
    inr_nombre character varying(50) NOT NULL,
    id_proveedor integer,
    inr_apellido character varying(50),
    inr_telefono character varying(15),
    CONSTRAINT inr_telefono CHECK ((((inr_telefono)::text ~ '^\+?[0-9]+$'::text) AND (length((inr_telefono)::text) >= 7)))
);


ALTER TABLE public.instalador_responsable OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 28563)
-- Name: instalador_responsable_id_instalador_responsable_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.instalador_responsable_id_instalador_responsable_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instalador_responsable_id_instalador_responsable_seq OWNER TO postgres;

--
-- TOC entry 5270 (class 0 OID 0)
-- Dependencies: 249
-- Name: instalador_responsable_id_instalador_responsable_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.instalador_responsable_id_instalador_responsable_seq OWNED BY public.instalador_responsable.id_instalador_responsable;


--
-- TOC entry 248 (class 1259 OID 28508)
-- Name: mantenimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mantenimiento (
    id_mantenimiento integer CONSTRAINT manteniemiento_id_mantenimiento_not_null NOT NULL,
    mto_tipo public.tipo_mantenimiento CONSTRAINT manteniemiento_mto_tipo_not_null NOT NULL,
    mto_descripcion text CONSTRAINT manteniemiento_mto_descripcion_not_null NOT NULL,
    mto_fecha timestamp without time zone,
    id_hoja_de_vida integer,
    id_usuario integer
);


ALTER TABLE public.mantenimiento OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 28507)
-- Name: manteniemiento_id_mantenimiento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.manteniemiento_id_mantenimiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.manteniemiento_id_mantenimiento_seq OWNER TO postgres;

--
-- TOC entry 5271 (class 0 OID 0)
-- Dependencies: 247
-- Name: manteniemiento_id_mantenimiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.manteniemiento_id_mantenimiento_seq OWNED BY public.mantenimiento.id_mantenimiento;


--
-- TOC entry 230 (class 1259 OID 28351)
-- Name: proveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedor (
    id_proveedor integer NOT NULL,
    pro_nombre character varying(50) NOT NULL,
    pro_razon_social character varying(50) CONSTRAINT proveedor_pro_apellido_not_null NOT NULL,
    pro_telefono_1 character varying(11) NOT NULL,
    pro_telefono_2 character varying(11),
    pro_correo character varying(50) NOT NULL,
    pro_tiempo_garantia character varying NOT NULL,
    pro_fecha_entrega timestamp with time zone NOT NULL,
    pro_fecha_finalizacion date NOT NULL,
    CONSTRAINT chk_telefono_valido CHECK ((((pro_telefono_1)::text ~ '^\+?[0-9]+$'::text) AND (length((pro_telefono_1)::text) >= 7) AND ((pro_telefono_2 IS NULL) OR (((pro_telefono_2)::text ~ '^\+?[0-9]+$'::text) AND (length((pro_telefono_2)::text) >= 7)))))
);


ALTER TABLE public.proveedor OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 28350)
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedor_id_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedor_id_proveedor_seq OWNER TO postgres;

--
-- TOC entry 5272 (class 0 OID 0)
-- Dependencies: 229
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedor_id_proveedor_seq OWNED BY public.proveedor.id_proveedor;


--
-- TOC entry 240 (class 1259 OID 28429)
-- Name: rest_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rest_token (
    id_rest_token integer NOT NULL,
    res_token character varying(50) NOT NULL,
    res_estado public.estado_token NOT NULL,
    res_fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_usuario integer
);


ALTER TABLE public.rest_token OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 28428)
-- Name: rest_token_id_rest_token_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rest_token_id_rest_token_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rest_token_id_rest_token_seq OWNER TO postgres;

--
-- TOC entry 5273 (class 0 OID 0)
-- Dependencies: 239
-- Name: rest_token_id_rest_token_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rest_token_id_rest_token_seq OWNED BY public.rest_token.id_rest_token;


--
-- TOC entry 236 (class 1259 OID 28402)
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    rol_nombre character varying(25) NOT NULL
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 28401)
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_rol_seq OWNER TO postgres;

--
-- TOC entry 5274 (class 0 OID 0)
-- Dependencies: 235
-- Name: rol_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_rol_seq OWNED BY public.rol.id_rol;


--
-- TOC entry 226 (class 1259 OID 28311)
-- Name: site; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.site (
    id_site integer NOT NULL,
    id_ubicacion integer NOT NULL,
    sit_nombre character varying(15)
);


ALTER TABLE public.site OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 28310)
-- Name: site_id_site_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.site_id_site_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.site_id_site_seq OWNER TO postgres;

--
-- TOC entry 5275 (class 0 OID 0)
-- Dependencies: 225
-- Name: site_id_site_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.site_id_site_seq OWNED BY public.site.id_site;


--
-- TOC entry 254 (class 1259 OID 28667)
-- Name: switch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.switch (
    id_switch integer NOT NULL,
    swt_direccion_ip character varying(100) NOT NULL,
    swt_hostname character varying(50) NOT NULL,
    swt_modelo character varying(50),
    id_hoja_de_vida integer NOT NULL
);


ALTER TABLE public.switch OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 28666)
-- Name: switch_id_switch_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.switch_id_switch_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.switch_id_switch_seq OWNER TO postgres;

--
-- TOC entry 5276 (class 0 OID 0)
-- Dependencies: 253
-- Name: switch_id_switch_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.switch_id_switch_seq OWNED BY public.switch.id_switch;


--
-- TOC entry 224 (class 1259 OID 28293)
-- Name: ubicacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ubicacion (
    id_ubicacion integer NOT NULL,
<<<<<<< HEAD
    ubi_localidad_municipio character varying NOT NULL,
    ubi_barrio character varying(50) NOT NULL,
=======
    ubi_ubi_localidad_municipio_municipio character varying NOT NULL,
    ubi_ubi_barrio character varying(50) NOT NULL,
>>>>>>> origin/alejandra
    ubi_tipo_via public.tipo_via CONSTRAINT ubicacion_ubi_calle_not_null NOT NULL,
    ubi_numero character varying(50),
    id_ciudad integer
);


ALTER TABLE public.ubicacion OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 28292)
-- Name: ubicacion_id_ubicacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ubicacion_id_ubicacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ubicacion_id_ubicacion_seq OWNER TO postgres;

--
-- TOC entry 5277 (class 0 OID 0)
-- Dependencies: 223
-- Name: ubicacion_id_ubicacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ubicacion_id_ubicacion_seq OWNED BY public.ubicacion.id_ubicacion;


--
-- TOC entry 238 (class 1259 OID 28411)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    usu_nombre character varying(50) NOT NULL,
    usu_apellido character varying(50) NOT NULL,
    usu_correo character varying(50) NOT NULL,
    usu_telefono character varying(11) NOT NULL,
    id_rol integer NOT NULL,
    id_campana INTEGER NOT NULL,
    CONSTRAINT chl_telefono_valido CHECK ((((usu_telefono)::text ~ '^[0-9]+$'::text) AND (length((usu_telefono)::text) >= 7)))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 28410)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5278 (class 0 OID 0)
-- Dependencies: 237
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 4977 (class 2604 OID 28327)
-- Name: campana id_campana; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campana ALTER COLUMN id_campana SET DEFAULT nextval('public.campana_id_campana_seq'::regclass);


--
-- TOC entry 4980 (class 2604 OID 28383)
-- Name: caracteristicas_tecnicas id_caracteristicas_tecnicas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas_tecnicas ALTER COLUMN id_caracteristicas_tecnicas SET DEFAULT nextval('public.caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq'::regclass);


--
-- TOC entry 4974 (class 2604 OID 28282)
-- Name: ciudad id_ciudad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad ALTER COLUMN id_ciudad SET DEFAULT nextval('public.ciudad_id_ciudad_seq'::regclass);


--
-- TOC entry 4986 (class 2604 OID 28448)
-- Name: credenciales id_credenciales; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credenciales ALTER COLUMN id_credenciales SET DEFAULT nextval('public.credenciales_id_credenciales_seq'::regclass);


--
-- TOC entry 4973 (class 2604 OID 28273)
-- Name: departamento id_departamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamento_id_departamento_seq'::regclass);


--
-- TOC entry 4979 (class 2604 OID 28373)
-- Name: dependencia_impacto id_dependencia_impacto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependencia_impacto ALTER COLUMN id_dependencia_impacto SET DEFAULT nextval('public.dependencia_impacto_id_dependencia_impacto_seq'::regclass);


--
-- TOC entry 4987 (class 2604 OID 28461)
-- Name: equipos id_equipos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos ALTER COLUMN id_equipos SET DEFAULT nextval('public.equipos_id_equipos_seq'::regclass);


--
-- TOC entry 4993 (class 2604 OID 28622)
-- Name: historial_sistema id_historial_sistema; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sistema ALTER COLUMN id_historial_sistema SET DEFAULT nextval('public.historial_sistema_id_historial_sistema_seq'::regclass);


--
-- TOC entry 4989 (class 2604 OID 28475)
-- Name: hoja_de_vida id_hoja_de_vida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida ALTER COLUMN id_hoja_de_vida SET DEFAULT nextval('public.hoja_de_vida_id_hoja_de_vida_seq'::regclass);


--
-- TOC entry 4992 (class 2604 OID 28567)
-- Name: instalador_responsable id_instalador_responsable; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instalador_responsable ALTER COLUMN id_instalador_responsable SET DEFAULT nextval('public.instalador_responsable_id_instalador_responsable_seq'::regclass);


--
-- TOC entry 4991 (class 2604 OID 28511)
-- Name: mantenimiento id_mantenimiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mantenimiento ALTER COLUMN id_mantenimiento SET DEFAULT nextval('public.manteniemiento_id_mantenimiento_seq'::regclass);


--
-- TOC entry 4978 (class 2604 OID 28354)
-- Name: proveedor id_proveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor ALTER COLUMN id_proveedor SET DEFAULT nextval('public.proveedor_id_proveedor_seq'::regclass);


--
-- TOC entry 4984 (class 2604 OID 28432)
-- Name: rest_token id_rest_token; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rest_token ALTER COLUMN id_rest_token SET DEFAULT nextval('public.rest_token_id_rest_token_seq'::regclass);


--
-- TOC entry 4982 (class 2604 OID 28405)
-- Name: rol id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);


--
-- TOC entry 4976 (class 2604 OID 28314)
-- Name: site id_site; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site ALTER COLUMN id_site SET DEFAULT nextval('public.site_id_site_seq'::regclass);


--
-- TOC entry 4995 (class 2604 OID 28670)
-- Name: switch id_switch; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.switch ALTER COLUMN id_switch SET DEFAULT nextval('public.switch_id_switch_seq'::regclass);


--
-- TOC entry 4975 (class 2604 OID 28296)
-- Name: ubicacion id_ubicacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ubicacion ALTER COLUMN id_ubicacion SET DEFAULT nextval('public.ubicacion_id_ubicacion_seq'::regclass);


--
-- TOC entry 4983 (class 2604 OID 28414)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 5229 (class 0 OID 28324)
-- Dependencies: 228
-- Data for Name: campana; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campana (id_campana, cam_nombre_campana, id_site) FROM stdin;
<<<<<<< HEAD
1	campaña 2	1
=======
1	campaña 2	
>>>>>>> origin/alejandra
2	claro	2
\.


--
-- TOC entry 5235 (class 0 OID 28380)
-- Dependencies: 234
-- Data for Name: caracteristicas_tecnicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.caracteristicas_tecnicas (id_caracteristicas_tecnicas, crt_procesador, crt_memoria_nvra, crt_version_firmware, crt_sistema_operativo, crt_respaldo, crt_funciones, id_dependencia_impacto) FROM stdin;
1	Intel Core i7	16GB	v2.4.1	Ubuntu 22.04	t	Control de tráfico	1
4	Interl core i5	MRam	0.163782	Windows	t	Tiene x y y función	2
6	interl core i7	16gGB	v2,6278	wimdows 11	f	control de nose	3
\.


--
-- TOC entry 5223 (class 0 OID 28279)
-- Dependencies: 222
-- Data for Name: ciudad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ciudad (id_ciudad, ciu_nombre, id_departamento) FROM stdin;
1	Leticia	1
2	Puerto Nariño	1
3	Medellín	2
4	Envigado	2
5	Itagüí	2
6	Bello	2
7	Rionegro	2
8	Apartadó	2
9	Turbo	2
10	Caucasia	2
11	Arauca	3
12	Tame	3
13	Saravena	3
14	Barranquilla	4
15	Soledad	4
16	Malambo	4
17	Sabanalarga	4
18	Puerto Colombia	4
19	Cartagena	5
20	Magangué	5
21	El Carmen de Bolívar	5
22	Turbaco	5
23	Tunja	6
24	Duitama	6
25	Sogamoso	6
26	Chiquinquirá	6
27	Paipa	6
28	Manizales	7
29	La Dorada	7
30	Villamaría	7
31	Anserma	7
32	Florencia	8
33	San Vicente del Caguán	8
34	Puerto Rico	8
35	Yopal	9
36	Aguazul	9
37	Villanueva	9
38	Paz de Ariporo	9
39	Popayán	10
40	Santander de Quilichao	10
41	Puerto Tejada	10
42	Patía	10
43	Valledupar	11
44	Aguachica	11
45	Agustín Codazzi	11
46	Bosconia	11
47	Quibdó	12
48	Istmina	12
49	Condoto	12
50	Nuquí	12
51	Montería	13
52	Cereté	13
53	Sahagún	13
54	Lorica	13
55	Montelíbano	13
56	Bogotá	14
57	Soacha	14
58	Facatativá	14
59	Chía	14
60	Zipaquirá	14
61	Fusagasugá	14
62	Inírida	15
63	San José del Guaviare	16
64	El Retorno	16
65	Neiva	17
66	Pitalito	17
67	Garzón	17
68	La Plata	17
69	Riohacha	18
70	Maicao	18
71	Uribia	18
72	San Juan del Cesar	18
73	Santa Marta	19
74	Ciénaga	19
75	Fundación	19
76	El Banco	19
77	Villavicencio	20
78	Acacías	20
79	Granada	20
80	Puerto López	20
81	Pasto	21
82	Tumaco	21
83	Ipiales	21
84	Túquerres	21
85	Cúcuta	22
86	Ocaña	22
87	Villa del Rosario	22
88	Pamplona	22
89	Mocoa	23
90	Puerto Asís	23
91	Valle del Guamuez	23
92	Armenia	24
93	Calarcá	24
94	Montenegro	24
95	Quimbaya	24
96	Pereira	25
97	Dosquebradas	25
98	Santa Rosa de Cabal	25
99	San Andrés	26
100	Providencia	26
101	Bucaramanga	27
102	Floridablanca	27
103	Girón	27
104	Piedecuesta	27
105	Barrancabermeja	27
106	Sincelejo	28
107	Corozal	28
108	San Marcos	28
109	Tolú	28
110	Ibagué	29
111	Espinal	29
112	Melgar	29
113	Mariquita	29
114	Honda	29
115	Cali	30
116	Buenaventura	30
117	Palmira	30
118	Tuluá	30
119	Cartago	30
120	Buga	30
121	Jamundí	30
122	Mitú	31
123	Puerto Carreño	32
124	La Primavera	32
\.


--
-- TOC entry 5243 (class 0 OID 28445)
-- Dependencies: 242
-- Data for Name: credenciales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credenciales (id_credenciales, cre_intentos_fallidos, cre_ultimo_login, cre_tiempo_bloqueo, usu_contrasena, id_usuario) FROM stdin;
3	3	\N	2026-01-29 09:55:48.67	$2b$10$bpVmaRdWSNS.WeFUtZNL0u3Jl1zgv4RNgB1z23/IlPvG5M9/y5Req	3
4	0	2026-01-29 11:40:21.657938	\N	$2b$10$e0jSc05t/50wyj5ANQMOs.lDfWO/VG/mkg2PoEJlrT8Orymm6.DF.	15
7	0	2026-01-29 12:28:09.751201	\N	$2b$10$koQvmJ14rWLkLMezX2XO8.tpx68VmrNxgGMoc7O88mysMfQ/7kEgG	31
\.


--
-- TOC entry 5221 (class 0 OID 28270)
-- Dependencies: 220
-- Data for Name: departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamento (id_departamento, dep_nombre) FROM stdin;
1	Amazonas
2	Antioquia
3	Arauca
4	Atlántico
5	Bolívar
6	Boyacá
7	Caldas
8	Caquetá
9	Casanare
10	Cauca
11	Cesar
12	Chocó
13	Córdoba
14	Cundinamarca
15	Guainía
16	Guaviare
17	Huila
18	La Guajira
19	Magdalena
20	Meta
21	Nariño
22	Norte de Santander
23	Putumayo
24	Quindío
25	Risaralda
26	San Andrés y Providencia
27	Santander
28	Sucre
29	Tolima
30	Valle del Cauca
31	Vaupés
32	Vichada
\.


--
-- TOC entry 5233 (class 0 OID 28370)
-- Dependencies: 232
-- Data for Name: dependencia_impacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dependencia_impacto (id_dependencia_impacto, dpo_dependencias, dpo_impacto, dpo_nivel_impacto, dpo_congenitas) FROM stdin;
1	Depende de un hilo	grande	Alto	Riesgo de afectación por humedad
2	Depedende de un hiloooooo	si hay un impacto	Alto	Alteración estructural
3	dependencia	impactante	Alto	peligro peligroso
\.


--
-- TOC entry 5245 (class 0 OID 28458)
-- Dependencies: 244
-- Data for Name: equipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipos (id_equipos, eqp_version, eqp_nombre_host, eqp_tipo_equipo, eqp_en_linea, eqp_fecha_registro, eqp_modelo, eqp_marca, eqp_estructura, id_campana) FROM stdin;
1	198hbm9	mini_split	Firewall	Online	2026-01-25 00:00:00	valor A	Lg	Gabinete	1
2	109800h	mini_split	Firewall	offline	2026-01-25 00:00:00	valor b	Lg	Gabinete	1
3	1	nombre_host	Firewall	offline	2026-01-26 00:00:00	valor b	samsung	Gabinete	1
\.


--
-- TOC entry 5253 (class 0 OID 28619)
-- Dependencies: 252
-- Data for Name: historial_sistema; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial_sistema (id_historial_sistema, his_accion, his_fecha_hora, id_usuario, id_campana) FROM stdin;
3	Inicio de sesión	2026-02-26 00:00:00	5	1
5	Cambio rol	2026-01-26 00:00:00	6	1
6	Cambio detectado	2026-01-26 12:43:15.577994	5	1
\.


--
-- TOC entry 5247 (class 0 OID 28472)
-- Dependencies: 246
-- Data for Name: hoja_de_vida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hoja_de_vida (id_hoja_de_vida, hdv_activo, hdv_disponibilidad, hdv_fecha_creacion, id_equipos, id_caracteristicas_tecnicas, id_campana, id_proveedor, id_usuario) FROM stdin;
7	Activo	Disponibilidad	2026-01-24 00:00:00	1	1	1	2	5
12	Baja	Asignado	2026-01-26 00:00:00	2	4	1	2	5
36	Activo	En mantenimiento	2026-01-26 00:00:00	3	6	1	2	5
\.


--
-- TOC entry 5251 (class 0 OID 28564)
-- Dependencies: 250
-- Data for Name: instalador_responsable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instalador_responsable (id_instalador_responsable, inr_nombre, id_proveedor, inr_apellido, inr_telefono) FROM stdin;
3	Luis	\N	Carlos	31214509309
4	Luis	2	Carlos	3114202098
\.


--
-- TOC entry 5249 (class 0 OID 28508)
-- Dependencies: 248
-- Data for Name: mantenimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mantenimiento (id_mantenimiento, mto_tipo, mto_descripcion, mto_fecha, id_hoja_de_vida, id_usuario) FROM stdin;
\.


--
-- TOC entry 5231 (class 0 OID 28351)
-- Dependencies: 230
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedor (id_proveedor, pro_nombre, pro_razon_social, pro_telefono_1, pro_telefono_2, pro_correo, pro_tiempo_garantia, pro_fecha_entrega, pro_fecha_finalizacion) FROM stdin;
2	Sistemas	Globales S.A.	3101234567	+3144455662	ventas@sistemasglobales.com	36 meses	2025-12-01 00:00:00-05	2028-12-01
3	Founderver	Pounderver tenologies S.A.S	3009684651	\N	founderv132@teno.co.com	6 meses	2026-01-28 00:00:00-05	2026-07-28
4	Dell	DELL S.A	02238492091	383618920	dellas@gmail.com	12 meses	2026-01-27 00:00:00-05	2027-01-27
\.


--
-- TOC entry 5241 (class 0 OID 28429)
-- Dependencies: 240
-- Data for Name: rest_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rest_token (id_rest_token, res_token, res_estado, res_fecha, id_usuario) FROM stdin;
\.


--
-- TOC entry 5237 (class 0 OID 28402)
-- Dependencies: 236
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (id_rol, rol_nombre) FROM stdin;
1	Administrador
2	Gestor
3	Lector
\.


--
-- TOC entry 5227 (class 0 OID 28311)
-- Dependencies: 226
-- Data for Name: site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.site (id_site, id_ubicacion, sit_nombre) FROM stdin;
1	1	Site callcenter
2	2	site 7
\.


--
-- TOC entry 5255 (class 0 OID 28667)
-- Dependencies: 254
-- Data for Name: switch; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.switch (id_switch, swt_direccion_ip, swt_hostname, swt_modelo, id_hoja_de_vida) FROM stdin;
\.


--
-- TOC entry 5225 (class 0 OID 28293)
-- Dependencies: 224
-- Data for Name: ubicacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

<<<<<<< HEAD
COPY public.ubicacion (id_ubicacion, ubi_localidad_municipio, ubi_barrio, ubi_tipo_via, ubi_numero, id_ciudad) FROM stdin;
=======
COPY public.ubicacion (id_ubicacion, ubi_ubi_localidad_municipio_municipio, ubi_ubi_barrio, ubi_tipo_via, ubi_numero, id_ciudad) FROM stdin;
>>>>>>> origin/alejandra
1	Bose	La libertad	Calle	9	56
2	Comuna 13	luis miguel	Calle	9	3
\.


--
-- TOC entry 5239 (class 0 OID 28411)
-- Dependencies: 238
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_usuario, usu_nombre, usu_apellido, usu_correo, usu_telefono, id_rol) FROM stdin;
5	Victor	Perez	v1htyhugo@gmail.com	3225698098	2
6	Deiber	Peñalosa	peñ1dmi920@gmail.com	3157405678	1
7	Alandra	Flores	malejam51@gmail.com	31574679878	3
3	Dayana	Contreras	daynacont@gmail.com	3154278901	1
15	Daniel	Hernandez	daniel@gmail.com	34556780910	2
16	Axelito	Mendoza	axelito.mendoza@gmail.com	3007371429	1
28	Juan	Gomez	kosmos@gmail.com	31156780910	2
31	Rebecca	Maldonado	rebeccaliebre@gmail.com	3245678906	3
\.


--
-- TOC entry 5279 (class 0 OID 0)
-- Dependencies: 227
-- Name: campana_id_campana_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campana_id_campana_seq', 2, true);


--
-- TOC entry 5280 (class 0 OID 0)
-- Dependencies: 233
-- Name: caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.caracteristicas_tecnicas_id_caracteristicas_tecnicas_seq', 6, true);


--
-- TOC entry 5281 (class 0 OID 0)
-- Dependencies: 221
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciudad_id_ciudad_seq', 124, true);


--
-- TOC entry 5282 (class 0 OID 0)
-- Dependencies: 241
-- Name: credenciales_id_credenciales_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credenciales_id_credenciales_seq', 7, true);


--
-- TOC entry 5283 (class 0 OID 0)
-- Dependencies: 219
-- Name: departamento_id_departamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamento_id_departamento_seq', 32, true);


--
-- TOC entry 5284 (class 0 OID 0)
-- Dependencies: 231
-- Name: dependencia_impacto_id_dependencia_impacto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dependencia_impacto_id_dependencia_impacto_seq', 3, true);


--
-- TOC entry 5285 (class 0 OID 0)
-- Dependencies: 243
-- Name: equipos_id_equipos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipos_id_equipos_seq', 3, true);


--
-- TOC entry 5286 (class 0 OID 0)
-- Dependencies: 251
-- Name: historial_sistema_id_historial_sistema_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historial_sistema_id_historial_sistema_seq', 6, true);


--
-- TOC entry 5287 (class 0 OID 0)
-- Dependencies: 245
-- Name: hoja_de_vida_id_hoja_de_vida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hoja_de_vida_id_hoja_de_vida_seq', 42, true);


--
-- TOC entry 5288 (class 0 OID 0)
-- Dependencies: 249
-- Name: instalador_responsable_id_instalador_responsable_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.instalador_responsable_id_instalador_responsable_seq', 4, true);


--
-- TOC entry 5289 (class 0 OID 0)
-- Dependencies: 247
-- Name: manteniemiento_id_mantenimiento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.manteniemiento_id_mantenimiento_seq', 7, true);


--
-- TOC entry 5290 (class 0 OID 0)
-- Dependencies: 229
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedor_id_proveedor_seq', 5, true);


--
-- TOC entry 5291 (class 0 OID 0)
-- Dependencies: 239
-- Name: rest_token_id_rest_token_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rest_token_id_rest_token_seq', 1, false);


--
-- TOC entry 5292 (class 0 OID 0)
-- Dependencies: 235
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_rol_seq', 6, true);


--
-- TOC entry 5293 (class 0 OID 0)
-- Dependencies: 225
-- Name: site_id_site_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.site_id_site_seq', 2, true);


--
-- TOC entry 5294 (class 0 OID 0)
-- Dependencies: 253
-- Name: switch_id_switch_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.switch_id_switch_seq', 1, false);


--
-- TOC entry 5295 (class 0 OID 0)
-- Dependencies: 223
-- Name: ubicacion_id_ubicacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ubicacion_id_ubicacion_seq', 2, true);


--
-- TOC entry 5296 (class 0 OID 0)
-- Dependencies: 237
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 32, true);


--
-- TOC entry 5008 (class 2606 OID 28331)
-- Name: campana campana_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campana
    ADD CONSTRAINT campana_pkey PRIMARY KEY (id_campana);


--
-- TOC entry 5016 (class 2606 OID 28395)
-- Name: caracteristicas_tecnicas caracteristicas_tecnicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas_tecnicas
    ADD CONSTRAINT caracteristicas_tecnicas_pkey PRIMARY KEY (id_caracteristicas_tecnicas);


--
-- TOC entry 5037 (class 2606 OID 28534)
-- Name: hoja_de_vida caracteristicas_unicas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT caracteristicas_unicas UNIQUE (id_caracteristicas_tecnicas);


--
-- TOC entry 5002 (class 2606 OID 28286)
-- Name: ciudad ciudad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT ciudad_pkey PRIMARY KEY (id_ciudad);


--
-- TOC entry 5025 (class 2606 OID 28540)
-- Name: usuario correo_unico; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT correo_unico UNIQUE (usu_correo);


--
-- TOC entry 5031 (class 2606 OID 28451)
-- Name: credenciales credenciales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credenciales
    ADD CONSTRAINT credenciales_pkey PRIMARY KEY (id_credenciales);


--
-- TOC entry 5000 (class 2606 OID 28277)
-- Name: departamento departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id_departamento);


--
-- TOC entry 5014 (class 2606 OID 28378)
-- Name: dependencia_impacto dependencia_impacto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dependencia_impacto
    ADD CONSTRAINT dependencia_impacto_pkey PRIMARY KEY (id_dependencia_impacto);


--
-- TOC entry 5039 (class 2606 OID 28538)
-- Name: hoja_de_vida equipo_unico; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT equipo_unico UNIQUE (id_equipos);


--
-- TOC entry 5035 (class 2606 OID 28469)
-- Name: equipos equipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_pkey PRIMARY KEY (id_equipos);


--
-- TOC entry 5047 (class 2606 OID 28628)
-- Name: historial_sistema historial_sistema_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sistema
    ADD CONSTRAINT historial_sistema_pkey PRIMARY KEY (id_historial_sistema);


--
-- TOC entry 5041 (class 2606 OID 28481)
-- Name: hoja_de_vida hoja_de_vida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_pkey PRIMARY KEY (id_hoja_de_vida);


--
-- TOC entry 5018 (class 2606 OID 28532)
-- Name: caracteristicas_tecnicas idependencia_impacto_unico; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas_tecnicas
    ADD CONSTRAINT idependencia_impacto_unico UNIQUE (id_dependencia_impacto);


--
-- TOC entry 5045 (class 2606 OID 28571)
-- Name: instalador_responsable instalador_responsable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instalador_responsable
    ADD CONSTRAINT instalador_responsable_pkey PRIMARY KEY (id_instalador_responsable);


--
-- TOC entry 5043 (class 2606 OID 28519)
-- Name: mantenimiento manteniemiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mantenimiento
    ADD CONSTRAINT manteniemiento_pkey PRIMARY KEY (id_mantenimiento);


--
-- TOC entry 5010 (class 2606 OID 28368)
-- Name: proveedor proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (id_proveedor);


--
-- TOC entry 5012 (class 2606 OID 28545)
-- Name: proveedor razon_social_unica; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT razon_social_unica UNIQUE (pro_razon_social);


--
-- TOC entry 5029 (class 2606 OID 28438)
-- Name: rest_token rest_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rest_token
    ADD CONSTRAINT rest_token_pkey PRIMARY KEY (id_rest_token);


--
-- TOC entry 5021 (class 2606 OID 28527)
-- Name: rol rol_nombre_unico; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_nombre_unico UNIQUE (rol_nombre);


--
-- TOC entry 5023 (class 2606 OID 28409)
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 5006 (class 2606 OID 28317)
-- Name: site site_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site
    ADD CONSTRAINT site_pkey PRIMARY KEY (id_site);


--
-- TOC entry 5049 (class 2606 OID 28676)
-- Name: switch switch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.switch
    ADD CONSTRAINT switch_pkey PRIMARY KEY (id_switch);


--
-- TOC entry 5004 (class 2606 OID 28304)
-- Name: ubicacion ubicacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ubicacion
    ADD CONSTRAINT ubicacion_pkey PRIMARY KEY (id_ubicacion);


--
-- TOC entry 5033 (class 2606 OID 28715)
-- Name: credenciales unique_usuario_credenciales; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credenciales
    ADD CONSTRAINT unique_usuario_credenciales UNIQUE (id_usuario);


--
-- TOC entry 5027 (class 2606 OID 28422)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 5019 (class 1259 OID 28528)
-- Name: idx_rol_nombre_unico_ci; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_rol_nombre_unico_ci ON public.rol USING btree (lower((rol_nombre)::text));


--
-- TOC entry 5070 (class 2620 OID 28650)
-- Name: hoja_de_vida tg_registrar_historial_his; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tg_registrar_historial_his AFTER INSERT OR UPDATE ON public.hoja_de_vida FOR EACH ROW EXECUTE FUNCTION public.funcion_grabar_historial();


--
-- TOC entry 5071 (class 2620 OID 28689)
-- Name: hoja_de_vida trg_permisos_hoja_de_vida; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_permisos_hoja_de_vida BEFORE INSERT OR UPDATE ON public.hoja_de_vida FOR EACH ROW EXECUTE FUNCTION public.validar_permisos_usuario();


--
-- TOC entry 5072 (class 2620 OID 28690)
-- Name: mantenimiento trg_permisos_mantenimiento; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_permisos_mantenimiento BEFORE INSERT OR UPDATE ON public.mantenimiento FOR EACH ROW EXECUTE FUNCTION public.validar_permisos_usuario();


--
-- TOC entry 5053 (class 2606 OID 28332)
-- Name: campana campana_id_site_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campana
    ADD CONSTRAINT campana_id_site_fkey FOREIGN KEY (id_site) REFERENCES public.site(id_site) ON DELETE RESTRICT;


--
-- TOC entry 5054 (class 2606 OID 28396)
-- Name: caracteristicas_tecnicas caracteristicas_tecnicas_id_dependencia_impacto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas_tecnicas
    ADD CONSTRAINT caracteristicas_tecnicas_id_dependencia_impacto_fkey FOREIGN KEY (id_dependencia_impacto) REFERENCES public.dependencia_impacto(id_dependencia_impacto) ON DELETE RESTRICT;


--
-- TOC entry 5050 (class 2606 OID 28287)
-- Name: ciudad ciudad_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT ciudad_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento) ON DELETE RESTRICT;


--
-- TOC entry 5057 (class 2606 OID 28452)
-- Name: credenciales credenciales_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credenciales
    ADD CONSTRAINT credenciales_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT;


--
-- TOC entry 5059 (class 2606 OID 28651)
-- Name: hoja_de_vida fk_hoja_vida_campana; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT fk_hoja_vida_campana FOREIGN KEY (id_campana) REFERENCES public.campana(id_campana);


--
-- TOC entry 5067 (class 2606 OID 28634)
-- Name: historial_sistema fk_site_historial; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sistema
    ADD CONSTRAINT fk_site_historial FOREIGN KEY (id_campana) REFERENCES public.site(id_site) ON DELETE RESTRICT;


--
-- TOC entry 5069 (class 2606 OID 28677)
-- Name: switch fk_switch; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.switch
    ADD CONSTRAINT fk_switch FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) ON DELETE RESTRICT;


--
-- TOC entry 5068 (class 2606 OID 28629)
-- Name: historial_sistema fk_usuario_historial; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sistema
    ADD CONSTRAINT fk_usuario_historial FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT;


--
-- TOC entry 5060 (class 2606 OID 28612)
-- Name: hoja_de_vida fk_usuario_hoja; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT fk_usuario_hoja FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 5061 (class 2606 OID 28487)
-- Name: hoja_de_vida hoja_de_vida_id_caracteristicas_tecnicas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_caracteristicas_tecnicas_fkey FOREIGN KEY (id_caracteristicas_tecnicas) REFERENCES public.caracteristicas_tecnicas(id_caracteristicas_tecnicas) ON DELETE RESTRICT;


--
-- TOC entry 5062 (class 2606 OID 28482)
-- Name: hoja_de_vida hoja_de_vida_id_equipos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_equipos_fkey FOREIGN KEY (id_equipos) REFERENCES public.equipos(id_equipos) ON DELETE RESTRICT;


--
-- TOC entry 5063 (class 2606 OID 28502)
-- Name: hoja_de_vida hoja_de_vida_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor) ON DELETE RESTRICT;


--
-- TOC entry 5058 (class 2606 OID 28661)
-- Name: equipos id_equipos_fk_id_campana; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT id_equipos_fk_id_campana FOREIGN KEY (id_campana) REFERENCES public.campana(id_campana);


--
-- TOC entry 5066 (class 2606 OID 28572)
-- Name: instalador_responsable instalador_responsable_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instalador_responsable
    ADD CONSTRAINT instalador_responsable_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor) ON DELETE RESTRICT;


--
-- TOC entry 5064 (class 2606 OID 28520)
-- Name: mantenimiento manteniemiento_id_hoja_de_vida_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mantenimiento
    ADD CONSTRAINT manteniemiento_id_hoja_de_vida_fkey FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) ON DELETE RESTRICT;


--
-- TOC entry 5065 (class 2606 OID 28691)
-- Name: mantenimiento mantenimiento_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mantenimiento
    ADD CONSTRAINT mantenimiento_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 5056 (class 2606 OID 28439)
-- Name: rest_token rest_token_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rest_token
    ADD CONSTRAINT rest_token_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT;


--
-- TOC entry 5052 (class 2606 OID 28318)
-- Name: site site_id_ubicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site
    ADD CONSTRAINT site_id_ubicacion_fkey FOREIGN KEY (id_ubicacion) REFERENCES public.ubicacion(id_ubicacion) ON DELETE RESTRICT;


--
-- TOC entry 5051 (class 2606 OID 28305)
-- Name: ubicacion ubicacion_id_ciudad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ubicacion
    ADD CONSTRAINT ubicacion_id_ciudad_fkey FOREIGN KEY (id_ciudad) REFERENCES public.ciudad(id_ciudad) ON DELETE RESTRICT;


--
-- TOC entry 5055 (class 2606 OID 28423)
-- Name: usuario usuario_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol) ON DELETE RESTRICT;


-- Completed on 2026-01-29 15:16:27

--
-- PostgreSQL database dump complete
--

\unrestrict dFH66fJHkrGYhoIKP8Sv2cbM146Rei1IT71bJgWeeMyNjavwhXMb87mhSzLiiMV

