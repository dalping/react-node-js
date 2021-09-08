import axios from 'axios';
import {LOGIN_USER, REGISTER_USER} from './types';

export function loginUser(dataToSubmit){

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    console.log(request); //Promise 반환

    return { //action of reducers
        type: LOGIN_USER,
        payload: request 
    }
}

export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    console.log(request); //promise 형태로 반환됨

    return {
        type: REGISTER_USER,
        payload: request
    }
}