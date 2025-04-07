import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

export default function Quiz() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Meera's Quiz App</Text>
            <Button 
            title="Start Quiz"
            size="lg"
            onPress={() => navigation.navigate('Question')} 
            buttonStyle={{
                borderRadius: 10,
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
      },
      header: {
        marginTop: 10,
        padding: 20,
        textAlign: 'center',
        color: 'red',
        fontSize: 30,
        fontFamily: 'Helvetica',
        marginBottom: 20,
    },
})