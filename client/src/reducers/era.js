import {fromJS} from 'immutable'

import Config from './../config'
import * as types from './../constants/ActionTypes'

const initialState = fromJS({
    data: null,
    generation: null,

});


const era = (state = initialState, action) => {
    let actionIsInCurrentReducer = true;
    let nextState;
    switch (action.type) {
        case types.REQUEST_ERA_INFORMATION:
            nextState = fromJS(state).set('data', fromJS(action.payload));
            break;

        case types.REQUEST_ERA_GENERATION:
            nextState = fromJS(state).set('generation', fromJS(action.payload));
            break;
        default:
            actionIsInCurrentReducer = false;
            break;

    };
    if (Config.environment.isVerbose() && actionIsInCurrentReducer) { console.log('[Reducer  ] Engine ' + action.type) } // eslint-disable-line no-console
    return nextState || state
};


export default era;
