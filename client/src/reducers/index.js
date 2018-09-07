import {combineReducers} from 'redux'
import engine from './engine'
import player from './player'

const rootReducer = combineReducers({
    engine,
    player
})

export default rootReducer
