import { hot } from 'react-hot-loader'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Loader from './../components/Loader'
import HomeScreen from './screens/Home'
import GameScreen from './screens/Game'
import CircularLoader from '../components/CircularLoader'
import {assetLoaderCompletion, loginCompletion, startLoading, stopLoading} from './../actions'


class App extends Component {
    render() {

        const {engine, actions} = this.props;
        let component = null;

        switch(engine.get('status')) {
            default:
            case 'loading':
                component = <Loader handleCompletion={actions.assetLoaderCompletion}/>;
                break;
            case 'loaded':
                component = <HomeScreen handleCompletion={actions.loginCompletion}/>
                break;
            case 'connected':
                component = <GameScreen />
                break;
        }

        return (
            <CircularLoader show={engine.get('loading')}>
                {component}
            </CircularLoader>
        )


    }
}

function mapStateToProps(state) {
    return {
        engine: state.engine
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            assetLoaderCompletion,
            loginCompletion,
            startLoading,
            stopLoading
        }, dispatch)
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default hot(module)(ConnectedApp)
