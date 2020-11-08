import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';

export default function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (title) => {
        setTodos((prevTodos) => [...prevTodos, 
            {
                id: Date.now().toString(),
                title
            }
        ])
    }

    return (
        <View>
            <Navbar title='TodoApp' />
            <View style={styles.container}>
                <AddTodo onSubmit={addTodo} />
                <View>
                    
                </View>
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
