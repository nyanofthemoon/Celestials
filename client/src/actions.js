import 'cross-fetch/polyfill';
import Axios from 'axios';
import https from 'https';

import Config from './config'
import * as types from './constants/ActionTypes'
import Store from './store'

function _getState() {
    return Store.getState()
}

export function noop() {
    return {type: types.NOOP}
}

export function assetLoaderCompletion(musics, sounds) {
    if (Config.environment.isVerbose()) { console.log('[Action   ] Run ' + types.ASSET_LOADER_COMPLETION) }
    return {type: types.ASSET_LOADER_COMPLETION}
}

export function startLoading() {
    return {type: types.SHOW_LOADING}
}

export function stopLoading() {
    return {type: types.HIDE_LOADING}
}

/*
export function requestAuth(username, password) {
    Store.dispatch(startLoading());

    console.log(`requesting auth to server ... with username=${username} and password=${password}`);

    // result = axios.post(username, pass)
//     if result.code != 200
//         Store.dispatch(stopLoading())
//         return {type: types.REQUEST_AUTH_FAILED}
// }else {
//     Store.dispatch(stopLoading())
//         return {type: types.REQUEST_AUTH_SUCCESS, paylod: result.data}
//     }
    //setTimeout((username,password) => completeAuth(username,password), 3000);


    const result = completeAuth(username, password);
    return result



    // if (username === 'guest@mail.com' && password === 'guest123') {
    //     return {type: types.AUTH_SUCCESS}
    // } else {
    //     return {type: types.AUTH_FAILED}
    // }

}*/

export function authFailed() {
    return {type: types.AUTH_FAILED}
}


export function AuthSuccess() {
    return {type: types.AUTH_SUCCESS}
    Store.dispatch(stopLoading())
}

function completeAuth(username, password) {
    Store.dispatch(stopLoading());
    if (username === 'guest@mail.com' && password === 'guest123') {
        return {type: types.AUTH_SUCCESS, payload: { email: username }}
    } else {
        return {type: types.AUTH_FAILED}
    }

}


export function requestAuthWithFetch(username, password) {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    let response = await fetch('https://localhost:8000/api/auth/status');
    let data = await response.json();
    dispatch({type: types.AUTH_SUCCESS, payload: { email: data }});
    dispatch(stopLoading())
  }
}

export function requestAuthWithAxios(username, password) {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        let response = await Axios.get('https://localhost:8000/api/auth/status', {httpsAgent: agent});
        // let data = await response.json();

        console.log(response.data.data)


        dispatch({type: types.AUTH_SUCCESS, payload: { email: username }});
        dispatch(stopLoading())
    }
}
