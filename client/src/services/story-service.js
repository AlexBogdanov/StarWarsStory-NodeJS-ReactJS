import { baseUrl } from './../constants/urls';

const getAllStoriesUrl = `${baseUrl}/story/all`;

const storyService = {
    getAllStories: () => {
        return fetch(getAllStoriesUrl);
    }
};

export default storyService;
