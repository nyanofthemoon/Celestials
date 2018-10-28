import React, {Component} from 'react'
import { Button, Typography, Grid } from '@material-ui/core'

import JoinFormDialog from '../../components/forms/JoinFormDialog';
import PlayFormDialog from '../../components/forms/PlayFormDialog';
import Era from '../../components/Era';

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

    componentDidMount() {
        this.props.handleRequestForEraInformation();
    }

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
    };

    render() {
        return (
            <div>

                <img src="https://fpoimg.com/300x300?text=Celestials Logo" />
                <br />
                <Button variant="contained" onClick={this.toggleJoinFormDialog}>join</Button>
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

                <Era era={this.props.era}
                     start={Date.now()}



                >

                </Era>


            </div>
        );
    }
}

export default HomeScreen;
