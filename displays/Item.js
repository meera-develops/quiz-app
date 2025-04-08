import { Text, View, StyleSheet } from 'react-native';
import { ButtonGroup, Button, CheckBox } from '@rneui/base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react'; 

export default function Test() {
    const route = useRoute();
    const navigation = useNavigation();

    const { questionIndex, questions, selectedAnswersList = [] } = route.params

    const theQuestion = questions[questionIndex];

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleSelection = (index) => {
        if (theQuestion.type === "multiple-answer") {
            setSelectedAnswers((prevSelectedAnswers) => {
                if (prevSelectedAnswers.includes(index)) {
                    return prevSelectedAnswers.filter((i) => i !== index); //deselect
                } else {
                    return [...prevSelectedAnswers, index]; //add to selection
                }
            });
        } else {
            setSelectedAnswers([index]); 
        }
    };

    const nextQuestion = () => {
        const updatedAnswersList = [...selectedAnswersList]; //clone the array
        updatedAnswersList[questionIndex] = selectedAnswers;

        if (questionIndex + 1 < questions.length) {
            setSelectedAnswers([]);
            navigation.navigate('Test', {questionIndex: questionIndex + 1, questions, selectedAnswersList: updatedAnswersList });
        } else {
            navigation.navigate('Summary', { selectedAnswersList: updatedAnswersList, questions });
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
        textAlign: 'center',
    },
    buttonGroupContainer: {
        width: '50%',
        marginBottom: 20,
    },
    checkboxContainer: {
        backgroundColor: 'white',
        marginBottom: 30,
        borderRadius: 10,
    }
    
})