import React, { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, FlatList, ActivityIndicator
} from "react-native";

import axios from 'axios';
import { IndexChat } from '../../config/indexChat.js';

import { useNavigation } from '@react-navigation/native';


export default function Chat() {
    const [chatUsers, setChatUsers] = useState([]);
    const [motorista, setMotorista] = useState([]);
    const [estudante, setEstudante] = useState([]);
    const [mensagens, setMensagens] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://192.168.0.9:9221/chats');
                console.log('Chats fetched successfully:', response.data);
                setChatUsers(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar chats:', err);
            }
        };

        const fetchMotoristas = async () => {
            try {
                const response = await axios.get('http://192.168.0.9:9221/motorista');
                console.log('Motoristas fetched successfully:', response.data);
                setMotorista(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar motoristas:', err);
            }
        };

        const fetchEstudantes = async () => {
            try {
                const response = await axios.get('http://192.168.0.9:9221/estudante');
                console.log('Estudantes fetched successfully:', response.data);
                setEstudante(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar estudantes:', err);
            }
        };

        const fetchMensagens = async () => {
            try {
                const response = await axios.get('http://192.168.0.9:9221/mensagens');
                console.log('Mensagens fetched successfully:', response.data);
                setMensagens(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar mensagens:', err);
            }
        };

        const fetchParticipantes = async () => {
            try {
                const response = await axios.get('http://192.168.0.9:9221/participantes');
                console.log('Participantes fetched successfully:', response.data);
                setParticipantes(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar participantes:', err);
            }
        };

        // Chama todas as funções de fetch ao mesmo tempo
        const fetchData = async () => {
            await Promise.all([fetchChats(), fetchMotoristas(), fetchEstudantes(), fetchMensagens(), fetchParticipantes()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Erro ao carregar dados.</Text>;

    const getMotoristaByID = (userID) => {
        return motorista.find(motor => motor.ID === userID);
    };

    const getEstudanteByID = (userID) => {
        return estudante.find(estud => estud.ID === userID);
    };

    const getMensagensByChatID = (chatID) => {
        return mensagens.filter(msg => msg.ChatID === chatID);
    };

    const getParticipantesByChatID = (chatID) => {
        return participantes.filter(part => part.ChatID === chatID);
    };

    return (
        <FlatList
            data={chatUsers}
            renderItem={({ item }) => {
                const motorista = getMotoristaByID(item.MotoristaID);
                const estudante = getEstudanteByID(item.EstudanteID);
                const mensagensChat = getMensagensByChatID(item.ID);
                const participantesChat = getParticipantesByChatID(item.ID);
                return (
                    <IndexChat
                        chatUsers={item}
                        motorista={motorista}
                        estudante={estudante}
                        mensagens={mensagensChat}
                        participantes={participantesChat}
                    />
                );
            }}
            keyExtractor={item => item.ID.toString()}
        />
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'cyan', //#fff
        alignItems: 'center',
    },

})

