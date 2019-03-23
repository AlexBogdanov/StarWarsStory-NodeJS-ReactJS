const { characterData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const characterController = {
    getAll: (req, res) => {
        characterData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    getById: (req, res) => {
        characterData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
            });
    },

    create: (req, res) => {
        const characterProperties = [
            name,
            race,
            sex,
            affilations,
            shortStory,
            birhtday,
            height,
            weight,
            weapons,
            vehicles,
            images
        ];
        const character = cloneOnly(req.body, characterProperties);

        characterData.create(character)
            .then(res.success)
            .catch(err => {
                console.log(err);
                res.fail({ msg: err.message });
            })
    }
};

module.exports = characterController;
