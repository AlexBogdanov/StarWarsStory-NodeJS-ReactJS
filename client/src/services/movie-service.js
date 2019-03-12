import { baseUrl } from './../constants/urls';

const getAllMoviesUrl = `${baseUrl}/movie/all`;

const movieService = {
    getAllMovies: () => {
        return fetch(getAllMoviesUrl);
    }
};

export default movieService;
