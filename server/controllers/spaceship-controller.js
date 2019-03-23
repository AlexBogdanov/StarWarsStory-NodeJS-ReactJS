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
              res.fail({ msg: err.message });
          });
    },

    getById: (req, res) => {
        spaceshipData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    create: async (req, res) => {
        const spaceship = cloneOnly(req.body, spaceshipProperties);

        const pilotsIDs = [];

        for (let i = 0; i < spaceship.pilots.length; i+=1) {
            try {
                const character = await characterData.findByName(spaceship.pilots[i]);
                pilotsIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        spaceship.pilots = pilotsIDs;

        try {
            const data = await spaceshipData.create(spaceship);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    edit: async (req, res) => {
        const spaceship = cloneOnly(req.body, spaceshipProperties);

        const pilotsIDs = [];

        for (let i = 0; i < spaceship.pilots.length; i+=1) {
            try {
                const character = await characterData.findByName(spaceship.pilots[i]);
                pilotsIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        spaceship.pilots = pilotsIDs;

        try {
            const data = await spaceshipData.edit(req.body.spaceshipId, spaceship);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    delete: (req, res) => {
        spaceshipData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    }
};

module.exports = spaceshipController;
