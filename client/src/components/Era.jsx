import React, {Component} from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
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

    _renderCloseEra = (era, start) => (
        <Grid container >
            <Grid item xs={9}>
                    ERA
            </Grid>
            <Grid item xs={3}>
                    {era}
            </Grid>
            <Grid item xs={3}>
                    Start in:
            </Grid>
            <Grid item xs={9}>
                    {start}
            </Grid>
        </Grid>
        );


    _renderOpenEra = (era,name, end) => (
        <Grid container >
            <Grid item xs={9}>
                    ERA
            </Grid>
            <Grid item xs={3}>
                    {era}
            </Grid>
            <Grid item xs={12}>
                    {name}
            </Grid>
            <Grid item xs={3}>
                    End in:
            </Grid>
            <Grid item xs={9}>
                    {end}
            </Grid>
        </Grid>
    );

    _renderGeneration = (generation,name, end) => (
        <Grid container >
            <Grid item xs={9}>
                    GENERATION
            </Grid>
            <Grid item xs={3}>
                    {generation}/30
            </Grid>
            <Grid item xs={12}>
                    {name}
            </Grid>
            <Grid item xs={3}>
                    End in:
           </Grid>
           <Grid item xs={9}>
                    {end}
           </Grid>
        </Grid>

    );


    _renderEraStore = () => {

        const eraData = this.props.era.get('data');
        if (!eraData ) {
            return null
        }

        const mappedEraData = eraData.map((item,i) => {
            return item;
        });

        console.log('mappedEraData');
        console.log(mappedEraData.toString());

        const dateEnd = new Date(eraData.get('next'));
        const timeLeft = (new Date() ) - ( dateEnd  );
        const timeLeftInHours = timeLeft / 1000 / 60 / 60 ;
        const timeLeftInDays = ( timeLeftInHours / 24);

        const timeLeftInDaysFix = timeLeftInDays.toFixed(0) ;
        const timeLeftInTheDay = timeLeftInDays - timeLeftInDaysFix;
        // const eraTimeLeftHours = ( (  timeLeftInHours / 24) - eraTimeLeftDay ) * 24).toFixed(0) ;
        // const eraTimeLeftMin = ((((  timeLeft ) / 1000 / 60 / 60 / 24) - eraTimeLeftHours ) * 60).toFixed(0) ;

        const timeIn = (  (new Date() ) - ( new Date(eraData.get('last')) ) ) / 1000 / 60 / 60 / 24 ;
        console.log( timeLeftInDaysFix );
        console.log( timeLeftInTheDay * 24);
        // console.log( eraTimeLeftHours );
        // console.log( eraTimeLeftMin );

        const genData = this.props.era.get('generation');
        //return

        if (eraData.get('status') === 'CLOSED') {
            return this._renderCloseEra(1, "bob")
        } else if (!genData) {
            return null
        } else {
            return (
                <Paper>
                    {eraData.toString() + ';' + genData.toString()}
                </Paper>
            )
        }

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

        //console.log(this.props.era.toString());

        // Calculate elapsed to tenth of a second:
        let elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        let seconds = (elapsed / 10).toFixed(1);

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.


        return (
            <div>

                {/*<p>This example was started <b>{seconds} seconds</b> ago.</p>;*/}
                <br/>

                <Paper>
                    {this._renderCloseEra(1, 23)}
                </Paper>

                <br/>

                <Paper>
                    {this._renderOpenEra(1, "Era One", 34)}
                </Paper>
                <br/>

                <Paper>
                    {this._renderGeneration(1, "Generation One", 3)}
                </Paper>
                {this._renderEraStore()}


            </div>
        )
    }
}

export default Era;
