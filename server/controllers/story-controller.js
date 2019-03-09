const { storyData } = require('./../data');

module.exports = {
    getAll: (req, res) => {
        storyData.getAll()
        .then(data => {
            res.success(
                true,
                data.msg,
                data.stories,
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
        const id = req.params.storyId;

        storyData.getById(id)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.story,
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
        storyData.create(req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.story,
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
        const id = req.params.storyId;

        storyData.edit(id, req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.story,
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
        const id = req.params.storyId;

        storyData.delete(id)
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
