const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { storyController } = require('./../controllers');

router
    .get('/all', storyController.getAll)
    .get('/story/:id', passport.authenticate('jwt'), storyController.getById)
    .post('/create', passport.authenticate('jwt'), auth.isAdmin, storyController.create)
    .put('/edit', passport.authenticate('jwt'), auth.isAdmin, storyController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), auth.isAdmin, storyController.delete);

module.exports = router;
