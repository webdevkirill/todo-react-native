import React, { useContext, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './components/Navbar/index';
import { THEME } from './theme';
import { TodoScreen } from './screens/TodoScreen';
import { MainScreen } from './screens/MainScreen';
import { TodoContext } from './context/todo/TodoContext';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {

    const {todoId} = useContext(ScreenContext);

    return (
        <View>
            <Navbar title='TodoApp' />
            <View style={styles.container}>
                { todoId ? <TodoScreen /> : <MainScreen /> }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    },
});
