const Movie = require('./../models/Movie');
const notifMsgs = require('./../constants/notification-messages');
const userRoles = require('./../constants/user-roles');

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
            return { movieId: movie._id, msg: notifMsgs.success.MOVIE_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_MOVIE);
        }
    },

    edit: async (id, newMovieInput, currUserId, userRole) => {
        try {
            const movie = await Movie.findById(id);

            if (movie.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_EDIT);
            }

            Object.keys(newMovieInput).forEach(newProp => {
                movie[newProp] = newMovieInput[newProp];
            });

            await movie.save();
            return { msg: notifMsgs.success.MOVIE_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_MOVIE);
        }
    },

    delete: async (id, currUserId, userRole) => {
        try {
            const movie = await Movie.findById(id);

            if (movie.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_DELETE);
            }

            await Movie.findByIdAndDelete(id);
            return notifMsgs.success.MOVIE_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_MOVIE);
        }
    },

    getAllMoviesByUserId: (userId) => new Promise((res, rej) => {
        Movie.find({ creator: userId }, (err, movies) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_MOVIES));
            }

            res(movies);
        });
    }),

    serachMovies: (search) => new Promise((res, rej) => {
        Movie.find({ name: { $regex: "^" + search } })
        .select('_id name releaseDate')
        .exec((err, movies) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_MOVIES));
            }
            
            res(movies);
        });
    })
};

module.exports = movieData;
