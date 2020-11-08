import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';

export default function App() {
    return (
        <View>
            <Navbar title='TodoApp' />
            <View style={styles.container}>
                <AddTodo />
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
