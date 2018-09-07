import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

class Player extends Component {
    render() {
        const {player} = this.props
        return (<div id="player">[PLAYER]</div>);
    }
}

Player.contextTypes = {
    store: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        player: state.player
    }
}

export default connect(mapStateToProps)(Player);
