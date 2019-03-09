const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const success = require('express-json-success');

module.exports = app => {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    success(app);
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });

    app.set('view engine', '.hbs');

    app.use(express.static('./static'));
};