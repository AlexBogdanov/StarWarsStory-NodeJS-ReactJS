const Movie = require('./../models/Movie');
const notifMsgs = require('./../constants/notification-messages');

const movieData = {
    getAll: async () => {
        try {
            const movies = await Movie.find({});
            return { movies, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_MOVIES);
        }
    },

    getById: async (id) => {
        try {
            const movie = await Movie.findById(id);
            return { movie, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.MOVIE_DOES_NOT_EXIST);
        }
    },

    create: async (movieInput) => {
        try {
            const movie = await Movie.create(movieInput);
            return { movie, msg: notifMsgs.success.MOVIE_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_MOVIE);
        }
    },

    edit: async (id, newMovieInput) => {
        try {
            const movie = await Movie.findById(id);

            Object.keys(newMovieInput).forEach(newProp => {
                movie[newProp] = newMovieInput[newProp];
            });

            await movie.save();
            return { movie, msg: notifMsgs.success.MOVIE_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_MOVIE);
        }
    },

    delete: async (id) => {
        try {
            await Movie.findByIdAndDelete(id);
            return notifMsgs.success.MOVIE_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_MOVIE);
        }
    }
};

module.exports = movieData;
