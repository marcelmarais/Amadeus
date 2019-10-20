import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';


export default class DescriptionTable extends React.Component {
  constructor(props) {

    super(props);
    this.classes = makeStyles(theme => ({
      root: {
        align: 'center',
        width: '100%',
        marginTop: theme.spacing(3),
      },
      paper: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      table: {
        width: 950,
      },
      tableWrapper: {
        overflowX: 'auto',
      },
    }));

    this.state = {
      resolvedError: false,
      resolvedSuccess: false,
      data: '',
      error: '',
    };
    this.renderChildren = this.renderChildren.bind(this);
  }

  getHeader() {
    var keys = Object.keys(this.state.data.data[0]);
    return keys.map((key, index) => {
      return <TableCell style ={{color: 'white',fontSize: '13px'}} key={key}>{key}</TableCell>
    })
  }

  RenderRow(row) {
    var keys = Object.keys(this.state.data.data[0]);

    return keys.map((key, index) => {
      return <TableCell style ={{color: 'black',fontSize: '11px'}} key={this.state.data.data[key]}>{row[key]}</TableCell>
    })
  }
  getRowsData = function () {
    var items = this.state.data.data;
    console.log(items);
    // var keys = Object.keys(this.state.data.data);
    return items.map((row, index) => {
      console.log(row[index])
      console.log(index)
      return <TableRow key={index}>{this.RenderRow(row)}</TableRow>
    })
  }


  componentDidMount() {
    this.props.data
      .then(data => this.setState({ resolvedSuccess: true, data }))
      .catch(error => this.setState({ resolvedError: true, error }));
  }

  renderChildren() {
    return (<div>
      {Object.keys(this.state.data.data)}
    </div>)
  }

  render() {
    console.log(this.state.error);
    console.log(this.state.data.data);
    if (this.state.resolvedError) {
      return <h1>Error Encountered </h1>;
    } else if (this.state.resolvedSuccess) {
      return (
        <div style = {{align: 'center'}}>
          <Paper style = {{overflowX:'scroll', padding :'20px'}}>
            <Table style = {{}}>
              <TableHead style ={{overflowX:'visible', size: '40',overflowX: 'auto', background: '#4054B2', margin: '200px'}}>
                {this.getHeader()}
              </TableHead>
              <TableBody>
                {this.getRowsData()}
              </TableBody>
            </Table>


          </Paper>
        </div>
      )
    } else {
      return <h1>Loading...</h1>;
    }
  }

}