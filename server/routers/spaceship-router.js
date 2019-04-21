const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { spaceshipController } = require('./../controllers');

router
    .get('/all', spaceshipController.getAll)
    .get('/spaceship/:id', passport.authenticate('jwt'), spaceshipController.getById)
    .post('/create', passport.authenticate('jwt'), spaceshipController.create)
    .put('/edit', passport.authenticate('jwt'), spaceshipController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), spaceshipController.delete)
    .get('/userSpaceships', passport.authenticate('jwt'), spaceshipController.getUserSpaceships);

module.exports = router;
