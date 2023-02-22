import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const Home = ({navigation}) => {
    const [quizzes, setQuizzes] = useState([]);
    const quiz = quizzes[0] || null;
    console.log(quiz);

    const getQuizzes = async () => {
        try {
            const response = await fetch('http://192.168.1.72:3010/quizzes');
            const json = await response.json();
            setQuizzes(json.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getQuizzes();
    }, []);

    const handleOnPress = () => {
        navigation.navigate('Test', {
            id: quiz._id,
        });
    };

    return (
        <View>
            <Text>I am home </Text>
            {quiz && <Button title = 'Next' onPress={handleOnPress}/>}
        </View>
    )
};
export default Home;
