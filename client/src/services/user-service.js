import { baseUrl } from './../constants/urls';

const registerUrl = `${baseUrl}/register`;
const loginUrl = `${baseUrl}/login`;

const userService = {
    register: (user) => {
        return fetch(registerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    },
    
    login: (user) => {
        debugger;
        return fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    }
}

export default userService;
