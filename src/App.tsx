import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Select from 'react-select';
import './App.css';
import {TextField, Switch, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import useTodos, { Form, ITodos, IUsers, Options, QueryParameters, TableItem, TodoItem, User, } from './hooks/useTodos'
import axios from 'axios'


interface iSearchParam {
  name?: string
  userId?: number
  completed?: boolean
}

function App() {
  fetch('api/users')
    .then(response => response.json())
    .then(data => console.log(data));

  fetch('api/todos')
    .then(response => response.json())
    .then(data => console.log(data));

  
  const [userList, setUserList] = useState<Options[]>([])
  const [tableList, setTableList] = useState<TableItem[]>([])
  const [userList, setUserList] = useState<Options[]>([])



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
          console.log('todoItems', todoItems)

          tableItems.push(tableItem)
        }
      })
    })
    return tableItems
  }
  
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

  
  // const queryUserOptions = async ({

  // })


  // const [searchParams, setSearchParams] = useState<iSearchParam>({ name: '', userId: 0 })
  // const [userList, setUserList] = useState<Options[]>([])
  // const [tableList, setTableList] = useState<TableItem[]>([])
  // const [reload, setReload] = useState<boolean>(false)


  // const getTableList = (
  //   todoItems: TodoItem[],
  //   userItems: User[]
  // ): TableItem[] => {
  //   const tableItems: TableItem[] = []
  //   todoItems.forEach(todo => {
  //     userItems.forEach(user => {
  //       if (todo.user === user.id) {
  //         const tableItem: TableItem = {
  //           id: todo.id as number,
  //           taskName: todo.name,
  //           userId: user.id,
  //           userName: user.firstName + ' ' + user.lastName,
  //           isCompleted: todo.isComplete,
  //         }
  //         tableItems.push(tableItem)
  //       }
  //     })
  //   })
  //   return tableItems
  // }

  // const getUserOptions = (users: User[]): Options[] => {
  //   let userOptions: Options[] = []
  //   users.forEach(user => {
  //     userOptions.push({
  //       value: user.id,
  //       label: user.firstName + ' ' + user.lastName,
  //     })
  //   })
  //   return userOptions
  // }

  // const queryTodoList = async ({
  //   name,
  //   userId,
  //   completed,
  // }: QueryParameters): Promise<void> => {
  //   const todos = userId ? await axios.get<ITodos>(`api/user/${userId}/todos`) : await axios.get<ITodos>(`api/todos`)
  //   console.log(todos);
  //   const users = await axios.get<IUsers>('api/users')
  //   setUserList(getUserOptions(users.data.users))

  //   let newTableList: TableItem[] = []
  //   let tList = getTableList(todos.data.todos, users.data.users)

  //   let tmpData = tList.filter((p) => p.taskName.indexOf(name || '') >= 0)
  //   if (userId) {
  //     tmpData = tmpData.filter((p) => p.userId === userId)
  //   }
  //   if (typeof completed === 'boolean') {
  //     tmpData = tmpData.filter((p) => p.isCompleted === completed)
  //   }

  //   setTableList(tmpData)
  // }


  // const fetchData = async () => {
  //   queryTodoList({})
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [reload])

  // useEffect(() => {
  //   queryTodoList({ ...searchParams })
  // }, [searchParams])


  // const handleSwitchChange = (event: any) => {
  //   let value = event.target.checked
  //   // queryTodoList({completed: value})
  //   // setSearchParams({...searchParams, completed: value});
  //   setSearchParams({ completed: value });
  // }

  // console.log('tableList', tableList)

  return (
    <div className='App'>
      <div className='top'>
        <div className='func'>
          <p>Project Name</p>
          <TextField id="outlined-basic" variant="outlined" />
        </div>
        <div className='func'>
          <p>User</p>
          <Select/>
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
