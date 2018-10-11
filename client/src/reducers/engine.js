import {fromJS} from 'immutable'

import Config from './../config'
import * as types from './../constants/ActionTypes'

const initialState = fromJS({
    loading: true,
    status: 'loading'
});

const engine = (state = initialState, action) => {
    let actionIsInCurrentReducer = true;
    let nextState;
    switch (action.type) {
        case types.ASSET_LOADER_COMPLETION:
            nextState = fromJS(state).merge({
                'status':'loaded',
                'loading': false
            });
            break;
        case types.LOGIN_SUCCESS:
            nextState = fromJS(state).set('status', 'connected');
            break;
        case types.LOGIN_FAILED:
            nextState = fromJS(state).merge({
                'status':'loaded',
                'loading': false
            });
            break;
        case types.SHOW_LOADING:
            nextState = fromJS(state).set('loading', true);
            break;
        case types.HIDE_LOADING:
            nextState = fromJS(state).set('loading', false);
            break;
        case types.REQUEST_AUTH:
            nextState = fromJS(state).merge({
                'status':'request_auth',
                'loading': true
            });
            break;
        default:
            actionIsInCurrentReducer = false;
            break;
    }
    if (Config.environment.isVerbose() && actionIsInCurrentReducer) { console.log('[Reducer  ] Engine ' + action.type) } // eslint-disable-line no-console
    return nextState || state
}

export default engine
