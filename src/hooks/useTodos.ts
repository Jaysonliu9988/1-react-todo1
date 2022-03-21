import axios from "axios"
import { useState } from 'react'


export interface ITodos {
    todos: Array<TodoItem>
}

export interface IUsers {
    users: Array<User>
}

export interface Form {
    id?: string
    name: string
    userId: number
    completed: boolean
}

export interface TodoItem {
    id?: number
    name: string
    isComplete: boolean
    user: number
}

export interface User {
    id: number
    lastName: string
    firstName: string
}

export interface TableItem {
    id: number
    taskName: string
    userName: string
    userId: number
    isCompleted: boolean
}

export interface Options {
    label: string
    value: number
}

export interface QueryParameters {
    name?: string
    userId?: number
    completed?: boolean
}

const useTodos = () => {
    const [reload, setReload] = useState<boolean>(false)

    const deleteTodo = async (id: number) => {
        await axios.delete(`api/todo/${id}/delete`)
        return true;
    }

    return {
        reload,
        deleteTodo
    }
}


export default useTodos