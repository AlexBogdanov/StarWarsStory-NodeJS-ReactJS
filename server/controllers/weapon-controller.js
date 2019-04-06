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
              res.error(err.message, null, 500);
          });
    },

    getById: (req, res) => {
        weaponData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    create: (req, res) => {
        const weapon = cloneOnly(req.body, weaponProperties);

        weaponData.create(weapon)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const weapon = cloneOnly(req.body.weapon, weaponProperties);

        weaponData.edit(req.body.weaponId, weapon)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        weaponData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    }
};

module.exports = weaponController;
