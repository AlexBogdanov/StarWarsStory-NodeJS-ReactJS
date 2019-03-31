const Planet = require('./../models/Planet');
const notifMsgs = require('./../constants/notification-messages');

const planetData = {
    getAll: async () => {
        try {
            const planets = await Planet.find({});
            return { planets, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_PLANETS);
        }
    },

    getById: async (id) => {
        try {
            const planet = await Planet.findById(id)
                .populate('natives', '_id name');
            return { planet, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.PLANET_DOES_NOT_EXIST);
        }
    },

    create: async (planetInput) => {
        try {
            const planet = await Planet.create(planetInput);
            return { planetId: planet._id, msg: notifMsgs.success.PLANET_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_PLANET);
        }
    },

    edit: async (id, newPlanetInput) => {
        try {
            const planet = await Planet.findById(id);

            Object.keys(newPlanetInput).forEach(newProp => {
                planet[newProp] = newPlanetInput[newProp];
            });

            await planet.save();
            return { msg: notifMsgs.success.PLANET_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_PLANET);
        }
    },

    delete: async (id) => {
        try {
            await Planet.findByIdAndDelete(id);
            return notifMsgs.success.PLANET_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_PLANET);
        }
    }
};

module.exports = planetData;
