import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/rotas'
import { UserProvider } from './src/config/funcion.js';

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <StatusBar backgroundColor='#38A69D' barStyle='light-content' />
                <Routes />
            </NavigationContainer>
        </UserProvider>

    );
}


