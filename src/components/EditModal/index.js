import React from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';
import { THEME } from '../../theme';

export const EditModal = ({visible, onCancel}) => {

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrapper}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Введите новое название"
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64} />
                <View style={styles.buttons}>
                    <Button 
                        title="Отменить" 
                        onPress={onCancel}
                        color={THEME.DANGER_COLOR}
                    />
                    <Button 
                        title="Сохранить" 
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