const router = require('express').Router();

const { movieController } = require('./../controllers');

router
    .get('/all', movieController.getAll)
    .get('/movie/:movieId', movieController.getById)
    .post('/create', movieController.create)
    .put('/edit/:movieId', movieController.edit)
    .delete('/delete/:movieId', movieController.delete);

module.exports = router;
