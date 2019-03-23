const { storyData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const storyProperties = [
    'name',
    'years',
    'story',
    'images'
];

const storyController = {
    getAll: (req, res) => {
        storyData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    getById: (req, res) => {
        storyData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    create: (req, res) => {
        const story = cloneOnly(req.body, storyProperties);

        storyData.create(story)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    edit: (req, res) => {
        const story = cloneOnly(req.body, storyProperties);

        storyData.edit(req.body.storyId, story)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    },

    delete: (req, res) => {
        storyData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          })
    }
};

module.exports = storyController;
