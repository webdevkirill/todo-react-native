import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { THEME } from '../../../theme';

export const AppLoader = () => (
    <View style={styles.loaderWrapper}>
        <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
    </View>
)

const styles = StyleSheet.create({
    loaderWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})