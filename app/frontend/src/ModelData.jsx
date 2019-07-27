// import React from 'react';
// import ReactDOM from 'react-dom';

// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import GridList from '@material-ui/core/GridList';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';

// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import { ReactMUIDatatable } from "react-material-ui-datatable";


// import './styles.css';

// function ModelData() {

//   var Http = new XMLHttpRequest();
//   const url = 'http://localhost:2000/';
//   var model_data = '';


//   function createData(n, t) {
//     return { name: n, type: t };
//   }

//   const columns = [
//     {
//       name: "name",
//       label: "Name"
//     },
//     {
//       name: "type",
//       label: "Type"
//     },
//   ];


//   var dataRows = [];
//   function createTable(json) {

//     json.forEach((item, i) => {
//       dataRows.push(createData(item.name, item.type));
//     });

//   }

//   function generateModel() {
//     Http.open("POST", url + 'generate-model-file');
//     Http.setRequestHeader("Content-type", "application/json");
//     console.log(document.getElementById("targetName").value);
//     Http.send('{"model_name":"herefile","target_name":"' + document.getElementById("targetName").value + '"}');

//     Http.onreadystatechange = (e) => {
//       if (Http.readyState === 4 && Http.status === 200) {
//         getModelData();
//       } else {
//         console.log(Http.status)
//       }
//     }
//   }


//   function getModelData() {
//     Http = new XMLHttpRequest();

//     Http.open("GET", url + 'model-info')
//     Http.send();

//     Http.onreadystatechange = (e) => {
//       if (Http.readyState === 4 && Http.status === 200) {
//         try {
//           var model = JSON.parse(Http.responseText)
//           console.log(model)
//           createTable(model['input_features']);
//           console.log(dataRows);
//           document.getElementById('genModel').style.display = 'none';
//           showModelData();

//         } catch (err) {
//           console.log(err);
//         }

//       }
//     }
//   }

//   function EnhancedTableHead(props) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//     const createSortHandler = property => event => {
//       onRequestSort(event, property);
//     };
//   }

//   function showModelData() {

//     const element = (
//       <Table>

//       </Table>
//     );
//     ReactDOM.render(element, document.getElementById('modelTable'));
//   }





//   return (
//     <div width = '500px'>


//         <Grid
//           container
//           direction="column"
//           justify="space-between"
//           alignItems="center"
//           justifyContent='space-around'
//         >

//           <TextField id='targetName'>survived</TextField>
//           <br></br>
//           <Button id='genModel' variant="contained" color="primary" onClick={generateModel}>
//             Load Model
//         </Button>

//           <div align="center" id='modelData'></div>
//           <div id='modelTable'></div>
//           {showModelData}

//         </Grid>

//     </div>
//   );
// }
// export default ModelData;

import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

function createData(name, type) {
  return { name, type };
}

const columns = [
  {
    name: "name",
    label: "Name"
  },
  {
    name: "type",
    label: "Type"
  },
];


var rows = [];
function createTable(json) {

  json.forEach((item, i) => {
    rows.push(createData(item.name, item.type));
  });

}

var Http = new XMLHttpRequest();
const url = 'http://localhost:2000/';
var model_data = '';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  
  return (
    <TableHead>
      <TableRow>
        <TableCell>
        </TableCell>
        {headRows.map(row => (
          <TableCell
          key={row.name}
          align={'left'}
          padding={row.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === row.name ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.name}
              direction={order}
              onClick={createSortHandler(row.name)}
              >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
  theme.palette.type === 'light'
  ? {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  }
  : {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  
  return (
    <Toolbar
    className={clsx(classes.root, {
      [classes.highlight]: numSelected > 0,
    })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
              Input Features
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
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
    minWidth: 400,
    height: 400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }
  
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  
  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
        );
      }
      
      setSelected(newSelected);
    }
    
    function handleChangePage(event, newPage) {
      setPage(newPage);
    }
    
    function handleChangeRowsPerPage(event) {
      setRowsPerPage(+event.target.value);
      setPage(0);
    }
    
    function handleChangeDense(event) {
      setDense(event.target.checked);
    }
    
    function showTable(){
      console.log(rows);
      const element = (
        <Paper className={classes.paper}>
        <div id = 'tableWrapper' className={classes.tableWrapper}>
        <EnhancedTableToolbar numSelected={selected.length} />
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'medium' : 'large'}
            >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    <TableRow
                    hover
                    onClick={event => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          
      </Paper>
      );
    ReactDOM.render(element, document.getElementById('all'));
}
  function generateModel() {
    Http.open("POST", url + 'generate-model-file');
    Http.setRequestHeader("Content-type", "application/json");
    console.log(document.getElementById("targetName").value);
    Http.send('{"model_name":"herefile","target_name":"' + document.getElementById("targetName").value + '"}');
  
    Http.onreadystatechange = (e) => {
      if (Http.readyState === 4 && Http.status === 200) {
        getModelData();
      } else {
        console.log(Http.status)
      }
    }
  }
  function getModelData() {
    Http = new XMLHttpRequest();
  
    Http.open("GET", url + 'model-info')
    Http.send();
  
    Http.onreadystatechange = (e) => {
      if (Http.readyState === 4 && Http.status === 200) {
        try {
          var model = JSON.parse(Http.responseText)
          createTable(model['input_features']);
          console.log(rows);
          document.getElementById('genModel').style.display = 'none';
          showTable();
  
        } catch (err) {
          console.log(err);
        }
  
      }
    }
  }
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Grid align = 'center'>
      <TextField id='targetName'>survived</TextField>
      <br></br>
      <br></br>
      <Button id='genModel' variant="contained" color="primary" onClick={generateModel}>
        Load Model
      </Button>
      <div id = 'all' >
      </div>
      </Grid>
      
    </div>
  );
}

