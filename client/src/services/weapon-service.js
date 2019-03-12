import { baseUrl } from './../constants/urls';

const weaponUrl = `${baseUrl}/weapon`;
const getAllWeaponsUrl = `${weaponUrl}/all`;
const getWeaponByIdUrl = `${weaponUrl}/weapon`;
const editWeaponByIdUrl = `${weaponUrl}/edit`;
const deleteWeaponUrl = `${weaponUrl}/delete`;
const createWeaponUrl = `${weaponUrl}/create`;

const weaponService = {
    getAllWeapons: () => {
        return fetch(getAllWeaponsUrl);
    },

    getWeaponById: (id) => {
        return fetch(`${getWeaponByIdUrl}/${id}`);
    },

    editWeaponById: (id, weapon) => {
        return fetch(`${editWeaponByIdUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(weapon)
        });
    },

    deleteWeapon: (id) => {
        return fetch(`${deleteWeaponUrl}/${id}`, {
            method: 'DELETE'
        });
    },

    createWeapon: (weapon) => {
        return fetch(createWeaponUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(weapon) 
        });
    }
};

export default weaponService;
