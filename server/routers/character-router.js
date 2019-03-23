const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { characterController } = require('./../controllers');

router
    .get('/all', characterController.getAll)
    .get('/character/:id', passport.authenticate('jwt'), characterController.getById)
    .post('/create', passport.authenticate('jwt'), auth.isAdmin, characterController.create)
    .put('/edit', passport.authenticate('jwt'), auth.isAdmin, characterController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), auth.isAdmin, characterController.delete);

module.exports = router;
