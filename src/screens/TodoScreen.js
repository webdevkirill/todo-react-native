import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../theme';
import { Card } from '../components/UI/Card';
import { EditModal } from '../components/EditModal/index';

export const TodoScreen = ({goBack, todo, removeTodo}) => {

    const [modal, setModal] = useState(false);

    return (
        <View>
            <Card>
                <Text style={styles.title}>{todo.title}</Text>
                <Button 
                    title="Редактировать"
                    onPress={() => setModal(true)}
                />
            </Card>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button 
                        title="Назад" 
                        onPress={goBack} 
                        color={THEME.GREY_COLOR} />
                </View>
                <View style={styles.button}>
                    <Button 
                        title="Удалить" 
                        color={THEME.DANGER_COLOR} 
                        onPress={() => removeTodo(todo.id)} />
                </View>
            </View>

            <EditModal 
                visible={modal}
                onCancel={() => setModal(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        width: '40%'
    },
    title: {
        fontSize: 20
    }
});