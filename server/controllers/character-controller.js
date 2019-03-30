const { characterData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const characterProperties = [
    'name',
    'race',
    'sex',
    'affilations',
    'shortStory',
    'height',
    'weight',
    'weapons',
    'vehicles',
    'images'
];

const characterController = {
    getAll: (req, res) => {
        characterData.getAll()
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    getById: (req, res) => {
        characterData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    create: (req, res) => {
        const character = cloneOnly(req.body, characterProperties);
        
        characterData.create(character)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const character = cloneOnly(req.body.character, characterProperties);

        characterData.edit(req.body.characterId, character)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        characterData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    }
};

module.exports = characterController;
