import { baseUrl } from './../constants/urls';

const getAllWeaponsUrl = `${baseUrl}/weapon/all`;

const weaponService = {
    getAllWeapons: () => {
        return fetch(getAllWeaponsUrl);
    }
};

export default weaponService;
