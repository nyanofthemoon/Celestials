import {fromJS} from 'immutable'

import Config from './../config'
import * as types from './../constants/ActionTypes'

const initialState = fromJS({

    data: {
        email: '',
        token: null,
    }
});

const player = (state = initialState, action) => {
    let actionIsInCurrentReducer = true;
    let newState;
    switch (action.type) {
        case (types.AUTHORIZATION_SUCCESS):
            newState = fromJS(state).set('data', fromJS(action.payload));
            break;
        default:
            actionIsInCurrentReducer = false;
            break
        }
    if (Config.environment.isVerbose() && actionIsInCurrentReducer) { console.log('[Reducer  ] Player ' + action.type) } // eslint-disable-line no-console
    return newState || state
};

export default player
