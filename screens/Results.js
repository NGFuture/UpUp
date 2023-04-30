import { View,  } from "react-native";
import { FlatList } from "react-native";
import { useData } from "../components/DataContext";
import { Card, Text } from "react-native-paper";

const Results = ({ navigation }) => {
    const { results, dictionaryFinishedQuizzes } = useData();
    const renderItem = ({ item }) => {
        const quiz = dictionaryFinishedQuizzes[item.quiz_id];
        // finishedQuizzes.find((q) => q._id === item.quiz_id);
        return (
            <Card style={{ margin: 10, background: "green" }} 
              mode="contained">
                <Card.Title title={
                    <Text>Test {quiz?.title}</Text>
                }
                    right={() => <Text style={{marginRight: 10}}>{item.results_percentage} %</Text>}
                />
            </Card>
        )
    };
    return (
        <>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </>
    )
};
export default Results;
