import { View, Text, StyleSheet } from 'react-native';

export default function Question() {
    return (
        <View style={styles.container}>
            <Text style={styles.question}>First Question goes here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#44a8eb',
        alignItems: 'center',
        justifyContent: 'center',
      },
})