import React, { useContext, useReducer } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, TOGGLE_LOADER, SHOW_ERROR, CLEAR_ERROR } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';

export const TodoState = ({ children }) => {

    const initialState = {
        todos: [],
        loading: false,
        error: null
    };

    const {changeScreen} = useContext(ScreenContext);

    const [state, dispatch] = useReducer(todoReducer, initialState);
    const {todos} = state;

    const addTodo = (title) => dispatch({ type: ADD_TODO, title });
    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})
    const removeTodo = (id) => {
        const taskName = todos.find(t => t.id === id).title;
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить задачу "${taskName}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        changeScreen(null);
                        dispatch({type: REMOVE_TODO, id});
                    }
                }
            ]
        )
        
    };

    const toggleLoader = () => dispatch({type: TOGGLE_LOADER});
    const showError = (error) => dispatch({type: SHOW_ERROR, error});
    const clearError = () => dispatch({type: CLEAR_ERROR});

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