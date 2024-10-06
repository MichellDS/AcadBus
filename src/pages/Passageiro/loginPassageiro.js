import React, { useState } from "react";
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../../config/funcion.js';


export default function LoginPassageiro() {
    const navigation = useNavigation();
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            await login({ email, senha });
            //Alert.alert("Sucesso", "Login realizado com sucesso!");
            navigation.navigate('AppTabs');
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro ao fazer login. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

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
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.message}>Bem-Vindo</Text>
            </LinearGradient>
            <View style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha..."
                    style={styles.input}
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                )}
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
