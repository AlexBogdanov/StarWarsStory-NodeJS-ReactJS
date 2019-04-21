const Weapon = require('./../models/Weapon');
const notifMsgs = require('./../constants/notification-messages');
const userRoles = require('./../constants/user-roles');

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
            const weapon = await Weapon.findById(id)
                .populate('owners', '_id name');

            return { weapon, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.WEAPON_DOES_NOT_EXIST);
        }
    },

    create: async (weaponInput) => {
        try {
            const weapon = await Weapon.create(weaponInput);
            return { weaponId: weapon._id, msg: notifMsgs.success.WEAPON_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_WEAPON);
        }
    },

    edit: async (id, newWeaponInput, currUserId, userRole) => {
        try {
            const weapon = await Weapon.findById(id);

            if (weapon.creator !== currUserId && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_EDIT);
            }

            Object.keys(newWeaponInput).forEach(newProp => {
                weapon[newProp] = newWeaponInput[newProp];
            });

            await weapon.save();
            return { msg: notifMsgs.success.WEAPON_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_WEAPON);
        }
    },

    delete: async (id, currUserId, userRole) => {
        try {
            const weapon = await Weapon.findById(id);

            if (weapon.creator !== currUserId && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_DELETE);
            }

            await Weapon.findByIdAndDelete(id);
            return notifMsgs.success.WEAPON_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_WEAPON);
        }
    },

    getAllWeaponsByUserId: (userId) => new Promise((res, rej) => {
        Weapon.find({ creator: userId }, (err, weapons) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_WEAPONS));
            }

            res(weapons);
        });
    }),

    searchWeapons: (search) => new Promise((res, rej) => {
        Weapon.find({ name: { $regex: "^" + search } })
        .select('_id name owners')
        .exec((err, weapons) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_WEAPONS));
            }
            
            res(weapons);
        });
    })
};

module.exports = weaponData;
