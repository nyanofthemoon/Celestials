import Config from './config';
import * as types from './constants/ActionTypes'
import Store from './store'

let dispatch;


function _getState() {
    return Store.getState();
}

export function noop() {}

export function assetLoaderCompletion(musics, sounds) {
    if (Config.environment.isVerbose()) { console.log('[Action   ] Run ' + types.ASSET_LOADER_COMPLETION); }
    return {type: types.ASSET_LOADER_COMPLETION}
}

