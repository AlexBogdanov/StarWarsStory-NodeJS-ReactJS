import { get, post, put, del } from './ajax-service';

const getAllMoviesUrl = '/movie/all';
const getMovieByIdUrl = '/movie/movie';
const createMovieUrl = '/movie/create';
const editMovieUrl = '/movie/edit';
const deleteMovieUrl = '/movie/delete';

const movieService = {
    getAllMovies: () => {
        return get(getAllMoviesUrl, false);
    },

    getMovieById: (movieId) => {
        return get(`${getMovieByIdUrl}/${movieId}`, true);
    },

    createMovie: (movie) => {
        return post(createMovieUrl, movie, true);
    },

    editMovie: (movieId, movie) => {
        return put(editMovieUrl, { movieId, movie }, true);
    },

    deleteMovie: (movieId) => {
        return del(`${deleteMovieUrl}/${movieId}`, true);
    }
};

export default movieService;
