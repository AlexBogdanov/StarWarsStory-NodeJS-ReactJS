const userRouter = require('./user-router');
const characterRouter = require('./character-router');
const spaceshipRouter = require('./spaceship-router');

module.exports = app => {
    app
        .use('/user', userRouter)
        .use('/character', characterRouter)
        .use('/spaceship', spaceshipRouter);
};
