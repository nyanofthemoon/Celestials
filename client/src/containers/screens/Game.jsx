import React, {Component} from 'react'
import { Typography } from '@material-ui/core'

class GameScreen extends Component {
    render() {
        const {engine} = this.props;
        return (
            <div >
                <Typography variant={"h1"}>
                Game Screen
                </Typography>
            </div>
        );
    }
}

export default GameScreen;