import { post, get } from './ajax-service';

const registerUrl = '/user/register';
const loginUrl = '/user/login';
const searchUrl = '/user/find';

const userService = {
    register: (user) => {
        return post(registerUrl, user, null);
    },
    
    login: (user) => {
        return post(loginUrl, user, null);
    },

    search: (searchStr) => {
        return get(`${searchUrl}/?search=${searchStr}`);
    }
}

export default userService;
