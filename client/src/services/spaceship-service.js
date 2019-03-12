import { baseUrl } from './../constants/urls';

const spaceshipUrl = `${baseUrl}/spaceship`;
const getAllSpaceshipsUrl = `${spaceshipUrl}/all`;
const getSpaceshipByIdUrl = `${spaceshipUrl}/spaceship`;
const editSpaceshipByIdUrl = `${spaceshipUrl}/edit`;
const deleteSpaceshipUrl = `${spaceshipUrl}/delete`;
const createSpaceshipUrl = `${spaceshipUrl}/create`;

const spaceshipService = {
    getAllSpaceships: () => {
        return fetch(getAllSpaceshipsUrl);
    },

    getSpacehipById: (id) => {
        return fetch(`${getSpaceshipByIdUrl}/${id}`);
    },

    editSpaceshipById: (id, spaceship) => {
        return fetch(`${editSpaceshipByIdUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spaceship) 
        });
    },

    deleteSpaceship: (id) => {
        return fetch(`${deleteSpaceshipUrl}/${id}`, {
            method: 'DELETE'
        });
    },

    createSpaceship: (spaceship) => {
        return fetch(createSpaceshipUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spaceship)
        });
    }
};

export default spaceshipService;
