import { baseUrl } from './../constants/urls';
import axios from 'axios';

const registerUrl = `${baseUrl}/user/register`;

const register = (user) => {
    return window.fetch(registerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
};

export {
    register
}