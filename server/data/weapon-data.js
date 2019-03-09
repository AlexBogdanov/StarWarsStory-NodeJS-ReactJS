const dataMsgs = require('./../constants/data-msgs');
const Weapon = require('./../models/Weapon');

module.exports = {
getAll: async () => {
        try {
            const weapons = await Weapon.find({});
            return { weapons, msg: dataMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.SOMETHING_WENT_WRONG);
        }
    },

    getById: async (id) => {
        try {
            const weapon = await Weapon.findById(id);
            return { weapon, msg: dataMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.WEAPON_DOES_NOT_EXIST);
        }
    },

    create: async (weaponInput) => {
        try {
            const weapon = await Weapon.create(weaponInput);
            return { weapon, msg: dataMsgs.success.WEAPON_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.UNABLE_TO_CREATE_WEAPON);
        }
    },

    edit: async (id, newWeaponInput) => {
        try {
            const weapon = await Weapon.findById(id);

            Object.keys(newWeaponInput).forEach(newProp => {
                weapon[newProp] = newWeaponInput[newProp];
            });

            await weapon.save();
            return { weapon, msg: dataMsgs.success.WEAPON_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_EDIT_WEAPON);
        }
    },

    delete: async (id) => {
        try {
            await Weapon.findByIdAndDelete(id);
            return dataMsgs.success.WEAPON_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_DELETE_WEAPON);
        }
    }
};
