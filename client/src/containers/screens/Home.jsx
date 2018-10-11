import React, {Component} from 'react'
import { Button, Typography } from '@material-ui/core'

import JoinFormDialog from '../../components/forms/JoinFormDialog';
import LoginFormDialog from '../../components/forms/LoginFormDialog';

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
        var that  = this;
        console.log(`${action} with username ${username} and password '${password}'`);

        switch (action) {
            case 'login':
                //@TODO connect to api auth to validate
                console.log('logging in....');
                that.props.handleCompletion(username, password);

                break;
            case 'join':
                console.log('joining in the Celestials');
                //@TODO connect to api to register
                break;
            default:
                break;

        }
        this.setState({
            joinFormDialogOpen: false,
            playFormDialogOpen: false
        });

        //@TODO SUBMIT FORM SOMEWHERE :)
    };


    render() {
        const {engine} = this.props;
        return (
            <div>
                <Typography variant='h5' gutterBottom>
                    Celestials
                </Typography>

                <img src="http://fpoimg.com/300x300?text=Celestials Logo" />
                <br />
                <Button variant="contained" color="secondary" onClick={this.openJoinFormDialog}>join</Button>
                <span>or</span>
                <Button variant="contained" color="primary" onClick={this.openPlayFormDialog}>play</Button>

                <JoinFormDialog
                    open={this.state.joinFormDialogOpen}
                    handleSubmit={this.handleSubmit}>
                </JoinFormDialog>
                <LoginFormDialog
                    open={this.state.playFormDialogOpen}
                    handleSubmit={this.handleSubmit}>
                </LoginFormDialog>
            </div>
        );
    }
}

export default HomeScreen;
