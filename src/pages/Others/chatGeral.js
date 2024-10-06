import React, { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, FlatList, ActivityIndicator,
} from "react-native";

import axios from 'axios';
import { IndexChat } from '../../config/indexChat';
import { useNavigation } from '@react-navigation/native';

export default function Chat() {
    const [usuarios, setUsuarios] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [estudantes, setEstudantes] = useState([]);
    const [chatUsers, setChats] = useState([]);
    const [mensagens, setMensagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://192.168.0.7:9221/pessoa');
                //console.log('Usuários:', response.data);
                setUsuarios(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar usuários:', err);
            }
        };

        const fetchChats = async () => {
            try {
                const response = await axios.get('http://192.168.0.7:9221/chats');
                //console.log('Chats:', response.data);
                setChats(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar chats:', err);
            }
        };

        const fetchMensagens = async () => {
            try {
                const response = await axios.get('http://192.168.0.7:9221/mensagens');
                //console.log('Mensagens:', response.data);
                setMensagens(response.data);
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar mensagens:', err);
            }
        };

        const fetchMotoristas = async () => {
            try {
                const response = await axios.get('http://192.168.0.7:9221/motorista');
                //console.log('Motoristas:', response.data);
                setMotoristas(response.data); // Motoristas já incluem dados da tabela "pessoa"
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar motoristas:', err);
            }
        };

        const fetchEstudantes = async () => {
            try {
                const response = await axios.get('http://192.168.0.7:9221/estudante');
                //console.log('Estudantes:', response.data);
                setEstudantes(response.data); // Estudantes já incluem dados da tabela "pessoa"
            } catch (err) {
                setError(err);
                console.error('Erro ao buscar estudantes:', err);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchUsuarios(), fetchChats(), fetchMensagens(), fetchEstudantes(), fetchMotoristas()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Erro ao carregar dados.</Text>;

    const getMensagensByChatID = (chatID) => {
        return mensagens.filter(msg => msg.ChatID === chatID);
    };


    return (
        <FlatList
            data={chatUsers}
            renderItem={({ item }) => {
                const mensagensChat = getMensagensByChatID(item.ID);

                const motoristaData = motoristas.find(m => m.ID === item.MotoristaID);

                return (
                    <IndexChat
                        chatUsers={item}
                        mensagens={mensagensChat}
                        motorista={motoristaData}
                        estudantes={estudantes}

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
        backgroundColor: 'cyan',
        alignItems: 'center',
    },
});
