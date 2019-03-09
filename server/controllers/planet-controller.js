const { planetData } = require('./../data');

module.exports = {
    getAll: (req, res) => {
        planetData.getAll()
        .then(data => {
            res.success(
                true,
                data.msg,
                data.planets,
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
        const id = req.params.planetId;

        planetData.getById(id)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.planet,
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
        planetData.create(req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.planet,
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
        const id = req.params.planetId;

        planetData.edit(id, req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.planet,
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
        const id = req.params.planetId;

        planetData.delete(id)
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
