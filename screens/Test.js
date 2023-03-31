import { useCallback, useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { useAuthContext } from "../components/AuthContext";
import { useData } from "../components/DataContext";
import Question from "../components/questions/Question";
import { API_URL } from "../config/url";
import { styles } from "../styles";

const limit = 5;

const Test = ({ navigation, route }) => {
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userChoices, setUserChoices] = useState({});
    const [page, setPage] = useState(1);
    const [btnVisible, setBtnVisible] = useState(false);
    const { user } = useAuthContext();
    const {getQuizSet} = useData();
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
            const response = await fetch(`${API_URL}/questions?quizId=${id}&skip=${limit * (page - 1)}&limit=${limit}`);
            const data = await response.json();
            console.log(data);
            setQuestions((prev) => [...prev, ...data.items]);
            if (data.count === questions.length+data.items.length) {
                setBtnVisible(true);
            };
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
                getQuizSet();
                alert("great job, look what is next");
                navigation.navigate('Home');               
            } else {
                alert(data?.message || "Result not saved")
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onPress = () => {
        if (Object.values(userChoices).length === questions.length) {
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
    const renderItem = useCallback(({ item, index }) => <Question
        question={item}
        index={index}
        userChoice={userChoices[item._id]}
        setUserChoice={(value) => setUserChoices({ ...userChoices, [item._id]: value })}
    />, [userChoices]);

    useEffect(() => {
        getQuiz(route.params.id);
    }, []);
    useEffect(() => {
        getQuestions(route.params.id);
    }, [page]);
    return (
        <View>
            {quiz && <View>
                <Text>{quiz.title}</Text>
                <View >
                    <FlatList
                        style={{ height: 600 }}
                        data={questions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        onEndReached={() => setPage(page + 1)}
                        onEndReachedThreshold={0.4}
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
                {btnVisible && <Button mode='elevated' onPress={onPress}>Submit</Button>}
            </View>}

        </View>
    )
};

export default Test;
