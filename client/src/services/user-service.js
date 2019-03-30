import { post } from './ajax-service';

const registerUrl = '/user/register';
const loginUrl = '/user/login';

const userService = {
    register: (user) => {
        return post(registerUrl, user, null);
    },
    
    login: (user) => {
        return post(loginUrl, user, null);
    }
}

export default userService;
