const { userData, characterData, weaponData, spaceshipData, planetData, movieData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const userController = {
    register: (req, res) => {
        const user = cloneOnly(req.body, ['username', 'password', 'email']);

        userData.register(user.username, user.password, user.email)
            .then(res.success)
            .catch(err => {
                res.error(err.message, null, 500);
            });
    },

    login: (req, res) => {
        const user = cloneOnly(req.body, ['username', 'password']);

        userData.login(user.username, user.password)
            .then(res.success)
            .catch(err => {
                res.error(err.message, null, 500);
            });
    }
};

module.exports = userController;
