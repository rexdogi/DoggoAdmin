import React from 'react';
import {
    Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
    withStyles
} from "material-ui";
import {connect} from "react-redux";
import compose from "recompose/compose";
import * as pageActions from 'redux/modules/page/index';
import {bindActionCreators} from "redux";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),

    table: {
        marginTop: 16
    },

    textField: {
    },
});

class Pages extends React.Component {

    componentDidMount() {
        this.props.getPages();
    }

    state = {
        pageName: ''
    };

    handleCategoryInput = (event) => {
        this.setState({pageName: event.target.value})
    };

    handleCreate() {
        this.props.createPage({name: this.state.pageName});
    };

    handleDelete(id) {
        this.props.destroyPage(id);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography gutterBottom={true} type="display1" noWrap>
                    Pages
                </Typography>
                <Paper className={classes.root}>
                    <TextField
                        fullWidth
                        className={classes.textField}
                        label="Category"
                        placeholder="Category"
                        margin="normal"
                        onChange={this.handleCategoryInput}
                        value={this.state.pageName}
                    />
                    <Button onClick={() => this.handleCreate()} raised color="primary">Create</Button>
                </Paper>
                <Paper className={classes.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.pages.map(n => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell>{n.id}</TableCell>
                                        <TableCell>{n.name}</TableCell>
                                        <TableCell>
                                            <Button color="accent" raised onClick={() => this.handleDelete(n.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {pages: state.page.pages}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(pageActions, dispatch)
};



export default compose(
    withStyles(styles, {name: 'Pages'}),
    connect(mapStateToProps, mapDispatchToProps)
)(Pages);
