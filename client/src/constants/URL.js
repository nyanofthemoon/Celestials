import https from 'https';
import Config from '../config'


export const AUTH_URL = 'https://localhost:8000';
export const AUTH_URL_API = '/api/auth/';
export const AUTH_URL_API_STATUS =  '/api/auth/status';

export const agent = new https.Agent({
    rejectUnauthorized: false
});


export const config = {

}