import React, {Component} from 'react'

import {loadAllGraphicsWithProgress} from '../helpers/loader';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step     : 'fetching',
            count    : 0,
            progress : 0
        };
    }
    componentWillMount() {
        var count  = 0;
        var assets = {};
        this.setState({
            remaining: assets,
            count: count
        });
    }
    componentDidMount() {
        var that  = this;
        function updateProgress() {
            that.setState({
                progress: (that.state.progress + 1)
            });
        }
        this.setState({ step: 'world' });
        that.props.handleCompletion();
    }
    render() {
        let percentage = Math.ceil((this.state.progress / this.state.count) * 100);
        return (
            <div className="text-centered">
                <h2 className="loading">Loading {this.state.step.toLowerCase()}</h2>
                <div className="progressbar">
                    <span style={{width:percentage + '%'}} />
                </div>
            </div>
        );
    }
}

export default Loader;