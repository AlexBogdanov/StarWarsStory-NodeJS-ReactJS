const dataMsgs = require('./../constants/data-msgs');
const { userData } = require('./../data');

const User = require('mongoose').model('User');

module.exports = {
    register: async (req, res) => {
        userData.register(req.body)
            .then(data => {
                res.success(
                    true,
                    data.msg,
                    data.user,
                    200
                );
            }).catch(err => {
                console.log(err);

                res.success(
                    false,
                    err.message,
                    null,
                    500
                );
            })
    },
    logout: async (req, res) => {
        try {
            await req.logout();
            res.success(
                true,
                dataMsgs.success.LOGOUT,
                null,
                200
            );
        } catch (err) {
            console.log(err);
            res.success(
                false,
                dataMsgs.errors.SOMETHING_WENT_WRONG,
                null,
                500
            );
        }
    },
    login: async (req, res) => {
        const userInput = req.body;

        userData.login(userInput)
            .then(user => {
                req.login(user, err => {
                    if (err) {
                        console.log(err);

                        res.success(
                            false,
                            dataMsgs.errors.LOGIN_FAILED,
                            null,
                            500
                        );
                        return;
                    }

                    res.success(
                        true,
                        dataMsgs.success.USER_LOGGEDIN,
                        user,
                        200
                    );
                });
            }).catch(err => {
                console.log(err);

                res.success(
                    false,
                    err.message,
                    null,
                    500
                );
            });
    }
};