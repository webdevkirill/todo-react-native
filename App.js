import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
    const [todos, setTodos] = useState([]);
    const [todoId, setTodoId] = useState(null);

    const addTodo = (title) => {
        setTodos((prevTodos) => [...prevTodos, 
            {
                id: `${Date.now().toString()}_${title}`,
                title
            }
        ])
    }

    const removeTodo = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

    let content = (
    <MainScreen 
        addTodo={addTodo} 
        todos={todos} 
        removeTodo={removeTodo} />
    );

    if (todoId) {
        content = <TodoScreen />
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
        paddingHorizontal: 20,
        paddingVertical: 30
    },
});
