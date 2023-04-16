import { useEffect, useMemo, useState } from "react";
import { Button, Text, View } from "react-native";
import { useAuthContext } from "../components/AuthContext";
import { useData } from "../components/DataContext";
import { MainLayout } from "../components/layouts/MainLayout";

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
        <MainLayout>
            <Button title='Next' onPress={handleOnPressTest} disabled={!nextQuizId} />
            <Button title='Results' disabled={!results.length} onPress={handeOnPressResults} />
        </MainLayout>
    )
};
export default Home;
