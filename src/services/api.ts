import axios,{ AxiosError} from 'axios'
import { parseCookies} from 'nookies'

import { AuthTokenError } from './erros/AuthTokenError';

import { signOut } from '../contexts/AuthContext';

export function setupAPIClien(ctx = undefined){
    let cookied = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers:{
            Authorization: `Bearer ${cookied['@nextauth.token']}`
        }
    })
    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response?.status ===401){
            //qualquer erro 401(não autoizado) devemos deslogar o usuario
            if(typeof window !== undefined){
                //chamar a função para deslogar o usuario
                signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })
    return api;
}