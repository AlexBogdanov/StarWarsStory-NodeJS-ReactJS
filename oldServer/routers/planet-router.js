const router = require('express').Router();

const { planetController } = require('./../controllers');

router
    .get('/all', planetController.getAll)
    .get('/planet/:planetId', planetController.getById)
    .post('/create', planetController.create)
    .put('/edit/:planetId', planetController.edit)
    .delete('/delete/:planetId', planetController.delete);

module.exports = router;
