import { Text, View } from "react-native";
import { FlatList } from "react-native";
import { useData } from "../components/DataContext";
import { MainLayout } from "../components/layouts/MainLayout";

const Results = () => {
    const { results, dictionaryFinishedQuizzes } = useData();
    const renderItem = ({item}) => {
        const quiz = dictionaryFinishedQuizzes[item.quiz_id];
        // finishedQuizzes.find((q) => q._id === item.quiz_id);
        return (
        <View>
            <Text>{quiz?.title}</Text>
            <Text>{item.results_percentage}</Text>
        </View>
    )};
    return (
        <MainLayout>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </MainLayout>
    )
};
export default Results;
