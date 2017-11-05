import React from 'react';
import withRoot from "../withRoot/index";
import {
    Button, CircularProgress, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography,
    withStyles
} from "material-ui";
import {FormControl, FormHelperText} from 'material-ui/Form';
import {compose} from "recompose";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCategories} from "redux/modules/category/index";
import {getPages} from "redux/modules/page/index";
import {post} from "services/http-service";
import green from "material-ui/es/colors/green";
import classNames from 'classnames';

const styles = theme => ({
    container: {},
    formControl: {
        marginRight: 16,
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    root: {
        padding: 16
    },
    textField: {
        marginRight: 16
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'relative',
        top: '50%',
        marginTop: -12,
        marginLeft: -12
    },
});

class Scraping extends React.Component {

    componentDidMount() {
        this.props.getPages();
        this.props.getCategories();
    }

    state = {
        pageId: 0,
        categoryId: 0,
        startsFrom: 0,
        maxLimit: 100,
        loading: false,
        success: false
    };

    handleChange(name, event) {

        this.setState({
            [name]: event.target.value,
        });

    }

    handleScrape() {
        const {loading, success, ...rest} = this.state;
        this.setState({
            loading: true,
            success: false
        })
        post('/scrape', rest)
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false,
                    success: true
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    success: false
                })
            })
    }

    render() {
        const {classes} = this.props;

        const buttonClassname = classNames({
            [classes.buttonSuccess]: this.state.success,
        });

        const pages = this.props.pages.map((item) => {
            return (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            )
        });
        const categories = this.props.categories.map((item) => {
            return (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            )
        });

        return (
            <div>
                <Typography gutterBottom={true} type="display1" noWrap>
                    Content scraping
                </Typography>
                <Paper className={classes.root}>
                    <form className={classes.container} autoComplete="off">
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="pageId">Page</InputLabel>
                                <Select
                                    value={this.state.pageId}
                                    onChange={(e) => this.handleChange('pageId', e)}
                                    input={<Input id="pageId"/>}
                                >
                                    {pages}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="categoryId">Category</InputLabel>
                                <Select
                                    value={this.state.categoryId}
                                    onChange={(e) => this.handleChange('categoryId', e)}
                                    input={<Input id="categoryId"/>}
                                >
                                    {categories}
                                </Select>
                            </FormControl>
                        </div>
                        <br/>
                        <div>
                            <TextField
                                className={classes.textField}
                                label="Starts from"
                                placeholder="Starts from"
                                margin="normal"
                                onChange={(e) => this.handleChange('startsFrom', e)}
                                value={this.state.startsFrom}
                                type="number"
                            />

                            <TextField
                                className={classes.textField}
                                label="Max limit"
                                placeholder="Max limit"
                                margin="normal"
                                onChange={(e) => this.handleChange('maxLimit', e)}
                                value={this.state.maxLimit}
                                type="number"
                            />
                        </div>
                        <div>
                            <div className={classes.wrapper}>
                                <Button
                                    className={buttonClassname}
                                    raised
                                    disabled={this.state.loading}
                                    color="primary"
                                    onClick={() => this.handleScrape()}>
                                    Scrape
                                    {this.state.loading && <CircularProgress size={24}
                                                                             className={classes.buttonProgress}/>}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.category.categories,
        pages: state.page.pages
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getCategories, getPages}, dispatch)
};

export default compose(
    withStyles(styles, {name: 'Scraping'}),
    connect(mapStateToProps, mapDispatchToProps)
)(Scraping);
