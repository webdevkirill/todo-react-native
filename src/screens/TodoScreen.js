import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../theme';
import { Card } from '../components/UI/Card';

export const TodoScreen = ({goBack, todo}) => {

    return (
        <View>
            <Card>
                <Text style={styles.title}>{todo.title}</Text>
                <Button 
                    title="Редактировать"
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
                        onPress={() => {console.log('remove')}} />
                </View>
            </View>
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