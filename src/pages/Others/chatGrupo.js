import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


export const Grupo = () => {
    const route = useRoute();
    const navigation = useNavigation();

    //console.log(route.params);

    const { mensagens = [], estudantes = [], motoristas = [] } = route.params || {};
    console.log("Mensagens:", mensagens);
    //console.log("Estudantes:", estudantes);
    //console.log("Motoristas:", motoristas);


    useEffect(() => {
        navigation.setOptions({

            title: route.params.title
        });
    }, [route.params.title]);

    if (!mensagens.length) {
        return <Text style={styles.text}>Nenhuma mensagem encontrada.</Text>;
    }

    const getUserNameByID = (userID, tipo) => {
        const user = tipo === "Estudante"
            ? estudantes.find(estudante => estudante.ID === userID)
            : motoristas.find(motorista => motorista.ID === userID);

        return user ? user.Nome : 'Desconhecido';
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={mensagens}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.userText}>{getUserNameByID(item.UsuarioID, item.Tipo)}:</Text>
                        <Text style={styles.text}>{item.Conteudo}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                style={styles.lista}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7ecfbd',
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    userText: {
        fontWeight: 'bold',
        color: 'blue', // Cor para o nome do usuário
    },
    lista: {
        padding: 10,
    },
});
