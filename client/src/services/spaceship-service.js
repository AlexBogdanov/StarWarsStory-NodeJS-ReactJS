import { get, post, put, del } from './ajax-service';

const getAllSpaceshipsUrl = '/spaceship/all';
const getSpaceshipByIdUrl = '/spaceship/spaceship';
const createSpaceshipUrl = '/spaceship/create';
const editSpaceshipUrl = '/spaceship/edit';
const deleteSpaceshipUrl = '/spaceship/delete';

const spaceshipService = {
    getAllSpaceships: () => {
        return get(getAllSpaceshipsUrl, false);
    },

    getSpacehipById: (spaceshipId) => {
        return get(`${getSpaceshipByIdUrl}/${spaceshipId}`, true);
    },

    createSpaceship: (spaceship) => {
        return post(createSpaceshipUrl, spaceship, true);
    },

    editSpaceshipById: (spaceshipId, spaceship) => {
        return put(editSpaceshipUrl, { spaceshipId, spaceship }, true);
    },

    deleteSpaceship: (spaceshipId) => {
        return del(`${deleteSpaceshipUrl}/${spaceshipId}`, true);
    }
};

export default spaceshipService;
