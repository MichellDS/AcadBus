import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Pressable,


} from "react-native";


export const IndexChat = ({ chatUsers }) => {

    return (
        <Pressable
            style={styles.containe}
            onPress={() => console.warn('Pressed on chat')}
        >
            <Image
                style={styles.image}
                source={{ uri: chatUsers.user.image }}

            />
            <View style={styles.constent}
            >

            </View>

        </Pressable>
    );

};

const styles = StyleSheet.create({
    containe: {
        height: 70,
        marginVertical: 5,
        marginHorizontal: 10,

    },
    image: {
        width: 60,
        height: 60,
        aspectRatio: 1,
        marginRight: 10,
        borderRadius: 30,
    },
    constent: {
        backgroundColor: 'red'

    },
});


