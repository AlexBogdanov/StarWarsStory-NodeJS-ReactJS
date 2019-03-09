const dataMsgs = require('./../constants/data-msgs');
const Spaceship = require('./../models/Spaceship');

module.exports = {
    getAll: async () => {
        try {
            const spaceships = await Spaceship.find({});
            return { spaceships, msg: dataMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.SOMETHING_WENT_WRONG);
        }
    },

    getById: async (id) => {
        try {
            const spaceship = await Spaceship.findById(id);
            return { spaceship, msg: dataMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.SPACESHIP_DOES_NOT_EXIST);
        }
    },

    create: async (spaceshipInput) => {
        try {
            const spaceship = await Spaceship.create(spaceshipInput);
            return { spaceship, msg: dataMsgs.success.SPACESHIP_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.UNABLE_TO_CREATE_SPACESHIP);
        }
    },

    edit: async (id, newSpaceshipInput) => {
        try {
            const spaceship = await Spaceship.findById(id);

            Object.keys(newSpaceshipInput).forEach(newProp => {
                spaceship[newProp] = newSpaceshipInput[newProp];
            });

            await spaceship.save();
            return { spaceship, msg: dataMsgs.success.SPACESHIP_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_EDIT_SPACESHIP);
        }
    },

    delete: async (id) => {
        try {
            await Spaceship.findByIdAndDelete(id);
            return dataMsgs.success.SPACESHIP_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_DELETE_SPACESHIP);
        }
    }
};
