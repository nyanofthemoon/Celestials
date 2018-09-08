import React, {Component, PropTypes} from 'react'
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
            let timestamp            = new Date().getTime()
            this.refs.username.value = 'guest'
            this.refs.password.value = 'guest123'
        }
    }
    render() {
        return (
            <form className="flex-horizontal-container" action="" onSubmit={this._handleFormSubmit.bind(this)}>
                <div>
                    <input type="text" ref="username" placeholder="username"/>
                </div>
                <div>
                    <input type="password" ref="password" placeholder="password"/>
                </div>
                <div>
                    <button type="submit">Play</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;
