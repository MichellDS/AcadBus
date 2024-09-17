import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
    View, Text, StyleSheet, FlatList, Image, Pressable, Alert
} from "react-native";


export const IndexChat = ({ chatUsers }) => {
    const navigation = useNavigation();

    const goChat = () => {
        Alert.alert('Go to chat!', 'Entrando no chat');
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
                <Text numberOfLines={2} style={styles.subtitle}>
                    {chatUsers.Descricao}
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


