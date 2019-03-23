const { movieData, characterData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const movieProperties = [
    'name',
    'type',
    'releaseDate',
    'director',
    'writers',
    'actors',
    'info',
    'charactersInvolved',
    'cover'
];

const movieController = {
    getAll: (req, res) => {
        movieData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message })
          });
    },

    getById: (req, res) => {
        movieData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message })
          });
    },

    create: async (req, res) => {
        const movie = cloneOnly(req.body, movieProperties);
        
        const charactersInvolvedIDs = [];

        for (let i = 0; i < movie.charactersInvolved.length; i+=1) {
            try {
                const character = await characterData.findByName(movie.charactersInvolved[i]);
                charactersInvolvedIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        movie.charactersInvolved = charactersInvolvedIDs;
        
        try {
            const data = await movieData.create(movie);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    edit : async (req, res) => {
        const movie = cloneOnly(req.body, movieProperties);
        
        const charactersInvolvedIDs = [];

        for (let i = 0; i < movie.charactersInvolved.length; i+=1) {
            try {
                const character = await characterData.findByName(movie.charactersInvolved[i]);
                charactersInvolvedIDs.push(character._id);
            } catch (err) {
                continue;
            }
        }

        movie.charactersInvolved = charactersInvolvedIDs;

        try {
            const data = await movieData.edit(req.body.movieId, movie);
            res.success(data);
        } catch (err) {
            console.log(err);
            res.fail({ msg: err.message });
        }
    },

    delete: (req, res) => {
        movieData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    }
};

module.exports = movieController;
