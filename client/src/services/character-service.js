import { baseUrl } from './../constants/urls';

const token = localStorage.getItem('token')
    ? localStorage.getItem('token') : sessionStorage.getItem('token');
const characterUrl = `${baseUrl}/character`;
const getAllCharactersUrl = `${characterUrl}/all`;
const getCharacterByIdUrl = `${characterUrl}/character`;
const deleteCharacterByIdUrl = `${characterUrl}/delete`;
const editCharacterUrl = `${characterUrl}/edit`;
const createCharacterUrl = `${characterUrl}/create`;

const characterService = {
    getAllCharacters: () => {
        return fetch(getAllCharactersUrl, {
            method: 'GET',
            headers: { 'Authorization': `JWT ${token}` }
        });
    },

    getCharacterById: (characterId) => {
        return fetch(`${getCharacterByIdUrl}/${characterId}`, {
            method: 'GET',
            headers: { 'Authorization': `JWT ${token}` }
        });
    },

    deleteCharacterById: (characterId) => {
        return fetch(`${deleteCharacterByIdUrl}/${characterId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `JWT ${token}` }
        });
    },

    editCharacter: (characterId, character) => {
        return fetch(`${editCharacterUrl}/${characterId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${token}` },
            body: JSON.stringify(character)
        });
    },

    createCharacter: (character) => {
        return fetch(createCharacterUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${token}` },
            body: JSON.stringify(character)
        });
    }
};

export default characterService;
