import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { AddTodo } from '../components/AddTodo/index';
import { Todo } from '../components/Todo/index';

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {

    let content = (
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <Todo 
                    todo={item} 
                    onRemove={removeTodo}
                    onOpen={openTodo} /> 
            )}
        />
    );

    if (todos.length < 1) {
        content = (
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={require('../../assets/no-items.png')} />
            </View>
        )
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});