import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState(null);
    const [usuarioId, setUsuarioId] = useState(null);

    const login = async ({ codigo, senha, email }) => {
        try {
            let response;
            if (codigo) {
                console.log(`Tentando login como motorista: ${codigo}, ${senha}`);
                response = await axios.post('http://192.168.0.10:9221/api/login/motorista', { codigo, senha });
            } else if (email) {
                console.log(`Tentando login como passageiro: ${email}, ${senha}`);
                response = await axios.post('http://192.168.0.10:9221/api/login/estudante', { email, senha });
            }

            if (response && response.data) {
                console.log("Resposta da API:", response.data);

                const { type, nome, usuarioId } = response.data;

                if (usuarioId === undefined || usuarioId === null) {
                    console.warn("usuarioId não encontrado na resposta da API.");
                    throw new Error("usuarioId não encontrado na resposta da API.");
                }

                setUserType(type);
                if (nome) {
                    setUserName(nome);
                    await AsyncStorage.setItem('userName', nome);
                } else {
                    console.warn("Nome não encontrado na resposta da API.");
                }

                setUsuarioId(usuarioId);

                if (usuarioId !== undefined && usuarioId !== null) {
                    await AsyncStorage.setItem('usuarioId', usuarioId.toString());
                    console.log("Armazenando usuarioId:", usuarioId);
                } else {
                    console.warn("usuarioId não está definido.");
                }

                await AsyncStorage.setItem('userType', type);

            } else {
                throw new Error("Tipo de usuário não encontrado na resposta.");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao fazer login: " + (error.response?.data?.message || error.message));
        }
    };

    const loadUserData = async () => {
        try {
            const type = await AsyncStorage.getItem('userType');
            const name = await AsyncStorage.getItem('userName');
            const id = await AsyncStorage.getItem('usuarioId');

            if (type) {
                setUserType(type);
            } else {
                await AsyncStorage.removeItem('userType');
            }

            if (name) {  // Corrigido de 'nome' para 'name'
                setUserName(name);  // Armazena o nome corretamente
            } else {
                await AsyncStorage.removeItem('userName');
            }

            if (id) {
                console.log("Carregando usuarioId do AsyncStorage:", id);
                setUsuarioId(parseInt(id, 10)); // Armazena o ID do usuário
            } else {
                await AsyncStorage.removeItem('usuarioId');
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário: ", error);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const logout = async () => {
        setUserType(null);
        setUserName(null); // Limpa o nome
        setUsuarioId(null);
        AsyncStorage.removeItem('userType');
        AsyncStorage.removeItem('userName'); // Remove o nome
        AsyncStorage.removeItem('usuarioId');

    };

    return (
        <UserContext.Provider value={{ userType, userName, usuarioId, login, logout }}>
            {console.log("userType:", userType)}
            {console.log("userName:", userName)}
            {console.log("usuarioId:", usuarioId)}
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
