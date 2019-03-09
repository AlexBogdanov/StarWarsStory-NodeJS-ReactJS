const dataMsgs = require('./../constants/data-msgs');
const Movie = require('./../models/Movie');

module.exports = {
    getAll: async () => {
        try {
            const movies = await Movie.find({});
            return { movies, msg: dataMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.SOMETHING_WENT_WRONG);
        }
    },

    getById: async (id) => {
        try {
            const movie = await Movie.findById(id);
            return { movie, msg: dataMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.MOVIE_DOES_NOT_EXIST);
        }
    },

    create: async (movieInput) => {
        try {
            const movie = await Movie.create(movieInput);
            return { movie, msg: dataMsgs.success.MOVIE_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.UNABLE_TO_CREATE_MOVIE);
        }
    },

    edit: async (id, newMovieInput) => {
        try {
            const movie = await Movie.findById(id);

            Object.keys(newMovieInput).forEach(newProp => {
                movie[newProp] = newMovieInput[newProp];
            });

            await movie.save();
            return { movie, msg: dataMsgs.success.MOVIE_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_EDIT_MOVIE);
        }
    },

    delete: async (id) => {
        try {
            await Movie.findByIdAndDelete(id);
            return dataMsgs.success.MOVIE_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_DELETE_MOVIE);
        }
    }
};
