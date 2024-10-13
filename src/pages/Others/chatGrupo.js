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



    useEffect(() => {
        navigation.setOptions({
            title: route.params.name
        });
    }, [route.params.title]);


    if (!Array.isArray(mensagens) || mensagens.length === 0) {
        return <Text style={styles.text}>Nenhuma mensagem encontrada.</Text>;
    }

    const renderMessageItem = ({ item, index }) => {
        const messageKey = item.ID ? item.ID.toString() : `temp-${index}`;

        // Verifique se a mensagem está faltando algum campo
        if (!item['UsuarioID'] || !item['UsuarioNome'] || !item['Conteudo']) {
            console.log('Mensagem valores', item['usuarioID'], item['usuarioNome'], item['conteudo']);
            console.warn('Mensagem incompleta:', item);  // Exibe a mensagem completa para depuração
          // Exibe a mensagem completa para depuração
            return (
                <View style={styles.incompleteMessageContainer}>
                    <Text style={styles.incompleteMessageText}>Mensagem incompleta</Text>
                </View>
            );
        }

        const isSentByCurrentUser = String(item.UsuarioID) === String(usuarioId);
        const messageStyle = isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage;
        const containerStyle = isSentByCurrentUser ? styles.sentContainer : styles.receivedContainer;

        return (
            <View style={[styles.messageContainer, containerStyle]} key={messageKey}>
                <Text style={styles.userText}>{item.UsuarioNome || "Desconhecido"}:</Text>
                <View style={[styles.messageBubble, messageStyle]}>
                    <Text style={styles.messageText}>{item.Conteudo}</Text>
                </View>
            </View>
        );
    };



    const sendMessage = async () => {
        if (mensagemTexto.trim()) {
            try {
                console.log('Preparando para enviar mensagem:', mensagemTexto);

                const newMessage = {
                    chatID: chatId,
                    UsuarioID: usuarioId,
                    UsuarioNome: userName,
                    Conteudo: mensagemTexto,
                };

                console.log('Nova mensagem criada:', newMessage);

                // Enviar mensagem ao backend
                const response = await fetch('http://192.168.0.10:9221/api/mensagens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });

                const responseData = await response.json(); // Ajustar para obter a resposta JSON
                //console.log(responseData.id);

                if (response.ok && responseData.id) {
                    const insertedMessage = {
                        ...newMessage,
                        ID: responseData.id // ID gerado pelo backend
                    };

                    if (insertedMessage.UsuarioID && insertedMessage.UsuarioNome && insertedMessage.Conteudo) {
                        setMensagens(prevMensagens => [...prevMensagens, insertedMessage]);
                        setMensagemTexto('');
                    } else {
                        Alert.alert('Erro', 'Mensagem incompleta ao inserir no sistema.');
                    }
                } else {
                    Alert.alert('Erro', 'Erro ao enviar mensagem: ' + responseData.error);
                }
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
        } else {
            Alert.alert('Erro', 'Por favor, digite uma mensagem.');
        }
    };

    useEffect(() => {
        // Ajustar para usar os nomes maiúsculos na renderização
        const validMessages = route.params.mensagens?.filter(item =>
            item.UsuarioID && item.UsuarioNome && item.Conteudo
        ) || [];
        setMensagens(validMessages);
    }, [route.params.mensagens]);


    return (
        <View style={styles.container}>
            {mensagens.length === 0 ? (
                <View style={styles.emptyMessageContainer}>
                    <Text style={styles.text}>Nenhuma mensagem encontrada.</Text>
                </View>
            ) : (
                <FlatList
                    data={mensagens}
                    keyExtractor={(item, index) => {
                        //console.log('Chave gerada para item.ID.toString():', item.ID);
                        return item.ID ? item.ID.toString() : `temp-${index}`
                    }}
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
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                        console.log('Botão de enviar pressionado, valor da mensagem:', mensagemTexto);
                        sendMessage();
                    }}>

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
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    incompleteMessageContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9c2ff',
        borderRadius: 10,
        alignItems: 'center',
    },
    incompleteMessageText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
