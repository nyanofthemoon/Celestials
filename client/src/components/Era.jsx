import React, {Component} from 'react'
import { Typography } from '@material-ui/core'

class Era extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        status: ''
    };

    _renderEraState = () => {
        if (this.state.status) {
            return (this.state.status);
        } else {
            return ('Era component');
        }
    };

    _renderEraStore = () => {

        //this.props.

        if (this.state.status) {
            return (this.state.status);
        } else {
            return ('Era component');
        }
    };

    componentWillMount() {
        // this._handleRequestEraInformation(this.props);
    }

    componentDidMount() {
        console.log(this.props.era)
    }

    render() {
        return (
            <div>
                <br/>
                <Typography variant={"caption"}>{this._renderEraState()}</Typography>
                <br/>
            </div>
        )
    }
}

export default Era;
