const dataMsgs = require('./../constants/data-msgs');
const Planet = require('./../models/Planet');

module.exports = {
    getAll: async () => {
        try {
            const planets = await Planet.find({});
            return { planets, msg: dataMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.SOMETHING_WENT_WRONG);
        }
    },

    getById: async (id) => {
        try {
            const planet = await Planet.findById(id);
            return { planet, msg: dataMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.PLANET_DOES_NOT_EXIST);
        }
    },

    create: async (planetInput) => {
        try {
            const planet = await Planet.create(planetInput);
            return { planet, msg: dataMsgs.success.PLANET_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.UNABLE_TO_CREATE_PLANET);
        }
    },

    edit: async (id, newPlanetInput) => {
        try {
            const planet = await Planet.findById(id);

            Object.keys(newPlanetInput).forEach(newProp => {
                planet[newProp] = newPlanetInput[newProp];
            });

            await planet.save();
            return { planet, msg: dataMsgs.success.PLANET_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_EDIT_PLANET);
        }
    },

    delete: async (id) => {
        try {
            await Planet.findByIdAndDelete(id);
            return dataMsgs.success.PLANET_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_DELETE_PLANET);
        }
    }
};
