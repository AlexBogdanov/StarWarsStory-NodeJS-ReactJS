const userRouter = require('./user-router');
const characterRouter = require('./character-router');
const movieRouter = require('./movie-router');
const planetRouter = require('./planet-router');
const spaceshipRouter = require('./spaceship-router');
const storyRouter = require('./story-router');
const weaponRouter = require('./weapon-router');

module.exports = app => {
    app
        .use('/user', userRouter)
        .use('/character', characterRouter)
        .use('/movie', movieRouter)
        .use('/planet', planetRouter)
        .use('/spaceship', spaceshipRouter)
        .use('/story', storyRouter)
        .use('/weapon', weaponRouter);
}