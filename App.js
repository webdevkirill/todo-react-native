import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
import { THEME } from './src/theme';

const loadApp = async () => {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
}

export default function App() {
    const [todos, setTodos] = useState([
        {id: '1', title: 'Выучить React Native'},
        {id: '2', title: 'Написать приложение'}
    ]);
    const [todoId, setTodoId] = useState(null);
    const [isAppReady, setIsAppReady] = useState(false);

    if (!isAppReady) {
        return (
            <AppLoading 
                startAsync={loadApp}
                onFinish={() => setIsAppReady(true)}
            />
        )
    }

    const addTodo = (title) => {
        setTodos((prevTodos) => [...prevTodos, 
            {
                id: `${Date.now().toString()}_${title}`,
                title
            }
        ])
    }

    const removeTodo = (id) => {
        const taskName = todos.find((todo) => todo.id === id).title;
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
                        setTodoId(null);
                        setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
                    }
                }
            ]
        )
    }

    const updateTodo = (id, title) => {
        setTodos((prevState) => [...prevState].map((todo) => {
            if (todo.id === id) {
                todo.title = title
            }
            return todo
        }))
    }

    let content = (
    <MainScreen 
        addTodo={addTodo} 
        todos={todos} 
        removeTodo={removeTodo}
        openTodo={(id) => setTodoId(id)} />
    );
    

    if (todoId) {
        const todo = todos.find(todo => todo.id === todoId);
        content = <TodoScreen 
                    removeTodo={removeTodo} 
                    todo={todo} 
                    goBack={() => setTodoId(null)}
                    editTitle={updateTodo} />
    }

    return (
        <View>
            <Navbar title='TodoApp' />
            <View style={styles.container}>
                { content }
                <StatusBar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    },
});
