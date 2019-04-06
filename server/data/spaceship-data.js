const Spaceship = require('./../models/Spaceship');
const notifMsgs = require('./../constants/notification-messages');

const spaceshipData = {
    getAll: async () => {
        try {
            const spaceships = await Spaceship.find({});
            return { spaceships, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_SPACESHIPS);
        }
    },

    getById: async (id) => {
        try {
            const spaceship = await Spaceship.findById(id)
                .populate('pilots', '_id name');
            return { spaceship, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.SPACESHIP_DOES_NOT_EXIST);
        }
    },

    create: async (spaceshipInput) => {
        try {
            const spaceship = await Spaceship.create(spaceshipInput);
            return { spaceshipId: spaceship._id, msg: notifMsgs.success.SPACESHIP_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_SPACESHIP);
        }
    },

    edit: async (id, newSpaceshipInput) => {
        try {
            const spaceship = await Spaceship.findById(id);

            Object.keys(newSpaceshipInput).forEach(newProp => {
                spaceship[newProp] = newSpaceshipInput[newProp];
            });

            await spaceship.save();
            return { msg: notifMsgs.success.SPACESHIP_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_SPACESHIP);
        }
    },
    
    delete: async (id) => {
        try {
            await Spaceship.findByIdAndDelete(id);
            return notifMsgs.success.SPACESHIP_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_SPACESHIP);
        }
    }
};

module.exports = spaceshipData;
