import { Text, View } from "react-native";
import { styles } from "../../styles";

const Question = ({question}) => {
    const {text, options} = question;
    return (
        <View>
            <Text style={styles.header2}>{text}</Text>
            {options.map((item) => {
                return (
                    <Text key={item.id}>{item.text}</Text>
                );
            })}
        </View>
    );
};

export default Question;
