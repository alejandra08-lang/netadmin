const { Pool } = require('pg');
require('dotenv').config();

console.log("Intentando conectar con usuario:", process.env.DB_USER);

//cofiguración de la base de datos

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost', 
    database: process.env.DB_DATABASE || 'Netadmin',
    password: process.env.DB_PASSWORD || '1947',
    port: process.env.DB_PORT || 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if(err){
        console.error('Mal que conectó esa base PENDEJA', err.message
        );
    } else {
        console.log('Conexion de postgres excelete que buena base de datos');
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};