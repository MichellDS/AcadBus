import React from 'react'
import { Alert } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import Chat from '../pages/Others/chatGeral';
import ConfigMoto from '../pages/Motorista/configMoto';
import ViagemMoto from '../pages/Motorista/viagemMoto';

import ViagemPass from '../pages/Passageiro/viagemPass';
import ConfigPass from '../pages/Passageiro/configPass';


const Tab = createBottomTabNavigator();

const goChat = () => {
    Alert.alert('Scaneie para confirmar presença', 'gwhgwshswhhbhhwshw');
};

const MotoristaTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Chat'
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'black',
                headerStyle: {
                    backgroundColor: '#38A69D',
                }
            }}
        >
            <Tab.Screen
                name='Chat'
                component={Chat}
                options={({ navigation }) => ({
                    headerTitle: "Conversas",
                    tabBarLabel: "Chat",
                    headerShown: true,
                    tabBarIcon: ({ }) => (
                        <Ionicons
                            name="chatbubbles"
                            size={24}
                            color="black"
                        />

                    ),
                    headerRight: () => (
                        <Entypo
                            name="new-message"
                            size={24}
                            color="black"
                            style={{ marginRight: 25 }}
                        />
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
                            style={{ marginRight: 25 }}
                            onPress={goChat}
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
                            color="black"
                        />

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
                    backgroundColor: '#38A69D',
                }
            }}
        >
            <Tab.Screen
                name='Chat'
                component={Chat}
                options={({ navigation }) => ({
                    headerTitle: "Conversas",
                    tabBarLabel: "Chat",
                    headerShown: true,
                    tabBarIcon: ({ }) => (
                        <Ionicons
                            name="chatbubbles"
                            size={24}
                            color="black"
                        />

                    ),

                })}
            />

            <Tab.Screen
                name='Viagem'
                component={ViagemPass}
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
                            name="qr-code-outline"
                            size={24}
                            color="black"
                            style={{ marginRight: 25 }}
                            onPress={goChat}
                        />

                    ),


                })}
            />

            <Tab.Screen
                name='Config'
                component={ConfigPass}
                options={({ navigation }) => ({
                    headerTitle: "Configuração",
                    tabBarLabel: "Ajustes",
                    headerShown: true,
                    tabBarIcon: ({ }) => (
                        <Ionicons
                            name="settings-sharp"
                            size={24}
                            color="black"
                        />

                    ),
                })}
            />



        </Tab.Navigator>
    )

};

export const TabsNavigator = ({ userType }) => {
    return userType === 'motorista' ? <MotoristaTabs /> : <PassageiroTabs />;
};
