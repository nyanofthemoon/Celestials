import React, { Component } from 'react'

class  RequestAuth extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                requesting auth to server...
            </div>
        )
    }


}

export default RequestAuth;
