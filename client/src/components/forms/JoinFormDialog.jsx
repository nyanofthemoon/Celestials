import React, {Component} from 'react'
import { Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle }  from '@material-ui/core';
import Joi from 'joi';

import Config from './../../config';
import Validation from '../../../../server/validation';


class JoinFormDialog extends Component {
    constructor(props) {
        super(props);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        // this._handleFormCancel = this._handleFormCancel.bind(this);
    }

    state = {
        email: '',
        password: '',
        usernameHasErrors: false,
        passwordHasErrors: false,
        emailText: '',
        passwordText: ''
    };

    handleChange = (that, name) => event => {
        this.setState({
            [name]: event.target.value,
            usernameHasError: true
        });
    };

    _handleFormSubmit = ()  => {
        //e.preventDefault();
        let isError = false;
        let username = this.state.email;
        let password = this.state.password;

        // validate username // email
        let result = Joi.validate(username, Validation.validate.auth.schema.body.email);

        if (result.error) {
            const errorMsg = result.error.message;
            this.setState({
                usernameHasErrors: true,
                emailText: result.error.message
            });
            isError = true;
        }
        // valide password
        result = Joi.validate(password, Validation.validate.auth.schema.body.password);
        if (result.error) {
            const errorMsg = result.error.message;
            this.setState({
                passwordHasErrors: true,
                passwordText: result.error.message

            });
            isError = true;
        }

        if (!isError) {
            this.props.handleSubmit(username, password);
        }
    };

    _handleFormCancel = () => {
        this.props.handleCancel();
    };


    _handleFormCaption = () => {

        if (this.props.error) {
            return (
                <Typography variant="subtitle1">
                    {this.props.error}
                </Typography>
            )
        } else {
            return(
                <Typography variant="subtitle2">
                    [To join please fill form.]
                </Typography>
            )

        }

    };


    componentDidMount() {
        if (Config.environment.isDevelopment()) {
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

                        {this._handleFormCaption()}


                        <TextField
                            required={true}
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
                            helperText={this.state.emailText}
                        />
                        <TextField
                            required={true}
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
                            helperText={this.state.passwordText}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this._handleFormCancel}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={this._handleFormSubmit} color="secondary">
                            Join
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default JoinFormDialog;
