import React, {Component, PropTypes} from 'react'
import Drawer from '@material-ui/core/Drawer';


const styles = {
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends Component {
    //state = { hidden: true };

    //onClose={this.toggle()}
    //toggle =  () => {
        //this.setState({
        //    hidden: (this.state ? false : true)
        //})
    //}

    render() {
        return (
            <Drawer open={this.props.open} anchor={this.props.anchor}>
                {this.props.children}
            </Drawer>
        );
    }
}

TemporaryDrawer.propTypes = {
};

export default withStyles(styles)(TemporaryDrawer);
