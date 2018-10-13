import { combineReducers } from 'redux'
import engine from './engine'
import player from './player'
import era from './era'

const rootReducer = combineReducers({
    engine,
    player,
    era
});

export default rootReducer
