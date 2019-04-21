const { spaceshipData, characterData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const spaceshipProperties = [
    'name',
    'dimension',
    'affilations',
    'info',
    'images',
    'pilots'
];

const spaceshipController = {
    getAll: (req, res) => {
        spaceshipData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    getById: (req, res) => {
        spaceshipData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    create: (req, res) => {
        const spaceship = cloneOnly(req.body, spaceshipProperties);

        spaceshipData.create(spaceship)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const spaceship = cloneOnly(req.body.spaceship, spaceshipProperties);
        spaceship.creator = req.user._id;

        spaceshipData.edit(req.body.spaceshipId, spaceship)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        spaceshipData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    getUserSpaceships: (req, res) => {
      spaceshipData.getAllSpaceshipsByUserId(req.user._id)
        .then(res.success)
        .catch(err => {
          console.log(err);
          res.error(err.message, null, 500);
        });
    }
};

module.exports = spaceshipController;
