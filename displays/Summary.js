import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';

export default function Summary({ route, navigation }) {
    const { selectedAnswersList, questions } = route.params;

    const calculateScore = () => {
        let correctAnswersCount = 0;

        selectedAnswersList.forEach((selectedAnswers, index) => {
            const correctAnswers = questions[index].correct;
            
            if (questions[index].type === 'multiple-choice') {
                if (correctAnswers.includes(selectedAnswers[0])) {
                    correctAnswersCount += 1;
                }
            } else if (questions[index].type === 'multiple-answer') {
                if (selectedAnswers.length > 0) {
                    correctAnswersCount += 1;
                }
            }
        });

        const scorePercentage = (correctAnswersCount / questions.length) * 100;

        return { correctAnswersCount, scorePercentage };
    };

    const { correctAnswersCount, scorePercentage } = calculateScore();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Summary</Text>
            <Text style={styles.resultText}>Correct Answers: {correctAnswersCount}</Text>
            <Text style={styles.resultText}>Total Questions: {questions.length}</Text>
            <Text style={styles.resultText}>Score: {scorePercentage.toFixed(2)}%</Text>

            <Button
                title="Restart"
                onPress={() => navigation.navigate('Test', { questionIndex: 0, 
                questions, 
                selectedAnswersList: new Array(questions.length).fill([]) 
                })}
                buttonStyle={styles.button}
            />
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
        marginBottom: 20,
    },
    resultText: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
    }
});
