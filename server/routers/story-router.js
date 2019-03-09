const router = require('express').Router();

const { storyController } = require('./../controllers');

router
    .get('/all', storyController.getAll)
    .get('/story/:storyId', storyController.getById)
    .post('/create', storyController.create)
    .put('/edit/:storyId', storyController.edit)
    .delete('/delete/:storyId', storyController.delete);

module.exports = router;
