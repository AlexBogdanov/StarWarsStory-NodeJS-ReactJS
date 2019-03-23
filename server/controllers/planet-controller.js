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
              res.fail({ msg: err.message });
          });
    },

    getById: (req, res) => {
        planetData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    create: async (req, res) => {
        const planet = cloneOnly(req.body, planetProperties);

        const nativesIDs = [];

        for (let i = 0; i < planet.natives.length; i+=1) {
            try {
                const character = await characterData.findByName(planet.natives[i]);
                nativesIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        planet.natives = nativesIDs;

        try {
            const data = await planetData.create(planet);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    edit: async (req, res) => {
        const planet = cloneOnly(req.body, planetProperties);

        const nativesIDs = [];

        for (let i = 0; i < planet.natives.length; i+=1) {
            try {
                const character = await characterData.findByName(planet.natives[i]);
                nativesIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        planet.natives = nativesIDs;

        try {
            const data = await planetData.edit(req.body.planetId, planet);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    delete: (req, res) => {
        planetData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    }
};

module.exports = planetController;
