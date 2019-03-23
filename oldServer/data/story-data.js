const dataMsgs = require('./../constants/data-msgs');
const Story = require('./../models/Story');

module.exports = {
    getAll: async () => {
        try {
            const stories = await Story.find({});
            return { stories, msg: dataMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(dataMsgs.errors.SOMETHING_WENT_WRONG);
        }
    },

    getById: async (id) => {
        try {
            const story = await Story.findById(id);
            return { story, msg: dataMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.STORY_DOES_NOT_EXIST);
        }
    },

    create: async (storyInput) => {
        try {
            const story = await Story.create(storyInput)
            return { story, msg: dataMsgs.success.STORY_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.UNABLE_TO_CREATE_STORY);
        }
    },

    edit: async (id, newStoryInput) => {
        try {
            const story = await Story.findById(id);

            Object.keys(newStoryInput).forEach(newProp => {
                story[newProp] = newStoryInput[newProp];
            });

            await story.save();
            return { story, msg: dataMsgs.success.STORY_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_EDIT_STORY);
        }
    },

    delete: async (id) => {
        try {
            await Story.findByIdAndDelete(id);
            return dataMsgs.success.STORY_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(dataMsgs.errors.FAILED_TO_DELETE_STORY);
        }
    }
};
