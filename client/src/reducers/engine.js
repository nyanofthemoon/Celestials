import {fromJS} from 'immutable'

import Config from './../config'
import * as types from './../constants/ActionTypes'

const initialState = fromJS({
    loading: true,
    status: 'loading',
    message: 'Running α 1.0',

});

const engine = (state = initialState, action) => {
    let actionIsInCurrentReducer = true;
    let nextState;
    const previousMsg = initialState.get('message');
    switch (action.type) {
        case types.ASSET_LOADER_COMPLETION:
            nextState = fromJS(state).merge({
                'status':'loaded',
                'loading': false,
                'message': previousMsg + ' - assets loaded'
            });
            break;
        case types.AUTHORIZATION_SUCCESS:
            nextState = fromJS(state).merge({
                'status': 'connected',
                'message': previousMsg
            });
            break;
        case types.ACCOUNT_CREATION_SUCCESS:
            nextState = fromJS(state).merge({
                'message': previousMsg + ' - account creation success'
            });
            break;
        case types.ACCOUNT_CREATION_FAILED:
            nextState = fromJS(state).merge({
                'message': previousMsg + ' - account creation failed'
            });
            break;
        case types.AUTHORIZATION_FAILED:
            nextState = fromJS(state).merge({
                'status':'loaded',
                'loading': false,
                'message': previousMsg + ' - authorization failed'
            });
            break;
        case types.SHOW_LOADING:
            nextState = fromJS(state).set('loading', true);
            break;
        case types.HIDE_LOADING:
            nextState = fromJS(state).set('loading', false);
            break;
        case types.REQUEST_AUTHORIZATION:
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
};

export default engine
