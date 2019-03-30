import { baseUrl } from './../constants/urls';

const authToken = localStorage.getItem('token')
    ? localStorage.getItem('token') : sessionStorage.getItem('token');

const get = (url, needToken) => {
    if (needToken) {
        return fetch (baseUrl + url, {
            method: 'GET',
            headers: { 'Authorization': `JWT ${authToken}` }
        });
    }

    return fetch(baseUrl + url);
}

const post = (url, data, needToken) => {
    const headers = { 'Content-Type': 'application/json' };

    if (needToken) {
        headers.Authorization = `JWT ${authToken}`;
    }

    return fetch(baseUrl + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });
};

const put = (url, data, needToken) => {
    const headers = { 'Content-Type': 'application/json' };

    if (needToken) {
        headers.Authorization = `JWT ${authToken}`;
    }

    return fetch(baseUrl + url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    })
};

const del = (url, needToken) => {
    if (needToken) {
        return fetch(baseUrl + url, {
            method: 'DELETE',
            headers: { 'Authorization': `JWT ${authToken}` }
        });
    }

    return fetch(baseUrl + url, { method: 'DELETE' });
}

export {
    get,
    post,
    put,
    del
};
