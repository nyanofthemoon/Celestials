import {fromJS} from 'immutable'

import Config from './../config'
import * as types from './../constants/ActionTypes'

const initialState = fromJS({
    status: null,

});


const era = (state = initialState, action) => {
    let actionIsInCurrentReducer = true;
    let nextState;
    switch (action.type) {
        default:
            actionIsInCurrentReducer = false;
            break;

    };
    if (Config.environment.isVerbose() && actionIsInCurrentReducer) { console.log('[Reducer  ] Engine ' + action.type) } // eslint-disable-line no-console
    return nextState || state
};


export default era;
