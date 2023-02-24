import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Question from "../components/questions/Question";
import { styles } from "../styles";

const Test = ({ navigation, route }) => {
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
            {quiz && <View>
                <Text>{quiz.title}</Text>
                <View>{questions.map((item) => <Question key={item._id} question={item}/>)}</View>
            </View>}
        </View>
    )
};

export default Test;
