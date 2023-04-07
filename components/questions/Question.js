import { Text, View } from "react-native";
import { RadioButton, Checkbox } from "react-native-paper";
import { styles } from "../../styles";
import { INPUT_TYPE_MULTIPLE_SELECT, INPUT_TYPE_SINGLE_ANSWER } from "../../config/quiz";

const Question = ({ question, index, userChoice, setUserChoice }) => {
    const { text, options = [], type } = question;
    let choice = userChoice;
    if (type === INPUT_TYPE_MULTIPLE_SELECT) {
        if (!choice) {
            choice = [];
            // choice.length = options.lenght;
            // choice.fill(false);
        }
        // return (
        //     <Text>here</Text>
        // );
    };
    return (
        <View>
            <Text style={styles.header2}>{`${index + 1}. ${text}`}</Text>
            <View>
                {type === INPUT_TYPE_SINGLE_ANSWER &&
                    <RadioButton.Group onValueChange={setUserChoice} value={userChoice} >
                        {options.map((item) => {
                            return (
                                <RadioButton.Item
                                    label={item.text}
                                    value={item.id}
                                    key={item.id}
                                    position='leading'
                                />
                            )
                        })}
                    </RadioButton.Group>
                }
                {type === INPUT_TYPE_MULTIPLE_SELECT &&
                    <View >
                        {options.map((item) => {
                            return (
                                <Checkbox.Item
                                    label={item.text}
                                    status={choice.includes(item.id) ? 'checked' : 'unchecked'}
                                    key={item.id}
                                    position='leading'
                                    onPress={
                                        () => {
                                            if (choice.includes(item.id)) {
                                                setUserChoice(choice.filter((id)=> id !== item.id));
                                            } else {
                                                setUserChoice([...choice, item.id]);
                                            }
                                        }
                                    }
                                />
                        )})}
                    </View>

                }
            </View>
        </View>
    );
};

export default Question;
