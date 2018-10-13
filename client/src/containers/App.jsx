import { hot } from 'react-hot-loader'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Loader from '../components/Loader'
import HomeScreen from './screens/Home'
import GameScreen from './screens/Game'
import CircularLoader from '../components/CircularLoader'
import {assetLoaderCompletion, requestAuthentication,
    requestAccountCreation, requestEraInformation } from '../actions'


class App extends Component {
    render() {

        const {engine, actions, player, era} = this.props;
        let engineComponent = null;


        switch(engine.get('status')) {
            default:
            case 'loading':
                engineComponent = <Loader handleCompletion={actions.assetLoaderCompletion}/>;
                break;
            case 'loaded':
                engineComponent = <HomeScreen
                    handlePlayFormSubmission={actions.requestAuthentication}
                    handleJoinFormSubmission={actions.requestAccountCreation}
                    handleRequestForEraInformation={actions.requestEraInformation}
                    era={era}
                />;


                break;
            case 'connected':
                engineComponent = <GameScreen era={era} player={player}/>;

                break;
        }

        return (
            <CircularLoader show={engine.get('loading')} status={engine.get('message')} player={player.get('data')}>
                {engineComponent}
            </CircularLoader>
        )


    }
}

function mapStateToProps(state) {
    return {
        engine: state.engine,
        player: state.player,
        era: state.era
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            assetLoaderCompletion,
            requestAuthentication,
            requestAccountCreation,
            requestEraInformation
        }, dispatch)
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default hot(module)(ConnectedApp)
