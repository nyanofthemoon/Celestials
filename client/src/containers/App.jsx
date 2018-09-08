import { hot } from 'react-hot-loader'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Loader from './../components/Loader';
import HomeScreen from './screens/Home';
import GameScreen from './screens/Game';
import {assetLoaderCompletion} from './../actions';


class App extends Component {
    render() {
        const {engine, actions} = this.props
        switch(engine.get('status')) {
            default:
            case 'loading':
                return (<div className="flex-vertical-container light-text">
                    <h1 className="logo">Celestials</h1>
                    <Loader handleCompletion={actions.assetLoaderCompletion}/>
                </div>);
            case 'loaded':
                return <HomeScreen />;
            case 'connected':
                return <GameScreen />;
        }
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
            assetLoaderCompletion
        }, dispatch)
    }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default hot(module)(ConnectedApp);