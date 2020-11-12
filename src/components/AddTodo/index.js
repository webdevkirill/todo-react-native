import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { THEME } from '../../theme';

export const AddTodo = ({onSubmit}) => {

    const [value, setValue] = useState('');

    const addTodoHandler = () => {
        if (value.trim()) {
            onSubmit(value.trim());
            setValue('');
        } else {
            Alert.alert('Название задачи не может быть пустым')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder='Введите название задачи...'
                autoCorrect={false}
                autoCapitalize='none'
            />
            <Button 
                title='Добавить' 
                onPress={addTodoHandler}
            />
        </View>
    )
}

export const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
});