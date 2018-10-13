import React, {Component} from 'react'
import { Typography } from '@material-ui/core'

class Era extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        status: null
    };


    render() {
        return (
            <div>
                <br/>
                <Typography variant={"caption"}>Era component</Typography>
                <br/>
            </div>
        )
    }
}

export default Era;
