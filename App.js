import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizScreen from './displays/Quiz';
import QuestionScreen from './displays/Question';
import SummaryScreen from './displays/Summary';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Question" component={QuestionScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}


