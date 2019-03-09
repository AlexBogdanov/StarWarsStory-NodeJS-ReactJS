const dataMsgs = require('./../constants/data-msgs');
const Character = require('./../models/Character');

module.exports = {
    getAll: async () => {
        try {
            const characters = await Character.find({});
            return { characters, msg: dataMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.SOMETHING_WENT_WRONG);
        }
    },

    getById: async(id) => {
        try {
            const character = await Character.findById(id);
            return { character, msg: dataMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.CHARACTER_DOES_NOT_EXIST);
        }
    },

    create: async (characterInput) => {
        try {
            const character = await Character.create(characterInput);
            return { character, msg: dataMsgs.success.CHARACTER_CREATED }
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.UNABLE_TO_CREATE_CHARACTER);
        }
    },

    edit: async (id, newCharacterInput) => {
        try {
            const character = await Character.findById(id);

            Object.keys(newCharacterInput).forEach(newProp => {
                character[newProp] = newCharacterInput[newProp];
            });

            await character.save();
            return { character, msg: dataMsgs.success.CHARACTER_EDITED };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_EDIT_CHARACTER);
        }
    },

    delete: async (id) => {
        try {
            await Character.findByIdAndDelete(id);
            return dataMsgs.success.CHARACTER_DELETED
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_DELETE_CHARACTER);
        }
    }
};
