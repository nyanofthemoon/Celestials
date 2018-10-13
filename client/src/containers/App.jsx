import { hot } from 'react-hot-loader'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Loader from '../components/Loader'
import HomeScreen from './screens/Home'
import GameScreen from './screens/Game'
import CircularLoader from '../components/CircularLoader'
import Era from '../components/Era'
import {assetLoaderCompletion, requestAuthentication, requestAccountCreation } from '../actions'


class App extends Component {
    render() {

        const {engine, actions, player} = this.props;
        let component = null;
        let eraComponent  = <Era/>;

        switch(engine.get('status')) {
            default:
            case 'loading':
                component = <Loader handleCompletion={actions.assetLoaderCompletion}/>;
                break;
            case 'loaded':
                component = <HomeScreen
                    handlePlayFormSubmission={actions.requestAuthentication}
                    handleJoinFormSubmission={actions.requestAccountCreation}
                />;
                break;
            case 'connected':
                component = <GameScreen />;
                break;
        }

        return (
            <CircularLoader show={engine.get('loading')} status={engine.get('message')} player={player.get('data')}>
                {component}
                {eraComponent}
            </CircularLoader>
        )


    }
}

function mapStateToProps(state) {
    return {
        engine: state.engine,
        player: state.player
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            assetLoaderCompletion,
            requestAuthentication,
            requestAccountCreation
        }, dispatch)
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default hot(module)(ConnectedApp)
