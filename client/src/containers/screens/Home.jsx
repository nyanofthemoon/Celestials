import React, {Component, PropTypes} from 'react'

import LoginForm from './../../components/forms/Login';
import {noop} from './../../actions';


class HomeScreen extends Component {
    render() {
        const {engine} = this.props;
        return (<div className="flex-vertical-container">
            <h1 className="logo">Home Screen</h1>
            <LoginForm handleSubmit={noop}/>
        </div>);
    }
}

export default HomeScreen;