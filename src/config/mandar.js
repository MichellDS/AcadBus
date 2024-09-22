import React, { useState } from "react";
import {
    View, TextInput, Button, StyleSheet, Text, ActivityIndicator
} from "react-native";

import axios from 'axios';

export default function SendMessage({ route, navigation }) {
    const { chatID } = route.params;
    const [message, setMessage] = useState("");
    const [userID, setUserID] = useState(""); // Supondo que você já tenha o ID do usuário atual
    const [userType, setUserType] = useState(""); // 'Motorista' ou 'Estudante'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendMessage = async () => {
        setLoading(true);
        try {
            await axios.post('http://192.168.0.9:9221/mensagens', {
                ChatID: chatID,
                UsuarioID: userID,
                Tipo: userType,
                Conteudo: message
            });
            setMessage("");
            setError(null);
            navigation.goBack(); // Volta para a página anterior após o envio
        } catch (err) {
            setError(err);
            console.error('Erro ao enviar mensagem:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite sua mensagem..."
                value={message}
                onChangeText={setMessage}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Button title="Enviar Mensagem" onPress={handleSendMessage} />
                    {error && <Text style={styles.error}>Erro ao enviar mensagem</Text>}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});
