import React, {Component, PropTypes} from 'react'

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';




class HomeScreen extends Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };


    render() {
        const {engine} = this.props;
        return (<div>
                    <h1>Celestials</h1>
                    <img src="http://fpoimg.com/300x300?text=Celestials Logo"/>
                    <br/>
                    <Button variant="contained">join</Button>
                    <span>or</span>
                    <Button variant="contained" color="primary">play</Button>


                </div>
        );
    }
}

export default HomeScreen;