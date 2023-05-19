import { useEffect, useMemo } from "react";
import { ImageBackground, View } from "react-native";
import { useAuthContext } from "../components/AuthContext";
import { useData } from "../components/DataContext";
import homeImage from "../assets/homeImage.jpg";
import { Button, Text } from "react-native-paper";
import { styles } from '../styles';

const Home = ({ navigation }) => {
    const { user } = useAuthContext();
    const { quizSet, results, getQuizSet } = useData();
    console.log(user);

    const nextQuizId = useMemo(() => {
        if (!quizSet) { return null }
        const dResults = results.reduce((prev, next) => {
            return { ...prev, [next.quiz_id]: next }
        }, {});
        return quizSet.quiz_ids.find((quizId) => !dResults[quizId]);
    }, [results, quizSet]);

    const handleOnPressTest = () => {
        navigation.navigate('Test', {
            id: nextQuizId,
        });
    };

    const handeOnPressResults = () => {
        navigation.navigate('Results');
    };

    useEffect(() => {
        getQuizSet();
    }, []);


    return (
        <ImageBackground style={{ width: '100%', height: '100%' }} source={homeImage} >
            <View style={styles.homeButtonContainer}>
                <Button  labelStyle={{ fontSize: 25, paddingTop: 12, }} style={styles.homeButton} onPress={handleOnPressTest} disabled={!nextQuizId} mode="contained">
                        NEXT TEST
                </Button>
                <Button labelStyle={{ fontSize: 25, paddingTop: 12, }} style={styles.homeButton} disabled={!results.length} onPress={handeOnPressResults} mode="contained">
                    RESULTS
                </Button>
            </View>
        </ImageBackground>
    )
};
export default Home;
