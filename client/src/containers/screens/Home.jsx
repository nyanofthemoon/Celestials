import React, {Component, PropTypes} from 'react'
import Button from '@material-ui/core/Button';

import TemporaryDrawer from '../../components/TemporaryDrawer'








class HomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            joinDrawerOpen: false,
            playDrawerOpen: false
        }
        this.openJoinDrawer = this.openJoinDrawer.bind(this);
        this.openPlayDrawer = this.openPlayDrawer.bind(this);
    }

    openJoinDrawer() {
        this.setState({
            joinDrawerOpen: true,
            playDrawerOpen: false
        })
    }

    openPlayDrawer() {
        this.setState({
            joinDrawerOpen: false,
            playDrawerOpen: true
        })
    }

    render() {
        const {engine} = this.props;
        return (<div>
                    <h1>Celestials</h1>
                    <img src="http://fpoimg.com/300x300?text=Celestials Logo"/>
                    <br/>
                    <Button variant="contained" onClick={this.openJoinDrawer}>join</Button>
                    <span>or</span>
                    <Button variant="contained" color="primary" onClick={this.openPlayDrawer}>play</Button>
                    <TemporaryDrawer open={this.state.joinDrawerOpen} anchor='bottom'>Join Drawer</TemporaryDrawer>
                    <TemporaryDrawer open={this.state.playDrawerOpen} anchor='bottom'>Play Drawer</TemporaryDrawer>
                </div>
        );
    }
}

export default HomeScreen;