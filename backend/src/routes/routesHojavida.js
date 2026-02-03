router.post(
    '/',
    auth,
    rol(['Administrador', 'Gestor']),
    hojaVidaController.create
);

router.put(
    '/:id',
    auth,
    rol(['Administrador', 'Gestor']),
    hojaVidaController.update
);  
