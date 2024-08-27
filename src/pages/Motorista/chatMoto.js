import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,

} from "react-native";

import chatUsers from '../../config/users.js';
import { IndexChat } from '../../config/indexChat.js';
import { useNavigation } from '@react-navigation/native';


export default function ChatMoto() {
    const navigation = useNavigation();

    return (
        <FlatList
            data={chatUsers}
            renderItem={({item}) => <IndexChat chatUsers={item}/>}
            showsVerticalScrollIndicator={false}

        />
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'cyan', //#fff
        alignItems: 'center',
    },

})

