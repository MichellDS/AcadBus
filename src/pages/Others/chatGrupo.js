import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useUser, userName, usuarioId } from '../../config/funcion.js';


export const Grupo = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { userType, userName, usuarioId } = useUser();
    const [mensagemTexto, setMensagemTexto] = useState('');
    const [mensagens, setMensagens] = useState(route.params.mensagens || []);
    const { chatId, estudantes = [], motoristas = [] } = route.params || {};
    const motoristasList = Array.isArray(motoristas) ? motoristas : [];



    const getUserNameByID = (usuarioId, tipo) => {
        let user;
        if (tipo === "Estudante" && Array.isArray(estudantes)) {
            user = estudantes.find(estudante => estudante.ID === usuarioId);
        } else if (tipo === "Motorista" && Array.isArray(motoristas)) {
            user = motoristas.find(motorista => motorista.ID === usuarioId);
        }
        return user ? user.Nome : 'Desconhecido';
    };

    useEffect(() => {
        navigation.setOptions({
            title: route.params.name
        });
    }, [route.params.title]);

    if (!Array.isArray(mensagens) || mensagens.length === 0) {
        return <Text style={styles.text}>Nenhuma mensagem encontrada.</Text>;
    }

    const renderMessageItem = ({ item }) => {

        if (!item.UsuarioID || !item.UsuarioNome || !item.Conteudo) {
            console.warn('Mensagem incompleta:', item);
            return (
                <Text style={styles.incompleteMessageText}>Mensagem incompleta</Text>
            );
        }

        const isSentByCurrentUser = (String(item.UsuarioID) === String(usuarioId));
        const messageStyle = isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage;
        const containerStyle = isSentByCurrentUser ? styles.sentContainer : styles.receivedContainer;

        return (
            <View style={[styles.messageContainer, containerStyle]} key={`${item.ID}-${item.timestamp}`}>
                <Text style={styles.userText}>{item.UsuarioNome}:</Text>
                <View style={[styles.messageBubble, messageStyle]}>
                    <Text style={styles.messageText}>{item.Conteudo}</Text>
                </View>
            </View>
        );
    };


    const sendMessage = async () => {
        if (mensagemTexto.trim()) {
            try {
                const usuarioNome = getUserNameByID(usuarioId, userType);
                const newMessage = {
                    chatID: chatId,
                    usuarioID: usuarioId,
                    usuarioNome: usuarioNome,
                    conteudo: mensagemTexto,
                };

                // Enviar mensagem ao backend
                const response = await fetch('http://192.168.0.7:9221/api/mensagens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });

                const responseText = await response.text();

                if (response.ok) {
                    setMensagens(prevMensagens => [
                        ...prevMensagens,
                        newMessage
                    ]);
                    setMensagemTexto('');
                } else {
                    Alert.alert('Erro', 'Erro ao enviar mensagem: ' + responseText);
                }
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
        } else {
            Alert.alert('Erro', 'Por favor, digite uma mensagem.');
        }
    };


    return (
        <View style={styles.container}>
            {mensagens.length === 0 ? (
                <Text style={styles.text}>Nenhuma mensagem encontrada.</Text>
            ) : (
                <FlatList
                    data={mensagens}
                    keyExtractor={(item) => `${item.ID}-${item.timestamp}`}
                    renderItem={renderMessageItem}
                    showsVerticalScrollIndicator={false}
                    style={styles.lista}
                    contentContainerStyle={styles.chatContainer}
                />
            )}


            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Digite uma mensagem..."
                    value={mensagemTexto}
                    onChangeText={setMensagemTexto}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5ddd5', // Fundo similar ao WhatsApp
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    userText: {
        fontWeight: 'bold',
        color: 'blue', // Cor para o nome do usuário
        marginBottom: 2,
    },
    messageContainer: {
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    sentMessage: {
        backgroundColor: '#DCF8C6', // Cor da mensagem enviada (verde claro)
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#FFF', // Cor da mensagem recebida (branco)
        alignSelf: 'flex-start',
    },
    sentContainer: {
        alignItems: 'flex-end',
    },
    receivedContainer: {
        alignItems: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    lista: {
        flex: 1,
    },
    chatContainer: {
        paddingBottom: 80, // Espaço extra para o campo de texto
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#25D366', // Cor do botão "Enviar"
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
