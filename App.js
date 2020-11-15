import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/ScreenState';

const loadApp = async () => {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
}

export default function App() {
    
    const [isAppReady, setIsAppReady] = useState(false);

    if (!isAppReady) {
        return (
            <AppLoading 
                startAsync={loadApp}
                onFinish={() => setIsAppReady(true)}
            />
        )
    }

    return (
        <ScreenState>
            <TodoState>
                <MainLayout />
                <StatusBar />
            </TodoState>
        </ScreenState>
    );
}

