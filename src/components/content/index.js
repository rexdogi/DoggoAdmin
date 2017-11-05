import React, {Component} from 'react';
import {get} from '../../services/http-service';
import withRoot from "../withRoot/index";
import {
    Checkbox, Paper, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel,
    Tooltip,
    Typography
} from "material-ui";


const columnData = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Id'
    },
    {
        id: 'message',
        numeric: false,
        disablePadding: true,
        label: 'Title'
    },
    {
        id: 'picture',
        numeric: false,
        disablePadding: true,
        label: 'photo'
    }
];

class Content extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            page: 1,
            rowsPerPage: 5,
        }
    }

    componentDidMount() {
        console.log(this);
        get('/fbposts?size=200')
            .then(res => {
                console.log(res.data)
                this.setState({data: res.data.content})
            })
            .catch(err => console.log(err))
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {

        const columns = columnData.map((item, i) => (
            <TableCell key={i}>
                {item.label}
            </TableCell>
        ));

        let body = this.state.data.map((item, i) => (
            <TableRow key={i}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>
                    <img style={{'width': '100px', 'height': '100px'}} src={item.picture} />
                </TableCell>
            </TableRow>
        ));

        body = body.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage);

        return (
            <div>
                <Typography gutterBottom={true} type="display1" noWrap>
                    Content
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {body}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={this.state.data.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withRoot(Content);
