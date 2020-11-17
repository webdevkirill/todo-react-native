import React, { useContext, useReducer } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, TOGGLE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';
import { Http } from '../../http';

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
        clearError();
        try {
            const data = await Http.post(`${dbUrl}/todos.json`, { title })
            dispatch({ type: ADD_TODO, title, id: data.name });
        } catch (e) {
            showError('Что-то пошло не так...')
        }
    }
    const updateTodo = async (id, title) => {
        try {
            await Http.patch(`${dbUrl}/todos/${id}.json`, {title});
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
                        await Http.delete(`${dbUrl}/todos/${id}.json`);
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
            const data = await Http.get(`https://todo-react-native-651fc.firebaseio.com/todos.json`);
            const todos = Object.keys(data).map(key => ({...data[key], id: key}));
            dispatch({type: FETCH_TODOS, todos});
        } catch (e) {
            console.log(e);
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