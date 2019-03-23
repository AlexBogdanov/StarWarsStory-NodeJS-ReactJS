const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { spaceshipController } = require('./../controllers');

router
    .get('/all', spaceshipController.getAll)
    .get('/spaceship/:id', passport.authenticate('jwt'), spaceshipController.getById)
    .post('/create', passport.authenticate('jwt'), auth.isAdmin, spaceshipController.create)
    .put('/edit', passport.authenticate('jwt'), auth.isAdmin, spaceshipController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), auth.isAdmin, spaceshipController.delete);

module.exports = router;
