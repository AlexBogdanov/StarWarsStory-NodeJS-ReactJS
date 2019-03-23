const Weapon = require('./../models/Weapon');
const notifMsgs = require('./../constants/notification-messages');

const weaponData = {
    getAll: async () => {
        try {
            const weapons = await Weapon.find({});
            return { weapons, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_WEAPONS);
        }
    },

    getById: async (id) => {
        try {
            const weapon = await Weapon.findById(id);
            return { weapon, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.WEAPON_DOES_NOT_EXIST);
        }
    },

    create: async (weaponInput) => {
        try {
            const weapon = await Weapon.create(weaponInput);
            return { weapon, msg: notifMsgs.success.WEAPON_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_WEAPON);
        }
    },

    edit: async (id, newWeaponInput) => {
        try {
            const weapon = await Weapon.findById(id);

            Object.keys(newWeaponInput).forEach(newProp => {
                weapon[newProp] = newWeaponInput[newProp];
            });

            await weapon.save();
            return { weapon, msg: notifMsgs.success.WEAPON_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_WEAPON);
        }
    },

    delete: async (id) => {
        try {
            await Weapon.findByIdAndDelete(id);
            return notifMsgs.success.WEAPON_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_WEAPON);
        }
    }
};

module.exports = weaponData;
