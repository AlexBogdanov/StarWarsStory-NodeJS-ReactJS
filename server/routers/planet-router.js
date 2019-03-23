const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { planetController } = require('./../controllers');

router
    .get('/all', planetController.getAll)
    .get('/planet/:id', passport.authenticate('jwt'), planetController.getById)
    .post('/create', passport.authenticate('jwt'), auth.isAdmin, planetController.create)
    .put('/edit', passport.authenticate('jwt'), auth.isAdmin, planetController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), auth.isAdmin, planetController.delete);

module.exports = router;
