import React from 'react'
import { useState } from "react"

import Todo from "../Models/todo"

type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => { },
    removeTodo: (id: string) => { }
})

const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([])

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText)
        setTodos((prevTodos) => (prevTodos.concat(newTodo)))
    }

    const removeTodoHandler = (todoID: string) => {
        setTodos(prevTodos => (prevTodos.filter(todo => todo.id !== todoID)))
    }

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }

    return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>
}

export default TodosContextProvider