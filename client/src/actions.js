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




export function loginCompletion() {
    return {type: types.LOGIN}
    Store.dispatch(stopLoading())
}

