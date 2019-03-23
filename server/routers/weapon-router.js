const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { weaponController } = require('./../controllers');

router
    .get('/all', weaponController.getAll)
    .get('/weapon/:id', passport.authenticate('jwt'), weaponController.getById)
    .post('/create', passport.authenticate('jwt'), auth.isAdmin, weaponController.create)
    .put('/edit', passport.authenticate('jwt'), auth.isAdmin, weaponController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), auth.isAdmin, weaponController.delete);

module.exports = router;
