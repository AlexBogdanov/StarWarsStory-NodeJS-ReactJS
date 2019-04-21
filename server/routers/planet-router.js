const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { planetController } = require('./../controllers');

router
    .get('/all', planetController.getAll)
    .get('/planet/:id', passport.authenticate('jwt'), planetController.getById)
    .post('/create', passport.authenticate('jwt'), planetController.create)
    .put('/edit', passport.authenticate('jwt'), planetController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), planetController.delete)
    .get('/userPlanets', passport.authenticate('jwt'), planetController.getUserPlanets);

module.exports = router;
