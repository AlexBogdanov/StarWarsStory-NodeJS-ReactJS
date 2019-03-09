const router = require('express').Router();

const { characterController } = require('./../controllers');

router
    .get('/all', characterController.getAll)
    .get('/character/:characterId', characterController.getById)
    .post('/create', characterController.create)
    .put('/edit/:characterId', characterController.edit)
    .delete('/delete/:characterId', characterController.delete);

module.exports = router;
