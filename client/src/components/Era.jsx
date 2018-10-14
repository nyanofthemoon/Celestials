import React, {Component} from 'react'
import { Typography, SvgIcon, IconButton } from '@material-ui/core'
import * as Icons from './Icons'

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


        function HomeIcon(props) {
            return (
                <SvgIcon {...props}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
            );
        }







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
