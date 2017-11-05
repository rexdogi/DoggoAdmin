import React from 'react';
import withRoot from "../withRoot/index";
import {
    Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
    withStyles, withWidth
} from "material-ui";
import {connect} from "react-redux";
import compose from "recompose/compose";
import * as categoryActions from 'redux/modules/category/index';
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

class Categories extends React.Component {

    componentDidMount() {
        this.props.getCategories();
    }

    state = {
        categoryName: ''
    };

    handleCategoryInput = (event) => {
        this.setState({categoryName: event.target.value})
    };

    handleCreate() {
        this.props.createCategory({name: this.state.categoryName});
    };

    handleDelete(id) {
        this.props.destroyCategory(id);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography gutterBottom={true} type="display1" noWrap>
                    Categories
                </Typography>
                <Paper className={classes.root}>
                    <TextField
                        fullWidth
                        className={classes.textField}
                        label="Category"
                        placeholder="Category"
                        margin="normal"
                        onChange={this.handleCategoryInput}
                        value={this.state.categoryName}
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
                            {this.props.categories.map(n => {
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
    return {categories: state.category.categories}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(categoryActions, dispatch)
};



export default compose(
    withStyles(styles, {name: 'Categories'}),
    connect(mapStateToProps, mapDispatchToProps)
)(Categories);
