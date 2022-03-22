import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Select from 'react-select';
import './App.css';
import { TextField, Switch, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, IconButton, Button } from '@material-ui/core';
import useTodos, { Form, ITodos, IUsers, Options, QueryParameters, TableItem, TodoItem, User, } from './hooks/useTodos'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface iSearchParam {
  name?: string
  userId?: number
  completed?: boolean
}

function App() {
  // fetch('api/users')
  //   .then(response => response.json())
  //   .then(data => console.log(data));

  // fetch('api/todos')
  //   .then(response => response.json())
  //   .then(data => console.log(data));


  const [tableList, setTableList] = useState<TableItem[]>([])
  const [userList, setUserList] = useState<Options[]>([])
  const [reload, setReload] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useState<iSearchParam>({ name: '', userId: 0 })
  const [open, setOpen] = useState<boolean>(false)

  const { deleteTodo } = useTodos()


  const getUserOptions = (users: User[]): Options[] => {
    let userOptions: Options[] = []
    users.forEach(user => {
      userOptions.push({
        value: user.id,
        label: user.firstName + '' + user.lastName

      })
    })
    return userOptions
  }

  const getTableList = (
    todoItems: TodoItem[],
    userItems: User[]
  ): TableItem[] => {
    const tableItems: TableItem[] = []
    todoItems.forEach(todo => {
      userItems.forEach(user => {
        if (todo.user === user.id) {
          const tableItem: TableItem = {
            id: todo.id as number,
            taskName: todo.name,
            userId: user.id,
            userName: user.firstName + ' ' + user.lastName,
            isCompleted: todo.isComplete,
          }

          tableItems.push(tableItem)
        }
      })
    })
    return tableItems
  }

  const queryTodoList = async ({
    name,
    userId,
    completed,
  }: QueryParameters): Promise<void> => {
    const todos = userId ? await axios.get<ITodos>(`api/user/${userId}/todos`) : await axios.get<ITodos>(`api/todos`)
    console.log('todos', todos);
    const users = await axios.get<IUsers>('api/users')
    setUserList(getUserOptions(users.data.users))

    let tList = getTableList(todos.data.todos, users.data.users)
    let tmpData = tList.filter((p) => p.taskName.indexOf(name || '') >= 0)

    if (userId) {
      tmpData = tmpData.filter((p) => p.userId === userId)
    }
    if (typeof completed === 'boolean') {
      tmpData = tmpData.filter((p) => p.isCompleted === completed)
    }
    setTableList(tmpData)
  }

  const fetchData = async () => {
    queryTodoList({})
  }

  useEffect(() => {
    fetchData()
  }, [reload])

  useEffect(() => {
    queryTodoList({ ...searchParams })
  }, [searchParams])


  const handleSelectChange = (event: any) => {
    console.log('This is event',  event)
    setSearchParams({ userId: event ? event.value : '' });

  }

  const handleAdd = () => {
    setOpen(true)
  }
  console.log('tableList', tableList)

  return (
    <div className='App'>
      <div className='top'>
        <div className='func'>
          <p>Project Name</p>
          <TextField id="outlined-basic" variant="outlined" />
        </div>
        <div className='func'>
          <p>User</p>
          <Select onChange={handleSelectChange} options={userList} />
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
            <TableBody>
              {tableList.map(row => (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row' align='center'>
                    {row.taskName}
                  </TableCell>
                  <TableCell align='center'>{row.userName}</TableCell>
                  <TableCell align='center'>
                    {row.isCompleted ? 'done' : 'undone'}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label='edit' color='primary' >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      color='secondary'
                      onClick={() => {
                        deleteTodo(row.id)
                        setReload(!reload)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Button
          className='btn'
          variant='contained'
          color='primary'
          onClick={handleAdd}
        >
          Add Task
        </Button>
      </div>

    </div>
  );
}

export default App;
