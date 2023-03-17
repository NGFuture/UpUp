import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { useAuthContext } from "../components/AuthContext";
import Question from "../components/questions/Question";
import { API_URL } from "../config/url";
import { styles } from "../styles";

const Test = ({ navigation, route }) => {
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userChoices, setUserChoices] = useState({});
    const { user } = useAuthContext();
    const getQuiz = async (id) => {
        try {
            const response = await fetch(`${API_URL}/quizzes/${id}`);
            const json = await response.json();
            setQuiz(json.item);
        } catch (error) {
            console.error(error);
        }
    };
    const getQuestions = async (id) => {
        try {
            const response = await fetch(`${API_URL}/questions?quizId=${id}&skip=0&limit=5`);
            const json = await response.json();
            setQuestions(json.items);
        } catch (error) {
            console.error(error);
        }
    };
    const sendResult = async (quizId, userChoices) => {
        try {
            const response = await fetch(`${API_URL}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authuserid': user.id,
                },
                body: JSON.stringify({
                    quizId,
                    userChoices,
                })
            });
            const data = await response.json();
            if (data.item) {
                alert(data.item.results_percentage);
            } else {
                alert(data?.message || "Result not saved")
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onPress = () => {
        if (Object.values(userChoices).length === questions.length) {
            // console.log(quiz);
            // alert('pressed');
            sendResult(quiz._id, userChoices);
        } else {
            const notAnswered = questions.map((item, index) => {
                if (userChoices.hasOwnProperty(item._id) === false) return index + 1;
            }).filter(Boolean);
            let singleOrPlural = 'question #';
            if (notAnswered.length > 1) { singleOrPlural = 'questions ##' };
            alert(`Please, answer ${singleOrPlural} ${notAnswered}`);
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
                <View >
                    <FlatList
                        style={{ height: 600 }}
                        data={questions}
                        renderItem={({ item, index }) => <Question
                            question={item}
                            index={index}
                            userChoice={userChoices[item._id]}
                            setUserChoice={(value) => setUserChoices({ ...userChoices, [item._id]: value })}
                        />}
                        keyExtractor={(item) => item._id}
                        // onEndReached={fetchMoreData}
                        // onEndReachedThreshold={0.2}
                    />
                </View>
                {/* <View>
                    {questions.map((item, index) => <Question
                        key={item._id}
                        question={item}
                        index={index}
                        userChoice={userChoices[item._id]}
                        setUserChoice={(value) => setUserChoices({ ...userChoices, [item._id]: value })}
                    />)}
                </View> */}
                <Button mode='elevated' onPress={onPress}>Submit</Button>
            </View>}

        </View>
    )
};

export default Test;
