import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { AddTodo } from '../components/AddTodo/index';
import { Todo } from '../components/Todo/index';

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
    return (
        <View>
            <AddTodo onSubmit={addTodo} />
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Todo 
                            todo={item} 
                            onRemove={removeTodo}
                            onOpen={openTodo} /> 
                    )
                }
                />
        </View>
    )
}

const styles = StyleSheet.create({

});