import { get, post, put, del } from './ajax-service';

const getAllCharactersUrl = '/character/all';
const getCharacterByIdUrl = '/character/character';
const createCharacterUrl = '/character/create';
const editCharacterUrl = '/character/edit';
const deleteCharacterByIdUrl = '/character/delete';

const characterService = {
    getAllCharacters: () => {
        return get(getAllCharactersUrl, false);
    },

    getCharacterById: (characterId) => {
        return get(`${getCharacterByIdUrl}/${characterId}`, true)
    },

    createCharacter: (character) => {
        return post(createCharacterUrl, character, true);
    },

    editCharacter: (characterId, character) => {
        return put(editCharacterUrl, { characterId, character }, true);
    },

    deleteCharacterById: (characterId) => {
        return del(`${deleteCharacterByIdUrl}/${characterId}`, true);
    }
};

export default characterService;
