const Spaceship = require('./../models/Spaceship');
const notifMsgs = require('./../constants/notification-messages');
const userRoles = require('./../constants/user-roles');

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

    edit: async (id, newSpaceshipInput, currUserId, userRole) => {
        try {
            const spaceship = await Spaceship.findById(id);

            if (spaceship.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_EDIT);
            }

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
    
    delete: async (id, currUserId, userRole) => {
        try {
            const spaceship = await Spaceship.findById(id);

            if (spaceship.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_DELETE);
            }

            await Spaceship.findByIdAndDelete(id);
            return notifMsgs.success.SPACESHIP_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_SPACESHIP);
        }
    },

    getAllSpaceshipsByUserId: (userId) => new Promise((res, rej) => {
        Spaceship.find({ creator: userId }, (err, spaceships) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_SPACESHIPS));
            }

            res(spaceships);
        })
    }),

    searchSpaceships: (search) => new Promise((res, rej) => {
        Spaceship.find({ name: { $regex: "^" + search } })
        .select('_id name pilots')
        .exec((err, spaceships) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_SPACESHIPS));
            }
            
            res(spaceships);
        });
    })
};

module.exports = spaceshipData;
