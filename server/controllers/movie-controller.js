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
    'cover'
];

const movieController = {
    getAll: (req, res) => {
        movieData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    getById: (req, res) => {
        movieData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    create: (req, res) => {
        const movie = cloneOnly(req.body, movieProperties);
        movie.creator = req.user._id;

        movieData.create(movie)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const movie = cloneOnly(req.body.movie, movieProperties);

        movieData.edit(req.body.movieId, movie, req.user._id, req.user.roles[0])
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        movieData.delete(req.params.id, req.user._id, req.user.roles[0])
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    getUserMovies: (req, res) => {
        movieData.getAllMoviesByUserId(req.user._id)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    }
};

module.exports = movieController;
