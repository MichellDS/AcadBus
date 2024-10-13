import React, { useState } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../config/funcion.js';

export default function ConfigPass() {
    const navigation = useNavigation();
    const { userName, userType, usuarioId, logout } = useUser();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    console.log("User ID:", usuarioId);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout(); // Executa o logout
            navigation.navigate('Welcome'); // Redireciona para a tela de login
        } catch (error) {
            console.error("Erro ao fazer logout", error);
        } finally {
            setIsLoggingOut(false); // Finaliza o estado de carregamento
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Configurações do Passageiro</Text>
            <Text style={styles.info}>Nome: {userName || 'Não disponível'}</Text>
            <Text style={styles.info}>Tipo: {userType || 'Não disponível'}</Text>
            <Text style={styles.info}>ID: {usuarioId || 'Não disponível'}</Text>


            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                disabled={isLoggingOut}
            >
                {isLoggingOut ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.logoutButtonText}>Logout</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginVertical: 5,
    },
    logoutButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
