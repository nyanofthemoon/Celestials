import React, {Component, PropTypes} from 'react'
import Button from '@material-ui/core/Button';
import JoinFormDialog from '../../components/forms/JoinFormDialog'
import { Typography } from '@material-ui/core'


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joinFormDialogOpen: false,
            playFormDialogOpen: false
        };
        this.openJoinFormDialog = this.openJoinFormDialog.bind(this);
        this.openPlayFormDialog = this.openPlayFormDialog.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openJoinFormDialog() {
        this.setState({
            joinFormDialogOpen: true,
            playFormDialogOpen: false
        })
    }

    openPlayFormDialog() {
        this.setState({
            joinFormDialogOpen: false,
            playFormDialogOpen: true
        })
    }

    handleSubmit = (username, password, action) => {
        this.setState({ open: false });
        console.log(`${action} with username ${username} and password '${password}'`);
        this.setState({
            joinFormDialogOpen: false,
            playFormDialogOpen: false
        })

    };


    render() {
        const {engine} = this.props;
        return (
            <div>
                <Typography variant='h5' gutterBottom>
                    Celestials
                </Typography>

                <img src="http://fpoimg.com/300x300?text=Celestials Logo"/>
                <br/>
                <Button variant="contained" onClick={this.openJoinFormDialog}>join</Button>
                <span>or</span>
                <Button variant="contained" color="primary" onClick={this.openPlayFormDialog}>play</Button>

                <JoinFormDialog
                    open={this.state.joinFormDialogOpen}
                    handleSubmit={this.handleSubmit}>

                </JoinFormDialog>
            </div>
        );
    }
}

export default HomeScreen;
