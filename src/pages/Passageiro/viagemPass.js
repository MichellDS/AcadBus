import React from "react";
import {
    View, Text, StyleSheet,
} from "react-native";

import { useNavigation } from '@react-navigation/native';


export default function ViagemPass() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Viagem P</Text>

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

