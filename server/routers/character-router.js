const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { characterController } = require('./../controllers');

router
    .get('/all', characterController.getAll)
    .get('/character/:id', passport.authenticate('jwt'), characterController.getById)
    .post('/create', passport.authenticate('jwt'), characterController.create)
    .put('/edit', passport.authenticate('jwt'), characterController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), characterController.delete)
    .get('/characterNamesAndIds', passport.authenticate('jwt'), characterController.getAllCharactersNamesAndIds)
    .get('/userCharacters', passport.authenticate('jwt'), characterController.getUserCharacters)
    .get('/find', characterController.searchCharacters);

module.exports = router;
