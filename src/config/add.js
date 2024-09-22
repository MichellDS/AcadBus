import React, { useState, useEffect } from "react";
import {
    View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Picker
} from "react-native";

import axios from 'axios';

export default function AddParticipant({ route, navigation }) {
    const { chatID } = route.params;
    const [userID, setUserID] = useState("");
    const [userType, setUserType] = useState(""); // 'Motorista' ou 'Estudante'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddParticipant = async () => {
        setLoading(true);
        try {
            await axios.post('http://192.168.0.9:9221/participantes', {
                ChatID: chatID,
                UsuarioID: userID,
                Tipo: userType
            });
            setUserID("");
            setUserType("");
            setError(null);
            navigation.goBack(); // Volta para a página anterior após a adição
        } catch (err) {
            setError(err);
            console.error('Erro ao adicionar participante:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="ID do Usuário"
                value={userID}
                onChangeText={setUserID}
            />
            <Picker
                selectedValue={userType}
                style={styles.picker}
                onValueChange={(itemValue) => setUserType(itemValue)}
            >
                <Picker.Item label="Motorista" value="Motorista" />
                <Picker.Item label="Estudante" value="Estudante" />
            </Picker>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Button title="Adicionar Participante" onPress={handleAddParticipant} />
                    {error && <Text style={styles.error}>Erro ao adicionar participante</Text>}
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});
