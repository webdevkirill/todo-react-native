import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';
import { Todo } from './src/Todo';

export default function App() {
    const [todos, setTodos] = useState([]);

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

    return (
        <View>
            <Navbar title='TodoApp' />
            <View style={styles.container}>
                <AddTodo onSubmit={addTodo} />
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} /> }
                />
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
