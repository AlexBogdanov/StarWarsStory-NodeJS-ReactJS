const { planetData, characterData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const planetProperties = [
    'name',
    'info',
    'affilations',
    'climate',
    'terrain',
    'natives',
    'images'
];

const planetController = {
    getAll: (req, res) => {
        planetData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    getById: (req, res) => {
        planetData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    create: (req, res) => {
        const planet = cloneOnly(req.body, planetProperties);
        planet.creator = req.user._id;

        planetData.create(planet)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const planet = cloneOnly(req.body.planet, planetProperties);
        
        planetData.edit(req.body.planetId, planet)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        planetData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    getUserPlanets: (req, res) => {
      planetData.getAllPlanetsByUserId(req.user._id)
        .then(res.success)
        .catch(err => {
          console.log(err);
          res.error(err.message, null, 500);
        });
    }
};

module.exports = planetController;
