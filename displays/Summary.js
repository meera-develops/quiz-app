import { View, Text, StyleSheet } from 'react-native';
//do this part 

export default function Summary() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>You have now reached the summary</Text>
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
    header: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    }
})