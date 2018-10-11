import {fromJS} from 'immutable'

import Config from './../config'
import * as types from './../constants/ActionTypes'

const initialState = fromJS({
    status: 'loading'
});

const engine = (state = initialState, action) => {
    let actionIsInCurrentReducer = true;
    let nextState;
    switch (action.type) {
    case types.ASSET_LOADER_COMPLETION:
        nextState = fromJS(state).set('status', 'loaded');
        break;
    case types.LOGIN:
        nextState = fromJS(state).set('status', 'connected');
        break;
    default:
        actionIsInCurrentReducer = false;
        break
    }
    if (Config.environment.isVerbose() && actionIsInCurrentReducer) { console.log('[Reducer  ] Engine ' + action.type) } // eslint-disable-line no-console
    return nextState || state
}

export default engine
