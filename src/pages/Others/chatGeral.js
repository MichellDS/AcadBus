import React, { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, FlatList, ActivityIndicator
} from "react-native";

import axios from 'axios';
import { IndexChat } from '../../config/indexChat.js';
import { useNavigation } from '@react-navigation/native';


export default function Chat() {
    const [chatUsers, setChatUsers] = useState([]);
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
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Erro ao carregar chats.</Text>;

    return (
        <FlatList
            data={chatUsers}
            renderItem={({ item }) => (
                <IndexChat chatUsers={item} />
            )}
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

