import {fromJS} from 'immutable';

import Config from './../config';
import * as types from './../constants/ActionTypes'

const initialState = fromJS({
    data: {
    }
})

const player = (state = initialState, action) => {
    let actionIsInCurrentReducer = true;
    let newState;
    switch (action.type) {
        default:
            actionIsInCurrentReducer = false;
            break;
    }
    if (Config.environment.isVerbose() && actionIsInCurrentReducer) { console.log('[Reducer  ] Player ' + action.type); }
    return newState || state;
}

export default player
