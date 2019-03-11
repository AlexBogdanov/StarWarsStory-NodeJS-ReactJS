import { baseUrl } from './../constants/urls';

const registerUrl = `${baseUrl}/user/register`;
const loginUrl = `${baseUrl}/user/login`;

const userService = {
    register: (user) => {
        return fetch(registerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    },
    
    login: (user) => {
        return fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    }
}

export default userService;
