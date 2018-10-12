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
    if (!Config.environment.isDevelopment()) {
      return createStore(rootReducer, {}, applyMiddleware(thunk));
    }

    let store = null
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      store = createStore(rootReducer, {}, compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__()
      ))
    } else {
      store = createStore(rootReducer, {}, applyMiddleware(thunk));
    }

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default;
            store.replaceReducer(nextReducer)
        })
    }

    return store
}

export default configureStore()
