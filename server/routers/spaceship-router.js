const router = require('express').Router();

const { spaceshipController } = require('./../controllers');

router
    .get('/all', spaceshipController.getAll)
    .get('/spaceship/:spaceshipId', spaceshipController.getById)
    .post('/create', spaceshipController.create)
    .put('/edit/:spaceshipId', spaceshipController.edit)
    .delete('/delete/:spaceshipId', spaceshipController.delete);

module.exports = router;
