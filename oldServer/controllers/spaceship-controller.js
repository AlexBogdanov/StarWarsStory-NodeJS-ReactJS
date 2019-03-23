const { spaceshipData } = require('./../data');

module.exports = {
    getAll: (req, res) => {
        spaceshipData.getAll()
        .then(data => {
            res.success(
                true,
                data.msg,
                data.spaceships,
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
        const id = req.params.spaceshipId;

        spaceshipData.getById(id)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.spaceship,
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
        spaceshipData.create(req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.spaceshipId,
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
        const id = req.params.spaceshipId;

        spaceshipData.edit(id, req.body)
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
        const id = req.params.spaceshipId;

        spaceshipData.delete(id)
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
