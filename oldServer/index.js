const env = process.env.NODE_ENV || 'development';
const passport = require('passport');

const config = require('./config/config')[env];
require('./config/database')(config);
const app = require('express')();
require('./config/express')(app, passport);
require('./routers')(app, passport);
app.listen(config.port);