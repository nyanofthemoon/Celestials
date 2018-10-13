import 'cross-fetch/polyfill';

import Config from './config'
import * as types from './constants/ActionTypes'
import * as url from './constants/URL'
import Store from './store'

function _getState() {
    return Store.getState()
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

export function authFailed() {
    return {type: types.AUTHORIZATION_FAILED}
}


export function AuthSuccess() {
    return {type: types.AUTHORIZATION_SUCCESS}
    // Store.dispatch(stopLoading())
}


export function __requestAccountCreation(username, password, callback) {
    // Store.dispatch(stopLoading());
    if (username === 'guest@mail.com' && password === 'guest123') {
        callback(null);
        return {type: types.ACCOUNT_CREATION_SUCCESS, payload: { email: username, password: password }}
    } else {
        const errorMsg= 'User Already exist';
        callback(errorMsg);
        return {type: types.ACCOUNT_CREATION_FAILED}
    }

}

export function requestAccountCreation(username, password, callback) {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const url = 'https://localhost:8100/api/account';

        try {
            let response = await fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow",
                body: JSON.stringify({email: username, password: password}),
            });
            console.log('sent');
            if (response.ok) {
                let result = await response.json();
                console.log('account creation request received result:');
                console.log(result);
                dispatch({type: types.ACCOUNT_CREATION_SUCCESS});
                callback(null); // to close Join dialog
            } else {
                console.log('Error occurs');
                console.log(response);
                dispatch({type: types.ACCOUNT_CREATION_FAILED});
                callback(response.statusText)
                return;
            }
            dispatch(stopLoading());
            dispatch(requestAuthentication(username, password, callback));
            return;
        } catch(e) {
            console.log('requestAccountCreation failure');
            console.log(e.message);
            dispatch({type: types.ACCOUNT_CREATION_FAILED, payload: { email: username }});
            dispatch(stopLoading());
            callback(e.message);
            return;
        }

    }
}


export function requestAuthentication(username, password, callback) {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    const url = 'https://localhost:8000/api/auth';


    try {
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",
            body: JSON.stringify({email: username, password: password}),
        });
        console.log('sent');

        if (response.ok) {
            let result = await response.json();
            console.log('received result:');
            console.log(result);
            dispatch({type: types.AUTHORIZATION_SUCCESS, payload: { email: username, token: result.data.token }})
        } else {
            console.log('Error occurs');
            console.log(response);
            dispatch({type: types.AUTHORIZATION_FAILED, payload: { status: response.statusText }});
            callback(response.statusText)
        }
        dispatch(stopLoading());
        return;
    } catch(e) {
        console.log('requestAuthentication failure...');
        console.log(e.message);
        dispatch({type: types.AUTHORIZATION_FAILED, payload: { email: username }});
        dispatch(stopLoading());
        callback(e.message);
        return;
    }
  }
}
