import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import { useRoute, useNavigation } from '@react-navigation/native';
import questions from '../questions.json';

export default function Question() {
    const route = useRoute();
    const navigation = useNavigation();
    
    const { questionIndex, selectedAnswers = [] } = route.params || {}; // Safe access to params
    
    // Log to check values
    console.log('Question Index:', questionIndex);
    console.log('All Questions:', questions);
    
    // Make sure we're accessing the question by index
    const curQuestion = questions[questionIndex]; // Assuming questionIndex directly maps to array index
    
    if (!curQuestion) {
        console.error('Question not found');
        return null;
    }

    const handleAnswer = (selectedOption) => {
        const updatedAnswers = [...selectedAnswers, {
            questionIndex: curQuestion.itemID,
            selectedOption,
        }];
        
        if (questionIndex + 1 < questions.length) {
            navigation.navigate('Test', {
                questionIndex: questionIndex + 1,
                selectedAnswers: updatedAnswers,
            });
        } else {
            navigation.navigate('Summary', { selectedAnswers: updatedAnswers });
        }
    };

    const renderQuestion = () => {
        switch (curQuestion.type) {
            case 'true/false':
                return (
                    <View style={styles.buttonContainer}>
                        <Button title="True" onPress={() => handleAnswer(0)} />
                        <Button title="False" onPress={() => handleAnswer(1)} />
                    </View>
                );

            case 'multiple-choice':
                return (
                    <View style={styles.buttonContainer}>
                        {curQuestion.choices.map((choice, i) => (
                            <Button
                                key={i}
                                title={choice}
                                onPress={() => handleAnswer(i)} // Pass the index of the choice
                            />
                        ))}
                    </View>
                );

            case 'multiple-answer':
                return (
                    <View style={styles.buttonContainer}>
                        {curQuestion.choices.map((choice, i) => (
                            <Button
                                key={i}
                                title={choice}
                                onPress={() => handleAnswer(i)} // Pass the index of the choice
                            />
                        ))}
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.entryText}>Question goes here</Text>
            <Text style={styles.myQuestion}>{curQuestion.prompt}</Text>
            {renderQuestion()}
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
    entryText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    myQuestion: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        width: '80%',
    },
});

