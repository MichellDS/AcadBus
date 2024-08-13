import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity

} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Motorista() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#369a84', '#a9f587']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.containerTop}
            >

                <TouchableOpacity
                    style={styles.returnButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="white"
                    />

                </TouchableOpacity>

                <Text style={styles.message}>Bem-Vindo</Text>

            </LinearGradient>
            <View style={styles.containerForm}>
                <Text style={styles.title}>Código</Text>
                <TextInput placeholder="Digite seu código de acesso..."
                    style={styles.input} />

                <Text style={styles.title}>Senha</Text>
                <TextInput placeholder="Digite sua senha..."
                    style={styles.input} />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>





            </View>


        </View>

    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    containerTop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: '5%',

    },

    returnButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        //backgroundColor: 'blue',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    message: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },

    containerForm: {
        backgroundColor: 'White',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    title: {
        fontSize: 20,
        marginTop: 28,
    },

    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },

    button: {
        backgroundColor: 'blue',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },






});