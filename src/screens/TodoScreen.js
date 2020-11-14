import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { THEME } from '../theme';
import { Card } from '../components/UI/Card';
import { EditModal } from '../components/EditModal/index';
import { AppTextBold } from '../components/UI/AppTextBold/index';
import { AppButton } from '../components/UI/AppButton/index';

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
                <AppButton onPress={() => setModal(true)} >
                    <FontAwesome name="edit" size={20} />
                </AppButton>
            </Card>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton 
                        onPress={goBack} 
                        color={THEME.GREY_COLOR}
                    >
                        <AntDesign name="back" size={20} color="#fff" />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton 
                        color={THEME.DANGER_COLOR} 
                        onPress={() => removeTodo(todo.id)}
                    >
                        <FontAwesome name="remove" size={20} />
                    </AppButton>
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
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20
    }
});