const { movieData } = require('./../data');

module.exports = {
    getAll: (req, res) => {
        movieData.getAll()
        .then(data => {
            res.success(
                true,
                data.msg,
                data.movies,
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
        const id = req.params.movieId;

        movieData.getById(id)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.movie,
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
        movieData.create(req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.movie,
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
        const id = req.params.movieId;

        movieData.edit(id, req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.movie,
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
        const id = req.params.movieId;

        movieData.delete(id)
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
