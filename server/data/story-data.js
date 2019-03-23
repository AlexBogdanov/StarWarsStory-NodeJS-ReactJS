const Story = require('./../models/Story');
const notifMsgs = require('./../constants/notification-messages');

const storyData = {
    getAll: async () => {
        try {
            const stories = await Story.find({});
            return { stories, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_STORIES);
        }
    },

    getById: async (id) => {
        try {
            const story = await Story.findById(id);
            return { story, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.STORY_DOES_NOT_EXIST);
        }
    },

    create: async (storyInput) => {
        try {
            const story = await Story.create(storyInput)
            return { story, msg: notifMsgs.success.STORY_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_STORY);
        }
    },

    edit: async (id, newStoryInput) => {
        try {
            const story = await Story.findById(id);

            Object.keys(newStoryInput).forEach(newProp => {
                story[newProp] = newStoryInput[newProp];
            });

            await story.save();
            return { story, msg: notifMsgs.success.STORY_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_STORY);
        }
    },

    delete: async (id) => {
        try {
            await Story.findByIdAndDelete(id);
            return notifMsgs.success.STORY_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_STORY);
        }
    }
};

module.exports = storyData;
