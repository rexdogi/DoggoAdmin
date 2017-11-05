import React, { Component } from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "material-ui";
import MenuIcon from 'material-ui-icons/Menu';

class MenuBar extends Component {
    render() {
        return (
            <AppBar  position="static" color="primary">
                <Toolbar>
                    <IconButton color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default MenuBar;