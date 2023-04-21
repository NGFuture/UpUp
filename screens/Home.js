import { useEffect, useMemo, useState } from "react";
import { Button, ImageBackground, Text, View } from "react-native";
import { useAuthContext } from "../components/AuthContext";
import { useData } from "../components/DataContext";
import { MainLayout } from "../components/layouts/MainLayout";
import homeImage from "../assets/homeImage.jpg";

const Home = ({ navigation }) => {
    const { user } = useAuthContext();
    const {quizSet, results, getQuizSet} = useData();
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
        <ImageBackground  style={{width: '100%', height: '100%'}} source={homeImage} >
            <Button title='Next' onPress={handleOnPressTest} disabled={!nextQuizId} />
            <Button title='Results' disabled={!results.length} onPress={handeOnPressResults} />
        </ImageBackground>
    )
};
export default Home;
