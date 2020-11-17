import React, { useContext, useReducer } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, TOGGLE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';

export const TodoState = ({ children }) => {

    const initialState = {
        todos: [],
        loading: false,
        error: null
    };
    const dbUrl = 'https://todo-react-native-651fc.firebaseio.com/';

    const {changeScreen} = useContext(ScreenContext);

    const [state, dispatch] = useReducer(todoReducer, initialState);
    const {todos, loading, error} = state;

    const addTodo = async (title) => {
        const responce = await fetch(`${dbUrl}/todos.json`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        const data = await responce.json();
        dispatch({ type: ADD_TODO, title, id: data.name });
    }
    const updateTodo = async (id, title) => {
        try {
            await fetch(`${dbUrl}/todos/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title})
            })
            dispatch({type: UPDATE_TODO, id, title})
        } catch (e) {
            showError('Что-то пошло не так...');
        }
        
    }
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
                    onPress: async () => {
                        changeScreen(null);
                        await fetch(`${dbUrl}/todos/${id}.json`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                        dispatch({type: REMOVE_TODO, id});
                    }
                }
            ]
        )
        
    };

    const toggleLoader = () => dispatch({type: TOGGLE_LOADER});
    const showError = (error) => dispatch({type: SHOW_ERROR, error});
    const clearError = () => dispatch({type: CLEAR_ERROR});
    const fetchTodos = async () => {
        toggleLoader();
        clearError();
        try {
            const responce = await fetch(`${dbUrl}/todos.json`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await responce.json();
            const todos = Object.keys(data).map(key => ({...data[key], id: key}));
            dispatch({type: FETCH_TODOS, todos});
        } catch (e) {
            showError('Что-то пошло не так...');
        } finally {
            toggleLoader();
        }
    }

    return (
        <TodoContext.Provider 
            value={{
                todos, loading, error,
                addTodo, removeTodo, updateTodo,
                fetchTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}