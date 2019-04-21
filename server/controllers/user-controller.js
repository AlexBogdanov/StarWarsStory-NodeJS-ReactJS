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
    },

    search: async (req, res) => {
        const search = req.query.search;

        try {
            const matchedCharacters = await characterData.searchCharacters(search);
            const matchedWeapons = await weaponData.searchWeapons(search);
            const matchedSpaceships = await spaceshipData.searchSpaceships(search);
            const matchedPlanets = await planetData.searchPlanets(search);
            const matchedMovies = await movieData.serachMovies(search);

            const matchedResult = [...matchedCharacters, ...matchedWeapons, ...matchedSpaceships,
                ...matchedPlanets, ...matchedMovies];
            res.success(matchedResult);
        } catch (err) {
            console.log(err);
            res.error(err.message, null, 500);
        }
    }
};

module.exports = userController;
