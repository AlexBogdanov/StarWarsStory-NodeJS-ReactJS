import { baseUrl } from './../constants/urls';

const getAllPlanetsUrl = `${baseUrl}/planet/all`;

const planetService = {
    getAllPlanets: () => {
        return fetch(getAllPlanetsUrl);
    }
};

export default planetService;
