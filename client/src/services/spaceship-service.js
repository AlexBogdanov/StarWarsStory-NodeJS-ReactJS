import { baseUrl } from './../constants/urls';

const getAllSpaceshipsUrl = `${baseUrl}/spaceship/all`;

const spaceshipService = {
    getAllSpaceships: () => {
        return fetch(getAllSpaceshipsUrl);
    }
};

export default spaceshipService;
