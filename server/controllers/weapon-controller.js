const { weaponData, characterData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const weaponProperties = [
    'name',
    'affilations',
    'info',
    'images',
    'owners'
];

const weaponController = {
    getAll: (req, res) => {
        weaponData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    getById: (req, res) => {
        weaponData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    },

    create: async (req, res) => {
        const weapon = cloneOnly(req.body, weaponProperties);

        const ownersIDs = [];

        for (let i = 0; i < weapon.owners.length; i+=1) {
            try {
                const character = await characterData.findByName(weapon.owners[i]);
                ownersIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        weapon.owners = ownersIDs;

        try {
            const data = await weaponData.create(weapon);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    edit: async (req, res) => {
        const weapon = cloneOnly(req.body, weaponProperties);

        const ownersIDs = [];

        for (let i = 0; i < weapon.owners.length; i+=1) {
            try {
                const character = await characterData.findByName(weapon.owners[i]);
                ownersIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        weapon.owners = ownersIDs;

        try {
            const data = weaponData.edit(req.body.weaponId, weapon);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    delete: (req, res) => {
        weaponData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    }
};

module.exports = weaponController;
