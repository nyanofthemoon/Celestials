import React, {Component, PropTypes} from 'react'


class GameScreen extends Component {
    render() {
        const {engine} = this.props;
        return (<div className="flex-vertical-container">
            <h1 className="logo">Game Screen</h1>
        </div>);
    }
}

export default GameScreen;