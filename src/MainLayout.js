import React, { useContext, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './components/Navbar/index';
import { THEME } from './theme';
import { TodoScreen } from './screens/TodoScreen';
import { MainScreen } from './screens/MainScreen';
import { TodoContext } from './context/todo/TodoContext';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {

    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);

    // const removeTodo = (id) => {
    //     const taskName = todos.find((todo) => todo.id === id).title;
    //     Alert.alert(
    //         'Удаление элемента',
    //         `Вы уверены, что хотите удалить задачу "${taskName}"?`,
    //         [
    //             {
    //                 text: 'Отмена',
    //                 style: 'cancel',
    //             },
    //             {
    //                 text: 'Удалить',
    //                 style: 'destructive',
    //                 onPress: () => {
    //                     setTodoId(null);
    //                     setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
    //                 }
    //             }
    //         ]
    //     )
    // }

    let content = (
    <MainScreen 
        addTodo={addTodo} 
        todos={todos} 
        removeTodo={removeTodo}
        openTodo={(id) => changeScreen(id)} />
    );
    

    if (todoId) {
        const todo = todos.find(todo => todo.id === todoId);
        content = <TodoScreen
                    removeTodo={removeTodo} 
                    todo={todo} 
                    goBack={() => changeScreen(null)}
                    editTitle={updateTodo} />
    }

    return (
        <View>
            <Navbar title='TodoApp' />
            <View style={styles.container}>
                { content }
                
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
