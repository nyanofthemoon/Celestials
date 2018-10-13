import React, {Component} from 'react'
import { Button, Typography } from '@material-ui/core'

import JoinFormDialog from '../../components/forms/JoinFormDialog';
import PlayFormDialog from '../../components/forms/PlayFormDialog';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        // this.openJoinFormDialog = this.openJoinFormDialog.bind(this);
        // this.openPlayFormDialog = this.openPlayFormDialog.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        joinFormDialogOpen: false,
        joinFormErrorMessage: null,
        playFormDialogOpen: false,
        playFormErrorMessage: null,
    };

    togglePlayFormDialog = () => {
        this.setState({
            playFormDialogOpen: !this.state.playFormDialogOpen
        });
    };

    toggleJoinFormDialog = () => {
        this.setState({
            joinFormDialogOpen: !this.state.joinFormDialogOpen
        });
    };

    handleJoinFormSubmit = (username, password) => {
        //@TODO :D
        var that  = this;
        console.log(`handleJoinFormSubmit with username ${username} and password '${password}'`);

        this.props.handleJoinFormSubmission(username, password, (error) => {
            if (error) {
                this.setState({
                    joinFormErrorMessage: error
                })
            } else {
                this.setState({
                    joinFormDialogOpen: !this.state.joinFormDialogOpen
                });
            }
        });
        //
    };

    handlePlayFormSubmit = (username, password) => {
        console.log(`handlePlayFormSubmit with username ${username} and password '${password}'`);
        console.log('logging in....');
        this.props.handlePlayFormSubmission(username, password, (error) => {
            this.setState({
                playFormErrorMessage: error
            })
        });
        //this.togglePlayFormDialog();
    };

/*
    handleSubmit = (username, password, action) => {
        var that  = this;
        console.log(`${action} with username ${username} and password '${password}'`);

        switch (action) {
            case 'login':
                //@TODO connect to api auth to validate

                that.props.handlePlayFormSubmission(username, password, (error) => {
                    that.setState({
                        playFormErrorMessage: error
                    })
                });
                console.log('AM I waiting for the result ?');
                break;
            case 'join':
                console.log('joining in the Celestials');
                //@TODO connect to api to register
                //that.props.handleJoinFormSubmission(username, password, (error) => { @TODO });
                break;
            case 'cancel':
                this.setState({
                        joinFormDialogOpen: false,
                        playFormDialogOpen: false
                    });
            default:
                break;

        }
    };
*/

    render() {
        return (
            <div>
                <Typography variant='h5' gutterBottom>
                    Celestials
                </Typography>

                <img src="https://fpoimg.com/300x300?text=Celestials Logo" />
                <br />
                <Button variant="contained" color="secondary" onClick={this.toggleJoinFormDialog}>join</Button>
                <span>or</span>
                <Button variant="contained" color="primary" onClick={this.togglePlayFormDialog}>play</Button>

                <JoinFormDialog
                    error={this.state.joinFormErrorMessage}
                    open={this.state.joinFormDialogOpen}
                    handleCancel={this.toggleJoinFormDialog}
                    handleSubmit={this.handleJoinFormSubmit}
                >
                </JoinFormDialog>

                <PlayFormDialog
                    error={this.state.playFormErrorMessage}
                    open={this.state.playFormDialogOpen}
                    handleCancel={this.togglePlayFormDialog}
                    handleSubmit={this.handlePlayFormSubmit}
                >
                </PlayFormDialog>
            </div>
        );
    }
}

export default HomeScreen;
