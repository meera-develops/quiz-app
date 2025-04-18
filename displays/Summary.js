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
            } else if (questions[index].type === 'true/false') {
                if (correctAnswers.includes(selectedAnswers[0])) {
                    correctAnswersCount += 1;
                }
            }
        });

        const scorePercentage = (correctAnswersCount / questions.length) * 100;

        return { correctAnswersCount, scorePercentage };
    };

    const { correctAnswersCount, scorePercentage } = calculateScore();

    const displayAnswerChoices = (selectedAnswers, index) => {
        const question = questions[index];
        const correctAnswers = question.correct;
        
        return selectedAnswers.map((answer, answerIndex) => {
            const isCorrect = correctAnswers.includes(answer);
            return (
                <Text
                    key={answerIndex}
                    style={[
                        styles.answerText,
                        isCorrect ? styles.correctAnswer : styles.incorrectAnswer,
                    ]}
                >
                    {question.choices[answer]}
                </Text>
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Summary</Text>
            <Text style={styles.resultText}>Correct Answers: {correctAnswersCount}</Text>
            <Text style={styles.resultText}>Total Questions: {questions.length}</Text>
            <Text style={styles.resultText}>Score: {scorePercentage.toFixed(2)}%</Text>

            <View style={styles.questionsContainer}>
                {questions.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{question.prompt}</Text>

                        <View style={styles.selectedAnswersContainer}>
                            {displayAnswerChoices(selectedAnswersList[index], index)}
                        </View>
                    </View>
                ))}
            </View>

            <Button
                title="Restart"
                onPress={() => navigation.navigate('Test', { questionIndex: 0, 
                questions, 
                selectedAnswersList: new Array(questions.length).fill([]) 
                })}
                color="secondary"
                buttonStyle={{
                    borderRadius: 10,
                }}
                size="lg"
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
        marginBottom: 30,
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
    },
    questionsContainer: {
        width: '50%',
    },
    questionContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    selectedAnswersContainer: {
        marginTop: 10,
    },
    answerText: {
        fontSize: 16,
        marginBottom: 5,
    },
    correctAnswer: {
        fontWeight: 'bold',
        color: 'green',
    },
    incorrectAnswer: {
        textDecorationLine: 'line-through', 
        color: 'red',
    },
});
