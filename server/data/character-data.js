const notifMsgs = require('./../constants/notification-messages');
const Character = require('./../models/Character');

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
            const character = await Character.findById(id);
            return { character, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.CHARACTER_DOES_NOT_EXIST);
        }
    },

    create: async (characterInput) => {
        try {
            const character = await Character.create(characterInput);
            return { character, msg: notifMsgs.success.CHARACTER_CREATED }
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_CHARACTER);
        }
    },

    edit: async (id, newCharacterInput) => {
        try {
            const character = await Character.findById(id);

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

    delete: async (id) => {
        try {
            await Character.findByIdAndDelete(id);
            return notifMsgs.success.CHARACTER_DELETED
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_CHARACTER);
        }
    }
};

module.exports = characterData;