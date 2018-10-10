import React, {Component, PropTypes} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core'

import Config from './../../config';


class JoinFormDialog extends Component {
    constructor(props) {
        super(props);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._handleFormCancel = this._handleFormCancel.bind(this);
    }

    state = {
        email: '',
        password: '',
        usernameHasErrors: false,
        passwordHasErrors: false
    };

    handleChange = (that, name) => event => {
        this.setState({
            [name]: event.target.value,
            usernameHasError: true
        });
        console.log(that.refs.username)



    };


    _handleFormSubmit(e) {
        //e.preventDefault();

        let username = this.state.email;
        let password = this.state.password;
        console.log(this.state.email);

        if (username.length >= 1 && password.length >= 1) {
            this.props.handleSubmit(username, password, 'join');
        } else {
            // put form in error
        }




    }

    _handleFormCancel(e) {
        this.props.handleSubmit(null, null, 'cancel');

    }


    componentDidMount() {
        if (Config.environment.isDevelopment()) {
            console.log("config in dev mode")
            this.setState({
                email: 'guest@mail.com',
                password: 'guest123'

            })
        }

    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <DialogTitle id="join-form-dialog-title">Join the Celestials</DialogTitle>
                    <DialogContent>

                        <Typography variant="subtitle1">
                            [To join the Celestials, please enter your email address here. We will send
                            updates occasionally.]
                        </Typography>


                        <TextField
                            label="Email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.email}
                            onChange={this.handleChange(this, 'email')}
                            placeholder="you@mail.com"
                            ref="username"
                            fullWidth
                            error={this.state.usernameHasErrors}
                            margin="normal"
                        />
                        <TextField
                            error={this.state.passwordHasErrors}
                            label="Password"
                            type="password"
                            placeholder="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.password}
                            onChange={this.handleChange(this, 'password')}
                            ref="password"
                            fullWidth
                            margin="normal"
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this._handleFormCancel} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this._handleFormSubmit} color="primary">
                            Join
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default JoinFormDialog;
