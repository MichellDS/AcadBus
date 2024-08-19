import React from "react";
import {
    View,
    Text,
    StyleSheet,

} from "react-native";

import { useNavigation } from '@react-navigation/native';


export default function ViagemMoto() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Viagem M</Text>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

})

