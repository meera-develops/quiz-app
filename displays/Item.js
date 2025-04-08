import { Text, View, StyleSheet } from 'react-native';
import { ButtonGroup } from '@rneui/base';
import { Button } from '@rneui/base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';


export default function Test() {
    const route = useRoute();
    const navigation = useNavigation();

    const { questionIndex, questions } = route.params

    const theQuestion = questions[questionIndex];

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleSelection = (index) => {
        setSelectedAnswer(index);
    };

    const nextQuestion = () => {
        if (questionIndex + 1 < questions.length) {
            navigation.navigate('Test', {questionIndex: questionIndex + 1, questions });
        } else {
            navigation.navigate('Summary');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{theQuestion.prompt}</Text>
            
            <ButtonGroup
                buttons={theQuestion.choices}
                selectedIndex={selectedAnswer}
                onPress={handleSelection}
                containerStyle={styles.buttonGroupContainer}
                vertical
                
            />
            
            <Button
                title="Next Question"
                onPress={nextQuestion}
                disabled={selectedAnswer === null} 
                color="warning"
                buttonStyle={{
                    borderRadius: 10,
                }}
            />
        </View>
    )
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
        marginBottom: 10,
    },
    buttonGroupContainer: {
        width: '20%',
        marginBottom: 20,
    },
    
})