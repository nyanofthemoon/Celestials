import React, {Component} from 'react'
import { Typography, Card, CardContent, CardHeader } from '@material-ui/core'
import * as Icons from './Icons'

class Era extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        status: '',
        // getInitialState: function(){
        //
        //     // This is called before our render function. The object that is
        //     // returned is assigned to this.state, so we can use it later.
        //
        //     return { elapsed: 0 };
        // }
    };

    _renderEraState = () => {
        if (this.state.status) {
            return (this.state.status);
        } else {
            return ('Era component');
        }
    };

    _closeEraCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    ERA
                </Typography>

            </CardContent>
        </Card>);

    _renderEraStore = () => {

        const eraData = this.props.era.get('data');
        if (!eraData ) {
            return null
        }

        const mappedEraData = eraData.map((item,i) => {
            return item;
        });

        console.log('mappedEraData');
        console.log(mappedEraData);

        const genData = this.props.era.get('generation');
        if (eraData.get('status') === 'CLOSED') {
            return eraData.toString()
        } else if (!genData) {
            return null
        } else {
            return eraData.toString() + ';' + genData.toString()
        }




        //const eraStore = this.props.era ? this.props.era.map((item, i) => {
        //    <div key={i}>{item}</div>
        //}) : null;

        //return (eraStore);

        /*if (eraStore) {
            return (eraStore);
        } else {
            return ('Era component');
        }*/
    };

    componentWillMount() {
        // this._handleRequestEraInformation(this.props);
        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:

        // this.timer = setInterval(this.tick, 50);
    }

    componentDidMount() {
        // console.log("era did mount...");
        // console.log(this.props.era)



    }

    componentWillUnmount() {
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    }

    tick = () => {
        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered

        this.setState({elapsed: new Date() - this.props.start});
    };

    render() {

        console.log(this.props.era.toString());

        // Calculate elapsed to tenth of a second:
        let elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        let seconds = (elapsed / 10).toFixed(1);

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.


        return (
            <div>
                <br/>
                <Typography variant={"caption"}>{this._renderEraState()}</Typography>
                <br/>

                {/*<p>This example was started <b>{seconds} seconds</b> ago.</p>;*/}

                {this._renderEraStore()}


            </div>
        )
    }
}

export default Era;
