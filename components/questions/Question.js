import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { styles } from "../../styles";
import { useState } from "react";

const Question = ({ question, index, userChoice, setUserChoice }) => {
    const { text, options } = question;
    return (
        <View>
            <Text style={styles.header2}>{`${index+1}. ${text}`}</Text>
            <View>
                <RadioButton.Group onValueChange={setUserChoice} value={userChoice} >
                {options.map((item) => {
                    return (
                            <RadioButton.Item
                                label={item.text}
                                value={item.id}
                                key={item.id}
                                position='leading'
                            />
                    );
                })}
                </RadioButton.Group>
            </View>
        </View>
    );
};

export default Question;
