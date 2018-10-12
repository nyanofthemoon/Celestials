import React, {Component} from 'react'
import { CircularProgress, Typography } from '@material-ui/core';


class CircularLoader extends Component {
    constructor(props) {
        super(props);
    }

    handleAnimationClass(show) {

      return show === true ? 'animated fadeIn inForeground' : 'animated fadeOut inBackground';
    };

    componentWillMount() {

        // console.log(this.props)
    }

    renderPlayerInfo(player) {

        console.log(player);
        const email = player.get('email');

        if (email)  {
            return ` - user: ${email}`;
        } else {
            return ' - user: ';
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
               </div>

            );

    }
}

export default CircularLoader;