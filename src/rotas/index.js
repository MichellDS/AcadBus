import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome/inicio.js'
import Passageiro from '../pages/Passageiro/loginPassageiro.js'
import Motorista from '../pages/Motorista/loginMotorista.js'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Passageiro'
                component={Passageiro}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Motorista'
                component={Motorista}
                options={{ headerShown: false }}
            />

            {/* <Stack.Screen
                name='Motorista'
                component={Motorista}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Motorista'
                component={Motorista}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Motorista'
                component={Motorista}
                options={{ headerShown: false }}
            /> */}

        </Stack.Navigator>
    )

}