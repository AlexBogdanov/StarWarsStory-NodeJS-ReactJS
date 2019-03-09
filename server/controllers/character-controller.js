const { characterData } = require('./../data');

module.exports = {
    getAll: (req, res) => {
        characterData.getAll()
        .then(data => {
            res.success(
                true,
                data.msg,
                data.characters,
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
        const id = req.params.characterId

        characterData.getById(id)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.character,
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
        characterData.create(req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.character,
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
        const id = req.params.characterId;

    characterData.edit(id, req.body)
        .then(data => {
            res.success(
                true,
                data.msg,
                data.character,
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
        const id = req.params.characterId;

        characterData.delete(id)
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
