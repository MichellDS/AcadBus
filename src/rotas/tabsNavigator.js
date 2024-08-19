import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';


import ChatMoto from '../pages/Motorista/chatMoto';
import ConfigMoto from '../pages/Motorista/configMoto';
import ViagemMoto from '../pages/Motorista/viagemMoto';

import ChatPass from '../pages/Passageiro/chatPass';
import ViagemPass from '../pages/Passageiro/viagemPass';
import ConfigPass from '../pages/Passageiro/configPass';


const Tab = createBottomTabNavigator();


const MotoristaTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Chat'
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'black',
                headerStyle: {
                    backgroundColor: 'whitesmoke',
                }
            }}
        >
            <Tab.Screen
                name='Chat'
                component={ChatMoto}
                options={({ navigation }) => ({
                    headerTitle: "Conversas",
                    tabBarLabel: "Chat",
                    headerShown: true,
                    tabBarIcon: ({ }) => (
                        <Ionicons
                            name="chatbubbles"
                            size={24}
                            color="black" />
                    ),
                })}
            />

            <Tab.Screen
                name='Viagem'
                component={ViagemMoto}
                options={({ navigation }) => ({
                    headerTitle: "Lista",
                    tabBarLabel: "Passageiros",
                    headerShown: true,
                    tabBarIcon: ({ }) => (
                        <Ionicons
                            name="people-sharp"
                            size={24}
                            color="black"
                            />

                    ),
                    headerRight: ({ }) => (
                        <Ionicons
                            name="qr-code-sharp"
                            size={24}
                            color="black"
                            style= {{marginRight: 25 }}
                            />

                    ),


                })}
            />

            <Tab.Screen
                name='Config'
                component={ConfigMoto}
                options={({ navigation }) => ({
                    headerTitle: "Configuração",
                    tabBarLabel: "Ajustes",
                    headerShown: true,
                    tabBarIcon: ({ }) => (
                        <Ionicons
                            name="settings-sharp"
                            size={24}
                            color="black" />

                    ),
                })}
            />



        </Tab.Navigator>
    );

};

const PassageiroTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Chat'
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'black',
                headerStyle: {
                    backgroundColor: 'whitesmoke',
                }
            }}
        >
            <Tab.Screen
                name='Chat'
                component={ChatPass}
                options={{ headerShown: true }}
            />

            <Tab.Screen
                name='Viagem'
                component={ViagemPass}
                options={{ headerShown: true }}
            />

            <Tab.Screen
                name='Config'
                component={ConfigPass}
                options={{ headerShown: true }}
            />



        </Tab.Navigator>
    )

};

export const TabsNavigator = ({ userType }) => {
    return userType === 'motorista' ? <MotoristaTabs /> : <PassageiroTabs />;
};
