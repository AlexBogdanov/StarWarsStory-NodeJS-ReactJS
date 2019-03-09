const router = require('express').Router();

const { userController } = require('./../controllers');

router
    .post('/register', userController.register)
    .post('/login', userController.login)
    .post('/logout', userController.logout);

module.exports = router;
