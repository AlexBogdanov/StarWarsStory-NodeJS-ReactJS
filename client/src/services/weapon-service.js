import { get, post, put, del } from './ajax-service';

const getAllWeaponsUrl = '/weapon/all';
const getWeaponByIdUrl = '/weapon/weapon';
const createWeaponUrl = '/weapon/create';
const editWeaponUrl = '/weapon/edit';
const deleteWeaponUrl = '/weapon/delete';

const weaponService = {
    getAllWeapons: () => {
        return get(getAllWeaponsUrl, false);
    },

    getWeaponById: (weaponId) => {
        return get(`${getWeaponByIdUrl}/${weaponId}`, true);
    },

    createWeapon: (weapon) => {
        return post(createWeaponUrl, weapon, true);
    },

    editWeaponById: (weaponId, weapon) => {
        return put(editWeaponUrl, { weaponId, weapon }, true);
    },

    deleteWeapon: (weaponId) => {
        return del(`${deleteWeaponUrl}/${weaponId}`, true);
    }
};

export default weaponService;
