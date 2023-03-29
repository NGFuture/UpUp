import { Text, View } from "react-native";
import { FlatList } from "react-native";
import { useData } from "../components/DataContext";

const Results = () => {
    const { results } = useData();
    const renderItem = ({item}) => {
        return <View>
                        <Text>Hi</Text>
            <Text>{item.name}</Text>
            <Text>{item.results_percentage}</Text>
        </View>
    };
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
