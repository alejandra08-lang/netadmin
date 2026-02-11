const db = require('../config/db');

const Authmodel = {
    async getcredencialesByUsuario(id_usuario) {
        const query = `
            SELECT * FROM credenciales where id_usuario = $1;
        `;
        const {rows} = await db.query(query, [id_usuario]);
        return rows[0];
    },

    async resetLogin(id_credenciales) {
        const query = `
            UPDATE credenciales
            SET cre_intentos_fallidos = 0,
                cre_tiempo_bloqueo = NULL,
                cre_ultimo_login = CURRENT_TIMESTAMP
            WHERE id_credenciales = $1;
        `;
        await db.query(query, [id_credenciales]);
    },

    async increaseFail(id_credenciales, intentos, bloqueoHasta) {
        const query = `
            UPDATE credenciales
            SET cre_intentos_fallidos = $1, 
                cre_tiempo_bloqueo = $2
            WHERE id_credenciales = $3;
        `;
        await db.query(query, [intentos, bloqueoHasta, id_credenciales]);
    }
};

module.exports = Authmodel;