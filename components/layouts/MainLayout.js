import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "../DataContext";
// import { styles } from "../../styles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
export const MainLayout = ({ children }) => {
  const {quizSet, results} = useData();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        {children}
      </View>

      <View>
        {quizSet && <Text>Done {results.length}/{quizSet.quiz_ids.length}</Text>}
      </View>
    </SafeAreaView>
  );
};
