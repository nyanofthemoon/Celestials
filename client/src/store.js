import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import Config from './config'

const thunk = store => {
  const dispatch = store.dispatch
  const getState = store.getState
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}

function configureStore() {
    if (!Config.environment.isDevelopment() || !window.__REDUX_DEVTOOLS_EXTENSION__) {
      return createStore(rootReducer, {}, applyMiddleware(thunk));
    }

    return createStore(rootReducer, {}, compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default;
            store.replaceReducer(nextReducer)
        })
    }

    return store
}

export default configureStore()
