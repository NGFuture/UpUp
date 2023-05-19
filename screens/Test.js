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
    const { user } = useAuthContext();
    const { getQuizSet, openAlert } = useData();
 
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
                openAlert("great job, look what is next", () => {
                    navigation.navigate('Home');
                });
            } else {
                openAlert(data?.message || "Result not saved")
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
            openAlert(`Please, answer ${singleOrPlural} ${notAnswered}`);
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

   useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (false) {
              // If we don't have unsaved changes, then we don't need to do anything
              return;
            }
    
            // Prevent default behavior of leaving the screen
            e.preventDefault();
    
            // Prompt the user before leaving the screen
            openAlert(
                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                () => navigation.dispatch(e.data.action),
                true,              
            );
          }),
        [navigation]
      );

    return (
        <>
            {quiz && <View style={{ display: "flex", flex: 1 }}>
                <Text>{quiz.title}</Text>
                <View key="1" style={{ flex: 1, }}>
                    <FlatList
                        style={{ height: "100%" }}
                        data={questions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        onEndReached={() => setPage(page + 1)}
                        onEndReachedThreshold={0.4}
                    />
                </View>

                <View key="2" style={{ padding: 10 }}>
                    <Button mode='elevated' onPress={onPress} >Submit</Button>
                </View>

            </View>}

        </>
    )
};

export default Test;
