import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabsNavigator } from './tabsNavigator.js'
import { useUser } from '../config/user.js'
import Welcome from '../pages/Welcome/inicio.js'

import LoginPassageiro from '../pages/Passageiro/loginPassageiro.js'


import LoginMotorista from '../pages/Motorista/loginMotorista.js'
import ChatMot from '../pages/Motorista/chatMoto.js'

const Stack = createNativeStackNavigator();

const AppTabs = () => {
    const { userType } = useUser();
    return <TabsNavigator userType={userType} />;
};

export default function Routes() {
    const { userType } = useUser();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='LoginPassageiro'
                component={LoginPassageiro}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='LoginMotorista'
                component={LoginMotorista}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='ChatMot'
                component={ChatMot}
                options={{ headerShown: false }}
            />





            <Stack.Screen
                name='AppTabs'
                component={AppTabs}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}
