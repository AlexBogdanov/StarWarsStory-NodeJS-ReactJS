const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { movieController } = require('./../controllers');

router
    .get('/all', movieController.getAll)
    .get('/movie/:id', passport.authenticate('jwt'), movieController.getById)
    .post('/create', passport.authenticate('jwt'), movieController.create)
    .put('/edit', passport.authenticate('jwt'), movieController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), movieController.delete)
    .get('/userMovies', passport.authenticate('jwt'), movieController.getUserMovies)
    .get('/find', movieController.searchMovies);

module.exports = router;
