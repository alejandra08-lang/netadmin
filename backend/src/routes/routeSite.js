const express = require('express');
const router = express.Router();
const controllerSite = require ('../controllers/controllerSite.js');

router.get('/', controllerSite.obtener_todos_site);

router.post('/', controllerSite.crear_site);

//eliminar si no se depende el
router.delete('/:id', controllerSite.eliminar_site);

module.exports = router;