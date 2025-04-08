import { Text, View, StyleSheet } from 'react-native';
import { ButtonGroup, Button, CheckBox } from '@rneui/base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';


//then work on summary page and score calculation 


export default function Test() {
    const route = useRoute();
    const navigation = useNavigation();

    const { questionIndex, questions } = route.params

    const theQuestion = questions[questionIndex];

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleSelection = (index) => {
        if (theQuestion.type === "multiple-answer") {
            // Toggle the selection for multiple-answer questions
            setSelectedAnswers((prevSelectedAnswers) => {
                if (prevSelectedAnswers.includes(index)) {
                    return prevSelectedAnswers.filter((i) => i !== index); // Deselect
                } else {
                    return [...prevSelectedAnswers, index]; // Add to selection
                }
            });
        } else {
            // For multiple-choice, only allow one selection
            setSelectedAnswers([index]); // Single choice, so just overwrite the selection
        }
    };

    const nextQuestion = () => {
        if (questionIndex + 1 < questions.length) {
            setSelectedAnswers([]);
            navigation.navigate('Test', {questionIndex: questionIndex + 1, questions });
        } else {
            navigation.navigate('Summary');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{theQuestion.prompt}</Text>

            {theQuestion.type === "multiple-choice" ? (
                <ButtonGroup
                    buttons={theQuestion.choices}
                    selectedIndex={selectedAnswers[0]}
                    onPress={handleSelection}
                    containerStyle={styles.buttonGroupContainer}
                    vertical
                    
                />
            ) : (
                theQuestion.choices.map((choice, index) => (
                    <CheckBox 
                        key={index}
                        title={choice}
                        checked={selectedAnswers.includes(index)}
                        onPress={() => handleSelection(index)}
                        containerStyle={styles.checkboxContainer}
                    />
                ))
            )}
            
            <Button
                title="Next Question"
                onPress={nextQuestion}
                disabled={selectedAnswers.length === 0} 
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
        marginBottom: 20,
    },
    buttonGroupContainer: {
        width: '20%',
        marginBottom: 20,
    },
    checkboxContainer: {
        backgroundColor: 'white',
        marginBottom: 30,
        borderRadius: 10,
    }
    
})