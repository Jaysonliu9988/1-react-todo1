import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TextField, Switch, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';

function App() {
  fetch('api/users')
  .then(response => response.json())
  .then(data => console.log(data));

  fetch('api/todos')
  .then(response => response.json())
  .then(data => console.log(data)); 


  return (
    <div className='App'>
      <div className='top'>
        <div className='func'>
          <p>Project Name</p>
          <TextField id="outlined-basic" variant="outlined" />
        </div>
        <div className='func'>
          <p>User</p>
          {/* <Select /> */}
        </div>
        <div className='func'>
          <p>Completed</p>
          <Switch />
        </div>
      </div>

      <div className="table-container">
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>User</TableCell>
                <TableCell align='center'>Completed</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
