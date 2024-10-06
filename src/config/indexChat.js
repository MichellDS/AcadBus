import React from "react";
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../config/funcion';
import {
    View, Text, StyleSheet, FlatList, Image, Pressable, Alert
} from "react-native";


export const IndexChat = ({ chatUsers, motorista, mensagens, estudantes }) => {
    const navigation = useNavigation();
    const { usuarioId } = useUser();
    //console.log('Id testado:', usuarioId);
    //console.log('motorista:', motorista);
    //console.log('mensagens:', mensagens);
    //console.log('estudante:', estudantes);

    const goChat = () => {
        navigation.navigate('Grupo', {
            chatId: chatUsers.ID,
            name: chatUsers.Nome || 'Chat sem nome',
            mensagens: mensagens || [],
            motoristas: motorista || [],
            estudantes: estudantes || [],
            usuarioId: usuarioId,
        });
    };

    return (
        <Pressable
            style={styles.container}
            onPress={goChat}
        >
            <Image
                style={styles.image}
                source={require('../assets/default-image.png')}
            />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.title}>
                        {chatUsers.Nome}
                    </Text>
                </View>
                <Text numberOfLines={1} style={styles.subtitle}>
                    Motorista: {motorista?.Nome || 'N/A'}
                </Text>


            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'stretch',


    },
    image: {
        width: 60,
        height: 60,
        aspectRatio: 1,
        marginRight: 10,
        borderRadius: 30,
    },
    content: {
        flex: 1,
        borderBlockColor: 'lightgrey',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',

    },
    row: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },


});


