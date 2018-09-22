import { createStore } from 'redux'
import rootReducer from './reducers'
import Config from './config'

function configureStore() {

    if (!Config.environment.isDevelopment()) {
        return createStore(rootReducer)
    }

    const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}

export default configureStore()
