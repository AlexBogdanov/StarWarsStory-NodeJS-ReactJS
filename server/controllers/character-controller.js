const { characterData, weaponData, spaceshipData } = require('./../data');
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
        character.creator = req.user._id;
        
        characterData.create(character)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const character = cloneOnly(req.body.character, characterProperties);

        characterData.edit(req.body.characterId, character, req.user._id, req.user.roles[0])
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        characterData.delete(req.params.id, req.user._id, req.user.roles[0])
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    getAllCharactersNamesAndIds: (req, res) => {
      characterData.getAllCharactersNamesAndIds()
        .then(data => {
          res.success({ characters: data.characters });
        }).catch(err => {
          console.log(err);
          res.error(err.message, null, 500);
        });
    },

    getUserCharacters: (req, res) => {
      characterData.getAllCharactersByUserId(req.user._id)
        .then(res.success)
        .catch(err => {
          console.log(err);
          res.error(err.message, null, 500);
        });
    }
};

module.exports = characterController;
