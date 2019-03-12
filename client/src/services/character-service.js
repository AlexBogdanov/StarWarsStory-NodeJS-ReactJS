import { baseUrl } from './../constants/urls';

const characterUrl = `${baseUrl}/character`;
const getAllCharactersUrl = `${characterUrl}/all`;
const getCharacterByIdUrl = `${characterUrl}/character`;
const deleteCharacterByIdUrl = `${characterUrl}/delete`;
const editCharacterUrl = `${characterUrl}/edit`;
const createCharacterUrl = `${characterUrl}/create`;

const characterService = {
    getAllCharacters: () => {
        return fetch(getAllCharactersUrl);
    },

    getCharacterById: (characterId) => {
        return fetch(`${getCharacterByIdUrl}/${characterId}`);
    },

    deleteCharacterById: (characterId) => {
        return fetch(`${deleteCharacterByIdUrl}/${characterId}`, {
            method: 'DELETE'
        });
    },

    editCharacter: (characterId, character) => {
        return fetch(`${editCharacterUrl}/${characterId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character)
        });
    },

    createCharacter: (character) => {
        return fetch(createCharacterUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character)
        });
    }
};

export default characterService;
