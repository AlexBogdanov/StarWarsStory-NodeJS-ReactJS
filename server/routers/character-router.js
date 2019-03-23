const router = require('express').Router();
const passport = require('passport');

const { characterController } = require('./../controllers');

router
    .get('/all', characterController.getAll);

module.exports = router;
