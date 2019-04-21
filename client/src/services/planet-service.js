import { get, post, put, del } from './ajax-service';

const getAllPlanetsUrl = '/planet/all';
const getPlanetByIdUrl = '/planet/planet';
const createPlanetUrl = '/planet/create';
const editPlanetUrl = '/planet/edit';
const deletePlanetUrl = '/planet/delete';
const getUserPlanetsUrl = '/planet/userPlanets';

const planetService = {
    getAllPlanets: () => {
        return get(getAllPlanetsUrl, false);
    },

    getPlanetById: (planetId) => {
        return get(`${getPlanetByIdUrl}/${planetId}`, true);
    },

    createPlanet: (planet) => {
        return post(createPlanetUrl, planet, true);
    },

    editPlanet: (planetId, planet) => {
        return put(editPlanetUrl, { planetId, planet }, true);
    },

    deletePlanet: (planetId) => {
        return del(`${deletePlanetUrl}/${planetId}`, true);
    },

    getUserPlanets: () => {
        return get(getUserPlanetsUrl, true);
    }
};

export default planetService;
