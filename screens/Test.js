import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Test = ({navigation, route}) => {
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const getQuiz = async (id) => {
        try {
            const response = await fetch(`http://192.168.1.72:3010/quizzes/${id}`);
            const json = await response.json();
            setQuiz(json.item);
        } catch (error) {
            console.error(error);
        }
    };
    const getQuestions = async (id) => {
        try {
            const response = await fetch(`http://192.168.1.72:3010/questions?quizId=${id}`);
            const json = await response.json();
            setQuestions(json.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getQuiz(route.params.id);
        getQuestions(route.params.id);
    }, []);    
    return (
    <View>
        {quiz && <>
        <Text>{quiz.title}</Text>
        <Text>{questions.length}</Text>
        </>}
    </View>
)};

export default Test;
