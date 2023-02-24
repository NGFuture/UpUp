import { Text, View } from "react-native";
import { styles } from "../../styles";

export const MainLayout = ({ children }) => {
    return (
        <View style={styles.layoutContainer}>
            <View>
                <Text>Top NavBar</Text>
            </View>
            {children}
            <View>
                <Text>Bottom NavBar</Text>
            </View>
        </View>
    );
};
