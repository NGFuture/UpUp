import { View } from "react-native";
import { RadioButton, Checkbox, Card, Divider, Text } from "react-native-paper";
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
    //     <Card style={{margin: 5}}>
    //     <Card.Content>
    //       <Text variant="titleLarge">{`${index + 1}. ${text}`}</Text>
    //       {/* <Text variant="bodyMedium">Card content</Text> */}

    //       {/* <Text style={styles.header2}>{`${index + 1}. ${text}`}</Text> */}
    //         <View>
    //             {type === INPUT_TYPE_SINGLE_ANSWER &&
    //                 <RadioButton.Group onValueChange={setUserChoice} value={userChoice} >
    //                     {options.map((item) => {
    //                         return (
    //                             <RadioButton.Item
    //                                 label={item.text}
    //                                 value={item.id}
    //                                 key={item.id}
    //                                 position='leading'
    //                             />
    //                         )
    //                     })}
    //                 </RadioButton.Group>
    //             }
    //             {type === INPUT_TYPE_MULTIPLE_SELECT &&
    //                 <View >
    //                     {options.map((item) => {
    //                         return (
    //                             <Checkbox.Item
    //                                 label={item.text}
    //                                 status={choice.includes(item.id) ? 'checked' : 'unchecked'}
    //                                 key={item.id}
    //                                 position='leading'
    //                                 onPress={
    //                                     () => {
    //                                         if (choice.includes(item.id)) {
    //                                             setUserChoice(choice.filter((id)=> id !== item.id));
    //                                         } else {
    //                                             setUserChoice([...choice, item.id]);
    //                                         }
    //                                     }
    //                                 }
    //                             />
    //                     )})}
    //                 </View>

    //             }
    //         </View>
    //     </Card.Content>
    //   </Card>

        <View style={{paddingTop: 15, paddingRight: 15, paddingBottom: 0, paddingLeft: 15}}>
            <Text variant="bodyLarge" style={{fontWeight: "bold"}}>{`${index + 1}. ${text}`}</Text>
            <View>
                {type === INPUT_TYPE_SINGLE_ANSWER &&
                    <RadioButton.Group onValueChange={setUserChoice} value={userChoice} style={{paddingLeft: 0,}}>
                        {options.map((item) => {
                            return (
                                <RadioButton.Item
                                    label={item.text}
                                    value={item.id}
                                    key={item.id}
                                    position='leading'
                                    style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginLeft: 0,}}
                                    labelStyle={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, marginLeft: 0, textAlign: "left"}}
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
            <Divider />
        </View>
    );
};

export default Question;
