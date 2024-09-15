import React from "react";
import {
    View, Text, StyleSheet, Image, TouchableOpacity
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'



export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#369a84', '#a9f587']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.containerLogo}
            >
                <Image
                    source={require("../../assets/AcadBus 03 PNG.png")}
                    style={{ height: "80%" }}
                    resizeMode="contain"
                />


            </LinearGradient>
            <LinearGradient
                colors={['#369a84', '#a9f587']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.containerForm}
            >
                <TouchableOpacity
                    style={styles.buttonM}
                    onPress={() => navigation.navigate('LoginMotorista')}
                >
                    <Text style={styles.buttonText}>Motorista</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonE}
                    onPress={() => navigation.navigate('LoginPassageiro')}
                >
                    <Text style={styles.buttonText}>Passageiro</Text>

                </TouchableOpacity>



            </LinearGradient>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    containerLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingStart: '5%',
        paddingEnd: '5%',
        fontSize: 20,



    },
    buttonM: {
        position: 'absolute',
        backgroundColor: 'blue',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        top: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonE: {
        position: 'absolute',
        backgroundColor: 'blue',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        top: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },

});
