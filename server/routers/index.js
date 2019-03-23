const userRouter = require('./user-router');
const characterRouter = require('./character-router');

module.exports = app => {
    app
        .use('/user', userRouter)
        .use('/character', characterRouter);
}