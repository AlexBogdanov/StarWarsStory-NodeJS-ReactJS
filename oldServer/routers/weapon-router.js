const router = require('express').Router();

const { weaponController } = require('./../controllers');

router
    .get('/all', weaponController.getAll)
    .get('/weapon/:weaponId', weaponController.getById)
    .post('/create', weaponController.create)
    .put('/edit/:weaponId', weaponController.edit)
    .delete('/delete/:weaponId', weaponController.delete);

module.exports = router;