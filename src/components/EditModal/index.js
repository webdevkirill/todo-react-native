import React, { useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View, Alert } from 'react-native';
import { THEME } from '../../theme';

export const EditModal = ({editTitle, visible, onCancel, value}) => {

    const [title, setTitle] = useState(value);
    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка', 'Минимальная длина названия 3 символа');
        } else {
            editTitle(title);
        }
    }
    const closeModalHandler = () => {
        setTitle(value);
        onCancel();
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrapper}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Введите новое название"
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                    value={title}
                    onChangeText={setTitle} />
                <View style={styles.buttons}>
                    <Button 
                        title="Отменить" 
                        onPress={closeModalHandler}
                        color={THEME.DANGER_COLOR}
                    />
                    <Button 
                        title="Сохранить" 
                        onPress={saveHandler}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});