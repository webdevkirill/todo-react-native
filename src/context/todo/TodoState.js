import React, { useContext, useReducer } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';

export const TodoState = ({ children }) => {

    const initialState = {
        todos: [
            {id: '1', title: 'Выучить React Native'},
            {id: '2', title: 'Написать приложение'}
        ]
    };

    const {changeScreen} = useContext(ScreenContext);

    const [state, dispatch] = useReducer(todoReducer, initialState);
    const {todos} = state;

    const addTodo = (title) => dispatch({ type: ADD_TODO, title });
    const removeTodo = (id) => {
        changeScreen(null);
        dispatch({type: REMOVE_TODO, id});
    };
    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    return (
        <TodoContext.Provider 
            value={{
                todos,
                addTodo, removeTodo, updateTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}