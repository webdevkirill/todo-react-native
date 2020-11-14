import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { THEME } from '../theme';
import { Card } from '../components/UI/Card';
import { EditModal } from '../components/EditModal/index';
import { AppTextBold } from '../components/UI/AppTextBold/index';

export const TodoScreen = ({goBack, todo, removeTodo, editTitle}) => {

    const [modal, setModal] = useState(false);
    const saveTitleHandler = (title) => {
        editTitle(todo.id, title);
        setModal(false);
    }

    return (
        <View>
            <Card>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
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
                value={todo.title}
                editTitle={saveTitleHandler}
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