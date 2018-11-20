import React, {Component} from 'react'
import {CircularProgress, IconButton, Typography, Grid, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as Icons from "./Icons";



const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',

    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class CircularLoader extends Component {
    constructor(props) {
        super(props);
    }

    handleAnimationClass(show) {

      return show === true ? 'animated fadeIn inForeground' : 'animated fadeOut inBackground';
    };

    componentWillMount() {

    }

    renderPlayerInfo(player) {

        const email = player.get('email');

        if (email)  {
            return ` - user: ${email}`;
        } else {
            return '';
        }


    }


    render() {
        const { classes } = this.props;
        const classNameToUse = this.handleAnimationClass(this.props.show);
            return(
               <div className={classes.root}>
                   <Grid container spacing={8}>
                       <Grid item xs={1}></Grid>
                       <Grid item xs={10}>

                           {this.props.children}

                           <div className={classNameToUse} style={{display: 'flex',  position:'absolute', top:0, left:0, alignItems:'center', justifyContent:'center',  height:'100vh', width:'100%'}}>
                               <CircularProgress size={250} />
                           </div>

                       </Grid>
                       <Grid item xs={1}></Grid>
                   </Grid>
                   <Typography variant={"caption"}>{this.props.status}{this.renderPlayerInfo(this.props.player)}</Typography>

               </div>

            );

    }


    _renderIcons = () => (
        <div>
            <Icons.Brick/>
            <Icons.City/>
            <Icons.Desert/>
            <Icons.Field/>
            <Icons.Food/>
            <Icons.Forest/>
            <br/>
            <Icons.Gem/>
            <Icons.Gems/>
            <Icons.Glass/>
            <Icons.Hamlet/>
            <Icons.Help/>
            <Icons.Lake/>
            <Icons.Map/>
            <Icons.Market/>
            <br/>
            <Icons.Messengers/>
            <Icons.Metropolis/>
            <Icons.Military/>
            <Icons.Mountain/>
            <Icons.Ore/>
            <Icons.Politics/>
            <Icons.Realm/>
            <Icons.Rogue/>
            <Icons.Roguery/>
            <br/>
            <Icons.Sorcerer/>
            <Icons.Sorcery/>
            <Icons.Tax/>
            <Icons.Town/>
            <Icons.Village/>
            <Icons.Warfare/>
            <Icons.Wood/>
            <Icons.Worker/>

            <br/>
            <IconButton >
                <Icons.Brick  />
            </IconButton>
        </div>
    )


}

export default withStyles(styles)(CircularLoader);