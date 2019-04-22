const notifMsgs = require('./../constants/notification-messages');
const Character = require('./../models/Character');
const userRoles = require('./../constants/user-roles');

const characterData = {
    getAll: async () => {
        try {
            const characters = await Character.find({});
            return { characters, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_CHARACTERS);
        }
    },

    getById: async (id) => {
        try {
            const character = await Character.findById(id)
                .populate('weapons', '_id name')
                .populate('vehicles', '_id name');
            return { character, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.CHARACTER_DOES_NOT_EXIST);
        }
    },

    create: async (characterInput) => {
        try {
            const character = await Character.create(characterInput);

            return {  characterId: character._id, msg: notifMsgs.success.CHARACTER_CREATED }
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_CHARACTER);
        }
    },

    edit: async (id, newCharacterInput, currUserId, userRole) => {
        try {
            const character = await Character.findById(id);

            if (character.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_EDIT);
            }

            Object.keys(newCharacterInput).forEach(newProp => {
                character[newProp] = newCharacterInput[newProp];
            });

            await character.save();
            return { msg: notifMsgs.success.CHARACTER_EDITED };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_CHARACTER);
        }
    },

    delete: async (id, currUserId, userRole) => {
        try {
            const character = await Character.findById(id);

            if (character.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_DELETE);
            }

            await Character.findByIdAndDelete(id);
            return notifMsgs.success.CHARACTER_DELETED
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_CHARACTER);
        }
    },
    
    findByName: async (name) => {
        try {
            const character = await Character.findOne({ name });
            return character;
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.CHARACTER_DOES_NOT_EXIST);
        }
    },

    getAllCharactersNamesAndIds: async () => {
        try {
            const characters = await Character.find({})
                .select('_id name');
            return { characters, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_CHARACTERS);
        }
    },

    getAllCharactersByUserId: (userId) => new Promise((res, rej) => {
        Character.find({ creator: userId }, (err, characters) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_CHARACTERS));
            }

            res(characters);
        });
    }),

    searchCharacters: (search) => new Promise((res, rej) => {
        Character.find({ name: { $regex: '^' + search } })
        .select('_id name vehicles')
        .exec((err, characters) => {
          if (err) {
            console.log(err);
            rej(new Error(notifMsgs.errors.COULD_NOT_GET_CHARACTERS));
          }
          
          res(characters);
        });
    })
};

module.exports = characterData;
