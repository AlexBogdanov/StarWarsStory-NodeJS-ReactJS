const encryption = require('./../utils/encryption');
const dataMsgs = require('./../constants/data-msgs');

const User = require('./../models/User');

module.exports = {
    register: async (userInput) => {
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, userInput.password);

        try {
            const user = await User.create({
                username: userInput.username,
                hashedPass,
                salt,
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                roles: ['User']
            });
            
            return { user, msg: dataMsgs.success.USER_REGISTERED };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.REGISTER_FAILED);
        }
    },

    login: async (userInput) => {
        try {
            const user = await User.findOne({ username: userInput.username });

            if (!user) {
                throw new Error(dataMsgs.errors.USER_DOES_NOT_EXIST);
            }

            if (!user.authenticate(userInput.password)) {
                throw new Error (dataMsgs.errors.INVALID_PASS);
            }

            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
};
