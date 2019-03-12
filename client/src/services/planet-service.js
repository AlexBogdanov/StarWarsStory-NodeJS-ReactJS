import { baseUrl } from './../constants/urls';

const planetUrl = `${baseUrl}/planet`;
const getAllPlanetsUrl = `${planetUrl}/all`;
const getPlanetByIdUrl = `${planetUrl}/planet`;
const editPlanetByIdUrl = `${planetUrl}/edit`;
const deletePlanetUrl = `${planetUrl}/delete`;
const createPlanetUrl = `${planetUrl}/create`;

const planetService = {
    getAllPlanets: () => {
        return fetch(getAllPlanetsUrl);
    },

    getPlanetById: (id) => {
        return fetch(`${getPlanetByIdUrl}/${id}`);
    },

    editPlanetById: (id, planet) => {
        return fetch(`${editPlanetByIdUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planet) 
        });
    },

    deletePlanet: (id) => {
        return fetch(`${deletePlanetUrl}/${id}`, {
            method: 'DELETE'
        });
    },

    createPlanet: (planet) => {
        return fetch(createPlanetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planet)
        });
    }
};

export default planetService;
