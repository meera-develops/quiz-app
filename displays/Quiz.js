import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import questions from '../questions.json';

export default function Quiz() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Meera's Quiz App</Text>
            <Button 
            title="Start Quiz"
            size="lg"
            color="secondary"
            onPress={() => navigation.navigate('Test', {questionIndex: 0, questions: questions })} 
            buttonStyle={{
                borderRadius: 10,
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#44a8eb',
        alignItems: 'center',
        // justifyContent: 'center',
      },
      header: {
        marginTop: 10,
        padding: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Helvetica',
        marginBottom: 20,
    },
})