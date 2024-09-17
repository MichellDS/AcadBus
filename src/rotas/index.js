import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabsNavigator } from './tabsNavigator.js'
import { useUser } from '../config/funcion.js'

import Welcome from '../pages/Others/inicio.js'
import Grupo from '../pages/Others/chatGrupo.js'
import LoginPassageiro from '../pages/Passageiro/loginPassageiro.js'
import LoginMotorista from '../pages/Motorista/loginMotorista.js'


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
                name='AppTabs'
                component={AppTabs}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Grupo'
                component={Grupo}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}
