import React, {Component, PropTypes} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Config from './../../config';


class LoginForm extends Component {
    _handleFormSubmit(e) {
        e.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        if (username.length >= 1 && password.length >= 1) {
            this.props.handleSubmit(username, password);
        }
    }
    componentDidMount() {
        if (Config.environment.isDevelopment()) {
            this.refs.username.value = 'guest'
            this.refs.password.value = 'guest123'
        }
    }
    render() {
        return (
            <form className="flex-horizontal-container" action="" onSubmit={this._handleFormSubmit.bind(this)}>
                <TextField
                    id="email"
                    label="Email"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="username"
                    helperText="you@mail.net"
                    ref="username"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    ref="password"
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Play</Button>
            </form>
        );
    }
}

export default LoginForm;
