const { weaponData } = require('./../data');

module.exports = {
    getAll: (req, res) => {
        weaponData.getAll()
        .then(data => {
            res.success(
                true,
                data.msg,
                data.weapons,
                200
            );
        }).catch(err => {
            res.success(
                false,
                err.message,
                null,
                500
            );
        });
    },

    getById: (req, res) => {
        const id = req.params.weaponId;

        weaponData.getById(id)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.weapon,
                200
            );
        }).catch(err => {
            res.success(
                false,
                err.message,
                null,
                404
            );
        });
    },

    create: (req, res) => {
        weaponData.create(req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.weaponId,
                200
            );
        }).catch(err => {
            res.success(
                false,
                err.message,
                null,
                500
            );
        });
    },

    edit: (req, res) => {
        const id = req.params.weaponId;

        weaponData.edit(id, req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                null,
                200
            );
        }).catch(err => {
            res.success(
                false,
                err.message,
                null,
                500
            );
        });
    },

    delete: (req, res) => {
        const id = req.params.weaponId;

        weaponData.delete(id)
        .then(msg => {
            res.success(
                true,
                msg,
                null,
                200
            );
        }).catch(err => {
            res.success(
                false,
                err.message,
                null,
                500
            );
        });
    }
};
