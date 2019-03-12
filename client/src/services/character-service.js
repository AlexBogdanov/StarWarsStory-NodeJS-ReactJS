import { baseUrl } from './../constants/urls';

const getAllCharactersUrl = `${baseUrl}/character/all`;

const characterService = {
    getAllCharacters: () => {
        return fetch(getAllCharactersUrl);
    }
};

export default characterService;
