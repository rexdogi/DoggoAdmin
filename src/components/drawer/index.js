import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {MenuItem} from "material-ui";
import {Link, Redirect} from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'fixed',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawerPaper: {
        position: 'fixed',
        height: 'calc(100%)',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
        marginLeft: drawerWidth,
    },
});

class PermanentDrawer extends React.Component{


    render() {
        const {classes, children} = this.props;
        console.log(this);
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar position='fixed' className={classes.appBar}>
                        <Toolbar>
                            <Typography type="title" color="inherit" noWrap>
                                Dashboard
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        style={{height: 'calc(100%)'}}
                        type="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <MenuItem onClick={() => this.context.router.history.push('/')}>
                            Home
                        </MenuItem>

                        <MenuItem onClick={() => this.context.router.history.push('/content')}>
                            Content
                        </MenuItem>

                        <MenuItem onClick={() => this.context.router.history.push('/scraping')}>
                            Content scraping
                        </MenuItem>

                        <MenuItem onClick={() => this.context.router.history.push('/categories')}>
                            Categories
                        </MenuItem>

                        <MenuItem onClick={() => this.context.router.history.push('/pages')}>
                            Pages
                        </MenuItem>
                    </Drawer>
                    <main className={classes.content}>
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

PermanentDrawer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawer);