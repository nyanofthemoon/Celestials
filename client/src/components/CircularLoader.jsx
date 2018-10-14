import React, {Component} from 'react'
import {CircularProgress, IconButton, Typography} from '@material-ui/core';
import * as Icons from "./Icons";


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
        const classNameToUse = this.handleAnimationClass(this.props.show);
            return(
               <div>
                   {this.props.children}
                   <div className={classNameToUse} style={{display: 'flex',  position:'absolute', top:0, left:0, alignItems:'center', justifyContent:'center',  height:'100vh', width:'100%'}}>
                       <CircularProgress size={250} />
                   </div>
                   <Typography variant={"caption"}>{this.props.status}{this.renderPlayerInfo(this.props.player)}</Typography>
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

            );

    }
}

export default CircularLoader;