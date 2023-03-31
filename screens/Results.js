import { Text, View } from "react-native";
import { FlatList } from "react-native";
import { useData } from "../components/DataContext";

const Results = () => {
    const { results, finishedQuizzes } = useData();
    const renderItem = ({item}) => {
        const quiz = finishedQuizzes.find((q) => q._id === item.quiz_id);
        return (
        <View>
                        <Text>Hi</Text>
            <Text>{quiz.title}</Text>
            <Text>{item.results_percentage}</Text>
        </View>
    )};
    return (
        <View>
            <Text>I am Results </Text>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
};
export default Results;
