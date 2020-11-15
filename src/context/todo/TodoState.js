import React, { useReducer } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer } from './todoReducer';

export const TodoState = ({ children }) => {

    const initialState = {
        todos: [
            {id: '1', title: 'Выучить React Native'},
            {id: '2', title: 'Написать приложение'}
        ]
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);
    const {todos} = state;

    return (
        <TodoContext.Provider 
            value={{
                todos
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}