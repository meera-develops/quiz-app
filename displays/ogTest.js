import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import questions from '../questions.json';

export default function ogTest() {
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

    const [chooseAnswer, setChooseAnswer] = useState(false);

    const handleAnswerToggle = (selectedOptionIndex) => {
        const isSelected = selectedOptions.includes(selectedOptionIndex);
        const updatedAnswers = isSelected
            ? selectedOptions.filter((answer) => answer !== selectedOptionIndex) // Deselect if already selected
            : [...selectedOptions, selectedOptionIndex]; // Add if not selected

        setSelectedOptions(updatedAnswers); // Update the state
    };

    const handleNext = () => {
        const updatedAnswers = [...selectedAnswers];

        if (questionIndex + 1 < questions.length) {
            navigation.navigate('Test', {
                questionIndex: questionIndex + 1,
                selectedAnswers: updatedAnswers,
            });
        } else {
            navigation.navigate('Summary', { selectedAnswers: updatedAnswers });
        }
    }

    const renderQuestion = () => {
        switch (curQuestion.type) {
            case 'true/false':
                return (
                    <View style={styles.buttonContainer}>
                        <Button title="True" onPress={() => handleAnswerToggle(0)} buttonStyle={{
                                backgroundColor: selectedOptions.includes(0) ? '#007bff' : '#ccc', // Highlight selected
                            }} />
                        <Button title="False" onPress={() => handleAnswerToggle(1)} buttonStyle={{
                                backgroundColor: selectedOptions.includes(0) ? '#007bff' : '#ccc', // Highlight selected
                            }} />
                    </View>
                );

            case 'multiple-choice':
                return (
                    <View style={styles.buttonContainer}>
                        {curQuestion.choices.map((choice, i) => (
                            <Button
                                key={i}
                                title={choice}
                                onPress={() => handleAnswerToggle(i)}
                                buttonStyle={{
                                    backgroundColor: selectedOptions.includes(0) ? '#007bff' : '#ccc', // Highlight selected
                                }} 
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
                                onPress={() => handleAnswerToggle(i)}
                                buttonStyle={{
                                    backgroundColor: selectedOptions.includes(0) ? '#007bff' : '#ccc', // Highlight selected
                                }} // Pass the index of the choice
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
            {chooseAnswer && (
                <Button
                title="Next Question"
                onPress={handleNext}
                containerStyle={styles.nextButtonContainer} />
            )}
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
        marginBottom: 10,
    },
    myQuestion: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        width: '80%',
    },
    nextButtonContainer: {
        marginTop: 30,
        width: '80%',
    },
});

